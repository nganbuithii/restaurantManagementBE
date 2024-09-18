import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFeedbackDto, CreateFeedbackReplyDto, FeedbackFilterType, FeedbackPaginationResponseType, UpdateFeedbackDto } from './dto/feecback.dto';
import { IUser } from 'interfaces/user.interface';
import { Feedback } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
@Injectable()
export class FeeckbacksService {
  constructor(private prisma: PrismaService, private configService: ConfigService) { }

  async create(createFeedbackDto: CreateFeedbackDto, user: IUser): Promise<Feedback> {
    const { content, rating, isActive } = createFeedbackDto;
    let label = await this.classifyText(content);
    const feedback = await this.prisma.feedback.create({
      data: {
        content,
        rating: rating ?? 5,
        isActive: isActive ?? true,
        userId: user.sub,
        label
      },
    });

    return feedback;
  }


  async getAll(filter: FeedbackFilterType): Promise<FeedbackPaginationResponseType> {
    const items_per_page = Number(process.env.ITEMS_PER_PAGE);
    const page = Number(filter.page) || 1;
    const search = filter.search || "";

    const skip = (page - 1) * items_per_page;
    const take = items_per_page;

    const where = search
      ? {
        OR: [
          {
            content: {
              contains: search,
            },
          },
          {
            label: {
              contains: search,
            },
          },
        ],
      }
      : {};

    const [feedbacks, total] = await Promise.all([
      this.prisma.feedback.findMany({
        where,
        skip,
        take: items_per_page,
        orderBy: {
          id: 'desc',
        },
        include: {
          user: {
            select: {
              fullName: true,
              avatar: true,
              username: true,
            },
          },
        },
      }),
      this.prisma.feedback.count({ where }),
    ]);

    return {
      data: feedbacks,
      total,
      currentPage: page,
      itemsPerPage: items_per_page,
    };
  }



  async getDetail(id: number): Promise<Feedback> {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            avatar: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                avatar: true,
              },
            },
            replies: true,
          },
        },
      },
    });

    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    return feedback;
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback> {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException(`Feedback with id ${id} not found`);
    }

    const updatedFeedback = await this.prisma.feedback.update({
      where: { id },
      data: {
        ...updateFeedbackDto,
        updatedAt: new Date(),
      },
    });

    return updatedFeedback;
  }
  async delete(id: number, user: IUser): Promise<void> {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException(`Feedback with id ${id} not found`);
    }

    if (feedback.userId !== user.sub) {
      throw new ForbiddenException('You are not allowed to delete this feedback');
    }

    await this.prisma.feedback.update({
      where: { id },
      data: {
        isActive: false,
        updatedAt: new Date(),
      },
    });
  }

  async replyToFeedback(
    id: number,
    replyDto: CreateFeedbackReplyDto,
    user: IUser
  ): Promise<Feedback> {
    const parentFeedback = await this.prisma.feedback.findUnique({
      where: { id },
    });

    if (!parentFeedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    return this.prisma.feedback.create({
      data: {
        content: replyDto.content,
        userId: user.sub,
        parentId: id,
      },
    });
  }

  private async classifyText(text: string): Promise<string> {
    const apiUrl = this.configService.get<string>('CLASSIFICATION_API_URL');
    const apiToken = this.configService.get<string>('CLASSIFICATION_API_TOKEN');

    try {
      const response = await axios.post(apiUrl,
        { text },
        {
          headers: {
            'Authorization': `Token ${apiToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const scoredLabels = response.data.scored_labels;
      if (scoredLabels && scoredLabels.length > 0) {
        return scoredLabels[0].label;
      }
      throw new Error('No label returned from classification API');
    } catch (error) {
      console.error('Error classifying text:', error);
      throw error;
    }
  }


  async getFeedbackStatistics(): Promise<any> {
    // Tổng hợp các chỉ số tổng quan
    const feedbackStats = await this.prisma.feedback.aggregate({
      _count: {
        id: true, // Tổng số đánh giá
      },
      _avg: {
        rating: true, // Điểm trung bình của đánh giá
      },
      _sum: {
        rating: true, // Tổng điểm đánh giá
      },
      where: {
        isActive: true, // Nếu cần điều kiện
      },
    });

    const totalFeedbacks = feedbackStats._count.id;
    const averageRating = feedbackStats._avg.rating || 0;
    const totalRating = feedbackStats._sum.rating || 0;

    // Thống kê theo label
    const labelStats = await this.prisma.feedback.groupBy({
      by: ['label'],
      _count: {
        id: true, // Số lượng đánh giá theo label
      },
      _avg: {
        rating: true, // Điểm trung bình theo label
      },
      _sum: {
        rating: true, // Tổng điểm theo label
      },
      where: {
        isActive: true, // Nếu cần điều kiện
      },
    });

    // Tính toán điểm tích cực và tiêu cực
    const totalPositive = labelStats.find((item) => item.label === 'POSITIVE')?._count.id || 0;
    const totalNegative = labelStats.find((item) => item.label === 'NEGATIVE')?._count.id || 0;

    return {
      totalFeedbacks,
      averageRating,
      totalRating,
      labelStats: labelStats.map((stat) => ({
        label: stat.label,
        totalFeedbacks: stat._count.id,
        averageRating: stat._avg.rating || 0,
        totalRating: stat._sum.rating || 0,
      })),
      totalPositive,
      totalNegative,
    };
  }


}

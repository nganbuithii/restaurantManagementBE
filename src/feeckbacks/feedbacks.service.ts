import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFeedbackDto, CreateFeedbackReplyDto, FeedbackFilterType, FeedbackPaginationResponseType, UpdateFeedbackDto } from './dto/feecback.dto';
import { IUser } from 'interfaces/user.interface';
import { Feedback } from '@prisma/client';

@Injectable()
export class FeeckbacksService {
    constructor(private prisma: PrismaService) {}

    async create(createFeedbackDto: CreateFeedbackDto, user: IUser): Promise<Feedback> {
        const { content, rating, isActive } = createFeedbackDto;
    
        const feedback = await this.prisma.feedback.create({
          data: {
            content,
            rating: rating ?? 5,
            isActive: isActive ?? true, 
            userId: user.sub, 
          },
        });
    
        return feedback;
      }


      async getAll(params: FeedbackFilterType): Promise<FeedbackPaginationResponseType> {
        const { page = 1, items_per_page = 10, search } = params;
        const skip = (page - 1) * items_per_page;
    
        const where = search
          ? {
              content: {
                contains: search,
              },
            }
          : {};
    
        const [feedbacks, total] = await Promise.all([
          this.prisma.feedback.findMany({
            where,
            skip,
            take: items_per_page,
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
      async delete(id: number, user:IUser): Promise<void> {
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
}

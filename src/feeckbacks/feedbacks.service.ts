import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFeedbackDto, CreateFeedbackReplyDto, FeedbackFilterType, FeedbackPaginationResponseType, UpdateFeedbackDto } from './dto/feecback.dto';
import { IUser } from 'interfaces/user.interface';
import { Feedback } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
@Injectable()
export class FeeckbacksService {
    constructor(private prisma: PrismaService, private configService:ConfigService) {}

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
                orderBy: {
                  id: 'desc', 
              },
                include: {
                    user: {
                        select: {
                            fullName: true, 
                            avatar:true,
                            username:true,
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
}

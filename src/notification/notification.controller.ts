import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'decorators/customize';
import { IUser } from 'interfaces/user.interface';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllNotifications(@CurrentUser() user:IUser) {
    return this.notificationService.getNotifications(user);
  }

  @Get('unread-count')
  @UseGuards(JwtAuthGuard)
  async getUnreadCount(@CurrentUser() user:IUser) {
    return this.notificationService.getUnreadNotificationsCount(user);
  }

  @Post(':id/mark-as-read')
  @UseGuards(JwtAuthGuard)

  async markAsRead(@Param('id') id: string, @CurrentUser() user:IUser) {
    await this.notificationService.markNotificationAsRead(id,user);
    return { message: 'Notification marked as read' };
  }
}

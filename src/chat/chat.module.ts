import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/prisma.service';
import { MenuItemService } from 'src/menu-item/menu-item.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, PrismaService, MenuItemService, CloudinaryService]
})
export class ChatModule {}

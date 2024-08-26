import { ApiProperty } from '@nestjs/swagger';
import { Feedback } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min, Max, IsBoolean, IsNumber } from 'class-validator';

export class CreateFeedbackDto {
    @ApiProperty()
    @IsNotEmpty({ message: " content  can not empty" })
    @IsString({ message: "content must be a string" })
    content: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    @ApiProperty()
    rating?: number;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    isActive?: boolean;
}



export interface FeedbackFilterType {
    items_per_page?: number;
    page?: number;
    search?: string
}

export interface FeedbackPaginationResponseType {
    data: Feedback[]
    total: number
    currentPage: number
    itemsPerPage: number
}


export class UpdateFeedbackDto {
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: "name menu item can not empty" })
    @ApiProperty()
    content: string;

    @IsOptional()
    @Min(1)
    @Max(5)
    @ApiProperty()
    rating: number;

}


export class CreateFeedbackReplyDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    content: string;

    // @IsNotEmpty()
    // @IsNumber()
    // parentId: number;
}
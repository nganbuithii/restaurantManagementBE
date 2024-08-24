import { Feedback } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min, Max, IsBoolean } from 'class-validator';

export class CreateFeedbackDto {
    @IsNotEmpty({ message: " content  can not empty" })
    @IsString({ message: "content must be a string" })
    content: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    rating?: number;

    @IsOptional()
    @IsBoolean()
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
    content: string;

    @IsOptional()
    @Min(1)
    @Max(5)
    rating: number;

}  
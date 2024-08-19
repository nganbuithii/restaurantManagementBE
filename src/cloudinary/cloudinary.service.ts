import { Injectable } from '@nestjs/common';
import cloudinary from 'src/configs/cloudinary.config';

@Injectable()
export class CloudinaryService {
    constructor() {
        // cloudinary.config({
        //     cloud_name: process.env.CLOUDINARY_NAME,
        //     api_key: process.env.CLOUDINARY_API_KEY,
        //     api_secret: process.env.CLOUDINARY_API_SECRET,
        // });
    }

    async uploadImage(filePath: string): Promise<any> {
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'avatars',
                allowed_formats: ['jpg', 'png', 'jpeg'],
            });
            return result;
        } catch (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }
    }
}

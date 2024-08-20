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

    async uploadImage(file: Express.Multer.File): Promise<any> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'avatars', allowed_formats: ['jpg', 'png', 'jpeg'] },
                (error, result) => {
                    if (error) {
                        reject(new Error(`Failed to upload image: ${error.message}`));
                    } else {
                        resolve(result);
                    }
                }
            ).end(file.buffer);
        });
    }

    async uploadImages(files: Array<Express.Multer.File>): Promise<any[]> {
        try {
            const uploadPromises = files.map(file => this.uploadImage(file));
            return Promise.all(uploadPromises);
        } catch (error) {
            throw new Error(`Failed to upload images: ${error.message}`);
        }
    }
}

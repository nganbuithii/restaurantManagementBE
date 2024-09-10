import { BadRequestException, Injectable } from '@nestjs/common';
import cloudinary from 'src/configs/cloudinary.config';

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    // async uploadImage(file: Express.Multer.File): Promise<any> {
    //     if (!file || !file.path) {
    //         throw new BadRequestException('Tệp tin trống hoặc bị thiếu');
    //     }
    //     try {
    //         const result = await cloudinary.uploader.upload(file.path);
    //         return result;
    //     } catch (error) {
    //         throw new BadRequestException('Lỗi khi tải ảnh lên');
    //     }
    // }
    async uploadImage(file: Express.Multer.File): Promise<any> {
        if (!file || !file.buffer) {
            throw new BadRequestException('Tệp tin trống hoặc bị thiếu');
        }
    
        try {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    (error, result) => {
                        if (error) {
                            console.error('Upload error:', error); // Log chi tiết lỗi
                            return reject(new BadRequestException('Lỗi khi tải ảnh lên'));
                        }
                        resolve(result);
                    }
                ).end(file.buffer);
            });
        } catch (error) {
            console.error('Error in uploadImage:', error); // Log lỗi chung
            throw new BadRequestException('Lỗi khi tải ảnh lên');
        }
    }
    
    
    

    async uploadImages(files: Array<Express.Multer.File>): Promise<any[]> {
        if (!files || files.length === 0) {
            throw new BadRequestException('Ít nhất một hình ảnh là bắt buộc.');
        }
    
        try {
            const uploadPromises = files.map(file => this.uploadImage(file));
            return await Promise.all(uploadPromises);
        } catch (error) {
            throw new Error(`Failed to upload images: ${error.message}`);
        }
    }
    
}

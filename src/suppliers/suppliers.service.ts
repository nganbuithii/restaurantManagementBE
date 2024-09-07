import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSupplierDto, SupplierFilterType, SupplierPaginationResponseType, UpdateSupplierDto } from './dto/supplier.dto';
import { IUser } from 'interfaces/user.interface';
import { Supplier } from '@prisma/client';

@Injectable()
export class SuppliersService {
    constructor(private readonly prisma: PrismaService) { }

    async create(body: CreateSupplierDto, user: IUser) {
        // Kiểm tra xem supplier đã tồn tại hay chưa
        const existingSupplier = await this.prisma.supplier.findUnique({
            where: {
                email: body.email,
            },
        });

        if (existingSupplier) {
            throw new BadRequestException('Supplier already exists');
        }

        const supplier = await this.prisma.supplier.create({
            data: {
                ...body,
                createdBy: user.sub, 
            },
        });
        return supplier;
    }
    


    async getAll(filter: SupplierFilterType): Promise<SupplierPaginationResponseType> {
        const itemsPerPage = parseInt(process.env.ITEMS_PER_PAGE);
        const currentPage = parseInt(String(filter.page || process.env.DEFAULT_PAGE));

        const search = filter.search || '';
        
        // Lấy các supplier theo trang và số lượng items
        const suppliers = await this.prisma.supplier.findMany({
            where: {
                name: {
                    contains: search,
                },
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        });
    
        // Đếm tổng số suppliers
        const total = await this.prisma.supplier.count({
            where: {
                name: {
                    contains: search,
                },
            },
        });
    
        // Trả về kết quả với tổng số lượng và dữ liệu theo trang
        return {
            data: suppliers,
            total,
            currentPage,
            itemsPerPage,
        };
    }
    

    async getById(id: number): Promise<Supplier> {
        const supplier = await this.prisma.supplier.findUnique({
            where: {
                id: id,
            },
        });

        if (!supplier) {
            throw new NotFoundException(`Supplier with ID ${id} not found`);
        }

        return supplier;
    }

    async update(id: number, data: UpdateSupplierDto, user: IUser): Promise<Supplier> {
        const existingSupplier = await this.prisma.supplier.findUnique({
            where: { id },
        });

        if (!existingSupplier) {
            throw new NotFoundException(`Supplier with ID ${id} not found`);
        }

        // Kiểm tra nếu email đã tồn tại ở một nhà cung cấp khác
        if (data.email && data.email !== existingSupplier.email) {
            const emailInUse = await this.prisma.supplier.findUnique({
                where: { email: data.email },
            });

            if (emailInUse) {
                throw new BadRequestException('Email is already in use by another supplier');
            }
        }

        // Cập nhật thông tin nhà cung cấp
        const updatedSupplier = await this.prisma.supplier.update({
            where: { id },
            data: {
                ...data,
                updatedBy: user.sub, 
            },
        });

        return updatedSupplier;
    }

    async delete(id: number, user: IUser): Promise<void> {
        const existingSupplier = await this.prisma.supplier.findUnique({
            where: { id },
        });

        if (!existingSupplier) {
            throw new NotFoundException(`Supplier with ID ${id} not found`);
        }

        await this.prisma.supplier.update({
            where: { id },
            data: {
                isActive: false,  
                deletedBy: user.sub, 
            },
        });
    }

}

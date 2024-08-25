import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSupplierDto, SupplierFilterType, SupplierPaginationResponseType } from './dto/supplier.dto';
import { IUser } from 'interfaces/user.interface';

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
        const itemsPerPage =parseInt(process.env.ITEMS_PER_PAGE);
        const currentPage =parseInt(process.env.DEFAULT_PAGE);
        const search = filter.search || '';
        const suppliers = await this.prisma.supplier.findMany({
            where: {
                name: {
                    contains: search,
                },
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        });

        const total = await this.prisma.supplier.count({
            where: {
                name: {
                    contains: search,
                },
            },
        });

        return {
            data: suppliers,
            total,
            currentPage,
            itemsPerPage,
        };
    }
}

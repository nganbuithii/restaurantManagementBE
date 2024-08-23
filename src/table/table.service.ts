import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTableDto, TableFilterType, TablePaginationResponseType } from './dto/table.dto';
import { IUser } from 'interfaces/user.interface';

@Injectable()
export class TableService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createTableDto: CreateTableDto, user: IUser) {
        const { number } = createTableDto;

        // Kiểm tra xem bàn có tồn tại hay không
        const existingTable = await this.prisma.table.findUnique({
            where: { number },
        });

        if (existingTable) {
            throw new BadRequestException('Table with this number already exists');
        }

        // Tạo bàn mới
        const newTable = await this.prisma.table.create({
            data: {
                ...createTableDto,
            },
        });

        return newTable;
    }
    async getAll(params: TableFilterType): Promise<TablePaginationResponseType> {
        const { page = 1, items_per_page = 10, search } = params;

        const offset = (page - 1) * items_per_page;

        // Tạo điều kiện where nếu có search
        const where = search ? { number: Number(search) } : {};

        // Lấy danh sách các bàn với phân trang
        const tables = await this.prisma.table.findMany({
            where,
            skip: offset,
            take: items_per_page,
        });

        // Đếm tổng số lượng bàn
        const total = await this.prisma.table.count({ where });

        return {
            data: tables,
            total,
            currentPage: page,
            itemsPerPage: items_per_page,
        };
    }


    async delete(id: number, user: IUser): Promise<void> {
        const table = await this.prisma.table.findUnique({
            where: { id },
        });

        if (!table) {
            throw new NotFoundException('Table not found');
        }

        await this.prisma.table.update({
            where: { id },
            data: {
                isActive: false,
                deletedBy: user.sub, 
            },
        });
    }
}

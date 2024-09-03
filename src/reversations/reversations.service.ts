import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto, ReservationFilterType, ReservationPaginationResponseType, UpdateReservationDto } from './dto/reversations.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'interfaces/user.interface';
import { Reservation } from '@prisma/client';

@Injectable()
export class ReversationsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createReservationDto: CreateReservationDto, user: IUser) {
        const { tableId, startTime, endTime } = createReservationDto;

        // Kiểm tra xem bàn có tồn tại và còn hoạt động không
        const table = await this.prisma.table.findUnique({
            where: { id: tableId },
            select: { isActive: true, reservations: true },
        });

        if (!table || !table.isActive) {
            throw new BadRequestException('Table is not available');
        }

        // Kiểm tra xem bàn có bị trùng thời gian đặt không
        const overlappingReservation = table.reservations.find(reservation =>
            (startTime < reservation.endTime && endTime > reservation.startTime)
        );

        if (overlappingReservation) {
            throw new BadRequestException('Table is already reserved for the selected time');
        }

        // Tạo đặt chỗ mới
        const newReservation = await this.prisma.reservation.create({
            data: {
                ...createReservationDto,
                // customerId: user.sub,
            },
        });

        return newReservation;
    }

    async getAll(params: ReservationFilterType): Promise<ReservationPaginationResponseType> {
        const { page = 1, items_per_page = 10, search } = params;
        const skip = (page - 1) * items_per_page;
    
        // Xây dựng điều kiện tìm kiếm
        const where = search
            ? {
                OR: [
                    { status: { contains: search } },
                    { customer: { user: { fullName: { contains: search } } } },
                    { table: { number: { equals: parseInt(search) || -1 } } },
                ],
            }
            : {};
    
        // Tính tổng số bản ghi
        const total = await this.prisma.reservation.count({ where });
    
        // Lấy danh sách các đặt chỗ
        const reservations = await this.prisma.reservation.findMany({
            where,
            skip,
            take: items_per_page,
            include: {
                table: true,
                customer: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    
        // Chuyển đổi dữ liệu theo định dạng mong đợi
        const data = reservations.map(reservation => ({
            id: reservation.id,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            status: reservation.status,
            tableId: reservation.table.id,        
            customerId: reservation.customer.id,   
        }));
    
        return {
            data,
            total,
            currentPage: page,
            itemsPerPage: items_per_page,
        };
    }
    
    async getDetail(id: number): Promise<any> {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id },
            include: {
                table: true,
                customer: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!reservation) {
            throw new NotFoundException(`Reservation with ID ${id} not found`);
        }

        const data = {
            id: reservation.id,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            status: reservation.status,
            createdAt: reservation.createdAt,
            updatedAt: reservation.updatedAt,
            tableId: reservation.tableId,
            customerId: reservation.customerId,
            table: {
                id: reservation.table.id,
                number: reservation.table.number,
                seats: reservation.table.seats,
                status: reservation.table.status,
            },
            customer: {
                id: reservation.customer.id,
                user: {
                    fullName: reservation.customer.user.fullName,
                    phone: reservation.customer.user.phone,
                    username: reservation.customer.user.username,
                    avatar: reservation.customer.user.avatar,
                },
            },
        };

        return { data };
    }
    async update(id: number, data: UpdateReservationDto, user: IUser): Promise<Reservation> {
        const reservation = await this.prisma.reservation.findUnique({
          where: { id },
        });
    
        if (!reservation) {
          throw new NotFoundException('Reservation not found');
        }
    
        const updatedReservation = await this.prisma.reservation.update({
          where: { id },
          data: {
            ...data,
            updatedAt: new Date(),
          },
        });
    
        return updatedReservation;
      }
}
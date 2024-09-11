import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto, ReservationFilterType, ReservationPaginationResponseType, ReservationStatus, UpdateReservationDto } from './dto/reversations.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'interfaces/user.interface';
import { Reservation } from '@prisma/client';

@Injectable()
export class ReversationsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createReservationDto: CreateReservationDto, user: IUser) {
        const { tableId, time, date, status } = createReservationDto;

        const reservationDate = new Date(date); 
        const reservationDateTime = new Date(`${reservationDate.toISOString().split('T')[0]}T${time}:00`);

        console.log('ISO Date:', reservationDate.toISOString().split('T')[0]);
        console.log('Reservation DateTime:', reservationDateTime.toISOString());

        // Kiểm tra xem có đặt chồng lên nhau không
        const existingReservations = await this.prisma.reservation.findMany({
            where: {
                tableId: tableId,
                date: {
                    gte: new Date(`${reservationDate.toISOString().split('T')[0]}T00:00:00Z`), // Ngày bắt đầu
                    lt: new Date(`${reservationDate.toISOString().split('T')[0]}T23:59:59Z`), // Ngày kết thúc
                },
                status: {
                    not: "CANCELLED",
                },
            },
            select: {
                time: true,
                date: true,
            },
        });

        console.log('Existing Reservations:', existingReservations);

        // Kiểm tra các lịch hẹn hiện tại
        for (const reservation of existingReservations) {
            const existingDateTime = new Date(`${reservation.date.toISOString().split('T')[0]}T${reservation.time}:00`);
            console.log('Comparing with Existing Reservation DateTime:', existingDateTime.toISOString());
            if (reservationDateTime.getTime() === existingDateTime.getTime()) {
                console.error('Table is already reserved for the selected time');
                throw new BadRequestException('Table is already reserved for the selected time');
            }
        }

        const newReservation = await this.prisma.reservation.create({
            data: {
                time: time,
                date: new Date(date).toISOString(),
                status: status || 'PENDING',
                user: {
                    connect: { id: user.sub },
                },
                table: {
                    connect: { id: tableId },
                },
            },
        });


        console.log('New Reservation Created:', newReservation);

        return newReservation;
    }



    async getAll(params: ReservationFilterType): Promise<ReservationPaginationResponseType> {
        const { page = 1, items_per_page = 4, search } = params;
        const skip = (page - 1) * items_per_page;
    
        const where = search
            ? {
                OR: [
                    { status: { contains: search } },
                    {
                        user: {
                            fullName: {
                                contains: search,
                            },
                        },
                    },
                    { table: { number: { equals: parseInt(search) || -1 } } },
                ],
            }
            : {};
    
        const total = await this.prisma.reservation.count({ where });
    
        const reservations = await this.prisma.reservation.findMany({
            where,
            skip,
            take: items_per_page,
            include: {
                table: true,
                user: true, 
            },
            orderBy: { createdAt: 'desc' },
        });
    
        const data = reservations.map((reservation) => ({
            id: reservation.id,
            time: reservation.time,
            date: reservation.date, 
            status: reservation.status,
            tableId: reservation.table.id,
            userId: reservation.user.id,
        }));
    
        return {
            data,
            total,
            currentPage: page,
            itemsPerPage: items_per_page,
        };
    }
    


    async getDetail(id: number): Promise<any> {
        // Truy vấn thông tin đặt chỗ từ cơ sở dữ liệu
        const reservation = await this.prisma.reservation.findUnique({
            where: { id },
            include: {
                table: true,  // Bao gồm thông tin của bàn
                user: true,   // Bao gồm thông tin của người dùng
            },
        });
    
        // Kiểm tra xem đặt chỗ có tồn tại không
        if (!reservation) {
            throw new NotFoundException(`Reservation with ID ${id} not found`);
        }
    
        // Chuyển đổi dữ liệu để phù hợp với định dạng mong muốn
        const data = {
            id: reservation.id,
            time: reservation.time,
            date: reservation.date,
            status: reservation.status,
            createdAt: reservation.createdAt,
            updatedAt: reservation.updatedAt,
            tableId: reservation.tableId,
            userId: reservation.userId, // Chỉnh sửa từ customerId thành userId
            table: {
                id: reservation.table.id,
                number: reservation.table.number,
                seats: reservation.table.seats,
                status: reservation.table.status,
            },
            user: {
                id: reservation.user.id,
                fullName: reservation.user.fullName,
                phone: reservation.user.phone,
                username: reservation.user.username,
                avatar: reservation.user.avatar,
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

    async changeStatus(id: number, status: ReservationStatus, user: IUser): Promise<Reservation> {
        const reservation = await this.prisma.reservation.findUnique({ where: { id } });

        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }


        return this.prisma.reservation.update({
            where: { id },
            data: { status }
        });
    }

}
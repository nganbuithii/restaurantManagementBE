import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto, ReservationFilterType, ReservationPaginationResponseType, ReservationStatus, UpdateReservationDto } from './dto/reversations.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'interfaces/user.interface';
import { Prisma, Reservation } from '@prisma/client';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ReversationsService {
    constructor(private readonly prisma: PrismaService,
        private emailService: EmailService
    ) { }

    async create(createReservationDto: CreateReservationDto, user: IUser) {
        const { tableId, time, date, status } = createReservationDto;
    
        const reservationDateTime = new Date(`${new Date(date).toISOString().split('T')[0]}T${time}:00`);
        console.log('Reservation DateTime:', reservationDateTime.toISOString());
    
        const existingReservations = await this.prisma.reservation.findMany({
            where: {
                table: {
                    id: tableId, // Sử dụng kết nối tới bảng Table
                },
                date: {
                    gte: new Date(`${reservationDateTime.toISOString().split('T')[0]}T00:00:00Z`),
                    lt: new Date(`${reservationDateTime.toISOString().split('T')[0]}T23:59:59Z`),
                },
                status: {
                    not: 'CANCELLED',
                },
            },
            select: {
                time: true,
                date: true,
            },
        });
    
        console.log('Existing Reservations:', existingReservations);
    
        for (const reservation of existingReservations) {
            const existingDateTime = new Date(`${reservation.date.toISOString().split('T')[0]}T${reservation.time}:00`);
            console.log('Comparing with Existing Reservation DateTime:', existingDateTime.toISOString());
            if (reservationDateTime.getTime() === existingDateTime.getTime()) {
                throw new BadRequestException('Table is already reserved for the selected time');
            }
        }
    
        const newReservation = await this.prisma.reservation.create({
            data: {
                time: time,
                date: reservationDateTime,
                status: status || 'PENDING',
                user: {
                    connect: { id: user.sub },
                },
                table: {
                    connect: { id: tableId },
                },
            } as Prisma.ReservationCreateInput,
        });
    
        console.log('New Reservation Created:', newReservation);
        await this.emailService.sendReservationConfirmation(user.email, {
            date: newReservation.date,
            time: newReservation.time,
            status: newReservation.status,
        });
    
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
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        username: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return {
            data: reservations,
            total,
            currentPage: page,
            itemsPerPage: items_per_page,
        };
    }

    async getDetail(id: number): Promise<any> {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id },
            include: {
                user: true,
                order: {
                    include: {
                        details: {
                            include: {
                                menuItem: true,  // Bao gồm thông tin về từng món ăn trong đơn hàng
                            }
                        }
                    }
                }
            },
        });

        if (!reservation) {
            throw new NotFoundException(`Reservation with ID ${id} not found`);
        }

        const data = {
            id: reservation.id,
            time: reservation.time,
            date: reservation.date,
            status: reservation.status,
            createdAt: reservation.createdAt,
            updatedAt: reservation.updatedAt,
            userId: reservation.userId,
            user: {
                id: reservation.user.id,
                fullName: reservation.user.fullName,
                phone: reservation.user.phone,
                username: reservation.user.username,
                avatar: reservation.user.avatar,
            },
            order: reservation.order ? {
                id: reservation.order.id,
                totalPrice: reservation.order.totalPrice,
                discountPrice: reservation.order.discountPrice,
                details: reservation.order.details.map(detail => ({
                    id: detail.id,
                    quantity: detail.quantity,
                    menuItem: {
                        name: detail.menuItem.name,
                        price: detail.menuItem.price,
                    }
                })),
            } : null
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
        console.log("Data sent for updating reservation:", data);
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
    async getAllByUserId(user: IUser): Promise<Reservation[]> {
        return this.prisma.reservation.findMany({
            where: {
                userId: user.sub,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
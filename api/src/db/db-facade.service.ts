import { Injectable } from '@nestjs/common';
import { AuthUser, OrderSession, UserOrder } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class DBFacadeService {
    constructor(private prisma: PrismaService) { }

    async getUserByUsername(username: string) {
        return this.prisma.authUser.findUnique({ where: { username: username } });
    }

    async getUserByEmail(email: string) {
        return this.prisma.authUser.findUnique({ where: { email: email } });
    }

    async addNewUser(user: AuthUser) {
        return this.prisma.authUser.create({ data: user });
    }

    async createOrderSession(orderSession: OrderSession) {
        return this.prisma.orderSession.create({ data: orderSession });
    }

    async getOrderSession(orderSessionUuid: string) {
        return this.prisma.orderSession.findUnique({ where: { uuid: orderSessionUuid } });
    }

    async createUserOrder(userOrder: UserOrder) {
        return this.prisma.userOrder.create({ data: userOrder });
    }

    async getUserOrder(userOrder: string) {
        return this.prisma.userOrder.findUnique({ where: { uuid: userOrder } });
    }

    async deleteUserOrder(userOrderUuid: string) {
        return this.prisma.userOrder.delete({ where: { uuid: userOrderUuid } });
    }
}
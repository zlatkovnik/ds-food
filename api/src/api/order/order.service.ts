import { Injectable } from '@nestjs/common';
import { AuthUser, OrderSession, Prisma, UserOrder } from '@prisma/client';
import { DBFacadeService } from 'src/db/db-facade.service';
import { CreateOrderForm, CreateOrderSessionForm } from 'src/models/order.model';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

@Injectable()
export class OrderService {
    constructor(private dbFacadeService: DBFacadeService) { }

    async createOrderSession(createOrderSessionForm: CreateOrderSessionForm, user: AuthUser) {
        const orderSession: OrderSession = {
            ...createOrderSessionForm, created: new Date(), createdByUuid: user.uuid, uuid: uuidv4(),
            isActive: true, deliveryCost: new Prisma.Decimal(createOrderSessionForm.deliveryCost)
        }
        const createdOrderSession = await this.dbFacadeService.createOrderSession(orderSession);
        return createdOrderSession;
    }

    async createUserOrder(createOrderForm: CreateOrderForm, user: AuthUser) {
        const orderSession = await this.dbFacadeService.getOrderSession(createOrderForm.orderSessionUuid);
        if (!orderSession) {
            throw 'Order session not found.';
        }

        const userOrder: UserOrder = {
            ...createOrderForm, created: new Date(), userUuid: user.uuid, uuid: uuidv4(),
            price: new Prisma.Decimal(createOrderForm.price)
        }
        const createdUserOrder = await this.dbFacadeService.createUserOrder(userOrder);
        return createdUserOrder;
    }

    async deleteOrder(userOrderUuid: string) {
        await this.dbFacadeService.deleteUserOrder(userOrderUuid);
    }

    getOrderSession(orderSessionUuid: string) {
        return this.dbFacadeService.getOrderSession(orderSessionUuid);
    }

    getUserOrder(userOrderUuid: string) {
        return this.dbFacadeService.getUserOrder(userOrderUuid);
    }
}
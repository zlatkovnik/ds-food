import { Injectable } from '@nestjs/common';
import { DBFacadeService } from 'src/db/db-facade.service';
import { AuthUser } from 'src/models/auth.model';
import { CreateOrderForm, CreateOrderSessionForm, OrderSession, UserOrder } from 'src/models/order.model';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

@Injectable()
export class OrderService {
    constructor(private dbFacadeService: DBFacadeService) { }

    async createOrderSession(createOrderSessionForm: CreateOrderSessionForm, user: AuthUser) {
        const orderSession: OrderSession = {
            ...createOrderSessionForm, created: Date.now(), createdBy: user.uuid, uuid: uuidv4(),
            isActive: true, orders: []
        }
        const createdOrderSession = await this.dbFacadeService.createOrderSession(orderSession);
        return createdOrderSession;
    }

    async createOrder(createOrderForm: CreateOrderForm, user: AuthUser) {
        const orderSession = await this.dbFacadeService.getOrderSession(createOrderForm.sessionUuid);
        if (!orderSession) {
            throw 'Order session not found.';
        }

        const userOrder: UserOrder = {
            ...createOrderForm, created: Date.now(), userUuid: user.uuid, uuid: uuidv4()
        }
        const createdUserOrder = await this.dbFacadeService.createUserOrder(userOrder);
        return createdUserOrder;
    }

    async deleteOrder(orderSessionUuid: string, userUuid: string) {
        const orderSession = await this.dbFacadeService.getOrderSession(orderSessionUuid);
        if (!orderSession) {
            throw 'Order session not found.';
        }

        const order = orderSession.orders.find(order => order.userUuid === userUuid);
        if (!order) {
            throw 'Order for user not found.';
        }

        await this.dbFacadeService.deleteOrder(orderSessionUuid, order.uuid);
    }

    getOrderSession(orderSessionUuid: string) {
        return this.dbFacadeService.getOrderSession(orderSessionUuid);
    }
}
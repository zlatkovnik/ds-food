import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { UserDTO } from 'src/models/auth.model';
import { CreateOrderForm, OrderSession, UserOrder } from 'src/models/order.model';

@Injectable()
export class DBFacadeService {
    dbPath = 'db.json';

    async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<UserDTO> {
        const buffer = await readFile(this.dbPath);
        const db = JSON.parse(buffer.toString());
        return db.users.find(user => user.email === usernameOrEmail || user.username === usernameOrEmail);
    }

    async addNewUser(user: UserDTO) {
        const buffer = await readFile(this.dbPath);
        const db = JSON.parse(buffer.toString());
        db.users.push(user);
        writeFile(this.dbPath, JSON.stringify(db));
        return user;
    }

    async createOrderSession(orderSession: OrderSession) {
        const buffer = await readFile(this.dbPath);
        const db = JSON.parse(buffer.toString());
        db.orderSessions.push(orderSession);
        writeFile(this.dbPath, JSON.stringify(db));
        return orderSession;
    }

    async getOrderSession(orderSessionUuid: string): Promise<OrderSession> {
        const buffer = await readFile(this.dbPath);
        const db = JSON.parse(buffer.toString());
        return db.orderSessions.find(order => order.uuid === orderSessionUuid);
    }

    async createUserOrder(userOrder: UserOrder) {
        const buffer = await readFile(this.dbPath);
        const db = JSON.parse(buffer.toString());
        const orderSession = db.orderSessions.find(session => session.uuid = userOrder.sessionUuid);
        orderSession.orders.push(userOrder);
        writeFile(this.dbPath, JSON.stringify(db));
        return userOrder;
    }

    async deleteOrder(orderSessionUuid: string, orderUuid: string) {
        const buffer = await readFile(this.dbPath);
        const db = JSON.parse(buffer.toString());
        const orderSession = db.orderSessions.find(session => session.uuid = orderSessionUuid);
        orderSession.orders = orderSession.orders.filter(order => order.uuid !== orderUuid);
        writeFile(this.dbPath, JSON.stringify(db));
        return;
    }

}
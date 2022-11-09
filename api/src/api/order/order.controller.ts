import { Body, Controller, Delete, Get, HttpStatus, Post, Req, Res, Session } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthCookie } from "src/models/auth.model";
import { CreateOrderForm, CreateOrderSessionForm, OrderSession, UserOrder } from "src/models/order.model";
import { OrderService } from "./order.service";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Post('createOrderSession')
    async createOrderSession(@Body() createOrderSessionForm: CreateOrderSessionForm, @Res() res: Response,
        @Session() session: AuthCookie) {
        if (!session || !session.user) {
            return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ message: 'You are not logged in.' });
        }
        if (session.user.role !== 'ADMIN') {
            return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ message: 'You are not the admin.' });
        }
        if (!createOrderSessionForm.deliveryCost) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Delivery cost is required.' });
        }
        if (!createOrderSessionForm.expire) {
            createOrderSessionForm.expire = Date.now() + 1000 * 60 * 60 * 12;
        }
        if (!createOrderSessionForm.restaurant) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Restaurant is required.' });
        }
        if (!createOrderSessionForm.vendor) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Vendor is required.' });
        }

        let orderSession: OrderSession;
        try {
            orderSession = await this.orderService.createOrderSession(createOrderSessionForm, session.user);
        } catch (err: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
        }
        return res.status(HttpStatus.OK).json({ message: 'OK', data: orderSession });
    }

    @Post('createOrder')
    async createOrder(@Body() createOrderForm: CreateOrderForm, @Res() res: Response,
        @Session() session: AuthCookie) {
        if (!session || !session.user) {
            return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ message: 'You are not logged in.' });
        }
        if (!createOrderForm.meal) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Meal is required.' });
        }
        if (!createOrderForm.price) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Price is required.' });
        }
        if (!createOrderForm.sessionUuid) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Order session not selected.' });
        }

        let order: UserOrder;
        try {
            order = await this.orderService.createOrder(createOrderForm, session.user);
        } catch (err: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
        }
        return res.status(HttpStatus.OK).json({ message: 'OK', data: order });
    }

    @Delete('deleteOrder/:sessionUuid')
    async deleteOrder(@Req() req: Request, @Res() res: Response,
        @Session() session: AuthCookie) {
        if (!session || !session.user) {
            return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ message: 'You are not logged in.' });
        }
        const sessionUuid = req.params['sessionUuid'] as string;
        if (!sessionUuid) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Order session is required.' });
        }
        this.orderService.deleteOrder(sessionUuid, session.user.uuid);
        return res.status(HttpStatus.OK).json({ message: 'OK' });
    }
}
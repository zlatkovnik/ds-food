import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { OrderModule } from './api/order/order.module';

@Module({
    imports: [AuthModule, OrderModule],
    controllers: [],
    providers: [],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { DBModule } from 'src/db/db.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';


@Module({
    imports: [DBModule],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule { }

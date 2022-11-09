import { Module } from '@nestjs/common';
import { DBModule } from 'src/db/db.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


@Module({
    imports: [DBModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }

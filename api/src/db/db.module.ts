import { Module } from '@nestjs/common';
import { DBFacadeService } from './db-facade.service';
import { PrismaService } from './prisma.service';


@Module({
    imports: [],
    exports: [DBFacadeService],
    controllers: [],
    providers: [DBFacadeService, PrismaService],
})
export class DBModule { }

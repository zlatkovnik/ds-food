import { Module } from '@nestjs/common';
import { DBFacadeService } from './db-facade.service';


@Module({
    imports: [],
    exports: [DBFacadeService],
    controllers: [],
    providers: [DBFacadeService],
})
export class DBModule { }

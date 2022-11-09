import { Injectable } from '@nestjs/common';
import { DBFacadeService } from '../../db/db-facade.service';
import * as bcrypt from 'bcrypt';
import { AuthUserRole, RegistrationForm } from 'src/models/auth.model';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(private dbFacadeService: DBFacadeService) { }

    getUserByUsernameOrEmail(usernameOrEmail: string) {
        return this.dbFacadeService.getUserByUsernameOrEmail(usernameOrEmail);
    }

    async addNewUser(registrationForum: RegistrationForm) {
        const hashedPassword = await this.hashPassword(registrationForum.password);
        const uuid = uuidv4();
        return this.dbFacadeService.addNewUser({ ...registrationForum, uuid: uuid, password: hashedPassword, role: AuthUserRole.USER });
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 1);
    }
}

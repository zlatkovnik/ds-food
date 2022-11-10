import { Injectable } from '@nestjs/common';
import { DBFacadeService } from '../../db/db-facade.service';
import * as bcrypt from 'bcrypt';
import { RegistrationForm } from 'src/models/auth.model';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(private dbFacadeService: DBFacadeService) { }

    async getUserByUsernameOrEmail(usernameOrEmail: string) {
        const userByEmail = await this.dbFacadeService.getUserByEmail(usernameOrEmail);
        if (userByEmail) {
            return userByEmail;
        }
        return await this.dbFacadeService.getUserByUsername(usernameOrEmail);
    }

    async addNewUser(registrationForum: RegistrationForm) {
        const hashedPassword = await this.hashPassword(registrationForum.password);
        const uuid = uuidv4();
        return this.dbFacadeService.addNewUser({ ...registrationForum, uuid: uuid, password: hashedPassword, role: 'USER' });
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 1);
    }
}

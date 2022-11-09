import { Body, Controller, Get, HttpStatus, Post, Res, Session } from '@nestjs/common';
import { Response } from 'express';
import { AuthCookie, LoginForm, RegistrationForm, AuthUser } from '../../models/auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() registrationForm: RegistrationForm, @Res() res: Response<{ message: string }>) {
        const { email, username, password } = registrationForm;
        if (!email) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Email not valid!' });
        }
        if (!username || username.length < 3) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Username not valid!' });
        }
        if (!password || password.length < 3) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Password not valid!' });
        }

        const existingUser = await this.authService.getUserByUsernameOrEmail(username)
            || await this.authService.getUserByUsernameOrEmail(email);
        if (existingUser) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'User already exists!' });
        }

        await this.authService.addNewUser(registrationForm);
        return res.status(HttpStatus.OK).json({ message: 'OK' });
    }

    @Post('login')
    async login(@Body() loginForm: LoginForm, @Res() res: Response<{ message: string, data?: AuthUser }>,
        @Session() session: AuthCookie) {
        const { usernameOrEmail, password } = loginForm;
        if (!usernameOrEmail || usernameOrEmail.length < 3) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Username/Email not valid!' });
        }
        if (!password || password.length < 3) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Password not valid!' });
        }

        const existingUser = await this.authService.getUserByUsernameOrEmail(usernameOrEmail);
        if (existingUser) {
            const filteredUser = this.filterKeys<AuthUser>(existingUser, ['password']);
            session.user = filteredUser;
            return res.status(HttpStatus.OK)
                .json({ message: 'OK', data: filteredUser });
        }
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found.' });
    }

    @Get('logout')
    logout(@Res() res: Response<{ message: string }>, @Session() session: AuthCookie) {
        console.log(session);
        if (session && session.user) {
            session.user = null;
        }
        return res.status(HttpStatus.OK).json({ message: 'OK' });
    }

    private filterKeys<T>(object: any, keysToFilter: string[]): T {
        return Object.keys(object)
            .filter(key => !keysToFilter.includes(key))
            .reduce((acc, key) => ({ ...acc, [key]: object[key] }), {}) as T;
    }
}

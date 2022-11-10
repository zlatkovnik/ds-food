import { AuthUser } from "@prisma/client";

export interface RegistrationForm {
    email: string;
    username: string;
    password: string;
}

export interface LoginForm {
    usernameOrEmail: string;
    password: string;
}

export interface AuthCookie {
    cookie: any;
    user: AuthUser;
}
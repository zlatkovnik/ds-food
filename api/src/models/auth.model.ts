export interface RegistrationForm {
    email: string;
    username: string;
    password: string;
}

export interface LoginForm {
    usernameOrEmail: string;
    password: string;
}

export interface UserDTO {
    uuid: string;
    email: string;
    username: string;
    password: string;
    role: AuthUserRole;
}

export enum AuthUserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface AuthUser {
    uuid: string;
    email: string;
    username: string;
    role: AuthUserRole;
}

export interface AuthCookie {
    cookie: any;
    user: AuthUser;
}
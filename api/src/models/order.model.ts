export interface CreateOrderForm {
    meal: string;
    condaments?: string;
    price: number;
    sessionUuid: string;
}

export interface CreateOrderSessionForm {
    expire: number;
    deliveryCost: number;
    restaurant: string;
    vendor: Vendor;
}

export interface OrderSession {
    uuid: string;
    created: number;
    createdBy: string;
    expire: number;
    orders: UserOrder[];
    deliveryCost: number;
    restaurant: string;
    vendor: Vendor;
    isActive: boolean;
}

export interface UserOrder {
    uuid: string;
    userUuid: string;
    sessionUuid: string;
    created: number;
    meal: string;
    condaments?: string;
    price: number;
}

export enum Vendor {
    GLOVO = 'GLOVO',
    WOLT = 'WOLT',
    MR_D = 'MR_D'
}
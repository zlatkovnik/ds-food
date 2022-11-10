export interface CreateOrderForm {
    meal: string;
    condaments: string;
    price: number;
    orderSessionUuid: string;
}

export interface CreateOrderSessionForm {
    expire: Date;
    deliveryCost: number;
    restaurant: string;
    vendor: 'GLOVO' | 'WOLT' | 'MR_D';
}
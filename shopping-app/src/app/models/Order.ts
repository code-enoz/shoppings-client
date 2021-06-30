export class Order{
    public constructor(
        public userId: number,
        public cartId: number,
        public price: number,
        public city: string,
        public street: string,
        public deliveryDate: Date,
        public orderedAt: Date,
        public cr4Digits: number
    ){}
}
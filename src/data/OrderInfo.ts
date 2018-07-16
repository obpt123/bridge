namespace data {
    export class OrderInfo extends Array<OrderItem>  {
        public toString(): string {
            return this.reduce(
                (p, current) => p + current.toString() , "");
        }
    }
    export class OrderItem {
        constructor(public field: string, public type: OrderType = OrderType.ASC) {
            this.field = field;
            this.type = type;
        }
        public toString(): string {
            let op = this.type === OrderType.ASC ? '+' : "-";
            return `${op}${this.field}`;
        }

    }
    export const enum OrderType {
        /// <summary>
        /// 正序
        /// </summary>
        ASC,
        /// <summary>
        /// 反序
        /// </summary>
        DESC,
    }
}
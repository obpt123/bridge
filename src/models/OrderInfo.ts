namespace bridge {
    export class OrderInfo extends Array<OrderItem>  {
        public toString(): string {
            return this.reduce(
                (p, current) => p + current.toString() , "");
        }
    }
    export class OrderItem {
        constructor(field: string, type: OrderType = OrderType.ASC) {
            this.field = field;
            this.type = type;
        }
        private _field: string;
        public get field(): string {
            return this._field;
        }
        public set field(v: string) {
            this._field = v;
        }

        private _type: OrderType = OrderType.ASC;
        public get type(): OrderType {
            return this._type;
        }
        public set type(v: OrderType) {
            this._type = v;
        }
        public toString(): string {
            let op = this.type === OrderType.ASC ? '+' : "-";
            return `${op}${this.field}`;
        }

    }
    export enum OrderType {
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
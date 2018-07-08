namespace bridge {
    export class PageInfo {
        constructor(offset:number,limit:number=100) {
           this.offset=offset;
           this.limit=limit;
        }
        private _offset: number = 0;
        public get offset(): number {
            return this._offset;
        }
        public set offset(v: number) {
            this._offset = v;
        }

        private _limit: number = 100;
        public get limit(): number {
            return this._limit;
        }
        public set limit(v: number) {
            this._limit = v;
        }

    }
}
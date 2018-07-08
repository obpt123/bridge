namespace bridge {
    export class SearchInfo {

        private constructor() {
        }

        //#region 属性
        private _opType: OpType;
        public get OpType(): OpType {
            return this._opType;
        }
        public set OpType(v: OpType) {
            this._opType = v;
        }

        private _FieldName: string;
        public get FieldName(): string {
            return this._FieldName;
        }
        public set FieldName(v: string) {
            this._FieldName = v;
        }

        private _SearchType: SearchType;
        public get SearchType(): SearchType {
            return this._SearchType;
        }
        public set SearchType(v: SearchType) {
            this._SearchType = v;
        }


        private _Value: any;
        public get Value(): any {
            return this._Value;
        }
        public set Value(v: any) {
            this._Value = v;
        }

        private _Items: SearchInfo[];
        public get Items(): SearchInfo[] {
            return this._Items;
        }
        public set Items(v: SearchInfo[]) {
            this._Items = v;
        }

        //#endregion

        public static CreateItem(fieldName: string, searchType: SearchType, value: object): SearchInfo {
            let res = new SearchInfo();
            res.OpType = OpType.SingleItem;
            res.FieldName = fieldName;
            res.SearchType = searchType;
            res.Value = value;
            return res;
        }
        public static CreateOr(items: SearchInfo[] = []): SearchInfo {
            let res = new SearchInfo();
            res.OpType = OpType.OrItems;
            res.Items=items;
            return res;
        }
        public static CreateAnd(items: SearchInfo[] = []): SearchInfo {
            let res = new SearchInfo();
            res.OpType = OpType.AndItems;
            res.Items=items;
            return res;
        }

        public AndAlso(s: SearchInfo): SearchInfo {
            if (!s) return this;
            if (this.OpType === OpType.AndItems) {
                if (s.OpType === OpType.AndItems) {
                    this.Items.push(...s.Items);
                    return this;
                }
                else {
                    this.Items.push(s);
                    return this;
                }
            }
            else {
                return SearchInfo.CreateAnd([this, s]);
            }
        }

        public OrElse(s: SearchInfo): SearchInfo {
            if (this.OpType === OpType.OrItems) {
                if (s.OpType === OpType.OrItems) {
                    this.Items.push(...s.Items);
                }
                else {
                    this.Items.push(s);
                }
                return this;
            }
            else {
                return SearchInfo.CreateOr([this, s]);
            }
        }
        public Not(): SearchInfo {
            if (this.OpType === OpType.SingleItem) {
                this.SearchType = ~(this.SearchType);
                return this;
            }
            else if (this.OpType === OpType.AndItems) {
                this.Items.forEach((i) => { i.Not() });
                return SearchInfo.CreateOr(this.Items);
            }
            else {
                this.Items.forEach((i) => { i.Not() });
                return SearchInfo.CreateAnd(this.Items);
            }
        }

    }
    export enum SearchType {
        /// <summary>
        /// ==
        /// </summary>
        Equals = 0,
        /// <summary>
        /// !=
        /// </summary>
        NotEquals = ~Equals,
        /// <summary>
        /// 大于
        /// </summary>
        GreaterThan = 1,
        /// <summary>
        /// 小于或等于
        /// </summary>
        LessThanOrEqual = ~GreaterThan,
        /// <summary>
        /// 小于
        /// </summary>
        LessThan = 2,
        /// <summary>
        /// 大于或等于
        /// </summary>
        GreaterThanOrEqual = ~LessThan,
        /// <summary>
        /// Between
        /// </summary>
        Between = 3,
        /// <summary>
        /// Not Between
        /// </summary>
        NotBetween = ~Between,
        /// <summary>
        /// In
        /// </summary>
        In = 4,
        /// <summary>
        /// Not In
        /// </summary>
        NotIn = ~In,
        /// <summary>
        /// Like
        /// </summary>
        StartsWith = 5,
        /// <summary>
        /// not like
        /// </summary>
        NotStartsWith = ~StartsWith,
        /// <summary>
        /// like
        /// </summary>
        EndsWith = 6,
        /// <summary>
        /// not like
        /// </summary>
        NotEndsWith = ~EndsWith,
        /// <summary>
        /// like
        /// </summary>
        Contains = 7,
        /// <summary>
        /// not like
        /// </summary>
        NotContains = ~Contains
    }
    export enum OpType {
        AndItems,
        OrItems,
        SingleItem,
    }
}
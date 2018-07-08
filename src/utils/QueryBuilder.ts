namespace bridge {

    export class QueryBuilder {
        public static DEFAULT_ORDER_NAME: string = "order";
        public static DEFAULT_SEARCH_NAME: string = "query";
        public static DEFAULT_SAMPLE_SEARCH_PREFIX = "$";
        public static DEFAULT_PAGE_INDEX_NAME = "pageIndex";
        public static DEFAULT_PAGE_SIZE_NAME = "pageSize";
        public static DEFAULT_LIMIT_NAME = "limit";
        public static DEFAULT_OFFSET_NAME = "offset";


        public static buildOrderQuery(order: OrderInfo): { [index: string]: string } {
            if (!order) return {};
            let res = {};
            res[this.DEFAULT_ORDER_NAME] = order.toString()
            return res;
        }

        public static buildPageQuery(page: PageInfo): { [index: string]: string } {
            if (!page) return {};
            let res = {};
            if (page.offset) {
                res[QueryBuilder.DEFAULT_OFFSET_NAME] = page.offset;
            }
            res[QueryBuilder.DEFAULT_LIMIT_NAME] = page.limit;
            return res;
        }
        public static buildSearchQuery(sc: SearchInfo): { [index: string]: string } {
            let res = {};


            return res;
        }
        private static buildSampleQuery(sc: SearchInfo): { [index: string]: string } {
            let res = {};
            if (sc.OpType === OpType.SingleItem) {
                res[`${this.DEFAULT_SAMPLE_SEARCH_PREFIX}${sc.FieldName}`] = sc.Value
            }
            else {
                sc.Items.forEach((v) => {
                    res[`${this.DEFAULT_SAMPLE_SEARCH_PREFIX}${v.FieldName}`] = v.Value
                });
            }
            return res;
        }
        private static isSampleQuery(sc: SearchInfo): boolean {
            if (sc.OpType === OpType.SingleItem) {
                return sc.SearchType === SearchType.Equals;
            } else if (sc.OpType === OpType.AndItems) {
                return sc.Items.every((v) => v.OpType === OpType.SingleItem
                    && v.SearchType === SearchType.Equals);
            }
            return false;
        }

        private static buildComplexQuery(sc: SearchInfo): { [index: string]: string } {
            let jsonStr = JSON.stringify(sc);
            let res = {};
            res[QueryBuilder.DEFAULT_SEARCH_NAME] = btoa(jsonStr);
            return res;
        }
    }




}
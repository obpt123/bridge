import PageInfo = data.PageInfo;
import OrderInfo = data.OrderInfo;
import SearchInfo = data.SearchInfo;
import OpType = data.OpType;
import SearchType = data.SearchType;

namespace api {

    export interface QueryConfig {
        readonly order_name: string;
        readonly search_name: string;
        readonly sample_search_prefix: string;
        readonly limit_name: string;
        readonly offset_name: string;
        readonly enable_sample_query: boolean;
    }
    export var DefaultQueryConfig: QueryConfig = {
        order_name: "order",
        search_name: "sc",
        sample_search_prefix: "$",
        limit_name: "limit",
        offset_name: "offset",
        enable_sample_query: true
    }
    export class QueryBuilder {

        constructor(public readonly config: QueryConfig = DefaultQueryConfig) {
        }

        public appendOrderQuerys(order: OrderInfo, dest: { [index: string]: string }): void {
            if (!order) return;
            dest[this.config.order_name] = order.toString()
        }

        public appendPageQuery(page: PageInfo, dest: { [index: string]: string }): void {
            if (!page) return;
            if (page.offset) {
                dest[this.config.offset_name] = page.offset.toString();
            }
            if (page.limit) {
                dest[this.config.limit_name] = page.limit.toString();
            }
        }
        public appendSearchQuery(sc: SearchInfo, dest: { [index: string]: string }): void {
            if (!sc) return;
            if (this.config.enable_sample_query && this.isSampleQuery(sc)) {
                this.appendSampleQuery(sc, dest);
            } else {
                this.appendComplexQuery(sc, dest);
            }
        }
        private appendSampleQuery(sc: SearchInfo, dest: { [index: string]: string }): void {
            if (sc.OpType === OpType.SingleItem) {
                dest[`${this.config.sample_search_prefix}${sc.FieldName}`] = sc.Value.toString()
            }
            else {
                sc.Items.forEach((v) => {
                    dest[`${this.config.sample_search_prefix}${v.FieldName}`] = v.Value.toString()
                });
            }
        }
        private isSampleQuery(sc: SearchInfo): boolean {
            if (sc.OpType === OpType.SingleItem) {
                return sc.SearchType === SearchType.Equals;
            } else if (sc.OpType === OpType.AndItems) {
                return sc.Items.every((v) => v.OpType === OpType.SingleItem
                    && v.SearchType === SearchType.Equals && v.Value);
            }
            return false;
        }
        private appendComplexQuery(sc: SearchInfo, dest: { [index: string]: string }) {
            dest[this.config.search_name] = btoa(JSON.stringify(sc));
        }
    }









}
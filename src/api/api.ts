/// <reference path="query.ts" />

import Http = client.Http;
import ResultInfo = data.ResultInfo;
import ResultData = data.ResultData;
namespace api {
    export class Api {
        /**
         *
         */
        constructor(public http: Http) {
        }

    }
    export class AuthApi extends Api {
        constructor(http: Http) {
            super(http);
        }
    }

    export class ResApi<T> extends Api {
        constructor(protected readonly queryBuilder: QueryBuilder,
            http: Http = new Http()) {
            super(http);
        }

        public List(sc: SearchInfo, order: OrderInfo): ResultData<Array<T>> {
            let querys: { [index: string]: string } = {};
            this.queryBuilder.appendSearchQuery(sc, querys);
            this.queryBuilder.appendOrderQuerys(order, querys);
            //  this.http.get({ 

            // })
            // this.http.get(url, {})
            return null;

        }
        public Page(pageinfo: PageInfo, sc: SearchInfo, order: OrderInfo): ResultData<Array<T>> {
            return null;
        }
        public Add<T>(data: T): ResultData<T> {
            return null;
        }
        public Find<T>(key: string): ResultData<T> {
            return null;
        }
        public Delete<T>(key: string): ResultInfo {
            return null;
        }
        public Update<T>(key: string, data: T): ResultData<T> {
            return null;
        }



    }
}
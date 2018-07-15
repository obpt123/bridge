import Http=client.Http;
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

    public doLogin(userName: string, password: string, verifiCode: string): any {

    }
}

export class ResApi<T> extends Api {

    protected readonly queryBuilder: QueryBuilder;
    constructor(
        queryConfig: QueryConfig = DefaultQueryConfig,
        http: Http = new Http()) {
        super(http);
        this.queryBuilder = new QueryBuilder(queryConfig);
    }

    public List(sc: SearchInfo, order: OrderInfo): ResultData<Array<T>> {
        let querys: { [index: string]: string } = {};
        this.queryBuilder.appendSearchQuery(sc, querys);
        this.queryBuilder.appendOrderQuerys(order, querys);
        let url = this.urlBuilder.buildUrl([""], querys);
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
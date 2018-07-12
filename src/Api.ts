import SearchInfo = bridge.SearchInfo;
import OrderInfo = bridge.OrderInfo;
import PageInfo = bridge.PageInfo;
import ResultInfo = bridge.ResultInfo;
import ResultData = bridge.ResultData;
import QueryConfig = bridge.QueryConfig;
import DefaultRestConfig=bridge.DefaultRestConfig;
import DefaultQueryConfig=bridge.DefaultQueryConfig;
import QueryBuilder=bridge.QueryBuilder;
import UrlBuilder=bridge.UrlBuilder;
import { request } from "http";

namespace bridge {


    type RequestHook = (r: Request) => Promise<Request>;
    type ResponseHook = (r: Response) => Promise<Response>;

    export class HttpClient {

        public static GlobalRequsetHooks: RequestHook[] = [];
        public static GlobalReponseHooks: ResponseHook[] = [];

        public RequestHooks: RequestHook[] = [];
        public ReponseHooks: ResponseHook[] = [];

        public get(url: string, headers: { [index: string]: string }): Promise<Response> {
            return this.send(url, { method: "get", headers: headers });
        }
        public post(url: string, headers: { [index: string]: string }, body?: any): Promise<Response> {
            return this.send(url, { method: "post", headers: headers, body: body });
        }
        public put(url: string, headers: { [index: string]: string }, body?: any): Promise<Response> {
            return this.send(url, { method: "put", headers: headers, body: body });
        }
        public delete(url: string, headers: { [index: string]: string }, body?: any): Promise<Response> {
            return this.send(url, { method: "delete", headers: headers, body: body });
        }
        public patch(url: string, headers: { [index: string]: string }, body?: any): Promise<Response> {
            return this.send(url, { method: "patch", headers: headers, body: body });
        }
        public send(input?: Request | string, init?: RequestInit): Promise<Response> {
            let request = new Request(input, init);
            return this.handleRequest(request).then((r) => fetch(r))
        }

        private handleRequest(request: Request): Promise<Request> {
            let allHooks: RequestHook[] = [...HttpClient.GlobalRequsetHooks, ...this.RequestHooks];
            return allHooks.reduce((prev, current) => current ? prev.then(a => current(a)) : prev,
                new Promise<Request>(v => request));
        }
        private handleResponse(reponse: Response): Promise<Response> {
            let allHooks: ResponseHook[] = [...HttpClient.GlobalReponseHooks, ...this.ReponseHooks];
            return allHooks.reduce((prev, current) => current ? prev.then(a => current(a)) : prev,
                new Promise<Response>(v => reponse));
        }
    }

    export class Api {

        public readonly queryBuilder:QueryBuilder;
        public readonly urlBuilder:UrlBuilder;
        constructor(private restConfig: RestConfig=DefaultRestConfig, 
                    private queryConfig: QueryConfig=DefaultQueryConfig, 
                    public readonly client: HttpClient = new HttpClient()) {
                 this.urlBuilder=new UrlBuilder(restConfig);
                 this.queryBuilder=new QueryBuilder(queryConfig);         
        }

        public List<T>(sc: SearchInfo, order: OrderInfo): ResultData<Array<T>> {
            return null;
        }
        public Page<T>(pageinfo: PageInfo, sc: SearchInfo, order: OrderInfo): ResultData<Array<T>> {
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

    export interface RestConfig {
        readonly protocol?: string;
        readonly host?: string;
        readonly port?: number;
        readonly prefix?: string
    }

    export var DefaultRestConfig: RestConfig = {
        prefix: "api/v1"
    }

}

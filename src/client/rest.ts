/// <reference path="url.ts" />
namespace client {
    export interface RestConfig {
        readonly protocol?: string;
        readonly host?: string;
        readonly port?: number;
        readonly prefix?: string
    }
    export var DefaultRestConfig: RestConfig = {
        prefix: "api/v1"
    }
    export interface RestInfo {
        readonly path?: string;
        readonly querys?: { [index: string]: string };
        readonly body?: any;
        readonly headers?: { [index: string]: string };
    }
    export interface RestResponse {
        readonly headers: { [index: string]: string };
        readonly ok: boolean;
        readonly redirected: boolean;
        readonly status: number;
        readonly statusText: string;
        readonly url: string;
        readonly body: any;
    }

    type RequestHook = (r: Request) => Request
    type ResponseHook = (r: Response) => Response;

    export class Http {
        public static readonly GlobalRequsetHooks: RequestHook[] = [];
        public static readonly GlobalReponseHooks: ResponseHook[] = [];

        public readonly RequestHooks: RequestHook[] = [];
        public readonly ReponseHooks: ResponseHook[] = [];

        constructor(public config: RestConfig = DefaultRestConfig) {
        }

        public get(restOrPath: RestInfo | string): Promise<Response> {
            return this.send("get", this.assertRestInfo(restOrPath));
        }
        public post(restOrPath: RestInfo | string): Promise<Response> {
            return this.send("post", this.assertRestInfo(restOrPath));
        }
        public put(restOrPath: RestInfo | string): Promise<Response> {
            return this.send("put", this.assertRestInfo(restOrPath));
        }
        public delete(restOrPath: RestInfo | string): Promise<Response> {
            return this.send("delete", this.assertRestInfo(restOrPath));
        }
        public patch(restOrPath: RestInfo | string): Promise<Response> {
            return this.send("patch", this.assertRestInfo(restOrPath));
        }

        public send(method: string, rest: RestInfo): Promise<Response> {
            let url = this.buildUrl([rest.path], rest.querys);
            let request = new Request(url, { method: method, headers: rest.headers, body: rest.body });
            request = this.handleRequest(request);
            return fetch(request);
            
        }

        private assertRestInfo(restOrPath: RestInfo | string): RestInfo {
            return (typeof restOrPath === "string") ? { path: restOrPath } : { path: "/", ...restOrPath };
        }

        private handleRequest(request: Request): Request {
            let allHooks: RequestHook[] = [...Http.GlobalRequsetHooks, ...this.RequestHooks];
            return allHooks.reduce((prev, curr) => (prev && curr) ? curr(prev) : prev, request);
        }
        private handleResponse(response: Response): Response {
            let allHooks: ResponseHook[] = [...Http.GlobalReponseHooks, ...this.ReponseHooks];
            return allHooks.reduce((prev, curr) => (prev && curr) ? curr(prev) : prev, response);
        }
        private buildUrl(paths: string[], querys: { [index: string]: string }): string {
            if (this.config) {
                return buildUrl(this.config.protocol,
                    this.config.host,
                    this.config.port,
                    this.config.prefix
                    , paths, querys);
            } else {
                return buildUrl(null, null, null, null, paths, querys);
            }
        }
    }
}
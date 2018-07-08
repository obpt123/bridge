import SearchInfo =bridge.SearchInfo;
import OrderInfo=bridge.OrderInfo;
import PageInfo=bridge.PageInfo;
import ResultInfo=bridge.ResultInfo;
import ResultData=bridge.ResultData;

namespace bridge {
    export class Api {

        //#region 静态属性
        private static _config : RestConfig;
        public static get config() : RestConfig {
            return Api._config;
        }
        public static set config(v : RestConfig) {
            Api._config = v;
        }
        //#endregion
        


        public static List<T>(sc:SearchInfo,order:OrderInfo,config?:RestConfig):ResultData<Array<T>>
        {
            return null;
        }
        public static Page<T>(pageinfo:PageInfo,sc:SearchInfo,order:OrderInfo,config?:RestConfig):ResultData<Array<T>>
        {
            return null;
        }
        public static Add<T>(data:T,config?:RestConfig):ResultData<T>
        {
            return null;
        }
        public static Find<T>(key:string,config?:RestConfig):ResultData<T>
        {
            return null;
        }
        public static Delete<T>(key:string,config?:RestConfig):ResultInfo
        {
            return null;
        }
        public static Update<T>(key:string,data:T,config?:RestConfig):ResultData<T>
        {
            return null;
        }
    }

    export class RestConfig {

        constructor(protocol?:string,host?:string,port?:number,prefix?:string){
            this.protocol = protocol;
            this.host = host;
            this.port = port;
            this.prefix = prefix;
        }

        private _protocol: string;
        public get protocol(): string {
            return this._protocol;
        }
        public set protocol(v: string) {
            this._protocol = v;
        }
        private _host: string;
        public get host(): string {
            return this._host;
        }
        public set host(v: string) {
            this._host = v;
        }


        private _port: number;
        public get port(): number {
            return this._port;
        }
        public set port(v: number) {
            this._port = v;
        }

        private _prefix: string;
        public get prefix(): string {
            return this._prefix;
        }
        public set prefix(v: string) {
            this._prefix = v;
        }
    }
    
    export function Path(path:string) {
        return function(target:any){

        }
    }
}

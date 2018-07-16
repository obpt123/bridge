namespace data {
    export interface ResultInfo {
        message:string
        code:number,
        success:boolean
    }
    export interface ResultData<T> extends ResultInfo {
        data:T;
    }
}

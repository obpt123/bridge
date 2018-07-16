namespace data {
    export class PageInfo {
        constructor(public offset:number,public limit:number=100) {
           this.offset=offset;
           this.limit=limit;
        }
    }
}
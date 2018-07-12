import SearchInfo = bridge.SearchInfo;
import OrderInfo = bridge.OrderInfo;
import PageInfo = bridge.PageInfo;
import ResultInfo = bridge.ResultInfo;
import ResultData = bridge.ResultData;

namespace bridge {
    export interface IRest<T> {
        List(sc: SearchInfo, order: OrderInfo): ResultData<Array<T>>;
        Page(pageinfo: PageInfo, sc: SearchInfo, order: OrderInfo): ResultData<Array<T>>;
        Add(data: T): ResultData<T>;
        Find(key: string): ResultData<T>;
        Get(sc: SearchInfo, order: OrderInfo): ResultData<T>;
        Delete(key: string): ResultInfo;
        Update(key: string, data: T): ResultData<T>;
    }
}
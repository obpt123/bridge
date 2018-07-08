import ResultInfo = bridge.ResultInfo;
namespace bridge {
    export class ResultData<T> extends ResultInfo {

        private _data: T;
        public get data(): T {
            return this._data;
        }
        public set data(v: T) {
            this._data = v;
        }
    }
}
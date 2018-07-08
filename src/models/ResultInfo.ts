namespace bridge {
    export class ResultInfo {

        private _message: string;
        public get message(): string {
            return this._message;
        }
        public set message(v: string) {
            this._message = v;
        }

        private _code: number;
        public get code(): number {
            return this._code;
        }
        public set code(v: number) {
            this._code = v;
        }


        private _success: boolean;
        public get success(): boolean {
            return this._success;
        }
        public set success(v: boolean) {
            this._success = v;
        }



    }
}

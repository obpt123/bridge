import RestConfig = bridge.RestConfig;
import Api = bridge.Api;
import Path = bridge.Path;
namespace demo {

    let baseConfig = new RestConfig();
    function init(): void {
        Api.config = new RestConfig(
            "", "", 80, "api/v1"
        );


    }
    function run(): void {
        Api.Find<User1>('0001');
        Api.Delete<User1>('0001');
    }

    @Path("users")
    export class User1 {
        public Id: string;
        public name: string;
    }



}
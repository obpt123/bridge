import RestConfig = bridge.RestConfig;
import DefaultRestConfig = bridge.DefaultRestConfig;
namespace bridge {

    export class UrlBuilder {
        /**
         *
         */
        constructor(public readonly restConfig: RestConfig = DefaultRestConfig) {
        }
        public buildUrl(paths: string[], querys: { [index: string]: string }): string {
            return buildUrl(this.restConfig.protocol,
                            this.restConfig.host,
                            this.restConfig.port,
                            this.restConfig.prefix
                            , paths, querys);
        }

    }
    export function buildUrl(protocol: string, host: string, port: number, prefix: string, paths: string[], querys: { [index: string]: string }): string {
        let fullhost = buildHostWithProtocal(protocol, host, port);
        paths = paths ? [...paths] : [];
        if (prefix) {
            paths.unshift(prefix);
        }
        return concatUrl(fullhost, paths, querys);
    }
    export function buildHostWithProtocal(protocol: string, host: string, port: number): string {
        if (host) {
            let clearProtocal = trimProtocol(protocol);
            let protocol2 = clearProtocal ? `${clearProtocal}:` : "";
            return port ?
                `${protocol2}//${host}:${port}` :
                `${protocol2}//${host}`;
        }
        return "";
    }
    export function trimProtocol(protocol: string): string {
        return (!protocol) ? "" :
            protocol.replace("://", "")
                .replace(":\\\\", "")
                .replace(":", "");
    }
    export function concatUrl(fullhost: string, paths: string[], querys: { [index: string]: string }) {
        fullhost = fullhost || '';
        paths = paths ? paths : [];
        let fullPath = paths.map(v => trimPath(v))
            .filter(v => v)
            .join('/');
        let queryString: string = joinQueryString(querys);
        if (queryString) {
            return `${fullhost}/${fullPath}?${queryString}`;
        } else {
            return `${fullhost}/${fullPath}`;
        }
    }
    export function trimPath(path: string): string {
        if (path) {
            return path.replace(/^[/\\]*/, "").replace(/[/\\]*$/, "")
        }
        return "";
    }
    export function joinQueryString(querys: { [index: string]: string }) {
        let queryItems: string[] = [];
        if (querys) {
            for (const key in querys) {
                if (key && querys.hasOwnProperty(key)) {
                    const value = querys[key]
                    queryItems.push(value ? `${key}=${value}` : `${key}=`)
                }
            }
        }
        return queryItems.join("&");
    }
}
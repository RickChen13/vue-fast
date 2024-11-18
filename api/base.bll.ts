import config from "@/config/config";
import Request from "./request";

abstract class BaseBll {
    request: Request;

    constructor() {
        this.request = new Request();
    }

    /**
     * url处理
     *
     * @param url
     */
    reqUrl(url: string) {
        return `${config.hostUrl}${url}`;
    }

    /**
     * 请求前对发送的数据进行处理
     *
     * @param data
     */
    reqSetData(data: any) {
        return data;
    }
}

export default BaseBll;

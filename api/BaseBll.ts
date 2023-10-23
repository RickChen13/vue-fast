import Token from "@/app/common/Token";
import config from "@/config/config";

abstract class BaseBll {
    /**
     * 构造函数
     */
    constructor() { }

    /**
     * url处理
     *
     * @param url
     */
    reqUrl(url: string) {
        const requestUrl = `${config.hostUrl}${url}`;
        return requestUrl;
    }

    /**
     * 请求前对发送的数据进行处理
     *
     * @param data
     */
    reqSetData(data: any) {
        return data;
    }

    loginHeaders() {
        return {
            'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8',
            'Authorization': Token.get(),
        }
    }
}

export default BaseBll;

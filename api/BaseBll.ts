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
        let requestUrl;
        if (process.env.NODE_ENV === "development") {
            requestUrl = `${config.devHostUrl}${url}`;
        } else {
            requestUrl = `${config.hostUrl}${url}`;
        }
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
}

export default BaseBll;

import to from 'await-to-js';
import { type requestConfig, type requestError } from './BaseControllerInterface';
import axios, { type AxiosRequestConfig, type AxiosStatic } from 'axios';

abstract class BaseController {
    /**
     * 通用请求
     *
     * @param config
     * @returns
     */
    protected async request(config: requestConfig): Promise<any> {
        config = this.axiosCheckConfig(config);
        let axiosRequestConfig: AxiosRequestConfig<any>;
        if (config.method == 'post') {
            axiosRequestConfig = {
                url: config.url,
                data: config.data,
                method: config.method,
                timeout: config.timeout,
                headers: config.headers,
                signal: config.signal,
            };
        } else {
            axiosRequestConfig = {
                url: config.url,
                params: config.data,
                method: config.method,
                timeout: config.timeout,
                headers: config.headers,
                signal: config.signal,
            };
        }
        const [err, res] = await to(axios(axiosRequestConfig));
        let result: any;
        if (err != null) {
            result = this.error(err);
        } else {
            result = res ? res.data : res;
        }
        return new Promise((resolve) => {
            resolve(result);
        });
    }

    /**
     * 复杂请求时使用axios自定义请求
     *
     * @returns
     */
    protected getAxios(): AxiosStatic {
        return axios;
    }

    /**
     * 请求失败处理
     *
     * @param error
     */
    protected error(error: Error): requestError {
        let result: requestError;
        if (axios.isCancel(error)) {
            result = {
                result: false,
                code: -3,
                msg: '请求中断',
                dev: error.message
            };
        } else {
            // 处理错误
            result = {
                result: false,
                msg: '请求失败，请稍后再试',
                dev: error.message
            };
        }
        return result;
    }

    /**
     * 对传入参数进行处理
     *
     * @param config
     * @returns
     */
    private axiosCheckConfig(config: requestConfig) {
        if (config.headers == undefined) {
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8'
            };
        }
        if (config.timeout == undefined) {
            config.timeout = 0;
        }
        return config;
    }
}

export default BaseController;

import to from 'await-to-js';
import { type requestConfig, type requestError } from './BaseControllerInterface';
import axios, { type AxiosRequestConfig, type AxiosStatic } from 'axios';
import qs from 'qs';

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
                data: qs.stringify(config.data),
                method: config.method,
                timeout: config.timeout,
                headers: config.headers
            };
        } else {
            axiosRequestConfig = {
                url: config.url,
                params: config.data,
                method: config.method,
                timeout: config.timeout,
                headers: config.headers
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
        return {
            result: false,
            msg: '请求失败，请稍后再试',
            dev: error.message
        };
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
            config.timeout = 5000;
        }
        return config;
    }
}

export default BaseController;
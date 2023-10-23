export interface requestConfig {
    url: string;
    data: any;
    headers?: any;
    timeout?: number;
    method?: "post" | "get"; //请求方法
}

export interface requestError {
    result: boolean;
    msg: string;
    dev?: string | Error;
}

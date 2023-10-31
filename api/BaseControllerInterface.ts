export interface requestConfig {
    url: string;
    data: any;
    headers?: any;
    timeout?: number;
    method?: "post" | "get"; //请求方法
    signal?: AbortSignal;//中断信号
}

export interface requestError {
    result: false;
    msg: string;
    code?: number;
    dev?: string | Error;
}

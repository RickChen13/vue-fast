export default class ApiInterface {
    static quick(name: string, append: string) {
        const ex = `
// #region ${append}
/**
 * ${name}-请求参数
 */
export interface ${name}Request {
    data: { };
    method?: 'post' | 'get';
}
/**
 * ${name}-返回参数
 */
export interface ${name}Result {
    /**
     * 结果
     */
    result: boolean;
    /**
     * 结果码
     */
    code: number;
    /**
     * 结果信息
     */
    msg: string;
    /**
     * 结果数据
     */
    data: { }
    dev?: any;
}
//#endregion

    `;
        console.log(ex);
    }
}

import { ElMessage } from "element-plus";
import type { Router } from "vue-router";

interface Result {
    result: boolean;
    code: number;
    msg: string;
    data?: any
}

class ApiTools {

    static error(result: Result, router: Router) {
        switch (result.code) {
            case 404:
                ElMessage.error(result.msg);
                router.push({
                    path: "/404",
                });
                break;
            default:
                ElMessage.error(result.msg);
                break;
        }
    }
}

export default ApiTools;
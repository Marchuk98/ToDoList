import {instance, instanceCaptcha} from "../../../common/api/common.api";
import {BaseResponseType} from "../../../common/utils/types";


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<BaseResponseType<{ userId?: number }>>("auth/login", data);
    },
    logout() {
        return instance.delete<BaseResponseType<{ userId?: number }>>("auth/login");
    },
    me() {
        return instance.get<BaseResponseType<{ id: number; email: string; login: string }>>("auth/me");
    },
    getCaptcha() {
        return instanceCaptcha.get<{url: string}>("security/get-captcha-url");
    },
};

export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string
};
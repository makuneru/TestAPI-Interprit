import { AxiosResponse } from "axios";
import { Response } from "common/BaseResponse";
import { RequestConfigFields } from "data-builders/config-builders/RequestConfig";

export const UserRegistration = async (requestConfig : RequestConfigFields) : Promise<AxiosResponse<any, any>> => {
    return await Response(requestConfig)
};
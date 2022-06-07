import { AxiosResponse } from "axios";
import { Response } from "common/BaseResponse";
import { RequestConfigFields } from "data-builders/config-builders/RequestConfig";

export const Get_User = async (requestConfig : RequestConfigFields) : Promise<AxiosResponse<any, any>> => {
    return await Response(requestConfig)
};

export const Create_User = async (requestConfig : RequestConfigFields) : Promise<AxiosResponse<any, any>> => {
    return await Response(requestConfig)
};

export const Update_User = async (requestConfig : RequestConfigFields) : Promise<AxiosResponse<any, any>> => {
    return await Response(requestConfig)
};

export const Delete_User = async (requestConfig : RequestConfigFields) : Promise<AxiosResponse<any, any>> => {
    return await Response(requestConfig)
};
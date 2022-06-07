import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { method } from 'common/Method';
import { RequestConfigFields } from 'data-builders/config-builders/RequestConfig';
import dotenv from 'dotenv';
import { env } from 'process';
import allure from 'utils/Allure'
dotenv.config();

/**
 * @description: Base request module that takes request options and return response or error
 *
 * @param requestConfig Request Options
 * @author Mac Cayanan <macnel.cayanan@oracle.com>
 * @since 03/25/2022
 */
export const Request = async (requestConfig: RequestConfigFields): Promise<AxiosResponse<any, any>> => {
  allure.log('INFO', `REQUEST: ${JSON.stringify(requestConfig)}`);
  switch (String(env.NODE_ENV)) {
    case 'dev':
      axios.defaults.baseURL = env.DEV_ENV_BASE_URL;
      break;
    case 'qaa':
      axios.defaults.baseURL = env.QAA_ENV_BASE_URL;
      break;
    case 'prod':
      axios.defaults.baseURL = env.PROD_ENV_BASE_URL;
      break;
    default:
      axios.defaults.baseURL = env.QAA_ENV_BASE_URL;
  }

  const accesToken = await GenerateAccessToken();

  let headers: AxiosRequestHeaders = {
    Authorization: `Bearer ${accesToken}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  let request: AxiosRequestConfig<any> = {
    method: requestConfig.method,
    url: requestConfig.url,
    params: requestConfig.params,
    data: requestConfig.data,
    headers: headers,
    proxy: false
  };

  if (requestConfig.method != method.GET) {
    Object.assign(request, { data: requestConfig.data });
  }

  try {
    const response = await axios(request);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

const GenerateAccessToken = async (): Promise<AxiosResponse<any, any>> => {
  env.GRANT_TYPE = 'client_credentials';
  let user_secrets: any = {
    grant_type: env.GRANT_TYPE,
    client_id: env.CLIENT_ID,
    client_secret: env.CLIENT_SECRET,
    scope: env.SCOPE
  };

  let request: AxiosRequestConfig<any> = {
    method: method.POST,
    url: env.TOKEN_URL,
    data: Object.keys(user_secrets)
      .map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(user_secrets[key])}`;
      })
      .join('&'),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    proxy: false
  };

  try {
    const response = await axios(request);
    return response.data.access_token;
  } catch (error: any) {
    return error.response;
  }
};

// Log every request using interceptors.
axios.interceptors.request.use(
  async (req) => {
    if (req.url != env.TOKEN_URL) allure.log('INFO', `${req.method} request => ${req.url}`);
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

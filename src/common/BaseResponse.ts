import axios, { AxiosResponse } from 'axios';
import { RequestConfigFields } from 'data-builders/config-builders/RequestConfig';
import { Request } from './BaseRequest';
import allure from 'utils/Allure'

/**
 * @description: Base response module that takes request options and return response or error
 *
 * @param requestConfig Request Options
 * @author Mac Cayanan <macnel.cayanan@oracle.com>
 * @since 03/25/2022
 */
export const Response = async (requestConfig: RequestConfigFields): Promise<AxiosResponse<any, any>> => {
  try {
    const response = await Request(requestConfig);
    allure.log('INFO', `RESPONSE: Status[${response.status}]`);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw response;
    }
  } catch (error: any) {
    allure.log(
      'ATTACHMENT',
      'RESPONSE ERROR',
      `Error: statusText => ${error.statusText},
                    method => ${error.config.method},
                    url => ${error.config.url},
                    data => ${error.config.data}`
    );
    return error;
  }
};

// Log every response using interceptors.
axios.interceptors.response.use(
  async (res) => {
    if (res.data.access_token == null) {
      allure.log('INFO', 'response data =>');
      allure.log('INFO', res.data);
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

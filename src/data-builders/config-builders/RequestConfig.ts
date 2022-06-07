/**
 * @description: Request config options for making a reqest.
 *  Only the url is required.
 *  Requests will default to GET if method is not specified.
 *
 * @author Mac Cayanan <macnel.cayanan@oracle.com>
 * @since 03/30/2022
 */
export interface RequestConfigFields {
  method: string; //default GET
  url: string; //endpoint URL (note: baseURL depends on environment)
  data?: Object; //data to be sent as the request body
  params?: Object; //URL parameters to be sent with the request
  headers?: Object; //custom headers to be sent
  auth?: Object; //HTTP Basic auth and supplies credentials.
  resolveWithFullResponse: boolean; //receive the full IncomingMessage object for the response
}

export default class RequestConfig {
  private RequestConfigFields: RequestConfigFields;

  private constructor(RequestConfigFields: RequestConfigFields) {
    this.RequestConfigFields = RequestConfigFields;
  }

  public RequestConfigData(): RequestConfigFields {
    return this.RequestConfigFields;
  }

  static Builder = class {
    private RequestConfigFields: RequestConfigFields = {
      method: 'get',
      url: '',
      resolveWithFullResponse: true
    };

    public getRequestConfig(): RequestConfigFields {
      return this.RequestConfigFields;
    }

    public getMethod(): RequestConfigFields['method'] {
      return this.RequestConfigFields.method;
    }

    public setMethod(method: RequestConfigFields['method']) {
      this.RequestConfigFields.method = method;
      return this;
    }

    public getUrl(): RequestConfigFields['url'] {
      return this.RequestConfigFields.url;
    }

    public setUrl(url: RequestConfigFields['url']) {
      this.RequestConfigFields.url = url;
      return this;
    }

    public getData(): RequestConfigFields['data'] {
      return this.RequestConfigFields.data;
    }

    public setData(data: RequestConfigFields['data']) {
      this.RequestConfigFields.data = data;
      return this;
    }

    public getParams(): RequestConfigFields['params'] {
      return this.RequestConfigFields.params;
    }

    public setParams(params: RequestConfigFields['params']) {
      this.RequestConfigFields.params = params;
      return this;
    }

    public getHeaders(): RequestConfigFields['headers'] {
      return this.RequestConfigFields.headers;
    }

    public setHeaders(headers: RequestConfigFields['headers']) {
      this.RequestConfigFields.headers = headers;
      return this;
    }

    public getAuth(): RequestConfigFields['auth'] {
      return this.RequestConfigFields.auth;
    }

    public setAuth(auth: RequestConfigFields['auth']) {
      this.RequestConfigFields.auth = auth;
      return this;
    }

    public getResolveWithFullResponse(): RequestConfigFields['resolveWithFullResponse'] {
      return this.RequestConfigFields.resolveWithFullResponse;
    }

    public setResolveWithFullResponse(resolveWithFullResponse: RequestConfigFields['resolveWithFullResponse']) {
      this.RequestConfigFields.resolveWithFullResponse = resolveWithFullResponse;
    }

    public build() {
      return new RequestConfig(this.RequestConfigFields);
    }
  };
}

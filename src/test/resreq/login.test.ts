import { expect } from "chai";
import data from "data/resreq/endpoints.json";
import credentials from "data/resreq/credentials.json";
import { UserLogin } from "api-request/resreq/login-request";
import Login from "data-builders/resreq/login";
import RequestConfig from "data-builders/config-builders/request-config";
import { method } from "common/method"

describe("Basic Endpoint Login Tests", async () => {
  it("POST Login Successful", async () => {
    //prepare test data
    const url = data.endPoints.login;
    const testUser = new Login.Builder()
                    .setEmail(credentials.email)
                    .setPassword(credentials.password)
                    .build()
                    .LoginData();

    const requestConfig = new RequestConfig.Builder()
                    .setMethod(method.POST)
                    .setData(testUser)
                    .setUrl(url)
                    .build()
                    .RequestConfigData();

    //execute request
    const res = await UserLogin(requestConfig);

    //verify response
    expect(res.status).to.be.eql(200);
    expect(res.data.token).to.be.not.null
  });

  it("POST Login Unsuccessful", async () => {
    //prepare test data
    const url = data.endPoints.login;
    const testUser = new Login.Builder()
                    .setEmail(credentials.email)
                    .build()
                    .LoginData();

    const requestConfig = new RequestConfig.Builder()
                    .setMethod(method.POST)
                    .setData(testUser)
                    .setUrl(url)
                    .build()
                    .RequestConfigData()

    //prepare test data
    const res = await UserLogin(requestConfig);

    //verify response
    expect(res.status).to.be.eql(400);
    expect(res.data).to.be.eql({ error: 'Missing password' });
  });
});

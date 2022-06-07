import { expect } from "chai";
import data from "data/resreq/endpoints.json";
import { method } from "common/method";
import credentials from "data/resreq/credentials.json";
import { UserLogin } from "api-request/resreq/login-request";
import RequestConfig from "data-builders/config-builders/request-config";
import Registration from "data-builders/resreq/registration";

describe("Basic Endpoint Registration Tests", async () => {
  it("POST Registration Successful", async () => {
    //prepare test data
    const url = data.endPoints.login;
    const testUser = new Registration.Builder()
                    .setEmail(credentials.email)
                    .setPassword(credentials.password)
                    .build()
                    .RegistrationData();

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

  it("POST Registration Unsuccessful", async () => {
    //prepare test data
    const url = data.endPoints.login;
    const testUser = new Registration.Builder()
                    .setEmail(credentials.email)
                    .build()
                    .RegistrationData();

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

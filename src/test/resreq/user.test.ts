import { expect } from "chai";
import { Delete_User, Get_User, Create_User, Update_User } from "api-request/resreq/user-request";
import data from "data/resreq/endpoints.json";
import { method } from "common/method";
import Params from "data-builders/config-builders/page-params";
import RequestConfig from "data-builders/config-builders/request-config";
import User from "data-builders/resreq/user";

describe("Basic Endpoint User Tests", async () => {
  it("GET test environment users", async () => {
    //prepare test data
    const url = "users"; 
    const requestConfig = new RequestConfig.Builder()
                    .setUrl(url).build()
                    .RequestConfigData();

    //execute request
    const res = await Get_User(requestConfig);

    //verify response
    expect(res.status).to.be.equal(200);
  });

  it("GET single user", async () => {
    //prepare test data
    const url = data.endPoints.users + 2; // 2 is the user ID.
    const requestConfig = new RequestConfig.Builder()
                    .setUrl(url)
                    .build()
                    .RequestConfigData();
                    
    //execute request
    const res = await Get_User(requestConfig);

    //verify response
    expect(res.status).to.be.equal(200);
  });

  it("GET unkown user", async () => {
    //prepare test data
    const url = data.endPoints.unknown + 23; // 2 is the user ID.
    const requestConfig = new RequestConfig.Builder()
                    .setUrl(url).build()
                    .RequestConfigData();

    //execute request
    const res = await Get_User(requestConfig);

    //verify response
    expect(res.status).to.be.equal(404);
  });

  it("GET search user by first name", async () => {
    //prepare test data
    const url = data.endPoints.users;
    const params = new Params.Builder().setPage(2).build()
                  .ParamData();
    const requestConfig = new RequestConfig.Builder()
                    .setUrl(url).setParams(params).build()
                    .RequestConfigData();

    //execute request               
    const res = await Get_User(requestConfig);

    //verify response
    expect(res.status).to.be.equal(200);

    const firstName = "Lindsay";
    const user = res.data.data.find((user: { first_name: string }) => {
      return user.first_name == firstName;
    });
    expect(user.first_name).to.be.equal(firstName);
    expect(user.last_name).to.be.equal("Ferguson");
  });

  it("POST create single user", async () => {
    //prepare test data
    const url = data.endPoints.users;
    const testUser = new User.Builder()
                    .setJob("test engineer").setName("makuneru").build()
                    .UserData();
          
    const requestConfig = new RequestConfig.Builder()
                    .setMethod(method.POST).setData(testUser).setUrl(url).build()
                    .RequestConfigData();
    //execute request 
    const res = await Create_User(requestConfig);

    //verify response
    expect(res.status).to.be.equal(201);
    expect(res.data.name).to.be.equal(testUser.name);
    expect(res.data.job).to.be.equal(testUser.job);
    expect(res.data.id).to.be.not.null;
  });

  it("PUT update single user", async () => {
    //prepare test data
    const url = data.endPoints.users + 2; // user ID to UPDATE
    const testUser = new User.Builder()
                    .setJob("morpheus").setName("zion resident").build()
                    .UserData();

    const requestConfig = new RequestConfig.Builder()
                    .setMethod(method.PUT).setData(testUser).setUrl(url).build()
                    .RequestConfigData();

    //execute request 
    const res = await Update_User(requestConfig);

    //verify response
    expect(res.status).to.be.equal(200);
    expect(res.data.name).to.be.equal(testUser.name);
    expect(res.data.job).to.be.equal(testUser.job);
  });

  it("PATCH update single user", async () => {
    //prepare test data
    const url = data.endPoints.users + 2; // user ID to UPDATE
    const testUser = new User.Builder()
                    .setName("test user").setJob("test engineer").build()
                    .UserData();

    const requestConfig = new RequestConfig.Builder()
                    .setMethod(method.PATCH).setData(testUser).setUrl(url).build()
                    .RequestConfigData();
    //execute request
    const res = await Update_User(requestConfig);

    //verify response
    expect(res.status).to.be.equal(200);
    expect(res.data.name).to.be.equal(testUser.name);
    expect(res.data.job).to.be.equal(testUser.job);
  });

  it("DELETE update single user", async () => {
    //prepare test data
    const url = data.endPoints.users + 2; // user ID to DELETE
    const requestConfig = new RequestConfig.Builder()
                    .setMethod(method.DELETE).setUrl(url).build()
                    .RequestConfigData();

    //execute request
    const res = await Delete_User(requestConfig);

    //verify response
    expect(res.status).to.be.equal(204);
  });
});

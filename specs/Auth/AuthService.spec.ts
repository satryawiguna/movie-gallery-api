import { expect } from "chai";
import httpStatus from "http-status";
import "mocha";
import sinon from "sinon";
import AuthService from "../../src/services/AuthService";
import UserDao from "../../src/dao/UserDao";
import models from "../../src/models";
import * as bcrypt from "bcrypt";
import { IUser } from "../../src/models/interfaces/IUser";

const User = models.user;

let authService;

const loginData = {
  email: "satrya@gmail.com",
  password: "123456"
};

const userData: IUser = {
  email: "satrya@gmail.com",
  password: "123456",
  role_id: 1
};

describe("User Login test", () => {
  beforeEach(() => {
    authService = new AuthService();
  });
  afterEach(() => {
    sinon.restore();
  });

  it("User Login successfully", async () => {
    const expectedResponse = {
      statusCode: httpStatus.OK,
      response: {
        status: true,
        code: httpStatus.OK,
        message: "Login Successful",
        data: {
          id: 1,
          email: "satrya@gmail.com",
          email_verified: 1,
          role_id: 1
        }
      }
    };

    userData.id = 1;
    userData.password = bcrypt.hashSync(loginData.password, 8);
    userData.email_verified = 1;

    const userModel = new User(userData);

    sinon.stub(UserDao.prototype, "findByEmail").callsFake((email) => {
      return userModel;
    });

    const userLogin = await authService.loginWithEmailPassword(
      loginData.email,
      loginData.password
    );

    expect(userLogin).to.deep.include(expectedResponse);
  });

  it("should show INVALID EMAIL ADDRESS message", async () => {
    const expectedResponse = {
      statusCode: httpStatus.BAD_REQUEST,
      response: {
        status: false,
        code: httpStatus.BAD_REQUEST,
        message: "Invalid Email Address!"
      }
    };

    sinon.stub(UserDao.prototype, "findByEmail").returns(Promise.resolve(null));

    const response = await authService.loginWithEmailPassword("joko.widodo@mail.com", "23232132");

    expect(response).to.deep.include(expectedResponse);
  });

  it("Wrong Password", async () => {
    const expectedResponse = {
      statusCode: httpStatus.BAD_REQUEST,
      response: {
        status: false,
        code: httpStatus.BAD_REQUEST,
        message: "Wrong Password!"
      }
    };

    userData.id = 1;
    userData.password = bcrypt.hashSync("2322342343", 8);
    userData.email_verified = 1;

    const userModel = new User(userData);

    sinon.stub(UserDao.prototype, "findByEmail").callsFake((email) => {
      return userModel;
    });

    const userLogin = await authService.loginWithEmailPassword(
      loginData.email,
      loginData.password
    );

    expect(userLogin).to.deep.include(expectedResponse);
  });
});

import axios from "axios";
import { OpenAPI } from "@/api";

// const url = 'http://localhost:8080';
// const url = 'http://47.116.168.31:8080';
const url = "";
const aiUrl = "http://localhost:5000";
export const API = { TOKEN: "" };

const headers = {
  // 'Authorization': 'Bearer '+ process.env.TOKEN,
  "Content-Type": "application/json",
  Origin: "http://localhost:3000",
};

type Result = {
  code?: number;
  data?: any;
  message?: string;
  success?: boolean;
};

const request = axios.create({
  baseURL: url,
  headers: headers,
});

const aiRequest = axios.create({
  baseURL: aiUrl,
  headers: headers,
});

request.defaults.withCredentials = true;

type User = {
  createTime: string;
  gender: number | undefined;
  id: number | undefined;
  isVip: number | undefined;
  updateTime: string;
  userAccount: string;
  userAvatar: string;
  userName: string;
  userPassword: string;
  userRole: string;
};

type UserUpateParams = {
  gender: number | undefined;
  id: number | undefined;
  userAvatar: string;
  userName: string;
};

type AskKnowledgeBaseParams = {
  question: string;
};

export type Page = {
  /**
   * content
   */
  content?: string;
  /**
   * title
   */
  title?: string;
  /**
   * createDate
   */
  createDate?: string;
  /**
   * id
   */
  id?: number;
  /**
   * isDelete
   */
  isDelete?: string;
  /**
   * isInBin
   */
  isInBin?: number;
  /**
   * updateDate
   */
  updateDate?: string;
  /**
   * userId
   */
  userId?: number;
};

export class UserService {
  public static getAllUsingGet() {
    return request.get("/user/all", {
      headers: {
        Authorization: "Bearer " + process.env.TOKEN,
      },
    });
  }
  /**
   * allllll
   * @returns Result OK
   * @throws ApiError
   */
  public static allllllUsingGet() {
    return request.get("/user/allll", {
      headers: {
        Authorization: "Bearer " + process.env.TOKEN,
      },
    });
  }
  /**
   * 解析token
   * 需传入token
   * @param token token
   * @returns Result OK
   * @throws ApiError
   */
  public static getInfoUsingGet(token: string) {
    return request.get(`/user/info?token=${token}`, {
      headers: {
        Authorization: "Bearer " + process.env.TOKEN,
      },
    });
    // return __request(OpenAPI, {
    //     method: 'GET',
    //     url: '/user/info',
    //     query: {
    //         'token': token,
    //     },
    //     errors: {
    //         401: `Unauthorized`,
    //         403: `Forbidden`,
    //         404: `Not Found`,
    //     },
    // });
  }
  /**
   * 是否登录
   * @returns Result OK
   * @throws ApiError
   */
  public static isLoginUsingGet(token: string) {
    return request.get("/user/is_login", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // return __request(OpenAPI, {
    //     method: 'GET',
    //     url: '/user/is_login',
    //     errors: {
    //         401: `Unauthorized`,
    //         403: `Forbidden`,
    //         404: `Not Found`,
    //     },
    // });
  }
  /**
   * 登录
   * 传入account和password
   * @param user user
   * @returns Result OK
   * @returns any Created
   * @throws ApiError
   */

  public static loginUsingPost(user: User) {
    return request.post("/user/login", user);
    // return __request(OpenAPI, {
    //     method: 'POST',
    //     url: '/user/login',
    //     body: user,
    //     errors: {
    //         401: `Unauthorized`,
    //         403: `Forbidden`,
    //         404: `Not Found`,
    //     },
    // });
  }

  /**
   * 登出
   * @returns Result OK
   * @returns any Created
   * @throws ApiError
   */
  public static logoutUsingPost() {
    return request.post(
      "/user/logout",
      {},
      {
        headers: {
          Authorization: "Bearer " + process.env.TOKEN,
        },
      }
    );

    // return __request(OpenAPI, {
    //     method: 'POST',
    //     url: '/user/logout',
    //     errors: {
    //         401: `Unauthorized`,
    //         403: `Forbidden`,
    //         404: `Not Found`,
    //     },
    // });
  }
  /**
   * 更新
   * 传入userName、userAvatar和gender
   * @returns Result OK
   * @returns any Created
   * @throws ApiError
   * @param userUpateParams
   */
  public static updateUserUsingPost(userUpateParams: UserUpateParams) {
    return request.post("/user/update", userUpateParams, {
      headers: {
        Authorization: "Bearer " + process.env.TOKEN,
      },
    });

    // return __request(OpenAPI, {
    //     method: 'POST',
    //     url: '/user/update',
    //     body: userUpateParams,
    //     errors: {
    //         401: `Unauthorized`,
    //         403: `Forbidden`,
    //         404: `Not Found`,
    //     },
    // });
  }

  /**
   * 注册
   * 传入account、password、checkPassword
   * @param userRegisterRequest userRegisterRequest
   * @returns Result OK
   * @returns any Created
   * @throws ApiError
   */
  public static registerUsingPost(userRegisterRequest: {
    userAccount: string;
    userPassword: string;
    checkPassword: string;
  }) {
    return request.post("/user/register", userRegisterRequest, {
      headers: {
        Authorization: "Bearer " + process.env.TOKEN,
      },
    });
    // return __request(OpenAPI, {
    //     method: 'POST',
    //     url: '/user/register',
    //     body: userRegisterRequest,
    //     errors: {
    //         401: `Unauthorized`,
    //         403: `Forbidden`,
    //         404: `Not Found`,
    //     },
    // });
  }
  /**
   * 按id获取
   * 需传入id
   * @param id id
   * @returns Result OK
   * @throws ApiError
   */
  public static getByIdUsingGet(id: number) {
    return request.get("/user/" + id, {
      params: {
        id: id,
      },
      headers: {
        Authorization: "Bearer " + process.env.TOKEN,
      },
    });
  }
  /**
   * 删除
   * 需要传入路径变量id
   * @param id id
   * @returns Result OK
   * @throws ApiError
   */
  public static removeUsingDelete(id: number) {
    return request.delete("/user/" + id, {
      params: {
        id: id,
      },
      headers: {
        Authorization: "Bearer " + process.env.TOKEN,
      },
    });
    // return __request(OpenAPI, {
    //     method: 'DELETE',
    //     url: '/user/{id}',
    //     path: {
    //         'id': id,
    //     },
    //     errors: {
    //         401: `Unauthorized`,
    //         403: `Forbidden`,
    //     },
    // });
  }
}
export class EditorService {
  public static addUsingPost(user: User, type: string) {
    return request.post(
      "/editor/add",
      { user: user, type: type },
      {
        headers: {
          Authorization: "Bearer " + process.env.TOKEN,
        },
      }
    );

    // return __request(OpenAPI, {
    //     method: 'POST',
    //     url: '/editor/add',
    //     body: user,
    //     errors: {
    //         401: `Unauthorized`,
    //         403: `Forbidden`,
    //         404: `Not Found`,
    //     },
    // });
  }
  /**
   * delete
   * @param page page
   * @returns Result OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteUsingPost(page: Page) {
    return request.post("/editor/delete", page, {
      headers: {
        Authorization: "Bearer " + process.env.TOKEN,
      },
    });
    // return __request(OpenAPI, {
    //     method: 'POST',
    //     url: '/editor/delete',
    //     body: page,
    //     errors: {
    //         401: `Unauthorized`,
    //         403: `Forbidden`,
    //         404: `Not Found`,
    //     },
    // });
  }
  /**
   * getList
   * @param user user
   * @returns Result OK
   * @returns any Created
   * @throws ApiError
   */
  public static getListUsingPost(user: User) {
    return request.post("/editor/list", user, {
      headers: {
        Authorization: "Bearer " + process.env.TOKEN,
      },
    });
    // return __request(OpenAPI, {
    //     method: 'POST',
    //     url: '/editor/list',
    //     body: user,
    //     errors: {
    //         401: `Unauthorized`,
    //         403: `Forbidden`,
    //         404: `Not Found`,
    //     },
    // });
  }
  /**
   * save
   * @param page page
   * @returns Result OK
   * @returns any Created
   * @throws ApiError
   */
  public static saveUsingPost(page: Page) {
    return request.post("/editor/save", page, {
      headers: {
        Authorization: "Bearer " + process.env.TOKEN,
      },
    });
    // return __request(OpenAPI, {
    //     method: 'POST',
    //     url: '/editor/save',
    //     body: page,
    //     errors: {
    //         401: `Unauthorized`,
    //         403: `Forbidden`,
    //         404: `Not Found`,
    //     },
    // });
  }
}

export class AiService {
  /**
   * 更新
   * 传入userName、userAvatar和gender
   * @param UserUpateParams userUpateParams
   * @returns Result OK
   * @returns any Created
   * @throws ApiError
   */
  public static AskKnowledgeBase(question: AskKnowledgeBaseParams) {
    return aiRequest.post("/ai/ask", question, {
      headers: {
        Authorization: "Bearer " + process.env.TOKEN,
      },
    });
    // return __request(OpenAPI, {
    //     method: 'POST',
    //     url: '/ai/ask',
    //     body: question,
    //     errors: {
    //         401: `Unauthorized`,
    //         403: `Forbidden`,
    //         404: `Not Found`,
    //     },
    // });
  }

  public static FileUpload(file: File) {
    return request.post(
      "/file/upload",
      { file: file },
      {
        headers: {
          Authorization: "Bearer " + process.env.TOKEN,
          "Content-Type": "multipart/form-data",
        },
        timeout: 6000,
      }
    );
  }

  public static OCRImage(file: File) {
    return aiRequest.post(
      "/OCR",
      { data: file },
      {
        headers: {
          Authorization: "Bearer " + process.env.TOKEN,
          "Content-Type": "multipart/form-data",
        },
        timeout: 6000,
      }
    );
  }

  public static Ask(question: string) {
    return aiRequest.post(
      "/ask",
      { question: question },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

'use client';

import {useImmer} from "use-immer";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/tailwind/ui/use-toast";
import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import {UserService} from "@/api/services/API";
import {Separator} from "@/components/tailwind/ui/separator";

const initialLoginParams = {
    type: "email",
    user: {
        createTime: '',
        gender: undefined,
        id: undefined,
        isVip: undefined,
        updateTime: '',
        userAccount: '',
        userAvatar: '',
        userName: '',    userRole: '',
        userPassword: '',
        userEmail: '',
    }
};
const initialRegisterParams = { userAccount: '', userPassword: '', checkPassword: '', userEmail:''};

export function LoginForm() {

    const { toast } = useToast();
    const router = useRouter();
    const [loginParams, updateLoginParams] = useImmer(initialLoginParams);
    const [token, setToken] = useLocalStorage('token', "");
    const [user, setUser] = useLocalStorage('user', {});
    const [loginType, setLoginType] = useState("email");
    const cookies = new Cookies(null, { path: '/' });
    const [isRegister, setIsRegister] = useState(false);
    const [registerParams, updateRegisterParams] = useImmer(initialRegisterParams);

    useEffect(() => {

    }, [user, token])



    const login = () => {
        const res = UserService.loginUsingPost(loginParams);
        res.then(async r => {
            if (r.data.code === 20000) {
                toast({
                    description: "登录成功",
                });
                const token = r.data.data.token;
                cookies.set("token", token);
                setToken(token);
                // API.TOKEN = token;
                process.env.TOKEN = token;
                router.push('/editor');
            } else {
                toast({
                    variant: "destructive",
                    title: "登录失败",
                    description: r.data.message,
                });
            }
        });
    }

    const handleLoginSwitch = (type) => {
        setLoginType(type);
        updateLoginParams(draft => {
            draft.type = type;
        })
    }

    const register = () => {
        const res = UserService.registerUsingPost(registerParams);
        res.then(r => {
            if (r.data.code === 20000) {
                toast({
                    title: "注册成功!",
                    description: "跳转至登录页面",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "注册失败!",
                    description: r.data.message,
                });
            }
        });
    }

  return (
    // <Card className="w-full max-w-sm">
    //   <CardHeader>
    //     <CardTitle className="text-2xl">登录</CardTitle>
    //     <CardDescription>
    //       {/*Enter your Account below to login to your account.*/}
    //     </CardDescription>
    //   </CardHeader>
    //     <CardContent className="grid gap-4">
    //         <div className="grid gap-2">
    //             <Label htmlFor="account">用户名</Label>
    //             <Input id="email" type="account" onChange={(e) => {
    //                 updateLoginParams(draft => {
    //                     draft.userAccount = e.target.value;
    //                 })
    //             }} required/>
    //         </div>
    //         <div className="grid gap-2">
    //             <Label htmlFor="password">密码</Label>
    //             <Input id="password" type="password" onChange={(e) => {
    //                 updateLoginParams(draft => {
    //                     draft.userPassword = e.target.value;
    //                 })
    //             }} required/>
    //         </div>
    //         <div className="grid gap-2">
    //             <Button className="w-full" onClick={login}>登录</Button>
    //         </div>
    //         <div className="mt-4 text-center text-sm">
    //             没有拥有账户?{" "}
    //             <Link href="/register" className="underline">
    //                 注册
    //             </Link>
    //         </div>
    //     </CardContent>
    // </Card>
          <div className="bg-[url('/image/login_bg.svg')] px-1 py-3 sm:px-6 md:px-12 lg:px-24 lg:py-24 h-full w-full">
              <div className="justify-center mx-auto text-left align-bottom transition-all transform bg-white rounded-lg sm:align-middle sm:max-w-2xl sm:w-full">
                  <div id={isRegister} className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
                      {!isRegister ?
                          <div className="w-full px-6 py-3">
                              <div>
                                  <div className="mt-3 text-left sm:mt-5">
                                      <div className="inline-flex items-center w-full justify-center">
                                          <h3 className="text-lg font-bold text-neutral-600 l eading-6 lg:text-5xl">Docmint</h3>
                                      </div>
                                      <div id={loginType}
                                           className="mt-4 text-base text-gray-500 flex space-x-4 justify-center h-full">
                                          <button className={
                                              loginType === 'email' ? ' text-blue-500' : 'hover:text-blue-500'
                                          }
                                                  onClick={() => handleLoginSwitch('email')}
                                          >邮箱登录
                                          </button>
                                          <Separator
                                              className="h-auto"
                                              decorative
                                              orientation="vertical"
                                          />
                                          <button className={
                                              loginType === 'account' ? ' text-blue-500' : 'hover:text-blue-500'
                                          }
                                                  onClick={() => handleLoginSwitch('account')}
                                          >用户名登录
                                          </button>
                                      </div>
                                  </div>
                              </div>

                              <div className="mt-6 space-y-2">
                                  {loginType === 'email' ?
                                      <>
                                          <div>
                                              <label className="sr-only">邮箱</label>
                                              <input type="email" name="email" id="email"
                                                     className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                     placeholder="输入邮箱"
                                                     onChange={(e) => {
                                                         updateLoginParams(draft => {
                                                             draft.user.userEmail = e.target.value;
                                                         })
                                                     }}
                                              />
                                          </div>
                                          <div>
                                              <label className="sr-only">密码</label>
                                              <input type="password" name="password" id="password"
                                                     className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                     placeholder="输入密码"
                                                     onChange={(e) => {
                                                         updateLoginParams(draft => {
                                                             draft.user.userPassword = e.target.value;
                                                         })
                                                     }}
                                              />
                                          </div>
                                      </>
                                      : <></>
                                  }
                                  {loginType === 'account' ?
                                      <>
                                          <div>
                                              <label className="sr-only">用户名</label>
                                              <input type="text" name="account" id="account"
                                                     className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                     placeholder="输入用户名"
                                                     onChange={(e) => {
                                                         updateLoginParams(draft => {
                                                             draft.user.userAccount = e.target.value;
                                                         })
                                                     }}
                                              />
                                          </div>
                                          <div>
                                              <label className="sr-only">密码</label>
                                              <input type="password" name="password" id="password"
                                                     className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                     placeholder="输入密码"
                                                     onChange={(e) => {
                                                         updateLoginParams(draft => {
                                                             draft.user.userPassword = e.target.value;
                                                         })
                                                     }}
                                              />
                                          </div>
                                      </>
                                      : <></>
                                  }
                                  <div className="flex flex-col mt-4 lg:space-y-2">
                                      <button type="button"
                                              className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                              onClick={login}
                                      >登录
                                      </button>
                                      <a type="button" onClick={()=>setIsRegister(true)}
                                         className="inline-flex justify-center py-4 text-base font-medium text-gray-500 focus:outline-none hover:text-blue-500 focus:text-blue-600 sm:text-sm">注册</a>
                                  </div>
                              </div>
                          </div>
                          :
                          <div className="w-full px-6 py-3">
                              <div>
                                  <div className="mt-3 text-left sm:mt-5">
                                      <div className="inline-flex items-center w-full justify-center">
                                          <h3 className="text-lg font-bold text-neutral-600 l eading-6 lg:text-5xl">Docmint</h3>
                                      </div>
                                  </div>
                              </div>
                              <div className="mt-6 space-y-2">
                                  <div>
                                      <label className="sr-only">邮箱</label>
                                      <input type="email" name="email" id="email"
                                             className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                             placeholder="输入邮箱"
                                             onChange={(e) => {
                                                 updateRegisterParams(draft => {
                                                     draft.userEmail = e.target.value;
                                                 })
                                             }}
                                      />
                                  </div>
                                  <div>
                                      <label className="sr-only">用户名</label>
                                      <input type="text" name="text" id="text"
                                             className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                             placeholder="输入用户名"
                                             onChange={(e) => {
                                                 updateRegisterParams(draft => {
                                                     draft.userAccount = e.target.value;
                                                 })
                                             }}
                                      />
                                  </div>
                                  <div>
                                      <label className="sr-only">密码</label>
                                      <input type="password" name="password" id="password"
                                             className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                             placeholder="输入密码"
                                             onChange={(e) => {
                                                 updateRegisterParams(draft => {
                                                     draft.userPassword = e.target.value;
                                                 })
                                             }}
                                      />
                                  </div>
                                  <div>
                                      <label className="sr-only">确认密码</label>
                                      <input type="password" name="password" id="password"
                                             className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                             placeholder="再次输入密码"
                                             onChange={(e) => {
                                                 updateRegisterParams(draft => {
                                                     draft.checkPassword = e.target.value;
                                                 })
                                             }}
                                      />
                                  </div>
                                  <div className="flex flex-col mt-4 lg:space-y-2">
                                      <button type="button"
                                              className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                              onClick={register}
                                      >注册
                                      </button>
                                      <a type="button" onClick={() => setIsRegister(false)}
                                         className="inline-flex justify-center py-4 text-base font-medium text-gray-500 focus:outline-none hover:text-blue-500 focus:text-blue-600 sm:text-sm">已有账号?</a>

                                  </div>
                              </div>
                          </div>
                      }
                      <div className="order-first hidden w-full lg:block">
                          <img className="object-cover h-full bg-cover rounded-l-lg"
                               src="https://yjxx.oss-cn-nanjing.aliyuncs.com/img/202407091425259.jpg" alt=""/>
                      </div>
                  </div>
              </div>
          </div>
  )
}

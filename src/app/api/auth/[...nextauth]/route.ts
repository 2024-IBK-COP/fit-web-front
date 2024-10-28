import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";


const handler = NextAuth({
  pages: {
    signIn: "/login" /* 직접 만든 페이지는 따로 지정 */,
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60 * 1,
  },
  events: {
    async signOut(message) {
      try {
        // await api.post("/api/users/logout/", {
        //   refresh: message.token.refreshToken,
        // });
      } catch (error) {
        console.error("Sign out", error);
      }
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        authCode: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("reqreq");
        console.log(req);
        console.log("reqreq");
        console.log("credentialscredentials");
        console.log(credentials);
        console.log("credentialscredentials");
        

        const res = axios.post("/api/v1/verify", credentials).then((res) => {
          console.log(res);
          if(res.data.code == "00"){
            console.log("success");
            return res;
          }else{
          
          }
        })
        .catch(err =>{
          
        });


        // const responseSample = JSON.stringify({
        //   accessToken: "accessTokenExample",
        //   refreshToken: "refreshTokenExample",
        //   accessTokenExpires: 100,
        // });
        // const res = await Promise.resolve().then(() => {
        //   return responseSample;
        // });

        const user: User = {
          id : credentials?.email ?? ""
        }

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, user, account, profile }) {
      return {
        ...token,
        ...user,
      };

      /* 최초 로그인시 동작 */
      if (account && user) {
        return {
          ...token,
          ...user,
        };
      }

      const nowTime = Math.round(Date.now() / 1000);
      const shouldRefreshTime = (token.accessTokenExpires as number) - nowTime;

      /* 토큰이 만료되지 않았을때는 원래사용하던 토큰을 반환 */
      if (shouldRefreshTime > 0) {
        return token;
      }

      /* 토큰 만료 - 리프레시 요청 */
      try {
        // const res = await api.post("/api/users/refresh-token/", {
        //   refresh: token.refreshToken,
        // });
        // return {
        //   ...token,
        //   accessToken: res.data.accessToken,
        //   accessTokenExpires: res.data.accessTokenExpires,
        // };
      } catch (error) {
        // return Promise.reject("RefreshAccessTokenError");
        // throw new Error("RefreshAccessTokenError");

        /* 리프레시 토큰 에러로 클라이언트에 에러 내용 전달 후 클라이언트에서 처리 */
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.error) {
        // return Promise.reject({
        //   error: token.error,
        // });

        session.error = token.error;
        return session;
      }

      session.user.id = token.id;
      session.user.name = token.name;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.refreshToken = token.refreshToken;

      return session;
    },

    async redirect({ url, baseUrl }) {
      console.log("callback redirect called");
      console.log("url : " + url);
      console.log("baseURL : " + baseUrl);

      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      try {
        const callbackUrl =
          new URL(url).searchParams.get("callbackUrl") ?? baseUrl;
        if (callbackUrl.startsWith("/")) {
          return `${baseUrl}${callbackUrl}`;
        } else {
          return callbackUrl;
        }
      } catch (error) {
        return baseUrl;
      }
    },
  },
});

export { handler as GET, handler as POST };

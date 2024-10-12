import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import {JWT} from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'


const handler = NextAuth({
  pages: {
    signIn: "/login" /* 직접 만든 페이지는 따로 지정 */
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60 * 1
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
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'wookyungLee' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log("YAHO??");
        // const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     username: credentials?.username,
        //     password: credentials?.password,
        //   }),
        // });
        console.log("YAHO???");
        const resd =   await Promise.resolve().then(() => {return "YAHO"});
        console.log("YAHO????");
        const user = { id: '1', name: 'TEST USER', email: 'testUSER@example.com', accessToken: "abcd" };

        console.log("reqreq");
        console.log(req);
        console.log("reqreq");

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {

    async jwt({ token, trigger, user, account, profile }) {
      console.log("jwtjwtjwt");
      console.log("token");
      console.log(token);
      console.log("token");
      console.log("user");
      console.log(user);
      console.log("user");

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
  }

  
})

export { handler as GET, handler as POST }
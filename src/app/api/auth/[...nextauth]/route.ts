import NextAuth, Session from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  pages: {
    signIn: "/login" /* 직접 만든 페이지는 따로 지정 */,
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
        const user = { id: '1', name: 'TEST USER', email: 'testUSER@example.com' };
        
        alert(credentials?.username + "&" + credentials?.password);

        console.log("YAHO");
        console.log(req);
        console.log("YAHO");

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
    async jwt({ token, user }) {
      return { ...token, ...user };
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
  },

// 여기가 추가된 부분
  // pages: {
  //   signIn: "/login",
  // },
})

export { handler as GET, handler as POST }
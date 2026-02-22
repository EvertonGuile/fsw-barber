import { authOptions } from "@/app/_lib/auth";
// import { db } from "@/app/_lib/prisma";
// import {PrismaAdapter} from "@auth/prisma-adapter"
import NextAuth from "next-auth"
// import { Adapter } from "next-auth/adapters";
// import GoogleProvider from 'next-auth/providers/google'


const handler = NextAuth(authOptions)
  //   adapter: PrismaAdapter(db),
  //   debug: true,
  // providers: [
  //   GoogleProvider({
  //       clientId: process.env.GOOGLE_CLIENT_ID!,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

        // permitir troca de conta
  //       authorization: {
  //         params: {
  //           prompt: "select_account"
  //         }
  //       }
  //   })
  // ],

  // função chamada quando chamamos função useSession que retorna o usuário logado
//   callbacks: {
//     async session({session, user}) {
//       session.user = {
//         ...session.user,
//         id: user.id,
//       } as any

//       return session
//     }
//   }
// });

export { handler as GET, handler as POST }
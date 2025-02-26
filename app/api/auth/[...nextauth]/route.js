
import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from '../../../../libs/mongoose';
import User from '../../../../models/users';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'google') {
                const { role, name, email, password, image } = user
                const apiUrl = process.env.API_URL
                try {
                    await connectMongoDB()
                    const userExist = await User.findOne({ email })
                    if (!userExist) {
                        const res = await fetch(`${apiUrl}/api/users`, {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json",
                            },
                            body: JSON.stringify({ role, name, email, password ,image })
                        })
                        if (res.ok) {
                            return user
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            return user
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
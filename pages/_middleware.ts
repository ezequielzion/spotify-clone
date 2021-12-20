import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

interface Request extends NextApiRequest {
  nextUrl: {
    pathname: string;
  };
}

export const middleware = async (req: Request) => {
  //Token will exist if user is logged in
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET!,
  });

  const { pathname } = req.nextUrl;
  //Allow the request if
  //1: It's a request for next-auth session & provider fetching
  //2: the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //Redirect them to login if they don't have token AND are requesting a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
};

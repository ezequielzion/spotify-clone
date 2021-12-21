import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

interface NextApiRequestExt extends NextApiRequest {
  nextUrl: {
    pathname: string;
  };
}

export const middleware = async (req: NextApiRequestExt) => {
  //Token will exist if user is logged in
  console.log("Here's the req", req);

  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET ?? "",
  });

  console.log("Here's the jwt", process.env.JWT_SECRET);
  console.log("Here's the token", token);

  const { pathname } = req.nextUrl;
  //Allow the request if
  //1: It's a request for next-auth session & provider fetching
  //2: the token exists
  if (pathname.includes("/api/auth") || token) {
    console.log(
      "Middleware: pathname includes /api/auth and/or there is a token"
    );
    return NextResponse.next();
  }

  //Redirect them to login if they don't have token AND are requesting a protected route
  if (!token && pathname !== "/login") {
    console.log("Middleware: there is no token and pathname !== /login");
    return NextResponse.redirect("/login");
  }
};

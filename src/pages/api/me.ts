import { NextApiRequest, NextApiResponse } from "next";
import decode from "jwt-decode";

import { Auth } from "../../middlewares/Auth";

import prisma from "../../lib/prisma";

type DecodedToken = {
  email: string;
};

async function me(req: NextApiRequest, res: NextApiResponse) {
  try {
    const authorization = String(req.headers["authorization"]);
    const token = authorization.replace("Bearer ", "");

    const { email } = decode(token) as DecodedToken;

    const user = await prisma.user.findFirst({
      where: {
        email
      },
      select: {
        email: true,
        name: true,
        createdAt: true,
        id: true
      }
    });

    return res.json(user);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    return res.json({
      error: true,
      message: "Erro interno do servidor"
    });
  }
}

export default Auth(me);

import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import prisma from "../../lib/prisma";

export default async function sessions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      return res.json({
        error: true,
        message: "Usuário não existe."
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.json({
        error: true,
        message: "As senhas não combinam."
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    return res.json({
      email,
      name: user.name,
      createdAt: user.createdAt,
      token
    });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    return res.json({
      error: true,
      message: "Erro interno do servidor"
    });
  }
}

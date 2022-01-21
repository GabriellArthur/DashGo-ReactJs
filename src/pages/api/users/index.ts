import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";

import { Auth } from "../../../middlewares/Auth";

import prisma from "../../../lib/prisma";

async function users(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      default:
        break;

      case "GET": {
        const { page = 1, per_page = 10 } = req.query;

        const users = await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true
          },
          skip: (Number(page) - 1) * 10,
          take: Number(per_page)
        });

        const totalCount = await prisma.user.count();

        res.setHeader("x-total-count", totalCount);

        return res.json({ users });
      }

      case "POST": {
        const { email, name, password } = req.body;

        const newPassword = await bcrypt.hash(password, 8);

        await prisma.user.create({
          data: {
            email,
            name,
            password: newPassword
          }
        });

        return res.json({
          message: "Seu usuário foi criado!"
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    return res.json({
      error: true,
      message: "Erro interno do servidor"
    });
  } finally {
    prisma.$disconnect();
  }
}

export default Auth(users);

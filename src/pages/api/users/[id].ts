import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";

import { Auth } from "../../../middlewares/Auth";
import prisma from "../../../lib/prisma";

async function userById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    switch (req.method) {
      default:
        break;

      case "GET": {
        const user = await prisma.user.findFirst({
          where: {
            id: Number(id)
          },
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true
          }
        });

        if (!user) {
          return res.json({
            error: true,
            message: "Usuário não encontrado."
          });
        }

        return res.json(user);
      }

      case "PUT": {
        const user = await prisma.user.findFirst({
          where: {
            id: Number(id)
          }
        });

        if (!user) {
          return res.json({
            error: true,
            message: "Usuário não encontrado."
          });
        }

        const { email, name, password } = req.body;

        const updatedUser = await prisma.user.update({
          data: {
            email: email || user.email,
            name: name || user.name,
            password: password ? await bcrypt.hash(password, 8) : user.password
          },
          where: {
            id: Number(id)
          },
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true
          }
        });

        return res.json(updatedUser);
      }

      case "DELETE": {
        const user = await prisma.user.findFirst({
          where: {
            id: Number(id)
          }
        });

        if (!user) {
          return res.json({
            error: true,
            message: "Usuário não encontrado."
          });
        }

        await prisma.user.delete({
          where: {
            id: Number(id)
          }
        });

        return res.json({
          message: "Usuário deletado com sucesso."
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
  }
}

export default Auth(userById);

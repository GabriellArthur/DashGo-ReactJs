import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Auth =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { authorization } = req.headers;

      if (!String(authorization).startsWith("Bearer ")) {
        res.statusCode = 401;
        return res.json({
          error: true,
          message: "Token inválido."
        });
      }

      const token = String(authorization).replace("Bearer ", "");

      jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
        if (error) {
          res.statusCode = 401;
          return res.json({
            error: true,
            message: "Token inválido."
          });
        }

        if (payload.email) {
          const user = await prisma.user.findFirst({
            where: {
              email: payload.email
            }
          });

          if (!user) {
            res.statusCode = 401;
            return res.json({
              error: true,
              message: "Token inválido."
            });
          }
        } else {
          res.statusCode = 401;
          return res.json({
            error: true,
            message: "Token inválido."
          });
        }
      });

      return handler(req, res);
    } catch (error) {
      console.error(error);
      return res.json({
        error: true,
        message: "Erro interno do servidor"
      });
    } finally {
      prisma.$disconnect();
    }
  };

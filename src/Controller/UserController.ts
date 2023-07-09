import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../config/jwt.config";

const prisma = new PrismaClient();

export class UserController {
  async signUp(req: Request, res: Response) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    try {
      const { userName, email, firstName, lastName, password, image } =
        req.body;
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await prisma.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          password: hashedPassword,
          image,
        },
      });

      return res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        return res.status(401);
      }
      const isValidPassword = bcrypt.compare(password, user.password!);

      if (!isValidPassword) {
        return res.status(401);
      }
      const token = generateToken(user);

      return res.status(200).json({
        user: {
          userName: user.userName,
          email: user.email,
        },
        token: token,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

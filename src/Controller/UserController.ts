import { ResevervationController } from "./ReservationController";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";
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
          email,
          firstName,
          password: hashedPassword,
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

  async getCurrentUser(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;

      const currentUser = await prisma.user.findUnique({
        where: { id: currentUserId },
      });
      return res.status(200).json(currentUser);
    } catch (err) {
      console.log(err);
    }
  }

  async addFavoriteIds(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;
      const { listingId } = req.params;

      const currentUserr = await prisma.user.findUnique({
        where: { id: currentUserId },
      });
      let favoriteIds = [...(currentUserr?.favoriteIds || [])];
      favoriteIds.push(Number(listingId));

      const currentUser = await prisma.user.update({
        where: { id: currentUserId },
        data: {
          favoriteIds,
        },
      });

      return res.status(200).json(currentUser);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteFavoriteId(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;
      const { listingId } = req.params;

      const currentUserr = await prisma.user.findUnique({
        where: { id: currentUserId },
      });

      let favoriteIds = [...(currentUserr?.favoriteIds || [])];
      favoriteIds = favoriteIds.filter((id) => id !== Number(listingId));

      const user = await prisma.user.update({
        where: { id: currentUserId },
        data: { favoriteIds },
      });

      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }
}

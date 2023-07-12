import { Listing, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class ResevervationController {
  async createReservation(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;
      const { startDate, endDate, totalPrice, listingId } = req.body;

      const listingReservation = await prisma.reservation.create({
        data: {
          userId: currentUserId!,
          listingId: Number(listingId),
          startDate,
          endDate,
          totalPrice,
        },
      });

      return res.status(200).json(listingReservation);
    } catch (err) {
      console.log(err);
    }
  }
}

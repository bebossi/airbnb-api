import { Listing, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class ResevervationController {
  async createReservation(req: Request, res: Response) {
    try {
      const { listingId } = req.params;
      const currentUserId = req.currentUser?.id;
      const { startDate, endDate, totalPrice } = req.body;

      const listingReservation = await prisma.reservation.create({
        data: {
          userId: currentUserId!,
          listingId: Number(listingId),
          startDate: new Date(),
          endDate: new Date(),
          totalPrice,
        },
      });

      return res.status(200).json(listingReservation);
    } catch (err) {
      console.log(err);
    }
  }
}

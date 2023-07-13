import { Listing, PrismaClient } from "@prisma/client";
import { Request, Response, query } from "express";

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

  async getReservations(req: Request, res: Response) {
    try {
      const { listingId } = req.params;

      const reservations = await prisma.reservation.findMany({
        where: { listingId: Number(listingId) },
        include: {
          listing: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(reservations);
    } catch (err) {
      console.log(err);
    }
  }
}

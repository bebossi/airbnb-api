import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class ListingController {
  async createListing(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;

      const {
        title,
        description,
        image,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
      } = req.body;

      const listing = await prisma.listing.create({
        data: {
          title,
          description,
          image,
          category,
          roomCount,
          bathroomCount,
          guestCount,
          locationValue: location.value,
          userId: currentUserId!,
          price: parseInt(price, 10),
        },
      });

      return res.status(200).json(listing);
    } catch (err) {
      console.log(err);
    }
  }

  async getListings(req: Request, res: Response) {
    try {
      const listings = await prisma.listing.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(listings);
    } catch (error) {
      console.error(error);
    }
  }

  async getListing(req: Request, res: Response) {
    try {
      const { listingId } = req.params;

      const listing = await prisma.listing.findUnique({
        where: {
          id: Number(listingId),
        },
        include: {
          user: true,
        },
      });
      return res.status(200).json(listing);
    } catch (error) {
      console.error(error);
    }
  }
}

import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import fetch from "node-fetch";
import { Listing } from "@prisma/client";
const prisma = new PrismaClient();

export class ListingController {
  async createListing(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;

      const listing = await prisma.listing.create({
        data: {
          title: req.body.title as string,
          description: req.body.description as string,
          image: req.body.image as string,
          category: req.body.category as string,
          roomCount: req.body.roomCount as number,
          bathroomCount: req.body.bathroomCount as number,
          guestCount: req.body.guestCount as number,
          locationValue: req.body.locationValue as string,
          userId: currentUserId as number,
          price: req.body.price as number,
        },
      });

      return res.status(200).json(listing);
    } catch (err) {
      console.log(err);
    }
  }

  async getListings(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async getListing(req: Request, res: Response) {
    const currentUserId = req.currentUser?.id;
    try {
    } catch (error) {
      console.error(error);
    }
  }
}

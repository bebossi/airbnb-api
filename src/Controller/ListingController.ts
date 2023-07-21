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

  async getFavoriteListings(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;

      const currentUser = await prisma.user.findUnique({
        where: { id: currentUserId },
      });

      const favorites = await prisma.listing.findMany({
        where: {
          id: {
            in: [...(currentUser?.favoriteIds || [])],
          },
        },
      });

      return res.status(200).json(favorites);
    } catch (err) {
      console.error(err);
    }
  }

  async getProperties(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;

      const listings = await prisma.listing.findMany({
        where: {
          userId: currentUserId,
        },
      });

      return res.status(200).json(listings);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteListing(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;
      const { listingId } = req.params;

      if (!currentUserId) {
        return res.status(404).json("Error");
      }

      const listing = await prisma.listing.deleteMany({
        where: {
          id: Number(listingId),
          userId: currentUserId,
        },
      });

      return res.status(200).json(listing);
    } catch (err) {
      console.error(err);
    }
  }

  async searchingListing(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;
      const {
        roomCount,
        userId,
        guestCount,
        bathroomCount,
        locationValue,
        startDate,
        endDate,
        category,
      } = req.query;

      let query: any = {};

      if (userId) query.userId = userId;
      if (guestCount) query.guestCount = { gte: +guestCount };
      if (roomCount) query.roomCount = { gte: +roomCount };
      if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
      if (locationValue) query.locationValue = locationValue;
      if (startDate && endDate) {
        query.NOT = {
          reservations: {
            some: {
              OR: [
                {
                  endDate: { gte: startDate },
                  startDate: { lte: startDate },
                },
                {
                  startDate: { lte: endDate },
                  endDate: { gte: endDate },
                },
              ],
            },
          },
        };
      }
      if (category) query.category = category;

      const listings = await prisma.listing.findMany({
        where: query,
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(listings);
    } catch (err) {
      return res.status(500).json(err);
      console.error(err);
    }
  }
}

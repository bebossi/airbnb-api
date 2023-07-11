import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export function generateToken(user: User) {
  const { id, userName, email, image } = user;

  const signature: string = process.env.TOKEN_SIGN_SECRET as string;

  const expiration = "8h";

  return jwt.sign({ id, userName, email, image }, signature, {
    expiresIn: expiration,
  });
}

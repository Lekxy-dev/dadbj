import { User } from "@prisma/client"

export type safUser = Omit<User,
"createdAt" |"updatedAt" | "emailVerified"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string;
}
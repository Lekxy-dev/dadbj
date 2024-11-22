import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import bcrypt from 'bcrypt'
export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { name, email, password } = body;
  
      if (!name || !email || !password) {
        return NextResponse.json(
          { error: "All fields are required." },
          { status: 400 }
        );
      }
  
      // Hash password and save user
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          hashedPassword,
        },
      });
  
      return NextResponse.json(user);
    } catch (error) {
      console.error("Error in /api/register:", error);
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
  }
  
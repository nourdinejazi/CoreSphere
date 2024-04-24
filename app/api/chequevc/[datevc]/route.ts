import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { datevc: string } }
) {
  try {
    const role = await currentRole();

    if (role !== UserRole.ADMIN) {
      return new NextResponse(null, { status: 403 });
    }

    const data = await db.cheque.findMany({
      where: {
        date: {
          lte: new Date(Number(params.datevc)),
        },
        type: "GAR",
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log("[FETCH_CHEQUEVC]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

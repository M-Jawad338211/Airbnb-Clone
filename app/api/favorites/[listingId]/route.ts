import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: NextRequest,
    { params }: { params: { listingId: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { listingId } = params;
        if (!listingId) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const favoriteIds = new Set(currentUser.favoriteIds || []);
        favoriteIds.add(listingId);

        const user = await prisma.user.update({
            where: { id: currentUser.id },
            data: { favoriteIds: Array.from(favoriteIds) },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("POST /favorites error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { listingId: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { listingId } = params;
        if (!listingId) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const favoriteIds = (currentUser.favoriteIds || []).filter((id) => id !== listingId);

        const user = await prisma.user.update({
            where: { id: currentUser.id },
            data: { favoriteIds },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("DELETE /favorites error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

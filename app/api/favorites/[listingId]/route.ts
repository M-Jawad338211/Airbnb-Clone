import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: NextRequest,
    context: { params: { listingId: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { listingId } = context.params; // ✅ Extract params properly
        if (!listingId) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const favoriteIds = new Set(currentUser.favoriteIds || []);
        favoriteIds.add(listingId); // ✅ Prevent duplicate IDs

        const user = await prisma.user.update({
            where: { id: currentUser.id },
            data: { favoriteIds: Array.from(favoriteIds) },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: { listingId: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { listingId } = context.params; // ✅ Extract params properly
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
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

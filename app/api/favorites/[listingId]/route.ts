import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId: string;
}

export async function POST(
    request: NextRequest,
    { params }: { params: IParams }
) {
    try {
        if (!params?.listingId) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const favoriteIds = new Set(currentUser.favoriteIds || []);
        favoriteIds.add(params.listingId); // ✅ Prevent duplicate IDs

        const user = await prisma.user.update({
            where: { id: currentUser.id },
            data: { favoriteIds: Array.from(favoriteIds) },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: IParams }
) {
    try {
        if (!params?.listingId) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const favoriteIds = (currentUser.favoriteIds || []).filter((id) => id !== params.listingId);

        const user = await prisma.user.update({
            where: { id: currentUser.id },
            data: { favoriteIds },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

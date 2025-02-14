import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId: string; // Ensure `listingId` is required
}

// ✅ Fix: Use `params` as an argument instead of `context`
export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { listingId } = params;

    if (!listingId) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const favoriteIds = [...(currentUser.favoriteIds || [])];

    if (!favoriteIds.includes(listingId)) {
        favoriteIds.push(listingId);
    }

    const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: { favoriteIds },
    });

    return NextResponse.json(user);
}

// ✅ Fix: Use `params` correctly in DELETE function
export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { listingId } = params;

    if (!listingId) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: { favoriteIds },
    });

    return NextResponse.json(user);
}

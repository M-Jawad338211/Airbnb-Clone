import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId: string;
}

// ✅ Fix: Use `(request: NextRequest, { params }: { params: IParams })`
export async function POST(
    request: NextRequest,
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

// ✅ Fix: Use `(request: NextRequest, { params }: { params: IParams })`
export async function DELETE(
    request: NextRequest,
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

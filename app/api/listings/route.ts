

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface ListingBody {
    title: string;
    description: string;
    imageSrc: string;
    category: string;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
    location: { value: string };
    price: number;
}

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body: ListingBody = await request.json();

        // Validate body fields
        for (const key of Object.keys(body) as (keyof ListingBody)[]) {
            if (!body[key]) {
                return NextResponse.json({ error: `${key} is required` }, { status: 400 });
            }
        }

        const listing = await prisma.listing.create({
            data: {
                title: body.title,
                description: body.description,
                imageSrc: body.imageSrc,
                category: body.category,
                roomCount: body.roomCount,
                bathroomCount: body.bathroomCount,
                guestCount: body.guestCount,
                locationValue: body.location.value,
                price: Number.isNaN(Number(body.price)) ? 0 : Number(body.price),
                userId: currentUser.id,
            },
        });

        return NextResponse.json(listing);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to create listing" },
            { status: 500 }
        );
    }
}

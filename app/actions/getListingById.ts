import prisma from "@/app/libs/prismadb";

interface Iparams {
    listingId?: string;
}

export default async function getListingById(
    params: Iparams
) {
    try {
        const { listingId } = params;

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        if (!listing) {
            return null;
        }
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified:
                    listing.user.emailVerified?.toISOString() || null,
            }
        };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to fetch listing ids");
    }
}
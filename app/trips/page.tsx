import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReserations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReserations({
        userId: currentUser.id
    });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No trips Found"
                    subtitle="Looks like you have'nt reserved any trips."
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage;
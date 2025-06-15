import { useLoaderData } from "react-router-dom";
import EventItem from '../components/EventItem.js'

function EventDetailPage() {
    const data = useLoaderData();

    return (
        <EventItem event={data.event} />
    );
}

export default EventDetailPage;

/**
 * React-router-dom params contain the same data as useParams.
 * Do not forget to register a new loader to createBrowserRouter.
 * 
 * @param {*} param0 
 * @returns response with event details
 */
export async function loader({ request, params }) {
    const id = params.eventId;

    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw new Response(
            JSON.stringify({ message: 'Could not fetch details for selected event.' }),
            { status: 500 }
        );
    } else {
        return response;
    }
}
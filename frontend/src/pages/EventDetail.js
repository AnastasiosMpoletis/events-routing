import {
    // useLoaderData,
    useRouteLoaderData, redirect
} from "react-router-dom";
import EventItem from '../components/EventItem.js'

function EventDetailPage() {
    /**
     * useLoaderData searches for the closest available loader data and the highest level at which it looks for data 
     * is the route definition of the route for which EventDetailPage component was loaded. In our case in path: 'edit'. @see {@link App}
     * But we want to load data from eventsLoader in path: 'events'.
     * We also need an id for that.     
     */
    // const data = useLoaderData();

    const data = useRouteLoaderData('event-detail');


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
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId);

    if (!response.ok) {
        throw new Response(
            JSON.stringify({ message: 'Could not fetch details for selected event.' }),
            { status: 500 }
        );
    } else {
        return response;
    }
}

export async function action({ request, params }) {
    const eventId = params.eventId;

    /**
     * Method passed from submit(). 
     * @see {@link EventItem}
     */
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,
    });

    if (!response.ok) {
        throw new Response(
            JSON.stringify({ message: 'Could not delete event.' }),
            { status: 500 }
        );
    }

    return redirect('/events');
}
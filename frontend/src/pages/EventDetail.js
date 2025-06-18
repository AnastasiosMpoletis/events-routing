import {
    // useLoaderData,
    useRouteLoaderData, redirect, Await
} from "react-router-dom";
import { Suspense } from "react";
import EventItem from '../components/EventItem.js'
import EventsList from '../components/EventsList.js'

function EventDetailPage() {
    /**
     * useLoaderData searches for the closest available loader data and the highest level at which it looks for data 
     * is the route definition of the route for which EventDetailPage component was loaded. In our case in path: 'edit'. @see {@link App}
     * But we want to load data from eventsLoader in path: 'events'.
     * We also need an id for that.     
     */
    // const data = useLoaderData();

    const { event, events } = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }} > Loading event...</p >}>
                <Await resolve={event}>
                    {loadedEvent => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }} > Loading events...</p >}>
                <Await resolve={events}>
                    {loadedEvents => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    );
}

export default EventDetailPage;

async function loadEvent(eventId) {
    const response = await fetch('http://localhost:8080/events/' + eventId);

    if (!response.ok) {
        throw new Response(
            JSON.stringify({ message: 'Could not fetch details for selected event.' }),
            { status: 500 }
        );
    } else {
        const responseData = await response.json();
        return responseData.event;
    }
}

/**
 * Copied from EventsPage. Should be in a shared file.
 * 
 * @returns 
 */
async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw new Response(
            JSON.stringify({ message: 'Could not fetch events.' }),
            { status: 500 }
        );
    } else {
        const responseData = await response.json();
        return responseData.events;
    }
}

/**
 * In this loader, we have two functions that return data. We can wrap them in an object like this.
 * Notice  the await keyword for loadEvent. 
 * This way, the page waits to fetch the event before it gets rendered (this is fast).
 * But for events, we do not wait for them and we display a loading message while loading (this is not fast).
 * 
 * @param {*} param0 
 * @returns response with event details
 */
export async function loader({ request, params }) {
    return {
        event: await loadEvent(params.eventId),
        events: loadEvents(),
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
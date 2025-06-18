import {
    useLoaderData, Await
    // json 
} from 'react-router-dom';
import { Suspense } from 'react';

import EventsList from '../components/EventsList';

function EventsPage() {
    // useLoaderData will automatically give us the data that is part of the response
    const { events } = useLoaderData();

    /**
     * Await component will wait for the data to fetch. Child function will be executed once the data is fetched.
     * Suspence component can be used to show a fallback whilst we wait for data to arrive.
     */
    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    );
}

export default EventsPage;

/**
 * We use a separate function in order to load something in the page until data is fetched. 
 * We also use Suspence and Await in our component return function.
 * 
 * @returns events from backend
 */
async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch events.' };

        // if there no errorElement for Events, this error can bubble up until it reaches an errorElement (e.g. in Root)
        throw new Response(
            JSON.stringify({ message: 'Could not fetch events.' }),
            { status: 500 }
        );

        /**
         * With json(), we can directly access Response data, without having to serialize it to JSON to get e.g. the message.
         * 
         * IMPORTANT: json() is available for react-router-dom version = 6. This project's rect-router-dom version (10.9.2) doesn't support it. 
         * We should use: throw new Response(...) as above.
         */
        // return json(
        //     { message: 'Could not fetch events.' },
        //     { status: 500 }
        // );
    } else {
        // we can return anything from a loader. Even the response
        // return response;

        const responseData = await response.json();
        return responseData.events;
    }
}

/**
 * It is a good practice to place this events loader in Events page.
 * 
 * @returns events from backend
 */
export function loader() {
    return {
        events: loadEvents() // we also execute loadEvents
    };
}

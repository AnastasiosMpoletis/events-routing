import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
    // useLoaderData will automatically give us the data that is part of the response
    const data = useLoaderData();
    const events = data.events;

    return (
        <EventsList events={events} />
    );
}

export default EventsPage;

/**
 * It is a good practice to place this events loader in Events page.
 * 
 * @returns events from backend
 */
export async function loader() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        //TODO 
    } else {
        // we can return anything from a loader. Even the response.
        return response;
    }
}

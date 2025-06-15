import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
    const events = useLoaderData();

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
        const resData = await response.json();
        return resData.events;
    }
}

import { Link } from "react-router-dom";

const EVENTS = [
    { id: 'e1', title: 'Event 1', },
    { id: 'e2', title: 'Event 2', },
    { id: 'e3', title: 'Event 3', },
    { id: 'e4', title: 'Event 4', },
];

function EventsPage() {
    return (
        <>
            <h1>Events Page</h1>
            {EVENTS.map(event =>
                <li key={event.id}>
                    <Link to={event.id}>
                        {event.title}
                    </Link>
                </li>
            )}
        </>
    );
}

export default EventsPage;
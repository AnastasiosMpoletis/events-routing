import { redirect } from "react-router-dom";
import EventForm from "../components/EventForm.js";

function NewEventPage() {
    return (
        <EventForm />
    );
}

export default NewEventPage;

/**
 * Prerequisite:
 * 1. Use react-router-dom Form.
 * 2. Add attribute method="post" to Form.
 * 3. Make sure all inputs have a name attribute.
 * 4. Assign it to createBrowserRouter.
 */
export async function action({ request, params }) {
    const data = await request.formData();

    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    }

    const response = await fetch('http://localhost:8080/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData),
    });

    if (!response.ok) {
        throw new Response(
            JSON.stringify({ message: 'Could not save event.' }),
            { status: 500 }
        );
    }

    return redirect('/events');
}
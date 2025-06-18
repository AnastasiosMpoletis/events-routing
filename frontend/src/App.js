// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root.js';
import ErrorPage from './pages/Error.js';
import HomePage from './pages/Home.js';
import EventsRootLayout from './pages/EventsRoot.js';
import EventsPage, { loader as eventsLoader } from './pages/Events.js';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction
} from './pages/EventDetail.js';
import NewEventPage from './pages/NewEvent.js';
import EditEventPage from './pages/EditEvent.js';
import { action as manipulateEventAction } from './components/EventForm.js'
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            // just before this route gets rendered, loader will be triggered
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            // we need this id so that the children can point to the parent's attributes
            id: 'event-detail',
            // we do not need an element here. We just want to share the loader or any other functionality
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

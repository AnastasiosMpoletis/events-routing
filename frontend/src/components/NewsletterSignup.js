import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  /**
   * UseFetcher() uses the action, loader etc. of the route without navigating to the page it belongs.
   * With action attribute we can point to the route which action, loader etc. we want to use.
   */
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;

// type: view, click, exit represented as (0,1,2)
export const EVENT_TYPE = {
  CLICK: 'click',
  VIEW: 'view',
  EXIT: 'exit',
};

// we gonna connect on localhost:3005/event => POST http
const URL = import.meta.env.VITE_EVENTS_URL;

const TYPE_MAPPING = {
  view: 0,
  click: 1,
  exit: 2,
};

export function captureEvent({ type = 'click', label = 'view' }) {
  console.log('Event Triggered', { type, label });
  console.log(window.WEBSITEID);
  if (window.WEBSITEID === undefined) {
    throw new Error('Website is not defined!!');
  }
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: TYPE_MAPPING[type],
      userAgent: window.navigator.userAgent || '',
      ip: '127.0.0.1',
      browserId: window.BROWSERID || '',
      websiteId: window.WEBSITEID || '',
    }),
  })
    .then((response) => {
      console.log('Fetch response status:', response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Event successfully sent:', data);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

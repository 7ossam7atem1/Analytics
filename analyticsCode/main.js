import { captureEvent, EVENT_TYPE } from './event.js';

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');
  alert('THE DOM IS READY');
  captureEvent({
    type: EVENT_TYPE.VIEW,
    label: document.title,
  });
});

document.addEventListener('click', function (event) {
  console.log('Click event detected', event.target);
  captureEvent({
    type: EVENT_TYPE.CLICK,
    label: event.target.innerText,
  });
});

// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/Lab7/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

var numEntry = 0;
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        numEntry ++;
        var curEntry = numEntry;
        newPost.addEventListener('click', () => {
          // history.pushState({'type': 'single-entry', 'title': '', 'url': '#entry' + (curEntry), 'entry': newPost.entry});
          router.setState({'type': 'single-entry', 'title': '', 'url': '#entry' + (curEntry), 'entry': newPost.entry})
        });
        
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});

// Keep the main page with no url title or use the history title
window.onpopstate = (event) => {
  if(history.state !== null) {
    router.setState(history.state);
  }
  else {
    router.setState({'type': 'main-page', 'title': '', 'url': ' '});
  }
}

// Add event listener for settings 
var setting = document.querySelector('header img');

setting.addEventListener('click', () => {
  router.setState({'type': 'settings', 'title': '', 'url': '#settings'});
})

// Add event listener for title
var title = document.querySelector('header h1');

title.addEventListener('click', () => {
  router.setState({'type': 'main-page', 'title': '', 'url': ' '});
})


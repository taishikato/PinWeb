"use strict";

const getScreenShot = () => {
  chrome.tabs.captureVisibleTab(null, {}, image => {
    chrome.tabs.query({
      active: true
    }, async tabs => {
      const loading = document.getElementById('loading');
      loading.style.display = 'block';
      const tab = tabs[0];
      const tabTitle = tab.title;
      const fetchOptins = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image
        })
      };

      try {
        const res = await fetch('https://pinweb-enjoy.firebaseapp.com/getImageUrl', fetchOptins);
        const jsonFormed = await res.json();
        window.open(`https://www.pinterest.jp/pin/create/bookmarklet/?description=${encodeURIComponent(tabTitle)}&media=${encodeURIComponent(jsonFormed.image)}&url=${encodeURIComponent(tab.url)}&alt=alt&title=PinWeb&is_video=false`, null, 'width=200,toolbar=no,menubar=yes,scrollbars=yes');
      } catch (err) {
        console.log(err);
      } finally {
        loading.style.display = 'none';
      }
    });
  });
};

document.getElementById('button').addEventListener('click', e => {
  e.preventDefault();
  getScreenShot();
});

const getScreenShot = () => {
  chrome.tabs.captureVisibleTab(null, {}, (image) => {
    chrome.tabs.query({ active: true }, function (tabs) {
      const tab = tabs[0];
      const tab_title = tab.title;
      const h1 = tab.id
      document.querySelector("#id1").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + "</p>";
      // You can add that image HTML5 canvas, or Element.
      document.querySelector("#screen-shot").innerHTML = `<img src="${image}" width="200"/>`
      const data = { image }
      const myInit = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch('https://pinweb-enjoy.firebaseapp.com/getImageUrl', myInit).then(async res => {
        const jsonFormed = await res.json()
        window.open(
          `https://www.pinterest.jp/pin/create/bookmarklet/?description=${encodeURIComponent(tab_title)}&media=${encodeURIComponent(jsonFormed.image)}&url=${encodeURIComponent(tabs[0].url)}&alt=alt&title=PinWeb&is_video=false`,
          null,
          'width=200,toolbar=no,menubar=yes,scrollbars=yes'
        )
        return
      }).catch(err => {
        console.log(err)
      })
    })
  })
}

document.getElementById('button').addEventListener('click', (e) => {
  e.preventDefault()
  getScreenShot()
})
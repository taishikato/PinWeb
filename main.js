const getScreenShot = () => {
  chrome.tabs.captureVisibleTab(null, {}, image => {
    chrome.tabs.query({ active: true }, tabs => {
      const tab = tabs[0];
      const tabTitle = tab.title;
      document.querySelector("#screen-shot").innerHTML = `<img src="${image}" width="200"/>`
      const data = { image }
      const fetchOptins = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch('https://pinweb-enjoy.firebaseapp.com/getImageUrl', fetchOptins).then(async res => {
        const jsonFormed = await res.json()
        window.open(
          `https://www.pinterest.jp/pin/create/bookmarklet/?description=${encodeURIComponent(tabTitle)}&media=${encodeURIComponent(jsonFormed.image)}&url=${encodeURIComponent(tab.url)}&alt=alt&title=PinWeb&is_video=false`,
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
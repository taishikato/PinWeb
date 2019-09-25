const getScreenShot = () => {
  // window.alert('clicked');
  // generateScreenShot(document)

  chrome.tabs.captureVisibleTab(null, {}, (image) => {
    // You can add that image HTML5 canvas, or Element.
    document.querySelector("#screen-shot").innerHTML = `<img src="${image}" width="200"/>`
    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/the360gram.appspot.com/o/posts%2F3811c428c9354f01b1e56140468de806.png?alt=media&token=e22f7ade-178a-4de7-a964-3d49c19a7454'
    window.open(
      `https://www.pinterest.jp/pin/create/bookmarklet/?description=AskMakers%20-%20Ask%20experienced%20makers%20questions%20anonymously&media=${encodeURIComponent(imageUrl)}&url=https%3A%2F%2Faskmakers.co%2F&alt=alt&title=A%20ShotPin&is_video=false`,
      null,
      'width=200,toolbar=no,menubar=yes,scrollbars=yes'
    )
  });

  // var tab_title = '';
  // function display_h1(results) {
  //   h1 = results;
  //   document.querySelector("#id1").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + "</p>";
  // }
  chrome.tabs.query({ active: true }, function (tabs) {
    var tab = tabs[0];
    const tab_title = tab.title;
    const h1 = tab.id
    document.querySelector("#id1").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + "</p>";
    // chrome.tabs.executeScript(tab.id, {
    //   code: 'document.querySelector("h1").textContent'
    // }, display_h1);
  });
}

const generateScreenShot = (document) => {
  const src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"
  const sc = document.createElement("script")
  sc.type = "text/javascript"
  sc.src = src
  sc.onload = () => {
    html2canvas(document.body, {
      onrendered: (canvas) => {
        const imgageData = canvas.toDataURL("image/png")
        const newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream")
        console.log(newData)
        const element = document.createElement('a')
        element.setAttribute('href', newData)
        element.setAttribute('download', 'screen.png')
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
      }
    })
  }
  document.body.appendChild(sc)
}

document.getElementById('button').addEventListener('click', (e) => {
  e.preventDefault()
  getScreenShot()
})
const getScreenShot = () => {
  // window.alert('click');
  // const src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"
  // const sc = document.createElement("script")
  // sc.type = "text/javascript"
  // sc.src = src
  // sc.onload = () => {
  //   html2canvas(document.body, {
  //     onrendered: (canvas) => {
  //       const imgageData = canvas.toDataURL("image/png")
  //       const newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream")
  //       console.log(newData)
  //       const element = document.createElement('a')
  //       element.setAttribute('href', newData)
  //       element.setAttribute('download', 'screen.png')
  //       element.style.display = 'none'
  //       document.body.appendChild(element)
  //       element.click()
  //       document.body.removeChild(element)
  //     }
  //   })
  // }
  // document.body.appendChild(sc)
  var tab_title = '';
  function display_h1(results) {
    h1 = results;
    document.querySelector("#id1").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + "</p>";
  }
  chrome.tabs.query({ active: true }, function (tabs) {
    var tab = tabs[0];
    tab_title = tab.title;
    chrome.tabs.executeScript(tab.id, {
      code: 'document.querySelector("h1").textContent'
    }, display_h1);
  });
}

document.getElementById('button').addEventListener('click', (e) => {
  e.preventDefault()
  getScreenShot()
})
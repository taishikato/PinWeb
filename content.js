console.log('Open')
var myInit = {
  method: 'GET',
  mode: 'cors',
  cache: 'default'
};
const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/the360gram.appspot.com/o/posts%2F3811c428c9354f01b1e56140468de806.png?alt=media&token=e22f7ade-178a-4de7-a964-3d49c19a7454'
fetch('https://pinweb-enjoy.firebaseapp.com/s/takato2', myInit).then(res => {
  console.log('success')
  console.log(res)
  return res.json()
}).then(res2 => {
  console.log(res2)
  console.log('success2')
}).catch(err => {
  console.log('error')
  console.log(err)
})
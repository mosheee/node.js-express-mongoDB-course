

// with fetch we can take a result from one http and use it in another http
fetch('/weather?address=boston').then((result) => {
    result.json().then((data) => {})
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'loading...'
    const location = search.value
    fetch('/weather?address='+location).then((result) => {
        result.json().then((data) => {
            if(data.error){
                messageOne.textContent = 'select another location'
            }else{
                messageOne.textContent = data.address            }
        })
    })
})

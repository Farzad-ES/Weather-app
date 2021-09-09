const searchForm=document.querySelector('form')
const searchBar=document.querySelector('input')
const messageOne=document.querySelector('#firstMessage')
const messageTwo=document.querySelector('#secondMessage')

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const desiredLocation=searchBar.value
    
    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+encodeURIComponent(desiredLocation)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
            } else {
                messageOne.textContent='Location:'+data.Location
                messageTwo.textContent='Forecast:'+data.Forecast
            }
        })
    })
})
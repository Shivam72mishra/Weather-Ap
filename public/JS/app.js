

console.log("hello wrold")



const weatherForm=document.querySelector("form")
const messageOne=document.querySelector("#message-1")



weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    const search=document.querySelector("input")
    const location=search.value

    messageOne.textContent="Loading"

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.data){
            messageOne.textContent=data.data
    }else{
        messageOne.textContent=data.error
    }
    })
})

})
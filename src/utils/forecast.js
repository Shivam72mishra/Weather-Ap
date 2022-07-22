const request=require("request")


const forecast=(location,callback)=>{
    

    const url=`http://api.weatherstack.com/current?access_key=2c3c88baa18747e2fc3ec652946cfb1d&query=${location}`
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to access Weather",undefined)
        }else if(body.error){
           callback("Unable to find location",undefined)
        }else{
         callback(undefined,"Your current temprature is "+body.current.temperature+" It feels like "+body.current.feelslike);
        }
    })
    
    }


    module.exports=forecast
const path=require("path")
const express=require("express")
const req = require("express/lib/request")
const hbs=require("hbs")
const forecast=require("./utils/forecast")

const app=express()


console.log(__dirname)
console.log(path.join(__dirname,"../public"))

const publicDirectoryPath=path.join(__dirname,"../public")

const viewsPath=path.join(__dirname,"../templates/views")
 const partialsPath=path.join(__dirname,"../templates/partials")

 hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        
    })
})

app.get("/about",(req,res)=>{
     res.render("about",{
         title:"About",
         name:"Shivam"
     })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg:"Its help msg",
        title:"Help"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
        
    }
    if(req.query.address){
    forecast(req.query.address,(error,data)=>{
          if(error){
              return res.send(error)
          }else{
          res.send({
              data:data,
              
              
            })}

    })}

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get("/help/*",(req,res)=>{
    res.render('404error',{
        errorMsg:"cant match with your request"
    })
})
app.get("*",(req,res)=>{
    res.render('404error',{
        title:"error Page",
        name:"shivam",
        errorMsg:"404 page not found"
    })
})



app.listen(3000,()=>{
    console.log("Server started On port 3000")
})
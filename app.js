const express = require("express");
const https = require("https");
const bodyparser  = require("body-parser");


const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.get("/",function(req,res){

res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req, res){


  const query = req.body.Cityname;
  const apikey = "b7679ab43afa0ff2a4f79bb3bce7b351";
  const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;

    https.get(url,function(response){
      console.log(response.statusCode);

      response.on("data",function(data){

    const weatherData = JSON.parse(data)
    const temp = weatherData.main.feels_like
    const weatherDescription = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write("<p>the weather is currently " + weatherDescription + "<p>");
    res.write("<h1>The temperature in " + query  + " is " + temp +" degrees celcius.</h1>");
    res.write("<img src=" + imageURL + ">");
    res.send()

      })
    })



})



app.listen(3000,function(){
  console.log("server is running on port 3000");
})

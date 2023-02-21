const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/",function(req,res){
    const location = req.body.cityName;
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=b51c54d2109d32a83065de70e5cfa336&units=Metric";
    
    https.get(url,function(response){
        console.log(response);
        
        response.on("data",function(data){
            const WeatherData = JSON.parse(data);
            const city = WeatherData.name;
            const temp = WeatherData.main.temp;
            const weatherDescription = WeatherData.weather[0].description;
            const icon = WeatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            res.write("<p>The Weather Description is: "+weatherDescription+"</p>");
            
            res.write("<h1>The Temperature at "+location+" is "+temp+" Degrees Celcius.</h1>");
            res.write("<img src = "+iconUrl+">");
            res.send();
        });
        
        
    });
    
});






app.listen(3000,function(){
    console.log("server is started on port 3000");
});

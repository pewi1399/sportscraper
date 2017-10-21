var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  year = 2016
  for(year in years){
  url = 'http://www.hockeyallsvenskan.se/spelschema/HA_'+ year +'_regular';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      // gamedays
      gamedays = $(".rmss_c-schedule-game__header-game-day").map(function(){
        return $(this).text()
      }).get()


      //game info
      hometeam = $(".rmss_c-schedule-game__team.is-home-team")
      .find(".rmss_c-schedule-game__team-name.rmss_c--mobile").map(function(){
        return $(this).text()
      }).get()

      awayteam = $(".rmss_c-schedule-game__team.is-away-team")
      .find(".rmss_c-schedule-game__team-name.rmss_c--mobile").map(function(){
        return $(this).text()
      }).get()

      homescore = $(".rmss_c-schedule-game__result.is-gallery-layout").find(".is-home-team").map(function(){
        return $(this).text()
      }).get()

      awayscore = $(".rmss_c-schedule-game__result.is-gallery-layout").find(".is-away-team").map(function(){
        return $(this).text()
      }).get()
      //console.log(gg);

      //create output array
      var out = [];
      for(var i  = 0; i < awayteam.length; i++){
          out.push({
              "hometeam" : hometeam[i],
              "awayteam"  : awayteam[i],
              "homescore"  : homescore[i],
              "awayscore"  : awayscore[i],
          });
      }
    }

    fs.writeFile('output.json',
    JSON.stringify(out, null, 4),
     function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
  }
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

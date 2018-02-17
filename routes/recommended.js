
/*
 * GET home page.
 */

'use strict';
const yelp = require('yelp-fusion');
//var localStorage = require('web-storage')().localStorage;
const apiKey = 'WiNraPNc4ZKOeIZGbwBDUVOMUXnfGNxYo_-MlkjtZ7-C4nAVuDPvD8bxJdQ90xG2-0iTampc0TbS6qVtMV88kV1v7DQWgXuWdo8fUFgrGKNmMIVLMukPWVP_xuR9WnYx';
var data = require('../data.json');

exports.recommendedView = function(req, res){
  
    var userInput = req.query.userInput;
    

    const searchRequest = {
      term:'vietnamese',
      location: 'san diego, ca'
    };

    const client = yelp.client(apiKey);

    client.search(searchRequest).then(response => {
      const firstResult = response.jsonBody.businesses[0];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      var businessID = firstResult.id;
      //console.log(firstResult.id);

      client.business(businessID).then(response => {
        //console.log(response.jsonBody);

        var newRest = {
            "id": response.jsonBody.id,
            "name": response.jsonBody.name,
            "image_url": response.jsonBody.image_url,
            "is_claimed": response.jsonBody.is_claimed,
            "is_closed": response.jsonBody.is_closed,
            "url": response.jsonBody.url,
            "phone": response.jsonBody.phone,
            "display_phone": response.jsonBody.display_phone,
            "review_count": response.jsonBody.review_count,
            "categories": response.jsonBody.categories,
            "rating": response.jsonBody.rating,
            "location": response.jsonBody.location,
            "coordinates": response.jsonBody.coordinates,
            "photos": response.jsonBody.photos,
            "price": response.jsonBody.price,
            "hours": response.jsonBody.hours,
            "transactions": response.jsonBody.transactions
        };

        var rating_image;
        switch (newRest.rating) {
          case 0:
              rating_image = '/images/yelp_stars/web_and_ios/regular/regular_0.png';
              break;
          case 1:
              rating_image = '/images/yelp_stars/web_and_ios/regular/regular_1.png';
              break;
          case 1.5:
              rating_image = '/images/yelp_stars/web_and_ios/regular/regular_1_half.png';
              break;
          case 2:
              rating_image = '/images/yelp_stars/web_and_ios/regular/regular_2.png';
              break;
          case 2.5:
              rating_image = '/images/yelp_stars/web_and_ios/regular/regular_2_half.png';
              break;
          case 3:
              rating_image = '/images/yelp_stars/web_and_ios/regular/regular_3.png';
              break;
          case 3.5:
              rating_image = '/images/yelp_stars/web_and_ios/regular/regular_3_half.png';
              break;
          case 4:
              rating_image = '/images/yelp_stars/web_and_ios/regular/regular_4.png';
              break;
          case 4.5:
              rating_image = '/images/yelp_stars/web_and_ios/regular/regular_4_half.png';
              break;
          case 5:
              rating_image = '/images/yelp_stars/web_and_ios/regular/regular_5.png';
              
      } 

        var display = {
            "name": response.jsonBody.name,
            "image_url": response.jsonBody.image_url,
            "categories": response.jsonBody.categories[0].title,
            "review_count": response.jsonBody.review_count,
            "rating": response.jsonBody.rating,
            "rating_img" : rating_image,
            "price": response.jsonBody.price,

        };

        console.log(display);

        data.restaurant.push(newRest);
        

        res.render('recommended', display);


    }).catch(e => {
        console.log(e);
    });


    }).catch(e => {
      console.log(e);
    });

  

    


    //res.render('recommended');
};
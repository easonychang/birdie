
/*
 * GET home page.
 */

'use strict';
const yelp = require('yelp-fusion');
const apiKey = 'WiNraPNc4ZKOeIZGbwBDUVOMUXnfGNxYo_-MlkjtZ7-C4nAVuDPvD8bxJdQ90xG2-0iTampc0TbS6qVtMV88kV1v7DQWgXuWdo8fUFgrGKNmMIVLMukPWVP_xuR9WnYx';
var restdata = require('../restdata.json');
var displaydata = require('../displaydata.json');

exports.recommendedView = function(req, res){
  

    //console.log(req.params);
    var searchValue = req.params.cuisine;
    

    if(searchValue === undefined){
        searchValue = 'korean';
    }

    console.log(searchValue);

    const searchRequest = {
      term: searchValue,
      location: 'san diego, ca'
    };

    const client = yelp.client(apiKey);

    client.search(searchRequest).then(response => {
        const result = response.jsonBody.businesses;
        const prettyJson = JSON.stringify(result, null, 4);
      
        //result[4] start
        client.business(result[4].id).then(response => {
            displayData(response);
            //result[3] start
            client.business(result[3].id).then(response => {
                displayData(response);
                //result[2] start
                client.business(result[2].id).then(response => {
                    displayData(response);
                    //result[1] start
                    client.business(result[1].id).then(response => {
                        displayData(response);
                        //result[0] start
                        client.business(result[0].id).then(response => {
                            displayData(response);
                            res.render('recommended', displaydata);

                        }).catch(e => {
                            console.log(e);
                        }); //result[0] end 

                    }).catch(e => {
                        console.log(e);
                    }); //result[1] end 

                }).catch(e => {
                    console.log(e);
                }); //result[2] end 

            }).catch(e => {
                console.log(e);
            }); //result[3] end 

        }).catch(e => {
            console.log(e);
        }); //result[4] end 

        

    }).catch(e => {
      console.log(e);
    });


};


function displayData(response){

    /*var newRest = {
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
    };*/

    var rating_image;
    switch (response.jsonBody.rating) {
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

    //console.log(display);




    //restdata.restaurant.push(newRest);
    
    
    //Prevent Duplicate
    for(var key in displaydata.restaurant){
        if(displaydata.restaurant.hasOwnProperty(key)){
            if(displaydata.restaurant[key].name === display.name){
                var dataExist = true;
            }
        }
    }

    if(!dataExist){
        displaydata.restaurant.push(display);
    }

}
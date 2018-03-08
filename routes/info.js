const yelp = require('yelp-fusion');
const apiKey = 'WiNraPNc4ZKOeIZGbwBDUVOMUXnfGNxYo_-MlkjtZ7-C4nAVuDPvD8bxJdQ90xG2-0iTampc0TbS6qVtMV88kV1v7DQWgXuWdo8fUFgrGKNmMIVLMukPWVP_xuR9WnYx';
var restdata = require('../restdata.json');
var displaydata = require('../displaydata.json');
/*
 * GET info page.
 */

exports.infoView = function(req, res){
	console.log("not calling");
  	res.render('info');
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

    var locationArr = response.jsonBody.location.display_address;
    var address="";
    
    for (var index in locationArr){
        address += locationArr[index]+" ";
    }

    var display = {
        "name": response.jsonBody.name,
        "image_url": response.jsonBody.image_url,
        "categories": response.jsonBody.categories[0].title,
        "review_count": response.jsonBody.review_count,
        "rating": response.jsonBody.rating,
        "rating_img" : rating_image,
        "price": response.jsonBody.price,
        "location": address,

    };


     displaydata.restaurant.push(display);

}


exports.getRec = function (req,res){
	displaydata.restaurant.length = 0;
    var searchValue = req.params.restaurant;

    const searchRequest = {
      term: searchValue,
      location: 'san diego, ca'
    };

    const client = yelp.client(apiKey);

    client.search(searchRequest).then(response => {
        const result = response.jsonBody.businesses;
        //res.render('info', result);
        client.business(result[0].id).then(response => {
                            displayData(response);
                            res.render('info', displaydata);
                            //res.json(displaydata);

                        }).catch(e => {
                            console.log(e);
                        }); //result[0] end 
  });
}


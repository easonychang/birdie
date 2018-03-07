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

exports.getRec = function (req,res){
    var searchValue = req.params.restaurant;

    const searchRequest = {
      term: searchValue,
      location: 'san diego, ca'
    };
    const client = yelp.client(apiKey);

    client.search(searchRequest).then(response => {
        const result = response.jsonBody.businesses;
        console.log(result[0].location.address1);
        res.render('info', result[0]);
  });
}


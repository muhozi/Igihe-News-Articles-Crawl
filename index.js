var express = require('express');
var path = require('path');
var swig = require('swig');
var request = require('request');
var cheerio = require('cheerio');
var _= require('lodash');
var bodyParser = require('body-parser');
var port = process.env.PORT || 80;

var app = express();

app.engine('html', swig.renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	var url = "http://www.igihe.com/";

request(url, function(err, resp, body){
	var $ = cheerio.load(body, {decodeEntities: true});
if (url == "http://www.igihe.com/") {
	var urli = "Igihe";
}

var saa = $('.time');
var saaText = saa.text();

var newsProviderText = urli;

var articleNameText = [];
$('.homenews-title a').each(function() {
   articleNameText.push( $(this).html() );
});
for(var i=0; i < articleNameText.length; i++) {
 articleNameText[i] = articleNameText[i].replace(/&#x2019;|&#x2018;/g, '\'').replace(/&#xE8;/g, 'é').replace(/&#x201C;|&#x201D;/g, '"').replace(/&#xEF;/g, 'ï').replace(/&#xF4;/g, 'ô');
}

var sizes = articleNameText.length;
	var details = {
		articleName: articleNameText,
		newsProvider: newsProviderText,
		length: sizes,
		saa: saaText
	};
	var detailsArray = _(details).toArray();

	//console.log(detailsArray);
	return res.render('index', {
		articleInfo: detailsArray
	});
});
});
app.listen(port, function(){
	//console.log('Running Server on ' + port);
});

var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var str = '{"a": "d", "v": "d", "c": "f"}';

app.get('/items',function(req,res){
	console.log('get items');
});

app.post('/items',function(req,res){
	console.log('post items');
	console.log(data);
});

app.use(express.static(__dirname + '/public'));
.listen(5000);





fs.writeFile('message.json', str, function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});
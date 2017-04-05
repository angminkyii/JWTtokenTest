var mongoose = require('mongoose');

console.log('Opening database...');
 mongoose.connect("mongodb://localhost/data");
 var db = mongoose.connection;

 db.on('error', () => {
     console.log('Cannot open database');
 });

 db.on('open', () => {
     console.log('Successfully opened database');
 });
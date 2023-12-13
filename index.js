const express = require('express');
const app = express();
// To get data from the response body
var bodyParser = require("body-parser");
const port = 3000;
app.use(bodyParser.json()); // to support JSON-encoded bodies

// First middleware is called the request route handler
function middleware1(req, res, next) {
   // Two reposnses cannot be sent, like one from middleware without any condition and
   // another from the request route handler.
   
   console.log("from inside of Middleware 1"+req.headers.counter);
   
   // next -> this method is important, only after this is called,
   // next method or the route handler will be called.
   next();
}
// app.use -> Only when this is used then middleware gets added to the request pipeline
app.use(middleware1);

 function calculateSum (counter) {
    var sum = 0;
    for (let i =0; i<counter; i++)
    {
        sum = sum + i;
    }
    return sum;
 }

 function handleParams(req, resp) {
    // Taking counter data from params
    let counter = req.params.counter;

    let answerObject = {
      sum: calculateSum(counter)
    }
    // returning object as response
    resp.send(answerObject);
 }

 function startedMessage() {
    console.log("Server is running on http://localhost:"+port);
 }

 function handleHeaders(req, res) {
   // req.headers.counter -> collects the counter value from the headers in post request
   let counter = req.headers.counter;
   console.log(req.headers);

   if (counter < 100000) {
      let sum = calculateSum(counter);
      let str = 'The sum is '+sum;
      res.send(str);
   } else {
      // sending a custom status code with function currying ("calling of multiple functions at one time in a order like,")
      // res.status(411).send("...");
      res.status(411).send("You have sent a very big number");
   }

 }

 function calculateMul(counter) {
   let answer = 1;
   for (let i = 1; i<=counter; i++) {
      answer = answer * i;
   }
   return answer
 }

 function handleBody( req, res) {
   console.log(req.body);
   let counter = req.body.counter;
   let result = {
      sum: calculateSum(counter),
      mul: calculateMul(counter),
   };
   res.send(result);
 }

 function handleHtml(req, res) {
   /*
   res.send(`
      <body>
         <b>hi there</b>
      </body>`);
   */
   res.sendFile(__dirname+"./index.html");
 }
 app.get('/getHtml', handleHtml);

 
 app.get('/:counter', handleParams);

 // middlewares can be called for a particular route
 app.post('/handleHeaders', middleware1, handleHeaders);
 
 app.post('/handleBody', handleBody);
 
 app.listen(port, startedMessage);
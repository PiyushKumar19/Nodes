const express = require('express');
const app = express();
const port = 3000;

 function calculateSum (counter) {
    var sum = 0;
    for (let i =0; i<counter; i++)
    {
        sum = sum + i;
    }
    return sum;
 }

 function handleFirstRequest(req, resp) {
    // Taking counter data from params
    let counter = req.params.counter;

    let sum = calculateSum(counter);
    let str = 'The sum is '+sum;
    resp.send(str);
 }

 function startedMessage() {
    console.log("Server is running on http://localhost:"+port);
 }

 function handleHeaders(req, res) {
   // req.headers.counter -> collects the counter value from the headers in post request
   let counter = req.headers.counter;
   console.log(req.headers);
   let sum = calculateSum(counter);
   let str = 'The sum is '+sum;

   res.send(str);
 }

 app.get('/:counter', handleFirstRequest);

 app.post('/handleHeaders', handleHeaders);
 
 app.listen(port, startedMessage);
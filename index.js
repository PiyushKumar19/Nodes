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
    // Taking counter data from query
    let counter = req.query.counter;
    // let bod = req.body.count1;
    // let headerCount = req.header.counter;

    let sum = calculateSum(counter);
    let str = 'The sum is '+sum;
    resp.send(str);
 }

 function startedMessage() {
    console.log("Server is running on http://localhost:"+port);
 }

 function handleSecond(req, resp) {
    let name = req.params.username;
    let str = 'Hello '+name+" ! ;)";
    resp.send(str);
 }

 app.get('/handleSum', handleFirstRequest);
 // :username -> this makes the route to accept any value
 //     that can be accessed with -> req.params.username, in any method
 app.get('/:username', handleSecond);
 
 app.listen(port, startedMessage);
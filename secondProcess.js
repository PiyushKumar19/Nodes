function logResponseBody(jsonBody) {
    console.log(jsonBody);
}

function callbackfn(result) {
    // extracting the data from response, handing the promise 
    // with logResponseBody function
    result.json().then(logResponseBody);
}

var sendObj = {
    method: "GET"
};

fetch("http://localhost:3000/handleQuery?counter=1000", sendObj).then(callbackfn);
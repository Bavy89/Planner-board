var settings = {
    "url": "https://specialist-cc.freshdesk.com/api/v2/search/tickets?query=\"status:2\"",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Basic aElLdE5uRnJyWk1TTUZKRjI1TzpY",
      "Cookie": "_x_m=x_c; _x_w=6_1"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response)
    const arr = response
    const myJSON = JSON.stringify(arr);
    console.log(myJSON)
    document.getElementById("test").innerHTML = response;

    for (var i = 0; i < response.length; i++) {
        console.log(myStringArray[i]);
        console.log("lol")
    }
  });

console.log("hei")

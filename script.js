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
    console.log(response);
  });
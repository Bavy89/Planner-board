
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic aElLdE5uRnJyWk1TTUZKRjI1TzpY");
myHeaders.append("Cookie", "_x_m=x_c; _x_w=6_1");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch('https://specialist-cc.freshdesk.com/api/v2/search/tickets?query="status:2"', requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
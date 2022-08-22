    client = client_
    var headers = {
      Authorization: "Basic aElLdE5uRnJyWk1TTUZKRjI1TzpY",
      dataType: "application/json",
    };
    var options = { headers: headers };
    var url = 'https://specialist-cc.freshdesk.com/api/v2/search/tickets?query="status:2"';
    client.request.get(url, options).then(
      function (data) {
        console.log(data);
      },
      function (error) {
        console.log(error);
      }
    );
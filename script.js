var settings = {
    "url": "https://specialist-cc.freshdesk.com/api/v2/tickets",
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
    tickets = response

    for(var i=0; i<tickets.length; i++){
        console.log(tickets)
        $('#readyboard').append(  "<div class='task' draggable='true'><div class='task__tags'><span class='task__tag task__tag--tag1'>Tag 1</span><button class='task__options'><i class='fas fa-ellipsis-h'></i></button></div><p>" + tickets[i]["subject"] +"</p><div class='task__stats'><span><time datetime='2021-11-24T20:00:00'><i class='fas fa-flag'></i>"+tickets[i]["created_at"].slice(0, -10)+"</time></span></div>");
    }
      
  });



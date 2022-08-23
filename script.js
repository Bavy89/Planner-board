var settings = {
    "url": "https://specialist-cc.freshdesk.com/api/v2/tickets?per_page=100&page=1",
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
       var ticketPriority = tickets[i]["priority"]
       var ticketSubject = tickets[i]["subject"] 
       var ticketCreated = tickets[i]["created_at"].slice(0, -10)
       var ticketStatus = tickets[i]["status"]
       var ticketId = tickets[i]["id"]
        backlogState = '<img style="position:absolute;right:0px;bottom:0px;" src="img/new.png" alt="new">'

        if (ticketStatus == "9") {
            backlogState = '<img style="position:absolute;right:0px;bottom:0px;" src="img/backlog.png" alt="Backlog">'
        }

       if (ticketStatus == "2" || ticketStatus == "9") {
        $('#backlog').append(  "<div class='task' data-toggle='modal' data-target='#myModal' onclick='previewTicket("+ticketId+")'><div class='task__tags'><span class='task__tag task__tag--tag1' >Prioritet: "+ ticketPriority +"</span><button class='task__options'><i class='fas fa-ellipsis-h'></i></button></div><p>" + ticketSubject +"</p><div class='task__stats'><span><time datetime='2021-11-24T20:00:00'><i class='fas fa-flag'></i>Created: "+ticketCreated+" || id: "+ticketId+"</time>"+backlogState+"</span></div>");
        } else if (ticketStatus == "11" ) {
            $('#readyboard').append(  "<div class='task' data-toggle='modal' data-target='#myModal' onclick='previewTicket("+ticketId+")'><div class='task__tags'><span class='task__tag task__tag--tag1'>Prioritet: "+ ticketPriority +"</span><button class='task__options'><i class='fas fa-ellipsis-h'></i></button></div><p>" + ticketSubject +"</p><div class='task__stats'><span><time datetime='2021-11-24T20:00:00'><i class='fas fa-flag'></i>Created: "+ticketCreated+" || id: "+ticketId+"</time></span></div>");
        } else if (ticketStatus == "10") {
            $('#inprogressboard').append(  "<div class='task' data-toggle='modal' data-target='#myModal' onclick='previewTicket("+ticketId+")'><div class='task__tags'><span class='task__tag task__tag--tag3'>Prioritet: "+ ticketPriority +"</span><button class='task__options'><i class='fas fa-ellipsis-h'></i></button></div><p>" + ticketSubject +"</p><div class='task__stats'><span><time datetime='2021-11-24T20:00:00'><i class='fas fa-flag'></i>Created: "+ticketCreated+" || id: "+ticketId+"</time></span></div>");
        } else if (ticketStatus == "8" || ticketStatus == "7") {
            $('#blockedboard').append(  "<div class='task' data-toggle='modal' data-target='#myModal' onclick='previewTicket("+ticketId+")'><div class='task__tags'><span class='task__tag task__tag--tag4'>Prioritet: "+ ticketPriority +"</span><button class='task__options'><i class='fas fa-ellipsis-h'></i></button></div><p>" + ticketSubject +"</p><div class='task__stats'><span><time datetime='2021-11-24T20:00:00'><i class='fas fa-flag'></i>Created: "+ticketCreated+"|| id: "+ticketId+"</time></span></div>");
        } else if (ticketStatus == "4") {
            $('#doneboard').append(  "<div class='task' data-toggle='modal' data-target='#myModal'  onclick='previewTicket("+ticketId+")'><div class='task__tags'><span class='task__tag task__tag--tag4'>Prioritet: "+ ticketPriority +"</span><button class='task__options'><i class='fas fa-ellipsis-h'></i></button></div><p>" + ticketSubject +"</p><div class='task__stats'><span><time datetime='2021-11-24T20:00:00'><i class='fas fa-flag'></i>Created: "+ticketCreated+" || id: "+ticketId+"</time></span></div>");
        }
    }


  });



function previewTicket(ticketId) {
  
    var settings = {
        "url": "https://specialist-cc.freshdesk.com/api/v2/tickets/"+ticketId+"?include=conversations",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Basic aElLdE5uRnJyWk1TTUZKRjI1TzpY",
          "Cookie": "_x_m=x_c; _x_w=6_1"
        },
      };
      $(this).removeData('commentsdesc');
      $.ajax(settings).done(function (response) {
        console.log(response)
        document.getElementById("modaldesc").innerHTML = "<h4>"+response["subject"]+"</h4> <p>"+response["description"]+"</p>";
        document.getElementById("taskId").innerHTML = 'Ticket: <a href="https://specialist-cc.freshdesk.com/a/tickets/'+ticketId+'"target="blank">'+ticketId+'</a>';
        console.log(response["conversations"])
        response["conversations"].map(element => {
          $('#commentsdesc').replaceChildren("<div class='alert alert-warning' role='alert'"+element["body"]+"</div>");

        });
      
      });
    }


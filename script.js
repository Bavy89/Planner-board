var baseUrl = "https://specialist-cc.freshdesk.com/"

var settings = {
    "url": `${baseUrl}api/v2/tickets?per_page=100&page=1`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Basic aElLdE5uRnJyWk1TTUZKRjI1TzpY",
      "Cookie": "_x_m=x_c; _x_w=6_1"
    },
  };
  
  $.ajax(settings).done(function (response) {
    tickets = response
    for(var i=0; i<tickets.length; i++){

       var ticketPriority = tickets[i]["priority"]
       var ticketSubject = tickets[i]["subject"] 
       var ticketCreated = tickets[i]["created_at"].slice(0, -10)
       var ticketStatus = tickets[i]["status"]
       var ticketId = tickets[i]["id"]
       var backlogState = "New"

        if (ticketStatus == "9") {
            backlogState = 'Backlog'
        } else if (ticketStatus == "3") {
          backlogState = 'Pending'
        } else if (ticketStatus == "7") {
          backlogState = 'Thirdparty'
        } else if (ticketStatus == "8") {
          backlogState = 'Blocked'
        }

       if (ticketStatus == "2" || ticketStatus == "9") {
        $('#backlog').append(  "<div class='task' data-toggle='modal' data-target='#myModal' onclick='previewTicket("+ticketId+")'><div class='task__tags'><span class='task__tag task__tag--tag1' >Prioritet: "+ ticketPriority +"</span><button class='task__options'><i class='fas fa-ellipsis-h'></i></button></div><p>" + ticketSubject +"</p><div class='task__stats'><span><time datetime='2021-11-24T20:00:00'><i class='fas fa-flag'></i>Created: "+ticketCreated+" || id: "+ticketId+"</time><small style='position: absolute; bottom: 0; right: 0; width: 100px; text-align:right;''>"+backlogState+"</small></span></div>");
        } else if (ticketStatus == "11" ) {
            $('#readyboard').append(  "<div class='task' data-toggle='modal' data-target='#myModal' onclick='previewTicket("+ticketId+")'><div class='task__tags'><span class='task__tag task__tag--tag1'>Prioritet: "+ ticketPriority +"</span><button class='task__options'><i class='fas fa-ellipsis-h'></i></button></div><p>" + ticketSubject +"</p><div class='task__stats'><span><time datetime='2021-11-24T20:00:00'><i class='fas fa-flag'></i>Created: "+ticketCreated+" || id: "+ticketId+"</time></span></div>");
        } else if (ticketStatus == "10") {
            $('#inprogressboard').append(  "<div class='task' data-toggle='modal' data-target='#myModal' onclick='previewTicket("+ticketId+")'><div class='task__tags'><span class='task__tag task__tag--tag3'>Prioritet: "+ ticketPriority +"</span><button class='task__options'><i class='fas fa-ellipsis-h'></i></button></div><p>" + ticketSubject +"</p><div class='task__stats'><span><time datetime='2021-11-24T20:00:00'><i class='fas fa-flag'></i>Created: "+ticketCreated+" || id: "+ticketId+"</time></span></div>");
        } else if (ticketStatus == "8" || ticketStatus == "7" || ticketStatus == "3") {
            $('#blockedboard').append(  "<div class='task' data-toggle='modal' data-target='#myModal' onclick='previewTicket("+ticketId+")'><div class='task__tags'><span class='task__tag task__tag--tag4'>Prioritet: "+ ticketPriority +"</span><button class='task__options'><i class='fas fa-ellipsis-h'></i></button></div><p>" + ticketSubject +"</p><div class='task__stats'><span><time datetime='2021-11-24T20:00:00'><i class='fas fa-flag'></i>Created: "+ticketCreated+"|| id: "+ticketId+"</time><small style='position: absolute; bottom: 0; right: 0; width: 100px; text-align:right;''>"+backlogState+"</small></span></div>");
        } else if (ticketStatus == "4") {
            $('#doneboard').append(  "<div class='task' data-toggle='modal' data-target='#myModal'  onclick='previewTicket("+ticketId+")'><div class='task__tags'><span class='task__tag task__tag--tag4'>Prioritet: "+ ticketPriority +"</span><button class='task__options'><i class='fas fa-ellipsis-h'></i></button></div><p>" + ticketSubject +"</p><div class='task__stats'><span><time datetime='2021-11-24T20:00:00'><i class='fas fa-flag'></i>Created: "+ticketCreated+" || id: "+ticketId+"</time></span></div>");
        }
    }


  });



function previewTicket(ticketId) {
    var settings = {
        "url": `${baseUrl}api/v2/tickets/${ticketId}?include=conversations`,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Basic aElLdE5uRnJyWk1TTUZKRjI1TzpY",
          "Cookie": "_x_m=x_c; _x_w=6_1"
        },
      };
      $("#commentsdesc").empty();
      $("#notefield").empty();
      $.ajax(settings).done(function (response) {
        document.getElementById("modaldesc").innerHTML = `<div class='alert alert-info' role='alert'><h4>${response["subject"]}</h4><small>${response["created_at"]}</small><hr> <p>${response["description"]}</p></div>`;
        document.getElementById("taskId").innerHTML = `Ticket: <a href="https://specialist-cc.freshdesk.com/a/tickets/${ticketId}" target="blank">${ticketId}</a>`;
        response["conversations"].map(element => {
          $('#commentsdesc').append(`<div class='alert alert-warning' role='alert'><h4>Kommentar</h4><small>${element["created_at"]}</small> <hr>${   element["body"]}</div>`);
          
        });
        document.getElementById("footerBtns").innerHTML = `<button type="button" class="btn btn-warning" onclick="addNote(${ticketId})">Rediger</button><button type="button" class="btn btn-dark" data-dismiss="modal">Lukk</button>`
      });
    }


    function addNote(ticketId) {
      document.getElementById("notefield").innerHTML = `<div class='alert alert-warning' role='alert'><div class="form-group"> <label for="exampleFormControlTextarea1">Skriv en melding..</label> <textarea style="resize: none;" class="form-control" id="commentField" rows="6"></textarea> </div> <button type="button" class="btn btn-warning" onclick="sendNote(${ticketId})">Kommenter</button><button type="button" class="btn btn-dark" onclick="removeNote()">Avbryt</button><div class="btn-group"> <button type="button" class="btn btn-danger">Action</button> <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="sr-only">Toggle Dropdown</span> </button> <div class="dropdown-menu"> <a class="dropdown-item" href="#">Action</a> <a class="dropdown-item" href="#">Another action</a> <a class="dropdown-item" href="#">Something else here</a> <div class="dropdown-divider"></div> <a class="dropdown-item" href="#">Separated link</a> </div> </div><div>`;
    }

    function removeNote(){
      $("#notefield").empty();
    }


    function sendNote(ticketId) {
      var commentNote = document.getElementById("commentField").value;
      console.log(commentNote)
      var settings = {
        "url": `${baseUrl}api/v2/tickets/${ticketId}/notes`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Basic aElLdE5uRnJyWk1TTUZKRjI1TzpY",
          "Cookie": "_x_m=x_c; _x_w=6_1"
        },
        "data": JSON.stringify({
          "body": `${commentNote}<br><br><sub>Kommentert fra KanbanBoard</sub>`
        }),
      };
      
      $.ajax(settings).done(function (response) {
      });

      setTimeout(function () {
        previewTicket(ticketId);
    }, 1000);
      }
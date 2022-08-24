var baseUrl = "https://specialist-cc.freshdesk.com/"
var authKey = "Basic aElLdE5uRnJyWk1TTUZKRjI1TzpY"
let callCount = 1;

loadBoard();

function loadBoard(){
  var settings = {
    "url": `${baseUrl}api/v2/search/tickets?query="status:2%20OR%20status:9%20OR%20status:11%20OR%20status:10%20OR%20status:8%20OR%20status:7%20OR%20status:3%20OR%20status:4%20OR%20status:12%20AND%20created_at:%272022-01-01%27"&page=${callCount}`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": authKey,
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response)
    tickets = response["results"]
    mainResponse = response
    for (var i = 0; i < tickets.length; i++) {

      var ticketPriority = tickets[i]["priority"]
      var ticketSubject = tickets[i]["subject"]
      var ticketCreated = tickets[i]["created_at"].slice(0, -10)
      var ticketStatus = tickets[i]["status"]
      var ticketId = tickets[i]["id"]
      var backlogState = "New"

      if (ticketPriority == "1") {
        var ticketPriority = "<span class='task__tag task__tag--tag1'>Lav</span>"
      } else if (ticketPriority == "2") {
        var ticketPriority = "<span class='task__tag task__tag--tag2'>Medium</span>"
      } else if (ticketPriority == "3") {
        var ticketPriority = "<span class='task__tag task__tag--tag3'>Høy</span>"
      } else if (ticketPriority == "4") {
        var ticketPriority = "<span class='task__tag task__tag--tag4'>Haster</span>"
      } else {
        var ticketPriority = "null";
      }


      if (ticketStatus == "9") {
        backlogState = '<span class="task__tag5 task__tag5--tag5">Backlog</span>'
      } else if (ticketStatus == "3") {
        backlogState = '<span class="task__tag5 task__tag5--tag5">Pending</span>'
      } else if (ticketStatus == "7") {
        backlogState = '<span class="task__tag5 task__tag5--tag5">Thirdparty</span>'
      } else if (ticketStatus == "8") {
        backlogState = '<span class="task__tag5 task__tag5--tag5">Blocked</span>'
      } else if (ticketStatus == "2") {
        backlogState = '<span class="task__tag5 task__tag5--tag5">Ny</span>'
      } else if (ticketStatus == "12") {
        backlogState = 'Done'
      } else {
          var backlogState = "";
        }
    
      

      if (ticketStatus == "2" || ticketStatus == "9") {
        var taskType = "#backlog";
      } else if (ticketStatus == "11") {
        var taskType = "#readyboard";
      } else if (ticketStatus == "10") {
        var taskType = "#inprogressboard";
      } else if (ticketStatus == "8" || ticketStatus == "7" || ticketStatus == "3") {
        var taskType = "#blockedboard";
      } else if (ticketStatus == "12") {
        var taskType = "#doneboard";
      } else {
        var taskType = "null";
      }


      $(taskType).append(`<div class='task' data-toggle='modal' data-target='#myModal'  onclick='previewTicket("${ticketId}")'><div class='task__tags'>${ticketPriority}<button class='task__options'><i class='fas fa-ellipsis-h'></i></button></div><p>${ticketSubject}</p><div class='task__stats'><span><time datetime='2021-11-24T20:00:00'><i class='fas fa-flag'></i>Opprettet: ${ticketCreated} || id: ${ticketId}</time><small style='position: absolute; bottom: 0; right: 0; width: 100px; text-align:right;'>${backlogState}</small></div>`)
    }
  checkBoard();
  });

}


function previewTicket(ticketId) {
  var settings = {
    "url": `${baseUrl}api/v2/tickets/${ticketId}?include=conversations`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": authKey,
    },
  };
  $("#commentsdesc").empty();
  $("#notefield").empty();
  $.ajax(settings).done(function (response) {
    document.getElementById("modaldesc").innerHTML = `<div class='alert alert-info' role='alert'><h4>${response["subject"]}</h4><small>${response["created_at"]}</small><hr> <p>${response["description"]}</p></div>`;
    document.getElementById("taskId").innerHTML = `${response["subject"]} ~ <a href="https://specialist-cc.freshdesk.com/a/tickets/${ticketId}" target="blank">${ticketId}</a>`;
    response["conversations"].map(element => {
      $('#commentsdesc').append(`<div class='alert alert-warning' role='alert'><h4>Kommentar</h4><small>${element["created_at"]}</small> <hr>${element["body"]}</div>`);

    });
    document.getElementById("footerBtns").innerHTML = `<button type="button" class="btn btn-warning" onclick="addNote(${ticketId})">Rediger</button> <button type="button" class="btn btn-dark" data-dismiss="modal">Lukk</button>`
  });
}


function addNote(ticketId) {
  document.getElementById("notefield").innerHTML = `<div class='alert alert-warning' role='alert'><div class="form-group"> <label for="exampleFormControlTextarea1">Skriv en melding..</label> <textarea style="resize: none;" class="form-control" id="commentField" rows="6"></textarea> </div> <div class="btn-group"> <button type="button" class="btn btn-warning" onclick="sendNote(${ticketId})">Add note</button> <button type="button" class="btn btn-warning dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="sr-only">Toggle Dropdown</span> </button> <div class="dropdown-menu"> <a class="dropdown-item" href="#">Add note and set as Done</a> <a class="dropdown-item" href="#">Add note and set as Ready</a> <a class="dropdown-item" href="#">Add note and set as In progress</a><a class="dropdown-item" href="#">Add note and set as Blocked</a><a class="dropdown-item" href="#">Add note and set as Backlog</a></div> </div> <button type="button" class="btn btn-dark" onclick="removeNote()">Avbryt</button><div>`;
}

function removeNote() {
  $("#notefield").empty();
}


function sendNote(ticketId) {
  var commentNote = document.getElementById("commentField").value;
  if (commentNote == "") {
    alert("Feltet kan ikke være tomt!")
  } else {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authKey);

    var raw = JSON.stringify({
      "body": `${commentNote}<br><br><sub>Kommentert fra KanbanBoard</sub>`
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${baseUrl}api/v2/tickets/${ticketId}/notes`, requestOptions)
      .then(response => response.text())
      .then(result => previewTicket(ticketId))
      .catch(error => console.log('error', error) + alert("Feil med henting av kommentarer"));
  }

}


    



function checkBoard() {
  if (mainResponse["results"].length == 0) {
} else {
  callCount += 1;
  console.log(callCount)
  loadBoard();
}
}
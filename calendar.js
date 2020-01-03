function addEventModal() {
    document.getElementById('addevent').style.display = "block";
}

function closeAddEventModal() {
    document.getElementById('addevent').style.display = "none";
}

document.getElementById('canceleditevent').addEventListener('click', closeEditEventModal, false)

function editEventModal() {
    document.getElementById('editevent').style.display = "block";
}

function closeEditEventModal() {
    document.getElementById('editevent').style.display = "none";
}

document.getElementById('neweventbutton').addEventListener('click', addEventModal, false);
document.getElementById('cancelnewevent').addEventListener('click', closeAddEventModal, false);

// ADDING EVENTS
function addingEvent() {

    let title = document.querySelector("input[name='eventtitle").value;
    let date = document.querySelector("input[name='eventdate").value;
    let time = document.querySelector("input[name='eventtime").value;
    let category = document.getElementById('neweventcategory').value;
  
    monthValue = +date.split("-")[1];
    yearValue = date.split("-")[0];

    let data = {'title':title, 'date':date, 'time':time, 'category':category, 'month':monthValue, 'year':yearValue}

   
    
    fetch('addEvent.php', {
        method: 'POST',
        body: JSON.stringify(data)
        
    })
    .then(response => response.json())
    .then((resp) => {
        if (resp.success) {
            // set all the inputs back to blank
            document.querySelector("input[name='eventtitle").value = "";
            document.querySelector("input[name='eventdate").value = "";
            document.querySelector("input[name='eventtime").value = "";
           
            // close modal
            document.getElementById('addevent').style.display = "none";
            //call update to calendar page
            fillEvents();
        }

    }).catch(err => console.error(err));
}
document.getElementById('neweventsubmit').addEventListener('click', addingEvent, false);

// EDITING EVENTS
function editingEvent(eventid) {

  
    let title = document.querySelector("input[name='editeventtitle").value;
    let date = document.querySelector("input[name='editeventdate").value;
    let time = document.querySelector("input[name='editeventtime").value;
    let category = document.getElementById('editeventcategory').value;

    let data = { 'title':title, 'date':date, 'time':time, 'category':category, 'eventid':eventid};

    
    fetch('editEvent.php', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'content-type':'application/json'}
    })
    .then(response => response.json())
    .then(resp => {
        if (resp.success) {
            // set all the inputs back to blank
            document.querySelector("input[name='eventtitle").value = "";
            document.querySelector("input[name='eventdate").value = "";
            document.querySelector("input[name='eventtime").value = "";
            
            // close modal
            document.getElementById('editevent').style.display = "none";
            fillEvents();
        }

    })

}



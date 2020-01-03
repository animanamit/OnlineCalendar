
// store names of months to help change display
let months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
}

// get current date
// and set global variables
let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function editButtonTest(event) {
    
    let eventID = event.target.getAttribute('eventid');
    console.log(eventID);
    document.getElementById('editevent').style.display = "block";
    document.getElementById('editeventsubmit').addEventListener('click', () => {
        editingEvent(eventID);
    }, false);
}

function deleteEvent(event) {

    let eventID = event.target.getAttribute('eventid');

    let data = {'eventid':eventID};

    fetch('deleteEvent.php', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(response => {
        if (response.success) {
            // reprint page
            fillEvents();
        }
    })
    
}

function update(eventList) {

    document.getElementById('calendartable').innerHTML = "";
    document.getElementById('monthhere').innerHTML = "";

    let monthNow = new Month(year, month);

    let weeks = monthNow.getWeeks();

    let counter = 1;
    let table = document.createElement('table');
    table.setAttribute('id', 'caltable');
    table.setAttribute('width', 1400);
    document.getElementById('calendartable').appendChild(table);
    for (let j = 0; j < 5; j++){
        currentWeek = weeks[j].getDates();
        let dateRow = document.createElement('tr');
        document.getElementById("caltable").appendChild(dateRow);
        for (let i = 0; i < currentWeek.length; i++) {
            let dateText = document.createElement('td');
            dateText.setAttribute('id', currentWeek[i].getDate());
            let actualDate = document.createTextNode(currentWeek[i].getDate());
            dateText.appendChild(actualDate);
            dateRow.appendChild(dateText);
         
        }
        counter = counter + 7;
        
    }

    //event printing    
    for(let w in weeks){ // go through each week in month
        let days = weeks[w].getDates(); // get dates of the week
            for(let d in days){ // for each day in a week
                let today = new Date(days[d]); // create a date object

                for(let event in eventList){ // iterate through each event in the month
                    
                    
                    let eventDay = +eventList[event].date.split("-")[2];
                    let eventMonth = +eventList[event].date.split("-")[1] - 1; // create date object from event's stored date
                    let eventYear = +eventList[event].date.split("-")[0]; 

                    
                    let eventDate = new Date(eventYear, eventMonth, eventDay);

                    if(today.getDate() === eventDate.getDate() && today.getMonth() === eventDate.getMonth() && today.getFullYear() === eventDate.getFullYear()){
                        let eventMaterials = document.createElement('div');
                        
                        let eventTitle = document.createTextNode(eventList[event].title);
                        eventMaterials.appendChild(eventTitle);
                       
                        eventMaterials.innerHTML += '&nbsp';

                        let eventTime = document.createTextNode(eventList[event].time);
                        eventMaterials.appendChild(eventTime);

                        
                        
                        document.getElementById(today.getDate()).appendChild(eventMaterials);
                           
                        eventMaterials.innerHTML += '&nbsp';

                        let editButton = document.createElement('button');
                        editButton.setAttribute('id', 'editEventButton'+eventList[event].eventid);
                        editButton.innerHTML = "EDIT?";
                        editButton.setAttribute('eventid', eventList[event].eventid);
                        eventMaterials.appendChild(editButton);

                        eventMaterials.innerHTML += '&nbsp';

                        let deleteButton = document.createElement('button');
                        deleteButton.setAttribute('id', 'deleteEventButton'+eventList[event].eventid);
                        deleteButton.innerHTML = "DELETE?";
                        deleteButton.setAttribute('eventid', eventList[event].eventid);
                        eventMaterials.appendChild(deleteButton);


                        document.getElementById('editEventButton'+eventList[event].eventid).addEventListener('click', editButtonTest, false);
                        document.getElementById('deleteEventButton'+eventList[event].eventid).addEventListener('click', deleteEvent, false);

                        
                    }
                    
                   
          
                }
            }
        
    }

    let printMonth = months[monthNow.month];
    let monthHolder = document.createElement('h3');
    monthHolder.innerHTML = printMonth + ", " + year;
    document.getElementById('monthhere').appendChild(monthHolder); 

    
        
}

function prevMonthChange() {
    if (month == 0) {
        year -= 1;
        month = 11;
        fillEvents();
    }
    else {
      month -= 1;  
      fillEvents();
}
}

function nextMonthChange() {

    if (month == 11) {
        year += 1;
        month = 0;
        fillEvents();
    }

    else {
        month += 1;
        fillEvents();
    }

}

function fillEvents() { 
    let monthToFill = month + 1;
    let data = { 'month':monthToFill};
    fetch('fill.php', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    
    .then((resData) => {
        if(resData.success){
            update(resData.events);
        }
        return {};
    })
    .catch(err => console.log(err));
}

document.getElementById('leftmonth').addEventListener('click', prevMonthChange, false);
document.getElementById('rightmonth').addEventListener('click', nextMonthChange, false);
document.addEventListener('DOMContentLoaded', fillEvents, false);



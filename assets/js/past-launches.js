/* JS for historypage.html */
var launchHistoryContainer = document.querySelector('.past-launches');

function datePicker() {
    var searchYear = document.querySelector("#yearpicker").value;
    var searchMonth = document.querySelector("#monthpicker").value;

    fetch('https://api.spacexdata.com/v3/launches/past?launch_year=' + searchYear)
    .then(function(response) {
        return response.json();
    })

    .then(function(response) {
       
    //  console.log(searchYear);
    //  console.log(response);

    response = response.filter(function(launch){
        const launchDate = launch.launch_date_utc
        var d = new Date(`${launchDate}`)
        return d.getMonth() + 1 === parseInt(searchMonth);
    })
    
        for (var i=0; i < response.length; i++) {
            var launchDiv = document.createElement('div')
            
            launchDiv.classList = 'launch-div col s12 red lighten-1 white-text z-depth-3'

            
            var launchName = response[i].mission_name
            var flightNumber = response[i].flight_number
            var launchDate = response[i].launch_date_local
            var payloadType = response[i].rocket.second_stage.payloads[0].payload_type
            var launchDetails = response[i].details
            var missionPatch = response[i].links.mission_patch

            var patchImg = document.createElement('img')
            patchImg.innerHTML = '';
            patchImg.classList = 'mission-patch section'
            patchImg.setAttribute('src', missionPatch);
            launchDiv.appendChild(patchImg);

            
            var missionInfo = document.createElement('h5')
            missionInfo.innerHTML = "Mission Name : <span class='span-input'>" 
            + launchName + "</span><br /> SpaceX Flight Number: <span class='span-input'>" 
            + flightNumber + "</span><br /> Launch Date: <span class='span-input'>" 
            + launchDate + "</span> <br /> Payload Type: <span class='span-input'>" 
            + payloadType + "</span><br /> Launch Details: <span class='span-input'>"
            + launchDetails + "</span>"
             missionInfo.classList = 'mission-title'
          
            launchDiv.appendChild(missionInfo); 

            launchHistoryContainer.appendChild(launchDiv)
        }
      
    })
    
}

// function pageReset() {
//     document.getElementsByClassName("launch-div").reset();
// }

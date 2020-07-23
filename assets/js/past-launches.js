/* JS for historypage.html */
const launchHistoryContainer = document.querySelector('.past-launches');

function datePicker() {
    document.getElementById('past-launches').innerHTML='';
    const searchYear = document.querySelector("#yearpicker").value;
    const searchMonth = document.querySelector("#monthpicker").value;

    fetch('https://api.spacexdata.com/v3/launches/past?launch_year=' + searchYear)
    .then(function(response) {
        return response.json();
    })

    .then(function(response) {
       
       

    response = response.filter(function(launch){
        const launchD = launch.launch_date_utc
        const d = new Date(`${launchD}`)
        return d.getMonth() + 1 === parseInt(searchMonth);
        
    })
    if (response.length === 0) {
        document.getElementById('past-launches').innerHTML='Houston, we have a problem! There were no launches this month 😢';
      }
       
        for (let i=0; i < response.length; i++) {
            
            const launchDiv = document.createElement('div')
        
            launchDiv.classList = 'launch-div col s12 red lighten-1 white-text z-depth-3'

            
            const launchName = response[i].mission_name
            const flightNumber = response[i].flight_number
            const launchDate = response[i].launch_date_local
            const payloadType = response[i].rocket.second_stage.payloads[0].payload_type
            const launchDetails = response[i].details
            const missionPatch = response[i].links.mission_patch
            
            // mission patch image if statement
            if (missionPatch === null) {
                const patchImg = document.createElement('img')
                patchImg.innerHTML = ''
                patchImg.classList = 'mission-patch section'
                patchImg.setAttribute('src',"https://seekvectorlogo.com/wp-content/uploads/2017/12/spacex-vector-logo-small.png")
                launchDiv.appendChild(patchImg)
            }
            else {
                const patchImg = document.createElement('img')
                patchImg.innerHTML = '';
                patchImg.classList = 'mission-patch section'
                patchImg.setAttribute('src', missionPatch);
                launchDiv.appendChild(patchImg); 
            }
            

            
            const missionInfo = document.createElement('h5')
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



const futureLaunchContainer = document.querySelector(`.future-launches`);

const getLaunchInfo = function(){
    fetch(`https://api.spacexdata.com/v3/launches/upcoming`)
    .then(function(futureLaunchResponse) {
        if (futureLaunchResponse.ok) {
            return futureLaunchResponse.json();
        }
    })
    .then(function(futureLaunchResponse) {
        for (var i = 0; i < 5; i++) {

            // create a Div to Store Launch Info
            const launchDiv = document.createElement(`div`)
            // set classes
            launchDiv.classList = `launch-div col s12 red lighten-1 white-text z-depth-3`

            // set mission name and flight number values
            const missionName = futureLaunchResponse[i].mission_name
            const flightNumber = futureLaunchResponse[i].flight_number
            // create an h5 element
            const missionFlightDisplay = document.createElement(`h5`)
            // set text context
            missionFlightDisplay.innerHTML = `Mission Name : <span class='span-input'>${missionName}</span> // <br /> SpaceX Flight Number: <span class='span-input'>${flightNumber}</span>`
            // set class 
            missionFlightDisplay.classList = `mission-title`
            // append to container
            launchDiv.appendChild(missionFlightDisplay);

            // set unix launch date value
            const unixLaunchDate = futureLaunchResponse[i].launch_date_unix
            // format date
            const milliseconds = unixLaunchDate * 1000
            const dateObject = new Date(milliseconds)
            const humanDateFormat = dateObject.toLocaleString()
            // create an h6 element
            const missionDateDisplay = document.createElement(`h6`)
            // set text context
            missionDateDisplay.innerHTML = `Launch Date: <span class='span-input'>${humanDateFormat}</span>`
            // set class
            missionDateDisplay.classList = `launch-info`
            //append to container
            launchDiv.appendChild(missionDateDisplay);

            // set rocket serial number and number of flight values
            const serialNumber = futureLaunchResponse[i].rocket.first_stage.cores[0].core_serial
            const rocketFlightNumber = futureLaunchResponse[i].rocket.first_stage.cores[0].flight
            if (serialNumber != null && rocketFlightNumber != null){
                //create an h6 element
                const serialFlightDisplay = document.createElement(`h6`)
                // set text context
                serialFlightDisplay.innerHTML = `Rocket Serial Number <span class='span-input'>${serialNumber}</span> // Flight #<span class='span-input'>${rocketFlightNumber}</span>`
                //set class
                serialFlightDisplay.classList = `launch-info`
                //append to container
                launchDiv.appendChild(serialFlightDisplay);
            }
            else {
                //create a p element
                const serialFlightDisplay = document.createElement(`p`)
                // set text context
                serialFlightDisplay.innerHTML = `Rocket Serial Number and its # of Flights <span class='span-input'>will be announced soon.</span>`
                //append to container
                launchDiv.appendChild(serialFlightDisplay);
            }
            

            // set mission description value
            const missionDescription = futureLaunchResponse[i].details
            if (missionDescription != null) {
                //create an h6 element
                const missionDescriptionDisplay = document.createElement(`h6`)
                //set inner html
                missionDescriptionDisplay.innerHTML = `Mission Description : <span class='span-input'>${missionDescription}</span>`
                // set class
                missionDescriptionDisplay.classList = `launch-info`
                // append to container
                launchDiv.appendChild(missionDescriptionDisplay);
            }
            else {
                //create a p element
                const missionDescriptionDisplay = document.createElement(`p`)
                //set inner html
                missionDescriptionDisplay.innerHTML = `Mission Description <span class='span-input'>will be announced soon.</span>`
                // append to container
                launchDiv.appendChild(missionDescriptionDisplay);
            }

            // append launchDiv to container
            futureLaunchContainer.appendChild(launchDiv)
        }
    })
};
getLaunchInfo();
const futureLaunchContainer = document.querySelector(`.future-launches`);
const upcomingForecastContainer = document.querySelector(`.upcoming-forecast`)

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
            launchDiv.classList = `launch-div col s12 red lighten-1 white-text border-bottom`

            // set mission name and flight number values
            const missionName = futureLaunchResponse[i].mission_name
            const flightNumber = futureLaunchResponse[i].flight_number
            // create an h5 element
            const missionFlightDisplay = document.createElement(`h5`)
            // set text context
            missionFlightDisplay.innerHTML = `Mission Name : <span class='span-input'>${missionName}</span> // <br /> SpaceX Flight Number : <span class='span-input'>${flightNumber}</span>`
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
            missionDateDisplay.innerHTML = `Launch Date : <span class='span-input'>${humanDateFormat}</span>`
            // set class
            missionDateDisplay.classList = `launch-info`
            //append to container
            launchDiv.appendChild(missionDateDisplay);

            // set launch location value
            const launchLocation = futureLaunchResponse[i].launch_site.site_name_long
            if (launchLocation != null) {
                //create an h6 element
                const launchLocationDisplay = document.createElement(`h6`)
                //set inner HTML 
                launchLocationDisplay.innerHTML = `Launch Location : <span class='span-input'>${launchLocation}</span>`
                //set class
                launchLocationDisplay.classList = `launch-info`
                //append to container
                launchDiv.appendChild(launchLocationDisplay);
            }

            // set rocket serial number and number of flight values
            const serialNumber = futureLaunchResponse[i].rocket.first_stage.cores[0].core_serial
            const rocketFlightNumber = futureLaunchResponse[i].rocket.first_stage.cores[0].flight
            if (serialNumber != null && rocketFlightNumber != null){
                //create an h6 element
                const serialFlightDisplay = document.createElement(`h6`)
                // set text context
                serialFlightDisplay.innerHTML = `Rocket Serial Number : <span class='span-input'>${serialNumber}</span> // Rocket Flight # : <span class='span-input'>${rocketFlightNumber}</span>`
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
const getForecastInfo = function() {
    fetch(`https://api.spacexdata.com/v3/launches/next`)
    .then(function(nextLaunchResponse) {
        if (nextLaunchResponse.ok) {
            return nextLaunchResponse.json();
        }
    })
    .then(function(nextLaunchResponse) {
        
        // create forecast information for specified launch pad
        if (nextLaunchResponse.launch_site.site_id === `ccafs_slc_40`) {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=28.5621&lon=-80.5772&appid=bb7e1bece1c4e598bb1f8819dfe626cd&units=imperial`)
            .then(function(currentForecastResponse) {
                if (currentForecastResponse.ok) {
                    return currentForecastResponse.json();
                }
            })
            .then(function(currentForecastResponse) {
                // create a div to store forecast info
                const forecastDiv = document.createElement(`div`)
                // set classes 
                forecastDiv.classList = `forecast-div col s12 light-blue darken-4 white-text` 

                // define current time 
                const unixCurrentTime = currentForecastResponse.current.dt
                const milliseconds = unixCurrentTime * 1000
                const dateObject = new Date(milliseconds)
                const humanDateFormat = dateObject.toLocaleString()
                // create an h6 element for the time 
                const currentForecastTime = document.createElement(`h6`)
                //set inner HTML
                currentForecastTime.innerHTML = `Current Time : <span class='forecast-span-input'>${humanDateFormat}</span> // <br /> Time Zone : <span class='forecast-span-input'>EST</span>`
                //set class
                currentForecastTime.classList = 'launch-info'
                // append to container
                forecastDiv.appendChild(currentForecastTime)

                // define current weather
                const currentWeather = currentForecastResponse.current.weather[0].description
                // create an h6 element for the current weather 
                const currentWeatherElement = document.createElement('h6')
                //set text context
                currentWeatherElement.innerHTML = `Weather : <span class='forecast-span-input'>${currentWeather}</span>`
                // set classes
                currentWeatherElement.classList = `launch-info`
                // append to container 
                forecastDiv.appendChild(currentWeatherElement)

                // define temperature
                const currentTemp = currentForecastResponse.current.temp
                const currentFeelsLike = currentForecastResponse.current.feels_like
                // create an h6 element for the current temp
                const tempElement = document.createElement(`h6`)
                // set inner HTML
                tempElement.innerHTML = `Temperature : <span class='forecast-span-input'>${currentTemp}°F</span> // Feels Like : <span class='forecast-span-input'>${currentFeelsLike}°F</span>`
                //set class
                tempElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(tempElement)

                // define the UV index
                const uvIndex = currentForecastResponse.current.uvi
                // create an h6 element for the current UV index
                const uviElement = document.createElement(`h6`)
                // set inner HTML 
                uviElement.innerHTML = `UV Index : <span class='forecast-span-input'>${uvIndex}</span>`
                // set class 
                uviElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(uviElement)

                // define the cloud coverage
                const cloudCoverage = currentForecastResponse.current.clouds
                // create an h6 element for the current cloud coverage
                const cloudElement = document.createElement(`h6`)
                // set inner HTML
                cloudElement.innerHTML = `Cloud Coverage : <span class='forecast-span-input'>${cloudCoverage}%</span>`
                // set class
                cloudElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(cloudElement)

                // define the visibility
                const visibility = currentForecastResponse.current.visibility
                // create an h6 element for the visibility
                const visibilityElement = document.createElement(`h6`)
                // set inner HTMl
                visibilityElement.innerHTML = `Visibility : <span class='forecast-span-input'>${visibility} ft.</span>`
                // set class
                visibilityElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(visibilityElement)

                // define the wind speed
                const windSpeed = currentForecastResponse.current.wind_speed
                // create an h6 element for the wind speed
                const windSpeedElement = document.createElement(`h6`)
                // set inner HTML
                windSpeedElement.innerHTML = `Windspeed : <span class='forecast-span-input'>${windSpeed} MpH</span>`
                // set class
                windSpeedElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(windSpeedElement)

                // append launchDiv to container
                upcomingForecastContainer.appendChild(forecastDiv)
            })
        }
        else if (nextLaunchResponse.launch_site.site_id === `ksc_lc_39a`) {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=28.6050&lon=-80.6026&appid=bb7e1bece1c4e598bb1f8819dfe626cd&units=imperial`)
            .then(function(currentForecastResponse) {
                if (currentForecastResponse.ok) {
                    return currentForecastResponse.json();
                }
            })
            .then(function(currentForecastResponse) {
                // create a div to store forecast info
                const forecastDiv = document.createElement(`div`)
                // set classes 
                forecastDiv.classList = `forecast-div col s12 light-blue darken-4 white-text`

                // define current time 
                const unixCurrentTime = currentForecastResponse.current.dt
                const milliseconds = unixCurrentTime * 1000
                const dateObject = new Date(milliseconds)
                const humanDateFormat = dateObject.toLocaleString()
                // create an h6 element for the time 
                const currentForecastTime = document.createElement(`h6`)
                //set inner HTML
                currentForecastTime.innerHTML = `Current Time : <span class='forecast-span-input'>${humanDateFormat}</span> // <br /> Time Zone : <span class='span-input'>EST</span>`
                //set class
                currentForecastTime.classList = 'launch-info'
                // append to container
                forecastDiv.appendChild(currentForecastTime)

                // define current weather
                const currentWeather = currentForecastResponse.current.weather[0].description
                // create an h6 element for the current weather 
                const currentWeatherElement = document.createElement('h6')
                //set text context
                currentWeatherElement.innerHTML = `Weather : <span class='forecst-span-input'>${currentWeather}</span>`
                // set classes
                currentWeatherElement.classList = `launch-info`
                // append to container 
                forecastDiv.appendChild(currentWeatherElement)

                // define temperature
                const currentTemp = currentForecastResponse.current.temp
                const currentFeelsLike = currentForecastResponse.current.feels_like
                // create an h6 element for the current temp
                const tempElement = document.createElement(`h6`)
                // set inner HTML
                tempElement.innerHTML = `Temperature : <span class='forecast-span-input'>${currentTemp}°F</span> // Feels Like : <span class='span-input'>${currentFeelsLike}°F</span>`
                //set class
                tempElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(tempElement)

                // define the UV index
                const uvIndex = currentForecastResponse.current.uvi
                // create an h6 element for the current UV index
                const uviElement = document.createElement(`h6`)
                // set inner HTML 
                uviElement.innerHTML = `UV Index : <span class='forecast-span-input'>${uvIndex}</span>`
                // set class 
                uviElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(uviElement)

                // define the cloud coverage
                const cloudCoverage = currentForecastResponse.current.clouds
                // create an h6 element for the current cloud coverage
                const cloudElement = document.createElement(`h6`)
                // set inner HTML
                cloudElement.innerHTML = `Cloud Coverage : <span class='forecast-span-input'>${cloudCoverage}%</span>`
                // set class
                cloudElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(cloudElement)

                // define the visibility
                const visibility = currentForecastResponse.current.visibility
                // create an h6 element for the visibility
                const visibilityElement = document.createElement(`h6`)
                // set inner HTMl
                visibilityElement.innerHTML = `Visibility : <span class='forecast-span-input'>${visibility} ft.</span>`
                // set class
                visibilityElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(visibilityElement)

                // define the wind speed
                const windSpeed = currentForecastResponse.current.wind_speed
                // create an h6 element for the wind speed
                const windSpeedElement = document.createElement(`h6`)
                // set inner HTML
                windSpeedElement.innerHTML = `Windspeed : <span class='forecast-span-input'>${windSpeed} MpH</span>`
                // set class
                windSpeedElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(windSpeedElement)

                // append launchDiv to container
                upcomingForecastContainer.appendChild(forecastDiv)
            })
        }
        else if (nextLaunchResponse.launch_site.site_id === `vafb_slc_4e`) {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=34.7245&lon=-120.5728&appid=bb7e1bece1c4e598bb1f8819dfe626cd&units=imperial`)
            .then(function(currentForecastResponse) {
                if (currentForecastResponse.ok) {
                    return currentForecastResponse.json();
                }
            })
            .then(function(currentForecastResponse) {
                // create a div to store forecast info
                const forecastDiv = document.createElement(`div`)
                // set classes 
                forecastDiv.classList = `forecast-div col s12 light-blue darken-4 white-text`

                // define current time 
                const unixCurrentTime = currentForecastResponse.current.dt
                const milliseconds = unixCurrentTime * 1000
                const dateObject = new Date(milliseconds)
                const humanDateFormat = dateObject.toLocaleString()
                // create an h6 element for the time 
                const currentForecastTime = document.createElement(`h6`)
                //set inner HTML
                currentForecastTime.innerHTML = `Current Time : <span class='forecast-span-input'>${humanDateFormat}</span> // <br /> Time Zone : <span class='forecast-span-input'>PST</span>`
                //set class
                currentForecastTime.classList = 'launch-info'
                // append to container
                forecastDiv.appendChild(currentForecastTime)

                // define current weather
                const currentWeather = currentForecastResponse.current.weather[0].description
                // create an h6 element for the current weather 
                const currentWeatherElement = document.createElement('h6')
                //set text context
                currentWeatherElement.innerHTML = `Weather : <span class='forecast-span-input'>${currentWeather}</span>`
                // set classes
                currentWeatherElement.classList = `launch-info`
                // append to container 
                forecastDiv.appendChild(currentWeatherElement)

                // define temperature
                const currentTemp = currentForecastResponse.current.temp
                const currentFeelsLike = currentForecastResponse.current.feels_like
                // create an h6 element for the current temp
                const tempElement = document.createElement(`h6`)
                // set inner HTML
                tempElement.innerHTML = `Temperature : <span class='forecast-span-input'>${currentTemp}°F</span> // Feels Like : <span class='forecast-span-input'>${currentFeelsLike}°F</span>`
                //set class
                tempElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(tempElement)

                // define the UV index
                const uvIndex = currentForecastResponse.current.uvi
                // create an h6 element for the current UV index
                const uviElement = document.createElement(`h6`)
                // set inner HTML 
                uviElement.innerHTML = `UV Index : <span class='forecast-span-input'>${uvIndex}</span>`
                // set class 
                uviElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(uviElement)

                // define the cloud coverage
                const cloudCoverage = currentForecastResponse.current.clouds
                // create an h6 element for the current cloud coverage
                const cloudElement = document.createElement(`h6`)
                // set inner HTML
                cloudElement.innerHTML = `Cloud Coverage : <span class='forecast-span-input'>${cloudCoverage}%</span>`
                // set class
                cloudElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(cloudElement)

                // define the visibility
                const visibility = currentForecastResponse.current.visibility
                // create an h6 element for the visibility
                const visibilityElement = document.createElement(`h6`)
                // set inner HTMl
                visibilityElement.innerHTML = `Visibility : <span class='forecast-span-input'>${visibility} ft.</span>`
                // set class
                visibilityElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(visibilityElement)

                // define the wind speed
                const windSpeed = currentForecastResponse.current.wind_speed
                // create an h6 element for the wind speed
                const windSpeedElement = document.createElement(`h6`)
                // set inner HTML
                windSpeedElement.innerHTML = `Windspeed : <span class='forecast-span-input'>${windSpeed} MpH</span>`
                // set class
                windSpeedElement.classList = `launch-info`
                // append to container
                forecastDiv.appendChild(windSpeedElement)

                // append launchDiv to container
                upcomingForecastContainer.appendChild(forecastDiv)
            })
        }
        else {
            // create a div to store forecast info
            const forecastDiv = document.createElement(`div`)
            // set classes 
            forecastDiv.classList = `forecast-div col s12 light-blue darken-4 white-text`

            // create a p element for weather error
            const forecastErrorElement = document.createElement(`p`)
            // set inner HTML
            forecastErrorElement.innerHTML = `Current forecast information will be available <span class='forecast-span-input'>when a launch pad is designated.</span>`
            // append to container
            forecastDiv.appendChild(forecastErrorElement)

            upcomingForecastContainer.appendChild(forecastDiv)
        }

    })
};
getLaunchInfo();
getForecastInfo();
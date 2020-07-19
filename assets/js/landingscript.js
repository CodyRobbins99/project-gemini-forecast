const roadsterEl = document.querySelector("#modal-content");

document.addEventListener("DOMContentLoaded", function() {
    const starManModal = document.querySelectorAll(".modal");
    const initialization = M.Modal.init(starManModal, getStarManData());
    
});

const getStarManData = function() {
    let starManInfo = "https://api.spacexdata.com/v3/roadster";

    fetch(starManInfo).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                displayDescription(data);
                displayImage(data);
                displayLocation(data);
                console.log(data);
            })
            
        }
    })
}

const displayDescription = function(data) {
    let description = data.details;
    let descEl = document.createElement("div");
    descEl.innerHTML = "<blockquote>" + description + "</blockquote>";
    roadsterEl.appendChild(descEl);
}

const displayImage = function(data) {
    let randomImage = data.flickr_images[Math.floor(Math.random() * data.flickr_images.length)];
    console.log(randomImage);
    let starManImg = document.createElement("img");
    starManImg.className = "responsive-img";
    starManImg.setAttribute("src", randomImage);
    roadsterEl.appendChild(starManImg);
}

const displayLocation = function(data) {
    let earthDistanceMiles = Math.round(data.earth_distance_mi * 100) / 100;
    console.log(earthDistanceMiles);
    let earthDistanceKilos = Math.round(data.earth_distance_km * 100) / 100;
    let marsDistanceMiles = Math.round(data.mars_distance_mi * 100) / 100;
    let marsDistanceKilos = Math.round(data.mars_distance_km * 100) / 100;

    // Create elements to display distances
    let earthDistEl = document.createElement("div");
    let earthMeasurements = document.createElement("div")
    earthDistEl.className = "earth-distance distance";
    earthDistEl.innerHTML = "<h3>Distance From Earth:</h3>";
    roadsterEl.appendChild(earthDistEl);

    earthMeasurements.innerText = earthDistanceMiles.toLocaleString(undefined, {minimumFractionDigits: 2}) + " miles/ " + earthDistanceKilos.toLocaleString(undefined, {minimumFractionDigits: 2}) + " kilometers";
    earthDistEl.appendChild(earthMeasurements);
    
    let marsDistEl = document.createElement("div");
    let marsMeasurements = document.createElement("div")
    marsDistEl.innerHTML = "<h3>Distance From Mars:</h3>";
    marsDistEl.className = "mars-distance distance";
    marsMeasurements.innerText = marsDistanceMiles.toLocaleString(undefined, {minimumFractionDigits: 2}) + " miles/" + marsDistanceKilos.toLocaleString(undefined, {minimumFractionDigits: 2}) + "kilometers";
    marsDistEl.appendChild(marsMeasurements);
    roadsterEl.appendChild(marsDistEl);

}


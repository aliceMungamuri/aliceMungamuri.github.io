// Declare the map variable globally
let map;

// Function to initialize the map
function initMap() {
    // Set default location and zoom level
    const City = { lat: 38.960213, lng: -95.277390 }; // Lawrence Kansas
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10, // the higher the number the closer the map will be as its default
        center: City,
    });

    // Add a click event listener to the map
    map.addListener("click", (event) => {
        // Get latitude and longitude from the click event
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        // Prompt user for details to create a marker
        const name = prompt("Enter the location name:");
        const amount = prompt("Enter the amount of litter:");
        const description = prompt("Enter a description of the litter:");

        // Call function to add marker with the gathered information
        if (name && amount && description) {
            addMarkerWithDetails(lat, lng, name, amount, description);
        } else {
            alert("Please provide all details to add the marker.");
        }
    });
}

// Function to add a marker with details to the map
function addMarkerWithDetails(lat, lng, name, amount, description) {
    // Create a marker at the specified latitude and longitude
    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: name,
    });

    // Create an info window to display the litter details
    const infoWindowContent = `
        <div>
            <h3>${name}</h3>
            <p><strong>Amount of litter:</strong> ${amount}</p>
            <p><strong>Description:</strong> ${description}</p>
        </div>
    `;
    const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
    });

    // Add click event to the marker to open the info window
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });

    // Send the data to Google Sheets (add this function later)
    sendDataToGoogleSheet(name, amount, description, lat, lng);
}

// Function to send data to Google Sheets
function sendDataToGoogleSheet(name, amount, description, lat, lng) {
    // Here you would make a POST request to your Google Apps Script endpoint
    const data = {
        name: name,
        amount: amount,
        description: description,
        latitude: lat,
        longitude: lng,
    };

    fetch("https://script.google.com/macros/s/AKfycby7ZzVBoJvGnN46kdGO4qdruQXRESs-QmCvOZKP4PrF9f8uikJwRXHJjOXdAJkt3aFRng/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log("Data sent successfully:", result);
    })
    .catch(error => {
        console.error("Error sending data:", error);
    });
}
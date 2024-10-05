let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 }, // Set your initial map center
        zoom: 8,
    });

    map.addListener("click", (event) => {
        addMarker(event.latLng);
    });
}

function addMarker(location) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });

    markers.push(marker);

    // Prompt user for details and add to Google Sheets
    const name = document.getElementById("locationName").value;
    const amount = document.getElementById("litterAmount").value;
    const description = document.getElementById("litterDescription").value;

    // Send data to Google Sheets
    sendDataToGoogleSheets(name, amount, description, location.lat(), location.lng());
}

function sendDataToGoogleSheets(name, amount, description, lat, lng) {
    const url = 'https://script.google.com/macros/s/AKfycby7ZzVBoJvGnN46kdGO4qdruQXRESs-QmCvOZKP4PrF9f8uikJwRXHJjOXdAJkt3aFRng/exec';
    const data = {
        name: name,
        amount: amount,
        description: description,
        latitude: lat,
        longitude: lng
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
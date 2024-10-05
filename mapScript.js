let map;
const scriptURL = 'https://script.google.com/macros/s/AKfycby7ZzVBoJvGnN46kdGO4qdruQXRESs-QmCvOZKP4PrF9f8uikJwRXHJjOXdAJkt3aFRng/exec'; // Your Google Apps Script URL

function initMap() {
    const cityLocation = { lat: 38.9543, lng: -95.2558 }; // Coordinates for Lawrence, Kansas
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12, // Zoom level
        center: cityLocation, // Center the map
    });

    map.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        const name = prompt("Enter the location name:");
        const amount = prompt("Enter the amount of litter:");
        const description = prompt("Enter a description of the litter:");

        if (name && amount && description) {
            addMarkerWithDetails(lat, lng, name, amount, description);
            sendDataToGoogleSheets(lat, lng, name, amount, description); // Send data to Google Sheets
        } else {
            alert("Please provide all details to add the marker.");
        }
    });
}

function addMarkerWithDetails(lat, lng, name, amount, description) {
    const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: name, // Display name as the marker title
    });

    const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${name}</h3><p>Amount of litter: ${amount}</p><p>Description: ${description}</p>`,
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}

function sendDataToGoogleSheets(lat, lng, name, amount, description) {
    const formData = new FormData();
    formData.append('latitude', lat);
    formData.append('longitude', lng);
    formData.append('name', name);
    formData.append('amount', amount);
    formData.append('description', description);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => console.log('Data sent successfully!', response))
        .catch(error => console.error('Error sending data!', error));
}
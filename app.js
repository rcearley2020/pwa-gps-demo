let db;

// Initialize SQLite
initSqlJs({
  locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
}).then(SQL => {
  db = new SQL.Database();
  db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT);");

  document.getElementById("insertBtn").onclick = () => {
    const value = "Item " + Date.now();
    db.run("INSERT INTO items (name) VALUES (?)", [value]);
    document.getElementById("output").textContent = `Inserted: ${value}`;
  };

  document.getElementById("queryBtn").onclick = () => {
    const res = db.exec("SELECT * FROM items");
    document.getElementById("output").textContent =
      res.length ? JSON.stringify(res[0].values, null, 2) : "No rows yet";
  };
});

// Initialize Leaflet Map
let map;

function initMap(lat, lng) {
  if (map) {
    map.setView([lat, lng], 13);
    return;
  }

  map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([lat, lng]).addTo(map)
    .bindPopup("You are here!")
    .openPopup();
}

function getLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      initMap(lat, lng);
    },
    () => {
      alert("Unable to retrieve your location.");
    }
  );
}

// Auto-locate when page loads
window.addEventListener("load", getLocation);

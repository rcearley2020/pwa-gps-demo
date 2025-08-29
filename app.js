let db;

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

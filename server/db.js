const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./server/database.db')

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS bridge (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      type TEXT,
      length REAL
    )
  `)
})

module.exports = db
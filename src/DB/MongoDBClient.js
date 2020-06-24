const MongoClient = require('mongodb').MongoClient;

class MongoDBClient {
  constructor(host = 'tarpit_mongo_1', port = '27017') {
    this.url = `mongodb://${host}:${port}`;
  }
  connect(callback) {
    MongoClient.connect(
      this.url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: { username: 'admin', password: 'password' }
      },
      (err, db) => {
        if (!err) {
          console.log('MongoDB Connected');
          this.db = db;
        }
        callback(err, db);
      }
    );
  }
  close() {
    if (this.db) {
      this.db.close();
    }
  }
}

module.exports = MongoDBClient;

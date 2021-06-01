var MongoClient = require('mongodb').MongoClient;
module.exports = class MongoDB{

    constructor(url,database){
        this.config = {url,database}
    }

    CreateCollection(collection){
        return MongoClient.connect(this.config.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(db => {
            return db.db(this.config.database).createCollection(collection).then(() => {
                db.close();
                return "Collection created!"
            });
        });
    }

    CreateDatabase(database){
        return MongoClient.connect(this.config.url+database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(db=> {
            db.close();
            return "Database created!"
        })
    }

    Delete(collection,value){
        return MongoClient.connect(this.config.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(db=> {
            return db.db(this.config.database).collection(collection).deleteMany(value)
            .then(obj => {
                db.close();
                return obj.result.n + " document(s) deleted!";
            });
        });
    }
    
    DropCollection(collection){
        return MongoClient.connect(this.config.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(db => {
            return db.db(this.config.database).collection(collection).drop()
            .then(() => {
                db.close();
                return collection + "collection deleted!";
            });
        });
    }

    Find(collection,value){
        value = value || []
        let Check = Object.values(value);
        Check = Check.map(data => {if(data !== undefined){return 'value'}})
        return MongoClient.connect(this.config.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(db => {
            if(Check.includes('value')){
                return db.db(this.config.database).collection(collection).find(value).toArray()
                .then(res => {
                    db.close();
                    return res
                });
            } else {
                return db.db(this.config.database).collection(collection).find({}).toArray()
                .then(res => {
                    db.close();
                    return res
                })
            }
        })
    }

    Insert(collection,value){
        return MongoClient.connect(this.config.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(db => {
            return db.db(this.config.database).collection(collection).insertMany(value)
            .then(obj => {
                db.close();
                return obj.result.n + " document(s) inserted!"
            })
        });
    }

    Update(collection,find,value){
        return MongoClient.connect(this.config.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(db => {
            return db.db(this.config.database).collection(collection).updateMany(find, {$set: value })
            .then(res=> {
                db.close();
                return res.result.nModified + " document(s) updated!";
            });
        });
    }
}
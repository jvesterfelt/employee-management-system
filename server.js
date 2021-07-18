const db = require('./config/connection');
const { promptUser } = require('./util/prompt-user');


db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
})

promptUser();
const express = require('express');
const app = express();
const db = require('./models');
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ 
    extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port 3000`);
})

db.sequelize.sync()
.then((result) => {
    app.listen(3000, () => {
        console.log('Server started');
    });
})
.catch((err) => {
    console.log(err);
});
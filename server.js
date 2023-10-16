const express = require('express');
const budget = require("./data.json");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.use('/',express.static('public'));
const mongoose = require("mongoose")
const budgetModel = require("./models/budgetschema")

let url = 'mongodb://127.0.0.1:27017/personalbudget';

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("connected to database");
            budgetModel.find({})
                .then((data) => {
                    // console.log(data);
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError)
                })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
    });


    app.post("/postBudgetData", (req, res) => {

        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                // Insert
                console.log("connected to database to insert data");
                let newData = new budgetModel(req.body);
                budgetModel.insertMany(newData)
                    .then((data) => {
                        res.send("Data Inserted into database Successfully")
                        mongoose.connection.close();
                    })
                    .catch((connectionError) => {
                        console.log("1", connectionError)
                        res.send(connectionError.message)
                    })
            })
            .catch((connectionError) => {
                console.log("2", connectionError)
                res.send(connectionError);
            })
    })
    

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);

});


// "#F7DC6F",
//           "#ff6384",
//           "#2E4053",
//           "#fd6b19",
//           "#2ECC71",
//           "#F633FF",
//           "#515A5A",
//           "#a38080"
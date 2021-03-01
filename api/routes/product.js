const express = require('express');
const router = express.Router();
const fs = require("fs");
// const csv = require("fast-csv");
const csv = require('csv-parser');

var Busboy = require('busboy');

router.get('/:type', (req, res, next) => {
    const type = req.params.type
    var csvData = [];
    let monthNames = ["January", "February", "March", "April", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "November", "December"];
    let csvfilterData = [
        { name: 'May', Number: 0, type: 'A' },
        { name: 'Jun', Number: 0, type: 'A' },
        { name: 'Jul', Number: 0, type: 'A' },
        { name: 'Aug', Number: 0, type: 'A' },
        { name: 'Sept', Number: 0, type: 'A' },
        { name: 'Oct', Number: 0, type: 'A' },

    ]
    fs.createReadStream('Data.csv')
        .pipe(csv())
        .on('data', (row) => {
            csvData.push(row);
        })
        .on('end', (data) => {

            const typeData = csvData.filter(element => element.Type === type)

            typeData.forEach(element1 => {

                let monthNumber = ((element1.Date).split('/'));
                monthNumber = Number(monthNumber[1])
                let monthName = monthNames[monthNumber - 1];

                csvfilterData.forEach(element2 => {
                    if (element2.name === monthName) {
                        element2.Number = Number(element2.Number) + Number(element1.Number)
                    }
                });

            });

            res.send({
                data: csvfilterData
            })
        });

});

module.exports = router;
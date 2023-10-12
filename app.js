const express = require('express');
const ss = require('simple-statistics');
const ExpressError = require('./expressError');

const app = express();

app.get("/mean", function(req, res, next) {
    try {
        if(!req.query.length) {
           throw new ExpressError("nums are required", 400);
        }
        let rawNums = req.query['nums'].split(",");
        let nums = rawNums.map(i => parseInt(i));
        let index = nums.findIndex(Number.isNaN);
        if(index != -1) {
           throw new ExpressError(`'${rawNums[index]}' is Not a Number`, 400); 
        }
        else return res.json({"operation": "mean", "value": ss.mean(nums)});

    } catch(e) {
        next(e);
    }
});

app.get("/median", function(req, res, next) {
    try {
        if(!req.query.length) {
           throw new ExpressError("nums are required", 400);
        }
        let rawNums = req.query['nums'].split(",");
        let nums = rawNums.map(i => parseInt(i));
        let index = nums.findIndex(Number.isNaN);
        if(index != -1) {
           throw new ExpressError(`'${rawNums[index]}' is Not a Number`, 400); 
        }
        else return res.json({"operation": "median", "value": ss.median(nums)});

    } catch(e) {
        next(e);
    }
});

app.get("/mode", function(req, res, next) {
    try {
        if(!req.query.length) {
           throw new ExpressError("nums are required", 400);
        }
        let rawNums = req.query['nums'].split(",");
        let nums = rawNums.map(i => parseInt(i));
        let index = nums.findIndex(Number.isNaN);
        if(index != -1) {
           throw new ExpressError(`'${rawNums[index]}' is Not a Number`, 400); 
        }
        else return res.json({"operation": "mode", "value": ss.mode(nums)});

    } catch(e) {
        next(e);
    }
});

app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e);
});

app.use(function (err, req, res, next) {
    let status = err.statusCode || 500;
    let message = err.statusMessage;

    return res.status(status).json({
        error: {message, status}
    });
});

app.listen(3000, function() {
    console.log("App on port 3000");
})
const express = require('express');
const ss = require('simple-statistics');
const ExpressError = require('./expressError');

const app = express();

app.get("/mean", function(req, res, next) {
        console.log((req.query.length));
    if(typeof(req.query) == 'undefined') {
        console.log("NO NUMS");
        let error = new ExpressError("nums are required", 400);
        next(error);
    }
    let rawNums = req.query['nums'].split(",");
    let nums = rawNums.map(i => parseInt(i));
    let index = nums.findIndex(Number.isNaN);
    if(index != -1) {
       const e = new ExpressError(`'${rawNums[index]}' is Not a Number`, 400);
       next(e);
    }
    else return res.json({"operation": "mean", "value": ss.mean(nums)});
   // console.log(nums);
});

app.get("/median", function(req, res, next) {
    console.log(Object.keys(req.query).length);
    if(Object.keys(req.query).length == 0) {
        let error = new ExpressError("nums are required", 400);
        next(error);
    }
    let rawNums = req.query['nums'].split(",");
    let nums = rawNums.map(i => parseInt(i));
    let index = nums.findIndex(Number.isNaN);
    if(index != -1) {
       const e = new ExpressError(`'${rawNums[index]}' is Not a Number`, 400);
       next(e);
    }
    else return res.json({"operation": "median", "value": ss.median(nums)});

});

app.get("/mode", function(req, res, next) {
    if(!req.query.length) {
        let error = new ExpressError("nums are required", 400);
        next(error);
    }
    let rawNums = req.query['nums'].split(",");
    let nums = rawNums.map(i => parseInt(i));
    let index = nums.findIndex(Number.isNaN);
    if(index != -1) {
       const e = new ExpressError(`'${rawNums[index]}' is Not a Number`, 400);
       next(e);
    }
    else return res.json({"operation": "mode", "value": ss.mode(nums)});
});

app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e);
});

app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.msg;

    return res.status(status).json({
        error: {message, status}
    });
});

app.listen(3000, function() {
    console.log("App on port 3000");
})
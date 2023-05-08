#!/usr/bin/env node

import { rpsls, rps} from "./lib/rpsls.js";
import express from 'express'
import minimist from "minimist";


// use minimist to get the port number
const minimist_module = minimist(process.argv.slice(2))

// set the port to either the argument passed in or the default value (5000)
const port = minimist_module.port || 5000

// create the app constant via express
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

// create the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// generic route that just returns status code
app.get('/app', (req, res) => {
    res.status(200).send("200 OK").end();});


// play rps without an opponenet
app.get('/app/rps', (req, res) => {
    res.status(200).send(rps()).end();});

// play rpsls without an opponent
app.get('/app/rpsls', (req, res) => {
    res.status(200).send(rpsls()).end();});

// play rps with an opponent - info comes from a request body (req.query.shot)
app.get('/app/rps/play', (req, res) => {
    res.status(200).send(rps(req.query.shot)).end();});

// play rps with an opponent - info comes from a request body (req.query.shot)
app.get('/app/rpsls/play', (req, res) => {
    res.status(200).send(rpsls(req.query.shot)).end();});

// play rps with an opponent - info comes from route - restrict params to (rock|paper|scissors)
app.get('/app/rps/play/:shot(rock|paper|scissors)', (req, res) => {
    res.status(200).send(rpsls(req.params.shot)).end();});

// play rps with an opponent - info comes from route - restrict params to (rock|paper|scissors|lizard|spock)
app.get('/app/rpsls/play/:shot(rock|paper|scissors|lizard|spock)', (req, res) => {
    res.status(200).send(rpsls(req.params.shot)).end();});

// create a default route that sends a 404 status
app.get('*', (req, res) => {
    res.status(404).send("404 NOT FOUNT").end();});







#!/usr/bin/env node

import { rpsls, rps} from "./lib/rpsls.js";
import express from 'express'
import minimist from "minimist";

const minimist_module = minimist(process.argv.slice(2))

const port = minimist_module.port || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/app', (req, res) => {
    res.status(200).send("200 OK");});

app.get('app/rps/', (req, res) => {
    res.status(200).send(rps());
});

app.get('app/rpsls/', (req, res) => {
    res.status(200).send(rpsls());
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});









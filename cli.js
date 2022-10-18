#!/usr/bin/env node

// Dependencies
import minimist from 'minimist';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

// Declare latitude
let latitude = '35.90'
// Declare longitude
let longitude = '-79.05'

const timezone = moment.tz.guess()

// Core function
// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude +  '&daily=precipitation_hours&current_weather=true&timezone=America%2FNew_York&past_days=7');
// Get the data from the request
const data = await response.json();


// Structure output
// Use minimist to parse command line arguments
const args = minimist(process.argv.slice(2))
// See what is stored in `args` by minimist
console.log(args)
// Default action
// Was the command called with `-h`?
if ( args.h ) {
// If yes, then log the help message onto STDOUT
console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE

    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
`)
// And exit
process.exit(0)
}

if (args.j) {
    console.log(data);
    process.exit(0)
}


const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}


// Cleanup and exit (if necessary)



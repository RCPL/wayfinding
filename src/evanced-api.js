/*
EVANCED API
http://host6.evanced.info/richland/evanced/eventsxml.asp?

dm=
  rss2
  xml
  exml

lib=
  all
  0 Main
  1 Ballentine
  2 Blythewood
  3 Cooper
  4 Eastover",
  5 North Main",
  6 Northeast",
  7 Sandhills",
  8 Southeast",
  9 St. Andrews",
  10 Wheatley",
  11 Richland Library Operations Center",
  19 Coworking Center
  21 Coworking Center Mac Station

loc=Meeting%20Space%20211 (Meeting Space 211)

roominfo=1
alltime=1

nd=7
startdate=03-08-2018
enddate=03-24-2018
*/

import xml2js from 'xml2js'
import { DateTime } from "luxon"
import evancedRooms from '../static/data/evancedRooms.json'

const eVancedDateFormat = "cccc, LLLL d, y" //Thursday, April 26, 2018
const eVancedTimeFormat = "h:mm a" //9:00 AM

async function getList(reservations = 1) {

  // How to fetch XML
  // https://stackoverflow.com/a/41009103
  const url = `https://host6.evanced.info/richland/evanced/eventsxml.asp?lib=0&nd=1&alltime=1&roominfo=${reservations}&dm=exml`;
  let xmlString = await fetch(url).then(response => response.text());

  const options = { trim: true, explicitArray: false, emptyTag: undefined };
  let eventArray = [];
  xml2js.parseString(xmlString, options, (error, result) => {
    if (error) {
      console.error("OMG", error);
    } else {
      eventArray = result.event.item;
    }
  });

  // remove parking spaces
  eventArray = eventArray.filter(
    event => event.location !== "Reserved Parking Spot 1"
  );
  eventArray = eventArray.filter(
    event => event.location !== "Reserved Parking Spot 2"
  );

  // clean the data so that it's actually useful
  eventArray.forEach(eventItem => {
    // the end date isn't set when it's the same as the start date
    eventItem.enddate = eventItem.enddate || eventItem.date;

    // set start and end times for all day events to standard room hours 9am-8:45pm
    if (eventItem.time === "All Day") {
      eventItem.iso_start = DateTime.fromFormat(
        eventItem.date,
        eVancedDateFormat
      ).set({
        hour: 9,
        minute: 0
      }).toJSDate();
      eventItem.iso_end = DateTime.fromFormat(
        eventItem.enddate,
        eVancedDateFormat
      ).set({
        hour: 20,
        minute: 45
      }).toJSDate();
      eventItem.allDay = true;

      // convert string datetime into a real date object
    } else {
      eventItem.iso_start = DateTime.fromFormat(
        `${eventItem.date} ${eventItem.time}`,
        `${eVancedDateFormat} ${eVancedTimeFormat}`
      ).toJSDate();
      eventItem.iso_end = DateTime.fromFormat(
        `${eventItem.enddate} ${eventItem.endtime}`,
        `${eVancedDateFormat} ${eVancedTimeFormat}`
      ).toJSDate();
      eventItem.allDay = false;
    }

    // create floor number and room ID from evanced lookup object
    eventItem.floor = undefined;
    eventItem.room_id = undefined;
    if (evancedRooms[eventItem.library] !== undefined) {
      if (evancedRooms[eventItem.library][eventItem.location] !== undefined) {
        eventItem.floor =
          evancedRooms[eventItem.library][eventItem.location].floor;
        eventItem.room_id =
          evancedRooms[eventItem.library][eventItem.location].id;
      } else {
        console.error(`no room for /${eventItem.location}/`);
      }
    } else {
      console.error(`no library for /${eventItem.library}/`);
    }

    // boolean if the event is currently happening
    eventItem.now = (eventItem.iso_start < (new Date()) && eventItem.iso_end > (new Date()))

    // eventItem.eventtypes = _.without(eventItem.eventtypes.split(', '),',',' ','  ');
    // eventItem.agegroups = _.without(eventItem.agegroups.split(', '),',','',' ','  ');
    // fake number of registrations
    // if(eventItem.signup == 1) eventItem.signup_openings = Math.floor(Math.random()*30);
  });

  // just the events that are not over
  // console.group()
  // console.log('api date:', eventArray[0].date)
  // console.log('api time:', eventArray[0].time)
  // console.log('full string', `${eventArray[0].date}|${eventArray[0].time}`,)
  // console.log('iso_start:', eventArray[0].iso_start)
  // console.log('iso_end:', eventArray[0].iso_end)
  // console.log('parse iso to luxon', DateTime.fromObject(eventArray[0].iso_end))
  // console.groupEnd()
  // eventArray = eventArray.filter(event => {
    // const end
  //   const cutoff = DateTime.fromObject(event.iso_end)
  //   const now = DateTime.local()
    
  //   return now >= then
  // });

  eventArray = eventArray.filter(event => event.iso_end > (new Date()))

  // sort by start time then end time
  eventArray = eventArray.sort(function(a, b) {
    const c = a.iso_start - b.iso_start;
    if (c === 0) {
      return a.iso_end - b.iso_end;
    } else {
      return c;
    }
  });

  return eventArray;
}

export default getList;

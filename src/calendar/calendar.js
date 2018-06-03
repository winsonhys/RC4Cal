import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import "./react-big-calendar.css";
import moment from "moment";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const MyCalendar = props => (
  <div className="calendar">
    <BigCalendar events={[]} startAccessor="startDate" endAccessor="endDate" />
  </div>
);

export default MyCalendar;

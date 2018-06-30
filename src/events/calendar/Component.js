import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import { withRouter } from "react-router-dom";
import "./react-big-calendar.css";
import moment from "moment";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

// const BigCalendar = withDragAndDrop(Calendar);

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const Events = [
  {
    id: 0,
    title: "All Day Event very long title hahahaah lol",
    allDay: true,
    start: new Date(),
    end: new Date()
  }
];
const MyCalendar = props => {
  const { history } = props;
  return (
    <div className="calendar">
      <BigCalendar
        selectable={true}
        onSelectSlot={slotInfo => {
          console.log(slotInfo);
          history.push("/new", { ...slotInfo });
        }}
        events={Events}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default withRouter(MyCalendar);

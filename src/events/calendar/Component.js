import React, { Component } from "react";
import PropTypes from "prop-types";
import BigCalendar from "react-big-calendar";
import { withRouter } from "react-router-dom";
import "./react-big-calendar.css";
import moment from "moment";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

// const BigCalendar = withDragAndDrop(Calendar);

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class MyCalendar extends Component {
  componentDidMount = () => {
    if (!this.props.loadedBefore) {
      this.props.updateEvents(this.props.userId);
    }
  };
  render() {
    const { history, userId } = this.props;
    return (
      <div className="calendar">
        <BigCalendar
          selectable={true}
          onSelectSlot={slotInfo => {
            history.push("/new", { ...slotInfo, userId });
          }}
          onSelectEvent={slotInfo => {
            history.push("/edit", { ...slotInfo });
          }}
          events={this.props.events}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

MyCalendar.propTypes = {
  userId: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  updateEvents: PropTypes.func.isRequired
};

export default withRouter(MyCalendar);

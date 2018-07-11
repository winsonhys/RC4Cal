import React, { Component } from "react"
import PropTypes from "prop-types"
import BigCalendar from "react-big-calendar"
import { withRouter } from "react-router-dom"
import _ from "lodash"
import moment from "moment"
import "./react-big-calendar.css"
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

// const BigCalendar = withDragAndDrop(Calendar);

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class MyCalendar extends Component {
  componentDidMount = () => {
    this.props.updateEvents(this.props.userId)
  }
  eventsISOToDateConverter = (events) => {
    return _.map(events, (event) => {
      return {
        ...event,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate(),
      }
    })
  }
  render() {
    const { history, userId, events } = this.props
    return (
      <div className="calendar">
        <BigCalendar
          popup
          views={["month", "day"]} // agenda view not working
          selectable={true}
          onSelectSlot={(slotInfo) => {
            history.push("/new", { ...slotInfo, userId })
          }}
          onSelectEvent={(slotInfo) => {
            history.push("/edit", { ...slotInfo })
          }}
          events={this.eventsISOToDateConverter(events)}
          defaultDate={moment().toDate()}
          style={{ height: "100vh" }}
        />
      </div>
    )
  }
}

MyCalendar.propTypes = {
  userId: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  updateEvents: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(MyCalendar)

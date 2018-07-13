import React, { Component } from "react"
import PropTypes from "prop-types"
import _ from "lodash"
import { Button, message } from "antd"
import { getClashingEvents, canOverride } from "../../common/functions"
import EventForm from "../../common/components/eventForm"
class EditEvent extends Component {
  handleEdit = async (fields) => {
    const { id } = this.props.history.location.state
    const newEvent = _.pick(fields, [
      "title",
      "start",
      "end",
      "type",
      "allDay",
      "location",
    ])
    const clashingEvents = getClashingEvents(this.props.events, newEvent)
    if (clashingEvents.length === 0) {
      await this.props.editEvent(id, newEvent)
      this.props.history.goBack()
    }

    const eventsThatCannotBeOverridden = _.filter(clashingEvents, (event) => {
      return !canOverride(newEvent.type, event.type)
    })
    if (eventsThatCannotBeOverridden.length > 0) {
      message.error("Cannot override as your event does not have priority")
    }
  }
  render() {
    const { history, deleteEvent, updating } = this.props
    const { id } = history.location.state
    return (
      <div className="editEvent">
        <EventForm
          updating={updating}
          edit
          eventObject={history.location.state}
          handleSubmit={this.handleEdit}
        />
        <Button
          className="deleteEvent"
          onClick={() => {
            deleteEvent(id)
            history.goBack()
          }}
        >
          Delete Event
        </Button>
      </div>
    )
  }
}

EditEvent.propTypes = {
  deleteEvent: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  updating: PropTypes.bool.isRequired,
  editEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
}

export default EditEvent

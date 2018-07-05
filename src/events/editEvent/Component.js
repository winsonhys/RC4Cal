import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import EventForm from "../../common/components/eventForm";
//TODO: ALLOW PEOPLE TO ACTUALLY EDIT EVENTS
class EditEvent extends Component {
  render() {
    const { history, deleteEvent, updating } = this.props;
    const { id } = history.location.state;
    console.log(history.location.state);
    return (
      <div className="editEvent">
        <EventForm
          updating={updating}
          edit
          eventObject={history.location.state}
        />
        <Button
          onClick={() => {
            deleteEvent(id);
            history.goBack();
          }}
        >
          Delete Event
        </Button>
      </div>
    );
  }
}

EditEvent.propTypes = {
  deleteEvent: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  updating: PropTypes.bool.isRequired
};

export default EditEvent;

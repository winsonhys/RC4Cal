import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
//TODO: ALLOW PEOPLE TO ACTUALLY EDIT EVENTS
class EditEvent extends Component {
  render() {
    const { history, deleteEvent } = this.props;
    const { id } = history.location.state;
    return (
      <div className="editEvent">
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
  deleteEvent: PropTypes.func.isRequired
};

export default EditEvent;

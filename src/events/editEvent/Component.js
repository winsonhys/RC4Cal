import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import EventForm from "../../common/components/eventForm";
//TODO: ALLOW PEOPLE TO ACTUALLY EDIT EVENTS
class EditEvent extends Component {
  componentDidMount = () => {
    document.title = "Edit Event";
  };

  handleEdit = async fields => {
    const { id } = this.props.history.location.state;
    const { title, start, end, type, allDay } = fields;
    await this.props.editEvent(id, {
      title,
      start,
      end,
      type,
      allDay
    });
    this.props.history.goBack();
  };
  render() {
    const { history, deleteEvent, updating } = this.props;
    const { id } = history.location.state;
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
  updating: PropTypes.bool.isRequired,
  editEvent: PropTypes.func.isRequired
};

export default EditEvent;

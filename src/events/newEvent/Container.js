import { connect } from "react-redux";
import NewEventForm from "./Component";
import { createEvent, deleteEvent } from "../redux";

const mapStateToProps = state => ({
  events: state.events.events,
  updating: state.events.updating
});

const mapDispatchToProps = {
  createEvent,
  deleteEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEventForm);

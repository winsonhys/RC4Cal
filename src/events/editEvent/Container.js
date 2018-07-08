import { connect } from "react-redux";
import { deleteEvent, editEvent } from "../redux";
import { withRouter } from "react-router-dom";
import EditEvent from "./Component";

const mapStateToProps = state => ({
  events: state.events.events,
  updating: state.events.updating
});

const mapDispatchToProps = {
  deleteEvent,
  editEvent
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditEvent)
);

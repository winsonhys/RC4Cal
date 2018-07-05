import { connect } from "react-redux";
import { deleteEvent } from "../redux";
import { withRouter } from "react-router-dom";
import EditEvent from "./Component";

const mapStateToProps = state => ({
  updating: state.events.updating
});

const mapDispatchToProps = {
  deleteEvent
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditEvent)
);

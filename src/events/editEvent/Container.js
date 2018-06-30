import { connect } from "react-redux";
import { deleteEvent } from "../redux";
import { withRouter } from "react-router-dom";
import EditEvent from "./Component";

const mapDispatchToProps = {
  deleteEvent
};

export default withRouter(connect(() => ({}), mapDispatchToProps)(EditEvent));

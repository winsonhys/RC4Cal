import { connect } from "react-redux";
import NewEventForm from "./Component";
import { createEvent } from "../redux";

const mapDispatchToProps = {
  createEvent
};

export default connect(() => ({}), mapDispatchToProps)(NewEventForm);

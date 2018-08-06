import { connect } from "react-redux"
import { deleteEvent, editEvent, requestSwap } from "../redux"
import { withRouter } from "react-router-dom"
import EditEvent from "./Component"

const mapStateToProps = (state) => ({
  events: state.events.events,
  updating: state.events.updating,
  sendingEmail: state.events.sendingEmail,
})

const mapDispatchToProps = {
  deleteEvent,
  editEvent,
  requestSwap,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditEvent)
)

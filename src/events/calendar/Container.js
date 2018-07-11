import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateEvents } from "../redux"
import CalendarComponent from "./Component"

const mapStateToProps = (state) => ({
  events: state.events.events,
  userId: state.user.user.id,
})

const mapDispatchToProps = {
  updateEvents,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CalendarComponent)
)

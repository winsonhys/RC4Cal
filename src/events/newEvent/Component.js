import React, { Component } from "react"
import { Modal, message } from "antd"
import PropTypes from "prop-types"
import _ from "lodash"
import { withRouter } from "react-router-dom"
import "./date-time-picker.css"
import "./form.css"
import EventForm from "../../common/components/eventForm"
import { getClashingEvents, canOverride } from "../../common/functions"

class NewEventScreen extends Component {
  state = {
    userId: "",
    overrideModalVisibility: false,
    overridingEvent: null,
    clashingEvents: [],
  }

  componentDidMount = () => {
    const { userId } = this.props.history.location.state
    this.setState({
      userId: userId,
    })
  }

  handleCreate = async (validatedFields) => {
    const { title, start, end, allDay, type, location } = validatedFields
    const userId = this.state.userId
    const newEvent = {
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay,
      userId,
      type,
      location,
    }
    const clashingEvents = getClashingEvents(this.props.events, newEvent)
    if (clashingEvents.length === 0) {
      await this.props.createEvent(newEvent)
      this.props.history.push("/calendar")
    }
    const eventsThatCannotBeOverridden = _.filter(clashingEvents, (event) => {
      return !canOverride(newEvent.type, event.type)
    })
    if (eventsThatCannotBeOverridden.length > 0) {
      message.error("Cannot override as your event does not have priority")
    } else {
      this.setState({
        clashingEvents,
        overrideModalVisibility: true,
        overridingEvent: newEvent,
      })
    }
  }

  handleOverride = async () => {
    const deletingEvents = _.map(this.state.clashingEvents, (event) => {
      return this.props.deleteEvent(event.id)
    })
    await Promise.all(deletingEvents)
    await this.props.createEvent(this.state.overridingEvent)
    this.props.history.push("/calendar")
  }

  renderEventsText = (events) =>
    _.map(events, (event) => {
      return (
        <p>
          Event name: {event.title}, Event type: {event.type}
        </p>
      )
    })

  renderOverrideModal = () => {
    return (
      <Modal
        title={"Prioritize your event?"}
        visible={this.state.overrideModalVisibility}
        onCancel={
          this.props.updating
            ? () => {}
            : () => this.setState({ overrideModalVisibility: false })
        }
        onOk={() => this.handleOverride()}
        closable={!this.props.updating}
        maskClosable={!this.props.updating}
        confirmLoading={this.props.updating}
        okText={this.props.updating ? "Prioritizing" : "Ok"}
      >
        <p>
          The following events would be deleted in place of yours. Is that ok?
        </p>
        {this.renderEventsText(this.state.clashingEvents)}
      </Modal>
    )
  }
  render() {
    return (
      <div className="formAndModal">
        <EventForm
          updating={this.props.updating}
          handleSubmit={this.handleCreate}
          eventObject={this.props.history.location.state}
        />
        {this.renderOverrideModal()}
      </div>
    )
  }
}
NewEventScreen.propTypes = {
  createEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  updating: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        userId: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
}
export default withRouter(NewEventScreen)
// export default withRouter(Form.create()(NewEventScreen));

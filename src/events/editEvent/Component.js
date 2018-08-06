import React, { Component } from "react"
import PropTypes from "prop-types"
import _ from "lodash"
import { Button, message, Modal, Radio } from "antd"
import { getClashingEvents, canOverride } from "../../common/functions"
import EventForm from "../../common/components/eventForm"
class EditEvent extends Component {
  state = {
    swapModalVisible: false,
    eventToSwapId: null,
  }
  handleEdit = async (fields) => {
    const { id } = this.props.history.location.state
    const newEvent = _.pick(fields, [
      "title",
      "start",
      "end",
      "type",
      "allDay",
      "location",
    ])
    const clashingEvents = getClashingEvents(this.props.events, newEvent)
    if (clashingEvents.length === 0) {
      await this.props.editEvent(id, newEvent)
      this.props.history.goBack()
    }

    const eventsThatCannotBeOverridden = _.filter(clashingEvents, (event) => {
      return !canOverride(newEvent.type, event.type)
    })
    if (eventsThatCannotBeOverridden.length > 0) {
      message.error("Cannot override as your event does not have priority")
    }
  }

  handleSwap = async (eventIdFrom, eventIdTo) => {
    await this.props.requestSwap(eventIdFrom, eventIdTo)
    this.setState({ swapModalVisible: false })
    message.success("Your event has been successfully requested for a swap")
  }

  renderNotMyEvents = () => {
    const { userId } = this.props.history.location.state
    const notMyEvents = _.filter(
      this.props.events,
      (event) => event.userId !== userId
    )
    return _.map(notMyEvents, (event) => {
      return (
        <Radio.Button key={event.id} value={event.id}>
          {event.title}
        </Radio.Button>
      )
    })
  }

  renderModalFooter = () => [
    <Button
      key="back"
      onClick={() => this.setState({ swapModalVisible: false })}
    >
      Return
    </Button>,
    <Button
      key="submit"
      type="primary"
      loading={this.props.sendingEmail}
      onClick={() =>
        this.handleSwap(
          this.props.history.location.state.id,
          this.state.eventToSwapId
        )
      }
    >
      Request Swap
    </Button>,
  ]
  renderModal = () => (
    <Modal
      title="Request a swap"
      visible={this.state.swapModalVisible}
      onOk={this.handleSwap}
      onCancel={() => this.setState({ swapModalVisible: false })}
      footer={this.renderModalFooter()}
    >
      <p>Please choose one event to swap with</p>
      <Radio.Group
        onChange={(event) => {
          this.setState({ eventToSwapId: event.target.value })
        }}
      >
        {this.renderNotMyEvents()}
      </Radio.Group>
    </Modal>
  )
  render() {
    const { history, deleteEvent, updating } = this.props
    const { id } = history.location.state
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
          type="primary"
          onClick={() => {
            deleteEvent(id)
            history.goBack()
          }}
        >
          Delete Event
        </Button>
        <Button
          className="swapEvent"
          type="primary"
          onClick={() => {
            this.setState({ swapModalVisible: true })
          }}
        >
          Swap Event
        </Button>
        {this.renderModal()}
      </div>
    )
  }
}

EditEvent.propTypes = {
  deleteEvent: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  updating: PropTypes.bool.isRequired,
  editEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  requestSwap: PropTypes.func.isRequired,
  sendingEmail: PropTypes.bool.isRequired,
}

export default EditEvent

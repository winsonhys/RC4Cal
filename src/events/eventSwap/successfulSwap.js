import React from "react"
import PropTypes from "prop-types"
import URL from "url"
import { eventSwap } from "../../common/api/events"

export default class SuccessfulSwap extends React.Component {
  obtainEventIdFromAndToObject = () => {
    const eventIds = URL.parse(window.location.href).query
    const splitQueries = eventIds.split("&")
    const eventIdFromArray = splitQueries[0].split("=")
    const eventIdToArray = splitQueries[1].split("=")

    return {
      [eventIdFromArray[0]]: eventIdFromArray[1],
      [eventIdToArray[0]]: eventIdToArray[1],
    }
  }
  componentDidMount = async () => {
    const eventIds = this.obtainEventIdFromAndToObject()
    await eventSwap(eventIds.eventIdFrom, eventIds.eventIdTo)
  }
  render() {
    return (
      <div>
        <p>Event has been successfully swapped</p>
      </div>
    )
  }
}

SuccessfulSwap.propTypes = {}

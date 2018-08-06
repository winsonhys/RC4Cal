import React from "react"
import queryString from "query-string"
import { eventSwap } from "../../common/api/events"

export default class SuccessfulSwap extends React.Component {
  obtainEventIdFromAndToObject = () => {
    return queryString.parse(queryString.extract(window.location.href))
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

import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  TimePicker,
  Radio,
  Modal,
  message
} from "antd";
import DateTime from "react-datetime";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import moment from "moment";
import "./date-time-picker.css";
import "./form.css";
import { EVENT_TYPE, EVENT_TYPE_HEIRACHY } from "../../common/constants";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

// TODO: Functions written below might be moved to a common folder.
const isNotFilled = fieldsError => {
  const errors = _.compact(_.values(fieldsError));
  return !(errors.length === 0);
};

const getClashingEvents = (events, newEvent) => {
  const { start, end } = newEvent;
  const newEventStart = moment(start).valueOf();
  const newEventEnd = moment(end).valueOf();
  const clashEvents = _.filter(events, dayEvent => {
    const dayEventStart = moment(dayEvent.start).valueOf();
    const dayEventEnd = moment(dayEvent.end).valueOf();
    const newBeforeOld =
      newEventStart < dayEventStart && newEventEnd <= dayEventStart;
    const newAfterOld =
      newEventStart >= dayEventEnd && newEventEnd > dayEventEnd;
    return !(newBeforeOld || newAfterOld);
  });
  return clashEvents;
};

const canOverride = (overridingType, overriddenType) =>
  EVENT_TYPE_HEIRACHY[overridingType] > EVENT_TYPE_HEIRACHY[overriddenType];

class NewEventScreen extends Component {
  state = {
    userId: "",
    overrideModalVisibility: false,
    overridingEvent: null,
    clashingEvents: []
  };

  componentDidMount = () => {
    this.props.form.validateFields();
    const { start, userId } = this.props.history.location.state;
    this.setState({
      userId: userId
    });
  };

  handleCreate = async validatedFields => {
    const { title, start, end, allDay, type } = validatedFields;
    const userId = this.state.userId;
    const newEvent = {
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay,
      userId,
      type
    };
    const clashingEvents = getClashingEvents(this.props.events, newEvent);
    if (clashingEvents.length === 0) {
      await this.props.createEvent(newEvent);
      this.props.history.push("/calendar");
    }
    const eventsThatCannotBeOverridden = _.filter(clashingEvents, event => {
      return !canOverride(newEvent.type, event.type);
    });
    if (eventsThatCannotBeOverridden.length > 0) {
      message.error("Cannot override as your event does not have priority");
    } else {
      this.setState({
        clashingEvents,
        overrideModalVisibility: true,
        overridingEvent: newEvent
      });
    }
  };

  handleOverride = async () => {
    const deletingEvents = _.map(this.state.clashingEvents, event => {
      return this.props.deleteEvent(event.id);
    });
    await Promise.all(deletingEvents);
    await this.props.createEvent(this.state.overridingEvent);
    this.props.history.push("/calendar");
  };

  renderEventsText = events =>
    _.map(events, event => {
      return (
        <p>
          Event name: {event.title}, Event type: {event.type}
        </p>
      );
    });

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
    );
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldsValue
    } = this.props.form;
    const { start, end } = this.props.history.location.state;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    return (
      <div class="formAndModal">
        <Form layout="inline" onSubmit={() => {}}>
          <FormItem>
            {getFieldDecorator("title", {
              rules: [{ required: true, message: " " }]
            })(<Input placeholder="Event name" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("allDay", {
              valuePropName: "checked",
              initialValue: false
            })(<Checkbox>All day?</Checkbox>)}
          </FormItem>
          <FormItem>
            <h2 className="start">Start time</h2>
            {getFieldDecorator("start", {
              initialValue: moment(start)
            })(<DateTime input={false} />)}
          </FormItem>
          <FormItem>
            <h2 className="end">End Time</h2>
            {getFieldDecorator("end", {
              initialValue: moment(end).endOf("day")
            })(<DateTime input={false} />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("type", {
              rules: [{ required: true, message: " " }],
              initialValue: EVENT_TYPE.NUS
            })(
              <RadioGroup>
                <Radio.Button style={radioStyle} value={EVENT_TYPE.NUS}>
                  NUS Event
                </Radio.Button>
                <Radio.Button style={radioStyle} value={EVENT_TYPE.COLLEGE}>
                  College Event
                </Radio.Button>
                <Radio.Button style={radioStyle} value={EVENT_TYPE.HOUSE}>
                  House Event
                </Radio.Button>
                <Radio.Button style={radioStyle} value={EVENT_TYPE.IG}>
                  Interest Group Event
                </Radio.Button>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              disabled={isNotFilled(getFieldsError())}
              onClick={() => this.handleCreate(getFieldsValue())}
              loading={this.props.updating}
            >
              {this.props.updating ? "Creating" : "Create new Event"}
            </Button>
          </FormItem>
        </Form>
        {this.renderOverrideModal()}
      </div>
    );
  }
}
NewEventScreen.propTypes = {
  createEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  updating: PropTypes.bool.isRequired
};
export default withRouter(Form.create()(NewEventScreen));

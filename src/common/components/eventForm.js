import React, { Component } from "react";
import { Form, Checkbox, Radio, Button, Input } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import { EVENT_TYPE } from "../constants";
import { isNotFilled } from "../functions";
import DateTime from "react-datetime";
import "./form.css";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
let pageHeader;

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};

class EventForm extends Component {
  componentDidMount = () => {
    this.props.form.validateFields();
    document.title = "Create New Event";
  };

  renderButtonText = updating => {
    if (this.props.edit) {
      if (updating) {
        return "Editing";
      }
      pageHeader = "Edit Event";
      return "Edit event";
    }
    if (updating) {
      return "Creating";
    }
    pageHeader = "Create New Event";
    return "Create Event";
  };
  render() {
    const { form, handleSubmit, updating, edit, eventObject } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
    return (
      <Form layout="inline" onSubmit={() => {}}>
        <div className="pageTitle">
          <h1>{pageHeader}</h1>
        </div>
        <div className="chooseDateTime">
          <FormItem>
            <h2 className="start">Start time</h2>
            {getFieldDecorator("start", {
              initialValue: moment(eventObject.start)
            })(<DateTime input={false} />)}
          </FormItem>
          <FormItem>
            <h2 className="end">End Time</h2>
            {getFieldDecorator("end", {
              initialValue: moment(eventObject.end).endOf("day")
            })(<DateTime input={false} />)}
          </FormItem>
        </div>
        <div className="options">
          <FormItem className="eventTitle">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: " " }],
              initialValue: edit ? eventObject.title : null
            })(<Input placeholder="Event Title" />)}
          </FormItem>
          <FormItem className="allDay">
            {getFieldDecorator("allDay", {
              valuePropName: "checked",
              initialValue: eventObject.allDay
            })(<Checkbox>All day?</Checkbox>)}
          </FormItem>
          <FormItem className="eventType">
            {getFieldDecorator("type", {
              rules: [{ required: true, message: " " }],
              initialValue: edit ? eventObject.type : EVENT_TYPE.NUS
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
          <FormItem className="createButton">
            <Button
              type="primary"
              disabled={isNotFilled(getFieldsError())}
              onClick={() => handleSubmit(getFieldsValue())}
              loading={updating}
            >
              {this.renderButtonText(updating)}
            </Button>
          </FormItem>
        </div>
      </Form>
    );
  }
}

EventForm.propTypes = {
  form: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
  edit: PropTypes.bool,
  eventObject: PropTypes.shape({
    title: PropTypes.string.isRequired,
    start: PropTypes.object.isRequired,
    end: PropTypes.object.isRequired
  })
};

export default Form.create()(EventForm);

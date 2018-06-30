import React, { Component } from "react";
import { Form, Input, Button, Checkbox, TimePicker } from "antd";
import DateTime from "react-datetime";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import moment from "moment";
import "./date-time-picker.css";
import "./form.css";
const FormItem = Form.Item;

const isNotFilled = fieldsError => {
  const errors = _.compact(_.values(fieldsError));
  return !(errors.length === 0);
};

class NewEventScreen extends Component {
  state = {
    userId: ""
  };

  componentDidMount = () => {
    this.props.form.validateFields();
    const { start, userId } = this.props.history.location.state;
    this.setState({
      userId: userId
    });
  };

  handleCreate = async validatedFields => {
    const { title, start, end, allDay } = validatedFields;
    const userId = this.state.userId;
    const newEvent = {
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay,
      userId
    };
    await this.props.createEvent(newEvent);
    this.props.history.push("/calendar");
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldsValue
    } = this.props.form;
    const { start } = this.props.history.location.state;
    console.log("getFieldsValue", getFieldsValue());
    return (
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
            initialValue: moment(start).add(2, "hours")
          })(<DateTime input={false} />)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            disabled={isNotFilled(getFieldsError())}
            onClick={() => this.handleCreate(getFieldsValue())}
          >
            Create new Event
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default withRouter(Form.create()(NewEventScreen));

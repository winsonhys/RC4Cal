import React, { Component } from "react";
import { Form, Input, Button, Checkbox, TimePicker } from "antd";
import DateTime from "react-datetime";
import { withRouter } from "react-router-dom";
import moment from "moment";
import "./date-time-picker.css";
import "./form.css";
const FormItem = Form.Item;

class NewEventScreen extends Component {
  state = {
    title: null,
    allDay: false,
    start: null,
    end: null
  };

  componentDidMount = () => {
    const { start } = this.props.history.location.state;
    this.setState({ start: moment(start) });
    this.setState({ end: moment(start).add(2, "hours") });
  };
  render() {
    console.log(this.props.history);
    const { getFieldDecorator } = this.props.form;
    const timeNow = moment();
    return (
      <Form layout="inline" onSubmit={() => {}}>
        <FormItem>
          <Input
            onChange={change => this.setState({ title: change.target.value })}
            placeholder="Event name"
          />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Create new Event
          </Button>
        </FormItem>
        <FormItem>
          <Checkbox
            onChange={() =>
              this.setState(prevState => ({
                allDay: !prevState.allDay
              }))
            }
          >
            All day?
          </Checkbox>
        </FormItem>
        <FormItem>
          <h2 className="start">Start time</h2>
          <DateTime
            input={false}
            value={this.state.start}
            onChange={moment => this.setState({ start: moment })}
          />
        </FormItem>
        <FormItem>
          <h2 className="end">End Time</h2>
          <DateTime
            input={false}
            value={this.state.end}
            onChange={moment => this.setState({ end: moment })}
          />
        </FormItem>
      </Form>
    );
  }
}

export default withRouter(Form.create()(NewEventScreen));

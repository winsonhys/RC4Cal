import React, { Component } from "react"
import { Form, Checkbox, Radio, Button, Input, Select } from "antd"
import moment from "moment"
import PropTypes from "prop-types"
import _ from "lodash"
import { EVENT_TYPE, LOCATION } from "../constants"
import { isNotFilled } from "../functions"
import DateTime from "react-datetime"
import "./form.css"
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
}

class EventForm extends Component {
  componentDidMount = () => {
    this.props.form.validateFields()
    document.title = this.props.edit ? "Edit Event" : "Create New Event"
  }

  renderButtonText = (updating) => {
    if (this.props.edit) {
      if (updating) {
        return "Editing"
      }
      return "Edit event"
    }
    if (updating) {
      return "Creating"
    }
    return "Create Event"
  }

  pageHeader = () => {
    if (this.props.edit) {
      return "Edit Event"
    }
    return "Create New Event"
  }

  renderLocationPickerItems = () =>
    _.map(LOCATION, (location) => (
      <Option key={location} value={location}>
        {location}
      </Option>
    ))
  render() {
    const { form, handleSubmit, updating, edit, eventObject } = this.props
    const { getFieldDecorator, getFieldsError, getFieldsValue } = form
    return (
      <Form layout="inline" onSubmit={() => {}}>
        <div className="pageTitle">
          <h1>{this.pageHeader()}</h1>
        </div>
        <div className="chooseDateTime">
          <FormItem>
            <h2 className="start">Start time</h2>
            {getFieldDecorator("start", {
              initialValue: moment(eventObject.start),
            })(<DateTime input={false} />)}
          </FormItem>
          <FormItem>
            <h2 className="end">End Time</h2>
            {getFieldDecorator("end", {
              initialValue: moment(eventObject.end).endOf("day"),
            })(<DateTime input={false} />)}
          </FormItem>
        </div>
        <div className="options">
          <FormItem className="eventTitle">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: " " }],
              initialValue: edit ? eventObject.title : null,
            })(<Input placeholder="Event Title" />)}
          </FormItem>
          <FormItem className="allDay">
            {getFieldDecorator("allDay", {
              valuePropName: "checked",
              initialValue: edit ? eventObject.allDay : false,
            })(<Checkbox>All day?</Checkbox>)}
          </FormItem>
          <FormItem className="eventType">
            {getFieldDecorator("type", {
              rules: [{ required: true, message: " " }],
              initialValue: edit ? eventObject.type : EVENT_TYPE.NUS,
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
          <FormItem className="locationPicker">
            {getFieldDecorator("location", {
              initialValue: LOCATION.TR1,
            })(<Select>{this.renderLocationPickerItems()}</Select>)}
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
    )
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
    end: PropTypes.object.isRequired,
  }),
}

export default Form.create()(EventForm)

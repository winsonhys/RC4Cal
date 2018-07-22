import React, { Component } from "react"
import _ from "lodash"
import PropTypes from "prop-types"
import { Form, Button, Input, Icon } from "antd"
import { withRouter } from "react-router-dom"
import "./Login.css"

const FormItem = Form.Item

const isNotFilled = (fieldsError) => {
  const errors = _.compact(_.values(fieldsError))
  return !(errors.length === 0)
}

class Login extends Component {
  componentDidMount = () => {
    this.props.form.validateFields() //disabled button at Start
    document.title = "RC4Cal"
  }

  handleLogIn = async (username, password) => {
    await this.props.getUser(username, password)
    const previousPage = _.get(
      this.props.history.location.state,
      "from.pathname"
    )
    if (previousPage) {
      this.props.history.push(`${previousPage}`)
    }
    this.props.history.push("/calendar")
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldsValue,
      isFieldTouched,
      getFieldError,
    } = this.props.form
    const { username, password } = getFieldsValue()
    const buttonText = this.props.loggingIn ? "Logging in" : "Login"

    // Only show error after a field is touched
    const userNameError =
      isFieldTouched("username") && getFieldError("username")
    const passwordError =
      isFieldTouched("password") && getFieldError("password")

    return (
      <Form layout="inline" className="login">
        <FormItem
          validateStatus={userNameError ? "error" : ""}
          help={userNameError || ""}
        >
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username" }],
          })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
        </FormItem>

        <FormItem
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your password" }],
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isNotFilled(getFieldsError())}
            loading={this.props.loggingIn}
            onClick={() => this.handleLogIn(username, password)}
          >
            {buttonText}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedLoginForm = Form.create()(Login)
Login.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldsError: PropTypes.func.isRequired,
    getFieldsValue: PropTypes.func.isRequired,
    isFieldTouched: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}
export default withRouter(WrappedLoginForm)

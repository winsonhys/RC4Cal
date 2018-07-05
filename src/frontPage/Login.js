import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Form, Button, Input, Icon } from "antd";
import { withRouter } from "react-router-dom";
import "./Login.css";

const FormItem = Form.Item;

const isNotFilled = fieldsError => {
  const errors = _.compact(_.values(fieldsError));
  return !(errors.length === 0);
};

class Login extends Component {
  componentDidMount = () => {
    this.props.form.validateFields(); //disabled button at Start
  };

  handleLogIn = async (username, password) => {
    const user = await this.props.getUser(username, password);
    this.props.history.push("/calendar");
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldsValue
    } = this.props.form;
    const { username, password } = getFieldsValue();
    const buttonText = this.props.loggingIn ? "Logging in" : "Login"; //TODO:Does not change text when login button is pressed
    return (
      <Form layout="inline" className="login">
        <FormItem>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username" }]
          })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your password" }]
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
    );
  }
}

const WrappedLoginForm = Form.create()(Login);
Login.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired
};
export default withRouter(WrappedLoginForm);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { updateUsername } from "./redux";

const FormItem = Form.Item;

class LogIn extends Component {
  state = {
    userName: ""
  };
  render() {
    return (
      <div className="LogInPage">
        <Form>
          <FormItem>
            <Input
              placeholder="UserName"
              onChange={change => {
                this.setState({ userName: change.target.value });
              }}
            />
            <Button
              onClick={() => this.props.updateUsername(this.state.userName)}
            >
              LOL
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
} // onFieldsChange: fields => {
//   console.log(fields);
// }

const LogInForm = Form.create({})(LogIn); //this does validation. Might drop in the future.
const mapDispatchToProps = {
  updateUsername
};
export default connect(() => ({}), mapDispatchToProps)(LogInForm);

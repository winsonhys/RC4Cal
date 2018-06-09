import React, { Component } from "react";
import { Button, Form, Input } from "antd";

const FormItem = Form.Item;

class LogIn extends Component {
  render() {
    return (
      <div className="LogInPage">
        <Form>
          <FormItem>
            <Input placeholder="UserName" />
            <Button
              onClick={() => {
                console.log("haha");
              }}
            >
              LOL
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default LogIn;

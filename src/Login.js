import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Input, Icon } from 'antd';
import './Login.css';

const FormItem = Form.Item;

function isFilled(fieldsError){

    return true;
}

class Login extends Component {
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (

            <Form layout="inline" className="login">

                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user"/>} placeholder="Username" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                        <Input prefix={<Icon type="lock"/>} type="password" placeholder="Password" />
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary"
                        htmlType="submit"
                        disabled={isFilled(getFieldsError())}
                    >
                        Login </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create()(Login);

export default WrappedLoginForm;

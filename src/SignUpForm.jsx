import React from "react";
import { Button, Input, Row, Col, version } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

export default class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    passwordConf: "",
    errors: {
      username: false,
      password: false,
      passwordConf: false
    }
  };

  handleChange = ({ target }) => {
    let state = this.state;

    state[target.name] = target.value;
    state["errors"][target.name] = false;

    const validated = this.validate(target);
    if (!validated.isValid) {
      state["errors"][target.name] = validated.errorMessage;
    }

    this.setState(state);
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = {};
    for (let input of e.target.getElementsByTagName("input")) {
      const validated = this.validate(input);
      if (!validated.isValid) {
        errors[input.name] = validated.errorMessage;
      }
    }
    if (Object.keys(errors).length) {
      return this.setState({ errors });
    }

    const { password, passwordConf } = this.state;
    if (password !== passwordConf) {
      return Swal.fire({
        icon: "error",
        title: "Ooops",
        html: `
          Your passwords don't match! <br><br>
          Double check that you've entered the same: <br>
          <strong>password</strong> and <strong>password cofirmation</strong>
        `
      });
    }

    return Swal.fire({
      icon: "success",
      title: "Welcome Aboard 🚀",
      html: "Thank you for signing up 🙂!"
    });
  };

  inputPropsFor(fieldName) {
    return {
      size: "large",
      name: fieldName,
      placeholder: fieldName,
      value: this.state[fieldName],
      onChange: this.handleChange,
      onBlur: this.handleChange
    };
  }

  validate(target) {
    if (target.value.length === 0) {
      return {
        isValid: false,
        errorMessage: "This field is required"
      };
    }

    return {
      isValid: true
    };
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="App">
        <form id="signup-form" onSubmit={this.handleSubmit}>
          <Row gutter={[16, 10]}>
            <Col span={24}>
              <h1>antd version: {version}</h1>
            </Col>
            <Col span={24}>
              <Input
                {...this.inputPropsFor("username")}
                prefix={<UserOutlined />}
              />
              <ErrorSpan field={errors.username} />
            </Col>
            <Col span={24}>
              <Input.Password
                {...this.inputPropsFor("password")}
                prefix={<KeyOutlined />}
              />
              <ErrorSpan field={errors.password} />
            </Col>
            <Col span={24}>
              <Input.Password
                {...this.inputPropsFor("passwordConf")}
                placeholder="password cormfirmation"
                prefix={<KeyOutlined />}
              />
              <ErrorSpan field={errors.passwordConf} />
            </Col>
            <Col span={24}>
              <Button type="primary" htmlType="submit" block>
                Sign Up
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

const ErrorSpan = ({ field }) => (
  <span className="error-span" style={{ opacity: field ? 1 : 0 }}>
    {field}
  </span>
);

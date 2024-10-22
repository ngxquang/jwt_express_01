import React, { useContext } from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { loginApi } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";


const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext)

  const onFinish = async (values) => {
    const { email, password } = values;

    const res = await loginApi(email, password);

    if (res.data && res.data.EC === 0) {
        localStorage.setItem("access_token", res.data.accessToken)
      notification.success({
        message: "LOGIN USER",
        description: "Success",
      });
      navigate("/");
      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.data?.user?.email ?? "",
          name: res?.data?.user?.name ?? ""
        }
      })
    } else {
        console.log("res::::", res);
      notification.error({
        message: "LOGIN ERROR",
        description: res.data.EM ?? "Error",
      });
    }
    console.log("Success:", res);
  };
  return (
    <div style={{ margin: 50 }}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;

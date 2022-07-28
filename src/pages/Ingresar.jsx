import { SaveOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Typography, Divider } from 'antd';
const { Text, Title } = Typography;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userExist } from '../helper/userExist';
import { useHidenMenu } from '../hooks/useHidenMenu';

const Ingresar = () => {
  //show menu
  useHidenMenu(false);

  const navigate = useNavigate();

  //keep the page or navigate
  const [userLoged] = useState(userExist());

  useEffect(() => {
    if (userLoged) {
      navigate('/desk');
    }
  }, [userLoged]);

  const onFinish = (values) => {
    console.log('Success:', values);
    localStorage.setItem('employee', values.employee);
    localStorage.setItem('desk', values.desk);
    navigate('/desk');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Title level={1}>Ingresar</Title>
      <Title level={4}>Add your name and Desk : </Title>
      <Divider />
      <Form
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 12,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Employee Name"
          name="employee"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desk Number"
          name="desk"
          rules={[
            {
              required: true,
              message: 'Add your desk number!',
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 12,
          }}
        >
          <Divider />
          <Button type="primary" htmlType="submit" shape="round">
            Ingresar
            <SaveOutlined />
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Ingresar;

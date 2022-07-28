import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Divider } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { useHidenMenu } from '../hooks/useHidenMenu';
import { useNavigate } from 'react-router-dom';
import { userExist } from '../helper/userExist';
import { SocketContext } from '../context/SocketContext';

const { Text, Title } = Typography;
const Desk = () => {
  //show menu
  useHidenMenu(false);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [existUser] = useState(userExist());
  const [infoForCustomer, setInfoForCustomer] = useState({});

  const handleClickExit = () => {
    localStorage.removeItem('employee');
    localStorage.removeItem('desk');
    navigate('/ingresar');
  };

  const nextTicket = () => {
    socket.emit('assignTicket', existUser, (infoForCustomer) => {
      setInfoForCustomer(infoForCustomer);
    });
  };

  return (
    <>
      <Row>
        <Col span={16} style={{ marginLeft: '1rem' }}>
          <Title level={1}>{existUser.employee} </Title>
          <Title level={3}>
            Current Desk: <Text type="success"> {existUser.desk} </Text>
          </Title>
        </Col>
        <Col span={6} align="right">
          <Button
            shape="round"
            icon={<CloseCircleOutlined />}
            type="danger"
            onClick={() => {
              handleClickExit();
            }}
          >
            Exit
          </Button>
        </Col>
      </Row>
      <Divider />
      {!infoForCustomer && (
        <>
          <Row>
            <Col span={24} style={{ marginLeft: '1rem' }}>
              <Title level={4}>All customers assigned: </Title>
              <Text style={{ fontSize: 20 }} type="danger">
                no tickets to be assigned
              </Text>
            </Col>
          </Row>
          <Row>
            <Col
              span={6}
              align="left"
              style={{ marginTop: 50, marginLeft: '3rem' }}
            >
              <Button shape="round" onClick={() => nextTicket()} type="primary">
                Next
                <RightOutlined />
              </Button>
            </Col>
          </Row>
        </>
      )}
      {infoForCustomer && (
        <>
          <Row>
            <Col span={24} style={{ marginLeft: '3rem' }}>
              <Title level={4}>
                This is the current number: <span> </span>
                <Text style={{ fontSize: 30 }} type="danger">
                  {infoForCustomer.number}
                </Text>
              </Title>
            </Col>
          </Row>
          <Row>
            <Col
              span={6}
              align="left"
              style={{ marginTop: 50, marginLeft: '3rem' }}
            >
              <Button shape="round" onClick={() => nextTicket()} type="primary">
                Next
                <RightOutlined />
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Desk;

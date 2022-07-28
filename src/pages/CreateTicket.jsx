import React, { useContext, useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useHidenMenu } from '../hooks/useHidenMenu';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

const CreateTicket = () => {
  useHidenMenu(true);

  const { socket } = useContext(SocketContext);

  const [newTicket, setnewTicket] = useState({});

  const nuevoTicket = () => {
    // como esta descripto en el back este socket.emit o socket.on puede recibir thres argumentos. 1) string relacion front - back 2) payload  3) callback determinado por el back
    socket.emit('askTicket', null, (ticket) => {
      setnewTicket(ticket);
    });
  };
  return (
    <>
      <Row>
        <Col span={12} offset={6} align="center">
          <Title level={3} style={{ marginBottom: 50 }}>
            Presione el botón para un nuevo ticket
          </Title>

          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size="large"
            onClick={nuevoTicket}
          >
            Nuevo Ticket
          </Button>
        </Col>
      </Row>
      {newTicket.number && (
        <Row style={{ marginTop: 100 }}>
          <Col span={12} offset={6} align="center">
            <Text level={2} style={{ fontSize: 20 }}>
              Su número
            </Text>
            <br />
            <Text type="success" style={{ fontSize: 55 }}>
              {newTicket.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CreateTicket;

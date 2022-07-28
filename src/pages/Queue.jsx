import React, { useContext, useEffect, useState } from 'react';

import { Col, Row, Typography, List, Card, Tag, Divider } from 'antd';
import { useHidenMenu } from '../hooks/useHidenMenu';
import { SocketContext } from '../context/SocketContext';
import { getLast } from '../helper/getLast';

const { Title, Text } = Typography;

const Queue = () => {
  useHidenMenu(true);

  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenSize(window.innerWidth);
    });
  }, [screenSize]);

  useEffect(() => {
    socket.on('assignTickets', (data) => {
      setTickets(data);
    });

    return () => {
      socket.off('assignTickets');
    };
  }, [socket]);

  useEffect(() => {
    getLast('http://localhost:8080/information').then((tickets) => {
      setTickets(tickets);
    });
  }, []);

  return (
    <div className="queueDiv">
      <Title style={{ marginLeft: '4rem' }} level={2}>
        Current Customer:
      </Title>
      <Row>
        <Col span={12} style={{ marginLeft: '4rem' }}>
          <List
            dataSource={tickets.slice(0, 3)} //pongo slice por que uqiero solo los ultimos tres items
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{
                    width: 310,
                    height: 'auto',
                    borderRadius: 10,
                    paddingBottom: 5,
                    boxShadow: '0px 0px 10px #718096',
                  }}
                  actions={[
                    <Tag color="volcano"> {item.employee} </Tag>,
                    <Tag color="magenta"> Desk: {item.desk} </Tag>,
                  ]}
                >
                  <Title style={{ marginBottom: '-1px' }}>
                    {' '}
                    No. {item.number}
                  </Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>

        {screenSize > 768 && (
          <Col span={8} style={{ marginTop: '-2rem' }}>
            <Divider>
              <Title level={4}> Historial </Title>
            </Divider>
            <List
              dataSource={tickets.slice(3)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={`Ticket No. ${item.number}`}
                    description={
                      <>
                        <Text type="secondary">On Desk number: </Text>
                        <Tag color="magenta"> {item.desk} </Tag>
                        <Text type="secondary"> Agente: </Text>
                        <Tag color="volcano"> {item.employee} </Tag>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Queue;

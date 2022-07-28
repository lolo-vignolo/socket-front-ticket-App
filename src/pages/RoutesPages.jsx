import {
  RetweetOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
const { Sider, Content } = Layout;
import { Routes, Route, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Ingresar from './Ingresar';
import Queue from './Queue';
import CreateTicket from './CreateTicket';
import Desk from './Desk';
import { newContext } from '../context/CreateContex';
import { SocketContext } from '../context/SocketContext';

const RoutesPages = () => {
  const { hiden } = useContext(newContext);
  const { socket } = useContext(SocketContext);
  const [hightlight, setHightlight] = useState('1');

  useEffect(() => {
    setHightlight('1');
  }, [hiden]);

  const handleRestart = () => {
    socket.emit('restart');
  };

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Sider collapsedWidth="0" breakpoint="md" hidden={hiden}>
          <div className="logo" />

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[hightlight]}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <Link to="/ingresar">Ingresar </Link>,
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <Link to="queue">Queue</Link>,
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: <Link to="createticket">Create Ticket</Link>,
              },
            ]}
          />
          <Button className="restartBtn" onClick={handleRestart}>
            <RetweetOutlined />
            Restart Tickets
          </Button>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 50,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/ingresar" element={<Ingresar />} />
              <Route path="/queue" element={<Queue />} />
              <Route path="/desk" element={<Desk />} />
              <Route path="/createticket" element={<CreateTicket />} />
              <Route path="*" element={<Navigate to="/ingresar" />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default RoutesPages;

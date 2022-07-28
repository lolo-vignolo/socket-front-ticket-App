import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (serverPath) => {
  // el use memo es para que no se creen nuevos usuarios en el sever a cada momento
  //esta es la conexion con websocket.io , y es siemrpe igual
  const socket = useMemo(
    () =>
      io.connect(serverPath, {
        transports: ['websocket'],
      }),
    [serverPath]
  );

  // esto me permite ver si esta offline o online. En el otro proyecto lo hice ocn redux
  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => setOnline(false));
  }, [socket]);

  return {
    socket,
    online,
  };
};

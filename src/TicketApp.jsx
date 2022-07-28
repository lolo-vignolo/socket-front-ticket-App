import CreateNewContext from './context/CreateContex';
import { SocketProvider } from './context/SocketContext';
import RoutesPages from './pages/RoutesPages';

export const TicketApp = () => {
  return (
    <SocketProvider>
      <CreateNewContext>
        <RoutesPages />
      </CreateNewContext>
    </SocketProvider>
  );
};

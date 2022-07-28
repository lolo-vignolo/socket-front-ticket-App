import { useContext, useEffect } from 'react';
import { newContext } from '../context/CreateContex';

export const useHidenMenu = (ocultar) => {
  const { hidenMenu, showMenu } = useContext(newContext);

  useEffect(() => {
    if (ocultar) {
      hidenMenu();
    } else {
      showMenu();
    }
  }, [ocultar, hidenMenu, showMenu]);
};

export const userExist = () => {
  const employee = localStorage.getItem('employee');
  const desk = localStorage.getItem('desk');
  if (employee || desk) {
    return {
      employee,
      desk,
    };
  }
  return false;
};

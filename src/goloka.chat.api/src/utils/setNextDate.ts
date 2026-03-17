export const setNextDate = (countDate: number) => {
  const currentDate = new Date();
  const nextDate = new Date(currentDate);

  return nextDate.setDate(nextDate.getDate() + countDate);
};

// console.log(typeof Date.parse(new Date().toString()))
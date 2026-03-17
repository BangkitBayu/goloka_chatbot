export const setNextDate = (countDate) => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    return nextDate.setDate(nextDate.getDate() + countDate);
};
// console.log(typeof Date.parse(new Date().toString()))
//# sourceMappingURL=setNextDate.js.map
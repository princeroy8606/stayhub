export const dateCalculator = (dateSting) => {
  const inputDate = new Date(dateSting);
  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1;
  const year = inputDate.getUTCFullYear();
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  return `${formattedDay}-${formattedMonth}-${year}`;
};

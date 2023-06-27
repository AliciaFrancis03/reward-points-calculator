export const getDateBeforeNMonths = (months) => {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.toISOString().split("T")[0];
};

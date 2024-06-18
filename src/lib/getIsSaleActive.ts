export const getIsSaleActive = async (startDate: BigInt, endDate: BigInt) => {
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  if (!startDate || !endDate) {
    // if no start or end date, assume sale is active
    return true;
  }

  const now = new Date();
  const start = new Date(Number(startDate));
  const end = new Date(Number(endDate));
  console.log("now", now);
  console.log("start", start);
  console.log("end", end);
  return now >= start && now <= end;
};

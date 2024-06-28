export const getIsSaleActive = async (startDate: BigInt, endDate: BigInt) => {
  if (!startDate || !endDate) {
    // if no start or end date, assume sale is active
    return true;
  }

  const now = new Date();
  const start = new Date(Number(startDate));
  const end = new Date(Number(endDate));

  return now >= start && now <= end;
};

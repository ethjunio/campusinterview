export const ifMatchingDateMeet = (givenDate: string) => {
  const dateGiven = new Date(givenDate);
  const today = new Date();
  dateGiven.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  if (today <= dateGiven) {
    return true;
  } else {
    return false;
  }
};

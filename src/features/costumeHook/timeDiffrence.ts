const useTimeDifference = (date: string) => {
  const currentDate = new Date();
  const bookDate = new Date(date);
  const difference = Math.floor(
    (currentDate.getTime() - bookDate.getTime()) / 1000
  );
  const minutes = Math.floor(difference / 60);

  if (minutes <= 0) {
    return "Just now";
  } else if (minutes === 1) {
    return "1 minute ago";
  } else {
    return `${minutes} minutes ago`;
  }
};

export default useTimeDifference;

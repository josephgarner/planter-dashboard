export const convertToTimeInterval = (date: Date) => {
  const then = new Date(date).getTime();
  const now = new Date().getTime();
  var seconds = Math.abs((now - then) / 1000);
  var interval = Math.floor(seconds / 31536000);
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " Months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " Days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " Hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " Minutes";
  }
  return Math.floor(seconds) + " Seconds";
};

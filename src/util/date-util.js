
export function calDaysOfDate(date) {
  let time = +(new Date()) - (+(new Date(date)));
  return Math.ceil(time / (1000 * 60 * 60 * 24));
}


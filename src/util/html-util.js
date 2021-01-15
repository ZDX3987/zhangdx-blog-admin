export function getTextFromHtml(str) {
  str = str.replace(/(\n)/g, "");
  str = str.replace(/(\t)/g, "");
  str = str.replace(/(\r)/g, "");
  str = str.replace(/<\/?[^>]*>/g, "");
  str = str.replace(/\s*/g, "");
  str = str.replace(/<[^>]*>/g, "");
  return str;
}

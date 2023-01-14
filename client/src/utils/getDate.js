export default function getDate(jsDate) {
  return new Date(jsDate).toLocaleDateString("en-GB");
}

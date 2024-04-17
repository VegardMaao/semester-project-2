export function setFormMinDate(inp) {
  const today = new Date().toJSON().slice(0, -5);
  console.log(today);
  inp.min = today;
  inp.value = today;
}

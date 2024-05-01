export function setFormMinDate(inp) {
  let tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const tomorrowSliced = tomorrow.toJSON().slice(0, -5);
  let nextYear = new Date();
  nextYear.setUTCDate(nextYear.getUTCDate() + 365);
  let nextYearSliced = nextYear.toJSON().slice(0, -5);
  inp.min = tomorrowSliced;
  inp.value = tomorrowSliced;
  inp.max = nextYearSliced;
}

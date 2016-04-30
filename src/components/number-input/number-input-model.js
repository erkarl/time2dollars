function model(initialValue$, newValue$) {
  return initialValue$.concat(newValue$)
    .map(rawInput => {
      let value = parseFloat(rawInput);
      if(isNaN(value)){
        return "";
      } else {
        return value;
      }
    });
}

export default model;

function model(props$, actions) {
  const initialValue$ = props$.map(props => props.initial).first();

  return initialValue$
    .concat(actions.newValue$)
    .map(rawInput => {
      const value = parseFloat(rawInput);
      if(isNaN(value)){
        return "";
      } else {
        return value;
      }
    });
}

export default model;

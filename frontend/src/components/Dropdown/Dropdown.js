function Dropdown(props) {
  return (
    <>
      <label for="dropdown">Choose a criteria:</label>
      <select name="criteria" id="dropdown">
        <option value={props.criteria.value1} selected>{props.criteria.option1}</option>
        <option value={props.criteria.value2}>{props.criteria.option2}</option>
      </select>
    </>
  );
}

export default Dropdown;
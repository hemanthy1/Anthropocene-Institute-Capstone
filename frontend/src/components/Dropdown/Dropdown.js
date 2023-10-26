import "./Dropdown.css"

function Dropdown(props) {
  return (
    <div id="dropdown-wrap">
      <label htmlFor="dropdown" id="dropdown-label">Choose a criteria:</label>
      <select name="criteria" id="dropdown" defaultValue={props.criteria.value1}>
        <option value={props.criteria.value1}>{props.criteria.option1}</option>
        <option value={props.criteria.value2}>{props.criteria.option2}</option>
        <option value={props.criteria.value3}>{props.criteria.option3}</option>
        <option value={props.criteria.value4}>{props.criteria.option4}</option>
        <option value={props.criteria.value5}>{props.criteria.option5}</option>
      </select>
    </div>
  );
}

export default Dropdown;
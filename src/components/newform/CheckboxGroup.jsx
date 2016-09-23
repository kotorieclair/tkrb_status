function CheckboxGroup(props) {
  const { fieldName, items, checkedItems, handleChange } = props;
  return (
    <fieldset>
      {fieldName && <legend>{fieldName}</legend>}
      {items.map((item) => {
        return (
          <label className="CheckboxGroup_item" key={item}>
            <input className="CheckboxGroup_input" type="checkbox" value={item} onChange={handleChange} checked={false} />
            <span className="CheckboxGroup_label">
              <i className="fa fa-check"></i>
              {item}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

export default CheckboxGroup;

import React from 'react';
import style from './Checkbox.module.less';
/**
 * Checkbox component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {string} props.id Checkbox input id
 * @param {boolean} props.checked Checkbox checked state
 * @param {function(React.ChangeEvent): void} props.onChange Checkbox onChange event handler
 * @returns {JSX.Element} Checkbox component
 * @example
 * const [checked, setChecked] = useState(false);
 * return (
 *   <Checkbox
 *     className='ToDoItem__checkbox'
 *     id={'checkbox'}
 *     checked={checked}
 *     onChange={(e) => setChecked()}
 *   />
 * )
 */
function Checkbox({ className, id, checked, onChange }) {
  return (
    <div className={style.Checkbox}>
      <input
        className={style.Checkbox__input}
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label
        className={
          className
            ? `${style.Checkbox__label} ${className}`
            : style.Checkbox__label
        }
        htmlFor={id}
      ></label>
    </div>
  );
}

export default Checkbox;

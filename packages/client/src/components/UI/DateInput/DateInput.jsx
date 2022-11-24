import React from 'react';
import style from './DateInput.module.less';

/**
 * Datetime input component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {string} props.value Input value in 'YYYY-MM-DDTHH:mm' format
 * @param {boolean} props.valid Input validity
 * @param {function(React.ChangeEvent): void} props.onChange Input onChange event handler
 * @returns {JSX.Element} Datetime input component
 * @example
 * const [dateTime, setDateTime] = useState('2022-10-13T18:57')
 * return (
 *   <DateInput
 *     className='Form__datetime'
 *     value={dateTime}
 *     onChange={(e) => setDateTime(e.target.value)}
 *   />
 * )
 */
function DateInput({ className, valid, value, onChange }) {
  return (
    <div
      className={`${style.DateInput} ${!valid && style['DateInput--error']}`}
    >
      <input
        className={
          className
            ? `${style.DateInput__input} ${className}`
            : style.DateInput__input
        }
        type='datetime-local'
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default DateInput;

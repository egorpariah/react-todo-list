import React from 'react';
import style from './Input.module.less';

/**
 * Input component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {string} props.type Input type
 * @param {string} props.placeholder Input placeholder
 * @param {boolean} props.valid Input validity
 * @param {string} props.value Input value
 * @param {function(React.ChangeEvent): void} props.onChange Input onChange event handler
 * @returns {JSX.Element} Input component
 * @example
 * const [name, setName] = useState('')
 * return (
 *   <Input
 *     className='Form__datetime'
 *     type='text'
 *     placeholder='Name'
 *     value={dateTime}
 *     onChange={(e) => setName(e.target.value)}
 *   />
 * )
 */
function Input({ className, type, placeholder, value, valid, onChange }) {
  return (
    <input
      className={[
        className ? `${style.Input} ${className}` : style.Input,
        valid ? '' : ` ${style['Input--error']}`,
      ].join('')}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;

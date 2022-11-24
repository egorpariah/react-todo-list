import React from 'react';
import style from './TextArea.module.less';

/**
 * Datetime input component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {string} props.value Text area value
 * @param {string} props.placeholder Text area placeholder
 * @param {function(React.ChangeEvent): void} props.onChange Input onChange event handler
 * @returns {JSX.Element} Text area element
 * @example
 * const [description, setDescription] = useState('')
 * return (
 *   <TextArea
 *     className='Form__textarea'
 *     value={description}
 *     onChange={(e) => setDescription(e.target.value)}
 *   />
 * )
 */
function TextArea({ className, placeholder, value, onChange }) {
  return (
    <textarea
      className={className ? `${style.Input} ${className}` : style.Input}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default TextArea;

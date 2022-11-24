import React from 'react';
import style from './Button.module.less';

/**
 * Button component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {string} props.children Inner text
 * @returns {JSX.Element} Button element
 * @example
 * const text = 'Add';
 * return (
 *   <Button className='Form__button'>{text}</Button>
 * )
 */
function Button({ className, children }) {
  return (
    <button
      className={className ? `${style.Button} ${className}` : style.Button}
    >
      {children}
    </button>
  );
}

export default Button;

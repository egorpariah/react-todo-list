import React from 'react';
import style from './RoundButton.module.less';

/**
 * Round button component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {ReactComponent} props.children Inner icon
 * @param {function(): void} props.onClick Round button onClick event handler
 * @returns {JSX.Element} Round button element
 * @example
 * import { ReactComponent as Icon } from './assets/svg/icon.svg';
 * return (
 *   <RoundButton
 *     className='Page__roundbutton'
 *     onClick={handleClick}
 *   >
 *     <Icon />
 *   </RoundButton>
 * )
 */
function RoundButton({ children, className, onClick }) {
  return (
    <button
      className={
        className ? `${style.RoundButton} ${className}` : style.RoundButton
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default RoundButton;

import React from 'react';
import style from './Modal.module.less';
import { ReactComponent as Cross } from '../../../assets/svg/cross.svg';

/**
 * Modal component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {*} props.children Inner text
 * @param {function(boolean): void} props.setVisible Sets modal visibility
 * @returns {JSX.Element} Modal element
 * @example
 * const [modal, setModal] = useState(false);
 * return (
 *   <Modal
 *     className='Page__modal'
 *     setVisible={setModal}
 *   />
 * )
 */
function Modal({ className, children, setVisible }) {
  return (
    <div
      className={className ? `${style.Modal} ${className}` : style.Modal}
      onClick={() => setVisible(false)}
    >
      <div
        className={style.Modal__content}
        onClick={e => e.stopPropagation()}
      >
        <Cross
          className={style.Modal__cross}
          onClick={() => setVisible(false)}
        />
        {children}
      </div>
    </div>
  );
}

export default Modal;

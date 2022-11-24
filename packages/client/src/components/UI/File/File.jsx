import React from 'react';
import { ReactComponent as Attachment } from '../../../assets/svg/attachment.svg';
import { ReactComponent as SmallCross } from '../../../assets/svg/small-cross.svg';
import style from './File.module.less';

/**
 * File component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {boolean} props.isCanBeDeleted Sets cross icon depending on whether file сan be deleted
 * @param {string} props.children File name
 * @param {boolean} [props.completed] Sets component style on the state of the ToDo Item
 * @param {boolean} [props.expired] Sets component style on the state of the ToDo Item
 * @param {function(string): void} props.deleteFile Checkbox onChange event handler
 * @param {number} props.taskId Component props
 * @returns {JSX.Element} Uploaded file component
 * const text = 'Add';
 * return (
 *   <File className='Form__button'>{text}</File>
 * )
 */
function File({
  className,
  isCanBeDeleted,
  children,
  completed,
  expired,
  deleteFile,
  taskId,
}) {
  return (
    <li className={className ? `${style.File} ${className}` : style.File}>
      {(!isCanBeDeleted && (
        <Attachment
          className={
            completed || expired
              ? `${style.File__icon} ${style['File__icon--completed']}`
              : style.File__icon
          }
        />
      )) || <div className={style.File__circle}></div>}
      {isCanBeDeleted ? (
        <span className={style.File__name}>{children}</span>
      ) : (
        <a
          href={`/uploads/${taskId}/${children}`}
          className={`${style.File__name} ${style['File__name--link']}`}
        >
          {children}
        </a>
      )}
      {isCanBeDeleted && (
        <SmallCross
          onClick={() => deleteFile(children)}
          className={style.File__cross}
        />
      )}
    </li>
  );
}

export default File;

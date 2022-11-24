import React from 'react';
import style from './FilesList.module.less';

/**
 * List of uploaded/added files
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {string} props.children Inner text
 * @returns {JSX.Element} Files list element
 * @example
 * return (
 *   <FilesList className='Form__files'>
 *     {files.map(file => (
 *       <File
 *         className={style.Form__file}
 *         key={file.id}
 *       >
 *         {file}
 *       </File>
 *     ))}
 *   </FilesList>
 * )
 */
function FilesList({ className, children }) {
  return (
    <ul
      className={
        className ? `${style.FilesList} ${className}` : style.FilesList
      }
    >
      {children}
    </ul>
  );
}

export default FilesList;

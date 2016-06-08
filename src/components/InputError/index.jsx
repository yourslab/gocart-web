import React, {createElement, PropTypes} from 'react';
import cn from 'classnames';

/**
 * Usage:
 <Input
   element="select"
   error={error}
   name="yolo" />
 */
const InputError = ({className, errors, element, ...props}) => {
  const error = errors == null
    ? undefined
    : errors[0];

  return (
    <div>
      {element == null
        ? createElement('input', {
          ...other,
          className: cn(className, { 'FormInput--danger': error != null })
        })
        : element
      }
      {error != null && <div className="FormGroup-message">{error}</div>}
    </div>
  );
}

InputError.propTypes = {
  element: PropTypes.element
};

export default InputError;

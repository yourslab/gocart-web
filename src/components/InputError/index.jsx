import React, {createElement, cloneElement, PropTypes} from 'react';
import cn from 'classnames';

/**
 * Usage:
 <Input
   element="select"
   error={error}
   name="yolo" />
 */
const InputError = ({className, error, element, ...props}) => {
  return (
    <div>
      {element == null
        ? createElement('input', {
          ...props,
          className: cn(className, { 'FormInput--danger': error != null })
        })
        : (error == null
          ? element
          : cloneElement(element, { className: `${element.props.className} FormInput--danger` }))
      }
      {error != null && <div className="FormGroup-message">{error}</div>}
    </div>
  );
}

InputError.propTypes = {
  element: PropTypes.element,
  error: PropTypes.string
};

export default InputError;

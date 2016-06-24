import React, {createElement, cloneElement, PropTypes} from 'react';
import cn from 'classnames';

/**
 * Usage:
 <Input
   element="select"
   error={error}
   name="yolo" />
 */
const InputError = ({className, classNameModifier, error, element, ...props}) => {
  return (
    <div>
      {element == null
        ? createElement('input', {
          ...props,
          className: cn(className, { [classNameModifier]: error != null })
        })
        : (error == null
          ? element
          : cloneElement(element, { className: `${element.props.className} ${classNameModifier}` }))
      }
      {error != null && <div className="FormGroup-info"><div className="InfoDetails InfoDetails--danger">{error}</div></div>}
    </div>
  );
}

InputError.propTypes = {
  element: PropTypes.element,
  error: PropTypes.string,
  // The error class modifier
  classNameModifier: PropTypes.string
};

InputError.defaultProps = {
  classNameModifier: 'FormInput--danger'
};

export default InputError;

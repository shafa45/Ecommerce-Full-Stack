import { useState } from 'react';
import './formInput.css';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className='formInput'>
      <label id='label'>{label}</label>
      <input
        className='input'
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span id='span'>{errorMessage}</span>
    </div>
  );
};

export default FormInput;

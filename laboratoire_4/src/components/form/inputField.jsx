import React, { forwardRef } from 'react';

const InputField = forwardRef(({ label, error, ...props }, ref) => {
    return (
        <div>
            {label && <label htmlFor={props.name}>{label}</label>}
            <input ref={ref} {...props} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
});

export default InputField;

import React, { useState } from "react";

function TimePicker({ name, value, onChange, className, timeFormat, ...rest }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        {...rest}
        name={name}
        value={value || input}
        onChange={handleChange}
        className={className}
        autoComplete="off"
      />
    </div>
  );
}

export default TimePicker;

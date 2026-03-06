const InputHiddenRemember = ({ name, type = "text" }) => {
  return (
    <input
      type={type}
      autoComplete={name}
      aria-hidden="true"
      tabIndex={-1}
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        opacity: 0,
      }}
    />
  );
};

export default InputHiddenRemember;

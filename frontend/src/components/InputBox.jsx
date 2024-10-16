import { PropTypes } from "prop-types";

const InputBox = ({ label, placeholder }) => {
  return (
    <>
      <div className="text-sm font-medium text-left-py-2">{label}</div>
      <input
        placeholder={placeholder}
        className="w-full px-2 border rounded border-slate-200"
      />
    </>
  );
};

InputBox.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputBox;

import css from './customButton.module.css';

const CustomButton = ({ onClick, type = 'submit', children }) => {
  return (
    <button jnClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default CustomButton;

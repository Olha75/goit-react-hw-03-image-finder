import css from './customButton.module.css';

const CustomButton = ({ onClick, type = 'submit', children }) => {
  return (
    <button onClick={onClick} type={type} className={css.button}>
      {children}
    </button>
  );
};

export default CustomButton;

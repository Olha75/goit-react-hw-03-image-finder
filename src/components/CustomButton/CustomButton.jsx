// import css from './customButton.module.css';

const CustomButton = ({ onClick, type = 'submit' }) => {
  return (
    <button onClick={onClick} type={type}>
      load more
    </button>
  );
};

export default CustomButton;

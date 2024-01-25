import css from './customButton.module.css';

const CustomButton = ({ type = 'submit', children }) => {
  return <button type={type}>{children}</button>;
};

export default CustomButton;

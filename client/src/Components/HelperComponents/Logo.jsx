import PropTypes from "prop-types";
import LogoImage from '../../assets/Logo.png'
const Logo = ({ className, onClick }) => {
  return (
    <div className={`w-44  ${className}`} onClick={onClick}>
      <img src={LogoImage} alt="logo" className="h-16 w-28"/>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Logo;

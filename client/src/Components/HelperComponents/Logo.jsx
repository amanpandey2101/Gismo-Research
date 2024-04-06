import PropTypes from "prop-types";
import LogoImage from '../../assets/Logo.png'
const Logo = ({ className, onClick }) => {
  return (
    <div className={`w-36  ${className}`} onClick={onClick}>
      <img src={LogoImage} alt="logo" className="md:h-16 md:w-32 h-12"/>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Logo;

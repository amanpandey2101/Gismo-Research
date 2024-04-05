import PropTypes from "prop-types";

const DetailsHome = (props) => {
  const { name, color, image } = props;

  return (
    <>
      <div className={`p-4 border rounded-lg shadow-lg ${color} h-72 relative shadow-gray-400`}>
        <img src={image} alt="" className="h-44 w-full hover:animate-pulse"/>
        <p className="mb-3 text-2xl font-semibold tracking-wide uppercase text-center mt-2" >
          {name}
        </p>
      
      </div>
    </>
  );
};

DetailsHome.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default DetailsHome;

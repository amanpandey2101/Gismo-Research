import { useEffect, useState } from "react";
import DetailsHome from "../../Components/HelperComponents/DetailsHome";
import AxiosInstance from "../../Axios/AxiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import OnlineModeImage from "../../assets/online-mode.webp";
import OfflineModeImage from "../../assets/offline-mode.jpg";
import IPSImage from "../../assets/IPS.jpg";
import VLabsImage from "../../assets/virtual-labs.png";
import SuccessImage from "../../assets/success.jpg";
import LabsImage from "../../assets/labs-removebg.png";
import OfferImage from "../../assets/offer.jpg"
import AOS from "aos";
import "aos/dist/aos.css";

const UserHome = () => {
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    fetchBlogData();
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-out-sine',
      delay: 50,
    });
    AOS.refresh();
  }, []);

  const fetchBlogData = async () => {
    const response = await AxiosInstance.get("/blog");
    setBlogs(response.data.blog);
  };

  const blogDetails = (id) => {
    if (role === 2000) {
      navigate(`/user/blog/${id}`);
    }
    if (!role) {
      Swal.fire({
        title: "You are not logged In!",
        text: "Login to continue!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fea663",
        cancelButtonColor: "#004787",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/user/login");
        }
      });
    }
  };

  return (
    <>
      <div className="bg-gray-100 h-auto">
        <div className="mx-auto p-2 border-b-4 border-gray-200 flex  bg-blue-200 justify-center  ">
          <div className="flex flex-col sm:flex-row   ">
            <div className="w-full sm:w-full flex flex-col " data-aos="fade-zoom-in">
              <div className="font-bold   text-2xl lg:text-5xl p-5 text-blue-800 relative md:mt-20 max-[768px]:text-center" >
                UNLOCK THE WORLD OF{" "}
                <span className="relative md:top-5"> KNOWLEDGE WITH GISMO</span>
              </div>
              <span className="font-semibold lg:w-2/3 w-full text-lg lg:text-2xl p-5  max-[768px]:text-center" data-aos="fade-left">
                START YOUR FAVOURITE COURSE BUILD YOUR BRIGHT CAREER
              </span>
              <div className="relative lg:mx-2 flex  max-[768px]:justify-center" >
                <button
                  className="bg-teal-600 w-40 m-3 p-3 hover:bg-teal-700 hover:scale-[1.05] text-lg rounded-lg text-white  "
                  onClick={() => navigate("/user/courses")}
                >
                  Explore Category
                </button>
              </div>
            </div>
            <div className="w-full sm:w-full p-2 h-fit flex flex-col items-center"  data-aos="zoom-in">
              <img src={LabsImage} className=" lg:ml-auto" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-3 mx-auto">
          <span className="font-bold lg:text-5xl sm:text-xl text-blue-800" data-aos="fade-in" >
            CHOOSE YOUR CATEGORY
          </span>
        </div>

        <div className="container mx-auto p-3 border-b-2 border-gray-200 mb-20">
          <div className="flex flex-col sm:flex-row justify-center">
            <div className="w-full sm:w-1/4 h-72 p-3 hover:-translate-y-3 transition-all duration-300 cursor-pointer" data-aos="zoom-in-up">
              <DetailsHome
                name="Online Mode"
                color="bg-orange-300"
                image={OnlineModeImage}
              />
            </div>
            <div className="w-full sm:w-1/4 h-72 p-3 hover:-translate-y-3 transition-all duration-300 cursor-pointer" data-aos="zoom-in-up">
              <DetailsHome
                name="Physical Mode"
                color="bg-red-300"
                image={OfflineModeImage}
              />
            </div>
            <div className="w-full sm:w-1/4 h-72 p-3 hover:-translate-y-3 transition-all duration-300 cursor-pointer" data-aos="zoom-in-up">
              <DetailsHome
                name="Intellectual Property Solutions (IPS)"
                color="bg-violet-200"
                image={IPSImage}
              />
            </div>

            <div className="w-full sm:w-1/4 h-72 p-3 hover:-translate-y-3 transition-all duration-300 cursor-pointer" data-aos="zoom-in-up">
              <DetailsHome
                name="Virtual Labs"
                color="bg-blue-200"
                image={VLabsImage}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-3 mx-auto">
          <span className="font-bold text-3xl lg:text-5xl  text-blue-800" data-aos="zoom-out-down">
            What We Offer?
          </span>
        </div>
        <div className="container mx-auto p-3 border-b-2 border-gray-200 mb-12" data-aos="fade-up">
          <div className="flex flex-col-reverse sm:flex-row  bg-blue-200 lg:text-2xl shadow-md shadow-gray-500 items-center ">
            <ul className="list-[square] p-10 space-y-2 ">
              <li className="text-red-600  font-semibold cursor-pointer hover:scale-[1.01]">
                Provide Pre-assembled experimental setup boxes / animated
                explanations dedicated for complex concept exposure.
              </li>
              <li className="text-blue-600 font-semibold cursor-pointer hover:scale-[1.01]">Virtual Lab for better understanding.</li>
              <li className="text-violet-600 font-semibold cursor-pointer hover:scale-[1.01]">Best learning model by experts.</li>
              <li className="text-red-700 font-semibold cursor-pointer hover:scale-[1.01]">Platform to learn by hands-on experiments while learning.</li>
              <li className="text-orange-900 font-semibold cursor-pointer hover:scale-[1.01]">
                Provide aid to bring forward innovative imagination assisted
                with updated technology in the field.
              </li>
              <li className="text-amber-500 font-semibold cursor-pointer hover:scale-[1.01]">
                Provide global platform to young innovative researchers and
                thinkers.
              </li>
              <li className="text-green-600 font-semibold cursor-pointer hover:scale-[1.01]">
                Provide aid to bring forward innovative imagination assisted
                with updated technology in the field.
              </li>
              <li className=" text-fuchsia-600 font-semibold cursor-pointer hover:scale-[1.01]">
                Provide certifications, monetary benefits and platform to
                explore to outstanding performers.
              </li >
              <li className=" text-pink-500 font-semibold cursor-pointer hover:scale-[1.01]">Digital Library and e-resources</li>
            </ul>
            <img src={OfferImage} className="w-96 md:h-[76vh]"/>
          </div>
        </div>
        <div className="p-3 ">
          <div className="w-full lg:h-80 h-full p-2 bg-green-200 flex flex-col sm:flex-row items-center justify-between shadow-md shadow-gray-500" data-aos="zoom-in">
            <div className="w-full sm:w-1/2 flex flex-col items-center ">
              <span className="text-3xl p-3 font-semibold text-blue-700">
                PLATFORM TO LEARN AND BUILD YOUR CAREER
              </span>
              <span className="text-lg p-3 text-justify md:ml-4">
                &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dolor laudantium nostrum laboriosam natus. Quasi in ducimus modi nemo veniam sunt natus ad, illum cupiditate necessitatibus, enim illo neque debitis nihil totam, voluptates aspernatur.&quot;
              </span>
            </div>

            <img
              className="w-full sm:w-[30vw] h-60 p-6"
              src="../../picture-home.png"
              alt=""
            />
          </div>
        </div>
        {/* <div className="md:flex">
          {blogs &&
            blogs.map((blog, i) => (
              <div key={i} className="w-full h-96 p-3">
                <div className="h-full p-5 hover:bg-gray-200 rounded-md">
                  <img
                    src={blog.thumbnail.url}
                    className="w-72 h-48"
                    alt="img"
                  />
                  <h1 className="text-xl py-3 font-semibold text-justify">
                    {blog.blogHeading}
                  </h1>
                  <h1
                    className="font-semibold text-lg text-blue-400 text-end cursor-pointer hover:-translate-y-2 transition-all duration-500"
                    onClick={() => blogDetails(blog._id)}
                  >
                    Go to Blog &#10095;
                  </h1>
                </div>
              </div>
            ))}
        </div> */}
      </div>
    </>
  );
};

export default UserHome;

import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import Axios from "../../Axios/AxiosInstance";
const OtpVerify = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const inputRefs = useRef([])

  const handleOtpChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    if(value !== "" && index < otpValues.length-1){
      inputRefs.current[index+1].focus();
    }
  };


  const handleVerifyAccount = async () => {
    try {
      const res = await Axios.post("/verifyOtp", {
        data,
        otpValues,
      });
      const responseData = await res.data;
      return { ...responseData, status: res.status };
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const toastId = toast.loading("Validating...", { duration: 2500 });
      const res = await handleVerifyAccount();
      if (res.status === 200) {
        toast.remove(toastId);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Verified ! Please Login",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (res.status === 201) {
        toast.error("Incorrect OTP");
        setTimeout(() => {
          navigate("/user/login");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error.message);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {data?.email}</p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {otpValues.map((value, index) => (
                      <div key={index} className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text" 
                          name=""
                          id=""
                          placeholder="X"
                          maxLength="1"
                          ref={(el)=>{inputRefs.current[index] = el}}
                          value={value}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                        Verify Account
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Did not recieve code ?</p>{" "}
                      <a
                        className="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export default OtpVerify;

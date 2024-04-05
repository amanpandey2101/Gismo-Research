import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import Swal from "sweetalert2";
import SyncLoader from "react-spinners/SyncLoader";
import Pagination from "../Utilities/Pagination";

const TeacherListing = () => {
  const axiosPrivate = UseAxiosPrivate();
  const [teachers, setTeachers] = useState();
  const [search, setSearch] = useState("");
  const [filteredTutor, setFilteredTutor] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("/admin/teacherListing");
      setTeachers(response.data);
      setFilteredTutor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const accessChange = async (email, isAccess) => {
    const actionText = isAccess ? "Block" : "Unblock";
    const onConfirm = isAccess ? "Blocked" : "Unblocked";

    Swal.fire({
      title: "Are you sure",
      text: `You want to ${actionText} this user!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fea663",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionText} User!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate
          .put("/admin/teacherAccess", {
            email,
            isAccess,
          })
          .then((response) => {
            Swal.fire({
              title: `${onConfirm}`,
              text: `The user is ${onConfirm}.`,
              icon: "success",
            });

            setTeachers((preTeachers) => {
              return preTeachers.map((teacher) =>
                teacher.email === response.data.email
                  ? { ...teacher, isAccess: response.data.isAccess }
                  : teacher
              );
            });
          })
          .catch((error) => {
            // Handle error if the axios request fails
            console.error("Error updating teacher access:", error);
          });
      }
    });
  };

  const filterTutorFunction = (val) => {
    setSearch(val);
    const filteredTutor = teachers?.filter((item) => {
      return val.toLowerCase() === ""
        ? item
        : item.email.toLowerCase().includes(val);
    });

    setFilteredTutor(filteredTutor);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 2;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = filteredTutor?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="my-8">
        {/* /////////////search//////////////// */}
        <div className="md:max-w-xl md:mx-auto p-3">
          <div className="relative flex border border-gray-300 items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-gray-100 overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm pl-3 text-gray-700 pr-2 placeholder:pl-5"
              type="text"
              id="search"
              onChange={(e) => {
                filterTutorFunction(e.target.value);
              }}
              placeholder="Search Tutor Email..."
            />
          </div>
        </div>
        {/* ///////////////////////////// */}
        {currentPosts ? (
          currentPosts.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Index
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPosts.map((teacher, index) => (
                  <tr key={teacher._id}>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      {teacher.name}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      {teacher.email}
                    </td>
                    <td
                      className={`px-6 py-4 w-72 text-center whitespace-no-wrap ${
                        teacher.isAccess ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {teacher.isAccess ? "Active" : "Inactive"}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      <button
                        onClick={() =>
                          accessChange(teacher.email, teacher.isAccess)
                        }
                        className={`cursor-pointer border-2 border-gray-300 rounded-md w-24 h-10 ${
                          !teacher.isAccess ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {teacher.isAccess ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center items-center">
              <h1 className="text-2xl p-5">
                No Tutors found for the Search Keyword{" "}
                <span className="text-blue-400">&#39;{search}&#39;</span>
              </h1>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-screen">
            <SyncLoader
              color="#004787" // Dark blue color
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        <div className="text-center justify-center p-5">
          <Pagination
            totalPosts={filteredTutor?.length}
            postsPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default TeacherListing;

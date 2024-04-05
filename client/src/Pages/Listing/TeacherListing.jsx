import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Footer from "../../Components/Navbar/Footer";
import TeacherList from "../../Components/Teachers/TeacherListing";

const TeacherListing = () => {
  return (
    <>
      <AdminNavbar />
      <TeacherList />
      <Footer />
    </>
  );
};

export default TeacherListing;

import SectionContainer from "./SectionContainer";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="mt-18 mb-10">
        <SectionContainer>{children}</SectionContainer>
      </main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;

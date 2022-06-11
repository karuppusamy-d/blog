import { ReactElement } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = { children: ReactElement };

const LayoutWrapper = ({ children }: Props): ReactElement => {
  return (
    <>
      <Navbar />
      <main className="mt-16 mb-10 md:mt-[4.25rem]">
        <div className="mx-auto max-w-3xl px-6 xl:max-w-5xl xl:px-0">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;

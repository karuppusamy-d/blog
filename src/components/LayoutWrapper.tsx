import { ReactElement } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = { children: ReactElement };

const LayoutWrapper = ({ children }: Props): ReactElement => {
  return (
    <>
      <Navbar />
      <main className="mt-[4.5rem] mb-10">
        <div className="mx-auto max-w-3xl px-6 xl:max-w-5xl xl:px-0">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;

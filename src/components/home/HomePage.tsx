import HomePageHeader from "./HomePageHeader";
import Hero from "./Hero";
import Products from "./Products";
import { useState } from "react";
import Footer from "./Footer";

function HomePage() {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [isProfileMenuVisibile, setIsProfileMenuVisibile] = useState(false);

  const toggleSideMenuVisibility = () => {
    setIsSideMenuVisible(!isSideMenuVisible);
  };

  const toggleProfileMenuVisibility = () => {
    setIsProfileMenuVisibile(!isProfileMenuVisibile);
  };
  return (
    <main className="bg-dark h-full">
      <HomePageHeader
        isSideMenuVisible={isSideMenuVisible}
        setIsSideMenuVisible={setIsSideMenuVisible}
        toggleSideMenuVisibility={toggleSideMenuVisibility}
        isProfileMenuVisibile={isProfileMenuVisibile}
        setIsProfileMenuVisibile={setIsProfileMenuVisibile}
        toggleProfileMenuVisibility={toggleProfileMenuVisibility}
      />
      <div
        onMouseEnter={() => {
          if (isSideMenuVisible) {
            toggleSideMenuVisibility();
          }
        }}
        onMouseOver={() => {
          if (isProfileMenuVisibile) {
            toggleProfileMenuVisibility();
          }
        }}
      >
        <Hero />
        <p className="text-black bg-white font-bold w-90 text-center ml-24 p-3 rounded-lg">
          You Can Find Any Book You Haven't Found In Other Book Store, In This
          WebSite!{" "}
        </p>
        <Products />
      </div>
      <p className="text-black bg-white font-bold w-90 text-center ml-24 p-3 rounded-lg">
        Try Our Free Delivery System!
      </p>

      <Footer />
    </main>
  );
}

export default HomePage;

import { HiMiniHome } from "react-icons/hi2";
import { HiArchiveBox } from "react-icons/hi2";
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { HiMiniUser } from "react-icons/hi2";
import SideMenu from "./SideMenu";
import { HomePageHeaderProps } from "../../features/Types/HomePageHeaderProps";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import ProfileMenu from "./ProfileMen";

function HomePageHeader({
  isSideMenuVisible,
  toggleSideMenuVisibility,
  isProfileMenuVisibile,
  toggleProfileMenuVisibility,
}: HomePageHeaderProps) {
  const [cookies, setCookie] = useCookies(["token"]);

  return (
    <header className="bg-dark pl-10 text-white flex justify-around shadow-2xl border-b border-black relative">
      <div className="flex m-3 gap-8 p-2">
        <span className="relative">
          <p
            onMouseEnter={() => {
              if (!isSideMenuVisible) {
                toggleSideMenuVisibility();
              }
            }}
            className="text-xl font-bold hover:cursor-pointer"
          >
            On-line <span className="text-orange">Book</span> Store
          </p>
        </span>
        <SideMenu
          isVisible={isSideMenuVisible}
          toggleVisibility={toggleSideMenuVisibility}
        />
        <ProfileMenu
          isProfileMenuVisibile={isProfileMenuVisibile}
          setIsProfileMenuVisibile={isProfileMenuVisibile}
        />
      </div>

      <div className="flex items-center ml-20 gap-20 ">
        <span className="flex flex-row items-center gap-2 hover:cursor-pointer group ">
          <HiMiniHome className="text-orange text-3xl transition ease-in-out delay-150 group-hover:-translate-y-1 group-hover:scale-110 " />
          <span className="font-bold text-xl">Home</span>
        </span>

        <span className="flex flex-row items-center gap-2  hover:cursor-pointer group">
          <HiArchiveBox className="text-orange text-3xl transition ease-in-out delay-150 group-hover:-translate-y-1 group-hover:scale-110 " />
          <span className="font-bold text-xl">Books</span>
        </span>

        <div className="flex flex-row items-center gap-2 hover:cursor-pointer group">
          <HiChatBubbleLeftEllipsis className="text-orange text-3xl transition ease-in-out delay-150 group-hover:-translate-y-1 group-hover:scale-110" />
          <span className="font-bold text-xl">Contact Us</span>
        </div>

        <span className="flex flex-row items-center gap-2  hover:cursor-pointer group">
          <HiChatBubbleLeftEllipsis className="text-orange text-3xl transition ease-in-out delay-150 group-hover:-translate-y-1 group-hover:scale-110 " />
          <span className="font-bold text-xl text-uppercase">Shop Now!</span>
        </span>
      </div>

      <div className="flex items-center m-3 gap-20 pr-40">
        <span className="flex flex-row items-center gap-5  hover:cursor-pointer">
          <HiMagnifyingGlass className="text-2xl" />
          <HiMiniShoppingBag className="text-2xl" />
          <HiMiniUser className="text-2xl" />
          {cookies ? (
            <NavLink
              to="/dashboard"
              className="font-bold bg-orange pl-6 pr-6 pt-1 pb-1 rounded-full text-xl"
              onMouseEnter={() => {
                toggleProfileMenuVisibility();
              }}
            >
              Admin
            </NavLink>
          ) : (
            <NavLink
              to="/loginpage"
              className="font-bold bg-orange pl-6 pr-6 pt-1 pb-1 rounded-full text-xl"
            >
              Login
            </NavLink>
          )}
        </span>
      </div>
    </header>
  );
}

export default HomePageHeader;

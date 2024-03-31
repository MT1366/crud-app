import { NavLink } from "react-router-dom";
import { HiCheck } from "react-icons/hi2";

function SideMenu({ isVisible, toggleVisibility }) {
  return (
    <section className="absolute top-10 left-36 w-40 ">
      {isVisible && (
        <div className="flex flex-col p-3 m-3 leading-10 rounded-lg shadow-lg backdrop-blur-md bg-dark/80 animate-fade">
          <NavLink
            to="/shopnow"
            onClick={toggleVisibility}
            className="p-4 hover:text-orange relative"
          >
            <div className=" text-xl text-white">
              Shop Now!
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-white-500"></div>
            </div>
            <p className="text-sm pt-1 text-orange">
              Explore more than 500 book store!
            </p>
          </NavLink>

          <NavLink
            to="/topsales"
            onClick={toggleVisibility}
            className="p-4 hover:text-orange relative"
          >
            <div className=" text-xl text-white">
              Top Sale!
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-white-500"></div>
            </div>
            <p className="text-sm pt-1 text-orange">Most sales of the year.</p>
          </NavLink>

          <NavLink
            to="/genere"
            onClick={toggleVisibility}
            className="p-4 hover:text-orange relative"
          >
            <div className=" text-xl text-white">
              Genres
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-white-500"></div>
            </div>
            <p className="text-sm pt-1 text-orange">More than 1000 genre.</p>
          </NavLink>

          <NavLink
            to="/loginpage"
            onClick={toggleVisibility}
            className="p-4 hover:text-orange relative"
          >
            <div className="text-xl text-white">
              Top Sale!
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-white-500"></div>
            </div>
            <p className="text-sm pt-1 text-orange">Most sales of the year.</p>
          </NavLink>

          <div className="flex items-center justify-around m-3 hover:cursor-pointer">
            <p>Free </p> <HiCheck className="text-3xl bg-orange rounded-full" />
            <p>Premium</p> <HiCheck className="text-xl" />
          </div>
        </div>
      )}
    </section>
  );
}

export default SideMenu;

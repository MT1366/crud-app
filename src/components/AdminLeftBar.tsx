// AdminLeftBar.js
import {
  HiInboxStack,
  HiMiniUsers,
  HiMiniShoppingBag,
  HiMiniSquare3Stack3D,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

function AdminLeftBar() {
  return (
    <div className="w-64 flex flex-col bg-dark p-5 text-white rounded-md gap-10 lg:h-836 ">
      <p>User</p>
      <div className="flex gap-4 p-2 items-center hover:bg-bgdark rounded-lg cursor-pointer">
        <HiInboxStack className="text-orange" />
        <h1>Dashboard</h1>
      </div>
      <div className="flex gap-4 p-2 items-center hover:bg-bgdark rounded-lg cursor-pointer">
        <HiMiniShoppingBag className="text-orange" />
        <h1>Card</h1>
      </div>
      <p>Setting</p>
      <NavLink
        to="/"
        className="flex gap-4 p-2 items-center hover:bg-bgdark rounded-lg cursor-pointer"
      >
        <HiMiniUsers className="text-orange" />
        <h1>Profile</h1>
      </NavLink>
      <div className="flex gap-4 p-2 items-center hover:bg-bgdark rounded-lg cursor-pointer">
        <HiMiniSquare3Stack3D className="text-orange" />
        <h1>Transactions</h1>
      </div>
    </div>
  );
}

export default AdminLeftBar;

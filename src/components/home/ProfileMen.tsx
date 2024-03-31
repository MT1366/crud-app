import { NavLink } from "react-router-dom";

export default function ProfileMenu({
  isProfileMenuVisibile,
  setIsProfileMenuVisibile,
}) {
  return (
    <>
      {isProfileMenuVisibile && (
        <div className="bg-dark backdrop-blur-md bg-dark/80 animate-fade absolute top-20 right-48 w-20 rounded-lg p-4 leading-9">
          <NavLink onClick={setIsProfileMenuVisibile} to="/dashboard">
            <p className="border-b-2 border-orange">Dashboard</p>
          </NavLink>

          <NavLink onClick={setIsProfileMenuVisibile} to="/dashboard">
            <p className="border-b-2 border-orange">My Wallet</p>
          </NavLink>

          <NavLink onClick={setIsProfileMenuVisibile} to="/dashboard">
            <p className="border-b-2 border-orange">Favourite Books</p>
          </NavLink>

          <NavLink onClick={setIsProfileMenuVisibile} to="/dashboard">
            <p className="border-b-2 border-orange">Plans</p>
          </NavLink>

          <NavLink onClick={setIsProfileMenuVisibile} to="/dashboard">
            <p className="border-b-2 border-orange">Edit Profile</p>
          </NavLink>

          <NavLink onClick={setIsProfileMenuVisibile} to="/dashboard">
            <p className="border-b-2 border-orange">Log Out</p>
          </NavLink>
        </div>
      )}
    </>
  );
}

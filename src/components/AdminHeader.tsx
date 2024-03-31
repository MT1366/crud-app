import { HiMiniMagnifyingGlass } from "react-icons/hi2";

export default function AdminHeader({ searchTerm, setSearchTerm }) {
  return (
    <div className=" flex flex-row items-center justify-between p-5 m-2 bg-dark shadow text-white rounded-md">
      <div className="flex items-center gap-5 bg-transparent outline-none">
        <h1>Admin Panel</h1>
        <HiMiniMagnifyingGlass className="text-orange" />
        <input
          type="text"
          placeholder="Search Your Book..."
          className="rounded-md p-1 bg-transparent outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-5 items-center">
        <p>ICONS</p>
      </div>
    </div>
  );
}

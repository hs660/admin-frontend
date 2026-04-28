import { LayoutDashboard, Image, Upload, Users, LogOut, X } from "lucide-react";

const Sidebar = ({ open, setOpen }) => {
  return (
    <div
      className={`
        fixed md:static top-0 left-0 z-50 h-screen w-64 
        bg-gradient-to-b from-gray-900 to-gray-800 text-white p-5
        transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* ❌ Close Button (Mobile only) */}
      <button
        className="absolute top-4 right-4 md:hidden"
        onClick={() => setOpen(false)}
      >
        <X size={24} />
      </button>

      {/* Logo */}
      <h2 className="text-2xl font-bold mb-8 text-center">
        Image Admin
      </h2>

      {/* Menu */}
      <ul className="space-y-4">

        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
          <LayoutDashboard size={20} />
          Dashboard
        </li>

        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
          <Upload size={20} />
          Upload Image
        </li>

        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
          <Image size={20} />
          All Images
        </li>

        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
          <Users size={20} />
          Users
        </li>

      </ul>

      {/* Logout */}
      <div className="absolute bottom-5 left-5 right-5">
        <button className="flex items-center gap-2 w-full bg-red-500 hover:bg-red-600 p-2 rounded-lg justify-center">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
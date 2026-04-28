import { Menu, Bell } from "lucide-react";

const Topbar = ({ setOpen }) => {
  return (
    <div className="bg-white shadow p-4 flex items-center justify-between rounded-2xl mt-2 mx-2">

      <div className="flex items-center gap-3">
        <button
          className="md:hidden"
          onClick={() => setOpen(prev => !prev)}
        >
          <Menu />
        </button>

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <Bell />
        <img src="https://i.pravatar.cc/40" className="w-8 h-8 rounded-full" />
      </div>

    </div>
  );
};

export default Topbar;
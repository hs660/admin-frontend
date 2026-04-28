import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminLayout = ({ children }) => {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* 🔥 Overlay (Mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1">

        <Topbar setOpen={setOpen} />

        <div className="p-4 sm:p-6">
          {children}
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;
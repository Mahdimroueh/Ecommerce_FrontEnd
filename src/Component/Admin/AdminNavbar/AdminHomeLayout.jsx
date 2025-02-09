import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";
const AdminHomeLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-[100vh]">
      <AdminHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className="grid md:grid-cols-[auto,1fr]"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        {children}
      </div>
    </div>
  );
};

export default AdminHomeLayout;

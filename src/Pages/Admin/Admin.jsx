import { Outlet } from "react-router-dom";
import AdminHomeLayout from "../../Component/Admin/AdminNavbar/AdminHomeLayout";

const Admin = () => {
  return (
    <div>
      <AdminHomeLayout>
        <section className="p-6 overflow-auto">
          <Outlet />
        </section>
      </AdminHomeLayout>
    </div>
  );
};

export default Admin;

import { Search, Bell } from "lucide-react";

export function AdminNavbar({ toggleSidebar }) {
  return (
    <header className="bg-white shadow-md sticky top-0">
      <div className="container mx-auto px-6 py-3">
        <p className=" font-semibold text-2xl text-primary">Admin</p>
      </div>
    </header>
  );
}

import { NavLink } from "react-router-dom";

const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors duration-200 ${
        isActive
            ? "bg-[#EFF6FF] text-[#087CFF] font-semibold"
            : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B]"
    }`;

function Sidebar({ isOpen, onClose, onLogout }) {
    return (
        <aside
            className={`fixed inset-y-0 left-0 z-40 w-64 min-h-screen border-r border-[#E2E8F0] bg-white flex flex-col transform transition-transform duration-300 md:relative md:translate-x-0 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            {/* Logo */}
            <div className="px-6 pt-6 pb-10">
                <h1 className="text-xl font-bold text-[#020617]">
                    <span className="text-[#087CFF]">R.</span> ResiSure
                </h1>
            </div>

            {/* Navigation */}
            <div className="px-4 flex-1">
                <nav className="flex flex-col gap-2">
                    <NavLink
                        to="/admin/dashboard"
                        end
                        className={navLinkStyles}
                        onClick={onClose}
                    >
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/admin/properties"
                        end
                        className={navLinkStyles}
                        onClick={onClose}
                    >
                        <span>Accommodation</span>
                    </NavLink>
                </nav>
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-[#E2E8F0]">
                <button
                    onClick={() => {
                        onLogout();
                        onClose();
                    }}
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B] transition-colors duration-200"
                >
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
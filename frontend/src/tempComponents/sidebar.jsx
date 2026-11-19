import { NavLink } from "react-router-dom";

const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
        isActive
            ? 'bg-primary text-text font-medium'
            : 'text-text hover:bg-primary'
    }`;

function Sidebar({ isOpen, onClose, onLogout }) {
    return (
        <aside 
            className={`fixed inset-y-0 left-0 z-40 w-64 min-h-screen border-r border-border bg-background flex flex-col transform transition-transform duration-300 md:relative md:translate-x-0 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="px-6 pt-6 pb-10">
                <h1 className="text-2xl font-semibold text-text">
                    HAVENCHECK
                </h1>
            </div>

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

            <div className="p-4 border-t border-border">
                <nav className="flex flex-col gap-2">
                    <button
                        onClick={() => {
                            onLogout();
                            onClose();
                        }}
                        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-text hover:bg-background transition-colors"
                    >
                        <span>Logout</span>
                    </button>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;
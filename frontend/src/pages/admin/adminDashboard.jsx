import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../tempComponents/sidebar";

function AdminDashboard({ onLogout }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const cardClass =
        "rounded-[24px] border border-[#F1F5F9] bg-white p-6 shadow-sm";

    const secondaryButtonClass =
        "w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm font-semibold text-[#1E293B] transition-colors duration-200 hover:border-[#CBD5E1] hover:bg-[#F8FAFC]";

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={onLogout}
            />

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="min-w-0 flex-1">
                {/* Mobile Header */}
                <header className="flex items-center gap-4 border-b border-[#E2E8F0] bg-white px-6 py-4 md:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-[#1E293B] transition-colors hover:text-[#087CFF]"
                        aria-label="Toggle Sidebar"
                    >
                        ☰
                    </button>

                    <h1 className="text-lg font-semibold text-[#0F172A]">
                        Admin Dashboard
                    </h1>
                </header>

                <div className="mx-auto w-full max-w-330 p-6 md:p-8">
                    {/* Page Heading */}
                    <div className="mb-8">
                        <h1 className="text-[28px] font-bold text-[#0F172A]">
                            Admin Dashboard
                        </h1>

                        <p className="mt-2 text-sm text-[#64748B]">
                            Manage accommodation listings and verification.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="mb-8">
                        <div className="mx-auto flex h-11.25 w-full max-w-md items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-4 transition-colors focus-within:border-[#087CFF] focus-within:ring-2 focus-within:ring-[#DBEAFE]">
                            <input
                                type="text"
                                placeholder="Search accommodation..."
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                                className="w-full bg-transparent text-sm text-[#1E293B] outline-none placeholder:text-[#94A3B8]"
                            />
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className={cardClass}>
                            <p className="text-sm font-medium text-[#64748B]">
                                Total Listings
                            </p>

                            <p className="mt-3 text-3xl font-bold text-[#0F172A]">
                                24
                            </p>
                        </div>

                        <div className={cardClass}>
                            <p className="text-sm font-medium text-[#64748B]">
                                Verified
                            </p>

                            <p className="mt-3 text-3xl font-bold text-[#087CFF]">
                                18
                            </p>
                        </div>

                        <div className={cardClass}>
                            <p className="text-sm font-medium text-[#64748B]">
                                Pending Review
                            </p>

                            <p className="mt-3 text-3xl font-bold text-amber-500">
                                4
                            </p>
                        </div>

                        <div className={cardClass}>
                            <p className="text-sm font-medium text-[#64748B]">
                                Unverified
                            </p>

                            <p className="mt-3 text-3xl font-bold text-red-500">
                                2
                            </p>
                        </div>
                    </div>

                    {/* Dashboard Sections */}
                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Quick Actions */}
                        <div className={cardClass}>
                            <h2 className="text-xl font-semibold text-[#0F172A]">
                                Quick Actions
                            </h2>

                            <p className="mt-2 text-sm text-[#64748B]">
                                Manage accommodation listings.
                            </p>

                            <div className="mt-6 flex flex-col gap-3">
                                <button
                                    onClick={() =>
                                        navigate("/admin/properties/new")
                                    }
                                    className="w-full rounded-2xl bg-[#087CFF] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#006BE6]"
                                >
                                    Add Accommodation
                                </button>

                                <button
                                    onClick={() =>
                                        navigate("/admin/properties")
                                    }
                                    className={secondaryButtonClass}
                                >
                                    Manage Accommodation
                                </button>

                                <button
                                    onClick={() =>
                                        navigate("/admin/verifications")
                                    }
                                    className={secondaryButtonClass}
                                >
                                    Review Verification
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className={cardClass}>
                            <h2 className="text-xl font-semibold text-[#0F172A]">
                                Recent Activity
                            </h2>

                            <p className="mt-2 text-sm text-[#64748B]">
                                Latest accommodation updates.
                            </p>

                            <div className="mt-6 flex flex-col divide-y divide-[#E2E8F0]">
                                <div className="py-4 first:pt-0">
                                    <p className="text-sm font-semibold text-[#1E293B]">
                                        New accommodation added
                                    </p>

                                    <p className="mt-1 text-xs text-[#64748B]">
                                        Braam Student Lodge
                                    </p>

                                    <p className="mt-4 text-sm font-semibold text-[#1E293B]">
                                        Accommodation verified
                                    </p>

                                    <p className="mt-1 text-xs text-[#64748B]">
                                        Braam Student Lodge
                                    </p>
                                </div>

                                <div className="py-4 last:pb-0">
                                    <p className="text-sm font-semibold text-[#1E293B]">
                                        Verification pending
                                    </p>

                                    <p className="mt-1 text-xs text-[#64748B]">
                                        Parkside Student Accommodation
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
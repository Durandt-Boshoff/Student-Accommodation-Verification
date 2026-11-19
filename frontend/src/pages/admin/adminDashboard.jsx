import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../tempComponents/sidebar";

function AdminDashboard({ onLogout }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={onLogout}
            />

            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-30 bg-black/30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="min-w-0 flex-1">
                <header className="flex items-center gap-4 px-6 py-4 md:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-text"
                        aria-label="Toggle Sidebar"
                    >
                        ☰
                    </button>
                    <h1 className="text-lg font-semibold text-text">
                        Admin Dashboard
                    </h1>        
                </header>

                <div className="p-6 md:p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-text">
                            Admin Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-muted-text">
                            Manage accommodation listings and verification. 
                        </p>
                    </div>

                    <div className="mb-8 mx-auto flex w-full max-w-md items-center gap-3 rounded-xl border border-border bg-white px-4 py-3">
                        <input
                            type="text"
                            placeholder="Search accommodation..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted-text"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl border border-border bg-white p-5">
                            <p className="text-sm text-muted-text">
                                Total Listings
                            </p>

                            <p className="mt-2 text-3xl font-semibold text-text">
                                24
                            </p>
                        </div>

                        <div className="rounded-xl border border-border bg-white p-5">
                            <p className="text-sm text-muted-text">
                                Verified
                            </p>

                            <p className="mt-2 text-3xl font-semibold text-success">
                                18
                            </p>
                        </div>

                        <div className="rounded-xl border border-border bg-white p-5">
                            <p className="text-sm text-muted-text">
                                Pending Review
                            </p>

                            <p className="mt-2 text-3xl font-semibold text-yellow-500">
                                4
                            </p>
                        </div>

                        <div className="rounded-xl border border-border bg-white p-5">
                            <p className="text-sm text-muted-text">
                                Unverified
                            </p>

                            <p className="mt-2 text-3xl font-semibold text-red-500">
                                2
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-xl border border-border bg-white p-6">
                            <h2 className="text-lg font-semibold text-text">
                                Quick Actions
                            </h2>

                            <p className="mt-1 text-sm text-muted-text">
                                Manage accommodation listings.
                            </p>

                            <div className="mt-5 flex flex-col gap-3">
                                <button
                                    onClick={() => navigate("/admin/properties/new")}
                                    className="rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-text transition-colors hover:bg-primary-dark hover:text-background">
                                    Add Accommodation
                                </button>

                                <button 
                                    onClick={() => navigate("/admin/properties")}
                                    className="rounded-lg border border-border px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-background">
                                    Manage Accommodation
                                </button>

                                <button 
                                    onClick={() => navigate("/admin/verifications")}
                                    className="rounded-lg border border-border px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-background">
                                    Review Verification
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl border border-border bg-white p-6">
                            <h2 className="text-lg font-semibold text-text">
                                Recent Activity
                            </h2>

                            <p className="mt-1 text-sm text-muted-text">
                                Latest accommodation updates.
                            </p>

                            <div className="mt-5 flex flex-col divide-y divide-border">
                                <div className="py-4 first:pt-0">
                                    <p className="text-sm font-medium text-text">
                                        New accommodation added
                                    </p>

                                    <p className="text-sm font-medium text-text">
                                        Accommodation verified
                                    </p>

                                    <p className="mt-1 text-xs text-muted-text">
                                        Braam Student Lodge
                                    </p>
                                </div>

                                <div className="py-4 last:pb-0">
                                    <p className="text-sm font-medium text-text">
                                        Verification pending
                                    </p>

                                    <p className="mt-1 text-xs text-muted-text">
                                        Parkside Student Accommodation
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdminDashboard;
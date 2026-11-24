import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../tempComponents/sidebar";

function ManageAccommodation({ onLogout }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const [accommodations, setAccommodation] = useState([
        {
            id: 1,
            name: "Braam Student Lodge",
            area: "Braamfontein",
            price: "R4,500",
            status: "Verified",
        },
        {
            id: 2,
            name: "Rose View Student Residence",
            area: "Braamfontein",
            price: "R3,800",
            status: "Pending",
        },
        {
            id: 3,
            name: "Parkside Student Accommodation",
            area: "Braamfontein",
            price: "R4,200",
            status: "Unverified",
        },
        {
            id: 4,
            name: "Campus View Residence",
            area: "Braamfontein",
            price: "R5,000",
            status: "Verified",
        },
    ]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this accommodation?"
        );

        if (confirmDelete) {
            setAccommodation((currentAccommodations) =>
                currentAccommodations.filter(
                    (accommodation) => accommodation.id !== id
                )
            );
        }
    };

    // Filter accommodation listings using the search term
    const filteredAccommodations = accommodations.filter((accommodation) =>
        `${accommodation.name} ${accommodation.area} ${accommodation.status}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase().trim())
    );

    // Calculate statistics from the current accommodation list
    const totalListings = accommodations.length;
    const verifiedCount = accommodations.filter(
        (accommodation) => accommodation.status === "Verified"
    ).length;
    const pendingCount = accommodations.filter(
        (accommodation) => accommodation.status === "Pending"
    ).length;
    const unverifiedCount = accommodations.filter(
        (accommodation) => accommodation.status === "Unverified"
    ).length;

    const cardClass =
        "rounded-[24px] border border-[#F1F5F9] bg-white p-6 shadow-sm";

    const secondaryButtonClass =
        "rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#1E293B] transition-colors duration-200 hover:border-[#CBD5E1] hover:bg-[#F8FAFC]";

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
                        Accommodation
                    </h1>
                </header>

                <div className="mx-auto w-full max-w-330 p-6 md:p-8">
                    {/* Page Heading */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-[28px] font-bold text-[#0F172A]">
                                Accommodation
                            </h1>

                            <p className="mt-2 text-sm text-[#64748B]">
                                Manage accommodation listings and verification status.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/admin/properties/new")}
                            className="rounded-2xl bg-[#087CFF] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#006BE6]"
                        >
                            Add Accommodation
                        </button>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <div className="flex h-11.25 w-full items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-4 transition-colors focus-within:border-[#087CFF] focus-within:ring-2 focus-within:ring-[#DBEAFE]">
                            <input
                                type="text"
                                placeholder="Search by property, area or status..."
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
                                {totalListings}
                            </p>
                        </div>

                        <div className={cardClass}>
                            <p className="text-sm font-medium text-[#64748B]">
                                Verified
                            </p>

                            <p className="mt-3 text-3xl font-bold text-[#087CFF]">
                                {verifiedCount}
                            </p>
                        </div>

                        <div className={cardClass}>
                            <p className="text-sm font-medium text-[#64748B]">
                                Pending Review
                            </p>

                            <p className="mt-3 text-3xl font-bold text-amber-500">
                                {pendingCount}
                            </p>
                        </div>

                        <div className={cardClass}>
                            <p className="text-sm font-medium text-[#64748B]">
                                Unverified
                            </p>

                            <p className="mt-3 text-3xl font-bold text-red-500">
                                {unverifiedCount}
                            </p>
                        </div>
                    </div>

                    {/* Accommodation Table */}
                    <div className="mt-8 overflow-hidden rounded-3xl border border-[#F1F5F9] bg-white shadow-sm">
                        {/* Table Header */}
                        <div className="hidden border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4 md:grid md:grid-cols-5 md:gap-4">
                            {["Property", "Area", "Price", "Status", "Action"].map(
                                (heading) => (
                                    <p
                                        key={heading}
                                        className="text-xs font-semibold uppercase tracking-wide text-[#64748B]"
                                    >
                                        {heading}
                                    </p>
                                )
                            )}
                        </div>

                        {/* Table Rows */}
                        {filteredAccommodations.length > 0 ? (
                            filteredAccommodations.map((accommodation) => (
                                <div
                                    key={accommodation.id}
                                    className="border-b border-[#E2E8F0] px-6 py-5 last:border-b-0 md:grid md:grid-cols-5 md:items-center md:gap-4"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-[#1E293B]">
                                            {accommodation.name}
                                        </p>
                                    </div>

                                    <div className="mt-2 md:mt-0">
                                        <p className="text-sm text-[#64748B]">
                                            {accommodation.area}
                                        </p>
                                    </div>

                                    <div className="mt-2 md:mt-0">
                                        <p className="text-sm font-semibold text-[#1E293B]">
                                            {accommodation.price}
                                        </p>
                                    </div>

                                    <div className="mt-3 md:mt-0">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                accommodation.status === "Verified"
                                                    ? "bg-[#EFF6FF] text-[#087CFF]"
                                                    : accommodation.status === "Pending"
                                                        ? "bg-amber-50 text-amber-700"
                                                        : "bg-red-50 text-red-600"
                                            }`}
                                        >
                                            {accommodation.status}
                                        </span>
                                    </div>

                                    <div className="mt-4 flex gap-2 md:mt-0">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/admin/properties/${accommodation.id}/edit`
                                                )
                                            }
                                            className={secondaryButtonClass}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(accommodation.id)
                                            }
                                            className="rounded-xl border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 transition-colors duration-200 hover:border-red-200 hover:bg-red-50"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-12 text-center">
                                <p className="text-sm font-semibold text-[#1E293B]">
                                    No accommodation found
                                </p>

                                <p className="mt-1 text-sm text-[#64748B]">
                                    Try adjusting your search term.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ManageAccommodation;
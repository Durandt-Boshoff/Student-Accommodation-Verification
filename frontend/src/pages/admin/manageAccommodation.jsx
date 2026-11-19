import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Sidebar from "../../tempComponents/sidebar";

function ManageAccommodation({ onLogout }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const navigate = useNavigate()

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
    ])

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this accommodation?"
        )

        if (confirmDelete) {
            setAccommodation((currentAccommodations) =>
                currentAccommodations.filter(
                    (accommodation) => accommodation.id !== id
                )
            )
        }
    }
    
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
                        Accommodation
                    </h1>
                </header>

                <div className="p-6 md:p-8">
                    <div className="mb-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold text-text">
                                    Accommodation
                                </h1>

                                <p className="mt-1 text-sm text-muted-text">
                                    Manage accommodation listings and verification status.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/admin/properties/new")}
                                className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-text transition-colors hover:bg-primary-dark hover:text-background"
                            >
                                Add Accommodation
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-white px-4 py-3">
                            <input
                                type="text"
                                placeholder="Search accommodation..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted-text"
                            />
                        </div>
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

                            <p className="mt-2 text-3xl font-semibold   text-yellow-500">
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

                    <div className="mt-8 overflow-hidden rounded-xl border border-border bg-white">
                        <div className="hidden border-b border-border px-6 py-4 md:grid md:grid-cols-5 md:gap-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-text">
                                Property
                            </p>
                        
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-text">
                                Area
                            </p>

                            <p className="text-xs font-semibold uppercase   tracking-wide text-muted-text">
                                Price
                            </p>

                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-text">
                                Status
                            </p>

                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-text">
                                Action
                            </p>
                        </div>

                        {accommodations.map((accommodation) => (
                            <div
                                key={accommodation.id}
                                className="border-b border-border px-6 py-5 last:border-b-0 md:grid md:grid-cols-5 md:items-center md:gap-4"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-text">
                                        {accommodation.name}
                                    </p>
                                </div>

                                <div className="mt-2 md:mt-0">
                                    <p className="text-sm text-muted-text">
                                        {accommodation.area}
                                    </p>
                                </div>

                                <div className="mt-2 md:mt-0">
                                    <p className="text-sm text-text">
                                        {accommodation.price}
                                    </p>
                                </div>

                                <div className="mt-2 md:mt-0">
                                    <span 
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                            accommodation.status === "Verified"
                                                ? "bg-green-100 text-green-700"
                                                : accommodation.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {accommodation.status}
                                    </span>
                                </div>

                                <div className="mt-4 flex gap-2 md:mt-0">
                                    <button 
                                        onClick={() => navigate(`/admin/properties/${accommodation.id}/edit`)}
                                        className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-text hover:bg-green-300"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(accommodation.id)}
                                        className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-text hover:bg-red-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ManageAccommodation;
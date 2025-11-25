import React, { useState } from "react";
import EditRoleModal from "./EditRoleModal";
import Pagination from "@/components/ui/Pagination";
import { Table } from "lucide-react";
import PaginationLimit from "@/components/ui/PaginationLimit";

export type User = {
    id: string | number
    name: string
    email: string
    companyName: string
    role: string
}

interface Props {
    users: User[]
    reload: () => void
    loading: boolean
}
export default function UserTable({ users = [], reload, loading }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const totalPages = Math.ceil(users?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage

    const newUsers = users.slice(startIndex, endIndex);

    const pageHandler = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="bg-white dark:bg-gray-800 dark:text-white shadow rounded-xl overflow-hidden">
            <div className="flex flex-col items-start gap-3 p-4">
                <div><h2 className="text-xl font-semibold flex items-center gap-3"><Table />All Users</h2></div>
                <PaginationLimit itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
            </div>
            {/* LOADING STATE */}
            {loading && (
                <div className="p-6 text-center text-gray-500">
                    <div className="animate-pulse">Loading users...</div>
                </div>
            )}
            {/* NO RESULTS */}
            {!loading && users.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                    No users found.
                </div>
            )}
            {/* TABLE */}
            {!loading && users.length > 0 && (
                <div className="overflow-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 dark:bg-gray-600  dark:text-gray-50 text-sm">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Company</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {newUsers.map((user) => (
                                <React.Fragment key={user.name}>
                                    <tr className="border-b">
                                        <td className="px-4 py-3">{user.name}</td>
                                        <td className="px-4 py-3">{user.email}</td>
                                        <td className="px-4 py-3">{user.companyName}</td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => setShowModal(true)}
                                                className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                                            >
                                                Change Role
                                            </button>
                                        </td>
                                    </tr>

                                    {showModal && (
                                        <EditRoleModal
                                            user={user}
                                            close={() => setShowModal(false)}
                                            reload={reload}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && users.length > 0 && (
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={pageHandler} />
            )}
        </div>
    );
}

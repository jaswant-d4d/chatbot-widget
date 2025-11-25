import { useEffect, useState } from "react";
import { getAllUsers } from "./api/userApi";
import UserTable, { type User } from "./components/UserTable";
import RoleManager from "./components/RoleManager";
import { Users } from "lucide-react";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadUsers() {
        setLoading(true)
        try {
            const res = await getAllUsers();
            setUsers(Array.isArray(res) ? res : []);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setUsers([]); // keep table empty if failed
        }
        setLoading(false)
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="min-h-screen space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-3"><Users className="size-5" />Company Admins</h2>
            </div>

            {loading ? (
                <div className="p-6 text-center text-gray-500">
                    <div className="animate-pulse">Loading...</div>
                </div>
            ) : !loading && users.length === 0 ? (
                <div className="p-6 bg-white shadow rounded-xl text-center text-gray-500 flex items-center justify-center gap-3">
                    <Users />
                    No users found.
                </div>
            ) : (
                <UserTable users={users} reload={loadUsers} loading={loading} />
            )}

            {/* Role Manager section below */}
            <RoleManager />
        </div>
    );
}

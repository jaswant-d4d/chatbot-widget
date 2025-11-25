import { useState } from "react";
import { updateUserRole } from "../api/userApi";
import type { User } from "./UserTable";

interface Props {
  user: User
  reload: () => void
  close: () => void
}

export default function EditRoleModal({ user, close, reload }: Props) {
  const [role, setRole] = useState(user.role);

  async function handleSave() {
    await updateUserRole(user.id, role);
    reload();
    close();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-96 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Change Role</h2>

        <select
          className="w-full border px-3 py-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="viewer">Viewer</option>
        </select>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={close} className="px-4 py-2 text-gray-600">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

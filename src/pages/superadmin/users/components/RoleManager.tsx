export default function RoleManager() {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-xl shadow space-y-4">
      <h3 className="text-xl font-semibold">Role Manager</h3>

      <div className="grid grid-cols-3 gap-4 ">
        <div className="p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
          <h4 className="font-medium">Admin</h4>
          <p className="text-sm text-gray-600">Full access</p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
          <h4 className="font-medium">User</h4>
          <p className="text-sm text-gray-600">Limited access</p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
          <h4 className="font-medium">Viewer</h4>
          <p className="text-sm text-gray-600">Read-only access</p>
        </div>
      </div>
    </div>
  );
}

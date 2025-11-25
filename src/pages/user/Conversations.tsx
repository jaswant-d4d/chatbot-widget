export default function Conversations() {
  return (
    <div className="min-h-[calc(100vh-111px)]  ">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900 mb-6">
        Conversations
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 border border-gray-200 dark:border-gray-800">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search chats..."
          className="mb-4 px-4 py-2 w-full rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
        />

        {/* Chat List */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex justify-between">
                <p className="font-medium text-gray-900 dark:text-gray-200">User #{i + 1}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">5 mins ago</p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                "Can you help me with pricing?"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

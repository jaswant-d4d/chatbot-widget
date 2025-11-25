import Button from "@/components/ui/Button";
import { Lock } from "lucide-react";

export default function ChangePassword() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold flex items-center dark:text-white gap-3"><Lock className="size-5" />Change Password</h2>
      <form className="text-gray-900 dark:text-white space-y-4 text-sm">
        <div>
          <label className="block mb-1">Current Password</label>
          <input type="password" className="w-full p-2 rounded-md border dark:border-white" />
        </div>
        <div>
          <label className="block mb-1">New Password</label>
          <input type="password" className="w-full p-2 rounded-md border dark:border-white" />
        </div>
        <div>
          <label className="block mb-1">Confirm New Password</label>
          <input type="password" className="w-full p-2 rounded-md border dark:border-white" />
        </div>
        <div className="flex gap-3 mt-5">
          <Button label={"Cancel"} variant={"secondary"} className="" onClick={() => { }} />
          <Button label={"Update Password"} variant={"primary"} onClick={() => { }} />
        </div>
      </form>
    </div>
  );
}

import Button from "@/components/ui/Button";
import { Edit } from "lucide-react";

export default function EditProfile() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold flex items-center gap-3 dark:text-white"><Edit className="size-5" />Edit Profile</h2>
      <form className="text-gray-900  dark:text-white rounded-xl text-sm space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input type="text" className="w-full p-2 rounded-md border dark:border-white " />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full p-2 rounded-md border dark:border-white " />
        </div>
        <div className="flex gap-3 mt-5">
          <Button label={"Cancel"} variant={"secondary"} className="" onClick={() => { }} />
          <Button label={"Save changes"} variant={"primary"} onClick={() => { }} />
        </div>
      </form>
    </div>
  );
}

import { User } from "lucide-react";

export default function Profile() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold flex items-center gap-3 dark:text-white"><User className="size-5" />Profile</h2>
      <div className="text-gray-900 text-sm dark:text-white ">
        <p><strong>Company Name:</strong> Admin User</p>
        <p><strong>Company Email:</strong> admin@example.com</p>
        <p><strong>Website URL:</strong> test.example.com</p>
        <p><strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia eligendi fuga sed incidunt libero ab dolores saepe pariatur, repudiandae cupiditate sequi totam asperiores, magnam voluptatem qui molestias a sunt delectus.</p>
      </div>
    </div>
  );
}
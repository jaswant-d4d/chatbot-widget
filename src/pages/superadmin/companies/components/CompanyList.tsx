import { useEffect, useState } from "react";
import { getCompanies, deleteCompany } from "@/pages/superadmin/companies/api/companyApi";
import Button from "@/components/ui/Button";
import { Building2, Delete, Edit, Eye, LucideDelete, Trash } from "lucide-react";

export interface CompanyType {
  id: string | number
  name: string
  email: string
  status: string
}

export default function CompanyList({ onAdd, onEdit, onView }: any) {
  const [companies, setCompanies] = useState<CompanyType[]>([]);

  const loadCompanies = async () => {
    const data = await getCompanies();
    setCompanies(data);
  };


  useEffect(() => {
    setCompanies(
      [
        { id: 1, name: "Digital4design", email: "digital4designs@gmail.com", status: "Active" },
        { id: 2, name: "Infosys", email: "infosys@gmail.com", status: "Active" },
        { id: 3, name: "Google", email: "google@gmail.com", status: "Active" }
      ]);
    loadCompanies();
  }, []);

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white p-6 shadow rounded-xl ">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center dark:text-white gap-3"><Building2 className="size-5"/> Companies</h2>
        <Button
          onClick={onAdd}
          label="Add Company"
          className=" text-white px-4 py-2 rounded-lg"
        />
      </div>

      <div className="relative overflow-x-auto rounded-xl border">
        <table className="w-full text-sm text-left rtl:text-right text-body ">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700  text-left">
              <th className="p-3 ">Name</th>
              <th className="p-3 ">Email</th>
              <th className="p-3 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c: any) => (
              <tr key={c.id} className=" rounded-xl border-t-1">
                <td className="p-3 ">{c.name}</td>
                <td className="p-3 ">{c.email}</td>
                <td className="p-3 space-x-3 flex gap-3">
                  <button
                    onClick={() => onView(c.id)}
                    className="text-blue-600 cursor-pointer hover:underline flex flex-col items-center"
                  >
                    <Eye className="size-4" />
                    View
                  </button>
                  <button
                    onClick={() => onEdit(c.id)}
                    className="text-green-600 cursor-pointer hover:underline flex flex-col items-center"
                  >
                    <Edit className="size-4" />
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      await deleteCompany(c.id);
                      loadCompanies();
                    }}
                    className="text-red-600 cursor-pointer hover:underline flex flex-col items-center"
                  >
                    <Trash className="size-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

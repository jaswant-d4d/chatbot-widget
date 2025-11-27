import { useEffect, useState } from "react";
import { getCompanies } from "@/pages/superadmin/companies/api/companyApi";
import Button from "@/components/ui/Button";
import { Building2, Copy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export interface CompanyType {
  id: string | number
  name: string
  email: string
  domains: [{ host: string }]
  apiKey: string
  status: string
}

export default function CompanyList({ onAdd }: any) {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState(true);
  const { apiBaseUrl } = useAuth()

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const data = await getCompanies();
      setCompanies(data);
      setCompanies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function toggle(id: string) {
    await fetch(`${apiBaseUrl}/companies/${id}/toggle`, { method: "POST" });
    loadCompanies();
  }

  async function regenerate(id: string) {
    const ok = confirm("Regenerate API key? This will invalidate the previous key.");
    if (!ok) return;
    const res = await fetch(`${apiBaseUrl}/companies/${id}/regenerate-key`, { method: "POST" });
    const data = await res.json();
    if (res.ok) {
      alert("New API Key: " + data.apiKey);
      loadCompanies();
    } else {
      alert("Error regenerating key");
    }
  }


  function copyKey(key: string) {
    console.log(navigator)
    navigator.clipboard
      .writeText(key)
      .then(() => {
        alert("successfully copied");
      })
      .catch(() => {
        alert("something went wrong");
      });
  }


  useEffect(() => {
    setCompanies(
      [
        { id: 1, name: "Text-to-Speech", email: "speechAdministrator@gmail.com", domains: [{ host: "https://text-to-speech-liard-ten.vercel.app" }], apiKey: "testsfsf54sdkniwhnknin", status: "Active" },
        { id: 2, name: "Walksy", email: "walksyAdmin@gmail.com", domains: [{ host: "https://walksy-one.vercel.app" }], apiKey: "tesretsfsfsdkn546iwhnknin", status: "Active" },
        { id: 3, name: "Econsul", email: "econsul@gmail.com", domains: [{ host: "https://econsul.ge/" }], apiKey: "testsreyy46fsfsdkniwhnknin", status: "Active" }
      ]);
    loadCompanies();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white p-6 shadow rounded-xl ">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center dark:text-white gap-3"><Building2 className="size-5" /> Companies</h2>
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
              <th className="p-3 ">Domains</th>
              <th className="p-3 ">API Key</th>
              <th className="p-3 ">Active</th>
              <th className="p-3 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c: any) => (
              <tr key={c.id} className=" rounded-xl border-t-1">
                <td className="p-3 ">{c.name}</td>
                <td className="p-3 ">{c.email}</td>
                <td className="p-3 ">{(c.domains || []).map((d: { host: any }) => d.host).join(", ")}</td>
                <td className="p-3 "><code className="text-xs">{c.apiKey}</code></td>
                <td>{c.isActive ? "Active" : "Inactive"}</td>
                <td className="p-3 space-x-3 flex gap-3 ">
                  <button onClick={() => toggle(c._id)} className="px-2 py-1 bg-yellow-400 rounded cursor-pointer">Toggle</button>
                  <button onClick={() => regenerate(c._id)} className="px-2 py-1 bg-green-600 text-white rounded cursor-pointer">Regenerate Key</button>
                  <button onClick={() => { copyKey(c.apiKey) }} className="px-2 py-1 bg-blue-500 cursor-pointer text-white rounded flex gap-1 items-center"><Copy className="size-4" /> Copy Key</button>
                </td>
                {/* <td className="p-3 space-x-3 flex gap-3">
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
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

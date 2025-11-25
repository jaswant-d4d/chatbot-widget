// src/components/FAQList.tsx
import { useState, useMemo } from "react";
import type { FAQItem } from "./FAQForm";

type Props = {
  faqs: FAQItem[];
  categories: string[];
  onEdit: (f: FAQItem) => void;
  onDelete: (id: string) => void;
};

export default function FAQListing({ faqs, categories, onEdit, onDelete }: Props) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      if (cat && f.category !== cat) return false;
      if (!q) return true;
      const s = q.toLowerCase();
      return (
        f.question.toLowerCase().includes(s) ||
        f.answer.toLowerCase().includes(s) ||
        (f.tags || []).some((t) => t.toLowerCase().includes(s))
      );
    });
  }, [faqs, q, cat]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search FAQs..."
            className="p-2 rounded text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-900 dark:border-white"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="p-2.5 rounded group text-gray-900 dark:text-white dark:bg-gray-800 border border-gray-900 dark:border-white"
          >
            <option value="" className="rounded hover:bg-red-500 ">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} / {faqs.length} FAQs
        </div>
      </div>

      <div className="space-y-3 h-[calc(100vh-430px)] overflow-auto">
        {filtered.map((f) => (
          <div
            key={f.id}
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow s"
          >
            <div className="flex justify-between items-start">
              <div className="max-w-[75%]">
                <div className="font-medium text-gray-800 dark:text-gray-100">{f.question}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-3">{f.answer}</div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {f.category ? <span className="mr-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{f.category}</span> : null}
                  {(f.tags || []).map((t) => (
                    <span key={t} className="mr-2 px-2 py-1 bg-gray-50 dark:bg-gray-700 rounded text-xs">{t}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-xs text-gray-400">{new Date(f.updatedAt || "").toLocaleString()}</div>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(f)} className="px-2 py-1 text-sm text-gray-900 bg-gray-300 dark:bg-gray-400 rounded">Edit</button>
                  <button onClick={() => onDelete(f.id)} className="px-2 py-1 text-sm bg-red-50 text-red-600 rounded">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center text-gray-500 dark:text-gray-400 p-6">No FAQs found.</div>}
      </div>
    </>
  );
}

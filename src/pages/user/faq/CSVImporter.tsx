import { useState } from "react";
import type { FAQItem } from "./FAQForm";

type Props = {
  onImport: (items: FAQItem[]) => void;
};

function parseCSV(text: string): string[][] {
  // very small CSV parser (handles quoted commas simply)
  const rows: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (ch === '"' && !inQuotes) {
      inQuotes = true;
      continue;
    }
    if (ch === '"' && inQuotes && next === '"') {
      // escaped quote
      cur += '"';
      i++;
      continue;
    }
    if (ch === '"' && inQuotes) {
      inQuotes = false;
      continue;
    }
    if (ch === "\n" && !inQuotes) {
      rows.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  if (cur) rows.push(cur);

  return rows.map((r) => {
    const cols: string[] = [];
    let cell = "";
    let q = false;
    for (let i = 0; i < r.length; i++) {
      const ch = r[i];
      if (ch === '"' && !q) {
        q = true;
        continue;
      }
      if (ch === '"' && q && r[i + 1] === '"') {
        cell += '"';
        i++;
        continue;
      }
      if (ch === '"' && q) {
        q = false;
        continue;
      }
      if (ch === "," && !q) {
        cols.push(cell);
        cell = "";
        continue;
      }
      cell += ch;
    }
    cols.push(cell);
    return cols;
  });
}

export default function CsvImporter({ onImport }: Props) {
  const [preview, setPreview] = useState<FAQItem[] | null>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const rows = parseCSV(text);
      if (rows.length === 0) {
        alert("Empty CSV");
        return;
      }
      const headers = rows[0].map((h) => h.trim().toLowerCase());
      const qIdx = headers.indexOf("question");
      const aIdx = headers.indexOf("answer");
      const cIdx = headers.indexOf("category");
      const tIdx = headers.indexOf("tags");

      if (qIdx === -1 || aIdx === -1) {
        alert("CSV must include headers: question,answer (optional: category,tags)");
        return;
      }

      const items: FAQItem[] = [];
      for (let i = 1; i < rows.length; i++) {
        const cols = rows[i];
        if (!cols[qIdx] || !cols[aIdx]) continue;
        items.push({
          id: `csv_${Date.now()}_${i}`,
          question: cols[qIdx].trim(),
          answer: cols[aIdx].trim(),
          category: cIdx >= 0 ? (cols[cIdx] || "").trim() || undefined : undefined,
          tags: tIdx >= 0 ? (cols[tIdx] || "").split(",").map((t) => t.trim()).filter(Boolean) : undefined,
          updatedAt: new Date().toISOString(),
        });
      }
      setPreview(items);
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow ">
      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Bulk Import (CSV)</h4>
      <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        CSV headers required: <code>question,answer</code> (optional: <code>category,tags</code>)
      </div>

      <input
        type="file"
        accept=".csv,text/csv"
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
        className="mb-3 text-gray-900 dark:text-gray-100 border border-gray-100 dark:border-gray-700 "
      />

      {preview && (
        <>
          <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">Preview ({preview.length})</div>
          <div className="max-h-48 overflow-auto mb-3 space-y-2">
            {preview.slice(0, 25).map((p) => (
              <div key={p.id} className="p-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-700">
                <div className="font-medium text-sm text-gray-800 dark:text-gray-100">{p.question}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{p.answer}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{p.category}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                onImport(preview);
                setPreview(null);
              }}
              className="px-3 py-2 bg-green-600 text-white rounded"
            >
              Import
            </button>
            <button onClick={() => setPreview(null)} className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded">
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

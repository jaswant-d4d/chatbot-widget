
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
  updatedAt?: string;
};

type Props = {
  initial?: Partial<FAQItem>;
  categories: string[];
  onSave: (f: FAQItem) => void;
  onCancel?: () => void;
};

export default function FAQForm({ initial = {}, categories, onSave, onCancel }: Props) {
  const [question, setQuestion] = useState(initial.question || "");
  const [answer, setAnswer] = useState(initial.answer || "");
  const [category, setCategory] = useState(initial.category || "");
  const [tags, setTags] = useState((initial.tags || []).join(", "));

  useEffect(() => {
    setQuestion(initial.question || "");
    setAnswer(initial.answer || "");
    setCategory(initial.category || "");
    setTags((initial.tags || []).join(", "));
  }, [initial]);

  const handleSave = () => {
    if (!question.trim() || !answer.trim()) {
      alert("Question and Answer are required.");
      return;
    }
    const item = {
      id: initial.id || `faq_${Date.now()}`,
      question: question.trim(),
      answer: answer.trim(),
      category: category || undefined,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      updatedAt: new Date().toISOString(),
    };
    onSave(item);
  };

  return (
    <form className="text-gray-900  dark:text-white">
      <div className="mb-3">
        <label className="block text-sm font-medium">Question</label>
        <input
          className="mt-1 w-full p-2 rounded-md border dark:border-white focus:ring-2 focus:ring-black"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. How to track my order?"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Answer</label>
        <textarea
          rows={5}
          className="mt-1 w-full p-2 rounded-md border dark:border-white focus:ring-2 focus:ring-black"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type the answer or paste from docs..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full p-2 rounded-md border dark:bg-gray-700 dark:border-white focus:ring-2 focus:ring-black"
          >
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300">Tags (comma)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 w-full p-2 rounded-md border dark:border-white focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button label="Save FAQ" onClick={handleSave} />
        {onCancel && (
          <Button label="Cancel" variant="secondary" onClick={onCancel} className="" />
        )}
      </div>
    </form>
  );
}

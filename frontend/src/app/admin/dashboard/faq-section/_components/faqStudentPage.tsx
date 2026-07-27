import { useState, useEffect } from "react";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { IconButton } from "@/components/atoms/Button";
import { useGetCandidateBoxQuery } from "@/hooks/admin/useGetFaqsStudentBoxQuesry";
import { useDeleteFaqsMutation } from "@/hooks/admin/useDeleteFaqsMutation";
import { useAddFaqsBoxDataMutation } from "@/hooks/admin/useAddFaqsBoxDataMutation";
import { useUpdateFaqsBoxDataMutation } from "@/hooks/admin/useUpdateFaqsBoxMutation";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}
const FaqCandidate = () => {
  const t = useTranslations();

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const queryClient = useQueryClient();

  const { data, isPending } = useGetCandidateBoxQuery();
  useEffect(() => {
    if (data?.data && data?.data?.length > 0) {
      const formattedFaqs: FAQ[] = data.data.map((item) => ({
        id: String(item.id), // convert number → string
        question: item.question,
        answer: item.answer,
      }));

      setFaqs(formattedFaqs);
    }
  }, [data]);
  const deleteFaqMutation = useDeleteFaqsMutation({
    onSuccess: () => {
      toast.success("Faqs data deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getFaqCandidateBox"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
  const addFaqBoxDataMutation = useAddFaqsBoxDataMutation({
    onSuccess: () => {
      toast.success("Faq box data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["getFaqCandidateBox"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
  const updateFaqBoxDataMutation = useUpdateFaqsBoxDataMutation({
    onSuccess: () => {
      toast.success("Faq box data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["getFaqCandidateBox"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const onSubmit = (values: any) => {
    const payload = {
      question: values?.question,
      answer: values?.answer,
      type: "candidate",
    };
    addFaqBoxDataMutation.mutate(payload);
  };
  const onSubmitUpdate = (values: any) => {
    
    updateFaqBoxDataMutation.mutate(values);
  };

  const handleAdd = () => {
    const q = question.trim();
    const a = answer.trim();
    if (!q || !a) {
      toast.error("Both question and answer are required.");
      return;
    }
    if (q.length > 300 || a.length > 2000) {
      toast.error("Question max 300 chars, answer max 2000 chars.");
      return;
    }
    const newFaq: FAQ = { id: crypto.randomUUID(), question: q, answer: a };
    const updated = [...faqs, newFaq];
    setFaqs(updated);
    onSubmit({
      question: q,
      answer: a,
    });
    setQuestion("");
    setAnswer("");
    // toast.success("FAQ added!");
  };

  const handleDelete = (id: string) => {
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    // saveFaqs(updated);
    // toast.success("FAQ removed.");
  };

  const openEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  };

  const handleUpdate = () => {
    if (!editingFaq) return;
    const q = editQuestion.trim();
    const a = editAnswer.trim();
    if (!q || !a) {
      toast.error("Both question and answer are required.");
      return;
    }
    if (q.length > 300 || a.length > 2000) {
      toast.error("Question max 300 chars, answer max 2000 chars.");
      return;
    }
    const updated = faqs.map((f) =>
      f.id === editingFaq.id ? { ...f, question: q, answer: a } : f
    );
    onSubmitUpdate({
      question: q,
      answer: a,
      id: editingFaq.id,
    });
    setFaqs(updated);
    // saveFaqs(updated);
    setEditingFaq(null);
    // toast.success("FAQ updated!");
  };
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6 w-1/2">
      <h1 className="pb-16">{t("admin.faq-section-candidate")}</h1>
      <h3 className="text-lg font-semibold text-gray-800">Add New FAQ</h3>

      {/* Question Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Question
        </label>
        <input
          type="text"
          placeholder="Enter your FAQ question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={300}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm 
                 focus:ring-2 focus:ring-black focus:outline-none 
                 placeholder:text-gray-400"
        />
        <p className="text-xs text-gray-400 text-right">
          {question.length}/300
        </p>
      </div>

      {/* Answer Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Answer
        </label>
        <textarea
          placeholder="Enter the detailed answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          maxLength={2000}
          rows={5}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm 
                 resize-none focus:ring-2 focus:ring-black focus:outline-none 
                 placeholder:text-gray-400"
        />
        <p className="text-xs text-gray-400 text-right">{answer.length}/2000</p>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          onClick={handleAdd}
          type="button"
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 
                 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Current FAQs ({faqs.length})
        </h3>

        {faqs.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-500">
            No FAQs yet. Add one above!
          </div>
        )}

        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-sm transition"
          >
            {/* Number Badge */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
              {index + 1}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">
                {faq.question}
              </p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {faq.answer}
              </p>
            </div>

            {/* Delete */}

            <button
              onClick={() => openEdit(faq)}
              className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
            >
              <Pencil className="w-4 h-4" />
            </button>
            {/* <button
              onClick={() => handleDelete(faq.id)}
              className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button> */}
            <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        const confirm = window?.confirm(
                           "Are you sure you want to delete this Faqs? This action is irreversible!"
                        );
                        if (confirm) {
                          deleteFaqMutation.mutate({id: faq.id });
                          handleDelete(faq.id)
                        }
                      }}
                      tw="p-1"
                      variant="link"
                      icon={
                        <Trash2 className="w-6 h-6 fill-current text-danger" />
                      }
                    />
          </div>
        ))}
      </div>
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            {/* Header */}
            <h2 className="mb-4 text-lg font-semibold font-display">
              Edit FAQ
            </h2>

            {/* Body */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Question
              </label>
              <input
                type="text"
                placeholder="Question..."
                value={editQuestion}
                onChange={(e) => setEditQuestion(e.target.value)}
                maxLength={300}
                className="w-full rounded-md border px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <label className="block text-sm font-medium text-gray-700">
                Answer
              </label>
              <textarea
                placeholder="Answer..."
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                maxLength={2000}
                rows={4}
                className="w-full resize-none rounded-md border px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditingFaq(null)}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-primary/90"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqCandidate;

import { useQuestions } from "@/store/questions"
import { AnimatePresence } from "framer-motion"
import { MouseEvent } from "react"
import { BiTrashAlt } from "react-icons/bi"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { fadeUp } from "@/lib/motion"

const StoredQuestions = () => {
  const { storedQuestions, applyStoredQuestions, deleteStoredQuestionsById } = useQuestions()

  const handleApplyStoredQuestions = (storedQuestions: Questions.StoredQuestions) => {
    applyStoredQuestions(storedQuestions)
    toast.success("Stored questions applied successfully!")
  }

  const handleDeleteStoredQuestions = (e: MouseEvent, questionsId: string) => {
    e.preventDefault();
    e.stopPropagation();
    deleteStoredQuestionsById(questionsId)
    toast.success("Questions deleted successfully!")
  }

  return (
    <aside>
      <h3 className="mb-4 font-semibold text-lg">Stored Questions</h3>

      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {storedQuestions.map((stored, i) => {
            const formattedDate = new Date(stored.createdAt).toLocaleDateString()
            return (
              <motion.button
                key={stored.id}
                onClick={() => handleApplyStoredQuestions(stored)}
                className="bg-neutral-800 group p-2 rounded-md transition-colors flex flex-col border border-pink-500/30 hover:border-pink-500"
                {...fadeUp}
                transition={{
                  duration: 0.3,
                  delay: i * 0.2
                }}
              >
                <div className="w-full flex items-center justify-between gap-2">
                  <strong className="truncate">{stored.title}</strong>
                  <span className="text-xs text-neutral-500 block whitespace-nowrap flex-shrink-0">{stored.questions.length} questions</span>
                </div>
                <div className="w-full flex items-center justify-between gap-2">
                  <span className="text-sm text-neutral-500">{formattedDate}</span>
                  <button onClick={(e) => handleDeleteStoredQuestions(e, stored.id)} className="opacity-0 group-hover:opacity-100 transition-all text-pink-500 hover:text-pink-400">
                    <BiTrashAlt />
                  </button>
                </div>
              </motion.button>
            )
          })}
        </AnimatePresence>
        {storedQuestions.length <= 0 && (
          <p className="text-neutral-500 text-sm">
            {"You haven't stored any questions yet."}
          </p>
        )}
      </div>
    </aside>
  )
}

export default StoredQuestions
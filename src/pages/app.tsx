import dynamic from "next/dynamic";
import { StartDialog } from "@/components/start-dialog";
import { useQuestions } from "@/store/questions";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/app-header";

const CurrentQuestions = dynamic(() => import('@/components/current-questions'), { ssr: false });
const StoredQuestions = dynamic(() => import('@/components/stored-questions'), { ssr: false });

export default function App() {
  const { currentQuestions } = useQuestions();

  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    if(currentQuestions?.questions?.length <= 0) {
      setOpen(true)
    }
  }, [currentQuestions?.questions?.length])

  return (
    <div className="w-full mb-20">
      <AppHeader />

      <StartDialog open={open} onOpenChange={setOpen} />

      <section className="w-full max-w-[1000px] px-4 mx-auto grid grid-cols-1 md:grid-cols-[1fr,280px] gap-12">
        <CurrentQuestions />
        <StoredQuestions />
      </section>

      <div className="bg-[url(/pattern.png)] bg-no-repeat bg-center absolute inset-0 z-[-1] bg-cover opacity-[0.15]" />
    </div>
  )
}
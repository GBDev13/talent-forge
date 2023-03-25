import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex-col flex p-2 md:p-10">
      <section className="relative overflow-hidden flex-1 rounded-3xl flex items-center justify-center px-4">
        <div className="text-center">
          <motion.h1
            className="text-3xl md:text-6xl font-bold text-pink-500 mb-3"
            {...fadeUp}
          >
            TalentForge
          </motion.h1>
          <motion.p
            className="md:max-w-[330px] mx-auto mb-4 text-xs md:text-base"
            {...fadeUp}
            transition={{
              ...fadeUp.transition,
              delay: 0.3
            }}
          >
            Get expert training for your job interviews and land your dream job.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{
              ...fadeUp.transition,
              delay: 0.5
            }}
          >
            <Link href="/app">
              <button className="bg-white hover:bg-pink-500 hover:text-white transition-all text-neutral-900 px-4 py-1.5 rounded-full">
                Get Started
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="bg-primary-gradient absolute inset-0 z-[-1]"
          initial={{
            opacity: 0,
            y: 150
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </section>
    </div>
  )
}

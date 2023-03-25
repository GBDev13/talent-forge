
import { useQuestions } from "@/store/questions";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Tooltip } from "../ui/tooltip";
import { SaveCurrentQuestionsPopover } from "../save-current-questions-popover";
import { useSettings } from "@/store/settings";
import { generateTTSVoice } from "@/utils/generate-tts-voice";
import { fadeRight, fadeUp } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedText } from "../ui/animated-text";
import AudioPlayer from "../ui/audio-player";

const CurrentQuestions = () => {
  const { currentQuestions, currentQuestionIndex, setCurrentQuestionIndex, storedQuestions } = useQuestions();
  const { ttsVoiceCode } = useSettings();

  const question = currentQuestions.questions?.[currentQuestionIndex];

  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const getAudioByQuestion = useCallback(async () => {
    const base64 = await generateTTSVoice(question?.question, ttsVoiceCode)
    if (base64) {
      setCurrentAudio(base64)
    }
  }, [question?.question, ttsVoiceCode])

  useEffect(() => {
    if (question?.question) {
      getAudioByQuestion()
    }
  }, [getAudioByQuestion, question?.question])

  const handleNextIndex = () => {
    if (currentQuestionIndex + 1 < currentQuestions?.questions?.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
    setShowAnswer(false)
  }

  const handlePrevIndex = () => {
    if (currentQuestionIndex - 1 >= 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
    setShowAnswer(false)
  }

  const isStored = storedQuestions.some(storedQuestion => storedQuestion.id === currentQuestions?.id);

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025
      }
    }
  };

  return (
    <div className="flex flex-col" key={currentQuestions?.questions?.[0]?.question}>
      <motion.header {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="flex items-center justify-between flex-col gap-4 text-center md:text-left md:gap-1 md:flex-row">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Current Questions</h1>
          {currentQuestions?.title && (
            <p className="text-neutral-400">{currentQuestions.title}</p>
          )}
        </div>
        <SaveCurrentQuestionsPopover>
          <div>
            <Tooltip content={isStored ? "This set of questions has already been saved" : "You can save these questions for future use without generating from scratch"}>
              <div>
                <Button disabled={isStored}>
                  Save Current Questions
                </Button>
              </div>
            </Tooltip>
          </div>
        </SaveCurrentQuestionsPopover>
      </motion.header>

      <nav className={clsx("flex items-center gap-2 my-8 sm:my-12", {
        "!gap-1": currentQuestions?.questions?.length >= 10
      })}>
        {currentQuestions?.questions?.map((_, i) => (
          <motion.button
            key={`nav-${i}`}
            onClick={() => setCurrentQuestionIndex(i)}
            className={clsx("h-3 rounded-full bg-neutral-800 flex-[0_1_100%] hover:bg-neutral-700 outline-none focus:outline-none", {
              "!bg-pink-500 hover:!bg-pink-400": i === currentQuestionIndex,
            })}
            {...fadeRight}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeInOut' }}
          />
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.section
          className="text-center"
          initial={{
            x: 100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: 100,
            opacity: 0
          }}
          key={question?.question}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          <div className="flex items-center justify-center min-h-[90px]" key={question?.question}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={container}
            >
              <AnimatedText text={question?.question ?? ""} type="h1" className="text-xl sm:text-3xl font-semibold flex items-center flex-wrap justify-center" />
            </motion.div>
          </div>

          <Button variant="text" className="mx-auto my-4 sm:mt-4 sm:mb-8" onClick={() => setShowAnswer(state => !state)}>
            {showAnswer ? (
              <>
                Hide Example Answer
                <BsEyeSlash size={20} />
              </>
            ) : (
              <>
                Show Example Answer
                <BsEye size={20} />
              </>
            )}
          </Button>

          <AnimatePresence>
            {showAnswer && <motion.p {...fadeUp} transition={{ duration: 0.4 }} className="text-sm sm:text-lg font-light text-neutral-400 mb-8">{question?.answer}</motion.p>}
          </AnimatePresence>

          {currentAudio && (
            <div className="w-full max-w-[400px] mx-auto">
              <AudioPlayer src={currentAudio} />
            </div>
          )}
        </motion.section>
      </AnimatePresence>

      <footer className="mt-6 sm:mt-20 flex items-center justify-between">
        <Button variant="outline" className="min-w-[130px]" onClick={handlePrevIndex} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>

        <Button className="min-w-[130px]" onClick={handleNextIndex} disabled={currentQuestionIndex >= currentQuestions?.questions?.length - 1}>
          Next
        </Button>
      </footer>
    </div>
  )
}

export default CurrentQuestions;
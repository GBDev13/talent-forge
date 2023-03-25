import { useState } from 'react'
import { MdPlaylistAdd, MdSettings } from 'react-icons/md'
import { GenerateQuestionsDialog } from '../generate-questions-dialog'
import { SettingsDialog } from '../settings-dialog'
import { Tooltip } from '../ui/tooltip'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

export const AppHeader = () => {
  const [showGenerateQuestionsDialog, setShowGenerateQuestionsDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)

  const ACTIONS = [
    {
      tooltip: 'Generate new questions',
      icon: <MdPlaylistAdd size={24} />,
      onClick: () => setShowGenerateQuestionsDialog(true)
    },
    {
      tooltip: 'Settings',
      icon: <MdSettings size={20} />,
      onClick: () => setShowSettingsDialog(true)
    }
  ]

  return (
    <>
      <motion.header
        {...fadeUp}
        className="w-full border-b mb-10 border-neutral-800 py-6 max-w-[1000px] px-4 mx-auto flex items-center justify-between"
      >
        <h2 className="text-pink-500 font-semibold text-2xl sm:text-3xl">TalentForge</h2>

        <nav className="flex items-center gap-2">
          {ACTIONS.map((action, i) => (
            <Tooltip key={`action-${i}`} content={action.tooltip}>
              <button className="w-10 h-10 flex items-center justify-center hover:text-pink-500 transition-all rounded bg-neutral-800" onClick={action.onClick}>
                {action.icon}
              </button>
            </Tooltip>
          ))}
        </nav>
      </motion.header>

      <GenerateQuestionsDialog
        open={showGenerateQuestionsDialog}
        onOpenChange={setShowGenerateQuestionsDialog}
      />
      {showSettingsDialog && (
        <SettingsDialog
          open={showSettingsDialog}
          onOpenChange={setShowSettingsDialog}
        />
      )}
    </>
  )
}
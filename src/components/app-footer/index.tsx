import { AiFillHeart } from 'react-icons/ai';

export const AppFooter = () => {
  return (
    <footer className="flex items-center justify-center mt-auto py-5">
      <a href="https://github.com/GBDev13/talent-forge" target="__blank" className="font-light flex items-center gap-1 text-neutral-300 mt-auto">
        Developed with <AiFillHeart className="text-pink-500" />  by <span className="font-semibold underline hover:text-pink-500 transition-colors">GB Dev</span>
      </a>
    </footer>
  )
}
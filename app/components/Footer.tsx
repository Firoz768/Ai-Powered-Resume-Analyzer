import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-auto border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center bg-white/30 dark:bg-slate-900/30 backdrop-blur-md transition-colors duration-300">
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            &copy; {new Date().getFullYear()} ResumAi. All rights reserved.
        </p>
    </footer>
  )
}

export default Footer
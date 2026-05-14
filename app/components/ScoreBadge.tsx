import React from 'react'
import clsx from 'clsx'

interface ScoreBadgeProps {
  score: number
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const badgeColor = score > 70 ? 'emerald' : score > 49 ? 'amber' : 'rose'
  
  const badgeClasses = clsx(
    'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
    {
      'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300': badgeColor === 'emerald',
      'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300': badgeColor === 'amber',
      'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300': badgeColor === 'rose',
    }
  )

  const label =
    score > 70 ? 'Strong' : score > 49 ? 'Good Start' : 'Needs Work'

  return (
    <div className={badgeClasses}>
      <p>{label}</p>
    </div>
  )
}

export default ScoreBadge

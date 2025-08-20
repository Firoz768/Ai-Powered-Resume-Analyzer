import React from 'react'
import clsx from 'clsx'

interface ScoreBadgeProps {
  score: number
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const badgeColor =
    score > 70 ? 'green' : score > 49 ? 'yellow' : 'red'

  const badgeClasses = clsx(
    'bg-badge-' + badgeColor,
    'text-' + badgeColor + '-600',
    'px-2 py-1 rounded-full text-xs font-semibold'
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

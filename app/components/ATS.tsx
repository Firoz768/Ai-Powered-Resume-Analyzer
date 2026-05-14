import { cn } from "~/lib/utils";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl shadow-sm w-full p-8 flex flex-col gap-6 border backdrop-blur-sm transition-colors",
        score > 69
          ? "bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50"
          : score > 49
          ? "bg-amber-50/80 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50"
          : "bg-rose-50/80 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/50"
      )}
    >
      <div className="flex flex-row gap-4 items-center border-b border-black/5 dark:border-white/5 pb-4">
        <img
          src={
            score > 69
              ? "/icons/ats-good.svg"
              : score > 49
              ? "/icons/ats-warning.svg"
              : "/icons/ats-bad.svg"
          }
          alt="ATS"
          className="w-10 h-10 drop-shadow-sm"
        />
        <p className="text-2xl font-bold text-slate-900 dark:text-white">ATS Score - {score}/100</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-lg text-slate-800 dark:text-slate-200">
          How well does your resume pass through Applicant Tracking Systems?
        </p>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed -mt-2">
          Your resume was scanned like an employer would. Here's how it performed:
        </p>
        
        <div className="flex flex-col gap-3 mt-2">
          {suggestions.map((suggestion, index) => (
            <div className={cn(
              "flex flex-row gap-3 items-start p-3 rounded-xl border",
              suggestion.type === "good" 
                ? "bg-white/60 dark:bg-slate-800/40 border-emerald-100 dark:border-emerald-800/30" 
                : "bg-white/60 dark:bg-slate-800/40 border-amber-100 dark:border-amber-800/30"
            )} key={index}>
              <img
                src={
                  suggestion.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="ATS"
                className="w-5 h-5 mt-0.5 shrink-0"
              />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{suggestion.tip}</p>
            </div>
          ))}
        </div>

        <p className="text-sm font-medium text-slate-500 dark:text-slate-500 mt-4 italic">
          Want a better score? Improve your resume by applying the suggestions listed above.
        </p>
      </div>
    </div>
  );
};

export default ATS;
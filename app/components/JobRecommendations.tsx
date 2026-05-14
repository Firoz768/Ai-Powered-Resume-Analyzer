const JobRecommendations = ({ recommendations }: { recommendations: { jobTitle: string; company: string; matchPercentage: number; reason: string; }[] | undefined }) => {
    if (!recommendations || recommendations.length === 0) return null;

    return (
        <section className="glass-panel p-8 flex flex-col gap-6 shadow-md dark:shadow-none animate-fade-in-up">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Job Recommendations
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2">Based on your resume score and experience, here are some roles and companies that might be a great fit for you.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((job, idx) => (
                    <div key={idx} className="bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:-translate-y-1">
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{job.jobTitle}</h4>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">at {job.company || 'Various Companies'}</p>
                            </div>
                            <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                                {job.matchPercentage}% Match
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {job.reason}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default JobRecommendations;

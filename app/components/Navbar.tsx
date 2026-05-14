import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/auth");
      setIsMobileMenuOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <nav className="navbar relative" >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
          <p className="text-2xl font-bold text-gradient" >ResumAi</p>
        </Link>
      </div>

      {/* Desktop Links - Centered */}
      <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        <Link to="/" className="text-sm text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 font-semibold transition-colors">
          Home
        </Link>
        <Link to="/build" className="text-sm text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 font-semibold transition-colors">
          Build Resume
        </Link>
        {auth.isAuthenticated && (
          <button onClick={handleLogout} className="text-sm text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 font-semibold transition-colors cursor-pointer">
            Logout
          </button>
        )}
      </div>

      {/* Right Side (Theme Toggle + Hamburger) */}
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[110%] right-0 w-[200px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 dark:border-slate-700 shadow-xl rounded-2xl flex flex-col p-4 gap-4 md:hidden animate-fade-in-up origin-top-right">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
            Home
          </Link>
          <Link to="/build" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
            Build Resume
          </Link>
          {auth.isAuthenticated && (
            <button onClick={handleLogout} className="text-sm text-left text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
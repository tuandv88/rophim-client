import { Menu, Search, X } from "lucide-react";
import { FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navigationItems } from "../../constants/navigation";
import { useAppStore } from "../../store/useAppStore";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

export function Header() {
  const navigate = useNavigate();
  const { isMobileMenuOpen, searchDraft, setSearchDraft, toggleMobileMenu, closeMobileMenu } = useAppStore();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const keyword = searchDraft.trim();
    if (keyword) {
      navigate(`/search?q=${encodeURIComponent(keyword)}`);
      closeMobileMenu();
    }
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-ink/75 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link to="/" onClick={closeMobileMenu} className="group transition duration-300">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1.5 lg:flex ml-4">
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-semibold text-white/70 transition-all duration-200 hover:bg-white/5 hover:text-white",
                  isActive && "bg-brand/10 text-brand hover:bg-brand/15",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Search Bar */}
        <form
          className="ml-auto hidden w-full max-w-[260px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 transition-all duration-300 focus-within:border-brand/50 focus-within:bg-black/40 focus-within:shadow-[0_0_15px_rgba(229,9,20,0.15)] lg:flex"
          onSubmit={handleSubmit}
        >
          <Search className="h-4 w-4 text-white/40 transition duration-300 group-focus-within:text-brand" aria-hidden="true" />
          <input
            value={searchDraft}
            onChange={(event) => setSearchDraft(event.target.value)}
            className="h-9 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            placeholder="Tìm kiếm phim..."
            type="search"
          />
        </form>

        {/* Mobile Menu Button */}
        <Button
          className="ml-auto h-10 w-10 rounded-full border border-white/10 bg-white/5 p-0 transition-transform active:scale-95 lg:hidden"
          variant="ghost"
          type="button"
          onClick={toggleMobileMenu}
          aria-label="Mở menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-white" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5 text-white" aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* Mobile Sliding Navigation Menu */}
      {isMobileMenuOpen ? (
        <div className="absolute left-0 right-0 top-16 border-b border-white/10 bg-ink/98 px-5 py-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 lg:hidden">
          <form
            className="mb-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 focus-within:border-brand/50 focus-within:bg-black/50"
            onSubmit={handleSubmit}
          >
            <Search className="h-4 w-4 text-white/40" aria-hidden="true" />
            <input
              value={searchDraft}
              onChange={(event) => setSearchDraft(event.target.value)}
              className="h-10 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              placeholder="Tìm phim..."
              type="search"
            />
          </form>
          <nav className="grid max-h-[60vh] gap-1 overflow-y-auto pr-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-white/70 transition-all duration-200 hover:bg-white/5 hover:text-white",
                    isActive && "bg-brand/10 text-brand",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

import { useState } from "react";
import { useAppTheme } from "../../contexts/ThemeContext";

const ThemeToggle = () => {
  const { currentTheme, themes, switchTheme } = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeIcons = {
    light: "☀️",
    dark: "🌙",
    ocean: "🌊",
    forest: "🌲",
    sunset: "🌅",
  };

  const handleThemeChange = (themeName) => {
    switchTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 hover:opacity-80"
        style={{
          backgroundColor: "var(--color-backgroundSecondary)",
          color: "var(--color-textPrimary)",
          border: "1px solid var(--color-border)",
        }}
        aria-label="Toggle theme menu"
      >
        <span className="text-xl">{themeIcons[currentTheme]}</span>
        <span className="hidden font-medium sm:inline">
          {themes[currentTheme]?.name}
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div
            className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-lg shadow-lg"
            style={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="theme-menu"
            >
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200"
                  style={{
                    color:
                      currentTheme === key
                        ? "var(--color-primary)"
                        : "var(--color-textPrimary)",
                    backgroundColor:
                      currentTheme === key
                        ? "var(--color-backgroundTertiary)"
                        : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (currentTheme !== key) {
                      e.currentTarget.style.backgroundColor =
                        "var(--color-cardHover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentTheme !== key) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                  role="menuitem"
                >
                  <span className="text-xl">{themeIcons[key]}</span>
                  <span className="font-medium">{theme.name}</span>
                  {currentTheme === key && (
                    <svg
                      className="ml-auto h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Theme Preview */}
            <div
              className="border-t px-4 py-3"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div
                className="mb-2 text-xs font-medium"
                style={{ color: "var(--color-textSecondary)" }}
              >
                Color Palette
              </div>
              <div className="flex gap-2">
                <div
                  className="h-8 w-8 rounded"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  title="Primary"
                />
                <div
                  className="h-8 w-8 rounded"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                  title="Secondary"
                />
                <div
                  className="h-8 w-8 rounded"
                  style={{ backgroundColor: "var(--color-success)" }}
                  title="Success"
                />
                <div
                  className="h-8 w-8 rounded"
                  style={{ backgroundColor: "var(--color-danger)" }}
                  title="Danger"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeToggle;

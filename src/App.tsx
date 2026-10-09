/**
 * Rompe - Civil Coptic & Ancient Egyptian Calendar
 * 
 * Languages: Coptic, English, Arabic, Ancient Egyptian (hieroglyphic preview)
 * Rules:
 * - Civil Calendar, Year 3127
 * - 13 Months: 12 of 30 days + 13th month with 5 days (6 in leap years)
 * - 10-Day Week (Decad) -> 3 weeks per month
 * - New Year on September 11 (shifts 1 day forward every non-400 century)
 * - Synchronized: Coptic Civil, Gregorian, Hijri
 * - Dark & Light mode
 * - Android Widget setup guide
 * - GitHub: https://github.com/zheynabdellatif/rompe
 * - Footer: مجموعة الدوار
 */

import React, { useState, useEffect } from 'react';
import { 
  getCompleteDateInfo, 
  copticToGregorian 
} from './lib/calendar';
import { SupportedLanguage, TRANSLATIONS } from './lib/translations';
import { TodayHeroView } from './components/TodayHeroView';
import { DecadMonthGrid } from './components/DecadMonthGrid';
import { ThirteenMonthsCatalog } from './components/ThirteenMonthsCatalog';
import { DateConverter } from './components/DateConverter';
import { AndroidWidgetGuide } from './components/AndroidWidgetGuide';
import { TranslationStudio } from './components/TranslationStudio';
import { RompeLogo } from './components/RompeLogo';
import { usePWAInstall } from './lib/usePWAInstall';
import { 
  Sun, 
  Moon, 
  Smartphone, 
  FileText,
  Github
} from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [activeTab, setActiveTab] = useState<'today' | 'month' | 'catalog' | 'converter' | 'widgets' | 'translation'>('today');

  // Base reference date (starts at October 9, 2026)
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    return new Date(Date.UTC(2026, 9, 9, 12, 0, 0));
  });

  const { isInstallable, install } = usePWAInstall();

  // Apply dark mode class to html document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [isDark]);

  // Set RTL direction if Arabic
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);

  const currentDateInfo = getCompleteDateInfo(currentDate);
  const t = TRANSLATIONS[language];

  // Today reference check (October 9, 2026)
  const todayDate = new Date(Date.UTC(2026, 9, 9, 12, 0, 0));
  const isToday = 
    currentDate.getUTCFullYear() === todayDate.getUTCFullYear() &&
    currentDate.getUTCMonth() === todayDate.getUTCMonth() &&
    currentDate.getUTCDate() === todayDate.getUTCDate();

  // Navigation handlers
  const handlePrevDay = () => {
    const next = new Date(currentDate.getTime() - 86400000);
    setCurrentDate(next);
  };

  const handleNextDay = () => {
    const next = new Date(currentDate.getTime() + 86400000);
    setCurrentDate(next);
  };

  const handleJumpToday = () => {
    setCurrentDate(new Date(Date.UTC(2026, 9, 9, 12, 0, 0)));
  };

  const handleSelectCopticDate = (monthIndex: number, day: number) => {
    const nextGDate = copticToGregorian(currentDateInfo.coptic.year, monthIndex, day);
    setCurrentDate(nextGDate);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDark 
        ? 'bg-[#0B0C10] text-neutral-100 bg-obsidian-dark' 
        : 'bg-[#F8F6F0] text-stone-900 bg-papyrus-light'
    }`}>
      {/* =========================================================================
          TOP BAR CONTRACT:
          Zone 1: Brand title, one line (with uploaded emblem logo)
          Zone 2: 4-5 nav links, single-line
          Zone 3: Controls cluster (Language, Theme, GitHub, PWA Install)
      ========================================================================== */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors print:hidden ${
        isDark 
          ? 'bg-[#0B0C10]/95 border-neutral-800/80' 
          : 'bg-white/95 border-stone-200/90 shadow-xs'
      }`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title with Uploaded Logo */}
          <button 
            onClick={() => setActiveTab('today')}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group text-left cursor-pointer"
          >
            <RompeLogo size={36} className="shrink-0 aspect-square" />
            <div className="flex flex-col">
              <span className="font-ancient text-lg font-bold tracking-wider text-stone-900 dark:text-amber-100 group-hover:text-[#1E2B58] dark:group-hover:text-amber-400 transition-colors">
                {t.appTitle}
              </span>
              <span className="text-[10px] text-stone-500 dark:text-neutral-500 font-coptic tracking-normal -mt-1">
                ⲣⲟⲙⲡⲓ · 3127
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Single-Line) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-stone-600 dark:text-neutral-400">
            <button
              onClick={() => setActiveTab('today')}
              className={`hover:text-[#1E2B58] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'today' ? 'text-[#1E2B58] dark:text-amber-400 font-bold' : ''
              }`}
            >
              {t.today}
            </button>
            <button
              onClick={() => setActiveTab('month')}
              className={`hover:text-[#1E2B58] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'month' ? 'text-[#1E2B58] dark:text-amber-400 font-bold' : ''
              }`}
            >
              {t.monthView}
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`hover:text-[#1E2B58] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'catalog' ? 'text-[#1E2B58] dark:text-amber-400 font-bold' : ''
              }`}
            >
              {t.allMonths}
            </button>
            <button
              onClick={() => setActiveTab('converter')}
              className={`hover:text-[#1E2B58] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'converter' ? 'text-[#1E2B58] dark:text-amber-400 font-bold' : ''
              }`}
            >
              {t.converter}
            </button>
            <button
              onClick={() => setActiveTab('widgets')}
              className={`hover:text-[#1E2B58] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 ${
                activeTab === 'widgets' ? 'text-[#1E2B58] dark:text-amber-400 font-bold' : ''
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.widgets}</span>
            </button>
            <button
              onClick={() => setActiveTab('translation')}
              className={`hover:text-[#1E2B58] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 ${
                activeTab === 'translation' ? 'text-[#1E2B58] dark:text-amber-400 font-bold' : ''
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.translationsStudio}</span>
            </button>
          </nav>

          {/* Zone 3: Controls Cluster (Language, Theme, PWA Install) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className={`py-1.5 px-2.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:border-amber-500/50'
                    : 'bg-white border-stone-300 text-stone-800 hover:border-stone-400 shadow-xs'
                }`}
                title={t.languageSelect}
                aria-label={t.languageSelect}
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
                <option value="copt">ⲘⲉⲧⲢⲉⲙⲛ̀ⲭⲏⲙⲓ (Coptic)</option>
                <option value="egypt">𓂋𓈖𓊪𓏏 (Ancient Egyptian)</option>
              </select>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-neutral-900 border-neutral-700 text-amber-300 hover:border-amber-400'
                  : 'bg-white border-stone-300 text-stone-800 hover:border-stone-400 shadow-xs'
              }`}
              title={isDark ? t.lightMode : t.darkMode}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* In-App PWA Install Button */}
            {isInstallable && (
              <button
                onClick={install}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#1E2B58] text-[#FDE08B] hover:bg-[#162145] shadow-xs transition cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{t.installPwa}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="lg:hidden px-4 py-2 border-t border-stone-200 dark:border-neutral-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-3 py-1 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'today'
                ? 'bg-[#1E2B58] text-[#FDE08B] font-semibold'
                : 'text-stone-600 dark:text-neutral-400'
            }`}
          >
            {t.today}
          </button>
          <button
            onClick={() => setActiveTab('month')}
            className={`px-3 py-1 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'month'
                ? 'bg-[#1E2B58] text-[#FDE08B] font-semibold'
                : 'text-stone-600 dark:text-neutral-400'
            }`}
          >
            {t.monthView}
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-[#1E2B58] text-[#FDE08B] font-semibold'
                : 'text-stone-600 dark:text-neutral-400'
            }`}
          >
            {t.allMonths}
          </button>
          <button
            onClick={() => setActiveTab('converter')}
            className={`px-3 py-1 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'converter'
                ? 'bg-[#1E2B58] text-[#FDE08B] font-semibold'
                : 'text-stone-600 dark:text-neutral-400'
            }`}
          >
            {t.converter}
          </button>
          <button
            onClick={() => setActiveTab('widgets')}
            className={`px-3 py-1 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'widgets'
                ? 'bg-[#1E2B58] text-[#FDE08B] font-semibold'
                : 'text-stone-600 dark:text-neutral-400'
            }`}
          >
            {t.widgets}
          </button>
          <button
            onClick={() => setActiveTab('translation')}
            className={`px-3 py-1 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'translation'
                ? 'bg-[#1E2B58] text-[#FDE08B] font-semibold'
                : 'text-stone-600 dark:text-neutral-400'
            }`}
          >
            {t.translationsStudio}
          </button>
        </div>
      </header>

      {/* =========================================================================
          MAIN CONTENT AREA
      ========================================================================== */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12">
        {/* Ancient Egyptian notification banner if Ancient Egyptian selected */}
        {language === 'egypt' && (
          <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200 text-xs flex items-center justify-between gap-2 max-w-4xl mx-auto">
            <span>{t.ancientEgyptianNote}</span>
            <span className="font-serif">𓊹 𓆳</span>
          </div>
        )}

        {/* TAB 1: TODAY HERO VIEW */}
        {activeTab === 'today' && (
          <TodayHeroView
            currentDateInfo={currentDateInfo}
            isToday={isToday}
            onPrevDay={handlePrevDay}
            onNextDay={handleNextDay}
            onJumpToday={handleJumpToday}
            onOpenDatePicker={() => setActiveTab('converter')}
            language={language}
            isDark={isDark}
          />
        )}

        {/* TAB 2: MONTH & 10-DAY DECADS GRID */}
        {activeTab === 'month' && (
          <DecadMonthGrid
            copticYear={currentDateInfo.coptic.year}
            selectedMonthIndex={currentDateInfo.coptic.monthIndex}
            selectedDay={currentDateInfo.coptic.day}
            onSelectDate={handleSelectCopticDate}
            language={language}
            isDark={isDark}
            todayCoptic={{
              year: 3127,
              monthIndex: 1,
              day: 29,
            }}
          />
        )}

        {/* TAB 3: 13 MONTHS CATALOG */}
        {activeTab === 'catalog' && (
          <ThirteenMonthsCatalog
            copticYear={currentDateInfo.coptic.year}
            onSelectMonth={(mIdx) => {
              handleSelectCopticDate(mIdx, 1);
              setActiveTab('month');
            }}
            language={language}
            isDark={isDark}
          />
        )}

        {/* TAB 4: DATE CONVERTER */}
        {activeTab === 'converter' && (
          <DateConverter
            currentDateInfo={currentDateInfo}
            onSetDate={(d) => {
              setCurrentDate(d);
              setActiveTab('today');
            }}
            language={language}
            isDark={isDark}
          />
        )}

        {/* TAB 5: ANDROID WIDGETS (SETUP GUIDE ONLY) */}
        {activeTab === 'widgets' && (
          <AndroidWidgetGuide
            language={language}
            isDark={isDark}
          />
        )}

        {/* TAB 6: TRANSLATION FORM & UPDATABLE PDF */}
        {activeTab === 'translation' && (
          <TranslationStudio
            language={language}
            isDark={isDark}
          />
        )}
      </main>

      {/* =========================================================================
          FOOTER WITH "مجموعة الدوار"
      ========================================================================== */}
      <footer className={`border-t py-8 text-xs transition-colors print:hidden ${
        isDark 
          ? 'border-neutral-900 bg-[#07080a] text-neutral-400' 
          : 'border-stone-200 bg-white text-stone-600'
      }`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <RompeLogo size={22} className="shrink-0 aspect-square" />
            <span className="font-ancient font-bold text-stone-800 dark:text-neutral-200">
              Rompe
            </span>
            <span>·</span>
            <span className="font-coptic">Ⲣⲟⲙⲡⲓ</span>
            <span>·</span>
            <span>3127</span>
          </div>

          <div className="flex items-center gap-4 text-stone-700 dark:text-neutral-300 font-arabic font-bold text-sm">
            <span>مجموعة الدوار</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

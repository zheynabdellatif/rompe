import React, { useState } from 'react';
import { 
  COPTIC_MONTHS, 
  copticToGregorian, 
  gregorianToCoptic, 
  getCompleteDateInfo, 
  CompleteDateInfo,
  isCopticLeapYear
} from '../lib/calendar';
import { SupportedLanguage, TRANSLATIONS } from '../lib/translations';
import { ArrowRightLeft, CalendarCheck, Sparkles } from 'lucide-react';

interface DateConverterProps {
  currentDateInfo: CompleteDateInfo;
  onSetDate: (date: Date) => void;
  language: SupportedLanguage;
  isDark: boolean;
}

export const DateConverter: React.FC<DateConverterProps> = ({
  currentDateInfo,
  onSetDate,
  language,
  isDark,
}) => {
  const t = TRANSLATIONS[language];
  const isRTL = language === 'ar';

  // Mode: 'greg-to-copt' | 'copt-to-greg'
  const [mode, setMode] = useState<'greg-to-copt' | 'copt-to-greg'>('greg-to-copt');

  // Gregorian input states
  const [gYear, setGYear] = useState<number>(currentDateInfo.gregorian.year);
  const [gMonth, setGMonth] = useState<number>(currentDateInfo.gregorian.month);
  const [gDay, setGDay] = useState<number>(currentDateInfo.gregorian.day);

  // Coptic input states
  const [cYear, setCYear] = useState<number>(currentDateInfo.coptic.year);
  const [cMonth, setCMonth] = useState<number>(currentDateInfo.coptic.monthIndex);
  const [cDay, setCDay] = useState<number>(currentDateInfo.coptic.day);

  // Compute live converted date
  const computeConverted = (): CompleteDateInfo => {
    if (mode === 'greg-to-copt') {
      const d = new Date(Date.UTC(gYear, gMonth - 1, gDay, 12, 0, 0));
      return getCompleteDateInfo(d);
    } else {
      const d = copticToGregorian(cYear, cMonth, cDay);
      return getCompleteDateInfo(d);
    }
  };

  const convertedResult = computeConverted();

  // Apply to main view
  const handleApply = () => {
    onSetDate(convertedResult.gregorian.date);
  };

  // Quick Presets
  const applyPreset = (preset: 'today' | 'new_year' | 'intercalary' | 'century') => {
    if (preset === 'today') {
      const d = new Date(Date.UTC(2026, 9, 9, 12, 0, 0));
      setGYear(2026);
      setGMonth(10);
      setGDay(9);
      onSetDate(d);
    } else if (preset === 'new_year') {
      const d = new Date(Date.UTC(2026, 8, 11, 12, 0, 0));
      setGYear(2026);
      setGMonth(9);
      setGDay(11);
      onSetDate(d);
    } else if (preset === 'intercalary') {
      const d = new Date(Date.UTC(2027, 8, 6, 12, 0, 0));
      setGYear(2027);
      setGMonth(9);
      setGDay(6);
      onSetDate(d);
    } else if (preset === 'century') {
      // Century turn: 2100 CE -> Sept 12
      const d = new Date(Date.UTC(2100, 8, 12, 12, 0, 0));
      setGYear(2100);
      setGMonth(9);
      setGDay(12);
      onSetDate(d);
    }
  };

  const isLeap = isCopticLeapYear(cYear);
  const maxCDays = cMonth === 13 ? (isLeap ? 6 : 5) : 30;

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className={`p-6 rounded-2xl border transition-all ${
        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-stone-50 border-stone-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-ancient text-xl font-bold text-stone-900 dark:text-neutral-100">
              {t.converter}
            </h2>
            <p className="text-xs text-stone-500 dark:text-neutral-400">
              {language === 'ar'
                ? 'تحويل دقيق ومتبادل بين التقويم القبطي المدني والميلادي والهجري'
                : 'Exact two-way conversion between Civil Coptic, Gregorian, and Hijri calendars.'}
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-200 dark:bg-neutral-800 rounded-xl">
            <button
              onClick={() => setMode('greg-to-copt')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'greg-to-copt'
                  ? 'bg-white dark:bg-neutral-900 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-stone-600 dark:text-neutral-400'
              }`}
            >
              Gregorian → Coptic
            </button>
            <button
              onClick={() => setMode('copt-to-greg')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'copt-to-greg'
                  ? 'bg-white dark:bg-neutral-900 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-stone-600 dark:text-neutral-400'
              }`}
            >
              Coptic → Gregorian
            </button>
          </div>
        </div>
      </div>

      {/* Main Converter Card */}
      <div className={`p-6 md:p-8 rounded-2xl border transition-all shadow-lg ${
        isDark ? 'bg-neutral-900 border-amber-500/20' : 'bg-white border-stone-200'
      }`}>
        {/* Form Inputs */}
        {mode === 'greg-to-copt' ? (
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {t.selectGregorianDate}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] text-stone-500 dark:text-neutral-400 block mb-1">
                  Year (Gregorian)
                </label>
                <input
                  type="number"
                  value={gYear}
                  onChange={(e) => setGYear(parseInt(e.target.value) || 2026)}
                  className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                    isDark ? 'bg-neutral-950 border-neutral-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-500 dark:text-neutral-400 block mb-1">
                  Month
                </label>
                <select
                  value={gMonth}
                  onChange={(e) => setGMonth(parseInt(e.target.value))}
                  className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                    isDark ? 'bg-neutral-950 border-neutral-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} - {new Date(2026, i, 1).toLocaleString('en', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] text-stone-500 dark:text-neutral-400 block mb-1">
                  Day
                </label>
                <input
                  type="number"
                  min={1}
                  max={31}
                  value={gDay}
                  onChange={(e) => setGDay(Math.min(31, Math.max(1, parseInt(e.target.value) || 1)))}
                  className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                    isDark ? 'bg-neutral-950 border-neutral-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {t.selectCopticDate}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] text-stone-500 dark:text-neutral-400 block mb-1">
                  Civil Year (e.g. 3127)
                </label>
                <input
                  type="number"
                  value={cYear}
                  onChange={(e) => setCYear(parseInt(e.target.value) || 3127)}
                  className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                    isDark ? 'bg-neutral-950 border-neutral-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-500 dark:text-neutral-400 block mb-1">
                  Coptic Month (1–13)
                </label>
                <select
                  value={cMonth}
                  onChange={(e) => setCMonth(parseInt(e.target.value))}
                  className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                    isDark ? 'bg-neutral-950 border-neutral-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                >
                  {COPTIC_MONTHS.map((m) => (
                    <option key={m.index} value={m.index}>
                      {m.index} - {m.nameEnglish} ({m.nameCoptic} / {m.nameArabic})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] text-stone-500 dark:text-neutral-400 block mb-1">
                  Day (1–{maxCDays})
                </label>
                <input
                  type="number"
                  min={1}
                  max={maxCDays}
                  value={cDay}
                  onChange={(e) => setCDay(Math.min(maxCDays, Math.max(1, parseInt(e.target.value) || 1)))}
                  className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                    isDark ? 'bg-neutral-950 border-neutral-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Live Synchronized Results Tablet */}
        <div className={`mt-8 p-6 rounded-xl border space-y-4 ${
          isDark ? 'bg-neutral-950/80 border-neutral-800' : 'bg-stone-50 border-stone-200'
        }`}>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>Synchronized Result</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Coptic Result */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-neutral-500">
                Civil Coptic
              </span>
              <div className="font-ancient text-xl font-bold text-stone-900 dark:text-amber-300">
                {convertedResult.coptic.day} {convertedResult.coptic.month.nameEnglish} {convertedResult.coptic.year}
              </div>
              <div className="text-xs text-stone-500 dark:text-neutral-400">
                {convertedResult.coptic.month.nameCoptic} · {convertedResult.coptic.decadDay.nameEnglish}
              </div>
            </div>

            {/* Gregorian Result */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-neutral-500">
                Gregorian
              </span>
              <div className="font-sans text-lg font-bold text-stone-900 dark:text-neutral-200">
                {convertedResult.gregorian.dayOfWeekName.substring(0, 3)}, {convertedResult.gregorian.monthName} {convertedResult.gregorian.day}, {convertedResult.gregorian.year}
              </div>
              <div className="text-xs text-stone-500 dark:text-neutral-400">
                {convertedResult.gregorian.formatted}
              </div>
            </div>

            {/* Hijri Result */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-neutral-500">
                Hijri
              </span>
              <div className="font-arabic text-lg font-bold text-stone-900 dark:text-neutral-200">
                {convertedResult.hijri.formattedAr}
              </div>
              <div className="text-xs text-stone-500 dark:text-neutral-400">
                {convertedResult.hijri.formattedEn}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleApply}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-amber-600 text-white hover:bg-amber-700 shadow-sm transition cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{language === 'ar' ? 'عرض هذا التاريخ في التقويم' : 'View this Date in Calendar'}</span>
            </button>
          </div>
        </div>

        {/* Quick Historical Presets */}
        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-neutral-800">
          <div className="text-[11px] font-semibold text-stone-500 dark:text-neutral-400 mb-2">
            Quick Historical Anchors:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset('today')}
              className="px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-neutral-700 hover:border-amber-500 text-stone-700 dark:text-neutral-300 transition cursor-pointer"
            >
              Today (Oct 9, 2026 → 29 Tout 3127)
            </button>
            <button
              onClick={() => applyPreset('new_year')}
              className="px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-neutral-700 hover:border-amber-500 text-stone-700 dark:text-neutral-300 transition cursor-pointer"
            >
              Civil New Year (Sept 11, 2026 → 1 Tout 3127)
            </button>
            <button
              onClick={() => applyPreset('intercalary')}
              className="px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-neutral-700 hover:border-amber-500 text-stone-700 dark:text-neutral-300 transition cursor-pointer"
            >
              Epagomenal Days (Sept 6, 2027 → 1 Intercalary)
            </button>
            <button
              onClick={() => applyPreset('century')}
              className="px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-neutral-700 hover:border-amber-500 text-stone-700 dark:text-neutral-300 transition cursor-pointer"
            >
              Century Drift (2100 CE → Sept 12 New Year)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

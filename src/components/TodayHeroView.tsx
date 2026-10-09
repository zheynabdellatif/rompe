import React from 'react';
import { CompleteDateInfo } from '../lib/calendar';
import { SupportedLanguage, TRANSLATIONS } from '../lib/translations';
import { ChevronLeft, ChevronRight, RotateCcw, Calendar as CalendarIcon, Sparkles } from 'lucide-react';

interface TodayHeroViewProps {
  currentDateInfo: CompleteDateInfo;
  isToday: boolean;
  onPrevDay: () => void;
  onNextDay: () => void;
  onJumpToday: () => void;
  onOpenDatePicker: () => void;
  language: SupportedLanguage;
  isDark: boolean;
}

export const TodayHeroView: React.FC<TodayHeroViewProps> = ({
  currentDateInfo,
  isToday,
  onPrevDay,
  onNextDay,
  onJumpToday,
  onOpenDatePicker,
  language,
  isDark,
}) => {
  const t = TRANSLATIONS[language];
  const { coptic, gregorian, hijri } = currentDateInfo;

  const isRTL = language === 'ar';

  // Season badge color and title: Ⲁϧⲓ (Akhe), Ⲫⲣⲱ (Prou), Ϣⲙⲱ (Shmou)
  const getSeasonInfo = () => {
    switch (coptic.month.seasonKey) {
      case 'akhe':
        return {
          title: t.seasonAkhe,
          symbol: '𓄿𓐍𓏏',
          desc: t.akheDesc,
          accent: 'text-amber-700 dark:text-amber-400',
          border: 'border-amber-500/20',
          bg: isDark ? 'bg-amber-500/10' : 'bg-amber-50',
        };
      case 'prou':
        return {
          title: t.seasonProu,
          symbol: '𓉐𓂋𓏏',
          desc: t.prouDesc,
          accent: 'text-emerald-700 dark:text-emerald-400',
          border: 'border-emerald-500/20',
          bg: isDark ? 'bg-emerald-500/10' : 'bg-emerald-50',
        };
      case 'shmou':
        return {
          title: t.seasonShmou,
          symbol: '𓈙𓅓𓅱',
          desc: t.shmouDesc,
          accent: 'text-orange-700 dark:text-orange-400',
          border: 'border-orange-500/20',
          bg: isDark ? 'bg-orange-500/10' : 'bg-orange-50',
        };
      default:
        return {
          title: t.seasonIntercalary,
          symbol: '𓁷𓂋𓇋𓅱𓆳',
          desc: t.intercalaryDays,
          accent: 'text-[#1E2B58] dark:text-amber-300',
          border: 'border-blue-500/20',
          bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
        };
    }
  };

  const season = getSeasonInfo();

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Date Navigation Bar */}
      <div className="flex items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevDay}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-amber-500/50 hover:text-amber-300' 
                : 'bg-white border-stone-200 text-stone-700 hover:border-amber-600/50 hover:text-stone-900 shadow-xs'
            }`}
            title={t.prevDay}
            aria-label={t.prevDay}
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          
          <button
            onClick={onNextDay}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-amber-500/50 hover:text-amber-300' 
                : 'bg-white border-stone-200 text-stone-700 hover:border-amber-600/50 hover:text-stone-900 shadow-xs'
            }`}
            title={t.nextDay}
            aria-label={t.nextDay}
          >
            {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>

          {!isToday && (
            <button
              onClick={onJumpToday}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                  : 'bg-amber-100 border-amber-300 text-amber-950 hover:bg-amber-200 shadow-xs'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.jumpToToday}</span>
            </button>
          )}
        </div>

        <button
          onClick={onOpenDatePicker}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
            isDark
              ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-amber-500/40 hover:text-amber-300'
              : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400 hover:text-stone-900 shadow-xs'
          }`}
        >
          <CalendarIcon className="w-3.5 h-3.5 text-amber-500" />
          <span>{t.convertDate}</span>
        </button>
      </div>

      {/* Main Sanctuary Tablet Card */}
      <div 
        className={`relative overflow-hidden rounded-2xl border transition-all shadow-xl p-6 md:p-10 ${
          isDark 
            ? 'bg-neutral-900/95 border-amber-500/25 shadow-amber-950/20' 
            : 'bg-white border-stone-200/90 shadow-stone-200/60'
        }`}
      >
        {/* Subtle decorative ancient solar disc accent background */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        {/* Top Kicker: Civil Year & Season */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide">
            <span className="font-ancient text-[#1E2B58] dark:text-amber-400 text-sm font-bold">
              {coptic.year}
            </span>
            <span className="text-stone-400 dark:text-neutral-500">·</span>
            <span className="text-stone-600 dark:text-neutral-400 font-medium">
              {t.civilYear}
            </span>
            {coptic.isLeapYear && (
              <>
                <span className="text-stone-400 dark:text-neutral-500">·</span>
                <span className="text-amber-700 dark:text-amber-400/90 font-medium">
                  {language === 'ar' ? 'سنة كبيسة (٦ نسئ)' : language === 'copt' ? 'Ϯⲣⲟⲙⲡⲓ `ⲙⲡⲓⲕⲱⲧ' : 'Leap Year (6 Epagomenae)'}
                </span>
              </>
            )}
          </div>

          {/* Season Indicator */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-semibold ${season.bg} ${season.border}`}>
            <span className="font-serif text-sm">{season.symbol}</span>
            <span className={season.accent}>{season.title}</span>
          </div>
        </div>

        {/* PRIMARY DISPLAY: Coptic Civil Date (Hero) */}
        <div className="py-8 space-y-4">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-700 dark:text-amber-400/90">
            {t.copticDayLabel}
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-6">
            {/* Day Number */}
            <div className="font-ancient text-6xl md:text-8xl font-extrabold tracking-tight text-stone-900 dark:text-amber-100 tabular-nums">
              {coptic.day}
            </div>

            {/* Month & Inscriptions */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-ancient text-3xl md:text-5xl font-bold text-stone-900 dark:text-amber-300">
                  {language === 'copt'
                    ? coptic.month.nameCoptic
                    : language === 'ar'
                    ? coptic.month.nameArabic
                    : coptic.month.nameEnglish}
                </span>
                <span className="font-coptic text-2xl md:text-3xl text-amber-700 dark:text-amber-400/90">
                  {coptic.month.nameCoptic}
                </span>
                <span className="text-xl md:text-2xl text-stone-600 dark:text-neutral-400 font-arabic font-bold">
                  {coptic.month.nameArabic}
                </span>
                <span className="font-serif text-lg md:text-xl text-stone-400 dark:text-neutral-500" title={coptic.month.ancientEgyptian}>
                  {coptic.month.hieroglyph}
                </span>
              </div>

              {/* Month Description */}
              <div className="text-xs text-stone-500 dark:text-neutral-400 flex items-center gap-2">
                <span>{coptic.month.ancientEgyptian}</span>
                <span>·</span>
                <span>{language === 'ar' ? coptic.month.description.ar : coptic.month.description.en}</span>
              </div>
            </div>
          </div>

          {/* If Month 13: Display the Intercalary God Name prominently */}
          {coptic.monthIndex === 13 && coptic.intercalaryGodDay && (
            <div className="pt-2">
              <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                isDark 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' 
                  : 'bg-amber-50/90 border-amber-300 text-amber-950 shadow-xs'
              }`}>
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    {language === 'ar' ? 'يوم إله النسيء:' : 'Intercalary Deity Day:'}
                  </div>
                  <div className="font-ancient text-base font-bold flex items-center gap-2">
                    <span className="font-coptic text-lg">{coptic.intercalaryGodDay.coptic}</span>
                    <span>·</span>
                    <span>{coptic.intercalaryGodDay.english}</span>
                    <span>·</span>
                    <span className="font-arabic">{coptic.intercalaryGodDay.arabic}</span>
                  </div>
                </div>
                <div className="font-serif text-xl">𓊹</div>
              </div>
            </div>
          )}

          {/* 10-Day Decad Indicator (Week) */}
          {coptic.monthIndex < 13 && (
            <div className="pt-2">
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDark 
                  ? 'bg-neutral-950/60 border-neutral-800' 
                  : 'bg-stone-50 border-stone-200/80'
              }`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-neutral-400">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>
                      {coptic.weekIndex === 1
                        ? t.decade1
                        : coptic.weekIndex === 2
                        ? t.decade2
                        : t.decade3}
                    </span>
                    <span>·</span>
                    <span className="font-semibold text-stone-800 dark:text-neutral-200">
                      {language === 'copt'
                        ? coptic.decadDay.nameCoptic
                        : language === 'ar'
                        ? coptic.decadDay.nameArabic
                        : coptic.decadDay.nameEnglish}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 dark:text-neutral-500 flex items-center gap-2">
                    <span>{coptic.decadDay.ancientEgyptian}</span>
                    <span>·</span>
                    <span>{language === 'ar' ? `اليوم ${coptic.dayInWeek} من أصل ١٠` : `Day ${coptic.dayInWeek} of 10-day week`}</span>
                  </div>
                </div>

                {/* Visual 10-Day Decad Progress dots */}
                <div className="flex items-center gap-1.5 self-start sm:self-auto" title={`Day ${coptic.dayInWeek} of 10-day week`}>
                  {Array.from({ length: 10 }).map((_, i) => {
                    const isPassed = i + 1 < coptic.dayInWeek;
                    const isCurrent = i + 1 === coptic.dayInWeek;
                    return (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all ${
                          isCurrent
                            ? 'w-5 bg-amber-500'
                            : isPassed
                            ? 'w-2 bg-amber-500/40 dark:bg-amber-400/30'
                            : 'w-2 bg-stone-300 dark:bg-neutral-800'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECONDARY SYNCHRONIZATION: Gregorian and Hijri Calendars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-stone-200 dark:border-neutral-800">
          {/* Gregorian Date Block */}
          <div className={`p-4 rounded-xl border transition-all ${
            isDark 
              ? 'bg-neutral-950/40 border-neutral-800/80 hover:border-neutral-700' 
              : 'bg-stone-50/80 border-stone-200 hover:border-stone-300'
          }`}>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-neutral-400 mb-1">
              {t.gregorianDayLabel}
            </div>
            <div className="font-sans text-xl md:text-2xl font-bold text-stone-900 dark:text-neutral-100">
              {gregorian.dayOfWeekName}, {gregorian.monthName} {gregorian.day}, {gregorian.year}
            </div>
            <div className="text-xs text-stone-500 dark:text-neutral-500 mt-1">
              {language === 'ar'
                ? `${gregorian.day} / ${gregorian.month} / ${gregorian.year} م`
                : `${gregorian.year}-${String(gregorian.month).padStart(2, '0')}-${String(gregorian.day).padStart(2, '0')}`}
            </div>
          </div>

          {/* Hijri Date Block */}
          <div className={`p-4 rounded-xl border transition-all ${
            isDark 
              ? 'bg-neutral-950/40 border-neutral-800/80 hover:border-neutral-700' 
              : 'bg-stone-50/80 border-stone-200 hover:border-stone-300'
          }`}>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-neutral-400 mb-1">
              {t.hijriDayLabel}
            </div>
            <div className="font-arabic text-xl md:text-2xl font-bold text-stone-900 dark:text-neutral-100">
              {language === 'ar' ? hijri.formattedAr : hijri.formattedEn}
            </div>
            <div className="text-xs text-stone-500 dark:text-neutral-500 mt-1">
              {language === 'ar' ? hijri.formattedEn : hijri.formattedAr}
            </div>
          </div>
        </div>

        {/* Civil Calendar Summary Note */}
        <div className="mt-6 pt-4 border-t border-stone-200/60 dark:border-neutral-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span>𓆳</span>
            <span>{t.civilCalendarNote}</span>
          </div>
          <div>{t.tenDayWeekNote}</div>
        </div>
      </div>
    </div>
  );
};

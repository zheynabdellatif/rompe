import React from 'react';
import { COPTIC_MONTHS, DECAD_DAYS, INTERCALARY_GOD_DAYS, copticToGregorian, isCopticLeapYear } from '../lib/calendar';
import { SupportedLanguage, TRANSLATIONS } from '../lib/translations';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface DecadMonthGridProps {
  copticYear: number;
  selectedMonthIndex: number; // 1 to 13
  selectedDay: number;
  onSelectDate: (monthIndex: number, day: number) => void;
  language: SupportedLanguage;
  isDark: boolean;
  todayCoptic: { year: number; monthIndex: number; day: number };
}

export const DecadMonthGrid: React.FC<DecadMonthGridProps> = ({
  copticYear,
  selectedMonthIndex,
  selectedDay,
  onSelectDate,
  language,
  isDark,
  todayCoptic,
}) => {
  const t = TRANSLATIONS[language];
  const isRTL = language === 'ar';
  const currentMonth = COPTIC_MONTHS[selectedMonthIndex - 1];
  const isLeap = isCopticLeapYear(copticYear);
  const totalDays = currentMonth.daysCount(isLeap);

  // Month navigation
  const handlePrevMonth = () => {
    if (selectedMonthIndex > 1) {
      onSelectDate(selectedMonthIndex - 1, Math.min(selectedDay, COPTIC_MONTHS[selectedMonthIndex - 2].daysCount(isLeap)));
    } else {
      onSelectDate(13, 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonthIndex < 13) {
      onSelectDate(selectedMonthIndex + 1, Math.min(selectedDay, COPTIC_MONTHS[selectedMonthIndex].daysCount(isLeap)));
    } else {
      onSelectDate(1, 1);
    }
  };

  // Coptic numerals for day 1-30
  const copticNumerals = [
    'ⲁ̅', 'ⲃ̅', 'ⲅ̅', 'ⲇ̅', 'ⲉ̅', 'ⲋ̅', 'ⲍ̅', 'ⲏ̅', 'ⲑ̅', 'ⲓ̅',
    'ⲓⲁ̅', 'ⲓⲃ̅', 'ⲓⲅ̅', 'ⲓⲇ̅', 'ⲓⲉ̅', 'ⲓⲋ̅', 'ⲓⲍ̅', 'ⲓⲏ̅', 'ⲓⲑ̅', 'ⲕ̅',
    'ⲕⲁ̅', 'ⲕⲃ̅', 'ⲕⲅ̅', 'ⲕⲇ̅', 'ⲕⲉ̅', 'ⲕⲋ̅', 'ⲕⲍ̅', 'ⲕⲏ̅', 'ⲕⲑ̅', 'ⲗ̅'
  ];

  const getGregorianSubtext = (day: number) => {
    const gDate = copticToGregorian(copticYear, selectedMonthIndex, day);
    const gMonth = gDate.getUTCMonth() + 1;
    const gDay = gDate.getUTCDate();
    return `${gMonth}/${gDay}`;
  };

  const decadHeaders = DECAD_DAYS.map((d) => ({
    number: d.dayNumber,
    name: language === 'copt' ? d.nameCoptic.replace('Ⲡⲓϩⲟⲟⲩ ', '') : language === 'ar' ? `${d.dayNumber}` : `D${d.dayNumber}`,
    hieroglyph: d.hieroglyphNumber,
  }));

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Month Selector Bar */}
      <div className={`p-4 md:p-6 rounded-2xl border transition-all ${
        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevMonth}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isDark 
                ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-amber-300' 
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:text-stone-900'
            }`}
            title="Previous Month"
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2">
              <span className="font-serif text-lg text-amber-500">{currentMonth.hieroglyph}</span>
              <span className="font-ancient text-xl md:text-2xl font-bold text-stone-900 dark:text-amber-300">
                {language === 'copt'
                  ? currentMonth.nameCoptic
                  : language === 'ar'
                  ? currentMonth.nameArabic
                  : currentMonth.nameEnglish}
              </span>
              <span className="text-sm text-stone-400 dark:text-neutral-500 font-coptic">
                ({currentMonth.nameCoptic})
              </span>
            </div>
            <div className="text-xs text-stone-500 dark:text-neutral-400">
              {t.civilYear} {copticYear} · {totalDays} {language === 'ar' ? 'يوماً' : 'days'}
            </div>
          </div>

          <button
            onClick={handleNextMonth}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isDark 
                ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-amber-300' 
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:text-stone-900'
            }`}
            title="Next Month"
          >
            {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Quick Month Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 mt-4 no-scrollbar border-t border-stone-200 dark:border-neutral-800">
          {COPTIC_MONTHS.map((m) => {
            const isSelected = m.index === selectedMonthIndex;
            return (
              <button
                key={m.index}
                onClick={() => onSelectDate(m.index, Math.min(selectedDay, m.daysCount(isLeap)))}
                className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-all cursor-pointer shrink-0 font-medium ${
                  isSelected
                    ? 'bg-[#1E2B58] text-[#FDE08B] dark:bg-amber-500 dark:text-neutral-950 font-bold shadow-xs'
                    : isDark
                    ? 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                }`}
              >
                {language === 'ar' ? m.nameArabic : language === 'copt' ? m.nameCoptic : m.nameEnglish}
              </button>
            );
          })}
        </div>
      </div>

      {/* 10-Day Decad Grid View */}
      <div className={`p-4 md:p-8 rounded-2xl border transition-all shadow-md overflow-x-auto ${
        isDark ? 'bg-neutral-900 border-amber-500/20 shadow-neutral-950/40' : 'bg-white border-stone-200'
      }`}>
        <div className="min-w-[650px]">
          {/* Header row: 10 days of the Decad */}
          <div className="grid grid-cols-10 gap-2 mb-4 pb-3 border-b border-stone-200 dark:border-neutral-800 text-center">
            {decadHeaders.map((dh) => (
              <div key={dh.number} className="space-y-0.5">
                <div className="text-[11px] font-semibold text-stone-600 dark:text-neutral-400">
                  {dh.name}
                </div>
                <div className="text-xs font-serif text-amber-600/70 dark:text-amber-400/60">
                  {dh.hieroglyph}
                </div>
              </div>
            ))}
          </div>

          {/* Grid rows: For standard months, 3 rows of 10 days */}
          {selectedMonthIndex <= 12 ? (
            <div className="space-y-3">
              {[0, 1, 2].map((decadIndex) => {
                const decadName = decadIndex === 0 ? t.decade1 : decadIndex === 1 ? t.decade2 : t.decade3;
                return (
                  <div key={decadIndex} className="space-y-1.5">
                    <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400/90 flex items-center gap-1.5 px-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>{decadName}</span>
                    </div>

                    <div className="grid grid-cols-10 gap-2">
                      {Array.from({ length: 10 }).map((_, colIndex) => {
                        const dayNum = decadIndex * 10 + colIndex + 1;
                        const isSelected = dayNum === selectedDay;
                        const isToday =
                          copticYear === todayCoptic.year &&
                          selectedMonthIndex === todayCoptic.monthIndex &&
                          dayNum === todayCoptic.day;
                        const gregSub = getGregorianSubtext(dayNum);
                        const copticNum = copticNumerals[dayNum - 1] || `${dayNum}`;

                        return (
                          <button
                            key={dayNum}
                            onClick={() => onSelectDate(selectedMonthIndex, dayNum)}
                            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer relative ${
                              isSelected
                                ? 'bg-[#1E2B58] text-[#FDE08B] border-[#1E2B58] dark:bg-amber-500 dark:text-neutral-950 dark:border-amber-400 shadow-md font-bold'
                                : isToday
                                ? isDark
                                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                                  : 'bg-amber-100 border-amber-300 text-amber-950 font-bold'
                                : isDark
                                ? 'bg-neutral-950/60 border-neutral-800 text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800'
                                : 'bg-stone-50/70 border-stone-200 text-stone-800 hover:border-stone-300 hover:bg-stone-100'
                            }`}
                          >
                            <span className="font-ancient text-base tabular-nums">
                              {dayNum}
                            </span>
                            <span className={`text-[10px] font-coptic ${isSelected ? 'text-[#FDE08B] dark:text-neutral-900/90' : 'text-stone-400 dark:text-neutral-500'}`}>
                              {copticNum}
                            </span>
                            <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-[#FDE08B]/90 dark:text-neutral-900/80' : 'text-stone-400 dark:text-neutral-500'}`}>
                              {gregSub}
                            </span>

                            {isToday && !isSelected && (
                              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Month 13: Intercalary Days (5 or 6 deity days) */
            <div className="space-y-4 py-4">
              <div className="text-xs text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {t.intercalaryDays} ({totalDays} {language === 'ar' ? 'أيام مقدسة للآلهة' : 'Deity Epagomenal Days'})
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {INTERCALARY_GOD_DAYS.slice(0, totalDays).map((god) => {
                  const dayNum = god.day;
                  const isSelected = dayNum === selectedDay;
                  const isToday =
                    copticYear === todayCoptic.year &&
                    selectedMonthIndex === todayCoptic.monthIndex &&
                    dayNum === todayCoptic.day;
                  const gregSub = getGregorianSubtext(dayNum);

                  return (
                    <button
                      key={dayNum}
                      onClick={() => onSelectDate(selectedMonthIndex, dayNum)}
                      className={`p-3.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#1E2B58] text-[#FDE08B] border-[#1E2B58] dark:bg-amber-500 dark:text-neutral-950 font-bold shadow-md'
                          : isDark
                          ? 'bg-neutral-950/60 border-neutral-800 text-neutral-200 hover:border-neutral-700'
                          : 'bg-stone-50 border-stone-200 text-stone-800 hover:border-amber-500/50'
                      }`}
                    >
                      <span className="font-ancient text-xl font-bold">{dayNum}</span>
                      <span className="font-coptic text-sm mt-1">{god.coptic}</span>
                      <span className={`text-[11px] font-semibold mt-0.5 ${isSelected ? 'text-[#FDE08B]' : 'text-amber-700 dark:text-amber-400'}`}>
                        {god.english} / {god.arabic}
                      </span>
                      <span className={`text-[9px] mt-1.5 ${isSelected ? 'text-[#FDE08B]/80' : 'text-stone-400 dark:text-neutral-500'}`}>
                        {gregSub}
                      </span>
                      {isToday && !isSelected && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

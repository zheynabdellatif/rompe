import React from 'react';
import { COPTIC_MONTHS, INTERCALARY_GOD_DAYS, isCopticLeapYear } from '../lib/calendar';
import { SupportedLanguage, TRANSLATIONS } from '../lib/translations';

interface ThirteenMonthsCatalogProps {
  copticYear: number;
  onSelectMonth: (monthIndex: number) => void;
  language: SupportedLanguage;
  isDark: boolean;
}

export const ThirteenMonthsCatalog: React.FC<ThirteenMonthsCatalogProps> = ({
  copticYear,
  onSelectMonth,
  language,
  isDark,
}) => {
  const t = TRANSLATIONS[language];
  const isLeap = isCopticLeapYear(copticYear);
  const isRTL = language === 'ar';

  const seasonGroups = [
    {
      id: 'akhe',
      name: t.seasonAkhe,
      hieroglyph: '𓄿𓐍𓏏',
      desc: t.akheDesc,
      months: COPTIC_MONTHS.slice(0, 4),
    },
    {
      id: 'prou',
      name: t.seasonProu,
      hieroglyph: '𓉐𓂋𓏏',
      desc: t.prouDesc,
      months: COPTIC_MONTHS.slice(4, 8),
    },
    {
      id: 'shmou',
      name: t.seasonShmou,
      hieroglyph: '𓈙𓅓𓅱',
      desc: t.shmouDesc,
      months: COPTIC_MONTHS.slice(8, 12),
    },
    {
      id: 'intercalary',
      name: t.seasonIntercalary,
      hieroglyph: '𓁷𓂋𓇋𓅱𓆳',
      desc: isLeap ? '6 Epagomenal Days in Leap Year' : '5 Epagomenal Days in Regular Year',
      months: [COPTIC_MONTHS[12]],
    },
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className={`p-6 rounded-2xl border transition-all ${
        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        <h2 className="font-ancient text-xl font-bold text-stone-900 dark:text-neutral-100 mb-1">
          {t.allMonths} ({copticYear} {t.civilYear})
        </h2>
        <p className="text-xs text-stone-500 dark:text-neutral-400">
          {language === 'ar'
            ? '١٢ شهراً ثابتاً كل شهر ٣٠ يوماً، بالإضافة لشهر النسيء (٥ أو ٦ أيام بأسماء الآلهة).'
            : '12 fixed months of 30 days each, followed by the Intercalary month (5 or 6 deity days).'}
        </p>
      </div>

      <div className="space-y-8">
        {seasonGroups.map((group) => (
          <div key={group.id} className="space-y-4">
            {/* Season header */}
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2 border-b border-stone-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl">{group.hieroglyph}</span>
                <span className="font-ancient text-base font-bold text-stone-900 dark:text-neutral-100">
                  {group.name}
                </span>
              </div>
              <span className="text-xs text-stone-500 dark:text-neutral-400">
                {group.desc}
              </span>
            </div>

            {/* Months grid */}
            <div className={`grid gap-4 ${group.months.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}`}>
              {group.months.map((m) => {
                const days = m.daysCount(isLeap);
                return (
                  <button
                    key={m.index}
                    onClick={() => onSelectMonth(m.index)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer hover:scale-[1.01] ${
                      isDark
                        ? 'bg-neutral-900/80 border-neutral-800 hover:border-amber-500/50 hover:bg-neutral-850'
                        : 'bg-white border-stone-200 hover:border-amber-600/50 hover:bg-stone-50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-ancient text-amber-700 dark:text-amber-400 font-bold">
                        #{m.index}
                      </span>
                      <span className="text-stone-400 dark:text-neutral-500 text-[10px]">
                        {days} {language === 'ar' ? 'يوماً' : 'days'}
                      </span>
                    </div>

                    <div className="font-ancient text-lg font-bold text-stone-900 dark:text-amber-300">
                      {language === 'ar' ? m.nameArabic : language === 'copt' ? m.nameCoptic : m.nameEnglish}
                    </div>

                    <div className="font-coptic text-xs text-stone-500 dark:text-neutral-400 my-0.5">
                      {m.nameCoptic} · {m.ancientEgyptian}
                    </div>

                    <div className="text-[11px] text-stone-500 dark:text-neutral-400 line-clamp-2 mt-2 pt-2 border-t border-stone-100 dark:border-neutral-800">
                      {language === 'ar' ? m.description.ar : m.description.en}
                    </div>

                    {/* If Month 13: list the deity names */}
                    {m.index === 13 && (
                      <div className="mt-3 pt-2 border-t border-stone-100 dark:border-neutral-800 space-y-1 text-[10px]">
                        {INTERCALARY_GOD_DAYS.slice(0, days).map((god) => (
                          <div key={god.day} className="flex items-center justify-between text-stone-600 dark:text-neutral-400">
                            <span className="font-coptic">{god.coptic}</span>
                            <span>{god.english} / {god.arabic}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

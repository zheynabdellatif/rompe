import React, { useState, useEffect } from 'react';
import { COPTIC_MONTHS, DECAD_DAYS, INTERCALARY_GOD_DAYS, SEASONS } from '../lib/calendar';
import { SupportedLanguage, TRANSLATIONS } from '../lib/translations';
import { RompeLogo } from './RompeLogo';
import { Printer, Download, Upload, FileText, Check, RotateCcw, Sparkles } from 'lucide-react';

interface TranslationItem {
  id: string;
  category: string;
  sourceEn: string;
  sourceAr: string;
  sourceCopt?: string;
  note?: string;
}

// Comprehensive catalog of every word and term in Rompe
export const TRANSLATION_CATALOG: TranslationItem[] = [
  // Category 1: Brand & Core Navigation
  { id: 'app_title', category: 'Brand & Header', sourceEn: 'Rompe', sourceAr: 'رُمبِه', sourceCopt: 'Ⲣⲟⲙⲡⲓ', note: 'App name (Year in Coptic)' },
  { id: 'app_sub', category: 'Brand & Header', sourceEn: 'Civil Coptic Calendar', sourceAr: 'التقويم المدني القبطي والمصري', sourceCopt: 'Ⲡⲓⲙⲏⲛⲟⲗⲟⲅⲓⲟⲛ `ⲙⲡⲓⲡⲟⲗⲓⲧⲏⲥ' },
  { id: 'today', category: 'Navigation', sourceEn: 'Today', sourceAr: 'اليوم', sourceCopt: 'Ⲡⲓϩⲟⲟⲩ' },
  { id: 'month_view', category: 'Navigation', sourceEn: 'Month & Decads', sourceAr: 'الشهر والعشريات', sourceCopt: 'Ⲡⲓⲁⲃⲟⲧ ⲛⲉⲙ ⲛⲓⲥⲁⲃⲃⲁⲧⲟⲛ' },
  { id: 'all_months', category: 'Navigation', sourceEn: '13 Months', sourceAr: 'الشهور الـ ١٣', sourceCopt: 'Ⲓⲅ̅ `ⲛⲁⲃⲟⲧ' },
  { id: 'converter', category: 'Navigation', sourceEn: 'Converter', sourceAr: 'محول التواريخ', sourceCopt: 'Ⲡⲓϣⲓⲃϯ' },
  { id: 'widgets', category: 'Navigation', sourceEn: 'Android Widgets', sourceAr: 'ودجات أندرويد', sourceCopt: 'Android Widgets' },
  { id: 'trans_form', category: 'Navigation', sourceEn: 'Translation Form', sourceAr: 'استمارة الترجمة', sourceCopt: 'Ⲡⲓⲫⲟⲣⲙ `ⲛⲟⲩⲱⲧⲉⲃ' },

  // Category 2: Calendars & Dates
  { id: 'copt_date_label', category: 'Calendar Terms', sourceEn: 'Civil Coptic Date', sourceAr: 'التاريخ القبطي المدني', sourceCopt: 'Ⲡⲓϩⲟⲟⲩ `ⲙⲡⲓⲡⲟⲗⲓⲧⲏⲥ `ⲛⲣⲉⲙⲛ̀ⲭⲏⲙⲓ' },
  { id: 'greg_date_label', category: 'Calendar Terms', sourceEn: 'Gregorian Date', sourceAr: 'التاريخ الميلادي', sourceCopt: 'Ⲡⲓϩⲟⲟⲩ `ⲛⲅⲣⲏⲅⲟⲣⲓⲟⲥ' },
  { id: 'hijri_date_label', category: 'Calendar Terms', sourceEn: 'Hijri Date', sourceAr: 'التاريخ الهجري', sourceCopt: 'Ⲡⲓϩⲟⲟⲩ `ⲛϩⲓϫⲣⲓ' },
  { id: 'civil_year', category: 'Calendar Terms', sourceEn: 'Civil Year', sourceAr: 'السنة المدنية', sourceCopt: 'Ϯⲣⲟⲙⲡⲓ `ⲙⲡⲓⲡⲟⲗⲓⲧⲏⲥ', note: 'Year 3127' },
  { id: 'leap_year', category: 'Calendar Terms', sourceEn: 'Leap Year (6 Epagomenae)', sourceAr: 'سنة كبيسة (٦ نسئ)', sourceCopt: 'Ϯⲣⲟⲙⲡⲓ `ⲙⲡⲓⲕⲱⲧ' },
  { id: 'decad_week', category: 'Calendar Terms', sourceEn: 'Decad (10-Day Week)', sourceAr: 'العشرية (أسبوع من ١٠ أيام)', sourceCopt: 'Ϯⲥⲁⲃⲃⲁⲧⲟⲛ (Ⲓ̅ `ⲛϩⲟⲟⲩ)' },
  { id: 'decad_1', category: 'Calendar Terms', sourceEn: '1st Decad (Days 1–10)', sourceAr: 'العشرية الأولى (١ - ١٠)', sourceCopt: 'Ϯⲥⲁⲃⲃⲁⲧⲟⲛ `ⲛϩⲟⲩⲓⲧ' },
  { id: 'decad_2', category: 'Calendar Terms', sourceEn: '2nd Decad (Days 11–20)', sourceAr: 'العشرية الثانية (١١ - ٢٠)', sourceCopt: 'Ϯⲥⲁⲃⲃⲁⲧⲟⲛ `ⲙⲙⲁϩ ⲃ̅' },
  { id: 'decad_3', category: 'Calendar Terms', sourceEn: '3rd Decad (Days 21–30)', sourceAr: 'العشرية الثالثة (٢١ - ٣٠)', sourceCopt: 'Ϯⲥⲁⲃⲃⲁⲧⲟⲛ `ⲙⲙⲁϩ ⲅ̅' },

  // Category 3: The Three Seasons
  { id: 'season_akhe', category: 'The Three Seasons', sourceEn: 'Akhe', sourceAr: 'اخة', sourceCopt: 'Ⲁϧⲓ', note: 'First season (Months 1-4)' },
  { id: 'season_prou', category: 'The Three Seasons', sourceEn: 'Prou', sourceAr: 'پرو', sourceCopt: 'Ⲫⲣⲱ', note: 'Second season (Months 5-8)' },
  { id: 'season_shmou', category: 'The Three Seasons', sourceEn: 'Shmou', sourceAr: 'شمو', sourceCopt: 'Ϣⲙⲱ', note: 'Third season (Months 9-12)' },
  { id: 'season_intercalary', category: 'The Three Seasons', sourceEn: 'The intercalary (Nasi)', sourceAr: 'النسيء', sourceCopt: 'Ⲡⲓⲕⲟⲩϫⲓ `ⲛⲁⲃⲟⲧ', note: 'Month 13 (5 or 6 days)' },

  // Category 4: The 13 Months
  ...COPTIC_MONTHS.map((m) => ({
    id: `month_${m.index}`,
    category: 'The 13 Months',
    sourceEn: m.nameEnglish,
    sourceAr: m.nameArabic,
    sourceCopt: m.nameCoptic,
    note: `Month ${m.index} (${m.index === 13 ? '5/6 days' : '30 days'})`,
  })),

  // Category 5: The 10 Days of the Decad (Week)
  ...DECAD_DAYS.map((d) => ({
    id: `day_${d.dayNumber}`,
    category: '10-Day Decad Days',
    sourceEn: d.nameEnglish,
    sourceAr: d.nameArabic,
    sourceCopt: d.nameCoptic,
    note: `Day ${d.dayNumber} of 10-day week`,
  })),

  // Category 6: The Intercalary God Days (The 13th Month Days)
  ...INTERCALARY_GOD_DAYS.map((g) => ({
    id: `intercalary_day_${g.day}`,
    category: 'Intercalary Deity Days',
    sourceEn: `Day ${g.day}: ${g.english}`,
    sourceAr: `اليوم ${g.day}: ${g.arabic}`,
    sourceCopt: `${g.coptic}`,
    note: g.day === 6 ? 'Leap year only (6th day)' : `Day ${g.day} of Intercalary month`,
  })),

  // Category 7: UI Controls & Actions
  { id: 'next_day', category: 'Actions & Buttons', sourceEn: 'Next Day', sourceAr: 'اليوم التالي', sourceCopt: 'Ⲡⲓϩⲟⲟⲩ `ⲉⲑⲛⲏⲟⲩ' },
  { id: 'prev_day', category: 'Actions & Buttons', sourceEn: 'Previous Day', sourceAr: 'اليوم السابق', sourceCopt: 'Ⲡⲓϩⲟⲟⲩ `ⲉⲧⲁϥⲥⲓⲛⲓ' },
  { id: 'jump_today', category: 'Actions & Buttons', sourceEn: 'Back to Today', sourceAr: 'العودة لليوم', sourceCopt: 'Ⲕⲟⲧⲕ `ⲉⲡⲓϩⲟⲟⲩ' },
  { id: 'sync_date', category: 'Actions & Buttons', sourceEn: 'Synchronize Date', sourceAr: 'تحويل ومطابقة التاريخ', sourceCopt: 'Ⲫⲱⲛϩ `ⲙⲡⲓϩⲟⲟⲩ' },
  { id: 'install_app', category: 'Actions & Buttons', sourceEn: 'Install Rompe App', sourceAr: 'تثبيت تطبيق رُمبِه', sourceCopt: 'Ⲧⲁϩⲟ `ⲙⲡⲓ-App' },
  { id: 'light_theme', category: 'Actions & Buttons', sourceEn: 'Light Theme', sourceAr: 'المظهر الفاتح', sourceCopt: 'Ⲟⲩⲱⲓⲛⲓ' },
  { id: 'dark_theme', category: 'Actions & Buttons', sourceEn: 'Dark Theme', sourceAr: 'المظهر الداكن', sourceCopt: 'Ⲭⲁⲕⲓ' },
  { id: 'footer_group', category: 'Brand & Footer', sourceEn: 'El-Dawar Group', sourceAr: 'مجموعة الدوار', sourceCopt: 'Ⲫⲓⲙⲓϣ `ⲛⲧⲉ ⲡⲓ-Dawar' },
];

interface TranslationStudioProps {
  language: SupportedLanguage;
  isDark: boolean;
}

export const TranslationStudio: React.FC<TranslationStudioProps> = ({
  language,
  isDark,
}) => {
  const [targetLangName, setTargetLangName] = useState<string>('Ancient Egyptian');
  const [translatorName, setTranslatorName] = useState<string>('');
  const [translations, setTranslations] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('rompe_translations_draft');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [savedStatus, setSavedStatus] = useState<boolean>(false);

  // Auto-save drafts
  useEffect(() => {
    try {
      localStorage.setItem('rompe_translations_draft', JSON.stringify(translations));
      setSavedStatus(true);
      const timer = setTimeout(() => setSavedStatus(false), 2000);
      return () => clearTimeout(timer);
    } catch {}
  }, [translations]);

  const handleInputChange = (id: string, value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Trigger browser print to save directly as PDF
  const handlePrintPDF = () => {
    window.print();
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(
      JSON.stringify({
        targetLanguage: targetLangName,
        translator: translatorName,
        exportDate: new Date().toISOString(),
        translations,
      }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `rompe_translation_${targetLangName.toLowerCase().replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Group items by category
  const categories = Array.from(new Set(TRANSLATION_CATALOG.map((i) => i.category)));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Non-print Controls Card */}
      <div className={`p-6 rounded-2xl border transition-all print:hidden ${
        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              <h2 className="font-ancient text-xl font-bold text-stone-900 dark:text-neutral-100">
                Rompe Translation Form & PDF Export
              </h2>
            </div>
            <p className="text-xs text-stone-500 dark:text-neutral-400">
              Fill in translations for any new language. Automatically update and export as an official printable PDF sheet.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrintPDF}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-[#1E2B58] text-[#FDE08B] hover:bg-[#162145] shadow-md transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Export as PDF</span>
            </button>

            <button
              onClick={handleExportJSON}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl border transition cursor-pointer ${
                isDark 
                  ? 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700' 
                  : 'bg-stone-100 border-stone-300 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Form Meta Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-stone-200 dark:border-neutral-800">
          <div>
            <label className="text-xs font-semibold text-stone-600 dark:text-neutral-300 block mb-1">
              Target Language:
            </label>
            <input
              type="text"
              value={targetLangName}
              onChange={(e) => setTargetLangName(e.target.value)}
              placeholder="e.g. Ancient Egyptian, French, Greek, Spanish..."
              className={`w-full p-2.5 rounded-xl border text-xs font-medium ${
                isDark ? 'bg-neutral-950 border-neutral-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-600 dark:text-neutral-300 block mb-1">
              Translator Name (Optional):
            </label>
            <input
              type="text"
              value={translatorName}
              onChange={(e) => setTranslatorName(e.target.value)}
              placeholder="Your name or organization"
              className={`w-full p-2.5 rounded-xl border text-xs font-medium ${
                isDark ? 'bg-neutral-950 border-neutral-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Printable Sheet View: Automatically formats beautifully on screen AND when printed to PDF */}
      <div className={`p-6 md:p-10 rounded-2xl border transition-all shadow-md print:shadow-none print:border-none print:p-0 ${
        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-stone-200'
      }`}>
        {/* PDF Header Header Strip */}
        <div className="pb-6 border-b border-stone-200 dark:border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RompeLogo size={48} />
            <div>
              <h1 className="font-ancient text-2xl font-extrabold text-stone-900 dark:text-neutral-100">
                Rompe (Ⲣⲟⲙⲡⲓ)
              </h1>
              <p className="text-xs text-stone-500 dark:text-neutral-400">
                Civil Coptic Calendar — Master Translation Sheet
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-stone-500 dark:text-neutral-400">
            <div><strong>Target:</strong> {targetLangName || 'New Language'}</div>
            {translatorName && <div><strong>Translator:</strong> {translatorName}</div>}
            <div className="text-[10px] text-stone-400 mt-0.5">مجموعة الدوار</div>
          </div>
        </div>

        {/* Translation Tables Grouped by Category */}
        <div className="space-y-8 mt-6">
          {categories.map((cat) => {
            const items = TRANSLATION_CATALOG.filter((i) => i.category === cat);
            return (
              <div key={cat} className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{cat}</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-neutral-800">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-neutral-950/80 text-neutral-300' : 'bg-stone-100 text-stone-700'}>
                        <th className="p-2.5 font-semibold w-1/4 border-b border-stone-200 dark:border-neutral-800">
                          English Source
                        </th>
                        <th className="p-2.5 font-semibold w-1/4 border-b border-stone-200 dark:border-neutral-800 text-right">
                          Arabic Source
                        </th>
                        <th className="p-2.5 font-semibold w-1/5 border-b border-stone-200 dark:border-neutral-800">
                          Coptic Source
                        </th>
                        <th className="p-2.5 font-semibold w-1/3 border-b border-stone-200 dark:border-neutral-800">
                          {targetLangName || 'Target Language Translation'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-neutral-800">
                      {items.map((item) => (
                        <tr 
                          key={item.id}
                          className={isDark ? 'hover:bg-neutral-800/40' : 'hover:bg-stone-50'}
                        >
                          <td className="p-2.5 font-medium text-stone-900 dark:text-neutral-200">
                            {item.sourceEn}
                            {item.note && (
                              <span className="block text-[10px] text-stone-400 dark:text-neutral-500 font-normal">
                                {item.note}
                              </span>
                            )}
                          </td>
                          <td className="p-2.5 text-right font-arabic text-stone-800 dark:text-neutral-200">
                            {item.sourceAr}
                          </td>
                          <td className="p-2.5 font-coptic text-amber-700 dark:text-amber-400">
                            {item.sourceCopt || '—'}
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={translations[item.id] || ''}
                              onChange={(e) => handleInputChange(item.id, e.target.value)}
                              placeholder={`Translate "${item.sourceEn}"...`}
                              className={`w-full p-1.5 rounded-lg border text-xs font-medium transition ${
                                isDark 
                                  ? 'bg-neutral-950 border-neutral-700 text-white focus:border-amber-400' 
                                  : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                              } print:border-none print:p-0 print:bg-transparent`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        {/* Printable Footer */}
        <div className="mt-8 pt-4 border-t border-stone-200 dark:border-neutral-800 flex items-center justify-between text-xs text-stone-500 dark:text-neutral-400">
          <div>Rompe Translation Registry · Civil Year 3127</div>
          <div className="font-arabic font-semibold">مجموعة الدوار</div>
        </div>
      </div>
    </div>
  );
};

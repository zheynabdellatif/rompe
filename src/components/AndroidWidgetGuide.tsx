import React from 'react';
import { SupportedLanguage, TRANSLATIONS } from '../lib/translations';
import { usePWAInstall } from '../lib/usePWAInstall';
import { Smartphone, CheckCircle, PlusSquare, LayoutGrid, Sparkles } from 'lucide-react';

interface AndroidWidgetGuideProps {
  language: SupportedLanguage;
  isDark: boolean;
}

export const AndroidWidgetGuide: React.FC<AndroidWidgetGuideProps> = ({
  language,
  isDark,
}) => {
  const t = TRANSLATIONS[language];
  const { isInstallable, install } = usePWAInstall();
  const isRTL = language === 'ar';

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-amber-500" />
              <h2 className="font-ancient text-xl font-bold text-stone-900 dark:text-neutral-100">
                {t.androidWidgetTitle}
              </h2>
            </div>
            <p className="text-xs text-stone-500 dark:text-neutral-400">
              {t.androidWidgetSubtitle}
            </p>
          </div>

          {isInstallable && (
            <button
              onClick={install}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-[#1E2B58] text-[#FDE08B] hover:bg-[#162145] shadow-md transition cursor-pointer self-start sm:self-auto"
            >
              <Smartphone className="w-4 h-4" />
              <span>{t.installPwa}</span>
            </button>
          )}
        </div>
      </div>

      {/* Setup Guide Steps */}
      <div className={`p-6 md:p-8 rounded-2xl border transition-all space-y-8 ${
        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Sparkles className="w-4 h-4" />
          <span>{language === 'ar' ? 'خطوات إضافة الودجة لشاشة هاتفك' : 'How to Add Rompe to Android Home Screen'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 ${
            isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-ancient font-bold flex items-center justify-center text-sm border border-amber-500/20">
                1
              </div>
              <h3 className="font-semibold text-sm text-stone-900 dark:text-neutral-100 flex items-center gap-2">
                <PlusSquare className="w-4 h-4 text-amber-500" />
                <span>{language === 'ar' ? 'تثبيت التطبيق على أندرويد' : 'Install Rompe App'}</span>
              </h3>
              <p className="text-xs text-stone-600 dark:text-neutral-300 leading-relaxed">
                {language === 'ar'
                  ? 'اضغط زر "تثبيت تطبيق رُمبِه" بالأعلى أو افتح قائمة المتصفح (⋮) في جوجل كروم واختر "إضافة إلى الشاشة الرئيسية / تثبيت التطبيق".'
                  : 'Tap "Install Rompe App" above, or open the browser menu (⋮) in Google Chrome and tap "Add to Home screen / Install App".'}
              </p>
            </div>
            <div className="text-[11px] font-medium text-amber-700 dark:text-amber-400">
              ✓ {language === 'ar' ? 'تطبيق ويب تقدمي (PWA)' : 'PWA Instant Install'}
            </div>
          </div>

          {/* Step 2 */}
          <div className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 ${
            isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-ancient font-bold flex items-center justify-center text-sm border border-amber-500/20">
                2
              </div>
              <h3 className="font-semibold text-sm text-stone-900 dark:text-neutral-100 flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-amber-500" />
                <span>{language === 'ar' ? 'فتح قائمة الودجات (Widgets)' : 'Open Widgets Picker'}</span>
              </h3>
              <p className="text-xs text-stone-600 dark:text-neutral-300 leading-relaxed">
                {language === 'ar'
                  ? 'المس مع الاستمرار أي مساحة فارغة على شاشة هاتفك الرئيسية، ثم اضغط على أيقونة "التطبيقات المصغرة" أو "الودجات" (Widgets).'
                  : 'Touch and hold any empty area on your Android home screen. Tap the "Widgets" icon at the bottom of the launcher.'}
              </p>
            </div>
            <div className="text-[11px] font-medium text-amber-700 dark:text-amber-400">
              ✓ {language === 'ar' ? 'الشاشة الرئيسية لأندرويد' : 'Android Launcher'}
            </div>
          </div>

          {/* Step 3 */}
          <div className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 ${
            isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-ancient font-bold flex items-center justify-center text-sm border border-amber-500/20">
                3
              </div>
              <h3 className="font-semibold text-sm text-stone-900 dark:text-neutral-100 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                <span>{language === 'ar' ? 'سحب وإفلات الودجة' : 'Place on Home Screen'}</span>
              </h3>
              <p className="text-xs text-stone-600 dark:text-neutral-300 leading-relaxed">
                {language === 'ar'
                  ? 'ابحث عن "Rompe" في القائمة، اختر ودجة التقويم أو اختصار التاريخ المباشر، واسحبها إلى المكان المفضل على شاشتك!'
                  : 'Locate "Rompe" in the list, choose the calendar widget or quick date glance, and drag it to your preferred home screen position!'}
              </p>
            </div>
            <div className="text-[11px] font-medium text-amber-700 dark:text-amber-400">
              ✓ {language === 'ar' ? 'وصول يومي سريع ومباشر' : 'Always at a glance'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

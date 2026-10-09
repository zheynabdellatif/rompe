export type SupportedLanguage = 'en' | 'ar' | 'copt' | 'egypt';

export interface TranslationDictionary {
  appTitle: string;
  appSubtitle: string;
  copticCalendar: string;
  gregorianCalendar: string;
  hijriCalendar: string;
  today: string;
  monthView: string;
  allMonths: string;
  converter: string;
  widgets: string;
  translationsStudio: string;
  copticDayLabel: string;
  gregorianDayLabel: string;
  hijriDayLabel: string;
  civilYear: string;
  week: string;
  dayOfWeek: string;
  decade1: string;
  decade2: string;
  decade3: string;
  intercalaryDays: string;
  // Seasons: Ⲁϧⲓ / Akhe / اخة, Ⲫⲣⲱ / Prou / پرو, Ϣⲙⲱ / Shmou / شمو
  seasonAkhe: string;
  seasonProu: string;
  seasonShmou: string;
  seasonIntercalary: string;
  akheDesc: string;
  prouDesc: string;
  shmouDesc: string;
  nextDay: string;
  prevDay: string;
  jumpToToday: string;
  convertDate: string;
  selectGregorianDate: string;
  selectCopticDate: string;
  androidWidgetTitle: string;
  androidWidgetSubtitle: string;
  addWidgetPrompt: string;
  installPwa: string;
  lightMode: string;
  darkMode: string;
  languageSelect: string;
  ancientEgyptianNote: string;
  tenDayWeekNote: string;
  civilCalendarNote: string;
  footerGroup: string;
  githubRepo: string;
  // Intercalary deity day names
  intercalaryGodDay1: string;
  intercalaryGodDay2: string;
  intercalaryGodDay3: string;
  intercalaryGodDay4: string;
  intercalaryGodDay5: string;
  intercalaryGodDay6: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appTitle: 'Rompe',
    appSubtitle: 'Civil Coptic Calendar',
    copticCalendar: 'Coptic Civil Calendar',
    gregorianCalendar: 'Gregorian Calendar',
    hijriCalendar: 'Hijri Calendar',
    today: 'Today',
    monthView: 'Month & Decads',
    allMonths: '13 Months',
    converter: 'Converter',
    widgets: 'Android Widgets',
    translationsStudio: 'Translation Form',
    copticDayLabel: 'Civil Coptic Date',
    gregorianDayLabel: 'Gregorian Date',
    hijriDayLabel: 'Hijri Date',
    civilYear: 'Civil Year',
    week: 'Decad (Week)',
    dayOfWeek: 'Day of Week',
    decade1: '1st Decad (Days 1–10)',
    decade2: '2nd Decad (Days 11–20)',
    decade3: '3rd Decad (Days 21–30)',
    intercalaryDays: 'Epagomenal Days',
    seasonAkhe: 'Ⲁϧⲓ / Akhe',
    seasonProu: 'Ⲫⲣⲱ / Prou',
    seasonShmou: 'Ϣⲙⲱ / Shmou',
    seasonIntercalary: 'The Intercalary (Nasi)',
    akheDesc: 'First season of the civil year: Inundation and renewal.',
    prouDesc: 'Second season of the civil year: Emergence, sowing, and growth.',
    shmouDesc: 'Third season of the civil year: Golden summer and harvest.',
    nextDay: 'Next Day',
    prevDay: 'Previous Day',
    jumpToToday: 'Back to Today',
    convertDate: 'Synchronize Date',
    selectGregorianDate: 'Select Gregorian Date',
    selectCopticDate: 'Select Coptic Date',
    androidWidgetTitle: 'Android Home Screen Widgets',
    androidWidgetSubtitle: 'Easy step-by-step setup to add Rompe calendar to your Android home screen',
    addWidgetPrompt: 'Add Rompe to Android Home Screen',
    installPwa: 'Install Rompe App',
    lightMode: 'Light Theme',
    darkMode: 'Dark Theme',
    languageSelect: 'Language',
    ancientEgyptianNote: 'Ancient Egyptian language mode is currently under development. Hieroglyphic decans and deity emblems are enabled.',
    tenDayWeekNote: 'Featuring the authentic 10-day week (3 decads per 30-day month).',
    civilCalendarNote: 'Civil Year 3127 · 13 Months · 10-Day Weeks',
    footerGroup: 'مجموعة الدوار',
    githubRepo: 'GitHub Repository',
    intercalaryGodDay1: 'Day 1: Ⲟⲩⲥⲓⲣⲓ (Ousere)',
    intercalaryGodDay2: 'Day 2: Ϩⲱⲣⲱⲣ (Hourur)',
    intercalaryGodDay3: 'Day 3: Ⲥⲏⲧ (Sat)',
    intercalaryGodDay4: 'Day 4: Ⲏⲥⲓ (Ase)',
    intercalaryGodDay5: 'Day 5: Ⲛⲉⲃⲑⲱ (Nabtou)',
    intercalaryGodDay6: 'Day 6: Ϩⲱⲣ (Hour)',
  },
  ar: {
    appTitle: 'رُمبِه (Rompe)',
    appSubtitle: 'التقويم المدني القبطي والمصري',
    copticCalendar: 'التقويم المدني القبطي',
    gregorianCalendar: 'التقويم الميلادي',
    hijriCalendar: 'التقويم الهجري',
    today: 'اليوم',
    monthView: 'الشهر والعشريات',
    allMonths: 'الشهور الـ ١٣',
    converter: 'محول التواريخ',
    widgets: 'ودجات أندرويد',
    translationsStudio: 'استمارة الترجمة',
    copticDayLabel: 'التاريخ القبطي المدني',
    gregorianDayLabel: 'التاريخ الميلادي',
    hijriDayLabel: 'التاريخ الهجري',
    civilYear: 'السنة المدنية',
    week: 'العشرية (الأسبوع)',
    dayOfWeek: 'يوم الأسبوع',
    decade1: 'العشرية الأولى (١ - ١٠)',
    decade2: 'العشرية الثانية (١١ - ٢٠)',
    decade3: 'العشرية الثالثة (٢١ - ٣٠)',
    intercalaryDays: 'أيام النسيء المقحمة',
    seasonAkhe: 'اخة (Ⲁϧⲓ)',
    seasonProu: 'پرو (Ⲫⲣⲱ)',
    seasonShmou: 'شمو (Ϣⲙⲱ)',
    seasonIntercalary: 'النسيء',
    akheDesc: 'الفصل الأول من السنة المدنية: الفيضان والتجدد.',
    prouDesc: 'الفصل الثاني من السنة المدنية: بذر الحبوب وظهور الزرع.',
    shmouDesc: 'الفصل الثالث من السنة المدنية: الصيف وزمن الحصاد.',
    nextDay: 'اليوم التالي',
    prevDay: 'اليوم السابق',
    jumpToToday: 'العودة لليوم',
    convertDate: 'تحويل ومطابقة التاريخ',
    selectGregorianDate: 'اختر تاريخاً ميلادياً',
    selectCopticDate: 'اختر تاريخاً قبطياً',
    androidWidgetTitle: 'ودجات الشاشة الرئيسية لأندرويد',
    androidWidgetSubtitle: 'دليل خطوات إضافة ودجة تقويم رُمبِه لشاشة هاتف أندرويد بسهولة',
    addWidgetPrompt: 'إضافة ودجة للشاشة الرئيسية',
    installPwa: 'تثبيت تطبيق رُمبِه',
    lightMode: 'المظهر الفاتح',
    darkMode: 'المظهر الداكن',
    languageSelect: 'اللغة',
    ancientEgyptianNote: 'دعم اللغة المصرية القديمة قيد التطوير الموسع حالياً. الرموز الهيروغليفية مفعلة.',
    tenDayWeekNote: 'الأسبوع مكون من ١٠ أيام (٣ أسابيع/عشريات في كل شهر).',
    civilCalendarNote: 'السنة المدنية ٣١٢٧ · ١٣ شهراً · أسابيع من ١٠ أيام',
    footerGroup: 'مجموعة الدوار',
    githubRepo: 'مستودع GitHub',
    intercalaryGodDay1: 'اليوم الأول: Ⲟⲩⲥⲓⲣⲓ (وسيري)',
    intercalaryGodDay2: 'اليوم الثاني: Ϩⲱⲣⲱⲣ (حورور)',
    intercalaryGodDay3: 'اليوم الثالث: Ⲥⲏⲧ (ست)',
    intercalaryGodDay4: 'اليوم الرابع: Ⲏⲥⲓ (اسة)',
    intercalaryGodDay5: 'اليوم الخامس: Ⲛⲉⲃⲑⲱ (نبتو)',
    intercalaryGodDay6: 'اليوم السادس: Ϩⲱⲣ (حور)',
  },
  copt: {
    appTitle: 'Ⲣⲟⲙⲡⲓ',
    appSubtitle: 'Ⲡⲓⲙⲏⲛⲟⲗⲟⲅⲓⲟⲛ `ⲙⲡⲓⲡⲟⲗⲓⲧⲏⲥ `ⲛⲣⲉⲙⲛ̀ⲭⲏⲙⲓ',
    copticCalendar: 'Ⲡⲓⲙⲏⲛⲟⲗⲟⲅⲓⲟⲛ `ⲛⲣⲉⲙⲛ̀ⲭⲏⲙⲓ',
    gregorianCalendar: 'Ⲡⲓⲙⲏⲛⲟⲗⲟⲅⲓⲟⲛ `ⲛⲅⲣⲏⲅⲟⲣⲓⲟⲥ',
    hijriCalendar: 'Ⲡⲓⲙⲏⲛⲟⲗⲟⲅⲓⲟⲛ `ⲛϩⲓϫⲣⲓ',
    today: 'Ⲡⲓϩⲟⲟⲩ',
    monthView: 'Ⲡⲓⲁⲃⲟⲧ ⲛⲉⲙ ⲛⲓⲥⲁⲃⲃⲁⲧⲟⲛ',
    allMonths: 'Ⲓⲅ̅ `ⲛⲁⲃⲟⲧ',
    converter: 'Ⲡⲓϣⲓⲃϯ',
    widgets: 'Android Widgets',
    translationsStudio: 'Ⲡⲓⲫⲟⲣⲙ `ⲛⲟⲩⲱⲧⲉⲃ',
    copticDayLabel: 'Ⲡⲓϩⲟⲟⲩ `ⲙⲡⲓⲡⲟⲗⲓⲧⲏⲥ `ⲛⲣⲉⲙⲛ̀ⲭⲏⲙⲓ',
    gregorianDayLabel: 'Ⲡⲓϩⲟⲟⲩ `ⲛⲅⲣⲏⲅⲟⲣⲓⲟⲥ',
    hijriDayLabel: 'Ⲡⲓϩⲟⲟⲩ `ⲛϩⲓϫⲣⲓ',
    civilYear: 'Ϯⲣⲟⲙⲡⲓ `ⲙⲡⲓⲡⲟⲗⲓⲧⲏⲥ',
    week: 'Ϯⲥⲁⲃⲃⲁⲧⲟⲛ (Ⲓ̅ `ⲛϩⲟⲟⲩ)',
    dayOfWeek: 'Ⲡⲓϩⲟⲟⲩ `ⲛⲧⲉ Ϯⲥⲁⲃⲃⲁⲧⲟⲛ',
    decade1: 'Ϯⲥⲁⲃⲃⲁⲧⲟⲛ `ⲛϩⲟⲩⲓⲧ (ⲁ̅-ⲓ̅)',
    decade2: 'Ϯⲥⲁⲃⲃⲁⲧⲟⲛ `ⲙⲙⲁϩ ⲃ̅ (ⲓⲁ̅-ⲕ̅)',
    decade3: 'Ϯⲥⲁⲃⲃⲁⲧⲟⲛ `ⲙⲙⲁϩ ⲅ̅ (ⲕⲁ̅-ⲗ̅)',
    intercalaryDays: 'Ⲡⲓⲕⲟⲩϫⲓ `ⲛⲁⲃⲟⲧ (Ⲉ̅ `ⲛϩⲟⲟⲩ)',
    seasonAkhe: 'Ⲁϧⲓ',
    seasonProu: 'Ⲫⲣⲱ',
    seasonShmou: 'Ϣⲙⲱ',
    seasonIntercalary: 'Ⲡⲓⲕⲟⲩϫⲓ `ⲛⲁⲃⲟⲧ',
    akheDesc: 'Ⲡⲓⲙⲁϩⲁ̅ `ⲛⲥⲏⲟⲩ `ⲛϯⲣⲟⲙⲡⲓ.',
    prouDesc: 'Ⲡⲓⲙⲁϩⲃ̅ `ⲛⲥⲏⲟⲩ `ⲛϯⲣⲟⲙⲡⲓ.',
    shmouDesc: 'Ⲡⲓⲙⲁϩⲅ̅ `ⲛⲥⲏⲟⲩ `ⲛϯⲣⲟⲙⲡⲓ.',
    nextDay: 'Ⲡⲓϩⲟⲟⲩ `ⲉⲑⲛⲏⲟⲩ',
    prevDay: 'Ⲡⲓϩⲟⲟⲩ `ⲉⲧⲁϥⲥⲓⲛⲓ',
    jumpToToday: 'Ⲕⲟⲧⲕ `ⲉⲡⲓϩⲟⲟⲩ',
    convertDate: 'Ⲫⲱⲛϩ `ⲙⲡⲓϩⲟⲟⲩ',
    selectGregorianDate: 'Ⲥⲱⲧⲡ `ⲛⲅⲣⲏⲅⲟⲣⲓⲟⲥ',
    selectCopticDate: 'Ⲥⲱⲧⲡ `ⲛⲣⲉⲙⲛ̀ⲭⲏⲙⲓ',
    androidWidgetTitle: 'Android Widgets `ⲛⲧⲉ Rompe',
    androidWidgetSubtitle: 'Ⲡⲓϫⲱⲕ `ⲛⲧⲉ Android Widget',
    addWidgetPrompt: 'Ⲟⲩⲱϩ Android Widget',
    installPwa: 'Ⲧⲁϩⲟ `ⲙⲡⲓ-App',
    lightMode: 'Ⲟⲩⲱⲓⲛⲓ',
    darkMode: 'Ⲭⲁⲕⲓ',
    languageSelect: 'Ⲧⲁⲥⲡⲓ',
    ancientEgyptianNote: 'Ϯⲁⲥⲡⲓ `ⲛⲬⲏⲙⲓ `ⲛⲁⲡⲁⲥ ⲥⲉⲥⲟⲃϯ `ⲙⲙⲟⲥ.',
    tenDayWeekNote: 'Ⲓ̅ `ⲛϩⲟⲟⲩ ϧⲉⲛ ϯⲥⲁⲃⲃⲁⲧⲟⲛ · Ⲅ̅ `ⲛⲥⲁⲃⲃⲁⲧⲟⲛ ϧⲉⲛ ⲡⲓⲁⲃⲟⲧ.',
    civilCalendarNote: 'Ϯⲣⲟⲙⲡⲓ `ⲙⲡⲓⲡⲟⲗⲓⲧⲏⲥ ⲅ̅ⲣ̅ⲕ̅ⲍ̅ (3127)',
    footerGroup: 'مجموعة الدوار',
    githubRepo: 'GitHub Repo',
    intercalaryGodDay1: 'Ⲁ̅ `ⲛϩⲟⲟⲩ: Ⲟⲩⲥⲓⲣⲓ',
    intercalaryGodDay2: 'Ⲃ̅ `ⲛϩⲟⲟⲩ: Ϩⲱⲣⲱⲣ',
    intercalaryGodDay3: 'Ⲅ̅ `ⲛϩⲟⲟⲩ: Ⲥⲏⲧ',
    intercalaryGodDay4: 'Ⲇ̅ `ⲛϩⲟⲟⲩ: Ⲏⲥⲓ',
    intercalaryGodDay5: 'Ⲉ̅ `ⲛϩⲟⲟⲩ: Ⲛⲉⲃⲑⲱ',
    intercalaryGodDay6: 'ⲋ̅ `ⲛϩⲟⲟⲩ: Ϩⲱⲣ',
  },
  egypt: {
    appTitle: '𓂋𓈖𓊪𓏏 (Renpet / Rompe)',
    appSubtitle: 'Civil Egyptian Calendar',
    copticCalendar: '𓇹 𓏤 𓆳 (Civil Decan Calendar)',
    gregorianCalendar: 'Civil Western (Gregorian)',
    hijriCalendar: 'Lunar Crescent (Hijri)',
    today: '𓉔𓂋𓅱 (Today)',
    monthView: '𓇹 𓎆𓎆𓎆 (3 Decads of Month)',
    allMonths: '𓇹 𓎆𓏼 (13 Months Cycle)',
    converter: '𓂝𓈎𓄿 (Harmonizer)',
    widgets: 'Android 𓊹 Widgets',
    translationsStudio: '𓏞 Translation Palette',
    copticDayLabel: '𓆳 𓏤 Civil Nile Cycle',
    gregorianDayLabel: 'Solar Horizon (Gregorian)',
    hijriDayLabel: 'Lunar Phase (Hijri)',
    civilYear: '𓆳 Year of the Sun',
    week: '𓇳 𓎆 (10-Day Decad)',
    dayOfWeek: '𓇳 Decan Day',
    decade1: '𓎆 1st Decad (𓏺 to 𓎆)',
    decade2: '𓎆 2nd Decad (𓎆𓏺 to 𓎆𓎆)',
    decade3: '𓎆 3rd Decad (𓎆𓎆𓏺 to 𓎆𓎆𓎆)',
    intercalaryDays: '𓁷𓂋𓇋𓅱𓆳 Epagomenae',
    seasonAkhe: 'Ⲁϧⲓ (Akhe / 𓄿𓐍𓏏)',
    seasonProu: 'Ⲫⲣⲱ (Prou / 𓉐𓂋𓏏)',
    seasonShmou: 'Ϣⲙⲱ (Shmou / 𓈙𓅓𓅱)',
    seasonIntercalary: '𓁷𓂋𓇋𓅱𓆳 Epagomenae',
    akheDesc: 'First season: Inundation and solar renewal.',
    prouDesc: 'Second season: Emergence of the soil and green shoots.',
    shmouDesc: 'Third season: Golden grain harvest.',
    nextDay: 'Next Solar Dawn',
    prevDay: 'Previous Solar Dusk',
    jumpToToday: 'Center on Today',
    convertDate: 'Align Heavenly Cycles',
    selectGregorianDate: 'Select Solar Date',
    selectCopticDate: 'Select Civil Month & Day',
    androidWidgetTitle: 'Android Home Screen Widgets',
    androidWidgetSubtitle: 'Easy step-by-step setup to add Rompe calendar to your Android home screen',
    addWidgetPrompt: 'Place Widget on Android Screen',
    installPwa: 'Install Rompe Sanctuary',
    lightMode: 'Sunlit Papyrus',
    darkMode: 'Obsidian Night',
    languageSelect: 'Sacred Script',
    ancientEgyptianNote: 'Ancient Egyptian hieroglyphic mode preview active. Gardner signs enabled.',
    tenDayWeekNote: 'Governed by 36 decans: each 10 days marks a distinct stellar constellation.',
    civilCalendarNote: 'Civil Nile Epoch 3127 · 13 Months · 10-Day Weeks',
    footerGroup: 'مجموعة الدوار',
    githubRepo: 'GitHub Sanctuary',
    intercalaryGodDay1: 'Day 1: Ⲟⲩⲥⲓⲣⲓ (Ousere / Osiris)',
    intercalaryGodDay2: 'Day 2: Ϩⲱⲣⲱⲣ (Hourur / Horus the Elder)',
    intercalaryGodDay3: 'Day 3: Ⲥⲏⲧ (Sat / Set)',
    intercalaryGodDay4: 'Day 4: Ⲏⲥⲓ (Ase / Isis)',
    intercalaryGodDay5: 'Day 5: Ⲛⲉⲃⲑⲱ (Nabtou / Nephthys)',
    intercalaryGodDay6: 'Day 6: Ϩⲱⲣ (Hour / Horus)',
  },
};

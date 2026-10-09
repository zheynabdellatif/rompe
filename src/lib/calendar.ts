/**
 * Rompe - Civil Coptic & Ancient Egyptian Calendar Engine
 * 
 * Rules:
 * - 13 Months: 12 months of 30 days, 13th month (Pi Kouji Enavot) has 5 days (6 in leap years)
 * - 10-day week (3 weeks / decads per month)
 * - Civil Year (Year 3127)
 * - New Year (1 Tout) starts on September 11 (shifting 1 day forward every non-400 century)
 * - Reference anchor: October 9, 2026 = 29 Tout 3127 = 28 Rabi' al-Thani 1446 AH
 * 
 * Seasons:
 * 1. Ⲁϧⲓ / Akhe / اخة (Months 1-4)
 * 2. Ⲫⲣⲱ / Prou / پرو (Months 5-8)
 * 3. Ϣⲙⲱ / Shmou / شمو (Months 9-12)
 * 
 * Intercalary Days (The 13th month deity days):
 * Day 1: Ⲟⲩⲥⲓⲣⲓ / Ousere / وسيري
 * Day 2: Ϩⲱⲣⲱⲣ / Hourur / حورور
 * Day 3: Ⲥⲏⲧ / Sat / ست
 * Day 4: Ⲏⲥⲓ / Ase / اسة
 * Day 5: Ⲛⲉⲃⲑⲱ / Nabtou / نبتو
 * Day 6 (in leap year): Ϩⲱⲣ / Hour / حور
 */

export interface IntercalaryGodDay {
  day: number;
  coptic: string;
  english: string;
  arabic: string;
}

export const INTERCALARY_GOD_DAYS: IntercalaryGodDay[] = [
  { day: 1, coptic: 'Ⲟⲩⲥⲓⲣⲓ', english: 'Ousere', arabic: 'وسيري' },
  { day: 2, coptic: 'Ϩⲱⲣⲱⲣ', english: 'Hourur', arabic: 'حورور' },
  { day: 3, coptic: 'Ⲥⲏⲧ', english: 'Sat', arabic: 'ست' },
  { day: 4, coptic: 'Ⲏⲥⲓ', english: 'Ase', arabic: 'اسة' },
  { day: 5, coptic: 'Ⲛⲉⲃⲑⲱ', english: 'Nabtou', arabic: 'نبتو' },
  { day: 6, coptic: 'Ϩⲱⲣ', english: 'Hour', arabic: 'حور' },
];

export interface SeasonInfo {
  id: 'akhe' | 'prou' | 'shmou' | 'intercalary';
  coptic: string;
  english: string;
  arabic: string;
  hieroglyph: string;
}

export const SEASONS: Record<string, SeasonInfo> = {
  akhe: {
    id: 'akhe',
    coptic: 'Ⲁϧⲓ',
    english: 'Akhe',
    arabic: 'اخة',
    hieroglyph: '𓄿𓐍𓏏',
  },
  prou: {
    id: 'prou',
    coptic: 'Ⲫⲣⲱ',
    english: 'Prou',
    arabic: 'پرو',
    hieroglyph: '𓉐𓂋𓏏',
  },
  shmou: {
    id: 'shmou',
    coptic: 'Ϣⲙⲱ',
    english: 'Shmou',
    arabic: 'شمو',
    hieroglyph: '𓈙𓅓𓅱',
  },
  intercalary: {
    id: 'intercalary',
    coptic: 'Ⲡⲓⲕⲟⲩϫⲓ `ⲛⲁⲃⲟⲧ',
    english: 'The intercalary',
    arabic: 'النسيء',
    hieroglyph: '𓁷𓂋𓇋𓅱𓆳',
  },
};

export interface CopticMonth {
  index: number; // 1 to 13
  nameCoptic: string;
  nameEnglish: string;
  nameArabic: string;
  ancientEgyptian: string;
  hieroglyph: string;
  seasonKey: 'akhe' | 'prou' | 'shmou' | 'intercalary';
  daysCount: (isLeap: boolean) => number;
  description: {
    en: string;
    ar: string;
    copt: string;
  };
}

export const COPTIC_MONTHS: CopticMonth[] = [
  {
    index: 1,
    nameCoptic: 'Ⲑⲱⲟⲩⲧ',
    nameEnglish: 'Tout',
    nameArabic: 'توت',
    ancientEgyptian: 'Djehuty (Thoth)',
    hieroglyph: '𓅝𓏏𓏭',
    seasonKey: 'akhe',
    daysCount: () => 30,
    description: {
      en: 'First month of Akhe. Dedicated to Djehuty (Thoth), lord of wisdom, writing, and time.',
      ar: 'أول شهور فصل اخة (Ⲁϧⲓ). منسوب لتحوت رب الحكمة وحساب الزمن.',
      copt: 'Ⲡⲓⲁⲃⲟⲧ `ⲛϩⲟⲩⲓⲧ `ⲛⲧⲉ Ⲁϧⲓ · Ⲑⲱⲟⲩⲧ ⲡⲓⲥⲁⲃⲉ.',
    },
  },
  {
    index: 2,
    nameCoptic: 'Ⲡⲁⲟⲡⲓ',
    nameEnglish: 'Paope',
    nameArabic: 'بابه',
    ancientEgyptian: 'Pa-en-Ipet',
    hieroglyph: '𓅯𓄿𓈖𓇋𓊪𓏏',
    seasonKey: 'akhe',
    daysCount: () => 30,
    description: {
      en: 'Second month of Akhe. Dedicated to the great Opet festival celebrating Amun-Ra.',
      ar: 'الشهر الثاني من فصل اخة (Ⲁϧⲓ). منسوب لعيد أوبت لآمون رع.',
      copt: 'Ⲡⲓⲙⲁϩⲃ̅ `ⲛⲁⲃⲟⲧ `ⲛⲧⲉ Ⲁϧⲓ · Ⲡⲁⲟⲡⲓ.',
    },
  },
  {
    index: 3,
    nameCoptic: 'Ⲁⲑⲱⲣ',
    nameEnglish: 'Atour',
    nameArabic: 'هاتور',
    ancientEgyptian: 'Het-Heru (Hathor)',
    hieroglyph: '𓉗𓏏𓁷𓂋𓏏',
    seasonKey: 'akhe',
    daysCount: () => 30,
    description: {
      en: 'Third month of Akhe. Dedicated to Het-Heru (Hathor), lady of love and beauty.',
      ar: 'الشهر الثالث من فصل اخة (Ⲁϧⲓ). منسوب للإلهة حتحور سيدة الجمال والمحبة.',
      copt: 'Ⲡⲓⲙⲁϩⲅ̅ `ⲛⲁⲃⲟⲧ `ⲛⲧⲉ Ⲁϧⲓ · Ⲁⲑⲱⲣ.',
    },
  },
  {
    index: 4,
    nameCoptic: 'Ⲭⲟⲓⲁⲕ',
    nameEnglish: 'Koiak',
    nameArabic: 'كيهك',
    ancientEgyptian: 'Ka-her-Ka',
    hieroglyph: '𓎡𓄿𓁷𓂋𓎡𓄿',
    seasonKey: 'akhe',
    daysCount: () => 30,
    description: {
      en: 'Fourth month of Akhe. Sacred season of seed renewal and Osiris mysteries.',
      ar: 'الشهر الرابع من فصل اخة (Ⲁϧⲓ). شهر تجدد الحبوب وأعياد أوزوريس.',
      copt: 'Ⲡⲓⲙⲁϩⲇ̅ `ⲛⲁⲃⲟⲧ `ⲛⲧⲉ Ⲁϧⲓ · Ⲭⲟⲓⲁⲕ.',
    },
  },
  {
    index: 5,
    nameCoptic: 'Ⲧⲱⲃⲓ',
    nameEnglish: 'Toube',
    nameArabic: 'طوبة',
    ancientEgyptian: 'Ta-Abet',
    hieroglyph: '𓏏𓄿𓂝𓃀𓏏',
    seasonKey: 'prou',
    daysCount: () => 30,
    description: {
      en: 'First month of Prou. Month of purification and refreshing cold air.',
      ar: 'أول شهور فصل پرو (Ⲫⲣⲱ). شهر التطهير والأضحية وأبرد أوقات العام.',
      copt: 'Ⲡⲓⲁⲃⲟⲧ `ⲛϩⲟⲩⲓⲧ `ⲛⲧⲉ Ⲫⲣⲱ · Ⲧⲱⲃⲓ.',
    },
  },
  {
    index: 6,
    nameCoptic: 'Ⲙⲉϣⲓⲣ',
    nameEnglish: 'Emasher',
    nameArabic: 'أمشير',
    ancientEgyptian: 'Pa-en-Mekhir',
    hieroglyph: '𓅯𓄿𓈖𓅓𓐍𓇋𓂋',
    seasonKey: 'prou',
    daysCount: () => 30,
    description: {
      en: 'Second month of Prou. Month of storms and swift green growth.',
      ar: 'الشهر الثاني من فصل پرو (Ⲫⲣⲱ). شهر الرياح ونمو الزرع الأخضر.',
      copt: 'Ⲡⲓⲙⲁϩⲋ̅ `ⲛⲁⲃⲟⲧ `ⲛⲧⲉ Ⲫⲣⲱ · Ⲙⲉϣⲓⲣ.',
    },
  },
  {
    index: 7,
    nameCoptic: 'Ⲡⲁⲣⲉⲙϩⲁⲧ',
    nameEnglish: 'Paramhat',
    nameArabic: 'برمهات',
    ancientEgyptian: 'Pa-en-Amenhotep',
    hieroglyph: '𓅯𓄿𓈖𓇋𓏠𓈖𓊵',
    seasonKey: 'prou',
    daysCount: () => 30,
    description: {
      en: 'Third month of Prou. Dedicated to Pharaoh Amenhotep, patron of healers.',
      ar: 'الشهر الثالث من فصل پرو (Ⲫⲣⲱ). منسوب للملك أمنحتب حامي البنائين.',
      copt: 'Ⲡⲓⲙⲁϩⲍ̅ `ⲛⲁⲃⲟⲧ `ⲛⲧⲉ Ⲫⲣⲱ · Ⲡⲁⲣⲉⲙϩⲁⲧ.',
    },
  },
  {
    index: 8,
    nameCoptic: 'Ⲫⲁⲣⲙⲟⲑⲓ',
    nameEnglish: 'Parmoute',
    nameArabic: 'برمودة',
    ancientEgyptian: 'Pa-en-Renenutet',
    hieroglyph: '𓅯𓄿𓈖𓂋𓈖𓈖𓅱𓏏𓏏',
    seasonKey: 'prou',
    daysCount: () => 30,
    description: {
      en: 'Fourth month of Prou. Dedicated to Renenutet, goddess of rich harvest.',
      ar: 'الشهر الرابع من فصل پرو (Ⲫⲣⲱ). منسوب لرننوتت ربة صوامع الحبوب.',
      copt: 'Ⲡⲓⲙⲁϩⲏ̅ `ⲛⲁⲃⲟⲧ `ⲛⲧⲉ Ⲫⲣⲱ · Ⲫⲁⲣⲙⲟⲑⲓ.',
    },
  },
  {
    index: 9,
    nameCoptic: 'Ⲡⲁϣⲟⲛⲥ',
    nameEnglish: 'Pashons',
    nameArabic: 'بشنس',
    ancientEgyptian: 'Pa-en-Khonsu',
    hieroglyph: '𓅯𓄿𓈖𓐍𓈖𓋴𓅱',
    seasonKey: 'shmou',
    daysCount: () => 30,
    description: {
      en: 'First month of Shmou. Dedicated to Khonsu, lunar navigator.',
      ar: 'أول شهور فصل شمو (Ϣⲙⲱ). منسوب لخونسو إله القمر والمسافر الليلي.',
      copt: 'Ⲡⲓⲁⲃⲟⲧ `ⲛϩⲟⲩⲓⲧ `ⲛⲧⲉ Ϣⲙⲱ · Ⲡⲁϣⲟⲛⲥ.',
    },
  },
  {
    index: 10,
    nameCoptic: 'Ⲡⲁⲱⲛⲓ',
    nameEnglish: 'Paoune',
    nameArabic: 'بؤونة',
    ancientEgyptian: 'Pa-en-Inet',
    hieroglyph: '𓅯𓄿𓈖𓇋𓈖𓏏',
    seasonKey: 'shmou',
    daysCount: () => 30,
    description: {
      en: 'Second month of Shmou. Festival of the Valley and time of summer harvest.',
      ar: 'الشهر الثاني من فصل شمو (Ϣⲙⲱ). عيد الوادي وزمن درس الحصاد.',
      copt: 'Ⲡⲓⲙⲁϩⲓ̅ `ⲛⲁⲃⲟⲧ `ⲛⲧⲉ Ϣⲙⲱ · Ⲡⲁⲱⲛⲓ.',
    },
  },
  {
    index: 11,
    nameCoptic: 'Ⲉⲡⲏⲡ',
    nameEnglish: 'Apep',
    nameArabic: 'أبيب',
    ancientEgyptian: 'Ipip',
    hieroglyph: '𓇋𓊪𓇋𓊪',
    seasonKey: 'shmou',
    daysCount: () => 30,
    description: {
      en: 'Third month of Shmou. Month of sweet grapes and ripening summer fruits.',
      ar: 'الشهر الثالث من فصل شمو (Ϣⲙⲱ). شهر نضج العنب والتمور والبهجة الصيفية.',
      copt: 'Ⲡⲓⲙⲁϩⲓⲁ̅ `ⲛⲁⲃⲟⲧ `ⲛⲧⲉ Ϣⲙⲱ · Ⲉⲡⲏⲡ.',
    },
  },
  {
    index: 12,
    nameCoptic: 'Ⲙⲉⲥⲱⲣⲓ',
    nameEnglish: 'Masoura',
    nameArabic: 'مسرى',
    ancientEgyptian: 'Mesut-Ra',
    hieroglyph: '𓄟𓋴𓅱𓏏𓂋𓂝',
    seasonKey: 'shmou',
    daysCount: () => 30,
    description: {
      en: 'Fourth month of Shmou. Meaning "The Birth of Ra", awaiting the new cycle.',
      ar: 'الشهر الرابع من فصل شمو (Ϣⲙⲱ). معناه "ميلاد رع"، إيذاناً بترقب العام الجديد.',
      copt: 'Ⲡⲓⲙⲁϩⲓⲃ̅ `ⲛⲁⲃⲟⲧ `ⲛⲧⲉ Ϣⲙⲱ · Ⲙⲉⲥⲱⲣⲓ.',
    },
  },
  {
    index: 13,
    nameCoptic: 'Ⲡⲓⲕⲟⲩϫⲓ `ⲛⲁⲃⲟⲧ',
    nameEnglish: 'The intercalary',
    nameArabic: 'النسيء',
    ancientEgyptian: 'Heryu Renpet',
    hieroglyph: '𓁷𓂋𓇋𓅱𓆳',
    seasonKey: 'intercalary',
    daysCount: (isLeap) => (isLeap ? 6 : 5),
    description: {
      en: 'The Intercalary Month. 5 sacred deity days (6 in leap years) completing the solar cycle.',
      ar: 'الشهر الصغير (النسيء). ٥ أيام مقدسة للآلهة (٦ في السنة الكبيسة) استكمالاً للسنة.',
      copt: 'Ⲡⲓⲕⲟⲩϫⲓ `ⲛⲁⲃⲟⲧ · Ⲉ̅ ⲛ̀ϩⲟⲟⲩ (ⲓⲉ ⲋ̅ ϧⲉⲛ ϯⲣⲟⲙⲡⲓ `ⲙⲡⲓⲕⲱⲧ).',
    },
  },
];

export interface DecadDay {
  dayNumber: number; // 1 to 10
  nameCoptic: string;
  nameEnglish: string;
  nameArabic: string;
  ancientEgyptian: string;
  hieroglyphNumber: string;
}

export const DECAD_DAYS: DecadDay[] = [
  {
    dayNumber: 1,
    nameCoptic: 'Ⲡⲓϩⲟⲟⲩ `ⲛϩⲟⲩⲓⲧ',
    nameEnglish: '1st Day',
    nameArabic: 'اليوم الأول',
    ancientEgyptian: 'Hru 1',
    hieroglyphNumber: '𓏺',
  },
  {
    dayNumber: 2,
    nameCoptic: 'Ⲡⲓϩⲟⲟⲩ `ⲙⲙⲁϩ ⲃ̅',
    nameEnglish: '2nd Day',
    nameArabic: 'اليوم الثاني',
    ancientEgyptian: 'Hru 2',
    hieroglyphNumber: '𓏻',
  },
  {
    dayNumber: 3,
    nameCoptic: 'Ⲡⲓϩⲟⲟⲩ `ⲙⲙⲁϩ ⲅ̅',
    nameEnglish: '3rd Day',
    nameArabic: 'اليوم الثالث',
    ancientEgyptian: 'Hru 3',
    hieroglyphNumber: '𓏼',
  },
  {
    dayNumber: 4,
    nameCoptic: 'Ⲡⲓϩⲟⲟⲩ `ⲙⲙⲁϩ ⲇ̅',
    nameEnglish: '4th Day',
    nameArabic: 'اليوم الرابع',
    ancientEgyptian: 'Hru 4',
    hieroglyphNumber: '𓏽',
  },
  {
    dayNumber: 5,
    nameCoptic: 'Ⲡⲓϩⲟⲟⲩ `ⲙⲙⲁϩ ⲉ̅',
    nameEnglish: '5th Day',
    nameArabic: 'اليوم الخامس',
    ancientEgyptian: 'Hru 5',
    hieroglyphNumber: '𓏾',
  },
  {
    dayNumber: 6,
    nameCoptic: 'Ⲡⲓϩⲟⲟⲩ `ⲙⲙⲁϩ ⲋ̅',
    nameEnglish: '6th Day',
    nameArabic: 'اليوم السادس',
    ancientEgyptian: 'Hru 6',
    hieroglyphNumber: '𓏿',
  },
  {
    dayNumber: 7,
    nameCoptic: 'Ⲡⲓϩⲟⲟⲩ `ⲙⲙⲁϩ ⲍ̅',
    nameEnglish: '7th Day',
    nameArabic: 'اليوم السابع',
    ancientEgyptian: 'Hru 7',
    hieroglyphNumber: '𓐀',
  },
  {
    dayNumber: 8,
    nameCoptic: 'Ⲡⲓϩⲟⲟⲩ `ⲙⲙⲁϩ ⲏ̅',
    nameEnglish: '8th Day',
    nameArabic: 'اليوم الثامن',
    ancientEgyptian: 'Hru 8',
    hieroglyphNumber: '𓐁',
  },
  {
    dayNumber: 9,
    nameCoptic: 'Ⲡⲓϩⲟⲟⲩ `ⲙⲙⲁϩ ⲑ̅',
    nameEnglish: '9th Day',
    nameArabic: 'اليوم التاسع',
    ancientEgyptian: 'Hru 9',
    hieroglyphNumber: '𓐂',
  },
  {
    dayNumber: 10,
    nameCoptic: 'Ⲡⲓϩⲟⲟⲩ `ⲙⲙⲁϩ ⲓ̅',
    nameEnglish: '10th Day',
    nameArabic: 'اليوم العاشر',
    ancientEgyptian: 'Hru 10',
    hieroglyphNumber: '𓎆',
  },
];

export interface CompleteDateInfo {
  coptic: {
    year: number; // e.g. 3127
    monthIndex: number; // 1 to 13
    month: CopticMonth;
    day: number; // 1 to 30 (or 1 to 5/6)
    weekIndex: number; // 1, 2, 3 (or 0 for intercalary)
    dayInWeek: number; // 1 to 10
    decadDay: DecadDay;
    intercalaryGodDay?: IntercalaryGodDay;
    isLeapYear: boolean;
    season: SeasonInfo;
  };
  gregorian: {
    year: number;
    month: number; // 1 to 12
    monthName: string;
    day: number;
    dayOfWeekName: string;
    date: Date;
    formatted: string;
  };
  hijri: {
    year: number;
    month: number;
    monthNameEn: string;
    monthNameAr: string;
    day: number;
    formattedEn: string;
    formattedAr: string;
  };
}

export function isCopticLeapYear(copticYear: number): boolean {
  return copticYear % 4 === 3;
}

export function getNewYearGregorianDate(copticYear: number): Date {
  const gYear = copticYear - 1101;
  const century = Math.floor(gYear / 100);
  let drift = 0;
  if (century > 20) {
    for (let c = 21; c <= century; c++) {
      if (c % 4 !== 0) drift++;
    }
  } else if (century < 19) {
    for (let c = century; c < 19; c++) {
      if (c % 4 !== 0) drift--;
    }
  }

  const prevCivilYear = copticYear - 1;
  const isAfterLeap = isCopticLeapYear(prevCivilYear);
  const startDay = 11 + drift + (isAfterLeap ? 1 : 0);

  return new Date(Date.UTC(gYear, 8, startDay));
}

export function gregorianToCoptic(gregorianDate: Date): CompleteDateInfo['coptic'] {
  const gYear = gregorianDate.getUTCFullYear();
  
  let testCivilYear = gYear + 1101;
  let nyDate = getNewYearGregorianDate(testCivilYear);

  if (gregorianDate.getTime() < nyDate.getTime()) {
    testCivilYear -= 1;
    nyDate = getNewYearGregorianDate(testCivilYear);
  }

  const msPerDay = 86400000;
  const diffDays = Math.floor((gregorianDate.getTime() - nyDate.getTime()) / msPerDay);
  
  const isLeap = isCopticLeapYear(testCivilYear);
  
  let monthIndex = Math.floor(diffDays / 30) + 1;
  let dayInMonth = (diffDays % 30) + 1;

  if (monthIndex > 13) {
    monthIndex = 13;
    dayInMonth = diffDays - 360 + 1;
  }

  const maxDays = monthIndex === 13 ? (isLeap ? 6 : 5) : 30;
  if (dayInMonth > maxDays) {
    dayInMonth = maxDays;
  }

  const month = COPTIC_MONTHS[monthIndex - 1];
  const season = SEASONS[month.seasonKey];

  let weekIndex = 1;
  let dayInWeek = 1;
  let intercalaryGodDay: IntercalaryGodDay | undefined;

  if (monthIndex < 13) {
    weekIndex = Math.floor((dayInMonth - 1) / 10) + 1;
    dayInWeek = ((dayInMonth - 1) % 10) + 1;
  } else {
    weekIndex = 0;
    dayInWeek = Math.min(dayInMonth, 10);
    intercalaryGodDay = INTERCALARY_GOD_DAYS[dayInMonth - 1] || INTERCALARY_GOD_DAYS[0];
  }

  const decadDay = DECAD_DAYS[dayInWeek - 1] || DECAD_DAYS[0];

  return {
    year: testCivilYear,
    monthIndex,
    month,
    day: dayInMonth,
    weekIndex,
    dayInWeek,
    decadDay,
    intercalaryGodDay,
    isLeapYear: isLeap,
    season,
  };
}

export function copticToGregorian(copticYear: number, monthIndex: number, day: number): Date {
  const nyDate = getNewYearGregorianDate(copticYear);
  const msPerDay = 86400000;
  
  let daysFromStart = 0;
  if (monthIndex <= 12) {
    daysFromStart = (monthIndex - 1) * 30 + (day - 1);
  } else {
    daysFromStart = 360 + (day - 1);
  }

  return new Date(nyDate.getTime() + daysFromStart * msPerDay);
}

const HIJRI_MONTHS_EN = [
  'Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani",
  'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
  'Ramadan', 'Shawwal', "Dhu al-Qi'dah", 'Dhu al-Hijjah'
];

const HIJRI_MONTHS_AR = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
  'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
];

export function getHijriDate(date: Date): CompleteDateInfo['hijri'] {
  const anchorTime = Date.UTC(2026, 9, 9);
  const targetTime = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const diffDays = Math.round((targetTime - anchorTime) / 86400000);

  let totalLunarDays = 1446 * 354.367 + 117 + diffDays;
  let hYear = Math.floor(totalLunarDays / 354.367);
  let daysInHY = Math.floor(totalLunarDays - hYear * 354.367);
  
  if (daysInHY < 1) {
    hYear -= 1;
    daysInHY += 354;
  }

  let hMonth = 1;
  let hDay = daysInHY;
  for (let m = 1; m <= 12; m++) {
    const mLen = (m % 2 === 1) ? 30 : 29;
    if (hDay <= mLen) {
      hMonth = m;
      break;
    }
    hDay -= mLen;
  }

  if (hMonth > 12) hMonth = 12;
  if (hDay < 1) hDay = 1;

  if (diffDays === 0) {
    hYear = 1446;
    hMonth = 4;
    hDay = 28;
  }

  const monthNameEn = HIJRI_MONTHS_EN[hMonth - 1] || HIJRI_MONTHS_EN[0];
  const monthNameAr = HIJRI_MONTHS_AR[hMonth - 1] || HIJRI_MONTHS_AR[0];

  return {
    year: hYear,
    month: hMonth,
    monthNameEn,
    monthNameAr,
    day: hDay,
    formattedEn: `${hDay} ${monthNameEn} ${hYear} AH`,
    formattedAr: `${hDay} ${monthNameAr} ${hYear} هـ`,
  };
}

const GREGORIAN_MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const GREGORIAN_DAYS_EN = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export function getCompleteDateInfo(inputDate: Date): CompleteDateInfo {
  const date = new Date(Date.UTC(
    inputDate.getUTCFullYear(),
    inputDate.getUTCMonth(),
    inputDate.getUTCDate(),
    12, 0, 0
  ));

  const coptic = gregorianToCoptic(date);
  const hijri = getHijriDate(date);

  const gYear = date.getUTCFullYear();
  const gMonth = date.getUTCMonth() + 1;
  const gDay = date.getUTCDate();
  const dayOfWeekName = GREGORIAN_DAYS_EN[date.getUTCDay()];
  const monthName = GREGORIAN_MONTHS_EN[date.getUTCMonth()];

  return {
    coptic,
    gregorian: {
      year: gYear,
      month: gMonth,
      monthName,
      day: gDay,
      dayOfWeekName,
      date,
      formatted: `${dayOfWeekName}, ${monthName} ${gDay}, ${gYear}`,
    },
    hijri,
  };
}

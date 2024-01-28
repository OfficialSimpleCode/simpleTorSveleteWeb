import ManProfile from "$lib/images/man_profile.webp";
import WomanProfile from "$lib/images/woman_profile.webp";

export enum Gender {
  male,
  female,
  anonymous,
}

export interface MaleToFemaleMap {
  [key: string]: string;
}

export const maleToFemaleMap: MaleToFemaleMap = {
  ["אתה בטוח"]: "את בטוחה",
  ["אתה יכול"]: "את יכולה",
  ["דרג "]: "דרגי ",
  ["אתה "]: "את ",
  ["בטוח "]: "בטוחה ",
  ["בטוח?"]: "בטוחה?",
  ["הפעל"]: "הפעלי",
  ["צא"]: "צאי",
  [" צור"]: " צרי",
  ["בחר "]: "בחרי ",
  ["תחויב"]: "תחויבי",
  ["אשר"]: "אשרי",
  ["לקוח"]: "לקוחה",
  ["סמן "]: "סמני ",
  ["הכנס "]: "הכניסי ",
  ["הזמן"]: "הזמיני",
  ["נווט"]: "נווטי",
  ["הוסף "]: "הוסיפי ",
  ["הזמן "]: "הזמיני ",
  ["רשום"]: "רשומה",
  ["מסתכן"]: "מסתכנת",
  ["הזמיני שהזנת"]: "הזמן שהזנת",
  ["שתרצה"]: "שתרצי",
  ["שלם"]: "שלמי",
  ["לשלמי"]: "לשלם",
  ["תרצה "]: "תרצי ",
  ["עדכן"]: "עדכני",
  ["שלם הכל"]: "שלמי הכל",
  ["הפקד"]: "הפקדי",
  ["בטל"]: "בטלי",
  ["לחץ "]: "לחצי ",
  ["השאר"]: "השאירי",
  ["שים לב"]: "שימי לב",
  ["הזן "]: "הזיני ",
  ["בוא"]: "בואי",
  ["הקלד "]: "הקלדי ",
  ["שבהן את עובד"]: "שבהן את עובדת",
  ["כאן תוכל להוסיף"]: "כאן תוכלי להוסיף",
  ["במסך זה תוכל"]: "במסך זה תוכלי",
  ["עדיין מתלבט"]: "עדיין מתלבטת",
  ["ותוכל"]: "ותוכלי",
  ["סיים"]: "סיימי",
  ["המשך"]: "המשיכי",
  ["ברוך הבא"]: "ברוכה הבאה",
  ["נסה "]: "נסי ",
  ["הוצאית"]: "הוצאת",
  ["תהיה "]: "תהיי ",
  ["התקשר"]: "התקשרי",
  ["תוסר"]: "תוסרי",
  ["תוכל "]: "תוכלי ",
  ["את משתמש"]: "את משתמשת",
  ["לקוחהות"]: "לקוחות",
  ["צרית"]: "צורת",
  ["מחק את"]: "מחקי את",
  ["מאבד"]: "מאבדת",
  ["אמת"]: "אמתי",
  ["מותאמת"]: "מתואמת",
  ["לאמתי"]: "לאמת",
  ["דלג"]: "דלגי",
  ["לבטלי"]: "לבטל",
  ["כאשרי"]: "כאשר",
  ["סרב"]: "סרבי",
  ["לסרבי"]: "לסרב",
  ["לנווטי"]: "לנווט",
  ["תקבל"]: "תקבלי",
  ["אשריאי"]: "אשראי",
};

export const genderToStr: { [key in Gender]: string } = {
  [Gender.male]: "male",
  [Gender.female]: "female",
  [Gender.anonymous]: "anonymous",
};

export const genderToImage: { [key in Gender]: string } = {
  [Gender.male]: ManProfile,
  [Gender.female]: WomanProfile,
  [Gender.anonymous]: ManProfile,
};

export const genderFromStr: { [key: string]: Gender } = {
  male: Gender.male,
  female: Gender.female,
  anonymous: Gender.anonymous,
};

export const genderColors: { [key in Gender]: string } = {
  [Gender.male]: "blue",
  [Gender.female]: "pink",
  [Gender.anonymous]: "white",
};

export const genderList: Gender[] = [
  Gender.male,
  Gender.female,
  Gender.anonymous,
];

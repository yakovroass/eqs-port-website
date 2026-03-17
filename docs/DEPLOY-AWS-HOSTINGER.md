# העלאת האתר ל-AWS עם דומיין מ-Hostinger

המדריך הזה מסביר שלב־אחר־שלב איך להעלות את האתר לשרתים של AWS ולחבר אליו את הדומיין שרכשת ב-Hostinger.

---

## שלב 1: איפה האתר ירוץ ב-AWS (ההחלטה)

**האתר הזה:** Next.js עם App Router, ב-build מוגדר `output: "standalone"` – כלומר שרת Node שרץ ומשרת דפים.

**ההחלטה:** להשתמש ב-**AWS Amplify Hosting**.

- **Amplify** – תומך ב-Next.js מלא (כולל SSR ו-standalone), מתחבר ל-Git, בונה ומעלה אוטומטית, ונותן כתובת זמנית (למשל `xxx.amplifyapp.com`). מתאים מאוד לפרויקט הזה.
- **S3 + CloudFront** – מתאים רק לאתרים סטטיים (static export). לא מתאים כאן בלי שינוי הגדרות.

**בקוד:** יש קובץ `amplify.yml` בשורש הפרויקט – Amplify משתמש בו כדי לדעת איך לבנות את האתר.

---

## שלב 2: חשבון AWS והכנת האתר להעלאה

1. **חשבון AWS**  
   אם אין לך – הירשם ב-[aws.amazon.com](https://aws.amazon.com). נדרש כרטיס אשראי לרישום; שימוש בסיסי (Amplify לאתר אחד) לרוב נשאר בתוך שכבת החינם או זול מאוד.

2. **בדיקת build מקומית**  
   בתיקיית הפרויקט הרץ:
   ```bash
   npm install
   npm run build
   ```
   אם ה-build עובר בהצלחה – הפרויקט מוכן להעלאה.  
   הפלט של Next.js עם `output: "standalone"` נמצא בתיקייה `.next/standalone` (Amplify משתמש בזה אוטומטית, לא צריך להעלות ידנית).

3. **מה יש לך אחרי השלב:**  
   חשבון AWS פעיל, ופרויקט שעובר build בהצלחה.

---

## שלב 3: העלאת האתר ל-AWS (Amplify)

1. היכנס ל-[AWS Amplify Console](https://console.aws.amazon.com/amplify/).
2. לחץ **Create new app** → **Host web app**.
3. בחר את מקור הקוד (GitHub / GitLab / Bitbucket וכו') וחבר את ה-repo של הפרויקט.
4. Amplify יזהה Next.js ויציע build settings. אם מופיע קובץ `amplify.yml` – הוא ישתמש בו. אחרת השאר את ברירת המחדל (למשל Build command: `npm run build`).
5. אשר **Save and deploy**. Amplify יריץ build ויעלה את האתר.
6. **בסיום:** תקבל כתובת פעילה, למשל `https://main.xxxxx.amplifyapp.com` – זוהי כתובת האתר ב-AWS (עדיין לא הדומיין שלך מ-Hostinger).

---

## שלב 4: חיבור הדומיין מ-Hostinger ל-AWS

1. **ב-Amplify:**  
   - בחר את האפליקציה → **Hosting** → **Custom domains** (או **Domain management**).  
   - לחץ **Add domain** והזן את הדומיין שלך (למשל `eqsport.com` ו/או `www.eqsport.com`).  
   - Amplify יבדוק בעלות ויציג אילו רשומות DNS להוסיף (בדרך כלל CNAME עבור `www` ורשומות נוספות עבור השורש).

2. **ב-Hostinger:**  
   - היכנס לניהול הדומיין (Domain / DNS Zone).  
   - הוסף או עדכן רשומות לפי מה ש-Amplify ביקש (למשל CNAME מ-`www` ל-כתובת ה-Amplify, ו/או A/ALIAS לשורש אם Amplify מספק כתובת).  
   - שמור שינויים.

3. **המתנה:**  
   עדכון DNS יכול לקחת מספר דקות עד 24–48 שעות. אחרי שהרשומות מתפשטות, גישה לדומיין תפנה לאתר שרץ על Amplify.

**בסוף השלב:** מי שמקליד את הדומיין שלך יגיע לאתר ב-AWS.

---

## שלב 5: HTTPS (מנעול בדפדפן)

- Amplify מנפיק תעודת SSL (HTTPS) אוטומטית עבור הדומיין שהוגדר ב-**Custom domains**.
- אחרי ש-DNS מחובר והדומיין מאומת ב-Amplify, האתר אמור לעבוד עם `https://` בלי צעדים נוספים ב-Hostinger.
- אם הדפדפן לא מציג מנעול – חכה לסיום אימות הדומיין ולתפוצת DNS, ורענן.

---

## סיכום

| שלב | מה עושים |
|-----|----------|
| 1 | ההחלטה: האתר ירוץ ב-**Amplify** (מתאים ל-Next.js). |
| 2 | חשבון AWS + `npm run build` עובר מקומית. |
| 3 | חיבור repo ל-Amplify ו-deploy – מתקבלת כתובת `*.amplifyapp.com`. |
| 4 | ב-Amplify: הוספת Custom domain; ב-Hostinger: עדכון רשומות DNS. |
| 5 | HTTPS מסופק אוטומטית על ידי Amplify אחרי חיבור הדומיין. |

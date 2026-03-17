# צ'קליסט – פריסה ל-AWS וחיבור דומיין Hostinger

הפרויקט עובר build בהצלחה. סמן ✓ כשסיימת.

---

## ✅ בוצע אוטומטית

- **העלאה ל-GitHub:** הרפו `yakovroass/eqs-port-website` מעודכן בענף `main`.
- **Build מקומי:** עבר בהצלחה. קובץ `amplify.yml` מוכן ל-Amplify.

---

## מה נשאר – רק אתה יכול (התחברות לחשבונות)

### שלב א: חשבון AWS (פעם אחת)

- [ ] **1.** היכנס ל־https://aws.amazon.com ולחץ **Create an AWS Account**
- [ ] **2.** מלא פרטים (אימייל, סיסמה, כרטיס אשראי – לחיוב מינימלי/חינם בהתאם לשימוש)
- [ ] **3.** אשר את החשבון (אימות טלפון/אימייל אם נדרש)

---

### שלב ב: העלאת האתר ל-Amplify

- [ ] **4.** היכנס ל־https://console.aws.amazon.com/amplify/
- [ ] **5.** לחץ **Create new app** → **Host web app**
- [ ] **6.** בחר את ספק ה-Git (GitHub / GitLab / Bitbucket) וחבר את החשבון אם עדיין לא מחובר
- [ ] **7.** בחר את **הרפו של הפרויקט** (eqs-port-website) ואת **הענף** (למשל `main`)
- [ ] **8.** אשר **Save and deploy** – Amplify יריץ build לפי `amplify.yml`
- [ ] **9.** חכה לסיום ה-build (סטטוס ירוק). תקבל כתובת כמו: `https://main.xxxxx.amplifyapp.com`
- [ ] **10.** פתח את הכתובת בדפדפן וודא שהאתר עובד

---

### שלב ג: חיבור הדומיין מ-Hostinger

- [ ] **11.** ב-Amplify: לחץ על האפליקציה → **Hosting** → **Custom domains** (או **Domain management**)
- [ ] **12.** לחץ **Add domain** והזן את הדומיין שלך (למשל `eqsport.com` ו/או `www.eqsport.com`)
- [ ] **13.** Amplify יציג **אילו רשומות DNS להוסיף** (CNAME, A וכו') – השאר את הטאב פתוח או העתק לרשימה
- [ ] **14.** היכנס ל-**Hostinger** → ניהול הדומיין → **DNS / DNS Zone**
- [ ] **15.** הוסף או ערוך רשומות **בדיוק** כמו ש-Amplify ביקש (שם, סוג, ערך)
- [ ] **16.** שמור ב-Hostinger וחכה כמה דקות (לפעמים עד 24 שעות) – אחר כך הדומיין יפנה לאתר ב-AWS
- [ ] **17.** בדוק בדפדפן: `https://הדומיין-שלך.com` – אמור להציג את האתר עם מנעול (HTTPS אוטומטי ב-Amplify)

---

## אם משהו לא עובד

- **Build נכשל ב-Amplify:** בדוק את הלוג ב-Amplify Console; וודא ש-`amplify.yml` נמצא בשורש הרפו.
- **הדומיין לא מפנה:** וודא שהרשומות ב-Hostinger תואמות בדיוק ל-Amplify; חכה עד שעדכון ה-DNS מתפשט.
- **פרטים מלאים:** ראה [DEPLOY-AWS-HOSTINGER.md](DEPLOY-AWS-HOSTINGER.md) באותה תיקייה.

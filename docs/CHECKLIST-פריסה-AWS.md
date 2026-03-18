# צ'קליסט – חיבור הדומיין eqsport.io

מה שכבר בוצע: GitHub, Amplify (האפליקציה עולה ורצה).  
נשאר: לחבר את הדומיין מ-Hostinger.  
**הסבר מפורט:** ראה [נשאר-לך-לעשות.md](נשאר-לך-לעשות.md)

---

### Amplify – הוספת הדומיין והעתקת רשומות DNS

- [ ] **1.** Amplify → האפליקציה eqs-port-website → **Hosting** → **Custom domains** → **Add domain**
- [ ] **2.** הזן **eqsport.io** → בחר **Manual configuration** (גלול למטה אם צריך) → **Configure domain**
- [ ] **3.** העתק את **כל** רשומות ה-DNS ש-Amplify מציג (CNAME וכו')

### Hostinger – הזנת הרשומות
- [ ] **4.** Hostinger → הדומיין **eqsport.io** → **DNS** / **DNS Zone**
- [ ] **5.** הוסף רשומה לכל מה שהעתקת (שם, סוג, ערך – **בדיוק** כמו ב-Amplify) → שמור
- [ ] **6.** בדיקה: **https://eqsport.io** ו-**https://www.eqsport.io** – אחרי כמה דקות עד 24 שעות יופיע האתר עם מנעול

---

## אם משהו לא עובד

- **Build נכשל ב-Amplify:** בדוק את הלוג ב-Amplify Console; וודא ש-`amplify.yml` נמצא בשורש הרפו.
- **הדומיין לא מפנה:** וודא שהרשומות ב-Hostinger תואמות בדיוק ל-Amplify; חכה עד שעדכון ה-DNS מתפשט.
- **פרטים מלאים:** ראה [DEPLOY-AWS-HOSTINGER.md](DEPLOY-AWS-HOSTINGER.md) באותה תיקייה.

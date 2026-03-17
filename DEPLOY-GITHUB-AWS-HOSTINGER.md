# העלאת הפרויקט ל-GitHub, AWS והדומיין ב-Hostinger

פרויקט: **eqs-port-website** (Next.js 14, output: standalone)

---

## 1. התקנת Git (אם עדיין לא מותקן)

- הורדה: https://git-scm.com/download/win  
- אחרי ההתקנה **סגור ופתח מחדש** את Terminal / Cursor.

---

## 2. העלאה ל-GitHub

פתח Terminal בתיקיית הפרויקט (`eqs-port-website`) והרץ לפי הסדר:

```powershell
cd "c:\Users\yakov\OneDrive\Desktop\eqs-port-website"
```

```powershell
git init
```

```powershell
git add .
```

```powershell
git commit -m "Initial commit - EQS Port website"
```

יצירת Repo ב-GitHub:
- היכנס ל- https://github.com/new  
- שם ה-repo (למשל): `eqs-port-website`  
- **אל** תסמן "Add a README" (כבר יש קוד מקומי).  
- לחץ **Create repository**.

חיבור והעלאה (החלף `YOUR_USERNAME` ו-`eqs-port-website` אם שינית):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/eqs-port-website.git
git branch -M main
git push -u origin main
```

אם GitHub יבקש התחברות – השתמש ב-**Personal Access Token** (לא סיסמה):  
Settings → Developer settings → Personal access tokens → Generate new token.

---

## 3. חיבור ל-AWS (Amazon Web Services)

אפשרות מומלצת לאתר Next.js: **AWS Amplify Hosting** (מתחבר אוטומטית ל-GitHub).

1. היכנס ל- https://console.aws.amazon.com/amplify  
2. **Create new app** → **Host web app**  
3. בחר **GitHub** → אשר חיבור ל-GitHub (אם מתבקש).  
4. בחר את ה-repo `eqs-port-website` ואת ה-branch `main`.  
5. **Build settings** – Amplify מזהה לרוב Next.js אוטומטית. אם לא:
   - Build image: **Amazon Linux 2**
   - Build spec (אם צריך):
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - npm ci
         build:
           commands:
             - npm run build
       artifacts:
         baseDirectory: .next
         files:
           - '**/*'
       cache:
         paths:
           - node_modules/**/*
     ```
   - עבור Next.js עם `output: 'standalone'` – בדוק במסמכי Amplify את ההגדרות העדכניות ל-Next.js.  
6. **Save and deploy** – Amplify יבנה ויעלה את האתר וייתן לך כתובת (למשל `https://main.xxxx.amplifyapp.com`).

---

## 4. חיבור הדומיין מ-Hostinger ל-AWS

אחרי שיש לך דומיין ב-Hostinger ואתר רץ ב-AWS (למשל ב-Amplify):

### ב-AWS Amplify
1. Amplify Console → האפליקציה שלך → **Domain management** → **Add domain**.  
2. הזן את הדומיין שרכשת (למשל `yourdomain.com`).  
3. Amplify יבקש לאמת בעלות – בדרך כלל על ידי הוספת רשומת **CNAME** ב-DNS.

### ב-Hostinger (DNS)
1. היכנס ל-Hostinger → **Domains** → בחר את הדומיין → **DNS / Nameservers** או **Manage DNS**.  
2. הוסף/ערוך רשומות לפי מה ש-Amplify ביקש:
   - לרוב: רשומת **CNAME**  
     - **Name**: `www` (או subdomain אחר שאתה משתמש בו)  
     - **Points to / Target**: הכתובת ש-Amplify נתן (למשל `xxxx.amplifyapp.com`)  
   - עבור הדומיין הראשי (`yourdomain.com`): לעיתים צריך **A** או **ALIAS** לכתובת IP/תיעוד ש-Amplify מספק – עקוב אחרי ההוראות במסך ה-Domain management ב-Amplify.

3. שמור את השינויים. ייתכן שייקח עד 24–48 שעות עד שה-DNS יתעדכן (לעיתים דקות עד שעות).

---

## 5. סיכום סדר פעולות

| שלב | פעולה |
|-----|--------|
| 1 | התקן Git והרץ `git init`, `add`, `commit` |
| 2 | צור repo ב-GitHub וחבר עם `remote add origin` + `push` |
| 3 | ב-AWS Amplify: צור אפליקציה, חבר ל-GitHub, בחר repo ו-branch, הגדר build ו-deploy |
| 4 | ב-Amplify: Domain management → הוסף את הדומיין מ-Hostinger |
| 5 | ב-Hostinger: DNS → הוסף CNAME (ו-A/ALIAS אם נדרש) לפי Amplify |

אם תרצה, אפשר לעבור שלב־שלב (למשל רק Git, או רק Amplify + Hostinger) עם הפקודות המדויקות לפי מה שכבר ביצעת.

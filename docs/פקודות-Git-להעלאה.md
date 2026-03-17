# פקודות Git – העלאה ל-GitHub (הרץ שורה אחת בכל פעם)

אם הטרמינל מראה `>>` – לחץ **Ctrl+C** פעם אחת כדי לצאת, ואז הרץ את הפקודות.

---

## אם עדיין לא הוספת את Git ל-PATH בסשן הזה:
```
$env:Path = "C:\Program Files\Git\bin;" + $env:Path
```

## מעבר לתיקייה:
```
cd "c:\Users\yakov\OneDrive\Desktop\eqs-port-website"
```

## אם עדיין לא יצרת רפו ב-GitHub:
היכנס ל־https://github.com/new  
שם: `eqs-port-website` | **אל** תסמן Add README → **Create repository**

---

## העלאה (הרץ **פקודה אחת**, Enter, ואז הפקודה הבאה):

```
git remote set-url origin https://github.com/yakovroass/eqs-port-website.git
```

```
git push -u origin main
```

---

**חשוב:** הרץ **רק שורה אחת** בכל פעם. אם GitHub מבקש התחברות – השתמש ב-Personal Access Token (לא סיסמה).

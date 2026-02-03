# 🎿 Ski Snow Data Scraper - Complete Setup Guide

Deze setup geeft je **accurate, dagelijkse sneeuwdata** van bergfex en sneeuwhoogte.nl!

## 📋 Wat je nodig hebt:

1. **Supabase account** (gratis) - voor database
2. **Vercel account** (gratis) - voor hosting + cron jobs
3. **15 minuten setup tijd**

---

## 🚀 Stap 1: Supabase Database Setup

### 1.1 Maak Supabase Project
1. Ga naar [supabase.com](https://supabase.com)
2. Klik "Start your project"
3. Maak een nieuw project (kies een naam, bijv. "ski-data")
4. Wacht 2 minuten tot de database klaar is

### 1.2 Run SQL Schema
1. Ga naar "SQL Editor" in Supabase
2. Klik "New Query"
3. Kopieer en plak de hele inhoud van `supabase-schema.sql`
4. Klik "Run" of druk Ctrl+Enter
5. ✅ Je database is nu klaar!

### 1.3 Haal API Keys Op
1. Ga naar "Settings" → "API"
2. Kopieer deze twee waarden:
   - **Project URL** (bijv. `https://abcdefgh.supabase.co`)
   - **anon public key** (lange string)
3. Bewaar deze - je hebt ze zo nodig!

---

## 🔧 Stap 2: Scraper Setup

### 2.1 Bestanden Voorbereiden
Upload deze bestanden naar je GitHub repository (zelfde repo als je ski app):

```
your-repo/
├── snow-data-scraper.js
├── package.json
├── api/
│   └── scrape-snow-data.js
└── vercel-cron.json
```

### 2.2 Update snow-data-scraper.js
Open `snow-data-scraper.js` en vervang:
```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';      // ← Jouw Project URL
const supabaseKey = 'YOUR_SUPABASE_KEY';      // ← Jouw anon public key
```

---

## ☁️ Stap 3: Vercel Deployment

### 3.1 Deploy naar Vercel
1. Push je code naar GitHub
2. Ga naar [vercel.com/dashboard](https://vercel.com/dashboard)
3. Klik "Import Project"
4. Selecteer je GitHub repo
5. Klik "Deploy"

### 3.2 Configureer Environment Variables
1. Ga naar je project in Vercel
2. Klik "Settings" → "Environment Variables"
3. Voeg toe:
   - Name: `SUPABASE_URL` → Value: jouw Supabase URL
   - Name: `SUPABASE_KEY` → Value: jouw anon key
   - Name: `CRON_SECRET` → Value: maak een random string (bijv. `ski2024secret`)
4. Klik "Save"

### 3.3 Enable Cron Jobs
1. Ga naar "Settings" → "Cron Jobs"
2. Vercel detecteert automatisch je `vercel-cron.json`
3. De scraper draait nu **elke dag om 06:00 UTC** (07:00 Nederlandse tijd)

---

## 🔄 Stap 4: Frontend Aanpassen

Nu moet je frontend (index.html) de data uit Supabase halen in plaats van schattingen.

### 4.1 Update index.html
Voeg bovenaan in de `<script>` sectie toe:

```javascript
// Supabase client
const SUPABASE_URL = 'https://jouw-project.supabase.co';
const SUPABASE_KEY = 'jouw-anon-key';

const supabase = window.supabase?.createClient
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;
```

### 4.2 Voeg Supabase JS library toe
In de `<head>` sectie:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

### 4.3 Vervang fetchWeatherData functie
Zie het voorbeeld in `frontend-with-supabase.html` (ik maak dit zo voor je)

---

## ✅ Stap 5: Test de Setup

### 5.1 Handmatig Scrapen (eerste keer)
1. Open terminal
2. Run:
```bash
cd jouw-repo
npm install
node snow-data-scraper.js
```

3. Check in Supabase → "Table Editor" → `snow_data`
4. Je zou nu 3 rijen moeten zien met data! 🎉

### 5.2 Test Cron Job
1. Ga naar Vercel → je project → "Deployments"
2. Check "Functions" tab
3. Na 06:00 UTC zou je een nieuwe run moeten zien

### 5.3 Test Frontend
1. Open je ski app
2. De sneeuwdata zou nu real-time uit Supabase moeten komen!

---

## 🔍 Troubleshooting

### Scraper werkt niet
- **Check**: Zijn je Supabase credentials correct?
- **Check**: Draait `npm install` zonder errors?
- **Check**: Console logs in Vercel functions

### Geen data in Supabase
- **Check**: RLS policies enabled in Supabase?
- **Check**: Run het SQL schema opnieuw
- **Check**: Supabase API key is `anon` key, niet `service_role`

### Cron job draait niet
- **Check**: Is `vercel-cron.json` in root van je repo?
- **Check**: Is je Vercel plan geschikt voor crons? (gratis tier = ja)
- **Check**: Environment variables zijn gezet?

### Website toont oude data
- **Check**: Supabase URL in frontend correct?
- **Check**: Browser cache geleegd?
- **Check**: Console errors?

---

## 📊 Data Update Schema

```
Dagelijks om 06:00 UTC:
1. Vercel cron triggert /api/scrape-snow-data
2. Script scraped bergfex + sneeuwhoogte.nl
3. Data wordt opgeslagen in Supabase
4. Alle gebruikers zien nieuwe data binnen 15 min

Frontend:
- Haalt elke 15 min data uit Supabase
- Combineert met Open-Meteo weerdata
- Toont accurate cijfers! ✅
```

---

## 💡 Tips

- **Test eerst lokaal**: `node snow-data-scraper.js` voordat je deploy
- **Check logs**: Vercel → Functions → Logs om errors te zien
- **Backup plan**: Als bergfex/sneeuwhoogte layout verandert, moet je de scraper aanpassen
- **Rate limiting**: Script wacht 2 sec tussen requests (netjes!)

---

## 🎯 Resultaat

Na deze setup:
- ✅ Accurate sneeuwdata elke dag om 06:00
- ✅ Real-time liftinformatie
- ✅ Laatste sneeuwval tracking
- ✅ Automatisch zonder jouw input
- ✅ Gratis (Supabase + Vercel free tier)

**Veel plezier met accurate ski data!** ⛷️❄️

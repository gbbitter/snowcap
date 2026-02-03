# ⛷️ Ski Conditions PWA

Een Progressive Web App die actuele weersomstandigheden en sneeuwcondities toont voor drie Alpijnse skigebieden.

## 🎿 Gebieden

- **Bergeralm** - Steinach am Brenner, Oostenrijk
- **Ladurns** - Zuid-Tirol, Italië  
- **Matrei** - Oostenrijk

## 🌟 Features

- ✅ Real-time weerdata via Open-Meteo API (gratis, geen API key nodig)
- ✅ Sneeuwdiepte schattingen
- ✅ Verse sneeuwval (24u)
- ✅ Temperatuur, wind, luchtvochtigheid
- ✅ Bewolking en weersituatie
- ✅ Automatische updates elke 10 minuten
- ✅ PWA - installeerbaar op mobiel en desktop
- ✅ Offline support via Service Worker
- ✅ Responsive design
- ✅ Geen API keys nodig!

## 🚀 Deployment op Vercel

### Methode 1: Via Vercel Dashboard

1. Ga naar [vercel.com](https://vercel.com) en log in
2. Klik op "Add New" → "Project"
3. Upload de volgende bestanden:
   - `ski-conditions-pwa.html` (hernoem naar `index.html`)
   - `manifest.json`
   - `sw.js`
4. Deploy!

### Methode 2: Via Git/GitHub

1. Maak een nieuwe GitHub repository
2. Upload de bestanden (hernoem `ski-conditions-pwa.html` naar `index.html`)
3. Importeer de repository in Vercel
4. Deploy automatisch

### Methode 3: Via Vercel CLI

```bash
# Installeer Vercel CLI
npm i -g vercel

# Hernoem het HTML bestand
mv ski-conditions-pwa.html index.html

# Deploy
vercel
```

## 📱 PWA Installatie

Na deployment kunnen gebruikers de app installeren:
- **iOS Safari**: Deel → Voeg toe aan beginscherm
- **Android Chrome**: Menu → App installeren
- **Desktop Chrome**: Installatie-icoon in adresbalk

## 🔧 Configuratie

De app werkt direct zonder configuratie! De Open-Meteo API is gratis en vereist geen API key.

### Optioneel: Supabase integratie

Als je gebruikersdata wilt opslaan (favoriete gebieden, instellingen):

1. Maak een Supabase project aan
2. Voeg de Supabase client toe aan je HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  const supabase = window.supabase.createClient(
    'YOUR_SUPABASE_URL',
    'YOUR_SUPABASE_ANON_KEY'
  );
</script>
```

## 🎨 Aanpassingen

### Meer skigebieden toevoegen

Bewerk de `RESORTS` array in de HTML:

```javascript
const RESORTS = [
  {
    name: 'Jouw Skigebied',
    location: 'Land',
    coords: { lat: 47.0000, lon: 11.0000 }
  },
  // ... meer gebieden
];
```

### Kleuren aanpassen

Wijzig de CSS variabelen in de `<style>` sectie:

```css
:root {
  --bg-dark: #0a1929;
  --accent-cyan: #00e5ff;
  /* ... etc */
}
```

## 🌐 API Informatie

Deze app gebruikt de **Open-Meteo API**:
- 100% gratis
- Geen API key vereist
- Geen rate limits voor normale use
- Data updates elk uur
- Meer info: https://open-meteo.com

## 📊 Data Beschikbaarheid

- **Temperatuur**: Real-time
- **Wind**: Real-time  
- **Luchtvochtigheid**: Real-time
- **Bewolking**: Real-time
- **Sneeuwval**: Voorspelling (24u)
- **Sneeuwdiepte**: Schatting op basis van hoogte en sneeuwval

## 🔄 Updates

De app ververst automatisch elke 10 minuten. Gebruikers kunnen ook handmatig verversen door de pagina te herladen.

## 📝 Licentie

Vrij te gebruiken voor persoonlijke doeleinden.

## 🆘 Support

Voor vragen of problemen, check:
- Open-Meteo documentatie: https://open-meteo.com/en/docs
- Vercel documentatie: https://vercel.com/docs

---

Veel plezier met skiën! ⛷️❄️

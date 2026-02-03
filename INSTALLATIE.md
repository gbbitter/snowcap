# 🎿 Installatie voor gijsbitter.nl/wintersport

Deze bestanden zijn geconfigureerd om te draaien op **gijsbitter.nl/wintersport**

## 📁 Bestanden uploaden

### Via FTP/SFTP:

1. **Log in op je hosting** (via FTP client zoals FileZilla, Cyberduck, of via cPanel File Manager)

2. **Navigeer naar je public_html of www folder**
   ```
   /public_html/
   └── (andere bestanden van gijsbitter.nl)
   ```

3. **Maak een nieuwe map aan: `wintersport`**
   ```
   /public_html/
   ├── wintersport/          ← NIEUWE MAP
   └── (andere bestanden)
   ```

4. **Upload alle 5 bestanden naar de wintersport map:**
   ```
   /public_html/wintersport/
   ├── index.html
   ├── manifest.json
   ├── sw.js
   ├── vercel.json (niet nodig bij directe hosting)
   └── README.md (optioneel)
   ```

5. **Klaar!** Ga naar: **https://gijsbitter.nl/wintersport**

---

## 🔧 Hosting Providers - Specifieke instructies

### cPanel (meest voorkomend):
1. Log in op cPanel
2. Klik op "File Manager"
3. Ga naar `public_html`
4. Klik "New Folder" → Naam: `wintersport`
5. Open de `wintersport` folder
6. Klik "Upload" → Selecteer alle 5 bestanden
7. Klaar!

### DirectAdmin:
1. Log in op DirectAdmin
2. Klik "File Manager"
3. Navigeer naar `domains/gijsbitter.nl/public_html`
4. Maak folder `wintersport`
5. Upload bestanden
6. Klaar!

### Plesk:
1. Log in op Plesk
2. Ga naar "Files"
3. Navigeer naar `httpdocs` of `public_html`
4. Maak folder `wintersport`
5. Upload bestanden
6. Klaar!

---

## ✅ Checklist na upload

- [ ] Bestanden geüpload naar `/public_html/wintersport/`
- [ ] Ga naar https://gijsbitter.nl/wintersport
- [ ] Test of de app werkt
- [ ] Test op mobiel (PWA installatie)

---

## 🔒 SSL/HTTPS

Zorg dat je domein een SSL certificaat heeft. De meeste hosting providers bieden dit gratis via Let's Encrypt. 

**Zonder HTTPS werkt de PWA functionaliteit NIET!**

Controleer: https://gijsbitter.nl moet een groen slotje tonen.

---

## 📱 PWA Installatie testen

Na deployment:
1. Open https://gijsbitter.nl/wintersport op je telefoon
2. Je krijgt een prompt "Installeer app" (Android) of gebruik "Voeg toe aan beginscherm" (iOS)
3. De app werkt nu als native app!

---

## 🆘 Problemen oplossen

### De pagina laadt niet
- **Controleer**: Zijn de bestanden in `/public_html/wintersport/` of `/var/www/html/wintersport/`?
- **Controleer**: Heet het bestand exact `index.html` (lowercase)?
- **Controleer**: Zijn de bestandsrechten correct? (644 voor bestanden, 755 voor folders)

### "403 Forbidden" error
- **Oplossing**: Controleer folder permissions (moet 755 zijn)
- **Oplossing**: Controleer of er een index.html bestand in de map staat

### Service Worker werkt niet
- **Oplossing**: Zorg dat je site HTTPS gebruikt (niet HTTP)
- **Oplossing**: Wis browser cache en herlaad

### Weerdata laadt niet
- **Controleer**: Is je server verbonden met internet?
- **Controleer**: Blokkeert je firewall uitgaande verbindingen naar api.open-meteo.com?

---

## 🔄 Updates doorvoeren

Als je later wijzigingen wilt maken:
1. Download de index.html
2. Pas aan wat je wilt
3. Upload opnieuw naar `/wintersport/`
4. Hard refresh in browser (Ctrl+Shift+R of Cmd+Shift+R)

---

## 🎨 Aanpassen

### Meer skigebieden toevoegen:
Bewerk `index.html`, zoek naar `const RESORTS = [` en voeg toe:
```javascript
{
    name: 'Nieuw Gebied',
    location: 'Land',
    coords: { lat: 47.0000, lon: 11.0000 },
    pisteMapUrl: 'https://...'
}
```

### Kleuren aanpassen:
Zoek in `index.html` naar `:root {` en wijzig de CSS variabelen.

---

## 📞 Support

Heb je problemen met de installatie? Check:
- Hosting provider documentatie over bestandsupload
- cPanel tutorial: https://docs.cpanel.net/cpanel/files/file-manager/
- Of neem contact op met je hosting support

---

Veel plezier met de app! ⛷️❄️

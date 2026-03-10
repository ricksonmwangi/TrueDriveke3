# TrueDrive Kenya — Website

**Live site:** [truedrive-kenya.netlify.app](https://truedrive-kenya.netlify.app)  
**Contact:** truedriveke@gmail.com | +254 758 261 532  

---

## 📁 File Structure

```
truedrive-kenya/
├── index.html          ← Main website
├── app.js              ← All JavaScript (inventory, gallery, forms)
├── style.css           ← All styling
├── privacy.html        ← Privacy policy page
├── inventory-manager.html ← Helper tool for managing cars
├── logo.png            ← Logo (dark nav version)
├── logo-footer.png     ← Logo (light footer version)
└── images/markx/
    ├── mark-x-front.jpeg
    ├── mark-x-side.jpeg
    └── ... (all car photos go here)
```

---

## 🚗 How to Add a New Car

### Step 1 — Add the photos
Upload all car photos into the `/images` folder.  
Name them clearly, e.g. `prado-front.jpeg`, `prado-side.jpeg`, `prado-interior.jpeg`

### Step 2 — Edit app.js
Open `app.js` and find the `inventory` array near the top.  
Copy the template block shown in the comments and fill in the details:

```js
,{
  id: 2,                          // ← increment by 1 each time
  make: 'Toyota',
  model: 'Prado',
  year: 2014,
  price: 'KSh 3,200,000',
  fuel: 'Diesel',                 // 'Petrol' or 'Diesel'
  trans: 'Auto',                  // 'Auto' or 'Manual'
  mileage: '98,000 km',
  location: 'Nairobi',
  status: 'available',            // 'available' or 'sold'
  category: 'suv',                // 'sedan', 'suv', or 'hatchback'
  desc: '7 seater, leather interior, well maintained.',
  photos: [
    'images/prado-front.jpeg',
    'images/prado-side.jpeg',
    'images/prado-interior.jpeg'
  ]
}
```

> ⚠️ Make sure each car has a unique `id` number. Just count up from the last one.

### Step 3 — Commit changes
Save `app.js` on GitHub. Netlify will automatically redeploy within 30 seconds.

---

## ✅ How to Mark a Car as Sold

Open `app.js`, find the car by its `make` and `model`, and change:

```js
status: 'available'
```
to:
```js
status: 'sold'
```

The card will automatically show a red **SOLD** badge and disable all inquiry buttons.

---

## 🗑️ How to Remove a Car Completely

Open `app.js` and delete the entire `{ ... }` block for that car from the `inventory` array.  
Make sure the commas between cars are still correct after deleting.

---

## 📞 How to Update the Phone Number

Open `app.js` and find this line near the top:

```js
const WHATSAPP = '254758261532';
```

Replace the number (keep the country code `254`, no `+` or spaces).

---

## 📊 How to Activate Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com) and create a free account
2. Create a **Web** property for your site URL
3. Copy your **Measurement ID** (looks like `G-AB12CD34EF`)
4. Open `app.js` and find:

```js
var GA_ID = 'G-XXXXXXXXXX';
```

5. Replace `G-XXXXXXXXXX` with your real ID:

```js
var GA_ID = 'G-AB12CD34EF';
```

> Analytics will only load for visitors who click **Accept** on the cookie banner.

---

## 🌐 How to Connect a Custom Domain (e.g. truedrivekenya.co.ke)

1. Buy domain from [Truehost Kenya](https://truehost.co.ke) or [Kenya Website Experts](https://kenyawebsiteexperts.com) (~KSh 1,000/year)
2. In Netlify: **Site settings → Domain management → Add custom domain**
3. In your domain registrar: update the **nameservers** to Netlify's nameservers (Netlify gives you these)
4. Wait 10–30 minutes for DNS to propagate — site is live on your domain

---

## 🔧 How to Make Changes (Quick Reference)

| Task | File to edit |
|------|-------------|
| Add / remove a car | `app.js` → `inventory` array |
| Mark car as sold | `app.js` → change `status` to `'sold'` |
| Update phone number | `app.js` → `const WHATSAPP` |
| Update Google Analytics ID | `app.js` → `var GA_ID` |
| Change site colours | `style.css` → `:root { --accent: }` |
| Update business info / text | `index.html` |
| Update privacy policy | `privacy.html` |

---

## 🚀 Deployment

This site is hosted on **Netlify** and connected to this GitHub repo.  
Every time you commit a change to this repo, Netlify automatically redeploys the live site.  
No manual steps needed.

---

*Built for TrueDrive Kenya · 2026*

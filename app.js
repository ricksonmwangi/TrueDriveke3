/* ============================================
   TRUEDRIVE KENYA — app.js
   ============================================
   HOW TO ADD A CAR:
   Copy the template block at the bottom of the
   inventory array, paste it, fill in details.

   HOW TO ADD PHOTOS:
   Put images in the /images folder, list them in
   the photos: [] array.

   HOW TO MARK AS SOLD:
   Change  status: "available"
   to      status: "sold"
   ============================================ */


/* ══════════════════════════════════════
   CONFIG — update phone number here
══════════════════════════════════════ */
const WHATSAPP         = '254758261532';
const WHATSAPP_NUMBER  = WHATSAPP;
const WHATSAPP_MESSAGE = "Hello TrueDrive Kenya! I'm interested in your services.";


/* ══════════════════════════════════════
   INVENTORY
══════════════════════════════════════ */
const inventory = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Mark X',
    year: 2015,
    price: 'KSh 1,500,000',
    fuel: 'Petrol',
    trans: 'Auto',
    mileage: '75,809 km',
    location: 'Nairobi',
    status: 'available',   // 'available' or 'sold'
    category: 'sedan',     // 'sedan', 'suv', or 'hatchback'
    desc: 'Clean, accident free, one previous owner.',
    photos: [
      'images/markx/mark-x-front.jpeg',
      'images/markx/mark-x-front2.jpeg',
      'images/markx/mark-x-back.jpeg',
      'images/markx/mark-x-backint.jpeg',
      'images/markx/mark-x-frontint.jpeg',
      'images/markx/mark-x-leftint2.jpeg',
      'images/markx/mark-x-leftside.jpeg',
      'images/markx/mark-x-right.jpeg',
      'images/markx/mark-x-steering.jpeg'
    ]
  }

  /* ── COPY THIS BLOCK TO ADD A NEW CAR ──────
  ,{
    id: 2,
    make: 'Toyota',
    model: 'Prado',
    year: 2014,
    price: 'KSh 3,200,000',
    fuel: 'Diesel',
    trans: 'Auto',
    mileage: '98,000 km',
    location: 'Nairobi',
    status: 'available',
    category: 'suv',
    desc: '7 seater, leather interior, well maintained.',
    photos: [
      'images/prado-front.jpeg',
      'images/prado-side.jpeg',
      'images/prado-interior.jpeg'
    ]
  }
  ─────────────────────────────────────────── */
];


/* ══════════════════════════════════════
   CAR CARD RENDERING
══════════════════════════════════════ */
const CARD_BG = [
  'linear-gradient(135deg,#f0ede8,#ddd9d2)',
  'linear-gradient(135deg,#e8ecf0,#d2d9dd)',
  'linear-gradient(135deg,#eaf0e8,#d2ddd0)',
  'linear-gradient(135deg,#f0e8e8,#ddd2d2)',
  'linear-gradient(135deg,#ece8f0,#d9d2dd)',
  'linear-gradient(135deg,#f0ece8,#ddd8d2)'
];

function renderCars(filter) {
  const grid = document.getElementById('carsGrid');
  if (!grid) return;

  let list = inventory.slice();
  if (filter === 'available')     list = inventory.filter(function(c) { return c.status === 'available'; });
  else if (filter !== 'all')      list = inventory.filter(function(c) { return c.category === filter; });

  if (list.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:48px;color:#8a8a82">' +
      'No cars in this category yet. <a href="#contact" style="color:#c8392b">Contact us</a> — we\'ll help you find what you need.' +
      '</p>';
    return;
  }

  grid.innerHTML = list.map(function(car, i) {
    const hasPhotos   = car.photos && car.photos.length > 0;
    const isAvailable = car.status === 'available';
    const clickable   = hasPhotos && isAvailable;
    const emoji       = car.category === 'suv' ? '🚙' : '🚗';
    const bg          = CARD_BG[i % CARD_BG.length];

    /* WhatsApp message for this specific car */
    const waText = encodeURIComponent(
      "Hi TrueDrive Kenya! I'm interested in the " +
      car.make + ' ' + car.model + ' ' + car.year +
      ' at ' + car.price + '. Is it still available?'
    );

    /* ── Image section ── */
    const mainImg = hasPhotos
      ? '<img src="' + car.photos[0] + '" ' +
          'alt="' + car.make + ' ' + car.model + '" ' +
          'style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s" ' +
          'onmouseover="this.style.transform=\'scale(1.04)\'" ' +
          'onmouseout="this.style.transform=\'scale(1)\'" ' +
          'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'" />' +
        '<div style="display:none;font-size:4rem;width:100%;height:100%;' +
          'align-items:center;justify-content:center;background:' + bg + '">' + emoji + '</div>'
      : '<div style="font-size:4rem">' + emoji + '</div>';

    const statusBadge =
      '<span style="position:absolute;top:12px;left:12px;padding:4px 10px;border-radius:100px;' +
      'font-size:0.72rem;font-weight:600;pointer-events:none;' +
      'background:' + (isAvailable ? '#dcfce7' : '#fee2e2') + ';' +
      'color:' + (isAvailable ? '#15803d' : '#b91c1c') + '">' +
      (isAvailable ? '✓ Available' : '✗ Sold') + '</span>';

    const photoBadge = (hasPhotos && car.photos.length > 1)
      ? '<span style="position:absolute;bottom:10px;right:10px;background:rgba(0,0,0,0.55);' +
        'color:white;padding:3px 10px;border-radius:100px;font-size:0.75rem;pointer-events:none">' +
        '📷 ' + car.photos.length + ' photos</span>'
      : '';

    /* hover overlay — pointer-events:none so it doesn't eat clicks */
    const hoverOverlay = clickable
      ? '<div id="hov-' + car.id + '" ' +
        'style="position:absolute;inset:0;background:rgba(0,0,0,0);color:transparent;' +
        'display:flex;align-items:center;justify-content:center;' +
        'font-size:0.9rem;font-weight:600;transition:all .2s;pointer-events:none">View Gallery →</div>'
      : '';

    const imgWrapper =
      '<div ' + (clickable ? 'onclick="openGallery(' + car.id + ')" ' : '') +
      (clickable
        ? 'onmouseenter="var e=document.getElementById(\'hov-' + car.id + '\');' +
          'if(e){e.style.background=\'rgba(0,0,0,0.35)\';e.style.color=\'white\'}" ' +
          'onmouseleave="var e=document.getElementById(\'hov-' + car.id + '\');' +
          'if(e){e.style.background=\'rgba(0,0,0,0)\';e.style.color=\'transparent\'}" '
        : '') +
      'style="position:relative;width:100%;height:210px;overflow:hidden;' +
      'display:flex;align-items:center;justify-content:center;' +
      'background:' + bg + ';cursor:' + (clickable ? 'pointer' : 'default') + '">' +
      mainImg + statusBadge + photoBadge + hoverOverlay +
      '</div>';

    /* ── Action buttons ── */
    const photoBtn = hasPhotos
      ? '<button onclick="openGallery(' + car.id + ')" ' +
        'style="background:transparent;color:#c8392b;border:1.5px solid #c8392b;' +
        'padding:8px 10px;border-radius:6px;font-size:0.78rem;font-weight:500;cursor:pointer">📷</button>'
      : '';

    const inquireBtn =
      '<button onclick="openInquiry(' + car.id + ')" ' +
      'style="background:#c8392b;color:white;border:none;padding:8px 14px;' +
      'border-radius:6px;font-size:0.82rem;font-weight:500;cursor:pointer">Inquire</button>';

    const waBtn =
      '<a href="https://wa.me/' + WHATSAPP_NUMBER + '?text=' + waText + '" ' +
      'target="_blank" ' +
      'style="background:#25d366;color:white;padding:8px 12px;border-radius:6px;' +
      'font-size:0.82rem;font-weight:500;text-decoration:none;' +
      'display:inline-flex;align-items:center;gap:5px">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="white">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15' +
      '-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475' +
      '-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52' +
      '.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207' +
      '-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372' +
      '-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 ' +
      '5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 ' +
      '1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347' +
      'm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648' +
      '-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 ' +
      '5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884' +
      'm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 ' +
      '4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 ' +
      '11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
      'Chat</a>';

    const actions = isAvailable
      ? '<div style="display:flex;gap:7px;flex-wrap:wrap">' + photoBtn + inquireBtn + waBtn + '</div>'
      : '<span style="font-size:0.82rem;font-weight:600;color:#b91c1c;background:#fee2e2;' +
        'padding:5px 12px;border-radius:6px">SOLD</span>';

    /* ── Assemble card ── */
    return '<div class="car-card">' +
      imgWrapper +
      '<div style="padding:18px">' +
        '<div style="font-size:0.73rem;color:#8a8a82;font-weight:600;margin-bottom:3px;letter-spacing:0.5px">' +
          car.make.toUpperCase() +
        '</div>' +
        '<div style="font-family:\'Syne\',sans-serif;font-size:1.05rem;font-weight:700;margin-bottom:2px">' +
          car.model +
        '</div>' +
        '<div style="font-size:0.8rem;color:#8a8a82;margin-bottom:10px">' +
          car.year + ' · ' + car.location +
        '</div>' +
        '<div style="display:flex;gap:12px;margin-bottom:10px;flex-wrap:wrap">' +
          '<span style="font-size:0.78rem;color:#8a8a82">⛽ ' + car.fuel + '</span>' +
          '<span style="font-size:0.78rem;color:#8a8a82">🔄 ' + car.trans + '</span>' +
          '<span style="font-size:0.78rem;color:#8a8a82">🛣 ' + car.mileage + '</span>' +
        '</div>' +
        '<p style="font-size:0.82rem;color:#8a8a82;line-height:1.5;margin-bottom:14px;' +
          'display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' +
          car.desc +
        '</p>' +
        '<div style="display:flex;align-items:center;justify-content:space-between">' +
          '<div style="font-family:\'Syne\',sans-serif;font-size:1.15rem;font-weight:800">' + car.price + '</div>' +
          actions +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function filterCars(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  renderCars(filter);
}


/* ══════════════════════════════════════
   GALLERY
══════════════════════════════════════ */
var galleryPhotos = [];
var galleryIndex  = 0;

function openGallery(id) {
  var car = null;
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].id === id) { car = inventory[i]; break; }
  }
  if (!car || !car.photos || !car.photos.length) { openInquiry(id); return; }

  galleryPhotos = car.photos;
  galleryIndex  = 0;

  document.getElementById('galleryCarName').textContent  = car.make + ' ' + car.model + ' ' + car.year;
  document.getElementById('galleryCarPrice').textContent = car.price;
  document.getElementById('galleryCarMeta').textContent  = car.location + ' · ' + car.fuel + ' · ' + car.trans + ' · ' + car.mileage;
  document.getElementById('galleryInquireBtn').onclick   = function() { closeGallery(); openInquiry(id); };

  /* Build thumb strip */
  document.getElementById('thumbStrip').innerHTML = galleryPhotos.map(function(src, idx) {
    return '<div onclick="goToSlide(' + idx + ')" id="gthumb-' + idx + '" ' +
      'style="width:72px;height:52px;flex-shrink:0;border-radius:6px;overflow:hidden;cursor:pointer;' +
      'border:2px solid ' + (idx === 0 ? '#c8392b' : 'transparent') + ';' +
      'opacity:' + (idx === 0 ? '1' : '0.5') + ';transition:all .2s">' +
      '<img src="' + src + '" style="width:100%;height:100%;object-fit:cover" ' +
      'onerror="this.parentElement.style.opacity=\'0.15\'" />' +
      '</div>';
  }).join('');

  goToSlide(0);
  document.getElementById('galleryModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  document.getElementById('galleryModal').classList.remove('open');
  document.body.style.overflow = '';
}

function goToSlide(index) {
  galleryIndex = (index + galleryPhotos.length) % galleryPhotos.length;

  var img = document.getElementById('galleryMainImg');
  img.style.opacity = '0';
  setTimeout(function() {
    img.src = galleryPhotos[galleryIndex];
    img.style.opacity = '1';
  }, 140);

  document.getElementById('slideCounter').textContent = (galleryIndex + 1) + ' / ' + galleryPhotos.length;

  for (var i = 0; i < galleryPhotos.length; i++) {
    var t = document.getElementById('gthumb-' + i);
    if (t) {
      t.style.borderColor = (i === galleryIndex) ? '#c8392b' : 'transparent';
      t.style.opacity     = (i === galleryIndex) ? '1' : '0.5';
      if (i === galleryIndex) t.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }
}

function prevSlide() { goToSlide(galleryIndex - 1); }
function nextSlide() { goToSlide(galleryIndex + 1); }


/* ══════════════════════════════════════
   INQUIRY MODAL
══════════════════════════════════════ */
function openInquiry(id) {
  var car = null;
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].id === id) { car = inventory[i]; break; }
  }
  if (!car) return;

  document.getElementById('modalCarName').textContent = car.make + ' ' + car.model + ' ' + car.year;
  document.getElementById('modalCarInfo').textContent = car.price + ' · ' + car.location + ' · ' + car.mileage;
  document.getElementById('inquirySuccess').style.display = 'none';

  var cf = document.getElementById('inquiryCarField');
  if (cf) cf.value = car.make + ' ' + car.model + ' ' + car.year + ' — ' + car.price;

  var msg = "Hello TrueDrive Kenya! I'm interested in the *" +
    car.make + ' ' + car.model + ' ' + car.year +
    '* at *' + car.price + '*. Is it still available?';
  document.getElementById('modalWhatsAppBtn').href =
    'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);

  document.getElementById('carModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('carModal').classList.remove('open');
  document.body.style.overflow = '';
}


/* ══════════════════════════════════════
   FORMS — with loading states
══════════════════════════════════════ */
function setFormLoading(btn, loading) {
  if (loading) {
    btn.disabled = true;
    btn.dataset.orig = btn.textContent;
    btn.textContent  = 'Sending...';
    btn.style.opacity = '0.7';
  } else {
    btn.disabled = false;
    btn.textContent  = btn.dataset.orig || 'Send';
    btn.style.opacity = '1';
  }
}

async function submitSellForm(e) {
  e.preventDefault();
  var form    = e.target;
  var btn     = form.querySelector('.submit-btn');
  var success = document.getElementById('sellSuccess');
  setFormLoading(btn, true);
  try {
    var res = await fetch(form.action, {
      method: 'POST', body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      success.style.display = 'block';
      form.reset();
      setTimeout(function() { success.style.display = 'none'; }, 6000);
    } else {
      alert('Something went wrong. Please try WhatsApp or email us directly.');
    }
  } catch (err) {
    alert('Could not send — please check your connection and try again.');
  }
  setFormLoading(btn, false);
}

async function submitContactForm(e) {
  e.preventDefault();
  var form    = e.target;
  var btn     = form.querySelector('.submit-btn');
  var success = document.getElementById('contactSuccess');
  setFormLoading(btn, true);
  try {
    var res = await fetch(form.action, {
      method: 'POST', body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      success.style.display = 'block';
      form.reset();
      setTimeout(function() { success.style.display = 'none'; }, 6000);
    } else {
      alert('Something went wrong. Please try WhatsApp or email us directly.');
    }
  } catch (err) {
    alert('Could not send — please check your connection and try again.');
  }
  setFormLoading(btn, false);
}

async function submitInquiry(e) {
  e.preventDefault();
  var form    = e.target;
  var btn     = form.querySelector('.submit-btn');
  var success = document.getElementById('inquirySuccess');
  setFormLoading(btn, true);
  try {
    var res = await fetch(form.action, {
      method: 'POST', body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      success.style.display = 'block';
      form.reset();
      setTimeout(function() { success.style.display = 'none'; closeModal(); }, 3000);
    } else {
      alert('Something went wrong. Please use the WhatsApp button above.');
    }
  } catch (err) {
    alert('Could not send — please use the WhatsApp button above.');
  }
  setFormLoading(btn, false);
}


/* ══════════════════════════════════════
   MOBILE NAV
══════════════════════════════════════ */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}


/* ══════════════════════════════════════
   COOKIE BANNER
══════════════════════════════════════ */
function acceptCookies() {
  localStorage.setItem('td_cookies', 'accepted');
  document.getElementById('cookieBanner').classList.remove('show');
}
function declineCookies() {
  localStorage.setItem('td_cookies', 'declined');
  document.getElementById('cookieBanner').classList.remove('show');
}


/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {

  /* Render car inventory */
  renderCars('all');

  /* Sync hero card with first available car */
  var featured = null;
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].status === 'available') { featured = inventory[i]; break; }
  }
  if (!featured && inventory.length) featured = inventory[0];
  if (featured) {
    var titleEl = document.querySelector('.hero-card-title');
    var priceEl = document.querySelector('.hero-card-price');
    var metaEl  = document.querySelector('.hero-card-meta');
    var imgEl   = document.querySelector('.hero-card-img');
    if (titleEl) titleEl.textContent = featured.make + ' ' + featured.model + ' ' + featured.year;
    if (priceEl) priceEl.textContent = featured.price;
    if (metaEl)  metaEl.innerHTML =
      '<span>📍 ' + featured.location + '</span>' +
      '<span>⛽ ' + featured.fuel + '</span>' +
      '<span>🔄 ' + featured.trans + '</span>';
    if (imgEl && featured.photos && featured.photos.length > 0) {
      imgEl.innerHTML =
        '<img src="' + featured.photos[0] + '" alt="' + featured.make + '" ' +
        'style="width:100%;height:100%;object-fit:cover" ' +
        'onerror="this.parentElement.innerHTML=\'🚗\'" />';
    }
  }

  /* Floating WhatsApp button */
  var waFloat = document.createElement('a');
  waFloat.id     = 'waFloat';
  waFloat.href   = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
  waFloat.target = '_blank';
  waFloat.title  = 'Chat on WhatsApp';
  waFloat.innerHTML =
    '<svg width="26" height="26" viewBox="0 0 24 24" fill="white">' +
    '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15' +
    '-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475' +
    '-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52' +
    '.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207' +
    '-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372' +
    '-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 ' +
    '5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 ' +
    '1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347' +
    'm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648' +
    '-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 ' +
    '5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884' +
    'm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 ' +
    '4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 ' +
    '11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  document.body.appendChild(waFloat);

  /* Cookie banner */
  if (!localStorage.getItem('td_cookies')) {
    setTimeout(function() {
      var banner = document.getElementById('cookieBanner');
      if (banner) banner.classList.add('show');
    }, 1500);
  }

  /* Keyboard navigation for gallery */
  document.addEventListener('keydown', function(e) {
    var modal = document.getElementById('galleryModal');
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft')  prevSlide();
    if (e.key === 'Escape')     closeGallery();
  });

  /* Close modals on backdrop click */
  document.getElementById('galleryModal').addEventListener('click', function(e) {
    if (e.target === this) closeGallery();
  });
  document.getElementById('carModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  /* Touch swipe for gallery */
  var touchStartX = 0;
  var gWrap = document.getElementById('galleryMainWrap');
  if (gWrap) {
    gWrap.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    gWrap.addEventListener('touchend', function(e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) nextSlide(); else prevSlide();
      }
    });
  }

  /* Close mobile menu on outside tap */
  document.addEventListener('click', function(e) {
    var menu      = document.getElementById('mobileMenu');
    var hamburger = document.querySelector('.hamburger');
    if (menu && menu.classList.contains('open') &&
        !menu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });

});

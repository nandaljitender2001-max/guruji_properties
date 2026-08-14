const properties = [
  {
    id: 1, title: "3 BHK Independent House", price: 4800000, purpose: "Buy",
    type: "House / Villa", location: "Near Bus Stand, Charkhi Dadri",
    area: 180, areaUnit: "Gaj", beds: 3, baths: 2,
    status: "Available",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Well-maintained independent house in a convenient Charkhi Dadri location. Suitable for a family and ready for immediate possession.",
    mapQuery: "Bus Stand Charkhi Dadri Haryana"
  },
  {
    id: 2, title: "200 Gaj Residential Plot", price: 3200000, purpose: "Buy",
    type: "Residential Plot", location: "Sector 2, Charkhi Dadri",
    area: 200, areaUnit: "Gaj", beds: null, baths: null,
    status: "Available",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Residential plot suitable for building a family home. Good road access and nearby local amenities.",
    mapQuery: "Charkhi Dadri Haryana"
  },
  {
    id: 3, title: "Commercial Shop", price: 2800000, purpose: "Buy",
    type: "Commercial", location: "Main Market, Charkhi Dadri",
    area: 450, areaUnit: "Sq Ft", beds: null, baths: 1,
    status: "Available",
    images: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Commercial space in a busy market area, suitable for retail, office or service business use.",
    mapQuery: "Main Market Charkhi Dadri Haryana"
  },
  {
    id: 4, title: "2 BHK House for Rent", price: 15000, purpose: "Rent",
    type: "House / Villa", location: "Housing Board, Charkhi Dadri",
    area: 120, areaUnit: "Gaj", beds: 2, baths: 2,
    status: "Available",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Comfortable 2 BHK rental house in a residential neighbourhood with convenient access to local facilities.",
    mapQuery: "Housing Board Charkhi Dadri Haryana"
  },
  {
    id: 5, title: "500 Gaj Farmhouse Land", price: 7500000, purpose: "Buy",
    type: "Farmhouse", location: "Outskirts of Charkhi Dadri",
    area: 500, areaUnit: "Gaj", beds: null, baths: null,
    status: "Available",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Open land suitable for farmhouse development or long-term investment, subject to verification of title and approvals.",
    mapQuery: "Charkhi Dadri Haryana"
  },
  {
    id: 6, title: "4 BHK Family Villa", price: 6800000, purpose: "Buy",
    type: "House / Villa", location: "Dadri City, Charkhi Dadri",
    area: 250, areaUnit: "Gaj", beds: 4, baths: 3,
    status: "Available",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Spacious family villa with multiple bedrooms and bathrooms. A good option for a larger family.",
    mapQuery: "Charkhi Dadri Haryana"
  }
];


const formatPrice = (value, purpose) => {
  if (purpose === "Rent") return `₹${Number(value).toLocaleString("en-IN")}/month`;
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 1)} Lakh`;
  return `₹${Number(value).toLocaleString("en-IN")}`;
};

function getEl(id) { return document.getElementById(id); }

let currentProperty = null;
let currentImageIndex = 0;

function renderProperties(list = properties) {
  const grid = getEl("properties-grid");
  if (!grid) return;

  const count = getEl("property-count");
  if (count) count.textContent = `${list.length} ${list.length === 1 ? "property" : "properties"} found`;

  if (!list.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><div>⌕</div><h3>No matching properties</h3><p>Try changing your filters.</p></div>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="property-card">
      <div class="card-img">
        <img src="${p.images[0]}" alt="${p.title}" loading="lazy">
        <span class="status-badge ${p.status === "Sold" ? "status-sold" : ""}">${p.status}</span>
        <span class="purpose-badge">${p.purpose}</span>
      </div>
      <div class="card-body">
        <div class="card-price">${formatPrice(p.price, p.purpose)}</div>
        <h3 class="card-title">${p.title}</h3>
        <div class="card-location">📍 ${p.location}</div>
        <div class="card-specs">
          <span>📐 ${p.area} ${p.areaUnit}</span>
          ${p.beds ? `<span>🛏 ${p.beds} BHK` : ""}
          ${p.baths ? `<span>🚿 ${p.baths} Bath` : ""}
        </div>
        <div class="card-actions">
          <button type="button" class="details-btn" onclick="openProperty(${p.id})">View Details</button>
          <a class="card-wa" target="_blank" rel="noopener" href="${whatsappLink(p)}">WhatsApp</a>
        </div>
      </div>
    </article>
  `).join("");
}

function whatsappLink(p) {
  const message = encodeURIComponent(
    `Hello Guru Ji Properties, I am interested in "${p.title}" in ${p.location}. Please share more details.`
  );
  return `https://wa.me/919999999999?text=${message}`;
}

function applyFilters() {
  const purpose = getEl("filter-purpose")?.value || "all";
  const type = getEl("filter-type")?.value || "all";
  const location = (getEl("filter-location")?.value || "").trim().toLowerCase();
  const budget = getEl("filter-budget")?.value || "all";
  const area = getEl("filter-area")?.value || "all";
  const beds = getEl("filter-beds")?.value || "all";
  const sort = getEl("filter-sort")?.value || "newest";

  let filtered = properties.filter(p => {
    if (purpose !== "all" && p.purpose !== purpose) return false;
    if (type !== "all" && p.type !== type) return false;
    if (location && !p.location.toLowerCase().includes(location)) return false;
    if (budget !== "all" && p.purpose === "Buy" && p.price > Number(budget)) return false;
    if (area !== "all" && p.area < Number(area)) return false;
    if (beds !== "all" && (!p.beds || p.beds < Number(beds))) return false;
    return true;
  });

  if (sort === "low") filtered.sort((a,b) => a.price - b.price);
  if (sort === "high") filtered.sort((a,b) => b.price - a.price);

  renderProperties(filtered);
}

function resetFilters() {
  ["filter-purpose","filter-type","filter-location","filter-budget","filter-area","filter-beds","filter-sort"]
    .forEach(id => {
      const el = getEl(id);
      if (el) el.value = id === "filter-sort" ? "newest" : "all";
    });
  applyFilters();
}

function searchProperties() {
  applyFilters();
  const section = getEl("properties") || document.querySelector("#properties-grid");
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openProperty(id) {
  const p = properties.find(x => Number(x.id) === Number(id));
  const modal = getEl("property-modal");
  if (!p || !modal) return;

  currentProperty = p;
  currentImageIndex = 0;

  getEl("modal-title").textContent = p.title;
  getEl("modal-location").textContent = `📍 ${p.location}`;
  getEl("modal-price").textContent = formatPrice(p.price, p.purpose);
  getEl("modal-desc").textContent = p.description;

  const specs = [`📐 ${p.area} ${p.areaUnit}`];
  if (p.beds) specs.push(`🛏 ${p.beds} Bedrooms`);
  if (p.baths) specs.push(`🚿 ${p.baths} Bathrooms`);
  specs.push(`🏷 ${p.purpose}`);
  getEl("modal-specs").innerHTML = specs.map(x => `<span>${x}</span>`).join("");

  renderGallery();

  const mapWrap = getEl("modal-map-wrap");
  if (mapWrap) {
    mapWrap.innerHTML = `<iframe title="Property location" width="100%" height="280" style="border:0;border-radius:8px" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(p.mapQuery)}&output=embed"></iframe>`;
  }

  const wa = getEl("modal-wa-btn");
  if (wa) wa.href = whatsappLink(p);

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function renderGallery() {
  if (!currentProperty) return;

  const images = currentProperty.images || [];
  const main = getEl("modal-main-img");
  const thumbs = getEl("modal-thumbs");
  const counter = getEl("gallery-counter");

  if (main && images.length) {
    main.src = images[currentImageIndex];
    main.alt = `${currentProperty.title} - photo ${currentImageIndex + 1}`;
  }

  if (counter) counter.textContent = `${currentImageIndex + 1} / ${images.length}`;

  if (thumbs) {
    thumbs.innerHTML = images.map((img, i) =>
      `<button type="button" class="thumb-button" data-gallery-index="${i}" aria-label="View photo ${i + 1}" style="border:0;background:none;padding:0;cursor:pointer;">
        <img class="thumb-img ${i === currentImageIndex ? "active" : ""}" src="${img}" alt="Photo ${i + 1}">
      </button>`
    ).join("");
  }

  const prev = getEl("gallery-prev");
  const next = getEl("gallery-next");
  const multiple = images.length > 1;

  if (prev) {
    prev.type = "button";
    prev.onclick = prevImage;
    prev.disabled = !multiple;
    prev.style.opacity = multiple ? "1" : ".4";
  }
  if (next) {
    next.type = "button";
    next.onclick = nextImage;
    next.disabled = !multiple;
    next.style.opacity = multiple ? "1" : ".4";
  }
}

function nextImage() {
  if (!currentProperty?.images?.length) return;
  currentImageIndex = (currentImageIndex + 1) % currentProperty.images.length;
  renderGallery();
}

function prevImage() {
  if (!currentProperty?.images?.length) return;
  currentImageIndex = (currentImageIndex - 1 + currentProperty.images.length) % currentProperty.images.length;
  renderGallery();
}

function changeModalImage(el, src) {
  if (!currentProperty) return;
  const index = currentProperty.images.indexOf(src);
  if (index >= 0) currentImageIndex = index;
  renderGallery();
}

function closePropertyModal() {
  const modal = getEl("property-modal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  currentProperty = null;
  currentImageIndex = 0;
}

function closeModal() { closePropertyModal(); }

function handleLeadSubmit(event) {
  event.preventDefault();
  const lead = {
    name: getEl("lead-name")?.value.trim(),
    phone: getEl("lead-phone")?.value.trim(),
    type: getEl("lead-type")?.value,
    budget: getEl("lead-budget")?.value.trim(),
    date: new Date().toLocaleString("en-IN")
  };
  const leads = JSON.parse(localStorage.getItem("guruji_leads") || "[]");
  leads.unshift(lead);
  localStorage.setItem("guruji_leads", JSON.stringify(leads));

  const success = getEl("lead-success");
  if (success) success.textContent = "Thank you! Your enquiry has been saved. Our team will contact you.";
  else alert("Thank you! Your enquiry has been saved. Our team will contact you.");

  event.target.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProperties();

  ["filter-purpose","filter-type","filter-location","filter-budget","filter-area","filter-beds","filter-sort"]
    .forEach(id => {
      const el = getEl(id);
      if (el) el.addEventListener(el.tagName === "INPUT" ? "input" : "change", applyFilters);
    });

  /* Search / reset buttons: works whether HTML uses these IDs or onclick handlers. */
  const searchBtn = getEl("search-btn");
  if (searchBtn) searchBtn.addEventListener("click", searchProperties);

  const resetBtn = getEl("reset-filters");
  if (resetBtn) resetBtn.addEventListener("click", resetFilters);

  /* Close button */
  const closeBtn = getEl("modal-close");
  if (closeBtn) {
    closeBtn.type = "button";
    closeBtn.addEventListener("click", closePropertyModal);
  }

  /* Modal backdrop / outside click */
  const modal = getEl("property-modal");
  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal || e.target.classList.contains("modal-backdrop")) {
        closePropertyModal();
      }
    });
  }

  /* Thumbnail navigation */
  document.addEventListener("click", e => {
    const thumb = e.target.closest("[data-gallery-index]");
    if (thumb && currentProperty) {
      currentImageIndex = Number(thumb.dataset.galleryIndex);
      renderGallery();
    }
  });

  /* Keyboard controls */
  document.addEventListener("keydown", e => {
    const m = getEl("property-modal");
    if (!m || !m.classList.contains("open")) return;
    if (e.key === "Escape") closePropertyModal();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  });

  /* Mobile menu */
  const menuBtn = getEl("menu-btn");
  const nav = document.querySelector("nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("mobile-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => nav.classList.remove("mobile-open"));
    });
  }

  /* Search tab shortcuts */
  document.querySelectorAll(".search-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".search-tab").forEach(x => x.classList.remove("active"));
      tab.classList.add("active");
      const purpose = tab.dataset.purpose || tab.textContent.trim();
      if (purpose === "Buy" || purpose === "Rent") {
        const select = getEl("filter-purpose");
        if (select) select.value = purpose;
      }
      searchProperties();
    });
  });
});

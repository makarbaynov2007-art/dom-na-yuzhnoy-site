const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 30), { passive: true });
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const galleryImages = [
  { src: "public/images/gallery/dom-na-yuzhnoy-1.jpg", category: "house territory", label: "Дом", alt: "Дом на Южной зимой с вечерней подсветкой", size: "tall" },
  { src: "public/images/gallery/dom-na-yuzhnoy-2.jpg", category: "interior", label: "Интерьер", alt: "Светлая лестница в Доме на Южной" },
  { src: "public/images/gallery/dom-na-yuzhnoy-3.jpg", category: "house territory", label: "Территория", alt: "Крытая терраса у дома", size: "wide" },
  { src: "public/images/gallery/dom-na-yuzhnoy-4.jpg", category: "interior", label: "Интерьер", alt: "Спальня в Доме на Южной" },
  { src: "public/images/gallery/dom-na-yuzhnoy-5.jpg", category: "hottub", label: "Купель", alt: "Атмосфера отдыха в горячей купели" },
  { src: "public/images/gallery/dom-na-yuzhnoy-6.jpg", category: "hottub", label: "Купель", alt: "Вечерний отдых в купели с подсветкой", size: "tall" },
  { src: "public/images/gallery/dom-na-yuzhnoy-7.jpg", category: "banquet interior", label: "Банкет", alt: "Праздничное оформление с фотографиями гостей" },
  { src: "public/images/gallery/dom-na-yuzhnoy-8.webp", category: "house territory", label: "Дом", alt: "Фасад Дома на Южной", size: "wide" },
  { src: "public/images/gallery/dom-na-yuzhnoy-9.webp", category: "interior", label: "Интерьер", alt: "Оборудованная кухня" },
  { src: "public/images/gallery/dom-na-yuzhnoy-10.webp", category: "interior", label: "Интерьер", alt: "Уютная спальня в доме", size: "tall" },
  { src: "public/images/gallery/dom-na-yuzhnoy-11.webp", category: "interior", label: "Интерьер", alt: "Ванная комната" },
  { src: "public/images/gallery/dom-na-yuzhnoy-12.webp", category: "hottub", label: "Купель", alt: "Купель с вечерней подсветкой", size: "wide" },
  { src: "public/images/gallery/dom-na-yuzhnoy-13.webp", category: "hottub", label: "Купель", alt: "Горячая купель на террасе" },
  { src: "public/images/gallery/dom-na-yuzhnoy-14.webp", category: "hottub territory", label: "Территория", alt: "Купель на просторной террасе", size: "wide" },
  { src: "public/images/gallery/dom-na-yuzhnoy-15.webp", category: "banquet", label: "Банкет", alt: "Праздничная сервировка стола" },
  { src: "public/images/gallery/dom-na-yuzhnoy-16.webp", category: "banquet", label: "Банкет", alt: "Оформление дня рождения", size: "tall" },
  { src: "public/images/gallery/dom-na-yuzhnoy-17.webp", category: "territory", label: "Территория", alt: "Дорожка на ухоженной территории" },
  { src: "public/images/gallery/dom-na-yuzhnoy-18.webp", category: "territory", label: "Территория", alt: "Терраса с шезлонгами вечером", size: "wide" },
  { src: "public/images/gallery/dom-na-yuzhnoy-19.webp", category: "territory", label: "Территория", alt: "Крытая зона отдыха на террасе" },
  { src: "public/images/gallery/dom-na-yuzhnoy-20.webp", category: "territory", label: "Территория", alt: "Зелёный сад возле дома", size: "tall" },
  { src: "public/images/gallery/dom-na-yuzhnoy-21.webp", category: "territory banquet", label: "Территория", alt: "Зона приготовления еды на огне" },
  { src: "public/images/gallery/dom-na-yuzhnoy-22.webp", category: "interior banquet", label: "Интерьер", alt: "Кухня и обеденная зона", size: "wide" },
  { src: "public/images/gallery/dom-na-yuzhnoy-23.webp", category: "territory", label: "Территория", alt: "Мягкая зона отдыха на террасе" },
  { src: "public/images/gallery/dom-na-yuzhnoy-24.webp", category: "house territory", label: "Дом", alt: "Дом и сад в тёплое время года", size: "wide" }
];

const gallery = document.querySelector("#gallery-grid");
const filters = document.querySelectorAll(".gallery-tabs button");
const featuredGalleryIndexes = [0, 7, 13, 8, 14, 17, 22];
let activeGalleryFilter = "featured";
let activeGalleryIndexes = [...featuredGalleryIndexes];
let galleryItems = [];

function filteredGalleryIndexes(filter = activeGalleryFilter) {
  if (filter === "featured") return galleryImages.map((_, index) => index);
  return galleryImages
    .map((image, index) => image.category.split(" ").includes(filter) ? index : -1)
    .filter(index => index >= 0);
}

function previewGalleryIndexes(filter = activeGalleryFilter) {
  const source = filter === "featured" ? featuredGalleryIndexes : filteredGalleryIndexes(filter);
  const limit = matchMedia("(max-width: 700px)").matches ? 6 : 7;
  return source.slice(0, limit);
}

function renderGallery() {
  const previewIndexes = previewGalleryIndexes();
  activeGalleryIndexes = filteredGalleryIndexes();
  gallery.innerHTML = previewIndexes.map((index, position) => {
    const image = galleryImages[index];
    return `
      <button class="gallery-item gallery-position-${position + 1}" data-index="${index}" aria-label="Открыть фото: ${image.alt}">
        <img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async">
        <span>${image.label}</span>
      </button>
    `;
  }).join("");
  galleryItems = [...gallery.querySelectorAll(".gallery-item")];
  galleryItems.forEach(item => item.addEventListener("click", () => {
    openLightbox(Number(item.dataset.index), item);
  }));

  const showAll = document.querySelector("#gallery-show-all");
  showAll.querySelector("span").textContent = activeGalleryIndexes.length;
  showAll.hidden = activeGalleryIndexes.length <= previewIndexes.length;
}

filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => {
    item.classList.remove("active");
    item.setAttribute("aria-selected", "false");
  });
  button.classList.add("active");
  button.setAttribute("aria-selected", "true");
  activeGalleryFilter = button.dataset.filter;
  renderGallery();
}));

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const lightboxClose = lightbox.querySelector(".lightbox-close");
let activeImage = 0;
let lastFocusedItem;

function visibleGalleryIndexes() {
  return activeGalleryIndexes;
}

function showLightboxImage(index) {
  activeImage = index;
  const image = galleryImages[activeImage];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = `${image.label} · ${activeImage + 1} из ${galleryImages.length}`;
}

function openLightbox(index, trigger) {
  lastFocusedItem = trigger;
  showLightboxImage(index);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function stepLightbox(direction) {
  const indexes = visibleGalleryIndexes();
  const currentPosition = indexes.indexOf(activeImage);
  const nextPosition = (currentPosition + direction + indexes.length) % indexes.length;
  showLightboxImage(indexes[nextPosition]);
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lightboxImage.src = "";
  lastFocusedItem?.focus();
}
lightboxClose.addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => stepLightbox(-1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => stepLightbox(1));
document.querySelector("#gallery-show-all").addEventListener("click", event => {
  openLightbox(activeGalleryIndexes[0], event.currentTarget);
});
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") stepLightbox(-1);
  if (event.key === "ArrowRight") stepLightbox(1);
});

let galleryIsMobile = matchMedia("(max-width: 700px)").matches;
addEventListener("resize", () => {
  const mobile = matchMedia("(max-width: 700px)").matches;
  if (mobile !== galleryIsMobile) {
    galleryIsMobile = mobile;
    renderGallery();
  }
});
renderGallery();

const reviews = [...document.querySelectorAll(".review")];
const track = document.querySelector(".review-track");
const dots = document.querySelector(".review-dots");
let activeReview = 0;
reviews.forEach((_, index) => {
  const dot = document.createElement("i");
  if (index === 0) dot.classList.add("active");
  dots.append(dot);
});
function showReview(index) {
  activeReview = (index + reviews.length) % reviews.length;
  const mobile = matchMedia("(max-width: 700px)").matches;
  track.style.transform = `translateX(-${activeReview * (mobile ? 90 : 50)}%)`;
  reviews.forEach((review, itemIndex) => review.classList.toggle("active", itemIndex === activeReview));
  [...dots.children].forEach((dot, itemIndex) => dot.classList.toggle("active", itemIndex === activeReview));
}
document.querySelector("#review-prev").addEventListener("click", () => showReview(activeReview - 1));
document.querySelector("#review-next").addEventListener("click", () => showReview(activeReview + 1));
addEventListener("resize", () => showReview(activeReview));

const heroImage = document.querySelector(".hero-image");
addEventListener("scroll", () => {
  if (scrollY < innerHeight && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroImage.style.transform = `scale(1.03) translateY(${scrollY * 0.12}px)`;
  }
}, { passive: true });

const bookingForm = document.querySelector("#booking-form");
const bookingStorageKey = "domNaYuzhnoyBooking";

if (bookingForm) {
  const baseNightPrice = 100;
  const checkIn = document.querySelector("#check-in");
  const checkOut = document.querySelector("#check-out");
  const nameInput = document.querySelector("#guest-name");
  const phoneInput = document.querySelector("#guest-phone");
  const whatsappInput = document.querySelector("#guest-whatsapp");
  const telegramInput = document.querySelector("#guest-telegram");
  const commentInput = document.querySelector("#guest-comment");
  const serviceInputs = [...bookingForm.querySelectorAll('input[name="services"]')];
  const state = { adults: 1, children: 0 };
  const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

  function localDate(value) {
    return value ? new Date(`${value}T12:00:00`) : null;
  }

  function formatDate(value) {
    const date = localDate(value);
    return date ? dateFormatter.format(date) : "Не выбрана";
  }

  function nightsCount() {
    if (!checkIn.value || !checkOut.value) return 0;
    return Math.max(0, Math.round((localDate(checkOut.value) - localDate(checkIn.value)) / 86400000));
  }

  function selectedServices() {
    return serviceInputs.filter(input => input.checked);
  }

  function servicesCost() {
    return selectedServices().reduce((sum, input) => sum + Number(input.dataset.price), 0);
  }

  function phoneIsValid(value) {
    return value.replace(/\D/g, "").length >= 9;
  }

  function setFieldError(input, message) {
    const error = bookingForm.querySelector(`[data-error-for="${input.id}"]`);
    input.classList.toggle("invalid", Boolean(message));
    if (error) error.textContent = message;
  }

  function validateForm(showErrors = true) {
    const errors = [];
    const nights = nightsCount();
    if (!checkIn.value) errors.push([checkIn, "Выберите дату заезда"]);
    else if (checkIn.value < todayValue) errors.push([checkIn, "Дата заезда не может быть в прошлом"]);
    if (!checkOut.value) errors.push([checkOut, "Выберите дату выезда"]);
    else if (nights < 1) errors.push([checkOut, "Выезд должен быть позже заезда"]);
    if (!nameInput.value.trim()) errors.push([nameInput, "Укажите ваше имя"]);
    if (!phoneIsValid(phoneInput.value)) errors.push([phoneInput, "Введите корректный номер телефона"]);

    if (showErrors) {
      [checkIn, checkOut, nameInput, phoneInput].forEach(input => setFieldError(input, ""));
      errors.forEach(([input, message]) => setFieldError(input, message));
    }
    return errors;
  }

  function updateProgress() {
    const complete = [
      Boolean(checkIn.value && checkOut.value && nightsCount() > 0),
      state.adults + state.children > 0,
      Boolean(nameInput.value.trim()),
      phoneIsValid(phoneInput.value)
    ].filter(Boolean).length;
    const progress = Math.round((complete / 4) * 100);
    document.querySelector("#booking-progress-value").textContent = `${progress}%`;
    document.querySelector("#booking-progress-bar").style.width = `${progress}%`;
  }

  function updateBooking() {
    const nights = nightsCount();
    const guests = state.adults + state.children;
    const services = selectedServices();
    const stayCost = nights * baseNightPrice;
    const extrasCost = servicesCost();

    document.querySelector("#adults-value").textContent = state.adults;
    document.querySelector("#children-value").textContent = state.children;
    document.querySelector("#guest-total").textContent = guests;
    document.querySelector("#summary-check-in").textContent = formatDate(checkIn.value);
    document.querySelector("#summary-check-out").textContent = formatDate(checkOut.value);
    document.querySelector("#summary-nights").textContent = nights;
    document.querySelector("#summary-guests").textContent = guests;
    document.querySelector("#summary-services").textContent = services.length ? services.map(input => input.value).join(", ") : "Не выбраны";
    document.querySelector("#summary-stay-cost").textContent = `${stayCost} BYN`;
    document.querySelector("#summary-services-cost").textContent = services.length ? "Уточняется" : "0 BYN";
    document.querySelector("#summary-total").textContent = services.length ? `от ${stayCost} BYN` : `${stayCost + extrasCost} BYN`;

    const stayPeriod = document.querySelector("#stay-period");
    stayPeriod.textContent = nights
      ? `${formatDate(checkIn.value)} — ${formatDate(checkOut.value)} · ${nights} ${nights === 1 ? "сутки" : nights < 5 ? "суток" : "суток"}`
      : "Выберите даты заезда и выезда";

    updateProgress();
    saveBooking();
  }

  function bookingData() {
    return {
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      adults: state.adults,
      children: state.children,
      services: selectedServices().map(input => input.value),
      name: nameInput.value,
      phone: phoneInput.value,
      whatsapp: whatsappInput.value,
      telegram: telegramInput.value,
      comment: commentInput.value
    };
  }

  function saveBooking() {
    try {
      localStorage.setItem(bookingStorageKey, JSON.stringify(bookingData()));
    } catch {}
  }

  function restoreBooking() {
    try {
      const saved = JSON.parse(localStorage.getItem(bookingStorageKey));
      if (!saved) return;
      checkIn.value = saved.checkIn || "";
      checkOut.value = saved.checkOut || "";
      state.adults = Number(saved.adults) || 1;
      state.children = Number(saved.children) || 0;
      nameInput.value = saved.name || "";
      phoneInput.value = saved.phone || "";
      whatsappInput.value = saved.whatsapp || "";
      telegramInput.value = saved.telegram || "";
      commentInput.value = saved.comment || "";
      serviceInputs.forEach(input => { input.checked = saved.services?.includes(input.value) || false; });
    } catch {}
  }

  function bookingMessage() {
    const services = selectedServices();
    const nights = nightsCount();
    const stayCost = nights * baseNightPrice;
    const extrasCost = servicesCost();
    return [
      "Здравствуйте! Хочу забронировать Дом на Южной.",
      "",
      `Имя: ${nameInput.value.trim()}`,
      `Телефон: ${phoneInput.value.trim()}`,
      `Заезд: ${formatDate(checkIn.value)}`,
      `Выезд: ${formatDate(checkOut.value)}`,
      `Суток: ${nights}`,
      `Гости: ${state.adults} взрослых, ${state.children} детей`,
      `Услуги: ${services.length ? services.map(input => input.value).join(", ") : "не выбраны"}`,
      `Предварительная стоимость проживания: ${stayCost} BYN`,
      services.length ? "Стоимость дополнительных услуг уточняется администратором." : "",
      whatsappInput.value.trim() ? `WhatsApp клиента: ${whatsappInput.value.trim()}` : "",
      telegramInput.value.trim() ? `Telegram клиента: ${telegramInput.value.trim()}` : "",
      commentInput.value.trim() ? `Комментарий: ${commentInput.value.trim()}` : ""
    ].filter(Boolean).join("\n");
  }

  function prepareSending() {
    const errors = validateForm(true);
    const errorBox = document.querySelector("#booking-submit-error");
    const successBox = document.querySelector("#booking-success");
    if (errors.length) {
      errorBox.textContent = "Проверьте обязательные поля: даты, имя и телефон.";
      successBox.classList.remove("visible");
      errors[0][0].focus();
      return false;
    }
    errorBox.textContent = "";
    successBox.classList.add("visible");
    saveBooking();
    return true;
  }

  const today = new Date();
  const todayValue = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  checkIn.min = todayValue;
  checkOut.min = todayValue;

  checkIn.addEventListener("change", () => {
    checkOut.min = checkIn.value || todayValue;
    if (checkOut.value && checkOut.value <= checkIn.value) checkOut.value = "";
    setFieldError(checkIn, "");
    updateBooking();
  });
  checkOut.addEventListener("change", () => {
    setFieldError(checkOut, nightsCount() < 1 ? "Выезд должен быть позже заезда" : "");
    updateBooking();
  });

  bookingForm.querySelectorAll("[data-counter]").forEach(button => button.addEventListener("click", () => {
    const key = button.dataset.counter;
    const minimum = key === "adults" ? 1 : 0;
    const change = button.dataset.action === "plus" ? 1 : -1;
    if (change > 0 && state.adults + state.children >= 20) return;
    state[key] = Math.max(minimum, state[key] + change);
    updateBooking();
  }));

  [...serviceInputs, nameInput, phoneInput, whatsappInput, telegramInput, commentInput].forEach(input => {
    input.addEventListener("input", () => {
      if (input === nameInput && input.value.trim()) setFieldError(input, "");
      if (input === phoneInput && phoneIsValid(input.value)) setFieldError(input, "");
      updateBooking();
    });
    input.addEventListener("change", updateBooking);
  });

  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    prepareSending();
  });

  document.querySelector("#send-whatsapp").addEventListener("click", () => {
    if (!prepareSending()) return;
    window.open(`https://wa.me/375296479387?text=${encodeURIComponent(bookingMessage())}`, "_blank", "noopener");
  });

  document.querySelector("#send-telegram").addEventListener("click", () => {
    if (!prepareSending()) return;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(bookingMessage())}`, "_blank", "noopener");
  });

  restoreBooking();
  checkOut.min = checkIn.value || todayValue;
  updateBooking();
}

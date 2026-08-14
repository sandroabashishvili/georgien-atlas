const themeStorageKey = "georgien-atlas-theme";
const rootElement = document.documentElement;
const themeColor = document.querySelector('meta[name="theme-color"]');
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const storedTheme = sessionStorage.getItem(themeStorageKey);
let followsSystemTheme = storedTheme !== "light" && storedTheme !== "dark";

rootElement.dataset.theme = followsSystemTheme
  ? (systemTheme.matches ? "dark" : "light")
  : storedTheme;

const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const themeButton = document.createElement("button");
const mapFrames = document.querySelectorAll(".map-frame iframe");
const mapMessageOrigin = window.location.origin === "null" ? "*" : window.location.origin;

themeButton.className = "theme-toggle";
themeButton.type = "button";

const getActiveTheme = () => {
  if (rootElement.dataset.theme) return rootElement.dataset.theme;
  return systemTheme.matches ? "dark" : "light";
};

const updateThemeControl = () => {
  const isDark = getActiveTheme() === "dark";
  themeButton.textContent = isDark ? "☀" : "☾";
  themeButton.setAttribute("aria-label", isDark ? "Hellen Modus aktivieren" : "Dunklen Modus aktivieren");
  themeButton.title = isDark ? "Heller Modus" : "Dunkler Modus";
  if (themeColor) themeColor.content = isDark ? "#0b171c" : "#f7fbfb";
  mapFrames.forEach((frame) => {
    frame.contentWindow?.postMessage({ type: "atlas-theme", theme: isDark ? "dark" : "light" }, mapMessageOrigin);
  });
};

themeButton.addEventListener("click", () => {
  const nextTheme = getActiveTheme() === "dark" ? "light" : "dark";
  followsSystemTheme = false;
  rootElement.dataset.theme = nextTheme;
  sessionStorage.setItem(themeStorageKey, nextTheme);
  updateThemeControl();
});

if (menuButton) {
  menuButton.before(themeButton);
  updateThemeControl();
}

mapFrames.forEach((frame) => {
  frame.addEventListener("load", updateThemeControl);
});

systemTheme.addEventListener("change", (event) => {
  if (!followsSystemTheme) return;
  rootElement.dataset.theme = event.matches ? "dark" : "light";
  updateThemeControl();
});

if (menuButton && nav) {
  const closeMenu = () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target === nav || event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

const regionData = {
  tbilisi: {
    type: "Hauptstadt",
    title: "Tbilisi",
    summary:
      "Die Hauptstadt ist der beste Einstieg in Georgien: Altstadt, Schwefelbäder, moderne Cafés, Aussichtspunkte und ein Alltag, der gleichzeitig kaukasisch, europäisch und postsowjetisch wirkt.",
    see: "Altstadt, Narikala, Schwefelbäder, Rustaveli, Dry Bridge, Mtatsminda.",
    season: "Frühling und Herbst sind angenehm. Im Sommer kann die Stadt sehr heiß werden.",
    typical: "Kontraste: alte Balkone, Kirchen, moderne Bars, Märkte, Verkehr und lange Abende.",
    link: "https://de.wikipedia.org/wiki/Tiflis",
    image: "../assets/img/regions/tbilisi.webp",
    imageAlt: "Illustration von Tbilisi mit Altstadt, Fluss und Abendlicht",
  },
  kakheti: {
    type: "Weinregion",
    title: "Kachetien",
    summary:
      "Kachetien ist die Region für Wein, Klosteranlagen, weite Täler und warme Farben. Wer Qvevri, Weinberge und georgische Gastfreundschaft verstehen will, landet fast automatisch hier.",
    see: "Telavi, Sighnaghi, Alazani-Tal, Bodbe, Gremi, Weingüter und Familienkeller.",
    season: "Mai, Juni, September und Oktober. Zur Weinlese ist die Region besonders lebendig.",
    typical: "Wein, Qvevri, lange Tafeln, trockene Landschaften, Kloster und Blick auf den Kaukasus.",
    link: "https://de.wikipedia.org/wiki/Kachetien",
    image: "../assets/img/regions/kakheti.webp",
    imageAlt: "Illustration von Kachetien mit Weinbergen, Qvevri und Kaukasusblick",
  },
  adjara: {
    type: "Meer und Berge",
    title: "Adscharien",
    summary:
      "Adscharien verbindet die Schwarzmeerküste mit grünen Bergen. Batumi ist laut, modern und sommerlich, während das Hinterland deutlich ruhiger und traditioneller wirkt.",
    see: "Batumi Boulevard, Botanischer Garten, Gonio, Küstenorte, Bergdörfer im Hinterland.",
    season: "Sommer für Meer und Stadtleben, Frühling und Herbst für weniger Hitze.",
    typical: "Schwarzes Meer, feuchtes Klima, moderne Skyline, subtropisches Grün und Bergstraßen.",
    link: "https://de.wikipedia.org/wiki/Adscharien",
    image: "../assets/img/regions/adjara.webp",
    imageAlt: "Illustration von Adscharien mit Schwarzmeerküste und grünen Bergen",
  },
  svaneti: {
    type: "Hochgebirge",
    title: "Svanetien",
    summary:
      "Svanetien ist eine der eindrucksvollsten Bergregionen Georgiens. Wehrtürme, hohe Gipfel und abgelegene Täler machen die Region stark, aber wetter- und straßenabhängig.",
    see: "Mestia, Ushguli, Wehrtürme, Gletscherblicke, Bergwanderungen und lokale Museen.",
    season: "Sommer und früher Herbst für Straßen und Wanderungen. Winter ist spezieller und anspruchsvoller.",
    typical: "Wehrtürme, Schneeberge, lange Anfahrt, starke Landschaft und eigenständige Kultur.",
    link: "https://de.wikipedia.org/wiki/Mingrelien_und_Oberswanetien",
    image: "../assets/img/regions/svaneti.webp",
    imageAlt: "Illustration von Svanetien mit Wehrtürmen und schneebedecktem Kaukasus",
  },
  kazbegi: {
    type: "Kaukasusroute",
    title: "Kazbegi",
    summary:
      "Kazbegi ist für viele Reisende der erste große Kaukasusmoment. Die Route von Tbilisi in Richtung Norden ist spektakulär, aber Wetter, Verkehr und Sicht können alles verändern.",
    see: "Stepantsminda, Gergeti-Kirche, Dariali-Schlucht, Aussichtspunkte entlang der Heerstraße.",
    season: "Mai bis Oktober ist am einfachsten. Im Winter braucht man mehr Planung.",
    typical: "Bergpanorama, schnelle Wetterwechsel, Tagesausflüge, Fotostopps und starke Höhenwirkung.",
    link: "https://de.wikipedia.org/wiki/Kazbegi",
    image: "../assets/img/regions/kazbegi.webp",
    imageAlt: "Illustration von Kazbegi mit Bergkirche, Tal und Mount Kazbek",
  },
  imereti: {
    type: "Westgeorgien",
    title: "Imeretien",
    summary:
      "Imeretien ist ein guter Gegenpol zu Tbilisi und Kachetien: Kutaisi, Höhlen, Märkte, Klosteranlagen und ein anderer Rhythmus im Westen des Landes.",
    see: "Kutaisi, Bagrati, Gelati, Prometheus-Höhle, Sataplia, Märkte und Tagesrouten.",
    season: "Frühling und Herbst sind besonders angenehm. Sommer ist möglich, aber teils feucht und warm.",
    typical: "Westgeorgische Küche, Höhlen, Kloster, Märkte und gute Lage zwischen Meer und Bergen.",
    link: "https://de.wikipedia.org/wiki/Imeretien",
    image: "../assets/img/regions/imereti.webp",
    imageAlt: "Illustration von Imeretien mit Kutaisi, Flusslandschaft und grünen Hügeln",
  },
};

const regionButtons = document.querySelectorAll("[data-region-key]");
const regionFields = {
  type: document.querySelector("[data-region-type]"),
  title: document.querySelector("[data-region-title]"),
  summary: document.querySelector("[data-region-summary]"),
  see: document.querySelector("[data-region-see]"),
  season: document.querySelector("[data-region-season]"),
  typical: document.querySelector("[data-region-typical]"),
  link: document.querySelector("[data-region-link]"),
  image: document.querySelector("[data-region-image]"),
};

function setRegion(key) {
  const data = regionData[key];
  if (!data || !regionFields.title) return;

  regionFields.type.textContent = data.type;
  regionFields.title.textContent = data.title;
  regionFields.summary.textContent = data.summary;
  regionFields.see.textContent = data.see;
  regionFields.season.textContent = data.season;
  regionFields.typical.textContent = data.typical;
  regionFields.link.href = data.link;
  if (regionFields.image) {
    regionFields.image.src = data.image;
    regionFields.image.alt = data.imageAlt;
  }

  regionButtons.forEach((button) => {
    const isActive = button.dataset.regionKey === key;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
}

regionButtons.forEach((button, index) => {
  button.addEventListener("click", () => setRegion(button.dataset.regionKey));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    let nextIndex = index;
    if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = regionButtons.length - 1;
    else if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % regionButtons.length;
    else nextIndex = (index - 1 + regionButtons.length) % regionButtons.length;

    const nextButton = regionButtons[nextIndex];
    setRegion(nextButton.dataset.regionKey);
    nextButton.focus();
  });
});

const requestedRegion = new URLSearchParams(window.location.search).get("region");
if (requestedRegion && regionData[requestedRegion]) {
  setRegion(requestedRegion);
}

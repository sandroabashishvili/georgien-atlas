# Georgien Atlas

![Georgien Atlas – Regionen, Karte und Reiseideen](assets/img/social-card.jpg)

Ein leichtgewichtiger, datenbasierter Web-Atlas, der redaktionelle
Reiseinformationen mit strukturierten Regions- und Gemeindedaten in einer
interaktiven Karte verbindet. Das Projekt zeigt, wie sich Datenvisualisierung,
Inhaltsstruktur und responsive Frontend-Entwicklung ohne schweres Framework
kombinieren lassen.

**Live:** [sandroabashishvili.github.io/georgien-atlas](https://sandroabashishvili.github.io/georgien-atlas/)

- Hell-/Dunkelmodus mit Systemeinstellung als Standard und manueller Sitzungswahl
- vollflächige, einklappbare Mobilnavigation

## Was das Projekt bietet

- interaktive Karte mit Gemeinden, Regionen und Bevölkerungsdaten
- kompakte Porträts wichtiger Reisegebiete
- praktische Hinweise zu Saison, Transport, Geld, Internet und Sicherheit
- FAQ für die erste Reiseplanung
- kuratierte Links zu offiziellen und etablierten Quellen
- responsives Layout sowie Tastatur- und Screenreader-freundliche Navigation
- automatischer heller/dunkler Darstellungsmodus mit manueller Auswahl pro Browsersitzung
- SEO-Grundlagen mit Canonicals, Open Graph, strukturierten Daten, Sitemap und
  `robots.txt`

## Technik

Das Projekt ist bewusst leichtgewichtig und benötigt weder Build-Prozess noch
Frontend-Framework:

- semantisches HTML5
- modulares CSS
- Vanilla JavaScript
- Python/Folium und Leaflet für den statischen Kartenexport
- GitHub Pages für die Veröffentlichung

## Lokal ansehen

```bash
git clone https://github.com/sandroabashishvili/georgien-atlas.git
cd georgien-atlas
python3 -m http.server 8095
```

Danach im Browser öffnen:

```text
http://127.0.0.1:8095/
```

Ein lokaler Server bildet das Verhalten der veröffentlichten Version
zuverlässig ab und hält die sichtbaren URLs frei von Dateinamen.

## Projektstruktur

```text
.
├── index.html
├── karte/               # Regionen-Explorer und interaktive Karte
├── regionen/            # ausführlichere Regionenporträts
├── reiseinfos/          # praktische Reiseplanung
├── faq/                 # häufige Fragen
├── links/               # offizielle und etablierte Quellen
├── about/               # Methodik und Projektinformationen
└── assets/
    ├── css/             # modulare Stylesheets
    ├── img/             # lokale Bild- und Social-Media-Assets
    ├── js/              # gemeinsame Navigation, Theme und Regionen-Interaktion
    └── map/             # Folium/Leaflet-Export und Kartendaten
```

## Daten und Quellen

Der aktuelle Kartenexport liegt in
`assets/map/sakartvelo_municipalities.html`. Die dazugehörige lokale
Datengrundlage befindet sich in
`assets/map/georgia_municipalities_data.csv`.

Als Orientierung dienen unter anderem GeoStat, GADM und OpenStreetMap. Für
Einreise, Sicherheit, Wetter und Verkehr verweist die Website auf die jeweils
zuständigen Originalquellen. Die Inhalte ersetzen keine amtliche Karte oder
verbindliche Reiseberatung.

## Status

Veröffentlichungsfähige Version. Inhalte und Datengrundlagen können künftig
schrittweise erweitert und aktualisiert werden.

## Autor

Sandro Abashishvili

[Portfolio](https://sandroabashishvili.github.io/) ·
[GitHub](https://github.com/sandroabashishvili) ·
[LinkedIn](https://www.linkedin.com/in/aleksandre-abashishvili-03417617a/)

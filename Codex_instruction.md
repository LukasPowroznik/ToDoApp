# Codex Instructions – To-Do Dashboard mit SvelteKit 5.0

## Projektübersicht

Dieses Projekt ist eine **To-Do-Webseite** für das Modul **Prototyping**. Die Anwendung soll als moderner, übersichtlicher Web-Prototyp umgesetzt werden und Nutzer:innen dabei unterstützen, Aufgaben zu planen, zu verwalten und den eigenen Fortschritt zu sehen.

Die Webseite soll mit **SvelteKit 5.0** in **Visual Studio Code** mit Unterstützung von **Codex** entwickelt werden.

Für das Styling soll **Bootstrap** als Grundlage verwendet werden. Eigenes CSS darf ergänzend eingesetzt werden, um Layout, Abstände, Farben oder Details individuell anzupassen.

> Platzhalter: Hier können später genaue Vorgaben aus dem Modul ergänzt werden.

---

## Ziel des Projekts

Die To-Do-Webseite soll zeigen, wie ein interaktiver Prototyp mit einem modernen Framework aufgebaut wird. Der Fokus liegt auf:

- klarer Benutzerführung
- sauberer Struktur im Code
- verständlichem Design
- sinnvoller Interaktivität
- responsiver Darstellung
- einfacher Erweiterbarkeit
- nachvollziehbarer Komponentenstruktur

Die App soll es Nutzer:innen ermöglichen, Aufgaben zu erstellen, anzuzeigen, zu bearbeiten, abzuhaken, zu filtern und zu löschen.

---

## Technische Anforderungen

### Haupttechnologien

Das Projekt soll primär mit folgenden Technologien umgesetzt werden:

- SvelteKit 5.0
- Svelte-Komponenten
- JavaScript oder TypeScript
- Bootstrap als Styling-Grundlage
- eigenes CSS zur Ergänzung
- MongoDB Atlas als Datenbank für gespeicherte Aufgaben
- SvelteKit Server Routes oder Netlify Functions für API-Endpunkte
- sichere Umgebungsvariablen für die MongoDB-Verbindung
- optional: eine Chart-Library für Diagramme

### Hinweise zur Umsetzung

- SvelteKit 5.0 ist das Haupt-Framework.
- Bootstrap soll für Layout, Cards, Buttons, Formulare, Badges, Progress Bars und responsive Grids verwendet werden.
- Eigenes CSS darf Bootstrap ergänzen, aber nicht unnötig ersetzen.
- Die Logik der To-Do-App soll mit Svelte/SvelteKit umgesetzt werden.
- Für die Datenspeicherung soll MongoDB verwendet werden, vorzugsweise MongoDB Atlas, damit die App später auf Netlify deployt werden kann.
- Die MongoDB-Verbindung darf niemals direkt im Client-Code stehen. Datenbankzugriffe müssen serverseitig über SvelteKit Server Routes oder Netlify Functions erfolgen.
- Die Verbindungsdaten sollen über Umgebungsvariablen gespeichert werden, zum Beispiel `MONGODB_URI` und `MONGODB_DB`.
- Optional darf für die frühe lokale Entwicklung zunächst mit Demo-Daten gearbeitet werden. Die finale Persistenz soll aber über MongoDB erfolgen.
- Diagramme können zunächst mit Platzhalterdaten umgesetzt werden, falls noch keine echten Daten vorhanden sind.

---

## Projektsetup

Das Projekt soll als SvelteKit-Projekt erstellt werden.

Beispiel für die Erstellung:

```bash
npm create svelte@latest todo-dashboard
cd todo-dashboard
npm install
npm run dev
```

Empfohlene Auswahl beim Setup:

- SvelteKit App
- JavaScript ist ausreichend, TypeScript ist optional
- ESLint/Prettier: optional, aber empfohlen
- Testing: nicht zwingend notwendig

Bootstrap kann zum Beispiel über npm installiert werden:

```bash
npm install bootstrap
```

Für MongoDB kann der offizielle Node.js Driver verwendet werden:

```bash
npm install mongodb
```

Für das Deployment auf Netlify soll der Netlify Adapter verwendet werden:

```bash
npm install -D @sveltejs/adapter-netlify
```

Bootstrap soll anschließend im Projekt eingebunden werden, zum Beispiel in `src/routes/+layout.svelte` oder einer zentralen CSS-/JS-Datei.

> Platzhalter: Falls die Schule oder das Modul ein bestimmtes Setup vorgibt, hier ergänzen.

### Deployment-Vorbereitung für Netlify

Da die Webseite später auf Netlify deployt werden soll, soll das Projekt für Netlify vorbereitet werden.

Empfohlen:

- `@sveltejs/adapter-netlify` verwenden
- MongoDB Atlas als externe Datenbank verwenden
- Datenbankzugriffe über serverseitige Routen oder Functions lösen
- Environment Variables für sensible Daten verwenden
- `.env` in `.gitignore` eintragen

Beispielhafte `.gitignore`-Einträge:

```text
.env
.env.*
!.env.example
```

Eine `.env.example`-Datei darf erstellt werden, damit klar ist, welche Variablen benötigt werden:

```env
MONGODB_URI=your_mongodb_connection_string_here
MONGODB_DB=todo_dashboard
```

---

## Empfohlene Projektstruktur

Bitte verwende eine einfache und nachvollziehbare Struktur. Die App soll nicht unnötig kompliziert aufgebaut sein, aber trotzdem sauber in Komponenten aufgeteilt werden.

```text
todo-dashboard/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Navigation.svelte
│   │   │   ├── DashboardStats.svelte
│   │   │   ├── MonthlyLineChart.svelte
│   │   │   ├── TodoForm.svelte
│   │   │   ├── EditTodoModal.svelte
│   │   │   ├── DeleteConfirmModal.svelte
│   │   │   ├── TodoList.svelte
│   │   │   ├── TodoItem.svelte
│   │   │   ├── TodoFilter.svelte
│   │   │   ├── TodoSummaryCards.svelte
│   │   │   ├── CalendarWeekView.svelte
│   │   │   ├── TodoDetailModal.svelte
│   │   │   └── ScheduleTodosModal.svelte
│   │   ├── data/
│   │   │   └── demoTodos.js
│   │   ├── server/
│   │   │   └── db.js
│   │   └── stores/
│   │       └── todos.js
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── tasks/
│   │   │   └── +page.svelte
│   │   ├── calendar/
│   │   │   └── +page.svelte
│   │   ├── api/
│   │   │   └── todos/
│   │   │       └── +server.js
│   │   └── settings/
│   │       └── +page.svelte
│   └── app.css
├── static/
├── package.json
└── README.md
```

Wenn das Projekt klein gehalten werden soll, dürfen die wichtigsten Funktionen zuerst direkt in `+page.svelte` umgesetzt werden. Bei wachsendem Umfang sollen Formular, Liste, einzelne Aufgaben, Dashboard-Statistiken und Diagramme in eigene Komponenten ausgelagert werden.

---

## Geplante Seiten

### 1. Dashboard-Seite

Die erste Seite soll ein Dashboard sein. Das Dashboard soll Nutzer:innen eine schnelle Übersicht über heutige Aufgaben und wichtige Kennzahlen geben.

### 2. Alle-To-Dos-Seite

Die zweite Hauptseite soll eine zentrale **Alle-To-Dos-Seite** sein. Auf dieser Seite werden alle Aufgaben gesammelt dargestellt. Die vier Kategorien werden **nicht als eigene Seiten** umgesetzt, sondern als Filter innerhalb dieser zentralen Aufgabenliste verwendet.

Die Seite soll folgende Kategorien unterstützen:

- Privat
- Arbeit
- Sport
- Sonstiges

Standardmässig soll die Seite alle **offenen** Aufgaben aus allen Kategorien anzeigen. Nutzer:innen sollen die Anzeige über Filter nach Kategorie, Status, Fälligkeit und optional Priorität einschränken können.

### 3. Kalender-Seite

Die dritte Hauptseite soll eine **Kalender-Seite** sein. Sie zeigt alle terminierten To-Dos in einer Wochenansicht an.

Standardmässig soll die aktuelle Woche angezeigt werden. Nutzer:innen sollen in die vorherige und nächste Woche navigieren können und über einen `Heute`-Button wieder zur aktuellen Woche zurückspringen können.

### 4. Einstellungen-Seite

Die Einstellungen-Seite kann als Platzhalter für spätere Funktionen dienen.

Mögliche Inhalte:

- Platzhalter für Nutzer:innen-Einstellungen
- Platzhalter für Design- oder Theme-Einstellungen
- Platzhalter für Kategorien oder Bereiche

> Platzhalter: Diese Seite ist optional und kann im Prototyp zunächst leer oder vereinfacht sein.

---

## Navigation

Die App soll eine klare Navigation enthalten, damit Nutzer:innen einfach zwischen den Hauptseiten wechseln können.

Hauptnavigation:

- Dashboard
- Alle To-Dos
- Kalender

Anforderungen:

- Die aktive Seite soll visuell hervorgehoben werden.
- Die Navigation soll auf Desktop, Tablet und Mobile gut nutzbar sein.
- Bootstrap kann für Navbar, Buttons, Container und responsive Darstellung verwendet werden.
- Die Navigation soll im Layout, zum Beispiel in `src/routes/+layout.svelte`, eingebunden werden, damit sie auf allen Hauptseiten sichtbar ist.
- Die Einstellungen-Seite kann optional verlinkt werden, falls sie im Prototyp umgesetzt wird.

---

## Page 1: Dashboard

Die Dashboard-Seite ist die Startseite der Anwendung.

### Ziel des Dashboards

Das Dashboard soll auf einen Blick zeigen:

- welche Aufgaben heute fällig sind
- wie gut Aufgaben rechtzeitig erledigt werden
- wie viele Aufgaben diesen Monat noch offen sind
- wie viele Aufgaben diesen Monat terminiert sind
- wie sich die erledigten Aufgaben über die Monate entwickeln

---

## Dashboard Layout

Das Dashboard soll in drei Hauptbereiche gegliedert werden:

1. Linker Bereich: heutige To-Dos
2. Rechter Bereich: Übersicht und Statistiken
3. Unterer Bereich: Liniendiagramm mit erledigten Aufgaben pro Monat

Bootstrap soll als Grundlage für das Layout verwendet werden.

Empfohlen:

- Bootstrap Container
- Bootstrap Row und Col-System
- Bootstrap Cards
- Bootstrap Badges
- Bootstrap Progress Bars
- responsives Grid

Beispielhafte Desktop-Aufteilung:

```text
┌───────────────────────────────┬───────────────────────────────┐
│ Heute terminierte To-Dos       │ Übersicht / Statistiken        │
│                               │                               │
│ - Aufgabe 1                   │ On-time Erledigung             │
│ - Aufgabe 2                   │ Offene Aufgaben im Monat       │
│ - Aufgabe 3                   │ Aufgaben fällig im Monat       │
└───────────────────────────────┴───────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│ Liniendiagramm: gelöste Aufgaben pro Monat                    │
└───────────────────────────────────────────────────────────────┘
```

Auf mobilen Geräten sollen die Bereiche untereinander dargestellt werden.

---

## Dashboard: Linker Bereich – heutige To-Dos

Links auf dem Dashboard sollen alle To-Dos angezeigt werden, die **heute terminiert** sind.

Wichtig:

- Es sollen alle Aufgaben mit heutigem Fälligkeitsdatum angezeigt werden.
- Die Anzeige soll unabhängig davon sein, welchem Bereich, Projekt oder welcher Kategorie die Aufgabe zugeordnet ist.
- Aufgaben sollen übersichtlich in Cards oder Listenelementen dargestellt werden.
- Aufgaben sollen direkt auf dem Dashboard als erledigt markiert werden können.

Jede Aufgabe kann folgende Informationen anzeigen:

- Titel der Aufgabe
- Kategorie oder Bereich
- Priorität, falls vorhanden
- Status der Aufgabe
- Button oder Checkbox zum Erledigen
- Button zum Bearbeiten oder Löschen, falls im Prototyp bereits umgesetzt

Wenn heute keine Aufgaben fällig sind, soll eine freundliche Empty-State-Meldung angezeigt werden.

Beispieltext:

> Keine Aufgaben für heute. Du kannst vorausplanen oder den freien Tag genießen.

---

## Dashboard: Rechter Bereich – Übersicht und Statistiken

Rechts auf dem Dashboard soll eine kompakte Übersicht mit wichtigen Kennzahlen dargestellt werden.

### Pflichtinformationen

Die rechte Übersicht soll mindestens folgende Informationen enthalten:

- On-time-Erledigung der Aufgaben
- offene Aufgaben für den aktuellen Monat
- Anzahl der Aufgaben, deren Erledigung im aktuellen Monat terminiert ist
- Anzahl überfälliger Aufgaben

### On-time-Erledigung

Die On-time-Erledigung zeigt, wie viele Aufgaben rechtzeitig erledigt wurden.

Die Darstellung ist frei wählbar, zum Beispiel:

- Prozentzahl
- Bootstrap Progress Bar
- kleines Diagramm
- Statistik-Card

Beispielhafte Beschriftungen:

- `On-time completion`
- `Rechtzeitig erledigt`
- `Erledigung pünktlich`

### Offene Aufgaben im aktuellen Monat

Diese Kennzahl zeigt, wie viele Aufgaben im aktuellen Monat noch offen sind.

Beispielhafte Beschriftung:

- `Offene Aufgaben diesen Monat`

### Aufgaben mit Termin im aktuellen Monat

Diese Kennzahl zeigt die Anzahl aller Aufgaben, deren Erledigung im aktuellen Monat terminiert ist.

Beispielhafte Beschriftung:

- `Aufgaben fällig diesen Monat`

### Überfällige Aufgaben

Diese Kennzahl zeigt, wie viele Aufgaben bereits fällig waren und noch nicht erledigt sind.

Diese Information soll besonders sichtbar sein, da sie für Nutzer:innen wichtig ist.

Beispielhafte Beschriftung:

- `Überfällige Aufgaben`

---

## Dashboard: Unterer Bereich – Liniendiagramm

Unterhalb der beiden oberen Dashboard-Bereiche soll ein Liniendiagramm dargestellt werden.

Das Diagramm soll zeigen, wie viele Aufgaben pro Monat erledigt wurden.

Anforderungen:

- X-Achse: Monate
- Y-Achse: Anzahl erledigter Aufgaben
- Titel: `Gelöste Aufgaben pro Monat`
- Es dürfen zunächst Platzhalterdaten verwendet werden.
- Das Diagramm soll später mit echten Aufgaben-Daten verbunden werden können.

Falls die Diagramm-Umsetzung zu aufwendig ist, darf zunächst eine Platzhalter-Card mit einer Diagramm-Beschreibung eingesetzt werden.

Beispiel-Platzhalter:

> Hier wird später ein Liniendiagramm mit den erledigten Aufgaben pro Monat angezeigt.

---

## Weitere sinnvolle Dashboard-Informationen

Die folgenden Informationen können zusätzlich ergänzt werden, wenn genug Zeit vorhanden ist.

### Nächste anstehende Aufgaben

Zeige eine kleine Vorschau auf Aufgaben, die in den nächsten 7 Tagen fällig sind.

Diese Information ist hilfreich, damit Nutzer:innen nicht nur den heutigen Tag, sondern auch die kommende Woche im Blick haben.

### Prioritätsübersicht

Falls Aufgaben Prioritäten haben, kann eine kleine Übersicht angezeigt werden.

Beispiele:

- hohe Priorität
- mittlere Priorität
- niedrige Priorität

### Fortschritt im aktuellen Monat

Zeige, wie viele Aufgaben im aktuellen Monat bereits erledigt wurden.

Mögliche Darstellung:

- Statistik-Card
- Prozentzahl
- Progress Bar

### Kategorien- oder Bereichsübersicht

Falls Aufgaben Kategorien oder Bereichen zugeordnet werden, kann eine kleine Übersicht nach Kategorie angezeigt werden.

Beispiele:

- Privat
- Arbeit
- Sport
- Sonstiges

### Motivations- oder Hinweisbereich

Optional kann ein kleiner Bereich mit einem motivierenden Satz oder einem Hinweis angezeigt werden.

Beispiel:

> Kleine Schritte bringen dich jeden Tag weiter.

---

## Dashboard Must-have Elements

Die Dashboard-Seite soll mindestens folgende Elemente enthalten:

- heutige To-Dos
- On-time-Erledigung
- offene Aufgaben im aktuellen Monat
- Aufgaben mit Termin im aktuellen Monat
- Anzahl überfälliger Aufgaben
- Liniendiagramm oder Platzhalter für gelöste Aufgaben pro Monat
- responsives Bootstrap-Layout

---

## Dashboard Nice-to-have Elements

Diese Elemente können ergänzt werden, wenn die Grundfunktionen funktionieren:

- Aufgaben der nächsten 7 Tage
- Prioritätsübersicht
- Fortschritt im aktuellen Monat
- Übersicht nach Kategorie oder Bereich
- Motivationsbereich
- kleine visuelle Hervorhebungen für wichtige Kennzahlen

---

## Page 2: Alle To-Dos

Die Alle-To-Dos-Seite ist die zentrale Verwaltungsseite für alle Aufgaben. Die Kategorien **Privat**, **Arbeit**, **Sport** und **Sonstiges** sollen hier als Filter verwendet werden, nicht als eigene Unterseiten.

### Ziel der Alle-To-Dos-Seite

Die Seite soll Nutzer:innen ermöglichen, alle Aufgaben an einem Ort zu erfassen, zu planen, zu filtern, zu bearbeiten und als erledigt zu markieren.

Standardansicht:

- Alle offenen Aufgaben anzeigen
- Aufgaben aus allen Kategorien anzeigen
- Erledigte Aufgaben ausblenden, solange kein anderer Filter gewählt wurde

### Layout der Alle-To-Dos-Seite

Die Seite soll übersichtlich und funktional aufgebaut sein.

Empfohlener Aufbau:

1. Seitenüberschrift `Alle To-Dos`
2. Kurze Beschreibung oder Hinweistext
3. Aktionsbereich mit Buttons
4. Filter- und Sortierbereich
5. Aufgabenliste
6. Empty-State-Meldung, falls keine Aufgaben zum aktuellen Filter passen

Bootstrap soll für Layout, Buttons, Formulare, Cards, Badges und responsive Darstellung verwendet werden.

### Übersichtskarten auf der Alle-To-Dos-Seite

Die Alle-To-Dos-Seite soll optional kleine Übersichtskarten enthalten, damit Nutzer:innen sofort eine Zusammenfassung der aktuellen Aufgaben sehen.

Mögliche Kennzahlen:

- offene Aufgaben
- erledigte Aufgaben
- überfällige Aufgaben
- nicht terminierte Aufgaben

Diese Übersicht darf vereinfacht umgesetzt werden. Falls sie im Layout zu viel Platz braucht, kann sie später reduziert oder entfernt werden.

### Aktionsbereich

Auf der Alle-To-Dos-Seite sollen mindestens zwei zentrale Aktionen verfügbar sein:

- `Neues To-Do erfassen`
- `ToDo's terminieren`

#### Neues To-Do erfassen

Der Button `Neues To-Do erfassen` soll ein **Bootstrap Modal** öffnen, mit dem eine neue Aufgabe erstellt werden kann. Alternativ darf im Prototyp ein eingeblendetes Formular verwendet werden, falls ein Modal zu aufwendig ist.

Das Formular soll klar strukturiert sein und folgende Felder enthalten:

- Titel der Aufgabe
- Beschreibung, optional
- Kategorie: Privat, Arbeit, Sport oder Sonstiges
- Deadline / Fälligkeitsdatum, optional
  - Es soll nur ein Datum ausgewählt werden.
  - Eine Uhrzeit ist nicht notwendig.
- Priorität
  - Niedrig
  - Mittel
  - Hoch
- geschätzte Dauer
  - 30 min
  - 1 h
  - 2 h
  - 4 h
  - ganztägig
- Status
  - Offen
  - Erledigt
- Checkbox: wiederkehrende Aufgabe

Wenn auf der Alle-To-Dos-Seite bereits ein Kategorie-Filter aktiv ist, soll diese Kategorie im Formular automatisch vorausgewählt werden.

Beispiel:

- Wenn der Filter auf `Sport` gesetzt ist, soll im Modal die Kategorie `Sport` vorausgewählt sein.
- Die Kategorie soll trotzdem manuell geändert werden können.

Wenn keine Kategorie vorausgewählt ist, soll ein Platzhalter wie `Kategorie auswählen` angezeigt werden.

##### Wiederkehrende Aufgaben

Aufgaben sollen optional als wiederkehrend markiert werden können.

Wenn die Checkbox `wiederkehrende Aufgabe` aktiviert ist, sollen zusätzliche Optionen eingeblendet werden.

Mögliche Wiederholungsoptionen:

- täglich
- wöchentlich
- monatlich

Bei wöchentlichen Aufgaben soll ein oder mehrere Wochentage ausgewählt werden können.

Beispiele:

- Training jeden Montag
- Training jeden Montag und Mittwoch
- Monatsplanung einmal pro Monat

Für den ersten Prototyp dürfen wiederkehrende Aufgaben auch zunächst nur im Datenmodell gespeichert und visuell angezeigt werden. Die automatische Erstellung zukünftiger Aufgaben ist optional.

##### Pflichtfelder und Standardwerte

Pflichtfelder:

- Titel
- Kategorie
- Priorität
- Status

Optionale Felder:

- Beschreibung
- Deadline / Fälligkeitsdatum
- geschätzte Dauer
- Wiederholungsoptionen

Standardwerte:

- Status: `Offen`
- Priorität: `Mittel`
- Deadline: leer
- geschätzte Dauer: leer oder `30 min`

Wenn keine Deadline ausgewählt wird, soll die Aufgabe als `nicht terminiert` gelten.

##### Modal-Aktionen

Das Modal soll mindestens zwei Buttons enthalten:

- `Speichern`
- `Abbrechen`

Nach dem Speichern oder Abbrechen soll sich das Modal schließen.

#### ToDo's terminieren

Der Button `ToDo's terminieren` soll Nutzer:innen helfen, offene Aufgaben ohne Deadline gezielt einem Tag zuzuordnen.

Der Button soll auf der **Alle-To-Dos-Seite** im Aktionsbereich sichtbar sein. Beim Klick soll ein **Bootstrap Modal** oder ein eingeblendeter Planungsbereich geöffnet werden.

##### Ziel der Funktion

Die Funktion soll alle offenen, nicht terminierten Aufgaben sammeln und ermöglichen, für jede dieser Aufgaben ein Fälligkeitsdatum auszuwählen.

Nicht terminierte Aufgaben sind Aufgaben ohne Deadline / Fälligkeitsdatum.

##### Angezeigte Aufgaben

Im Modal sollen standardmässig nur Aufgaben angezeigt werden, die folgende Bedingungen erfüllen:

- Status ist `Offen`
- es ist keine Deadline / kein Fälligkeitsdatum gesetzt

Erledigte Aufgaben ohne Deadline müssen nicht standardmässig angezeigt werden.

##### Angezeigte Informationen pro Aufgabe

Jede nicht terminierte Aufgabe soll im Modal übersichtlich dargestellt werden.

Pro Aufgabe sollen mindestens folgende Informationen sichtbar sein:

- Titel
- Beschreibung, falls vorhanden
- Kategorie
- Priorität
- geschätzte Dauer
- Status

##### Terminieren einer Aufgabe

Für jede nicht terminierte Aufgabe soll ein Datumsfeld angezeigt werden.

Nutzer:innen sollen für jede Aufgabe ein Fälligkeitsdatum auswählen können.
Eine Uhrzeit ist nicht notwendig.

Nach dem Speichern soll die Aufgabe nicht mehr als `nicht terminiert` gelten.

Die terminierte Aufgabe soll danach automatisch an den passenden Stellen erscheinen:

- auf der Alle-To-Dos-Seite
- auf dem Dashboard, falls die Deadline heute ist
- auf der Kalender-Seite am ausgewählten Datum

##### Optionale Schnellwahl-Buttons

Zur einfacheren Planung können Schnellwahl-Buttons ergänzt werden.

Beispiele:

- `Heute`
- `Morgen`
- `Nächste Woche`

Diese Schnellwahl-Buttons sind optional, aber für die Benutzerfreundlichkeit sinnvoll.

##### Modal-Aktionen

Das Modal soll mindestens zwei Buttons enthalten:

- `Speichern`
- `Abbrechen`

Nach dem Speichern oder Abbrechen soll sich das Modal schließen.

##### Empty State

Wenn es keine offenen, nicht terminierten Aufgaben gibt, soll eine freundliche Empty-State-Meldung angezeigt werden.

Beispiel:

> Keine nicht terminierten Aufgaben zum Planen vorhanden.

Für den ersten Prototyp darf die Funktion vereinfacht umgesetzt werden. Wichtig ist, dass der Button vorhanden ist und klar ersichtlich wird, dass offene Aufgaben ohne Deadline geplant werden können.

### Filter

Die Alle-To-Dos-Seite soll mehrere Filter anbieten. Die Filter sollen miteinander kombinierbar sein, soweit dies im Prototyp sinnvoll umsetzbar ist.

#### Kategorie-Filter

- Alle Kategorien
- Privat
- Arbeit
- Sport
- Sonstiges

#### Status-Filter

- Offen
- Erledigt
- Alle

Der Standardfilter soll `Offen` sein.

#### Fälligkeits-Filter

- Alle Termine
- Heute fällig
- Überfällig
- Diese Woche
- Dieser Monat
- Nicht terminiert

#### Prioritäts-Filter, optional

- Alle Prioritäten
- Hoch
- Mittel
- Niedrig

### Sortierung

Die Aufgaben sollen sortiert werden können.

Empfohlene Sortieroptionen:

- nach Fälligkeitsdatum
- nach Priorität
- nach Erstellungsdatum

Die Standardsortierung soll wichtige Aufgaben zuerst zeigen:

1. überfällige Aufgaben
2. heute fällige Aufgaben
3. bald fällige Aufgaben
4. nicht terminierte Aufgaben

### Darstellung einer Aufgabe

Jede Aufgabe soll als Bootstrap Card oder Listenelement dargestellt werden.

Eine Aufgabe soll folgende Informationen anzeigen:

- Titel
- Beschreibung, falls vorhanden
- Kategorie
- Status
- Fälligkeitsdatum, falls vorhanden
- Priorität, falls vorhanden
- geschätzte Dauer, falls vorhanden
- Hinweis, ob die Aufgabe wiederkehrend ist
- visuelle Badges, zum Beispiel `Überfällig`, `Heute`, `Nicht terminiert` oder `Hohe Priorität`

### Aktionen pro Aufgabe

Für jede Aufgabe sollen folgende Aktionen möglich sein:

- als erledigt markieren
- bearbeiten
- löschen
- Fälligkeitsdatum hinzufügen oder ändern
- Fälligkeitsdatum entfernen, optional
- Wiederholung anzeigen oder bearbeiten, optional

### Aufgaben bearbeiten

Nutzer:innen sollen bestehende Aufgaben bearbeiten können.

Beim Klick auf `Bearbeiten` soll ein Bootstrap Modal geöffnet werden. Dieses Modal kann die gleiche Grundstruktur wie das `Neues To-Do erfassen`-Modal verwenden.

Folgende Felder sollen bearbeitet werden können:

- Titel
- Beschreibung
- Kategorie
- Deadline / Fälligkeitsdatum
- Priorität
- geschätzte Dauer
- Status
- Wiederholungseinstellungen

Nach dem Speichern sollen die Änderungen direkt in der Aufgabenliste, im Dashboard und im Kalender sichtbar sein.

### Aufgaben löschen mit Bestätigung

Beim Löschen einer Aufgabe soll nicht sofort gelöscht werden. Stattdessen soll zuerst eine Bestätigung angezeigt werden, zum Beispiel über ein Bootstrap Modal.

Beispieltext:

> Möchtest du diese Aufgabe wirklich löschen?

Das Bestätigungsfenster soll mindestens zwei Aktionen enthalten:

- `Löschen`
- `Abbrechen`

Erst nach der Bestätigung soll die Aufgabe wirklich entfernt werden.

### Empty State

Wenn keine Aufgaben zum aktuellen Filter passen, soll eine freundliche Meldung angezeigt werden.

Beispieltexte:

> Keine offenen Aufgaben gefunden.

> Für diesen Filter gibt es aktuell keine To-Dos.

> Du hast in dieser Kategorie momentan nichts offen.

### Hinweis zu den Kategorien

Die Kategorien sind feste Werte im Prototyp. Jede Aufgabe soll genau einer Kategorie zugeordnet sein.

Erlaubte Kategorien:

- Privat
- Arbeit
- Sport
- Sonstiges

Das Dashboard soll weiterhin Aufgaben aus allen Kategorien berücksichtigen, wenn sie heute fällig sind oder in die Statistik fallen.

---

## Empty States

Die App soll hilfreiche Empty-State-Meldungen anzeigen, wenn keine Aufgaben vorhanden sind oder ein Filter keine Ergebnisse liefert.

Beispiele:

- `Keine Aufgaben für heute.`
- `Keine offenen Aufgaben gefunden.`
- `Für diesen Filter gibt es aktuell keine To-Dos.`
- `Keine nicht terminierten Aufgaben zum Planen vorhanden.`
- `Keine terminierten Aufgaben in dieser Woche.`

Empty States sollen freundlich formuliert sein und bei Bedarf eine nächste Aktion vorschlagen, zum Beispiel eine neue Aufgabe zu erfassen.

---

## Page 3: Kalender

Die Kalender-Seite soll alle terminierten To-Dos in einer übersichtlichen Wochenansicht darstellen.

### Ziel der Kalender-Seite

Die Kalender-Seite soll Nutzer:innen helfen zu sehen, an welchen Tagen Aufgaben fällig sind.

Wichtig:

- Nur Aufgaben mit Deadline / Fälligkeitsdatum sollen im Kalender erscheinen.
- Nicht terminierte Aufgaben sollen nicht im Kalender angezeigt werden.
- Erledigte Aufgaben sollen weiterhin angezeigt werden.
- Erledigte Aufgaben sollen optisch blasser dargestellt werden, damit sie von offenen Aufgaben unterscheidbar sind.

### Standardansicht

Die Standardansicht soll immer die **aktuelle Woche** zeigen.

Die Woche soll idealerweise von Montag bis Sonntag dargestellt werden.

Beispiel:

```text
Montag | Dienstag | Mittwoch | Donnerstag | Freitag | Samstag | Sonntag
```

Da Aufgaben nur ein Datum und keine Uhrzeit haben, braucht der Kalender keine Stundenansicht und keine Zeitslots.

### Kalender-Layout

Der Kalender soll als Wochenansicht mit sieben Spalten aufgebaut sein:

- Montag
- Dienstag
- Mittwoch
- Donnerstag
- Freitag
- Samstag
- Sonntag

Jeder Tag soll als Card oder Spalte dargestellt werden. Innerhalb eines Tages sollen die terminierten Aufgaben dieses Datums angezeigt werden.

Bootstrap soll für das Layout verwendet werden, zum Beispiel mit:

- Container
- Row und Col-System
- Cards
- Badges
- Buttons
- responsive Grid-Klassen

Auf mobilen Geräten dürfen die Tage untereinander angezeigt werden, damit die Seite gut lesbar bleibt.

### Kalender-Navigation

Die Kalender-Seite soll Navigationselemente enthalten:

- Button `Vorherige Woche`
- Button `Nächste Woche`
- Button `Heute`
- Anzeige des aktuell ausgewählten Wochenbereichs

Beispiel für die Wochenbereich-Anzeige:

> 13. Mai 2026 – 19. Mai 2026

Nutzer:innen müssen die Möglichkeit haben:

- in die Zukunft zu navigieren
- in die Vergangenheit zu navigieren
- direkt zur aktuellen Woche zurückzukehren

### Darstellung der Aufgaben im Kalender

Jede Aufgabe im Kalender soll kompakt dargestellt werden.

Pro Aufgabe sollen mindestens folgende Informationen sichtbar sein:

- Titel
- Kategorie
- Priorität
- Status
- geschätzte Dauer
- Hinweis, falls die Aufgabe wiederkehrend ist

Visuelle Darstellung:

- offene Aufgaben sollen normal dargestellt werden
- erledigte Aufgaben sollen blasser / ausgegraut dargestellt werden
- Kategorien können mit Bootstrap Badges angezeigt werden
- Prioritäten können mit Badges oder kleinen Labels angezeigt werden

Beispiel:

```text
[Sport] Training
Priorität: Mittel | Dauer: 1 h
```

### Erledigte Aufgaben im Kalender

Erledigte Aufgaben sollen weiterhin im Kalender sichtbar bleiben.

Wenn eine Aufgabe den Status `Erledigt` hat, soll sie visuell dezenter dargestellt werden, zum Beispiel:

- geringere Deckkraft / Opacity
- hellerer Hintergrund
- durchgestrichener Titel, optional
- Checkmark-Symbol, optional

Damit bleibt nachvollziehbar, welche Aufgaben an einem Tag geplant und bereits abgeschlossen wurden.

### Wiederkehrende Aufgaben im Kalender

Wiederkehrende Aufgaben sollen auf allen passenden Daten in der Kalenderansicht angezeigt werden.

Beispiele:

- Ein Training, das jeden Montag wiederholt wird, soll in jeder Woche am Montag angezeigt werden.
- Eine Aufgabe, die täglich wiederholt wird, soll an jedem Tag der angezeigten Woche erscheinen.
- Eine monatliche Aufgabe soll am passenden Datum erscheinen.

Für den ersten Prototyp darf die Darstellung wiederkehrender Aufgaben vereinfacht umgesetzt werden. Wichtig ist, dass wiederkehrende Aufgaben im Datenmodell und in der Benutzeroberfläche erkennbar sind.

### Aufgabe anklicken

Kalender-Aufgaben sollen anklickbar sein.

Wenn Nutzer:innen auf eine Aufgabe im Kalender klicken, soll ein **Bootstrap Modal** oder Pop-up geöffnet werden.

Das Pop-up soll die Informationen der Aufgabe zum Lesen anzeigen.

Das Detail-Pop-up soll mindestens enthalten:

- Titel
- Beschreibung
- Kategorie
- Deadline / Fälligkeitsdatum
- Priorität
- Status
- geschätzte Dauer
- Wiederholungsinformation, falls vorhanden

Optionale Aktionen im Detail-Pop-up:

- Aufgabe als erledigt markieren
- Aufgabe bearbeiten
- Aufgabe löschen

Für den ersten Prototyp reicht es, wenn das Pop-up die Informationen übersichtlich darstellt. Bearbeiten und Löschen dürfen optional ergänzt werden.

### Kalender-Filter

Die Kalender-Seite darf zusätzliche Filter enthalten.

Sinnvolle Filter:

- Kategorie
- Status
- Priorität

Die Filter sind optional, aber hilfreich, wenn viele Aufgaben im Kalender angezeigt werden.

### Empty State

Wenn in der ausgewählten Woche keine terminierten Aufgaben vorhanden sind, soll eine freundliche Empty-State-Meldung angezeigt werden.

Beispiel:

> Keine terminierten Aufgaben für diese Woche.

### Kalender Must-have Elements

Die Kalender-Seite soll mindestens folgende Elemente enthalten:

- Wochenansicht als Standardansicht
- aktuelle Woche beim ersten Öffnen
- Navigation zur vorherigen Woche
- Navigation zur nächsten Woche
- `Heute`-Button
- Anzeige des ausgewählten Wochenbereichs
- Anzeige aller terminierten Aufgaben
- erledigte Aufgaben bleiben sichtbar
- erledigte Aufgaben werden blasser dargestellt
- anklickbare Aufgaben mit Detail-Pop-up
- responsives Bootstrap-Layout

### Kalender Nice-to-have Elements

Diese Elemente können ergänzt werden, wenn die Grundfunktionen funktionieren:

- Filter nach Kategorie
- Filter nach Status
- Filter nach Priorität
- Aufgabe direkt aus dem Detail-Pop-up als erledigt markieren
- Aufgabe direkt aus dem Detail-Pop-up bearbeiten
- kleine visuelle Kennzeichnung für wiederkehrende Aufgaben
- einfache Animation beim Öffnen des Pop-ups

---

## Funktionsumfang

Der Funktionsumfang ist in **Must-have Features** und **Nice-to-have Features** unterteilt. Codex soll zuerst die Must-have Features umsetzen und erst danach optionale Erweiterungen ergänzen.

### Must-have Features

Die folgenden Funktionen sind für den Prototyp wichtig:

- neue Aufgabe hinzufügen
- alle Aufgaben auf der Alle-To-Dos-Seite anzeigen
- Aufgaben nach Kategorie und Status filtern
- Aufgabe als erledigt markieren
- Aufgabe löschen
- leere Eingaben verhindern
- responsive Darstellung für Desktop und mobile Geräte
- Dashboard mit heutigen To-Dos und Kennzahlen anzeigen
- zentrale Alle-To-Dos-Seite mit Kategorie- und Statusfiltern anzeigen
- Kalender-Seite mit aktueller Wochenansicht anzeigen
- terminierte Aufgaben im Kalender darstellen
- Button `ToDo's terminieren` für offene Aufgaben ohne Deadline anzeigen
- offene, nicht terminierte Aufgaben über ein Modal einem Datum zuweisen
- erledigte Aufgaben im Kalender blasser darstellen
- Detail-Pop-up beim Anklicken einer Kalender-Aufgabe anzeigen
- einfache und verständliche Benutzeroberfläche

### Nice-to-have Features

Diese Funktionen können ergänzt werden, wenn die Grundfunktionen funktionieren:

- Aufgabe bearbeiten
- Aufgaben filtern nach:
  - Kategorie
  - Status
  - alle Aufgaben
  - offene Aufgaben
  - erledigte Aufgaben
- Aufgaben in MongoDB speichern
- Anzahl offener Aufgaben anzeigen
- alle erledigten Aufgaben löschen
- Prioritäten hinzufügen
- Fälligkeitsdatum hinzufügen
- feste Kategorien Privat, Arbeit, Sport und Sonstiges verwenden
- wiederkehrende Aufgaben ergänzen
- geschätzte Dauer pro Aufgabe ergänzen
- Dark Mode
- Kalender-Filter nach Kategorie, Status und Priorität ergänzen
- Schnellwahl-Buttons wie `Heute`, `Morgen` oder `Nächste Woche` beim Terminieren ergänzen
- Aufgabe direkt aus dem Kalender-Detail-Pop-up bearbeiten
- kleine Animationen beim Hinzufügen, Löschen oder Öffnen eines Pop-ups

> Platzhalter: Weitere optionale Ideen können hier ergänzt werden.

---

## Funktionale Anforderungen im Detail

### Aufgabe hinzufügen

Nutzer:innen sollen über ein Eingabefeld eine neue Aufgabe eintragen können. Nach dem Absenden soll die Aufgabe in der To-Do-Liste erscheinen.

Für das Hinzufügen einer Aufgabe soll bevorzugt das Bootstrap Modal `Neues To-Do erfassen` verwendet werden. Das Modal soll Titel, Beschreibung, Kategorie, Deadline, Priorität, Status, geschätzte Dauer und optionale Wiederholung erfassen.

### Aufgabe abhaken

Jede Aufgabe soll als erledigt markiert werden können. Erledigte Aufgaben sollen visuell anders dargestellt werden, zum Beispiel durchgestrichen oder ausgegraut.

### Aufgabe löschen

Jede Aufgabe soll über eine Schaltfläche gelöscht werden können. Vor dem endgültigen Löschen soll eine Bestätigung erscheinen, damit Aufgaben nicht versehentlich entfernt werden.

### Aufgabe bearbeiten

Nutzer:innen sollen bestehende Aufgaben bearbeiten können. Die Bearbeitung soll bevorzugt über ein Bootstrap Modal erfolgen.

### Eingabevalidierung

Leere Aufgaben dürfen nicht hinzugefügt werden. Wenn das Eingabefeld leer ist, soll eine kurze und verständliche Rückmeldung angezeigt werden.

### Aufgaben filtern

Es sollen Filter für die zentrale Alle-To-Dos-Seite angeboten werden:

- Kategorie: Alle, Privat, Arbeit, Sport, Sonstiges
- Status: Offen, Erledigt, Alle
- Fälligkeit: Alle Termine, Heute fällig, Überfällig, Diese Woche, Dieser Monat, Nicht terminiert
- Priorität: Alle, Hoch, Mittel, Niedrig, optional

Die Standardansicht soll alle offenen Aufgaben aus allen Kategorien anzeigen.

### Nicht terminierte Aufgaben planen

Über den Button `ToDo's terminieren` sollen offene Aufgaben ohne Deadline geplant werden können.

Anforderungen:

- Der Button soll auf der Alle-To-Dos-Seite sichtbar sein.
- Beim Klick soll ein Bootstrap Modal oder ein Planungsbereich geöffnet werden.
- Angezeigt werden standardmässig nur offene Aufgaben ohne Deadline.
- Pro Aufgabe soll ein Datumsfeld verfügbar sein.
- Nutzer:innen sollen einer oder mehreren Aufgaben ein Fälligkeitsdatum zuweisen können.
- Nach dem Speichern erscheinen diese Aufgaben auf der Kalender-Seite am gewählten Datum.
- Falls eine Aufgabe auf heute terminiert wird, soll sie auch auf dem Dashboard unter den heutigen To-Dos erscheinen.
- Erledigte Aufgaben ohne Deadline müssen in diesem Modal nicht standardmässig angezeigt werden.

Optionale Ergänzung:

- Schnellwahl-Buttons für `Heute`, `Morgen` und `Nächste Woche`.

### Kalender anzeigen

Es soll eine Kalender-Seite geben, die alle Aufgaben mit Fälligkeitsdatum in einer Wochenansicht darstellt.

Anforderungen:

- Beim Öffnen soll die aktuelle Woche angezeigt werden.
- Nutzer:innen sollen zur vorherigen und nächsten Woche navigieren können.
- Ein `Heute`-Button soll zurück zur aktuellen Woche führen.
- Aufgaben ohne Deadline sollen im Kalender nicht angezeigt werden.
- Offene und erledigte Aufgaben sollen angezeigt werden.
- Erledigte Aufgaben sollen blasser dargestellt werden.
- Beim Anklicken einer Aufgabe soll ein Detail-Pop-up mit den Aufgabeninformationen erscheinen.

### Demo-Daten

Für den Prototyp dürfen Demo-Aufgaben verwendet werden, damit die Webseite bei der Präsentation nicht leer wirkt.

Demo-Daten sollen Beispiele aus allen Kategorien enthalten:

- Privat
- Arbeit
- Sport
- Sonstiges

Die Demo-Aufgaben sollen unterschiedliche Eigenschaften zeigen:

- offene und erledigte Aufgaben
- Aufgaben mit und ohne Deadline
- verschiedene Prioritäten
- verschiedene geschätzte Dauern
- mindestens ein Beispiel für eine wiederkehrende Aufgabe
- mindestens eine überfällige Aufgabe
- mindestens eine Aufgabe für den heutigen Tag

Wichtig: Demo-Daten sollen nur verwendet werden, wenn noch keine Aufgaben in MongoDB vorhanden sind. Sobald Nutzer:innen eigene Aufgaben gespeichert haben, sollen diese nicht durch Demo-Daten überschrieben werden.

### Entscheidung zur Datenspeicherung

Für dieses Projekt soll **MongoDB** als Datenspeicher verwendet werden, vorzugsweise **MongoDB Atlas**.

Begründung:

- Es ist kein SQL-Datenbankzugang vorhanden.
- Die Webseite soll später auf Netlify deployt werden.
- MongoDB Atlas kann als externe Cloud-Datenbank genutzt werden.
- Die Aufgabenstruktur ist zwar klar definiert, kann aber in MongoDB flexibel als Dokument gespeichert werden.
- Die App kann dadurch später einfacher erweitert werden, zum Beispiel mit Benutzer:innen, Login oder Synchronisation.

Wichtig:

- Die MongoDB-Verbindung darf nicht im Client-Code stehen.
- Der Connection String darf nicht in GitHub committed werden.
- Datenbankzugriffe sollen serverseitig umgesetzt werden, zum Beispiel über SvelteKit Server Routes unter `src/routes/api/todos/+server.js`.
- Sensible Werte sollen in `.env` lokal und später als Environment Variables in Netlify gespeichert werden.

### MongoDB und Netlify

Die App soll so vorbereitet werden, dass sie später auf Netlify deployt werden kann.

Empfohlene technische Umsetzung:

- SvelteKit mit `@sveltejs/adapter-netlify` verwenden.
- MongoDB Atlas als Cloud-Datenbank verwenden.
- Datenbankzugriffe nur auf der Serverseite ausführen.
- API-Endpunkte für CRUD-Funktionen erstellen:
  - `GET /api/todos` zum Laden aller Aufgaben
  - `POST /api/todos` zum Erstellen einer Aufgabe
  - `PUT /api/todos/:id` oder `PATCH /api/todos/:id` zum Bearbeiten einer Aufgabe
  - `DELETE /api/todos/:id` zum Löschen einer Aufgabe

Umgebungsvariablen:

```env
MONGODB_URI=platzhalter_mongodb_connection_string
MONGODB_DB=todo_dashboard
```

Die `.env`-Datei darf nicht in GitHub hochgeladen werden. Sie soll in `.gitignore` stehen.

### Aufgaben speichern

Aufgaben sollen in einer MongoDB Collection gespeichert werden, zum Beispiel `todos`.

Beim Laden der App sollen die Aufgaben über einen serverseitigen API-Endpunkt aus MongoDB geladen werden.

Beim Erstellen, Bearbeiten, Löschen oder Abhaken einer Aufgabe sollen die Änderungen ebenfalls über API-Endpunkte in MongoDB gespeichert werden.

Falls MongoDB lokal noch nicht eingerichtet ist, dürfen für den ersten Prototyp Demo-Daten verwendet werden. Die finale Version soll jedoch MongoDB als Persistenzlösung verwenden.

---

## Datenmodell

Eine Aufgabe kann als Objekt gespeichert werden:

```js
{
  _id: 'mongodb_object_id_or_placeholder',
  id: crypto.randomUUID(),
  title: 'Beispielaufgabe',
  description: 'Kurze Beschreibung der Aufgabe',
  status: 'offen',
  completed: false,
  createdAt: new Date().toISOString(),
  dueDate: '2026-05-20',
  completedAt: null,
  category: 'Privat',
  priority: 'mittel',
  estimatedDuration: '1 h',
  isRecurring: false,
  recurrence: null
}
```

Optional können später weitere Eigenschaften ergänzt werden:

```js
{
  recurrence: {
    frequency: 'weekly',
    weekdays: ['monday']
  },
  updatedAt: null,
  area: 'Platzhalter-Bereich',
  isImportant: false
}
```

---

## Styling Guidelines

Bootstrap soll als Hauptgrundlage für das Styling verwendet werden.

Eigenes CSS darf verwendet werden, um das Bootstrap-Design zu erweitern oder anzupassen.

Das Design soll folgende Prinzipien erfüllen:

- modernes Dashboard-Layout
- gute Lesbarkeit
- klare visuelle Hierarchie
- responsive Darstellung für Desktop, Tablet und Mobile
- konsistente Abstände
- Cards für gruppierte Informationen
- Bootstrap Buttons für Aktionen
- Bootstrap Form Controls für Eingabefelder
- Bootstrap Badges für Status, Kategorien oder Prioritäten
- Bootstrap Progress Bars für Fortschritt oder On-time-Erledigung
- nicht zu viele Farben verwenden
- wichtige Informationen visuell hervorheben

### Layout-Stil

- heller, ruhiger Hintergrund
- zentrierter Hauptbereich mit `container` oder `container-fluid`
- übersichtliche Abstände zwischen Cards
- klare Überschriften
- ausreichend Weißraum
- einfache und konsistente Icons oder Symbole, falls verwendet

> Platzhalter: Hier können später konkrete Farben, Schriftgrößen oder Designreferenzen ergänzt werden.

---

## Anforderungen an den Code

Bitte achte beim Schreiben des Codes auf folgende Punkte:

- saubere und verständliche Benennung von Variablen und Funktionen
- Komponenten sinnvoll trennen
- Kommentare nur dort, wo sie wirklich helfen
- keine unnötig komplizierten Lösungen
- einfache Lesbarkeit für Anfänger:innen
- Bootstrap-Klassen sinnvoll verwenden
- eigenes CSS übersichtlich halten
- wiederverwendbare Hilfsfunktionen für Datumslogik verwenden
- keine unnötigen externen Abhängigkeiten einbauen
- MongoDB-Zugriff nur serverseitig durchführen
- API-Funktionen klar nach Laden, Erstellen, Bearbeiten und Löschen trennen
- Fehler beim Speichern oder Laden verständlich behandeln

---

## Barrierefreiheit

Bitte berücksichtige grundlegende Accessibility-Aspekte:

- Buttons sollen verständliche Beschriftungen haben.
- Eingabefelder sollen mit Labels verbunden sein.
- Kontraste sollen ausreichend hoch sein.
- Die Webseite soll auch mit Tastatur bedienbar sein.
- Checkboxen zum Erledigen von Aufgaben sollen eindeutig beschriftet sein.
- Diagramme sollen zusätzlich eine textliche Zusammenfassung oder Beschriftung haben.

---

## Arbeitsweise mit Codex

Codex soll nicht nur einzelne Codezeilen erzeugen, sondern den Aufbau des Projekts Schritt für Schritt unterstützen.

Bitte gehe beim Programmieren so vor:

1. SvelteKit-Projekt erstellen
2. Bootstrap einbinden
3. Projektstruktur prüfen
4. Grundlayout in `+layout.svelte` und `+page.svelte` aufbauen
5. Navigation mit `Dashboard`, `Alle To-Dos` und `Kalender` erstellen
6. Dashboard-Struktur mit linkem, rechtem und unterem Bereich erstellen
7. zentrale Alle-To-Dos-Seite unter `src/routes/tasks/+page.svelte` erstellen
8. Übersichtskarten auf der Alle-To-Dos-Seite ergänzen
9. Bootstrap Modal zum Hinzufügen von Aufgaben erstellen
10. Aufgabenliste anzeigen
11. Demo-Daten einbauen, falls noch keine Aufgaben gespeichert sind
12. feste Kategorien Privat, Arbeit, Sport und Sonstiges einbauen
13. Kategorie-, Status- und Fälligkeitsfilter einbauen
14. Heutige Aufgaben auf dem Dashboard filtern
15. Abhaken von Aufgaben ergänzen
16. Bearbeiten von Aufgaben über ein Modal ergänzen
17. Löschen von Aufgaben mit Bestätigung ergänzen
18. Planen/Terminieren von Aufgaben über `ToDo's terminieren` ergänzen
19. geschätzte Dauer und wiederkehrende Aufgaben im Formular und Datenmodell ergänzen
20. MongoDB-Anbindung und API-Endpunkte ergänzen
21. Dashboard-Kennzahlen berechnen
22. Diagramm oder Diagramm-Platzhalter ergänzen
23. Kalender-Seite unter `src/routes/calendar/+page.svelte` erstellen
24. Wochenansicht mit aktueller Woche, vorheriger/nächster Woche und Heute-Button umsetzen
25. Terminierte Aufgaben im Kalender anzeigen
26. Detail-Pop-up für Kalender-Aufgaben ergänzen
27. Empty States für leere Ansichten ergänzen
28. Responsives Design testen
29. Code aufräumen und bei Bedarf Komponenten auslagern

---

## Erwartetes Ergebnis

Am Ende soll eine funktionsfähige To-Do-Webseite vorhanden sein, die lokal mit SvelteKit gestartet werden kann.

Die Nutzer:innen sollen über eine klare Navigation zwischen Dashboard, Alle To-Dos und Kalender wechseln können.

Die Nutzer:innen sollen Aufgaben:

- hinzufügen
- abhaken
- bearbeiten
- löschen
- nach Kategorie filtern
- nach Status filtern
- nach Fälligkeit filtern
- planen oder terminieren
- mit geschätzter Dauer erfassen
- optional als wiederkehrend markieren
- mit Löschbestätigung entfernen
- nach dem Neuladen weiterhin sehen können, da sie in MongoDB gespeichert werden

Zusätzlich soll die Kalender-Seite ermöglichen:

- aktuelle Woche als Standardansicht sehen
- in vergangene und zukünftige Wochen navigieren
- alle terminierten Aufgaben im Kalender sehen
- erledigte Aufgaben weiterhin sehen, aber blasser dargestellt
- Aufgaben anklicken und Details in einem Pop-up lesen

Zusätzlich soll die Alle-To-Dos-Seite kleine Übersichtskarten für offene, erledigte, überfällige und nicht terminierte Aufgaben enthalten.

Die App darf Demo-Daten verwenden, wenn noch keine gespeicherten Aufgaben in MongoDB vorhanden sind.

Zusätzlich soll das Dashboard wichtige Informationen darstellen:

- heutige To-Dos
- On-time-Erledigung
- offene Aufgaben im aktuellen Monat
- Aufgaben mit Termin im aktuellen Monat
- überfällige Aufgaben
- erledigte Aufgaben pro Monat als Diagramm oder Platzhalter

Die Seite soll visuell ansprechend, einfach verständlich, responsiv und technisch sauber aufgebaut sein.

---

## Hinweise für Codex

Bitte arbeite anfängerfreundlich und erkläre wichtige Schritte kurz. Vermeide unnötig komplexe Lösungen. Wenn mehrere Lösungswege möglich sind, wähle die einfachste und verständlichste Variante.

Wenn Code erstellt wird, soll er vollständig und direkt verwendbar sein. Bitte achte darauf, dass die App mit `npm run dev` gestartet werden kann.

Falls bestimmte Informationen noch fehlen, verwende sinnvolle Platzhalter und markiere sie klar als Platzhalter.

---

## Qualitätscheck

Vor Abschluss des Projekts soll geprüft werden:

- Startet das Projekt mit `npm run dev` ohne Fehler?
- Ist Bootstrap korrekt eingebunden?
- Funktioniert die Navigation zwischen Dashboard, Alle To-Dos und Kalender?
- Wird die aktive Seite in der Navigation hervorgehoben?
- Funktioniert das Hinzufügen von Aufgaben über das Modal?
- Funktioniert das Abhaken von Aufgaben?
- Funktioniert das Bearbeiten von Aufgaben über ein Modal?
- Werden Kategorie, Deadline, Priorität, Status und geschätzte Dauer korrekt gespeichert?
- Können Aufgaben als wiederkehrend markiert werden?
- Funktioniert das Löschen von Aufgaben?
- Wird vor dem Löschen eine Bestätigung angezeigt?
- Funktionieren die Filter nach Kategorie, Status und Fälligkeit?
- Werden leere Eingaben verhindert?
- Bleiben Aufgaben nach dem Neuladen erhalten, weil sie aus MongoDB geladen werden?
- Werden Demo-Daten nur verwendet, wenn noch keine Aufgaben in MongoDB gespeichert sind?
- Gibt es keine MongoDB-Verbindungsdaten im Client-Code?
- Werden sensible Umgebungsvariablen nicht in GitHub committed?
- Werden heutige Aufgaben korrekt auf dem Dashboard angezeigt?
- Werden Monatsstatistiken sinnvoll dargestellt?
- Werden die Kategorien Privat, Arbeit, Sport und Sonstiges korrekt verwendet?
- Gibt es eine zentrale Alle-To-Dos-Seite statt vier separater Kategorie-Seiten?
- Gibt es Übersichtskarten für offene, erledigte, überfällige und nicht terminierte Aufgaben?
- Gibt es eine Kalender-Seite mit Wochenansicht?
- Wird beim Öffnen der Kalender-Seite die aktuelle Woche angezeigt?
- Funktionieren vorherige Woche, nächste Woche und Heute-Button?
- Werden nur terminierte Aufgaben im Kalender angezeigt?
- Bleiben erledigte Aufgaben im Kalender sichtbar und werden blasser dargestellt?
- Öffnet sich beim Anklicken einer Kalender-Aufgabe ein Detail-Pop-up?
- Werden überfällige Aufgaben sichtbar angezeigt?
- Gibt es ein Liniendiagramm oder einen klaren Platzhalter dafür?
- Ist die Webseite auf Mobilgeräten gut lesbar?
- Ist der Code verständlich strukturiert?
- Gibt es hilfreiche Empty-State-Meldungen für leere Ansichten?
- Sind die wichtigsten Elemente barrierearm bedienbar?

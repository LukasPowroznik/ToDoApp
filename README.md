# Projektdokumentation - ToDoApp

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen und Artefakte](#3-vorgehen-und-artefakte)
4. [Aktueller Prototyp](#4-aktueller-prototyp)
5. [Lokales Setup](#5-lokales-setup)
6. [Deployment auf Netlify](#6-deployment-auf-netlify)
7. [Projektorganisation](#7-projektorganisation)
8. [Testing, Validierung und nächste Schritte](#8-testing-validierung-und-nächste-schritte)
9. [KI-Deklaration](#9-ki-deklaration)
10. [Anhang](#10-anhang)

## 1. Ausgangslage

Viele To-Do-Listen sammeln To-Dos, zeigen aber nicht immer klar, was heute relevant ist, was bereits überfällig ist und welche To-Dos noch terminiert werden müssen. Dieses Projekt untersucht als Prototyp, wie eine kleine To-Do-App To-Dos übersichtlich strukturieren, planen und in einer Kalenderansicht sichtbar machen kann.

- **Problem:** To-Dos sollen nicht nur gesammelt, sondern nach Status, Termin, Deadline, Kategorie und Priorität schnell erfassbar sein.
- **Ziel:** Aufbau eines bedienbaren SvelteKit-Prototyps mit Dashboard, To-Do-Verwaltung, MongoDB-Speicherung und Kalenderansicht.
- **Primäre Zielgruppe:** Einzelpersonen, die private, schulische oder berufliche To-Dos kompakt planen möchten.
- **Weitere Stakeholder:** Lehrperson und Mitstudierende im Modul Prototyping.

## 2. Lösungsidee

Die ToDoApp ist als webbasiertes Dashboard aufgebaut. Die Startseite zeigt Kennzahlen und heutige To-Dos. Die To-Do-Ansicht erlaubt das Erfassen, Filtern, Bearbeiten, Löschen, Terminieren und Abschliessen von To-Dos. Die Kalenderansicht zeigt terminierte To-Dos in einer Wochenansicht und berücksichtigt wiederkehrende To-Dos.

Die App kombiniert damit zwei Perspektiven:

- **Listenperspektive:** To-Dos lassen sich nach Status, Kategorie, Priorität und Terminierung filtern.
- **Zeitperspektive:** Geplante To-Dos erscheinen im Wochenkalender und können dort im Kontext ihres Datums betrachtet werden.

## 3. Vorgehen und Artefakte

Die Umsetzung erfolgte schrittweise von einem statischen SvelteKit-Prototyp zu einer datenbankgestützten Anwendung.

### 3.1 Understand und Define

- Die App richtet sich an Personen, die einfache To-Do-Verwaltung ohne komplexes Projektmanagement brauchen.
- Wichtige Anforderungen sind schnelle Orientierung, klare Prioritäten, erkennbare Termine, Deadlines und einfache Navigation.

### 3.2 Sketch

- Erste Layoutideen wurden direkt als SvelteKit-Prototyp umgesetzt.
- Die Grundstruktur besteht aus Navigation, Dashboard, To-Do-Liste, Formular-Modals und Kalenderansicht.

### 3.3 Decide

- Ein Dashboard als Startseite wurde gewählt, weil es den aktuellen To-Do-Stand schnell sichtbar macht.
- Die getrennten Seiten `/tasks` und `/calendar` unterstützen zwei typische Arbeitsweisen: To-Dos pflegen und Termine prüfen.

### 3.4 Prototype

Der aktuelle Prototyp ist eine funktionsfähige SvelteKit-App mit MongoDB-Anbindung und vorbereiteter Netlify-Konfiguration.

## 4. Aktueller Prototyp

### 4.1 Funktionen

- Dashboard mit Kennzahlen für offene, erledigte, heutige, überfällige und im aktuellen Monat terminierte To-Dos.
- Monatsauswertung für erledigte To-Dos der letzten sechs Monate.
- To-Do-Liste mit Filterung nach Status, Kategorie und Priorität.
- To-Dos erstellen, bearbeiten, löschen und als erledigt markieren.
- Felder für Titel, Beschreibung, Kategorie, Priorität, Status, Deadline, geschätzte Dauer, Wiederholung und "Zu erledigen am".
- Sammelmodal zum Terminieren noch nicht geplanter To-Dos.
- Wochenkalender mit Navigation zur vorherigen und nächsten Woche.
- Detailmodal für To-Dos im Kalender.
- Wiederkehrende To-Dos mit täglicher, wöchentlicher oder monatlicher Wiederholung bis zur gesetzten Deadline.
- Einzelne Vorkommen wiederkehrender To-Dos können im Kalender als erledigt markiert werden.

### 4.2 Technologie

- **Framework:** SvelteKit mit Svelte 5
- **Build-Tool:** Vite
- **Styling:** Bootstrap und projektbezogene CSS-Regeln in `src/app.css`
- **Datenbank:** MongoDB
- **Serverlogik:** SvelteKit Server Load Functions und API-Routen
- **Deployment:** Netlify mit `@sveltejs/adapter-netlify`

### 4.3 Wichtige Projektstruktur

- `src/routes/+page.svelte`: Dashboard
- `src/routes/+page.server.js`: Lädt To-Dos und Datumsmetadaten für das Dashboard
- `src/routes/tasks/+page.svelte`: To-Do-Verwaltung mit Filtern und Modals
- `src/routes/tasks/+page.server.js`: Lädt To-Dos für die To-Do-Ansicht
- `src/routes/calendar/+page.svelte`: Wochenkalender
- `src/routes/calendar/+page.server.js`: Lädt To-Dos und Wochenmetadaten
- `src/routes/api/todos/+server.js`: API für To-Do-Liste und Erstellung
- `src/routes/api/todos/[id]/+server.js`: API für Aktualisieren, Abschliessen und Löschen
- `src/lib/server/db.js`: MongoDB-Verbindung
- `src/lib/server/todos.js`: CRUD-Funktionen für To-Dos
- `src/lib/todoSchedule.js`: Logik für Termine und Wiederholungen
- `src/lib/components`: Wiederverwendbare UI-Komponenten
- `src/lib/data/todoOptions.js`: UI-Optionen und Badge-Klassen für To-Dos
- `netlify.toml`: Netlify-Buildkonfiguration
- `.env.example`: Beispiel für benötigte Umgebungsvariablen

### 4.4 Datenmodell

Ein To-Do kann unter anderem folgende Eigenschaften enthalten:

- `title`: Titel des To-Dos
- `description`: Beschreibung
- `category`: Kategorie, zum Beispiel Privat, Arbeit, Sport oder Sonstiges
- `priority`: Low, Medium oder High
- `status`: Open oder Completed
- `scheduledDate`: Datum für "Zu erledigen am"
- `deadline`: Deadline
- `estimatedDuration`: Geschätzte Dauer
- `recurring`: Kennzeichen für Wiederholung
- `recurrence.type`: daily, weekly oder monthly
- `completedAt`: Abschlusszeitpunkt für normale To-Dos
- `completedOccurrences`: Abgeschlossene Einzeltermine bei wiederkehrenden To-Dos

## 5. Lokales Setup

### 5.1 Voraussetzungen

- Node.js und npm
- Zugriff auf eine MongoDB-Instanz, zum Beispiel MongoDB Atlas

### 5.2 Umgebungsvariable

Die App erwartet eine MongoDB-Verbindung in einer lokalen `.env`-Datei:

```bash
MONGODB_URI=mongodb+srv://...
```

Als Vorlage kann `.env.example` verwendet werden. Die lokale `.env`-Datei wird durch `.gitignore` ausgeschlossen und darf nicht ins Repository übernommen werden.

Die Datenbank heisst `todoapp`, die Collection heisst `todos`.

### 5.3 Installation und Entwicklung

```bash
npm install
npm run dev
```

Der Entwicklungsserver wird standardmässig durch Vite gestartet.

### 5.4 Produktionsbuild

```bash
npm run build
npm run preview
```

Der Produktionsbuild wurde lokal mit `npm.cmd run build` geprüft und erfolgreich mit dem Netlify-Adapter erstellt.

## 6. Deployment auf Netlify

Das Projekt ist für Netlify vorbereitet.

### 6.1 Konfiguration

- `@sveltejs/adapter-netlify` ist installiert.
- `svelte.config.js` verwendet den Netlify-Adapter.
- `netlify.toml` definiert den Build-Befehl `npm run build`.
- Der Publish-Ordner ist `build`.
- Die Node-Version ist in `netlify.toml` auf `22` gesetzt.

### 6.2 Environment Variables in Netlify

In Netlify muss unter **Site configuration > Environment variables** folgende Variable gesetzt werden:

```bash
MONGODB_URI=mongodb+srv://...
```

Der Wert darf nicht im Repository gespeichert werden.

### 6.3 Deployment-Status

Der lokale Produktionsbuild funktioniert. Das eigentliche Netlify-Deployment und die finale Deployment-URL sind noch offen.

## 7. Projektorganisation

- **Repository:** `LukasPowroznik/ToDoApp`
- **Projektform:** SvelteKit-Prototyp im Rahmen des Moduls Prototyping
- **Issue-Management:** Umsetzung und Erweiterungen werden über GitHub Issues organisiert.
- **Commit-Praxis:** Änderungen werden thematisch und nachvollziehbar versioniert.

## 8. Testing, Validierung und nächste Schritte

Eine formale Evaluation ist noch offen. Der aktuelle Prototyp kann lokal getestet werden.

### 8.1 Bereits geprüft

- Produktionsbuild mit `npm.cmd run build` erfolgreich.
- Netlify-Adapter wird beim Build verwendet.
- `.env` ist in `.gitignore` ausgeschlossen.
- `.env.example` dokumentiert die benötigte MongoDB-Variable.

### 8.2 Geplante Testszenarien

- Neues To-Do erstellen und in MongoDB speichern.
- To-Do bearbeiten und das Feld "Zu erledigen am" setzen.
- To-Do nach Status, Kategorie und Priorität filtern.
- Überfällige To-Dos erkennen.
- To-Do löschen und prüfen, ob es aus MongoDB entfernt wird.
- Wiederkehrendes To-Do im Kalender prüfen.
- Einzelnes Kalender-Vorkommen als erledigt markieren.
- Wochenansicht auf Desktop prüfen.

<<<<<<< HEAD
### 8.3 Screenshot-Dokumentation für Testing

Damit spätere Änderungen nach dem Testing nachvollziehbar bleiben, wird der aktuelle Desktop-Stand vor den Anpassungen mit Screenshots festgehalten. Die Screenshots liegen unter `docs/testing/screenshots/`.

**Aktueller Vorher-Stand:** Commit `6824014` vom 24.05.2026.

| Ansicht | Vorher | Nachher |
| --- | --- | --- |
| Dashboard Dark Mode | ![Vorher: Dashboard Dark Mode](docs/testing/screenshots/vorher/dashboard-dark.png) | ![Nachher: Dashboard Dark Mode](docs/testing/screenshots/nachher/dashboard-dark.png) |
| Dashboard White Mode | ![Vorher: Dashboard White Mode](docs/testing/screenshots/vorher/dashboard-white.png) | ![Nachher: Dashboard White Mode](docs/testing/screenshots/nachher/dashboard-white.png) |
| To-Dos Dark Mode | ![Vorher: To-Dos Dark Mode](docs/testing/screenshots/vorher/tasks-dark.png) | ![Nachher: To-Dos Dark Mode](docs/testing/screenshots/nachher/tasks-dark.png) |
| To-Dos White Mode | ![Vorher: To-Dos White Mode](docs/testing/screenshots/vorher/tasks-white.png) | ![Nachher: To-Dos White Mode](docs/testing/screenshots/nachher/tasks-white.png) |
| To-Do erstellen Dark Mode | ![Vorher: To-Do erstellen Dark Mode](docs/testing/screenshots/vorher/create-to-do-dark.png) | ![Nachher: To-Do erstellen Dark Mode](docs/testing/screenshots/nachher/create-to-do-dark.png) |
| To-Do erstellen White Mode | ![Vorher: To-Do erstellen White Mode](docs/testing/screenshots/vorher/create-to-do-white.png) | ![Nachher: To-Do erstellen White Mode](docs/testing/screenshots/nachher/create-to-do-white.png) |
| Kalender Woche Dark Mode | ![Vorher: Kalender Woche Dark Mode](docs/testing/screenshots/vorher/calendar-week-dark.png) | ![Nachher: Kalender Woche Dark Mode](docs/testing/screenshots/nachher/calendar-week-dark.png) |
| Kalender Woche White Mode | ![Vorher: Kalender Woche White Mode](docs/testing/screenshots/vorher/calendar-week-white.png) | ![Nachher: Kalender Woche White Mode](docs/testing/screenshots/nachher/calendar-week-white.png) |
| Kalender Monat Dark Mode | ![Vorher: Kalender Monat Dark Mode](docs/testing/screenshots/vorher/calendar-month-dark.png) | ![Nachher: Kalender Monat Dark Mode](docs/testing/screenshots/nachher/calendar-month-dark.png) |
| Kalender Monat White Mode | ![Vorher: Kalender Monat White Mode](docs/testing/screenshots/vorher/calendar-month-white.png) | ![Nachher: Kalender Monat White Mode](docs/testing/screenshots/nachher/calendar-month-white.png) |

Die Vorher-Screenshots wurden vor den Testing-Änderungen erstellt. Nach den Anpassungen werden die Nachher-Screenshots mit denselben Dateinamen im Ordner `nachher/` ergänzt, damit der Vergleich direkt sichtbar ist.
=======
### 8.3 Usability-Test mit Testperson

Für einen kurzen Usability-Test wird die App auf dem Laptop bereitgestellt. Die Test-To-Dos kann die Testperson auf dem Smartphone lesen. Die Testperson soll laut denken und sagen, was sie erwartet, was sie verwirrt und warum sie eine bestimmte Aktion ausführt.

Wichtiger Hinweis für die Testperson:

> Es wird nicht die Person getestet, sondern der Prototyp. Wenn etwas unklar ist, ist das ein wertvoller Hinweis für die Weiterentwicklung.

#### Test-To-Dos

1. Öffne die App und verschaffe dir einen Überblick. Finde heraus, wie viele offene To-Dos aktuell vorhanden sind und ob heute To-Dos terminiert sind.
2. Erstelle ein neues To-Do mit dem Titel `Präsentation vorbereiten`, Kategorie `Arbeit`, Priorität `High`, geschätzter Dauer `1 h` und einer Deadline in den nächsten sieben Tagen. Das To-Do soll noch nicht terminiert werden.
3. Finde das eben erstellte To-Do in der To-Do-Liste wieder. Nutze dabei Filter oder die vorhandene Navigation so, wie es für dich sinnvoll wirkt.
4. Terminiere das To-Do `Präsentation vorbereiten` auf einen Werktag. Achte darauf, ob klar ist, wo man To-Dos terminieren kann.
5. Versuche, mehrere To-Dos der Kategorie `Arbeit` so auf denselben Tag zu terminieren, dass mehr als 8 Stunden Arbeit entstehen würden. Beobachte, was die App macht.
6. Versuche, ein To-Do der Kategorie `Arbeit` auf einen Samstag oder Sonntag zu terminieren. Prüfe, ob die Rückmeldung verständlich ist.
7. Plane To-Dos unterschiedlicher Kategorien auf denselben Tag und versuche, mehr als 16 Stunden Gesamtaufwand zu erreichen. Prüfe, ob klar wird, warum die Terminierung nicht möglich ist.
8. Öffne ein bestehendes To-Do und ändere Priorität, geschätzte Dauer und Termin. Speichere die Änderung und kontrolliere, ob sie in Liste und Kalender sichtbar ist.
9. Wechsle in den Kalender. Finde das To-Do `Präsentation vorbereiten` im Kalender und öffne seine Details.
10. Markiere ein offenes To-Do als erledigt. Prüfe danach, ob sich die Kennzahlen auf dem Dashboard nachvollziehbar verändern.
11. Wechsle zwischen White Mode und Dark Mode. Schaue Dashboard, To-Do-Liste und Kalender kurz an und achte auf Lesbarkeit und Farbkonsistenz.
12. Erstelle zum Abschluss ein echtes To-Do aus deinem Alltag und plane es ein.

#### Fragen nach dem Test

- Was war einfach verständlich?
- Wo musstest du überlegen?
- Gab es einen Button, Begriff oder Ablauf, der unklar war?
- Waren die Fehlermeldungen hilfreich?
- Hast du den Unterschied zwischen Deadline und "Zu erledigen am" verstanden?
- Hast du die Planungsregeln mit 8 Stunden Arbeit und 16 Stunden Tageslimit verstanden?
- Was würdest du als Erstes verbessern?
- Würdest du die App für eigene To-Dos benutzen? Warum oder warum nicht?

#### Beobachtungsnotizen

Während des Tests sollte festgehalten werden:

- Wo klickt die Testperson zuerst?
- Wo zögert sie?
- Werden Fehlermeldungen gelesen und verstanden?
- Ist der Button `To-Dos terminieren` eindeutig?
- Wird der Unterschied zwischen Deadline und Termin verstanden?
- Findet die Testperson To-Dos im Kalender wieder?
- Werden die 8h- und 16h-Regeln ohne zusätzliche Erklärung verstanden?
>>>>>>> b84c32abb415af902ecbdf4684f12d18172af927

### 8.4 Mögliche nächste Schritte

- Manuelles UI-Testprotokoll ergänzen.
- Netlify-Deployment durchführen und URL dokumentieren.
- Terminierungsmodal final gegen Issue `#6` prüfen.
- Abschlussdokumentation und Reflexion ergänzen.
- Fehlermeldungen und Ladezustände weiter verfeinern.

## 9. KI-Deklaration

### 9.1 KI-Tools

- **Eingesetzte Tools:** Codex / ChatGPT im Entwicklungsumfeld.
- **Zweck und Umfang:** Unterstützung beim Strukturieren von GitHub Issues, Prüfen des Projektstands, Implementieren einzelner Funktionen, Vorbereiten des Deployments und Aktualisieren der Projektdokumentation.
- **Eigene Leistung:** Entscheidungen zum Projektumfang, fachliche Einordnung, Tests und finale Überarbeitung bleiben Teil der eigenen Projektarbeit.

### 9.2 Prompt-Vorgehen

KI wurde gezielt für konkrete To-Dos eingesetzt, zum Beispiel zur Analyse des Repository-Stands, zur Anpassung von Komponenten, zur Vorbereitung des Netlify-Deployments und zur Aktualisierung der README anhand des aktuellen Codes. Ergebnisse werden geprüft und bei Bedarf angepasst, bevor sie ins Projekt übernommen werden.

### 9.3 Reflexion

KI beschleunigt organisatorische, technische und dokumentarische Arbeit, ersetzt aber nicht die fachliche Bewertung des Prototyps. Besonders wichtig ist, generierte Texte mit dem tatsächlichen Projektstand abzugleichen, damit keine veralteten oder noch nicht umgesetzten Funktionen dokumentiert werden.

## 10. Anhang

- **Quellen:** SvelteKit-Dokumentation, Bootstrap-Dokumentation, MongoDB-Dokumentation, Netlify-Dokumentation und Projektdateien im Repository.
- **Testskript und Materialien:** Noch offen.
- **Rohdaten und Auswertung:** Noch offen.

# Projektdokumentation - ToDoApp

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen und Artefakte](#3-vorgehen-und-artefakte)
4. [Aktueller Prototyp](#4-aktueller-prototyp)
5. [Lokales Setup](#5-lokales-setup)
6. [Deployment auf Netlify](#6-deployment-auf-netlify)
7. [Projektorganisation](#7-projektorganisation)
8. [Validierung und nächste Schritte](#8-validierung-und-nächste-schritte)
9. [KI-Deklaration](#9-ki-deklaration)
10. [Anhang](#10-anhang)

## 1. Ausgangslage

Viele To-Do-Listen sammeln Aufgaben, zeigen aber nicht immer klar, was heute relevant ist, was bereits überfällig ist und welche Aufgaben noch terminiert werden müssen. Dieses Projekt untersucht als Prototyp, wie eine kleine To-Do-App Aufgaben übersichtlich strukturieren, planen und in einer Kalenderansicht sichtbar machen kann.

- **Problem:** Aufgaben sollen nicht nur gesammelt, sondern nach Status, Termin, Deadline, Kategorie und Priorität schnell erfassbar sein.
- **Ziel:** Aufbau eines bedienbaren SvelteKit-Prototyps mit Dashboard, Aufgabenverwaltung, MongoDB-Speicherung und Kalenderansicht.
- **Primäre Zielgruppe:** Einzelpersonen, die private, schulische oder berufliche Aufgaben kompakt planen möchten.
- **Weitere Stakeholder:** Lehrperson und Mitstudierende im Modul Prototyping.

## 2. Lösungsidee

Die ToDoApp ist als webbasiertes Dashboard aufgebaut. Die Startseite zeigt Kennzahlen und heutige Aufgaben. Die Aufgabenansicht erlaubt das Erfassen, Filtern, Bearbeiten, Löschen, Terminieren und Abschliessen von To-Dos. Die Kalenderansicht zeigt terminierte Aufgaben in einer Wochenansicht und berücksichtigt wiederkehrende Aufgaben.

Die App kombiniert damit zwei Perspektiven:

- **Listenperspektive:** Aufgaben lassen sich nach Status, Kategorie, Priorität und Terminierung filtern.
- **Zeitperspektive:** Geplante Aufgaben erscheinen im Wochenkalender und können dort im Kontext ihres Datums betrachtet werden.

## 3. Vorgehen und Artefakte

Die Umsetzung erfolgte schrittweise von einem statischen SvelteKit-Prototyp zu einer datenbankgestützten Anwendung.

### 3.1 Understand und Define

- Die App richtet sich an Personen, die einfache Aufgabenverwaltung ohne komplexes Projektmanagement brauchen.
- Wichtige Anforderungen sind schnelle Orientierung, klare Prioritäten, erkennbare Termine, Deadlines und einfache Navigation.

### 3.2 Sketch

- Erste Layoutideen wurden direkt als SvelteKit-Prototyp umgesetzt.
- Die Grundstruktur besteht aus Navigation, Dashboard, Aufgabenliste, Formular-Modals und Kalenderansicht.

### 3.3 Decide

- Ein Dashboard als Startseite wurde gewählt, weil es den aktuellen Aufgabenstand schnell sichtbar macht.
- Die getrennten Seiten `/tasks` und `/calendar` unterstützen zwei typische Arbeitsweisen: Aufgaben pflegen und Termine prüfen.

### 3.4 Prototype

Der aktuelle Prototyp ist eine funktionsfähige SvelteKit-App mit MongoDB-Anbindung und vorbereiteter Netlify-Konfiguration.

## 4. Aktueller Prototyp

### 4.1 Funktionen

- Dashboard mit Kennzahlen für offene, erledigte, heutige, überfällige und im aktuellen Monat terminierte Aufgaben.
- Monatsauswertung für erledigte Aufgaben der letzten sechs Monate.
- Aufgabenliste mit Filterung nach Status, Kategorie und Priorität.
- To-Dos erstellen, bearbeiten, löschen und als erledigt markieren.
- Felder für Titel, Beschreibung, Kategorie, Priorität, Status, Deadline, geschätzte Dauer, Wiederholung und "Zu erledigen am".
- Sammelmodal zum Terminieren noch nicht geplanter Aufgaben.
- Wochenkalender mit Navigation zur vorherigen und nächsten Woche.
- Detailmodal für Aufgaben im Kalender.
- Wiederkehrende Aufgaben mit täglicher, wöchentlicher oder monatlicher Wiederholung bis zur gesetzten Deadline.
- Einzelne Vorkommen wiederkehrender Aufgaben können im Kalender als erledigt markiert werden.

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
- `src/routes/tasks/+page.svelte`: Aufgabenverwaltung mit Filtern und Modals
- `src/routes/tasks/+page.server.js`: Lädt To-Dos für die Aufgabenansicht
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

- `title`: Titel der Aufgabe
- `description`: Beschreibung
- `category`: Kategorie, zum Beispiel Privat, Arbeit, Sport oder Sonstiges
- `priority`: Low, Medium oder High
- `status`: Open oder Completed
- `scheduledDate`: Datum für "Zu erledigen am"
- `deadline`: Deadline
- `estimatedDuration`: Geschätzte Dauer
- `recurring`: Kennzeichen für Wiederholung
- `recurrence.type`: daily, weekly oder monthly
- `completedAt`: Abschlusszeitpunkt für normale Aufgaben
- `completedOccurrences`: Abgeschlossene Einzeltermine bei wiederkehrenden Aufgaben

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

## 8. Validierung und nächste Schritte

Eine formale Evaluation ist noch offen. Der aktuelle Prototyp kann lokal getestet werden.

### 8.1 Bereits geprüft

- Produktionsbuild mit `npm.cmd run build` erfolgreich.
- Netlify-Adapter wird beim Build verwendet.
- `.env` ist in `.gitignore` ausgeschlossen.
- `.env.example` dokumentiert die benötigte MongoDB-Variable.

### 8.2 Geplante Testszenarien

- Neue Aufgabe erstellen und in MongoDB speichern.
- Aufgabe bearbeiten und das Feld "Zu erledigen am" setzen.
- Aufgabe nach Status, Kategorie und Priorität filtern.
- Überfällige Aufgaben erkennen.
- Aufgabe löschen und prüfen, ob sie aus MongoDB entfernt wird.
- Wiederkehrende Aufgabe im Kalender prüfen.
- Einzelnes Kalender-Vorkommen als erledigt markieren.
- Wochenansicht auf Desktop und Mobile prüfen.

### 8.3 Mögliche nächste Schritte

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

KI wurde gezielt für konkrete Aufgaben eingesetzt, zum Beispiel zur Analyse des Repository-Stands, zur Anpassung von Komponenten, zur Vorbereitung des Netlify-Deployments und zur Aktualisierung der README anhand des aktuellen Codes. Ergebnisse werden geprüft und bei Bedarf angepasst, bevor sie ins Projekt übernommen werden.

### 9.3 Reflexion

KI beschleunigt organisatorische, technische und dokumentarische Arbeit, ersetzt aber nicht die fachliche Bewertung des Prototyps. Besonders wichtig ist, generierte Texte mit dem tatsächlichen Projektstand abzugleichen, damit keine veralteten oder noch nicht umgesetzten Funktionen dokumentiert werden.

## 10. Anhang

- **Quellen:** SvelteKit-Dokumentation, Bootstrap-Dokumentation, MongoDB-Dokumentation, Netlify-Dokumentation und Projektdateien im Repository.
- **Testskript und Materialien:** Noch offen.
- **Rohdaten und Auswertung:** Noch offen.

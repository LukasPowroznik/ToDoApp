# Projektdokumentation - ToDoApp

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Loesungsidee](#2-loesungsidee)
3. [Vorgehen und Artefakte](#3-vorgehen-und-artefakte)
4. [Aktueller Prototyp](#4-aktueller-prototyp)
5. [Lokales Setup](#5-lokales-setup)
6. [Projektorganisation](#6-projektorganisation)
7. [Validierung und naechste Schritte](#7-validierung-und-naechste-schritte)
8. [KI-Deklaration](#8-ki-deklaration)
9. [Anhang](#9-anhang)

## 1. Ausgangslage

Viele To-Do-Listen sammeln Aufgaben, zeigen aber nicht immer klar, was heute relevant ist, was bereits ueberfaellig ist und welche Aufgaben noch terminiert werden muessen. Dieses Projekt untersucht als Prototyp, wie eine kleine To-Do-App Aufgaben uebersichtlich strukturieren, planen und in einer Kalenderansicht sichtbar machen kann.

- **Problem:** Aufgaben sollen nicht nur gesammelt, sondern nach Status, Termin, Deadline, Kategorie und Prioritaet schnell erfassbar sein.
- **Ziel:** Aufbau eines bedienbaren SvelteKit-Prototyps mit Dashboard, Aufgabenverwaltung, MongoDB-Speicherung und Kalenderansicht.
- **Primaere Zielgruppe:** Einzelpersonen, die private, schulische oder berufliche Aufgaben kompakt planen moechten.
- **Weitere Stakeholder:** Lehrperson und Mitstudierende im Modul Prototyping.

## 2. Loesungsidee

Die ToDoApp ist als webbasiertes Dashboard aufgebaut. Die Startseite zeigt Kennzahlen und heutige Aufgaben. Die Aufgabenansicht erlaubt das Erfassen, Filtern, Bearbeiten, Loeschen, Terminieren und Abschliessen von To-Dos. Die Kalenderansicht zeigt terminierte Aufgaben in einer Wochenansicht und beruecksichtigt wiederkehrende Aufgaben.

Die App kombiniert damit zwei Perspektiven:

- **Listenperspektive:** Aufgaben lassen sich nach Status, Kategorie, Prioritaet und Terminierung filtern.
- **Zeitperspektive:** Geplante Aufgaben erscheinen im Wochenkalender und koennen dort im Kontext ihres Datums betrachtet werden.

## 3. Vorgehen und Artefakte

Die Umsetzung erfolgte schrittweise von einem statischen SvelteKit-Prototyp zu einer datenbankgestuetzten Anwendung.

### 3.1 Understand und Define

- Die App richtet sich an Personen, die einfache Aufgabenverwaltung ohne komplexes Projektmanagement brauchen.
- Wichtige Anforderungen sind schnelle Orientierung, klare Prioritaeten, erkennbare Termine, Deadlines und einfache Navigation.

### 3.2 Sketch

- Erste Layoutideen wurden direkt als SvelteKit-Prototyp umgesetzt.
- Die Grundstruktur besteht aus Navigation, Dashboard, Aufgabenliste, Formular-Modals und Kalenderansicht.

### 3.3 Decide

- Ein Dashboard als Startseite wurde gewaehlt, weil es den aktuellen Aufgabenstand schnell sichtbar macht.
- Die getrennten Seiten `/tasks` und `/calendar` unterstuetzen zwei typische Arbeitsweisen: Aufgaben pflegen und Termine pruefen.

### 3.4 Prototype

Der aktuelle Prototyp ist eine funktionsfaehige SvelteKit-App mit MongoDB-Anbindung.

## 4. Aktueller Prototyp

### 4.1 Funktionen

- Dashboard mit Kennzahlen fuer offene, erledigte, heutige, ueberfaellige und im aktuellen Monat terminierte Aufgaben.
- Monatsauswertung fuer erledigte Aufgaben der letzten sechs Monate.
- Aufgabenliste mit Filterung nach Status, Kategorie und Prioritaet.
- To-Dos erstellen, bearbeiten, loeschen und als erledigt markieren.
- Felder fuer Titel, Beschreibung, Kategorie, Prioritaet, Status, Deadline, geschaetzte Dauer, Wiederholung und "Zu erledigen am".
- Sammelmodal zum Terminieren noch nicht geplanter Aufgaben.
- Wochenkalender mit Navigation zur vorherigen und naechsten Woche.
- Detailmodal fuer Aufgaben im Kalender.
- Wiederkehrende Aufgaben mit taeglicher, woechentlicher oder monatlicher Wiederholung bis zur gesetzten Deadline.
- Einzelne Vorkommen wiederkehrender Aufgaben koennen im Kalender als erledigt markiert werden.

### 4.2 Technologie

- **Framework:** SvelteKit mit Svelte 5
- **Build-Tool:** Vite
- **Styling:** Bootstrap und projektbezogene CSS-Regeln in `src/app.css`
- **Datenbank:** MongoDB
- **Serverlogik:** SvelteKit Server Load Functions und API-Routen

### 4.3 Wichtige Projektstruktur

- `src/routes/+page.svelte`: Dashboard
- `src/routes/+page.server.js`: Laedt To-Dos und Datumsmetadaten fuer das Dashboard
- `src/routes/tasks/+page.svelte`: Aufgabenverwaltung mit Filtern und Modals
- `src/routes/tasks/+page.server.js`: Laedt To-Dos fuer die Aufgabenansicht
- `src/routes/calendar/+page.svelte`: Wochenkalender
- `src/routes/calendar/+page.server.js`: Laedt To-Dos und Wochenmetadaten
- `src/routes/api/todos/+server.js`: API fuer To-Do-Liste und Erstellung
- `src/routes/api/todos/[id]/+server.js`: API fuer Aktualisieren, Abschliessen und Loeschen
- `src/lib/server/db.js`: MongoDB-Verbindung
- `src/lib/server/todos.js`: CRUD-Funktionen fuer To-Dos
- `src/lib/todoSchedule.js`: Logik fuer Termine und Wiederholungen
- `src/lib/components`: Wiederverwendbare UI-Komponenten
- `src/lib/data/todoOptions.js`: UI-Optionen und Badge-Klassen fuer To-Dos

### 4.4 Datenmodell

Ein To-Do kann unter anderem folgende Eigenschaften enthalten:

- `title`: Titel der Aufgabe
- `description`: Beschreibung
- `category`: Kategorie, zum Beispiel Privat, Arbeit, Sport oder Sonstiges
- `priority`: Low, Medium oder High
- `status`: Open oder Completed
- `scheduledDate`: Datum fuer "Zu erledigen am"
- `deadline`: Deadline
- `estimatedDuration`: Geschaetzte Dauer
- `recurring`: Kennzeichen fuer Wiederholung
- `recurrence.type`: daily, weekly oder monthly
- `completedAt`: Abschlusszeitpunkt fuer normale Aufgaben
- `completedOccurrences`: Abgeschlossene Einzeltermine bei wiederkehrenden Aufgaben

## 5. Lokales Setup

### 5.1 Voraussetzungen

- Node.js und npm
- Zugriff auf eine MongoDB-Instanz

### 5.2 Umgebungsvariable

Die App erwartet eine MongoDB-Verbindung in einer lokalen `.env`-Datei:

```bash
MONGODB_URI=mongodb+srv://...
```

Die Datenbank heisst `todoapp`, die Collection heisst `todos`.

### 5.3 Installation und Entwicklung

```bash
npm install
npm run dev
```

Der Entwicklungsserver wird standardmaessig durch Vite gestartet.

### 5.4 Produktionsbuild

```bash
npm run build
npm run preview
```

## 6. Projektorganisation

- **Repository:** `LukasPowroznik/ToDoApp`
- **Projektform:** SvelteKit-Prototyp im Rahmen des Moduls Prototyping
- **Issue-Management:** Umsetzung und Erweiterungen werden ueber GitHub Issues organisiert.
- **Commit-Praxis:** Aenderungen werden thematisch und nachvollziehbar versioniert.

## 7. Validierung und naechste Schritte

Eine formale Evaluation ist noch offen. Der aktuelle Prototyp kann lokal getestet werden.

Geplante Testszenarien:

- Neue Aufgabe erstellen und in MongoDB speichern.
- Aufgabe bearbeiten und das Feld "Zu erledigen am" setzen.
- Aufgabe nach Status, Kategorie und Prioritaet filtern.
- Ueberfaellige Aufgaben erkennen.
- Wiederkehrende Aufgabe im Kalender pruefen.
- Einzelnes Kalender-Vorkommen als erledigt markieren.

Moegliche naechste Schritte:

- Validierung mit Testpersonen dokumentieren.
- Fehlermeldungen und Ladezustaende weiter verfeinern.
- Deployment vorbereiten.
- Dokumentation nach der Evaluation um Resultate und Reflexion ergaenzen.

## 8. KI-Deklaration

### 8.1 KI-Tools

- **Eingesetzte Tools:** Codex / ChatGPT im Entwicklungsumfeld.
- **Zweck und Umfang:** Unterstuetzung beim Strukturieren von GitHub Issues, Pruefen des Projektstands, Implementieren einzelner Funktionen und Aktualisieren der Projektdokumentation.
- **Eigene Leistung:** Entscheidungen zum Projektumfang, fachliche Einordnung, Tests und finale Ueberarbeitung bleiben Teil der eigenen Projektarbeit.

### 8.2 Prompt-Vorgehen

KI wurde gezielt fuer konkrete Aufgaben eingesetzt, zum Beispiel zur Analyse des Repository-Stands, zur Anpassung von Komponenten und zur Aktualisierung der README anhand des aktuellen Codes. Ergebnisse werden geprueft und bei Bedarf angepasst, bevor sie ins Projekt uebernommen werden.

### 8.3 Reflexion

KI beschleunigt organisatorische, technische und dokumentarische Arbeit, ersetzt aber nicht die fachliche Bewertung des Prototyps. Besonders wichtig ist, generierte Texte mit dem tatsaechlichen Projektstand abzugleichen, damit keine veralteten oder noch nicht umgesetzten Funktionen dokumentiert werden.

## 9. Anhang

- **Quellen:** SvelteKit-Dokumentation, Bootstrap-Dokumentation, MongoDB-Dokumentation und Projektdateien im Repository.
- **Testskript und Materialien:** Noch offen.
- **Rohdaten und Auswertung:** Noch offen.

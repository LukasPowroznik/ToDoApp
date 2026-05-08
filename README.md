# Projektdokumentation - ToDoApp

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
   1. [Understand & Define](#31-understand--define)
   2. [Sketch](#32-sketch)
   3. [Decide](#33-decide)
   4. [Prototype](#34-prototype)
   5. [Validate](#35-validate)
4. [Erweiterungen](#4-erweiterungen)
5. [Projektorganisation](#5-projektorganisation)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang](#7-anhang)

## 1. Ausgangslage

Viele To-Do-Listen sammeln Aufgaben, zeigen aber nicht immer gut, welche Aufgaben heute relevant sind, welche bereits überfällig sind und welche noch geplant werden müssen. Dieses Projekt untersucht als Prototyp, wie eine kleine To-Do-App Aufgaben übersichtlich strukturieren, terminieren und in einer Kalenderansicht sichtbar machen kann.

- **Problem:** Aufgaben sollen nicht nur gesammelt, sondern nach Status, Termin und Priorität schnell erfassbar sein.
- **Ziele:** Aufbau eines bedienbaren SvelteKit-Prototyps mit Dashboard, Aufgabenübersicht und Kalenderansicht.
- **Primäre Zielgruppe:** Einzelpersonen, die private, schulische oder berufliche Aufgaben kompakt planen möchten.
- **Weitere Stakeholder:** Lehrperson und Mitstudierende im Modul Prototyping.

## 2. Lösungsidee

Die ToDoApp ist als webbasiertes Dashboard aufgebaut. Die Startseite zeigt einen schnellen Überblick über heutige, offene, fällige und überfällige Aufgaben. Ergänzend gibt es eine Seite für alle To-Dos und eine Wochenansicht im Kalender.

- **Kernfunktionalität:** Dashboard, Aufgabenliste, Demo-Daten, Statusanzeigen, Wochenkalender und vorbereitete Modal-Komponenten für Erfassen und Terminieren.
- **Annahmen:** Nutzerinnen und Nutzer profitieren von einer Kombination aus Liste und Kalender, weil Aufgaben dadurch sowohl inhaltlich als auch zeitlich sichtbar werden.
- **Abgrenzung:** Aktuell verwendet der Prototyp statische Demo-Daten. MongoDB, echte CRUD-Logik, persistente Speicherung und produktives Deployment sind noch nicht abgeschlossen.

## 3. Vorgehen & Artefakte

Die Umsetzung erfolgt schrittweise über GitHub Issues. Zuerst wurden Projektstruktur und Grundlayout erstellt, danach folgen Dokumentation, konkrete Interaktionen, Datenbankintegration und Deployment.

### 3.1 Understand & Define

- **Zielgruppenverständnis:** Die App richtet sich an Personen, die einfache Aufgabenverwaltung ohne komplexes Projektmanagement benötigen.
- **Wesentliche Erkenntnisse:** Wichtig sind schnelle Orientierung, klare Prioritäten, erkennbare Termine und einfache Navigation zwischen Dashboard, Liste und Kalender.

### 3.2 Sketch

- **Variantenüberblick:** Die aktuelle Variante setzt auf eine klassische Web-App-Struktur mit Top-Navigation, Dashboard-Karten und separaten Detailseiten.
- **Skizzen:** Erste Layoutideen wurden direkt als statischer SvelteKit-Prototyp umgesetzt.

### 3.3 Decide

- **Gewählte Variante & Begründung:** Ein Dashboard als Startseite wurde gewählt, weil es den Projektzustand schnell sichtbar macht und als Einstieg in weitere Funktionen dient.
- **End-to-End-Ablauf:** Nutzer öffnen das Dashboard, prüfen heutige oder überfällige Aufgaben, wechseln zur Aufgabenliste oder betrachten terminierte Aufgaben im Kalender.
- **Mockup:** Der aktuelle Stand ist ein lauffähiger Code-Prototyp im Repository.

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)

Der Prototyp verwendet Bootstrap für ein ruhiges, responsives Interface mit Karten, Listen, Badges und Navigation. Das Layout ist bewusst einfach gehalten, damit die wichtigsten Informationen schnell scanbar bleiben.

- **Informationsarchitektur:** Drei Hauptbereiche sind umgesetzt: Dashboard (`/`), Alle To-Dos (`/tasks`) und Kalender (`/calendar`).
- **User Interface Design:** Dashboard-Karten zeigen Kennzahlen, die Aufgabenliste zeigt Demo-Aufgaben mit Status und Priorität, die Kalenderseite zeigt eine statische Wochenansicht.
- **Designentscheidungen:** Bootstrap wurde verwendet, um schnell ein konsistentes, responsives Grundlayout zu erstellen.

#### 3.4.2. Umsetzung (Technik)

- **Technologie-Stack:** SvelteKit, Svelte 5, Vite und Bootstrap.
- **Tooling:** Entwicklung mit Node.js, npm und GitHub Issues zur Aufgabenplanung.
- **Struktur & Komponenten:**
  - `src/routes/+page.svelte`: Dashboard
  - `src/routes/tasks/+page.svelte`: Aufgabenübersicht
  - `src/routes/calendar/+page.svelte`: Kalender-Wochenansicht
  - `src/lib/components`: Wiederverwendbare UI-Komponenten
  - `src/lib/data/demoTodos.js`: Statische Demo-Daten
- **Daten & Schnittstellen:** Der aktuelle Prototyp nutzt lokale Demo-Daten. Eine MongoDB-Integration ist als nächster größerer Schritt geplant.
- **Deployment:** Noch nicht produktiv deployed. Netlify Deployment ist als eigenes Issue vorgesehen.
- **Besondere Entscheidungen:** Die App trennt die UI bereits in Komponenten, obwohl die Datenlogik noch statisch ist. Dadurch kann später leichter auf echte Daten umgestellt werden.

#### Lokales Setup

```bash
npm install
npm run dev
```

Der Entwicklungsserver wird standardmäßig über Vite gestartet. Für einen Produktionsbuild:

```bash
npm run build
npm run preview
```

Der Build wurde lokal mit `npm.cmd run build` erfolgreich getestet.

### 3.5 Validate

Eine formale Evaluation ist noch offen. Der aktuelle Prototyp kann bereits lokal geprüft werden, um Navigation, visuelle Struktur und Verständlichkeit der wichtigsten Ansichten zu bewerten.

- **URL der getesteten Version:** Noch offen.
- **Ziele der Prüfung:** Verständlichkeit des Dashboards, Auffindbarkeit der Aufgabenübersicht und Lesbarkeit der Kalenderansicht.
- **Vorgehen:** Geplant ist ein kurzer Test mit typischen Aufgaben wie "heutige Aufgaben finden", "überfällige Aufgaben erkennen" und "Kalenderwoche prüfen".
- **Stichprobe:** Noch offen.
- **Aufgaben/Szenarien:** Noch zu definieren.
- **Kennzahlen & Beobachtungen:** Noch offen.
- **Zusammenfassung der Resultate:** Noch offen.
- **Abgeleitete Verbesserungen:** Werden nach der Evaluation ergänzt.

## 4. Erweiterungen

Aktuell sind noch keine optionalen Erweiterungen abgeschlossen. Geplante Erweiterungen und nächste Entwicklungsschritte sind:

- Filter auf der Alle-To-Dos-Seite
- Funktionierende Modals zum Erfassen und Terminieren von Aufgaben
- MongoDB-Integration für persistente Daten
- Netlify Deployment
- Abschließende Reflexion und Dokumentation

## 5. Projektorganisation

- **Repository:** `LukasPowroznik/ToDoApp`
- **Repository-Struktur:** SvelteKit-Projekt mit Routen unter `src/routes`, Komponenten unter `src/lib/components` und Demo-Daten unter `src/lib/data`.
- **Issue-Management:** Die Umsetzung ist in GitHub Issues organisiert. Issue #1 zum Projekt-Setup ist abgeschlossen.
- **Commit-Praxis:** Änderungen sollen in nachvollziehbaren, thematisch passenden Commits dokumentiert werden.

## 6. KI-Deklaration

### 6.1 KI-Tools

- **Eingesetzte Tools:** Codex / ChatGPT im Entwicklungsumfeld.
- **Zweck & Umfang:** Unterstützung beim Strukturieren von GitHub Issues, Prüfen des Projektstands und Formulieren der Projektdokumentation.
- **Eigene Leistung:** Entscheidungen zum Projektumfang, fachliche Einordnung und finale Überarbeitung bleiben Teil der eigenen Projektarbeit.

### 6.2 Prompt-Vorgehen

KI wurde gezielt für konkrete Aufgaben eingesetzt, zum Beispiel zum Erstellen von Issues und zur Aktualisierung der README anhand des aktuellen Repository-Stands. Ergebnisse werden geprüft und bei Bedarf angepasst, bevor sie ins Projekt übernommen werden.

### 6.3 Reflexion

KI beschleunigt organisatorische und dokumentarische Arbeit, ersetzt aber nicht die fachliche Bewertung des Prototyps. Besonders wichtig ist, generierte Texte mit dem tatsächlichen Projektstand abzugleichen, damit keine Funktionen dokumentiert werden, die noch nicht umgesetzt sind.

## 7. Anhang

- **Quellen:** SvelteKit-Dokumentation, Bootstrap-Dokumentation und Projektdateien im Repository.
- **Testskript & Materialien:** Noch offen.
- **Rohdaten/Auswertung:** Noch offen.

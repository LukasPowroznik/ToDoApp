# Projektdokumentation - To-Do-App

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

## 1. Ausgangslage

Viele To-Do-Listen sammeln To-Dos, zeigen aber nicht immer klar, was heute relevant ist, was bereits überfällig ist und welche To-Dos noch terminiert werden müssen. Dieses Projekt untersucht als Prototyp, wie eine kleine To-Do-App To-Dos übersichtlich strukturieren, planen und in einer Kalenderansicht sichtbar machen kann.

- **Problem:** To-Dos sollen nicht nur gesammelt, sondern nach Status, Termin, Deadline, Kategorie und Priorität schnell erfassbar sein.
- **Ziel:** Aufbau eines bedienbaren SvelteKit-Prototyps mit Dashboard, To-Do-Verwaltung, MongoDB-Speicherung und Kalenderansicht.
- **Primäre Zielgruppe:** Einzelpersonen, die private, schulische oder berufliche To-Dos kompakt planen möchten.
- **Weitere Stakeholder:** Lehrperson und Mitstudierende im Modul Prototyping.

### 1.1 Personas

Die Personas helfen dabei, typische Nutzungssituationen des Prototyps einzuordnen und die wichtigsten Funktionen aus Sicht der Zielgruppe zu bewerten.

#### Persona 1: Lea, Studentin

- **Alter:** 22 Jahre
- **Situation:** Lea studiert, arbeitet nebenbei und muss Abgaben, Lernzeiten und private Termine koordinieren.
- **Bedürfnis:** Sie möchte schnell erkennen, welche To-Dos heute wichtig sind und welche Deadlines näher rücken.
- **Nutzung der App:** Lea nutzt das Dashboard für den Überblick, erstellt neue To-Dos mit Priorität und plant grössere To-Dos im Kalender ein.
- **Relevante Funktionen:** Dashboard-Kennzahlen, Deadline, Priorität, Kalenderansicht und Filter nach Status.

#### Persona 2: Marco, Berufstätiger

- **Alter:** 31 Jahre
- **Situation:** Marco arbeitet in einem Bürojob und möchte kleinere berufliche und private To-Dos getrennt planen.
- **Bedürfnis:** Er will vermeiden, dass zu viele Arbeits-To-Dos auf denselben Tag fallen.
- **Nutzung der App:** Marco erfasst To-Dos mit Kategorie und geschätzter Dauer und nutzt die Terminierungsregeln, um realistische Tage zu planen.
- **Relevante Funktionen:** Kategorien, geschätzte Dauer, Tageslimit, Kategorie-Limits, Arbeitswoche und Drag-and-Drop im Kalender.

#### Persona 3: Nadine, organisierte Privatnutzerin

- **Alter:** 27 Jahre
- **Situation:** Nadine organisiert Haushalt, Sport, private Termine und wiederkehrende To-Dos.
- **Bedürfnis:** Sie möchte regelmässige To-Dos nicht jedes Mal neu erfassen müssen.
- **Nutzung der App:** Nadine legt wiederkehrende To-Dos an, kontrolliert sie im Kalender und markiert einzelne Vorkommen als erledigt.
- **Relevante Funktionen:** Wiederholungen, Kalenderdetails, erledigte Vorkommen, White Mode und Dark Mode.

### 1.2 User Stories

Die folgenden User Stories leiten sich aus den Personas und den zentralen Nutzungssituationen der App ab.

| ID | User Story | Akzeptanzkriterium |
| --- | --- | --- |
| US-01 | Als Nutzerin möchte ich auf dem Dashboard sofort sehen, wie viele To-Dos offen, erledigt, überfällig oder heute terminiert sind, damit ich meinen aktuellen Stand schnell einschätzen kann. | Das Dashboard zeigt die wichtigsten Kennzahlen und verlinkt auf passende gefilterte Ansichten. |
| US-02 | Als Nutzer möchte ich ein neues To-Do mit Titel, Kategorie, Priorität, Deadline und geschätzter Dauer erfassen, damit ich meine To-Dos vollständig planen kann. | Ein neues To-Do kann gespeichert werden und erscheint danach in der To-Do-Liste. |
| US-03 | Als Nutzerin möchte ich To-Dos nach Status, Kategorie, Priorität und Datum filtern, damit ich bei vielen Einträgen schneller relevante To-Dos finde. | Die To-Do-Liste reagiert auf die Filterauswahl, speichert aktive Filter in URL-Parametern und zeigt nur passende To-Dos an. |
| US-04 | Als Nutzer möchte ich To-Dos terminieren können, damit klar ist, an welchem Tag ich sie erledigen will. | Ein To-Do kann ein Datum im Feld "Zu erledigen am" erhalten, darf nicht nach seiner Deadline terminiert werden und erscheint danach im Kalender. |
| US-05 | Als Nutzerin möchte ich offene, noch nicht terminierte To-Dos gesammelt terminieren, damit ich mehrere To-Dos effizient planen kann. | Das Terminierungsmodal zeigt offene To-Dos ohne Termin inklusive Deadline und geschätzter Dauer und speichert neue Termine. |
| US-06 | Als Nutzer möchte ich im Kalender zwischen Woche, Arbeitswoche und Monat wechseln können, damit ich die Ansicht an meine Planungssituation anpassen kann. | Die Kalenderseite bietet die drei Ansichten und zeigt die jeweils passenden Tage. |
| US-07 | Als Nutzerin möchte ich To-Dos im Kalender per Drag-and-Drop verschieben können, damit ich Termine schnell umplanen kann. | Ein verschobenes To-Do erhält das neue Datum und bleibt nach dem Speichern sichtbar. |
| US-08 | Als Nutzer möchte ich gewarnt werden, wenn geplante To-Dos die Tages- oder Kategorie-Limits überschreiten, damit meine Planung realistisch bleibt. | Beim Speichern wird eine verständliche Fehlermeldung angezeigt, wenn ein Limit verletzt wird, inklusive der noch einplanbaren Zeit. |
| US-09 | Als Nutzerin möchte ich wiederkehrende To-Dos anlegen und einzelne Vorkommen abschliessen können, damit regelmässige To-Dos nicht jedes Mal neu erstellt werden müssen. | Wiederkehrende To-Dos erscheinen bis zur Deadline im Kalender und einzelne Vorkommen können als erledigt markiert werden. |
| US-10 | Als Nutzer möchte ich die Standardansicht des Kalenders und die Planungs-Limits in den Einstellungen anpassen können, damit die App zu meiner Arbeitsweise passt. | Die Einstellungen können gespeichert werden und beeinflussen Kalenderansicht sowie Terminierungsregeln. |
| US-11 | Als Nutzerin möchte ich zwischen White Mode und Dark Mode wechseln können, damit die App in unterschiedlichen Lichtverhältnissen gut lesbar bleibt. | Der gewählte Modus ändert die Darstellung der App konsistent. |

## 2. Lösungsidee

Die To-Do-App ist als webbasiertes Dashboard aufgebaut. Die Startseite zeigt Kennzahlen und heutige To-Dos. Die To-Do-Ansicht erlaubt das Erfassen, Filtern, Bearbeiten, Löschen, Terminieren und Abschliessen von To-Dos. Die Kalenderansicht zeigt terminierte To-Dos in Wochen-, Arbeitswochen- und Monatsansicht, unterstützt Drag-and-Drop zum Verschieben von Terminen und berücksichtigt wiederkehrende To-Dos. In den Einstellungen können Planungs-Limits und die Standardansicht des Kalenders angepasst werden.

Die App kombiniert damit zwei Perspektiven:

- **Listenperspektive:** To-Dos lassen sich nach Status, Kategorie, Priorität, Terminierung und Datum filtern. Aktive Filter werden über URL-Parameter abgebildet.
- **Zeitperspektive:** Geplante To-Dos erscheinen im Kalender und können dort im Kontext ihres Datums betrachtet, verschoben und geöffnet werden.

## 3. Vorgehen & Artefakte

Die Umsetzung erfolgte schrittweise von einem statischen SvelteKit-Prototyp zu einer datenbankgestützten Anwendung.

| Phase | Ziel | Ergebnis im Projekt |
| --- | --- | --- |
| Understand & Define | Problem, Zielgruppe und zentrale Bedürfnisse klären | Ausgangslage, Personas, User Stories, Anforderungen und Konkurrenzanalyse |
| Sketch | Unterschiedliche Lösungsrichtungen und UI-Ideen entwickeln | Figma-Prototyp, Crazy-Eights-Skizzen, Ideen für Dashboard, To-Do-Liste, Planung und Kalender |
| Decide | Geeignete Richtung auswählen und begründen | Entscheidungskriterien, Priorisierung, Risiken, Hauptworkflow und Planungsworkflow |
| Prototype | Kernfunktionen umsetzen und lauffähigen Prototyp erstellen | SvelteKit-App mit To-Do-Verwaltung, MongoDB-Anbindung, Kalender, Einstellungen und veröffentlichtem Netlify-Deployment |
| Validate | Prototyp mit Nutzenden prüfen und verbessern | Usability-Tests, Beobachtungen, abgeleitete Anpassungen und Vorher-/Nachher-Screenshots |

Die Artefakte bauen dabei aufeinander auf: Die Personas führten zu Anforderungen wie schneller Orientierung, Deadline-Verständlichkeit und Kalenderplanung. Die Skizzen konkretisierten mögliche UI-Bereiche wie Dashboard, To-Do-Erfassung, Planungsbereich und Kalender. In der Decide-Phase wurden diese Ideen priorisiert und als kombinierte Lösung umgesetzt. Die Usability-Tests zeigten anschliessend, welche Teile des Prototyps angepasst werden mussten.

#### Iteration

Das Vorgehen war nicht linear abgeschlossen, sondern iterativ:

```text
Problem verstehen -> Skizzen erstellen -> Variante auswählen -> Prototyp bauen -> testen -> anpassen -> erneut dokumentieren
```

Nach dem ersten nutzbaren Prototyp wurden mit den Testpersonen konkrete Schwachstellen sichtbar, zum Beispiel die Auffindbarkeit des Erstellen-Buttons, die Sichtbarkeit des Buttons `To-Dos terminieren`, die Verständlichkeit der Planungsregeln und die Darstellung von Fehlermeldungen. Diese Beobachtungen wurden in Anpassungen überführt und danach in README, Screenshots und Issues dokumentiert.

### 3.1 Understand & Define

- Die App richtet sich an Personen, die einfache To-Do-Verwaltung ohne komplexes Projektmanagement brauchen.
- Wichtige Anforderungen sind schnelle Orientierung, klare Prioritäten, erkennbare Termine, Deadlines und einfache Navigation.

#### Konkurrenzanalyse

Zur Einordnung der Lösung wurden bestehende To-Do- und Produktivitätstools betrachtet:

- **Todoist:** Todoist bietet sehr ausgereifte To-Do-Verwaltung mit Projekten, Prioritäten, Labels, Filtern sowie Listen-, Kalender- und Board-Ansichten. Im Vergleich dazu fokussiert die To-Do-App stärker auf einen reduzierten Prototyp mit Dashboard, Terminierung und Planungs-Limits statt auf ein vollständiges Produktivitätssystem. Quelle: [Todoist Features](https://www.todoist.com/features)
- **Microsoft To Do:** Microsoft To Do konzentriert sich auf einfache To-Do-Listen, Fälligkeiten, Erinnerungen, Wichtigkeit, Notizen, Schritte und Synchronisierung über Geräte. Die To-Do-App übernimmt den einfachen Listenansatz, ergänzt ihn aber um Kalenderplanung, Kategorie-Limits und eine stärkere Auswertung im Dashboard. Quelle: [Microsoft To Do](https://www.microsoft.com/en-us/microsoft-365/microsoft-to-do-list-app)
- **Google Tasks:** Google Tasks ist stark in Google Workspace eingebunden und erlaubt To-Dos aus Gmail oder Kalender heraus, mit Details, Unter-To-Dos, Fälligkeiten und Benachrichtigungen. Die To-Do-App ist unabhängiger von einem bestehenden Ökosystem und legt mehr Gewicht auf gefilterte Ansichten, Kapazitätsregeln und sichtbare Planung im eigenen Kalender. Quelle: [Google Tasks Help](https://support.google.com/tasks/answer/7675772)
- **Notion:** Notion ist deutlich breiter angelegt und verbindet To-Dos mit Datenbanken, Projekten, Dokumentation, Ansichten wie Boards oder Timelines und Teamfunktionen. Die To-Do-App ist bewusst kleiner und konkreter: Sie soll nicht ein flexibles Workspace-System sein, sondern einen klaren Workflow für persönliche To-Dos, Termine und Deadlines abbilden. Quelle: [Notion Projects](https://www.notion.com/product/projects)

Aus der Konkurrenzanalyse ergab sich für den Prototyp die Entscheidung, keine möglichst umfangreiche All-in-one-Lösung zu bauen. Stattdessen sollte die App einen überschaubaren persönlichen Workflow abdecken: To-Dos erfassen, filtern, terminieren, im Kalender prüfen und bei unrealistischer Planung Feedback erhalten.

### 3.2 Sketch

- Der visuelle Prototypentwurf wurde in Figma erstellt: [To Do Website Prototyping](https://www.figma.com/design/AKiaBL2UNGeplpsCrdPBYM/To-Do-Website-Prototyping?node-id=0-1&t=IrgAJ56JOBU5Wo50-1).
- Als Ideationsmethode wurden Crazy Eights genutzt, um mehrere Layout- und Funktionsideen in kurzer Zeit zu skizzieren.

![Crazy-Eights-Skizzen der To-Do-App](docs/assets/crazy-eights/crazy-eights.png)

- Aus den Skizzen entstanden mehrere konkrete UI-Ideen:
  - **To-Do-Erfassung:** Formularfelder für Titel, To-Do, Deadline, geschätzte Dauer, Kategorie, Priorität und erledigt-Status.
  - **Dashboard-Überblick:** Kennzahlen und Auswertungen zu erledigten, offenen und überfälligen To-Dos sowie eine Monatsübersicht.
  - **Planungsbereich:** Liste ungeplanter To-Dos mit einer Aktion zum Planen beziehungsweise Terminieren.
  - **Kalenderansicht:** Wochenraster mit Tagen von Montag bis Sonntag, in dem geplante To-Dos sichtbar platziert werden können.
  - **Kategorien und Filter:** Kategorien wie Privat, Arbeit, Sport und Sonstiges zur besseren Strukturierung.
  - **Optionale Ideen:** Push-Mitteilungen, iPhone-App und Kalenderexport wurden angedacht, aber für den Prototyp nicht priorisiert.
- Erste Layoutideen wurden direkt als SvelteKit-Prototyp umgesetzt.
- Die Grundstruktur besteht aus Navigation, Dashboard, To-Do-Liste, Formular-Modals und Kalenderansicht.

### 3.3 Decide

Nach der Ideensammlung wurden die Varianten aus den Skizzen danach bewertet, wie gut sie die zentralen Bedürfnisse der Personas unterstützen. Wichtig waren vor allem schnelle Orientierung, einfache Bedienung, klare Priorisierung und eine sinnvolle Verbindung zwischen To-Do-Liste und Zeitplanung.

Für die Entscheidung wurden folgende Kriterien verwendet:

- **Orientierung:** Nutzerinnen und Nutzer sollen schnell erkennen, welche To-Dos offen, erledigt, überfällig oder heute relevant sind.
- **Bedienbarkeit:** Die wichtigsten Aktionen wie Erstellen, Bearbeiten, Löschen, Abschliessen und Terminieren sollen ohne Umwege erreichbar sein.
- **Planbarkeit:** To-Dos sollen nicht nur gesammelt, sondern auch einem konkreten Datum zugeordnet und im Kalender überprüft werden können.
- **Umsetzbarkeit im Prototyp:** Die Lösung sollte mit SvelteKit, Formularen, Filtern, Modals und einer einfachen Kalenderansicht realistisch umsetzbar bleiben.
- **Erweiterbarkeit:** Zusätzliche Funktionen wie Wiederholungen, Limits oder gespeicherte Filter sollten später ergänzt werden können, ohne die Grundstruktur zu verändern.

Im Vergleich zeigte sich, dass eine reine Listenansicht zwar einfach umzusetzen und gut für das Erfassen von To-Dos ist, aber die zeitliche Planung zu wenig unterstützt. Eine reine Kalenderlösung macht Termine sichtbar, ist aber für das schnelle Erfassen und Filtern vieler To-Dos weniger geeignet. Die dashboard-zentrierte Variante bietet einen guten Überblick, reicht allein aber nicht aus, um To-Dos im Detail zu verwalten.

Entschieden wurde deshalb eine kombinierte Lösung aus Dashboard, To-Do-Liste und Kalender. Diese Variante erfüllt die wichtigsten Kriterien am besten: Das Dashboard gibt Orientierung, die To-Do-Liste unterstützt Verwaltung und Filterung, und der Kalender macht die konkrete Planung sichtbar.

#### Priorisierung der Funktionen

Die wichtigsten Funktionen wurden nach Nutzen für die Personas, geschätztem Umsetzungsaufwand und Bedeutung für den Prototyp priorisiert.

| Funktion | Nutzen | Aufwand | Priorität | Status |
| --- | --- | --- | --- | --- |
| To-Dos erstellen, bearbeiten, löschen und abschliessen | Grundlage der App und Teil des Mindestumfangs | Mittel | Hoch | Umgesetzt |
| Filter nach Status, Kategorie und Priorität | Verbessert Orientierung bei mehreren To-Dos | Mittel | Hoch | Umgesetzt |
| Dashboard mit Kennzahlen | Gibt schnellen Überblick über aktuellen To-Do-Stand | Mittel | Hoch | Umgesetzt |
| Kalenderansicht für geplante To-Dos | Macht Termine und Planung sichtbar | Hoch | Hoch | Umgesetzt |
| Terminierung mit Deadline-Prüfung | Verhindert unrealistische Planung nach Deadline | Mittel | Hoch | Umgesetzt |
| Tages- und Kategorie-Limits | Unterstützt realistische Tagesplanung | Hoch | Mittel | Umgesetzt |
| Wiederkehrende To-Dos | Erhöht Nutzen für regelmässige To-Dos | Hoch | Mittel | Umgesetzt |
| URL-basierte Filter | Macht gefilterte Ansichten teilbar und stabil nach Reload | Mittel | Mittel | Umgesetzt |
| Kalenderexport | Nützlich für externe Kalender, aber nicht zentral für den Prototyp | Hoch | Niedrig | Nicht umgesetzt |
| Push-Mitteilungen | Könnten Erinnerungen verbessern, erfordern aber zusätzlichen technischen Aufwand | Hoch | Niedrig | Nicht umgesetzt |

- Ein Dashboard als Startseite wurde gewählt, weil es den aktuellen To-Do-Stand schnell sichtbar macht. Dadurch sehen Nutzerinnen und Nutzer sofort, welche To-Dos offen, erledigt, überfällig oder für heute geplant sind.
- Die getrennten Seiten `/tasks` und `/calendar` unterstützen zwei typische Arbeitsweisen: To-Dos pflegen und Termine prüfen. So bleibt die Listenansicht fokussiert auf Verwaltung und Filterung, während die Kalenderansicht für die zeitliche Planung genutzt wird.
- Die wichtigsten Kennzahlen wurden prominent platziert, damit der Prototyp nicht nur eine Sammlung von To-Dos ist, sondern auch einen schnellen Überblick über den aktuellen Arbeitsstand bietet.
- Filter nach Status, Kategorie, Priorität und Datum wurden priorisiert, weil sie bei vielen To-Dos die Orientierung verbessern und direkt zu den User Stories passen.
- Die Kalenderansicht wurde als eigener Bereich umgesetzt, weil Termine, Deadlines und wiederkehrende To-Dos visuell leichter verständlich sind als in einer reinen Liste.
- Modals für das Erstellen, Bearbeiten und Terminieren von To-Dos wurden gewählt, damit Nutzerinnen und Nutzer im aktuellen Kontext bleiben und nicht für jede Aktion auf eine neue Seite wechseln müssen.

Nicht weiterverfolgt wurden Varianten, die zu stark auf eine reine To-Do-Liste oder eine reine Kalenderlösung gesetzt haben. Die finale Richtung kombiniert beide Ansätze, weil die App sowohl beim Sammeln als auch beim konkreten Planen von To-Dos helfen soll.

#### Risiken und Annahmen

Während der Planung wurden mehrere Risiken und Annahmen festgehalten:

| Risiko oder Annahme | Bedeutung für den Prototyp | Umgang damit |
| --- | --- | --- |
| Nutzerinnen und Nutzer könnten Deadline und "Zu erledigen am" verwechseln. | Falsche Terminierung oder unklare Bedienung möglich. | Beide Felder werden dokumentiert, die Terminierung prüft die Deadline und der Unterschied wurde im Usability-Test abgefragt. |
| Zu viele geplante To-Dos können einen Tag unrealistisch machen. | Der Kalender allein zeigt nicht automatisch, ob ein Tag zu voll ist. | Tages- und Kategorie-Limits prüfen die geplante Dauer und geben verständliche Fehlermeldungen aus. |
| Die Kalenderansicht kann bei vielen To-Dos unübersichtlich werden. | Die Planung könnte schwer lesbar werden. | Filter, Monats-/Wochenansicht und Detailmodal helfen bei der Orientierung. |
| Externe Dienste wie MongoDB Atlas und Netlify müssen verfügbar sein. | Ohne Datenbank oder Deployment ist die App nicht vollständig nutzbar. | `.env.example`, Netlify-Konfiguration und Build-Prüfung sind dokumentiert. |
| Erweiterungen dürfen den Mindestumfang nicht gefährden. | Zusatzfunktionen könnten Aufwand und Komplexität erhöhen. | Kernfunktionen wurden zuerst umgesetzt; optionale Ideen wurden priorisiert oder bewusst nicht umgesetzt. |

#### Hauptworkflow: To-Do verwalten

Der zentrale Workflow zeigt, wie ein To-Do vom Einstieg über das Erstellen bis zur späteren Verwaltung genutzt wird.

```mermaid
flowchart TD
    A[Dashboard öffnen] --> B[Überblick über offene, heutige und überfällige To-Dos prüfen]
    B --> C{Neues To-Do nötig?}
    C -->|Ja| D[To-Do erstellen]
    C -->|Nein| F[To-Do-Liste öffnen]
    D --> E[Titel, Kategorie, Priorität und Status erfassen]
    E --> F[To-Do-Liste öffnen]
    F --> G[Filter nach Status, Kategorie oder Priorität setzen]
    G --> H[Gefilterte To-Dos anzeigen]
    H --> I{Aktion wählen}
    I -->|Bearbeiten| J[To-Do bearbeiten und speichern]
    I -->|Abschliessen| K[To-Do als erledigt markieren]
    I -->|Löschen| L[To-Do löschen]
    J --> M[Liste und Dashboard aktualisieren]
    K --> M
    L --> M
```

#### Planungsworkflow: To-Do terminieren

Der Planungsworkflow zeigt, wie ein noch nicht geplantes To-Do einem Datum zugeordnet wird und wie die App dabei Deadline und Planungs-Limits berücksichtigt.

```mermaid
flowchart TD
    A[To-Do-Liste öffnen] --> B[Offene und ungeplante To-Dos prüfen]
    B --> C[To-Dos terminieren öffnen]
    C --> D[To-Do mit Deadline und geschätzter Dauer auswählen]
    D --> E[Datum für Zu erledigen am setzen]
    E --> F{Datum nach Deadline?}
    F -->|Ja| G[Fehlermeldung anzeigen und anderes Datum wählen]
    G --> E
    F -->|Nein| H{Tages- oder Kategorie-Limit überschritten?}
    H -->|Ja| I[Warnung mit verfügbarer Restzeit anzeigen]
    I --> J{Trotz Warnung speichern möglich?}
    J -->|Nein| E
    J -->|Ja| K[Termin speichern]
    H -->|Nein| K
    K --> L[To-Do erscheint im Kalender]
    L --> M{Termin im Kalender ändern?}
    M -->|Ja| N[To-Do per Drag-and-Drop verschieben]
    N --> O[Neue Planung erneut prüfen und speichern]
    M -->|Nein| P[Planung bleibt bestehen]
    O --> P
```

### 3.4 Prototype

#### Aktueller Prototyp

Der aktuelle Prototyp ist eine funktionsfähige SvelteKit-App mit MongoDB-Anbindung. Das Netlify-Deployment ist veröffentlicht und unter [https://prototypingtodolist.netlify.app/](https://prototypingtodolist.netlify.app/) erreichbar.

#### Geforderte Kernfunktionen

Die geforderten Kernfunktionen orientieren sich am Standardumfang der Übungen bis Semesterwoche 8: Inhalte erfassen, über Buttons bedienen, mit eigenem CSS gestalten und gefiltert anzeigen.

- SvelteKit-Prototyp mit mehreren Seiten, Navigation und eigenem Styling über Bootstrap sowie projektbezogene CSS-Regeln in `src/app.css`.
- To-Dos als eigene Einträge erfassen und in der To-Do-Liste anzeigen.
- Buttons zum Erstellen, Bearbeiten, Löschen und Abschliessen von To-Dos.
- Formulare und Modals zum Erfassen und Bearbeiten der wichtigsten To-Do-Daten.
- Basisfelder für Titel, Beschreibung, Kategorie, Priorität und Status.
- To-Dos nach Status, Kategorie und Priorität filtern.
- Gefilterte To-Dos direkt in der Liste anzeigen, sodass nur passende Einträge sichtbar bleiben.
- Grundlegende Dashboard-Übersicht mit Kennzahlen zu offenen, erledigten, heutigen und überfälligen To-Dos.

#### Technologie

- **Framework:** SvelteKit mit Svelte 5
- **Build-Tool:** Vite
- **Styling:** Bootstrap und projektbezogene CSS-Regeln in `src/app.css`
- **Datenbank:** MongoDB
- **Serverlogik:** SvelteKit Server Load Functions und API-Routen
- **Deployment:** veröffentlicht auf Netlify mit `@sveltejs/adapter-netlify`

#### Wichtige Projektstruktur

- `src/routes/+page.svelte`: Dashboard
- `src/routes/+page.server.js`: Lädt To-Dos und Datumsmetadaten für das Dashboard
- `src/routes/tasks/+page.svelte`: To-Do-Verwaltung mit Filtern, URL-Parametern, einklappbaren Datumsfiltern und Modals
- `src/routes/tasks/+page.server.js`: Lädt To-Dos für die To-Do-Ansicht
- `src/routes/calendar/+page.svelte`: Kalender mit Wochen-, Arbeitswochen- und Monatsansicht
- `src/routes/calendar/+page.server.js`: Lädt To-Dos, Kalender-Metadaten und Standardansicht
- `src/routes/settings/+page.svelte`: Einstellungsseite für Planungs-Limits und Kalenderstandard
- `src/routes/settings/+page.server.js`: Lädt gespeicherte Einstellungen
- `src/routes/api/todos/+server.js`: API für To-Do-Liste und Erstellung
- `src/routes/api/todos/[id]/+server.js`: API für Aktualisieren, Abschliessen und Löschen
- `src/routes/api/settings/+server.js`: API zum Lesen und Speichern der Einstellungen
- `src/lib/server/db.js`: MongoDB-Verbindung
- `src/lib/server/todos.js`: CRUD-Funktionen für To-Dos
- `src/lib/server/settings.js`: Standardwerte und Speicherung der App-Einstellungen
- `src/lib/scheduleCapacity.js`: Validierung von Tages- und Kategorie-Limits, Deadline-Regel und Kapazitäts-Fehlermeldungen
- `src/lib/todoSchedule.js`: Logik für Termine und Wiederholungen
- `src/lib/components`: Wiederverwendbare UI-Komponenten
- `src/lib/data/todoOptions.js`: UI-Optionen und Badge-Klassen für To-Dos
- `netlify.toml`: Netlify-Buildkonfiguration
- `.env.example`: Beispiel für benötigte Umgebungsvariablen

#### Datenmodell

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

#### Planungsregeln

Für die Terminierung gelten konkrete Regeln, damit geplante To-Dos realistisch bleiben:

- Ein To-Do darf nicht auf ein Datum nach seiner Deadline terminiert werden.
- Pro Tag dürfen standardmässig maximal 16 Stunden geplante To-Dos eingetragen werden.
- Für To-Dos der Kategorie `Arbeit` gilt standardmässig ein Limit von 8 Stunden pro Tag.
- To-Dos der Kategorie `Arbeit` dürfen nicht auf Samstag oder Sonntag terminiert werden.
- Tageslimit, Kategorie-Limits und Standard-Kalenderansicht können in den Einstellungen angepasst werden.
- Bei überschrittenen Limits zeigt die App eine verständliche Fehlermeldung und zusätzlich die noch verfügbare Restzeit an.

#### URL-Parameter für Filter

Die To-Do-Ansicht speichert aktive Filter in der URL. Dadurch bleiben Filter nach einem Reload erhalten und gefilterte Ansichten können geteilt oder als Bookmark gespeichert werden.

Unterstützte Parameter:

- `status`: `all`, `open`, `completed`, `overdue`, `unscheduled`, `today` oder `scheduled`
- `category`: zum Beispiel `Privat`, `Arbeit`, `Sport` oder `Sonstiges`
- `priority`: `Low`, `Medium` oder `High`
- `dateField`: `scheduledDate` oder `deadline`
- `dateFrom`: Startdatum im Format `YYYY-MM-DD`
- `dateTo`: Enddatum im Format `YYYY-MM-DD`

Beispiel:

```text
/tasks?status=open&category=Arbeit&dateField=deadline&dateFrom=2026-05-01&dateTo=2026-05-31
```

### 3.5 Validate

Der aktuelle Prototyp wurde lokal getestet und mit zwei Testpersonen in kurzen Usability-Tests validiert.

#### Testübersicht

| Test | Testperson | Fokus | Zentrale Erkenntnis |
| --- | --- | --- | --- |
| Usability-Test 1 | Mitstudent Dario | Hauptworkflows, Planungsregeln, Fehlermeldungen und Dark/White Mode | Die App war grundsätzlich verständlich; Einstieg zum Erstellen und Terminieren musste sichtbarer werden. |
| Usability-Test 2 | Zweite Testperson aus dem privaten Umfeld | Verständlichkeit von Beschriftungen, Orientierung im Dashboard und Terminierungslogik | Counter, Erstellen-Button, Datumsfilter und Regeln für Arbeitstermine mussten klarer werden. |

#### Erfolgskriterien der Tests

| Kriterium | Ergebnis |
| --- | --- |
| Neues To-Do erstellen | Erfolgreich möglich; Einstieg wurde nach dem ersten Test sichtbarer gemacht. |
| To-Do in der Liste wiederfinden | Möglich; Filter und URL-Parameter verbessern die Orientierung. |
| To-Do terminieren | Möglich; Button `To-Dos terminieren` wurde nach dem ersten Test sichtbarer platziert. |
| To-Do im Kalender finden und öffnen | Möglich; ganze Kalender-Card wurde anklickbar gemacht. |
| Fehlermeldungen zu Limits verstehen | Grundsätzlich verständlich; Restzeit und Datumsformat wurden verbessert. |
| Unterschied zwischen Deadline und "Zu erledigen am" verstehen | Verständlich, aber erklärungsbedürftig; deshalb in README und Terminierungslogik klar dokumentiert. |
| White Mode und Dark Mode prüfen | Beide Modi wurden geprüft; White Mode wurde optisch stärker an den Dark Mode angepasst. |

#### Beobachtung und Anpassung

Die folgende Tabelle fasst die wichtigsten Testaufgaben, den erreichten Erfolg, die beobachteten Schwierigkeiten und die daraus abgeleiteten Anpassungen zusammen.

| Testaufgabe | Erfolg | Beobachtung | Abgeleitete Anpassung |
| --- | --- | --- | --- |
| App öffnen und Dashboard verstehen | Erfolgreich | Die Kennzahlen wurden verstanden, der Counter für neue To-Dos war aber zunächst irreführend. | Dashboard-Kennzahlen und Beschriftungen wurden klarer formuliert; geplante Stunden für heute werden sichtbarer angezeigt. |
| Neues To-Do erstellen | Erfolgreich | Der Button zum Erstellen eines neuen To-Dos wurde zunächst gesucht. | Erstellen-Button auf Dashboard und wichtigen Seiten ergänzt beziehungsweise optisch klarer gemacht. |
| Erstelltes To-Do in der Liste wiederfinden | Erfolgreich | Die Liste war verständlich; bei mehreren To-Dos waren Filter hilfreich. | Filter nach Status, Kategorie, Priorität und Datum wurden ausgebaut und über URL-Parameter gespeichert. |
| To-Do terminieren | Erfolgreich mit kurzem Zögern | Der Button `To-Dos terminieren` wurde im ersten Test nicht genutzt. | Button sichtbarer platziert und Terminierungsablauf stärker vom Erstellen getrennt. |
| Unterschied zwischen Deadline und "Zu erledigen am" verstehen | Teilweise erfolgreich | Die Unterscheidung war grundsätzlich verständlich, musste aber aufmerksam gelesen werden. | Terminierung prüft die Deadline; Begriffe und Ablauf werden in README und UI klarer getrennt. |
| Planungs-Limits überschreiten | Erfolgreich | Fehlermeldungen wurden gelesen und verstanden, sollten aber konkreter zeigen, was noch möglich ist. | Fehlermeldungen zeigen verständlicheres Datum und verfügbare Restzeit. |
| To-Do im Kalender finden und öffnen | Erfolgreich | Die Testperson erwartete, dass die ganze Kalender-Card anklickbar ist. | Ganze To-Do-Card im Kalender öffnet nun das Detailmodal. |
| To-Do bearbeiten und speichern | Erfolgreich | Das Feld "Zu erledigen am" sollte beim Bearbeiten sichtbar bleiben, damit bestehende Termine nachvollziehbar bleiben. | Feld bleibt im Bearbeitungsmodal sichtbar; Änderungen werden in Liste und Kalender aktualisiert. |
| To-Do als erledigt markieren | Erfolgreich | Die Aktion war verständlich; Rückmeldung und Dashboard-Zahlen sollten direkt nachvollziehbar sein. | Erfolgsmeldung und Aktualisierung über `invalidateAll()` bleiben erhalten; Erledigt-Buttons wurden optisch klarer gestaltet. |
| White Mode und Dark Mode prüfen | Erfolgreich | Dark Mode wurde besonders positiv wahrgenommen; White Mode sollte konsistenter wirken. | White Mode wurde farblich stärker an den Dark Mode angeglichen. |
| Erweiterungsideen sammeln | Erfolgreich | To-Dos über mehrere Tage wurden als weitere Idee genannt. | Als nächstes Feature in Issue [#12](https://github.com/LukasPowroznik/ToDoApp/issues/12) dokumentiert. |

#### Bereits geprüft

- Produktionsbuild mit `npm.cmd run build` erfolgreich.
- Netlify-Adapter wird beim Build verwendet.
- `.env` ist in `.gitignore` ausgeschlossen.
- `.env.example` dokumentiert die benötigte MongoDB-Variable.

#### Geplante Testszenarien

- Neues To-Do erstellen und in MongoDB speichern.
- To-Do bearbeiten und das Feld "Zu erledigen am" setzen.
- To-Do nach Status, Kategorie, Priorität und Datum filtern.
- Gefilterte To-Do-Ansicht neu laden und prüfen, ob die Filter über URL-Parameter erhalten bleiben.
- Überfällige To-Dos erkennen.
- To-Do löschen und prüfen, ob es aus MongoDB entfernt wird.
- Wiederkehrendes To-Do im Kalender prüfen.
- Einzelnes Kalender-Vorkommen als erledigt markieren.
- Kalenderansichten Woche, Arbeitswoche und Monat auf Desktop prüfen.
- To-Do im Kalender per Drag-and-Drop verschieben.
- Terminierung nach der Deadline versuchen und prüfen, ob die App dies verhindert.
- Einstellungen für Limits und Standard-Kalenderansicht speichern.
- White Mode und Dark Mode prüfen.

#### Screenshot-Dokumentation für Testing

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

Die Vorher-Screenshots wurden vor den Testing-Änderungen erstellt. Die Nachher-Screenshots wurden nach den Anpassungen mit denselben Dateinamen im Ordner `nachher/` ergänzt, damit der Vergleich direkt sichtbar ist.

#### Usability-Test mit Testperson

Für den kurzen Usability-Test wurde die App auf dem Laptop bereitgestellt. Die Test-To-Dos konnte die Testperson auf dem Smartphone lesen. Die Testperson sollte laut denken und sagen, was sie erwartet, was sie verwirrt und warum sie eine bestimmte Aktion ausführt.

Wichtiger Hinweis für die Testperson:

> Es wird nicht die Person getestet, sondern der Prototyp. Wenn etwas unklar ist, ist das ein wertvoller Hinweis für die Weiterentwicklung.

##### Test-To-Dos

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

##### Fragen nach dem Test

- Was war einfach verständlich?
- Wo musstest du überlegen?
- Gab es einen Button, Begriff oder Ablauf, der unklar war?
- Waren die Fehlermeldungen hilfreich?
- Hast du den Unterschied zwischen Deadline und "Zu erledigen am" verstanden?
- Hast du die Planungsregeln mit 8 Stunden Arbeit und 16 Stunden Tageslimit verstanden?
- Was würdest du als Erstes verbessern?
- Würdest du die App für eigene To-Dos benutzen? Warum oder warum nicht?

##### Beobachtungsnotizen

Während des Tests sollte festgehalten werden:

- Wo klickt die Testperson zuerst?
- Wo zögert sie?
- Werden Fehlermeldungen gelesen und verstanden?
- Ist der Button `To-Dos terminieren` eindeutig?
- Wird der Unterschied zwischen Deadline und Termin verstanden?
- Findet die Testperson To-Dos im Kalender wieder?
- Werden die 8h- und 16h-Regeln ohne zusätzliche Erklärung verstanden?

##### Durchführung und Ergebnisse mit Dario

Der Usability-Test wurde mit dem Mitstudenten Dario durchgeführt. Die Testperson konnte die App grundsätzlich gut verstehen und die wichtigsten Abläufe nachvollziehen. Besonders positiv bewertet wurden die verständlichen Fehlermeldungen, die nachvollziehbaren Planungsregeln und der Dark Mode.

Beobachtungen aus dem Test:

- Die Testperson musste zunächst suchen, bis sie den Button zum Erstellen eines neuen To-Dos gefunden hatte.
- Die vorhandenen Buttons waren verständlich und wurden nicht als unklar wahrgenommen.
- Der Button `To-Dos terminieren` wurde während des Tests nicht verwendet.
- Beim Erstellen eines neuen To-Dos war die direkte Terminierung zu präsent und hat vom späteren Planungsablauf abgelenkt.
- Die Fehlermeldungen wurden gelesen, verstanden und als hilfreich eingeschätzt.
- Die Planungsregeln mit Arbeitslimit und Tageslimit wurden verstanden.
- Bei Fehlermeldungen zu Planungs-Limits sollte klarer sichtbar sein, wie viel Zeit noch verfügbar ist und ob ein To-Do trotz Warnung gespeichert werden darf.
- Im Kalender sollte nicht nur ein kleiner Bereich, sondern die ganze To-Do-Card anklickbar sein.
- Wenn noch kein To-Do vorhanden ist, sollte direkt ein Button zum Erstellen eines neuen To-Dos sichtbar sein.
- Die erweiterten Fehlermeldungen zeigen inzwischen zusätzlich, wie viel Zeit am betroffenen Tag oder in der betroffenen Kategorie noch einplanbar wäre.
- Als zusätzliche Funktion wurde vorgeschlagen, To-Dos über mehrere Tage planen zu können.
- Die Testperson würde die App grundsätzlich nutzen, wenn sie ihre To-Dos nicht bereits mit einem anderen System tracken würde.
- Der Dark Mode wurde als besonders gelungen wahrgenommen.
- Als Verbesserung wurde genannt, dass der White Mode farblich stärker an den Dark Mode angeglichen werden könnte.

##### Abgeleitete Anpassungen

Aus dem Usability-Test wurden mehrere Anpassungen am Prototyp vorgenommen. Die wichtigsten Änderungen waren ein sichtbarerer Einstieg zum Erstellen und Terminieren von To-Dos, verständlichere Planungs-Fehlermeldungen, eine klarere Trennung zwischen Erstellen und Terminieren sowie eine bessere Bedienbarkeit im Kalender.

Die einzelnen Beobachtungen und Anpassungen sind in der Tabelle **Beobachtung und Anpassung** zusammengefasst. Die Nachher-Screenshots dokumentieren den Stand nach diesen Änderungen.

##### Durchführung und Ergebnisse mit zweiter Testperson

Ein weiterer Usability-Test wurde mit meiner Mutter durchgeführt. Dabei wurden die Testaufgaben erneut durchgespielt und besonders auf Verständlichkeit, Beschriftungen, Fehlermeldungen und Orientierung im Dashboard geachtet.

Beobachtungen aus dem Test:

- Der Counter für neue To-Dos war zunächst irreführend.
- Der Button zum Erstellen neuer To-Dos sollte optisch klarer dargestellt werden.
- Bei To-Dos der Kategorie `Arbeit` musste geprüft werden, ob das Verhalten am Samstag korrekt ist.
- Die Logik, dass ein To-Do nicht nach seiner Deadline terminiert werden darf, sollte in der Terminierung klar abgebildet sein.
- Beim Bearbeiten eines To-Dos wurde überlegt, ob das Feld "Zu erledigen am" ausgeblendet werden soll. Die Entscheidung war, das Feld nicht auszublenden, weil bestehende Termine beim Bearbeiten weiterhin nachvollziehbar bleiben sollen.
- Aktive Filter sollten gespeichert bleiben, damit Nutzerinnen und Nutzer nach dem Neuladen oder Teilen einer Ansicht nicht erneut filtern müssen.
- Die total geplanten Stunden sollten an einer passenden Stelle sichtbar sein.
- Die heute verplante Zeit sollte auf dem Dashboard klarer erkennbar sein.
- Datumsfilter wurden als hilfreiche Erweiterung bewertet.

Abgeleitete Anpassungen aus diesem Test wurden in die finale Verbesserungstabelle übernommen. Besonders relevant waren die verständlichere Darstellung des Counters, der klarere Erstellen-Button, die Terminierungslogik für `Arbeit` am Wochenende, gespeicherte Filter und sichtbare geplante Stunden im Dashboard.

#### Mögliche nächste Schritte

- URL-basierte Filter und Datumsfilter in einem erneuten Usability-Test prüfen.
- Verhalten der Terminierungsregeln mit Randfällen testen, zum Beispiel Deadline am gleichen Tag, fehlende Dauer oder mehrere gleichzeitig geplante To-Dos.
- Kalenderexport als `.ics`-Datei prüfen, damit geplante To-Dos später in externe Kalender wie Google Calendar, Apple Calendar oder Outlook übernommen werden können.
- Mehrtägige To-Dos als geplantes Feature aus Issue [#12](https://github.com/LukasPowroznik/ToDoApp/issues/12) ausarbeiten, damit grössere To-Dos sinnvoll über mehrere Tage verteilt werden können.
- Abschlussdokumentation und Reflexion ergänzen.
- Fehlermeldungen und Ladezustände weiter verfeinern.

## 4. Erweiterungen [Optional]

Die folgenden Funktionen gehen über den Standardumfang aus den Übungen bis Semesterwoche 8 hinaus. Sie wurden ergänzt, um den Prototyp praxisnäher, planbarer und komfortabler zu machen.

- Button zum schnellen Erfassen eines neuen To-Dos direkt aus der Dashboard-Card "Heute terminierte To-Dos"; neue To-Dos werden dabei auf heute terminiert.
- Monatsauswertung für erledigte To-Dos der letzten sechs Monate.
- Zusätzliche Dashboard-Kennzahlen, zum Beispiel heutige, überfällige und im aktuellen Monat terminierte To-Dos sowie die geschätzte Stundensumme für heute.
- Erweiterte Felder für Deadline, geschätzte Dauer, Wiederholung und "Zu erledigen am".
- Terminierungslogik für To-Dos mit geplanter Erledigung an einem konkreten Datum.
- Validierung, dass To-Dos nicht auf ein Datum nach ihrer Deadline terminiert werden können.
- Erweiterte Datumsfilter sind einklappbar und unterstützen einzelne Daten sowie Zeiträume für Termin oder Deadline.
- Aktive Filter werden als URL-Parameter gespeichert, sodass gefilterte Ansichten neu geladen, geteilt oder als Bookmark gespeichert werden können.
- Sammelmodal zum Terminieren noch nicht geplanter To-Dos mit Anzeige von Deadline und geschätzter Dauer.
- Kalender mit Wochenansicht, Arbeitswoche und Monatsansicht.
- Drag-and-Drop zum Verschieben terminierter To-Dos im Kalender.
- Detailmodal für To-Dos im Kalender, das über die ganze To-Do-Karte geöffnet werden kann.
- Wiederkehrende To-Dos mit täglicher, wöchentlicher oder monatlicher Wiederholung bis zur gesetzten Deadline.
- Einzelne Vorkommen wiederkehrender To-Dos können im Kalender als erledigt markiert werden.
- Einstellungen für Tageslimit, Kategorie-Limits und Standard-Kalenderansicht.
- Fehlermeldungen bei überschrittenen Tages- oder Kategorie-Limits zeigen zusätzlich, wie viel Zeit noch einplanbar wäre.

### 4.1 Randfälle und Validierungen

Die folgenden Randfälle zeigen, dass der Prototyp nicht nur den Normalfall unterstützt, sondern auch ungültige oder erklärungsbedürftige Eingaben abfängt. Die Screenshots können nach dem finalen Testlauf ergänzt werden.

| Randfall | Erwartetes Verhalten | Screenshot |
| --- | --- | --- |
| To-Do ohne Titel speichern | Die App verhindert das Speichern und verlangt einen Titel. | ![Validierung: fehlender Titel](docs/assets/edge-cases/missing-title.png) |
| To-Do nach seiner Deadline terminieren | Die App verhindert die Terminierung und zeigt eine verständliche Fehlermeldung. | ![Validierung: Termin nach Deadline](docs/assets/edge-cases/deadline-validation.png) |
| Arbeits-To-Do auf Samstag oder Sonntag terminieren | Die App verhindert den Arbeitstermin am Wochenende. | ![Validierung: Arbeit am Wochenende](docs/assets/edge-cases/work-weekend-validation.png) |
| Tageslimit überschreiten | Die App verhindert die Terminierung und zeigt, wie viele Stunden noch einplanbar wären. | ![Validierung: Tageslimit](docs/assets/edge-cases/daily-limit-validation.png) |
| Kategorie-Limit überschreiten | Die App verhindert die Terminierung innerhalb der betroffenen Kategorie und zeigt die verfügbare Restzeit. | ![Validierung: Kategorie-Limit](docs/assets/edge-cases/category-limit-validation.png) |
| Wiederkehrendes To-Do als einzelnes Vorkommen erledigen | Nur das konkrete Kalender-Vorkommen wird als erledigt markiert; die Wiederholung bleibt bestehen. | ![Randfall: einzelnes wiederkehrendes Vorkommen erledigt](docs/assets/edge-cases/recurring-occurrence-completed.png) |
| Filter ohne Treffer | Die App zeigt einen leeren Zustand und fordert dazu auf, Filter anzupassen oder ein neues To-Do zu erfassen. | ![Randfall: Filter ohne Treffer](docs/assets/edge-cases/empty-filter-state.png) |

### 4.2 Bewusst nicht umgesetzte Ideen

Einige Ideen aus der Sketch-Phase wurden bewusst nicht umgesetzt, damit der Prototyp fokussiert bleibt und der Mindestumfang stabil funktioniert.

| Idee | Entscheidung | Begründung |
| --- | --- | --- |
| Push-Mitteilungen | Nicht umgesetzt | Erinnerungen wären nützlich, benötigen aber zusätzliche Browser- oder App-Berechtigungen und waren für den Kernworkflow nicht notwendig. |
| iPhone-App | Nicht umgesetzt | Der Fokus lag auf einem webbasierten SvelteKit-Prototyp, der online erreichbar ist. |
| Kalenderexport | Als nächstes Feature vorgesehen | Ein Export in externe Kalender wäre eine sinnvolle Erweiterung, wurde aber zugunsten eines stabilen Kernworkflows nicht mehr umgesetzt. |
| To-Dos über mehrere Tage planen | Als nächstes Feature in Issue [#12](https://github.com/LukasPowroznik/ToDoApp/issues/12) vorgesehen | Die Idee wurde im Usability-Test genannt, braucht aber ein eigenes Konzept für Aufteilung, Dauer und Darstellung im Kalender. |
| Subtasks | Nicht umgesetzt | Unteraufgaben wurden in den Skizzen angedacht, aber zugunsten von Terminierung, Filterung und Kalenderplanung zurückgestellt. |

## 5. Projektorganisation [Optional]

### 5.1 Repository und Arbeitsweise

- **Repository:** `LukasPowroznik/ToDoApp`
- **Projektform:** SvelteKit-Prototyp im Rahmen des Moduls Prototyping
- **Issue-Management:** Umsetzung und Erweiterungen werden über GitHub Issues organisiert.
- **Commit-Praxis:** Änderungen werden thematisch und nachvollziehbar versioniert.

Umgesetzte Anpassungen aus den Usability-Tests wurden als Issues dokumentiert und nach der Umsetzung geschlossen. Offene Issues bleiben bewusst für geplante nächste Features bestehen, zum Beispiel mehrtägige To-Dos in Issue [#12](https://github.com/LukasPowroznik/ToDoApp/issues/12). Das finale Netlify-Deployment aus Issue [#9](https://github.com/LukasPowroznik/ToDoApp/issues/9) ist inzwischen veröffentlicht.

### 5.2 Lokales Setup

#### Voraussetzungen

- Node.js und npm
- Zugriff auf eine MongoDB-Instanz, zum Beispiel MongoDB Atlas

#### Umgebungsvariable

Die App erwartet eine MongoDB-Verbindung in einer lokalen `.env`-Datei:

```bash
MONGODB_URI=mongodb+srv://...
```

Als Vorlage kann `.env.example` verwendet werden. Die lokale `.env`-Datei wird durch `.gitignore` ausgeschlossen und darf nicht ins Repository übernommen werden.
Der echte Connection String mit Benutzername und Passwort darf nur lokal in `.env` oder in den Netlify Environment Variables stehen, nicht in der README oder in `.env.example`.

Die Datenbank heisst `todoapp`. Die App verwendet die Collections `todos` für To-Dos und `settings` für App-Einstellungen.

#### Installation und Entwicklung

```bash
npm install
npm run dev
```

Der Entwicklungsserver wird standardmässig durch Vite gestartet.

#### Produktionsbuild

```bash
npm run build
npm run preview
```

Der Produktionsbuild wurde lokal mit `npm.cmd run build` geprüft und erfolgreich mit dem Netlify-Adapter erstellt.

### 5.3 Deployment auf Netlify

Das Projekt ist auf Netlify veröffentlicht und online unter [https://prototypingtodolist.netlify.app/](https://prototypingtodolist.netlify.app/) erreichbar.

#### Konfiguration

- `@sveltejs/adapter-netlify` ist installiert.
- `svelte.config.js` verwendet den Netlify-Adapter.
- `netlify.toml` definiert den Build-Befehl `npm run build`.
- Der Publish-Ordner ist `build`.
- Die Node-Version ist in `netlify.toml` auf `22` gesetzt.

#### Environment Variables in Netlify

In Netlify muss unter **Site configuration > Environment variables** folgende Variable gesetzt werden:

```bash
MONGODB_URI=mongodb+srv://...
```

Der Wert darf nicht im Repository gespeichert werden.
Wenn Zugangsdaten versehentlich geteilt wurden, sollte das MongoDB-Passwort in Atlas geändert und danach der neue Wert lokal sowie in Netlify aktualisiert werden.

#### Deployment-Status

Der lokale Produktionsbuild funktioniert. Das Netlify-Deployment ist final veröffentlicht.

- **Deployment-Plattform:** Netlify
- **Deployment-URL:** [https://prototypingtodolist.netlify.app/](https://prototypingtodolist.netlify.app/)

### 5.4 Abgabevideo

Für die Abgabe ist ein kommentierter Walkthrough vorgesehen. Das Video soll die wichtigsten Workflows aus Sicht der Nutzenden zeigen und nicht den Code erklären.

Geplante Inhalte des Videos:

- Dashboard öffnen und Kennzahlen erklären.
- Neues To-Do erstellen.
- To-Dos filtern und gefilterte Ansicht zeigen.
- To-Do bearbeiten, abschliessen und löschen.
- Offenes To-Do terminieren und Deadline-/Limit-Feedback zeigen.
- Kalenderansichten öffnen und ein To-Do im Kalender verschieben.
- Einstellungen für Planungs-Limits und Standard-Kalenderansicht zeigen.
- White Mode und Dark Mode kurz vergleichen.
- Offene nächste Features wie Kalenderexport und mehrtägige To-Dos kurz einordnen.

## 6. KI-Deklaration

### 6.1 KI-Tools

- **Eingesetzte Tools:** Codex / ChatGPT im Entwicklungsumfeld.
- **Zweck und Umfang:** Unterstützung beim Strukturieren von GitHub Issues, Prüfen des Projektstands, Implementieren einzelner Funktionen, Vorbereiten des Deployments und Aktualisieren der Projektdokumentation.
- **Eigene Leistung:** Entscheidungen zum Projektumfang, fachliche Einordnung, Tests und finale Überarbeitung bleiben Teil der eigenen Projektarbeit.

### 6.2 Prompt-Vorgehen

KI wurde gezielt für konkrete To-Dos eingesetzt, zum Beispiel zur Analyse des Repository-Stands, zur Anpassung von Komponenten, zur Vorbereitung des Netlify-Deployments und zur Aktualisierung der README anhand des aktuellen Codes. Ergebnisse werden geprüft und bei Bedarf angepasst, bevor sie ins Projekt übernommen werden.

Beispielprompts aus dem Projekt:

- "Kannst du den aktuellen Projektstand analysieren und mir sagen, welche Funktionen bereits umgesetzt sind?"
- "Bitte prüfe, warum das Terminieren eines To-Dos nach der Deadline möglich ist, und baue eine passende Validierung ein."
- "Ergänze im Dashboard einen Button, mit dem direkt ein neues To-Do erstellt werden kann."
- "Kannst du den Button `To-Dos terminieren` sichtbarer platzieren, ohne das Layout unruhig zu machen?"
- "Dokumentiere die Ergebnisse aus dem Usability-Test in der README und formuliere daraus abgeleitete Anpassungen."
- "Erstelle aus den erledigten Usability-Test-Punkten GitHub Issues und schliesse sie direkt als erledigt ab."
- "Bereite die README so vor, dass ein Crazy-Eights-Bild eingefügt werden kann."
- "Prüfe, ob der MongoDB Connection String in die README gehört oder nur als Umgebungsvariable verwendet werden soll."

Die Prompts wurden meist iterativ gestellt. Nach einer ersten Antwort oder Umsetzung wurden Details ergänzt, zum Beispiel konkrete Testnotizen, gewünschte Formulierungen oder Hinweise, ob ein Punkt bereits erledigt war.

### 6.3 Reflexion

Die Arbeit am Prototyp hat gezeigt, dass eine To-Do-App schnell komplexer wird, sobald To-Dos nicht nur erfasst, sondern auch realistisch geplant werden sollen. Zu Beginn wirkte der Funktionsumfang überschaubar: To-Dos erstellen, bearbeiten, löschen und filtern. Durch die Auseinandersetzung mit Deadlines, geschätzter Dauer, Kategorien, Kalenderansicht und Planungs-Limits wurde aber deutlich, dass die eigentliche Herausforderung in der Verbindung zwischen To-Do-Liste und Zeitplanung liegt.

Besonders wichtig war deshalb die klare Trennung zwischen Deadline und "Zu erledigen am". Die Usability-Tests haben gezeigt, dass diese Unterscheidung für Nutzerinnen und Nutzer verständlich sein muss, damit die App nicht nur technisch funktioniert, sondern auch im Alltag sinnvoll bedienbar ist. Aus den Tests entstanden mehrere konkrete Verbesserungen, zum Beispiel sichtbarere Buttons, verständlichere Fehlermeldungen, gespeicherte Filter und eine bessere Darstellung der geplanten Stunden. Dadurch wurde der Prototyp nicht nur erweitert, sondern auch stärker an echten Nutzungssituationen ausgerichtet.

Technisch war vor allem die Terminierungslogik anspruchsvoll. Regeln wie das Tageslimit, das Arbeitslimit, die Deadline-Prüfung und die Einschränkung von Arbeitsterminen am Wochenende mussten so umgesetzt werden, dass sie nachvollziehbar bleiben und den Arbeitsfluss nicht unnötig blockieren. Gleichzeitig sollte die App trotz zusätzlicher Funktionen stabil und übersichtlich bleiben. Deshalb wurden einige Ideen wie Push-Mitteilungen, iPhone-App oder Kalenderexport bewusst nicht umgesetzt, sondern als mögliche Weiterentwicklungen dokumentiert.

Der Einsatz von KI hat die Arbeit deutlich beschleunigt, vor allem beim Strukturieren von Issues, beim Prüfen des Projektstands, beim Formulieren der Dokumentation und beim Finden technischer Lösungswege. Gleichzeitig musste jede generierte Antwort überprüft werden. Besonders bei der README war wichtig, dass nur Funktionen dokumentiert werden, die tatsächlich umgesetzt oder klar als nächste Schritte markiert sind. KI war damit ein hilfreiches Werkzeug, hat aber die fachliche Entscheidung, Priorisierung und finale Kontrolle nicht ersetzt.

Insgesamt hat das Projekt gezeigt, wie wichtig ein iteratives Vorgehen ist: Erst durch Skizzen, Prototyp, Tests und anschliessende Anpassungen wurde klar, welche Funktionen wirklich helfen und welche eher zusätzliche Komplexität erzeugen. Der finale Stand erfüllt den Mindestumfang und enthält mehrere sinnvolle Erweiterungen, bleibt aber bewusst ein Prototyp mit klar dokumentierten Grenzen und nächsten Entwicklungsschritten.

## 7. Anhang [Optional]

- **Quellen:** SvelteKit-Dokumentation, Bootstrap-Dokumentation, MongoDB-Dokumentation, Netlify-Dokumentation und Projektdateien im Repository.
- **Testskript und Materialien:** Usability-Test-To-Dos, Fragen und Beobachtungsnotizen sind in Abschnitt 3.5 dokumentiert.
- **Rohdaten und Auswertung:** Die zusammengefassten Beobachtungen und abgeleiteten Anpassungen sind in Abschnitt 3.5 dokumentiert.

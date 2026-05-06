export const demoTodos = [
	{
		id: 'demo-1',
		title: 'Projektstruktur für To-Do App planen',
		description: 'Grundseiten, Navigation und erste Komponenten festlegen.',
		status: 'offen',
		completed: false,
		category: 'Arbeit',
		priority: 'hoch',
		dueDate: '2026-05-06',
		estimatedDuration: '1 h',
		isRecurring: false,
		recurrence: null
	},
	{
		id: 'demo-2',
		title: 'Trainingsplan prüfen',
		description: 'Kurze Einheit für diese Woche einplanen.',
		status: 'offen',
		completed: false,
		category: 'Sport',
		priority: 'mittel',
		dueDate: '2026-05-08',
		estimatedDuration: '45 min',
		isRecurring: true,
		recurrence: 'wöchentlich'
	},
	{
		id: 'demo-3',
		title: 'Einkaufsliste ergänzen',
		description: 'Lebensmittel für die nächsten Tage notieren.',
		status: 'offen',
		completed: false,
		category: 'Privat',
		priority: 'niedrig',
		dueDate: null,
		estimatedDuration: '15 min',
		isRecurring: false,
		recurrence: null
	},
	{
		id: 'demo-4',
		title: 'Präsentationsnotizen sortieren',
		description: 'Offene Stichpunkte für das Modul Prototyping sammeln.',
		status: 'erledigt',
		completed: true,
		category: 'Sonstiges',
		priority: 'mittel',
		dueDate: '2026-05-03',
		estimatedDuration: '30 min',
		isRecurring: false,
		recurrence: null
	},
	{
		id: 'demo-5',
		title: 'Überfällige Aufgabe nachziehen',
		description: 'Beispiel für eine sichtbare überfällige Aufgabe.',
		status: 'offen',
		completed: false,
		category: 'Arbeit',
		priority: 'hoch',
		dueDate: '2026-05-01',
		estimatedDuration: '20 min',
		isRecurring: false,
		recurrence: null
	}
];

export const categoryBadgeClasses = {
	Privat: 'text-bg-info',
	Arbeit: 'text-bg-primary',
	Sport: 'text-bg-success',
	Sonstiges: 'text-bg-secondary'
};

export const priorityBadgeClasses = {
	hoch: 'text-bg-danger',
	mittel: 'text-bg-warning',
	niedrig: 'text-bg-light'
};

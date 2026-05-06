export const demoTodos = [
	{
		id: 'demo-1',
		title: 'Projektstruktur für To-Do App planen',
		description: 'Grundseiten, Navigation und erste Komponenten festlegen.',
		category: 'Arbeit',
		deadline: '2026-05-06',
		priority: 'High',
		status: 'Open',
		estimatedDuration: '1 h',
		recurring: false,
		createdAt: '2026-05-01T09:00:00.000Z'
	},
	{
		id: 'demo-2',
		title: 'Trainingsplan prüfen',
		description: 'Kurze Einheit für diese Woche einplanen.',
		category: 'Sport',
		deadline: '2026-05-08',
		priority: 'Medium',
		status: 'Open',
		estimatedDuration: '1 h',
		recurring: true,
		recurrence: {
			type: 'weekly',
			weekdays: ['friday']
		},
		createdAt: '2026-05-02T10:30:00.000Z'
	},
	{
		id: 'demo-3',
		title: 'Einkaufsliste ergänzen',
		description: 'Lebensmittel für die nächsten Tage notieren.',
		category: 'Privat',
		priority: 'Low',
		status: 'Open',
		estimatedDuration: '30 min',
		recurring: false,
		createdAt: '2026-05-03T08:15:00.000Z'
	},
	{
		id: 'demo-4',
		title: 'Präsentationsnotizen sortieren',
		description: 'Offene Stichpunkte für das Modul Prototyping sammeln.',
		category: 'Sonstiges',
		deadline: '2026-05-03',
		priority: 'Medium',
		status: 'Completed',
		estimatedDuration: '30 min',
		recurring: false,
		createdAt: '2026-04-29T14:00:00.000Z',
		completedAt: '2026-05-03T16:30:00.000Z'
	},
	{
		id: 'demo-5',
		title: 'Überfällige Aufgabe nachziehen',
		description: 'Beispiel für eine sichtbare überfällige Aufgabe.',
		category: 'Arbeit',
		deadline: '2026-05-01',
		priority: 'High',
		status: 'Open',
		estimatedDuration: '30 min',
		recurring: false,
		createdAt: '2026-04-28T12:00:00.000Z'
	}
];

export const categoryBadgeClasses = {
	Privat: 'text-bg-info',
	Arbeit: 'text-bg-primary',
	Sport: 'text-bg-success',
	Sonstiges: 'text-bg-secondary'
};

export const priorityBadgeClasses = {
	High: 'text-bg-danger',
	Medium: 'text-bg-warning',
	Low: 'text-bg-light'
};

export const recurrenceLabels = {
	daily: 'täglich',
	weekly: 'wöchentlich',
	monthly: 'monatlich'
};

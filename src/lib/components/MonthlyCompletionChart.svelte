<script>
	let { todos = [] } = $props();

	const monthFormatter = new Intl.DateTimeFormat('de-CH', {
		month: 'short',
		year: '2-digit'
	});
	const monthKeys = $derived(
		Array.from({ length: 6 }, (_, index) => {
			const date = new Date();
			date.setDate(1);
			date.setMonth(date.getMonth() - (5 - index));

			return date.toISOString().slice(0, 7);
		})
	);
	const chartData = $derived(
		monthKeys.map((monthKey) => {
			const completedCount = todos.filter((todo) => todo.completedAt?.startsWith(monthKey)).length;
			const [year, month] = monthKey.split('-');
			const label = monthFormatter.format(new Date(Number(year), Number(month) - 1, 1));

			return {
				monthKey,
				label,
				completedCount
			};
		})
	);
	const maxCompleted = $derived(Math.max(1, ...chartData.map((month) => month.completedCount)));
	const chartPoints = $derived(
		chartData.map((month, index) => {
			const x = chartData.length === 1 ? 300 : 48 + (index / (chartData.length - 1)) * 504;
			const y = 174 - (month.completedCount / maxCompleted) * 118;

			return {
				...month,
				x,
				y
			};
		})
	);
	const linePoints = $derived(chartPoints.map((point) => `${point.x},${point.y}`).join(' '));
	const areaPoints = $derived(
		chartPoints.length > 0
			? `48,174 ${linePoints} 552,174`
			: ''
	);
</script>

<div class="card dashboard-card">
	<div class="card-body">
		<h2 class="h5 mb-1">Erledigte Aufgaben pro Monat</h2>
		<p class="text-secondary mb-4">Abgeschlossene To-Dos der letzten sechs Monate.</p>

		<div class="completion-line-chart" aria-label="Erledigte Aufgaben pro Monat">
			<svg class="completion-line-chart-svg" viewBox="0 0 600 230" role="img">
				<line class="completion-line-chart-grid" x1="48" y1="56" x2="552" y2="56" />
				<line class="completion-line-chart-grid" x1="48" y1="115" x2="552" y2="115" />
				<line class="completion-line-chart-grid" x1="48" y1="174" x2="552" y2="174" />
				<line class="completion-line-chart-axis" x1="48" y1="174" x2="552" y2="174" />
				<polygon class="completion-line-chart-area" points={areaPoints} />
				<polyline class="completion-line-chart-line" points={linePoints} />

				{#each chartPoints as point}
					<circle class="completion-line-chart-point" cx={point.x} cy={point.y} r="6" />
					<text class="completion-line-chart-value" x={point.x} y={Math.max(24, point.y - 14)}>
						{point.completedCount}
					</text>
					<text class="completion-line-chart-label" x={point.x} y="210">{point.label}</text>
				{/each}
			</svg>
		</div>
	</div>
</div>

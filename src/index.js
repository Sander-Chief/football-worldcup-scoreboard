function ScoreBoard() {
	this.board = new Map();

	/**
	 * Starts a new game and adds it to the scoreboard.
	 * @param {string} homeTeam - home team name.
	 * @param {string} awayTeam - away team name.
	 */
	this.startGame = (homeTeam, awayTeam) => {
		if (!homeTeam || !awayTeam) {
			throw new Error('invalid teams');
		}

		const matchKey = `${homeTeam} - ${awayTeam}`;

		this.board.set(matchKey, {
			homeTeam,
			awayTeam,
			homeTeamScore: 0,
			awayTeamScore: 0,
			createdAt: Date.now(),
		});
	};

	/**
	 * Finishes a game and removes it from the scoreboard.
	 * @param {string} homeTeam - home team name.
	 * @param {string} awayTeam - away team name.
	 */
	this.finishGame = (homeTeam, awayTeam) => {
		if (!homeTeam || !awayTeam) {
			throw new Error('invalid teams');
		}

		const matchKey = `${homeTeam} - ${awayTeam}`;

		if (!this.board.get(matchKey)) {
			throw new Error('match not found');
		}

		this.board.delete(matchKey);
	};

	/**
	 * Updates the score of a single game.
	 * @param {string} homeTeam - home team name.
	 * @param {string} awayTeam - away team name.
	 * @param {{ home: number, away: number }} score - game score.
	 */
	this.updateScore = (homeTeam, awayTeam, score) => {
		const matchKey = `${homeTeam} - ${awayTeam}`;
		const match = this.board.get(matchKey);

		if (!match) {
			throw new Error('match not found');
		}

		const { home, away } = score;

		if (typeof home !== 'number' || typeof away !== 'number') {
			throw new Error('invalid score');
		}

		this.board.set(matchKey, {
			...match,
			homeTeamScore: home,
			awayTeamScore: away,
		});
	};

	/**
	 * Returns the score of a single game.
	 * @param {string} homeTeam - home team name.
	 * @param {string} awayTeam - away team name.
	 * @returns {{ homeTeamScore: number, awayTeamScore: number }}
	 */
	this.getScore = (homeTeam, awayTeam) => {
		const matchKey = `${homeTeam} - ${awayTeam}`;
		const match = this.board.get(matchKey);

		if (!match) {
			throw new Error('match not found');
		}

		const { homeTeamScore, awayTeamScore } = match;

		return {
			homeTeamScore,
			awayTeamScore,
		};
	};

	/**
	 * Returns a summary of all current games sorted by total score and creation date.
	 * @returns {string[]}
	 */
	this.getSummaryByTotalScore = () => {
		const boardSorted = [...this.board.entries()].sort((a, b) => {
			const aTotal = a[1].homeTeamScore + a[1].awayTeamScore;
			const bTotal = b[1].homeTeamScore + b[1].awayTeamScore;
		
				if (aTotal !== bTotal) {
					return bTotal - aTotal;
				}
		
				return a.createdAt - b.createdAt;
		}).map((match) => {
			const { homeTeam, awayTeam, homeTeamScore, awayTeamScore } = match[1];

			return `${homeTeam} ${homeTeamScore} - ${awayTeam} ${awayTeamScore}`;
		});

		return boardSorted;
	};

	return this;
}

export default ScoreBoard;

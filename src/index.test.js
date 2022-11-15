import ScoreBoard from './index';

describe('startGame adds a new game to the board', () => {
	test('adds a game', () => {
		const board = new ScoreBoard();

		board.startGame('Mexico', 'Canada');

		expect(board.getSummaryByTotalScore().length).toBe(1);

		board.startGame('Spain', 'Brazil');

		expect(board.getSummaryByTotalScore().length).toBe(2);
	});

	test('throws error if teams are invalid', () => {
		const board = new ScoreBoard();

		expect(() => board.startGame('Mexico')).toThrowError('invalid teams');
	})
});

describe('finishGame ends the game and removes it from the board', () => {
	test('ends the game', () => {
		const board = new ScoreBoard();

		board.startGame('Mexico', 'Canada');

		expect(board.getSummaryByTotalScore().length).toBe(1);

		board.finishGame('Mexico', 'Canada');

		expect(board.getSummaryByTotalScore().length).toBe(0);
	});

	test('throws error if match not present', () => {
		const board = new ScoreBoard();

		board.startGame('Mexico', 'Canada');

		expect(() => board.finishGame('Spain', 'Brazil')).toThrowError('match not found');
	});

	test('throws error if teams are invalid', () => {
		const board = new ScoreBoard();

		board.startGame('Mexico', 'Canada');

		expect(() => board.finishGame('Mexico')).toThrowError('invalid teams');
	});
});

describe('updateScore updates the score of a single game', () => {
	test('returns correct score', () => {
		const board = new ScoreBoard();

		board.startGame('Mexico', 'Canada');
		board.updateScore('Mexico', 'Canada', { home: 1, away: 2 });

		const score = board.getScore('Mexico', 'Canada');
		const { homeTeamScore, awayTeamScore } = score;

		expect(homeTeamScore).toBe(1);
		expect(awayTeamScore).toBe(2);
	});

	test('throws error if match not present', () => {
		const board = new ScoreBoard();

		board.startGame('Mexico', 'Canada');

		expect(() => board.updateScore('Germany', 'France', { home: 1, away: 2 })).toThrowError('match not found');
	});

	test('throws error if score is invalid', () => {
		const board = new ScoreBoard();

		board.startGame('Mexico', 'Canada');

		expect(() => board.updateScore('Mexico', 'Canada', { home: 1 })).toThrowError('invalid score');
	});
});

describe('getSummaryByTotalScore returns summary of all current games sorted by total score and creation date', () => {
	test('returns all games in correct order', () => {
		const testResponse = [
			'Germany 5 - France 5',
			'Mexico 1 - Canada 2',
			'Spain 2 - Brazil 1',
		];
		const board = new ScoreBoard();

		board.startGame('Mexico', 'Canada');
		board.updateScore('Mexico', 'Canada', { home: 1, away: 2 });

		board.startGame('Spain', 'Brazil');
		board.updateScore('Spain', 'Brazil', { home: 2, away: 1 });


		board.startGame('Germany', 'France');
		board.updateScore('Germany', 'France', { home: 5, away: 5 });

		expect(board.getSummaryByTotalScore()).toStrictEqual(testResponse);
	});
});

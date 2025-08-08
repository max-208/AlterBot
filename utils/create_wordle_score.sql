PRAGMA foreign_keys = ON;

BEGIN;
CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY NOT NULL,
    first_game_date INTEGER DEFAULT NULL,
    last_game_date INTEGER DEFAULT NULL,
    score_average REAL DEFAULT NULL,
    score_median INTEGER DEFAULT NULL,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    longest_streak_begin_date INTEGER DEFAULT NULL,
    longest_streak_end_date INTEGER DEFAULT NULL,
    FOREIGN KEY (first_game_date) REFERENCES games(date) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (last_game_date) REFERENCES games(date) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (longest_streak_begin_date) REFERENCES games(date) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (longest_streak_end_date) REFERENCES games(date) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS games (
    date INTEGER PRIMARY KEY NOT NULL,
    word TEXT NOT NULL,
    word_score INTEGER NOT NULL DEFAULT 5,
    players_number INTEGER NOT NULL DEFAULT 0,
    score_average INTEGER DEFAULT NULL,
    score_median INTEGER DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS guesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    date INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    first_guess TEXT DEFAULT NULL,
    second_guess TEXT DEFAULT NULL,
    third_guess TEXT DEFAULT NULL,
    fourth_guess TEXT DEFAULT NULL,
    fifth_guess TEXT DEFAULT NULL,
    sixth_guess TEXT DEFAULT NULL,
    FOREIGN KEY (player_id) REFERENCES players(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (date) REFERENCES games(date) ON UPDATE CASCADE ON DELETE CASCADE
);
END;


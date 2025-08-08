-- Ajout de parties
INSERT INTO games (date, word, word_score, players_number, score_average, score_median) VALUES
(20240601, 'apple', 5, 2, 3, 3),
(20240602, 'grape', 5, 1, 4, 4),
(20240603, 'peach', 5, 2, 2, 2);

-- Ajout de joueurs
INSERT INTO players (id, first_game_date, last_game_date, score_average, score_median, current_streak, longest_streak, longest_streak_begin_date, longest_streak_end_date) VALUES
(1, 20240601, 20240603, 3.0, 3, 2, 2, 20240601, 20240603),
(2, 20240601, 20240602, 3.5, 4, 1, 1, 20240601, 20240601);

-- Ajout de tentatives
INSERT INTO guesses (date, player_id, score, first_guess, second_guess, third_guess, fourth_guess, fifth_guess, sixth_guess) VALUES
(20240601, 1, 3, 'apple', 'angle', 'ample', NULL, NULL, NULL),
(20240601, 2, 4, 'apple', 'apply', 'amply', 'ample', NULL, NULL),
(20240602, 2, 4, 'grape', 'graph', 'grasp', 'grate', NULL, NULL),
(20240603, 1, 3, 'peach', 'peace', 'peach', NULL, NULL, NULL);


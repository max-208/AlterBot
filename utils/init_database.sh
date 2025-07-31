#!/bin/bash

find_project_root() {
    local dir="$PWD"
    while [[ "$dir" != "/" ]]; do
        if [[ -f "$dir/index.js" ]]; then
            return $dir
        fi
        dir="$(dirname "$dir")"
    done
    echo "index.js non trouvé dans la hiérarchie." >&2
    exit 1
}

# Change to the project root directory
PROJECT_ROOT=$(find_project_root)

cd "$PROJECT_ROOT" || exit 1

if [[ -f "$PROJECT_ROOT/data/wordle_score.db" ]]; then
    echo "Database already exists. Skipping initialization."
else
    echo "Creating database..."
    touch "$PROJECT_ROOT/data/wordle_score.db"
    sqlite3 "$PROJECT_ROOT/data/wordle_score.db" < "$PROJECT_ROOT/utils/create_wordle_score.sql"
    echo "Database initialized successfully."
fi
#!/bin/bash

# get the path to the db from the arguments

DB_PATH="$1"
DATA_SQL="$2"

sqlite3 "$DB_PATH" < "$DATA_SQL"
echo "Base de données peuplée avec des valeurs de test."


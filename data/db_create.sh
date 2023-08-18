path=$(pwd)
rm ${path}/database_linguistique.db
sqlite3 database_linguistique.db -cmd ".load ${path}/spellfix" ".read ${path}/db_dumb.sql"
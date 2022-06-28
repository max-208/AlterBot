# AlterBot
un bot discord simple pour le serveur discord AlterHis et uchronies

## Installation
assurez vous d'avoir la version 16.9 de node ou plus installée
assurez vous d'avoir npm d'installé
assurez vous d'avoir la version 3.6.19 de sqlite3 ou plus installée

créez et remplissez le fichier de configuration nommé .env
```
BOT_TOKEN=
GUILD_ID=
CLIENT_ID=
DEV_ENV=FALSE
RP_ROLE_MJ=
RP_SALON_MJ=
MOD_ROLE=
MOD_WARN_ROLE=
SALON_MEME=
```

installez les modules node nécéssaires
```
npm install
cd ./data
npm install
cd ..
```

créez la base de données (pour premier avril)
```
cd ./data
touch database.db
sqlite3 database.db
PRAGMA foreign_keys = ON;
.read tables.sql
.quit
cd ..
```

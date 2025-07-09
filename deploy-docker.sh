echo "Deploiement alterbot"
cd /mnt/tank/configs/alterbot/AlterBot
docker compose down alterbot
git pull origin main
mkdir config
touch config/config.json
docker compose up -d --no-deps --build alterbot
echo "Deploiement termine"

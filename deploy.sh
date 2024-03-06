echo "Deploiement alterbot"
pm2 stop alterbot
cd /home/ubuntu/AlterBot
git pull origin main
rm -rf node_modules package-lock.json
npm install
pm2 start index.js --name alterbot
echo "Deploiement termine"

echo "Deploiement alterbot"
sudo pm2 stop alterbot
cd /home/ubuntu/AlterBot
git pull origin main
sudo rm -rf node_modules package-lock.json
sudo npm install
sudo pm2 start index.js --name alterbot
echo "Deploiement termine"

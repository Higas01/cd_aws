set -e

echo " Atualizando código..."
git pull origin main

echo " Buildando backend..."
cd apps/backend
echo " Instalando dependências..."
npm ci
npm run build
cd ../..

echo " Reiniciando backend..."
pm2 describe backend > /dev/null \
  && pm2 reload backend \
  || pm2 start dist/app.js --name backend --cwd apps/backend


echo " Buildando frontend..."
cd apps/frontend
echo " Instalando dependências..."
npm ci
npm run build
cd ../..


echo " Reiniciando frontend..."

pm2 describe frontend > /dev/null \
  && pm2 reload frontend \
  || pm2 start "npm run start" --name frontend --cwd apps/frontend

echo " Recarregando Nginx..."
sudo nginx -t && sudo systemctl reload nginx

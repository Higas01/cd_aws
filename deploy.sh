set -e

echo " Atualizando código..."
git pull origin main

echo " Buildando frontend..."
cd apps/frontend
echo " Instalando dependências..."
pnpm install --frozen-lockfile
pnpm build
cd ../..

echo " Buildando backend..."
cd apps/backend
echo " Instalando dependências..."
pnpm install --frozen-lockfile
pnpm build
cd ../..

echo " Reiniciando aplicações..."

pm2 describe frontend > /dev/null \
  && pm2 reload frontend \
  || pm2 start "pnpm start" --name frontend --cwd apps/frontend

pm2 describe backend > /dev/null \
  && pm2 reload backend \
  || pm2 start dist/app.js --name backend --cwd apps/backend

echo " Recarregando Nginx..."
sudo nginx -t && sudo systemctl reload nginx

#!/data/data/com.termux/files/usr/bin/bash

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

# Detect local IP
IP=$(node -e "const os = require('os'); const nets = os.networkInterfaces(); for (const name of Object.keys(nets)) { for (const net of nets[name]) { if (net.family === 'IPv4' && !net.internal) { console.log(net.address); process.exit(0); } } } console.log('Desconhecido');")

echo "=================================================="
echo "           🚀 TIZENBREW INSTALLER (TERMUX)       "
echo "=================================================="
echo ""
echo "📱 IP do seu Celular nesta rede Wi-Fi: $IP"
echo ""
echo "📺 Na sua TV Samsung (Modo Desenvolvedor):"
echo "   1. Em 'Host PC IP', coloque o IP acima: $IP"
echo "   2. Reinicie a TV (segure Power no controle até o logo da Samsung)"
echo ""
echo "🌐 A interface abrirá automaticamente no navegador do celular:"
echo "   http://localhost:8091/ui/dist/index.html"
echo ""
echo "Pressione Ctrl+C para encerrar quando terminar."
echo "=================================================="
echo ""

(sleep 2 && termux-open-url "http://localhost:8091/ui/dist/index.html" 2>/dev/null) &

cd "$BASE_DIR/client/services/tizenbrew-installer-service"
exec node index.js

#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "=================================================="
echo "     📦 INSTALADOR TIZENBREW INSTALLER - TERMUX   "
echo "=================================================="
echo ""

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🔍 Verificando dependências básicas..."
if ! command -v node >/dev/null 2>&1; then
    echo "⚙️ Instalando Node.js..."
    pkg install nodejs -y
fi

if ! command -v git >/dev/null 2>&1; then
    echo "⚙️ Instalando Git..."
    pkg install git -y
fi

if ! command -v termux-open-url >/dev/null 2>&1; then
    echo "⚙️ Instalando termux-tools..."
    pkg install termux-tools -y
fi

echo "📦 Instalando dependências do serviço de instalação..."
cd "$BASE_DIR/client/services/tizenbrew-installer-service"
npm install --no-audit --no-fund

chmod +x "$BASE_DIR/iniciar-tizenbrew.sh"

echo ""
echo "=================================================="
echo "   ✅ INSTALAÇÃO CONCLUÍDA COM SUCESSO!           "
echo "=================================================="
echo ""
echo "Para iniciar o instalador a qualquer momento, execute:"
echo "   ./iniciar-tizenbrew.sh"
echo ""

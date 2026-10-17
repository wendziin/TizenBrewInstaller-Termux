# 📱 TizenBrew Installer para Android (Termux)

> Instale o **TizenBrew**, **TizenTube** e aplicativos personalizados (**`.wgt`** e **`.tpk`**) na sua Smart TV Samsung diretamente pelo celular Android, **sem precisar de um PC com Windows**!

Este repositório é uma versão adaptada e otimizada do [TizenBrewInstaller](https://github.com/reisxd/TizenBrewInstaller) oficial para rodar de forma leve, rápida e com diagnóstico completo diretamente no **Termux**.

---

## ✨ Recursos desta versão

- 📱 **100% no Celular:** Não depende de emuladores pesados ou de computador.
- 🚀 **Interface Pré-Compilada:** A interface web já vem pronta; você não precisa compilar nada ou baixar centenas de megabytes em dependências de desenvolvimento.
- 🔍 **Logs e Depuração em Tempo Real:** Captura os logs e erros do navegador no celular e do instalador da TV (`vd_appinstall`), exibindo tudo na tela do Termux com porcentagem de envio do arquivo.
- 🌐 **Detecção Automática de IP:** O script detecta automaticamente o IP local do seu celular na rede Wi-Fi e abre o navegador sozinho.
- 📦 **Suporte a `.wgt` e `.tpk`:** Instale tanto aplicativos Web quanto binários nativos C/SDL2 (como o **Nuvio Legacy**).

---

## 📋 Pré-requisitos

1. **Celular com Android** e o aplicativo [Termux](https://f-droid.org/pt_BR/packages/com.termux/) instalado (preferencialmente a versão do F-Droid / GitHub).
2. **Smart TV Samsung** (com Tizen OS 3.0 ou superior, lançadas de 2017 em diante).
3. **Mesma Rede:** O celular e a TV devem estar conectados na **mesma rede Wi-Fi**.

---

## ⚡ Instalação Rápida (1 Comando)

Abra o seu Termux e cole o comando abaixo:

```bash
pkg update && pkg install git -y && git clone https://github.com/wendziin/TizenBrewInstaller-Termux.git && cd TizenBrewInstaller-Termux && ./instalar.sh
```

O script cuidará de verificar o Node.js, instalar as dependências necessárias e deixar tudo pronto para uso.

---

## 🚀 Como Usar (Passo a Passo)

### 1. Iniciar o Servidor no Celular

Dentro da pasta do projeto no Termux, execute:

```bash
./iniciar-tizenbrew.sh
```

O script mostrará na tela o **IP do seu celular** e abrirá o navegador no endereço:
`http://localhost:8091/ui/dist/index.html`

---

### 2. Configurar o Modo Desenvolvedor na TV Samsung

1. Ligue sua TV Samsung e acesse a aba de **Apps**.
2. No controle remoto físico (ou no teclado numérico do app SmartThings), digite a sequência:
   **`1 2 3 4 5`**
3. Na janela que se abrir:
   - Ative a opção **Developer Mode** para **ON**.
   - No campo **Host PC IP**, digite o **IP do seu celular** (mostrado na tela do Termux, ex: `192.168.0.3`).
4. **Reinicie a TV:** Segure o botão de **Power** do controle remoto por cerca de 5 segundos até a TV apagar e religar exibindo o logo da Samsung.

---

### 3. Conectar e Instalar o Aplicativo

1. No navegador do seu celular (onde a página do instalador foi aberta):
2. Digite o **endereço IP da sua TV Samsung** no campo indicado (você encontra o IP da TV em: *Configurações da TV > Geral > Rede > Status da Rede > Configurações de IP*).
3. Toque no botão **Connect to TV**.
4. Assim que a conexão for confirmada:
   - Para instalar o **TizenBrew oficial**: clique no botão correspondente.
   - Para instalar um arquivo que você baixou no celular (ex: `Nuvio-*-NuvioTpk60.tpk` ou qualquer `.wgt`): toque no botão **"Select to install"** e escolha o arquivo nos seus downloads.
5. Acompanhe a barra e os logs de envio no Termux até a mensagem de sucesso!

---

### 4. Finalização

1. Volte na TV, abra o menu de desenvolvedor (`1 2 3 4 5`).
2. Altere o **Host PC IP** de volta para `127.0.0.1` e reinicie a TV novamente.
3. No Termux, pressione `Ctrl + C` para encerrar o servidor.

---

## 💡 Dica para Aplicativos Nativos (.tpk)

Se você for instalar aplicativos em formato **`.tpk`** (como o **Nuvio Legacy**), atente-se para baixar a versão exata do Tizen da sua TV:

| TV Samsung (Exemplos) | Ano | Versão do Tizen | Pacote Correto |
|---|---|---|---|
| AU7000, AU7700, AU8000, Q60A, Q70A | 2021 | **Tizen 6.0** | `*NuvioTpk60.tpk` |
| BU8000, Q60B, S95B | 2022 | **Tizen 6.5** | `*NuvioTpk65.tpk` |
| RU7100, Q60R | 2019 | **Tizen 5.0** | `*NuvioTpk40.tpk` |
| NU7100 | 2018 | **Tizen 4.0** | `*NuvioTpk40.tpk` |
| CU7700, CU8000, S90C | 2023 | **Tizen 7.0** | `*NuvioTpk65.tpk` / `.wgt` |

*(Arquivos **`.wgt`** funcionam universalmente em todas as versões).*

---

## 🛠️ Solução de Problemas

- **Erro `ECONNREFUSED` no Termux:**  
  A TV recusou a conexão. Verifique se o Host PC IP na TV está exatamente igual ao IP do celular, se ambos estão no mesmo Wi-Fi (desative dados móveis se necessário) e certifique-se de que reiniciou a TV segurando o botão Power.
- **TV não abre o menu ao digitar 12345:**  
  Certifique-se de estar exatamente dentro da aba **Apps** da TV antes de digitar os números.

---

## 🤝 Créditos e Agradecimentos

- Projeto base original: [reisxd/TizenBrewInstaller](https://github.com/reisxd/TizenBrewInstaller) por [@reisxd](https://github.com/reisxd).
- Adaptação, empacotamento para Termux e sistema de logs em tempo real por [@wendziin](https://github.com/wendziin).

---

## 📄 Licença

Distribuído sob a licença **GPL-3.0**. Consulte o arquivo `LICENSE` para mais detalhes.

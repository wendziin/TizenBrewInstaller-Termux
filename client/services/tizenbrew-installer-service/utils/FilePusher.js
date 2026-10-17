const AdbPacket = require('adbhost/lib/packet.js');
const commands = AdbPacket.commands;

module.exports = function (adb, filePath, data, cb) {
    const totalBytes = data.length;
    console.log(`[TV PUSH] 📤 Preparando envio de ${filePath} (${(totalBytes / (1024 * 1024)).toFixed(2)} MB)...`);
    const shell = adb.createStream('sync:');
    
    const interval = setInterval(() => {
        if (shell._remoteId === -1) return;
        clearInterval(interval);

        const statBuffer = Buffer.alloc ? Buffer.alloc(8) : new Buffer(8);
        statBuffer.write('STAT', 0);
        statBuffer.writeUInt32LE(filePath.length, 4);
        adb._writePacket(commands.WRTE, shell._localId, shell._remoteId, statBuffer);

        adb._writePacket(commands.WRTE, shell._localId, shell._remoteId, Buffer.from ? Buffer.from(filePath) : new Buffer(filePath));

        const sendBuffer = Buffer.alloc ? Buffer.alloc(8) : new Buffer(8);
        sendBuffer.writeUInt32LE(0x444E4553, 0);
        sendBuffer.writeUInt32LE(filePath.length + 6, 4);
        adb._writePacket(commands.WRTE, shell._localId, shell._remoteId, sendBuffer);

        adb._writePacket(commands.WRTE, shell._localId, shell._remoteId, Buffer.from ? Buffer.from(`${filePath},33261`) : new Buffer(`${filePath},33261`));

        let lastPercent = -1;
        function updateProgress(sent) {
            const pct = Math.floor((sent / totalBytes) * 100);
            if (pct % 25 === 0 && pct !== lastPercent) {
                lastPercent = pct;
                console.log(`[TV PUSH] ⏳ Enviando pacote: ${pct}% (${(sent / (1024 * 1024)).toFixed(1)} de ${(totalBytes / (1024 * 1024)).toFixed(1)} MB)`);
            }
        }

        if (data.length > 1420) {
            let sent = 0;
            const chunk = data.slice(0, 1420);
            const buffer = Buffer.alloc ? Buffer.alloc(8 + chunk.length) : new Buffer(8 + chunk.length);
            buffer.write('DATA');
            buffer.writeUInt32LE(chunk.length, 4);
            chunk.copy(buffer, 8);
            adb._writePacket(commands.WRTE, shell._localId, shell._remoteId, buffer);
            sent += chunk.length;

            for (let i = 1420; i < data.length; i += 1420) {
                const chunk = data.slice(i, i + 1420);
                const buffer = Buffer.alloc ? Buffer.alloc(8 + chunk.length) : new Buffer(8 + chunk.length);
                buffer.write('DATA');
                buffer.writeUInt32LE(chunk.length, 4);
                chunk.copy(buffer, 8);
                adb._writePacket(commands.WRTE, shell._localId, shell._remoteId, buffer);
                sent += chunk.length;
                updateProgress(sent);
            }
        } else {
            const buffer = Buffer.alloc ? Buffer.alloc(8 + data.length) : new Buffer(8 + data.length);
            buffer.write('DATA');
            buffer.writeUInt32LE(data.length, 4);
            data.copy(buffer, 8);
            adb._writePacket(commands.WRTE, shell._localId, shell._remoteId, buffer);
        }

        const doneData = Buffer.alloc ? Buffer.alloc(8) : new Buffer(8);
        doneData.write('DONE');
        doneData.writeUInt32LE(0x15f2b865, 4);
        adb._writePacket(commands.WRTE, shell._localId, shell._remoteId, doneData);

        const quitData = Buffer.alloc ? Buffer.alloc(8) : new Buffer(8);
        quitData.write('QUIT');
        adb._writePacket(commands.WRTE, shell._localId, shell._remoteId, quitData);
        console.log(`[TV PUSH] ✅ Envio do arquivo concluído com sucesso (100%)!`);
        cb();
    }, 500);
};
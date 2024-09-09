const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// クライアントに静的ファイルを提供
app.use(express.static('public'));

// ソケット接続
io.on('connection', (socket) => {
    console.log('新しいプレイヤーが接続しました');

    // クライアントからの「move」イベントをリッスン
    socket.on('move', (data) => {
        // 全クライアントに対してイベントをブロードキャスト
        socket.broadcast.emit('move', data);
    });

    socket.on('disconnect', () => {
        console.log('プレイヤーが切断しました');
    });
});

// Renderで動作するため、PORTを環境変数で取得
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました`);
});

const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

// DB 설정
const adapter = new FileSync('db.json');
const db = low(adapter);

//기본 구조 설정
db.defaults({ users: [] }).write();

// 미들웨어
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 로그인 처리
app.post('/login', (req, res) => {
  const { username } = req.body;
  let user = db.get('users').find({ username }).value();

  if (!user) {
    db.get('users').push({ username, clicks: 0 }).write();
  }

  res.status(200).send({ success: true });
});

// 클릭 처리
app.post('/click', (req, res) => {
  const { username } = req.body;
  const user = db.get('users').find({ username }).value();

  if (!user) return res.status(400).send({ error: 'User not found' });

  const newClicks = user.clicks + 1;
  db.get('users').find({ username }).assign({ clicks: newClicks }).write();

  // 모든 클라이언트에 업데이트 전송
  io.emit('updateLeaderboard', db.get('users').value());

  res.send({ clicks: newClicks });
});

// Socket.IO 연결
io.on('connection', (socket) => {
  console.log('새 클라이언트 연결');

  // 현재 리더보드 전송
  socket.emit('updateLeaderboard', db.get('users').value());

  socket.on('disconnect', () => {
    console.log('클라이언트 연결 해제');
  });
});

// 서버 시작
server.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
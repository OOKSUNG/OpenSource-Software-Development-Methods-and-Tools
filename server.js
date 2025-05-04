const express = require('express');
const { Low, JSONFile } = require('lowdb');
const path = require('path');

// 데이터베이스 설정
const db = new Low(new JSONFile('db.json'));

// express 설정
const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // JSON 요청을 파싱

// 데이터베이스 초기화
async function initDB() {
  await db.read();
  db.data ||= { users: [] };
}
initDB();

// 홈 페이지
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 회원가입 처리
app.post('/signup', async (req, res) => {
  const { username } = req.body;

  // 이미 존재하는 사용자 확인
  const userExists = db.data.users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
  }

  // 새로운 사용자 추가
  db.data.users.push({ username, clicks: 0 });
  await db.write();
  res.status(200).json({ message: '회원가입 성공!' });
});

// 로그인 처리
app.post('/login', async (req, res) => {
  const { username } = req.body;

  // 사용자 확인
  const user = db.data.users.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
  }

  res.status(200).json({ message: '로그인 성공!', username });
});

// 버튼 클릭 처리
app.post('/click', async (req, res) => {
  const { username } = req.body;

  // 사용자 확인
  const user = db.data.users.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
  }

  // 클릭 수 증가
  user.clicks += 1;
  await db.write();

  res.status(200).json({ message: '클릭 성공!', clicks: user.clicks });
});

// 리더보드 조회
app.get('/leaderboard', (req, res) => {
  // 클릭 수 기준으로 내림차순 정렬
  const leaderboard = db.data.users.sort((a, b) => b.clicks - a.clicks);
  res.json(leaderboard);
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
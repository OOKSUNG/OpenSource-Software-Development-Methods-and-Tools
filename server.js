const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Express 초기화
const app = express();

// MongoDB 연결 (로컬 MongoDB 사용 시)
mongoose.connect('mongodb://localhost:27017/userClicks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB에 연결되었습니다.');
}).catch((err) => {
  console.error('MongoDB 연결 실패:', err);
});

// 사용자 클릭 데이터 모델
const clickSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 }
});

const Click = mongoose.model('Click', clickSchema);

// Express 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// 이름 입력 페이지 (GET /)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 메인 페이지 (GET /main)
app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// 클릭 수 업데이트 (POST /update)
app.post('/update', async (req, res) => {
  const { username } = req.body;

  try {
    let user = await Click.findOne({ username });

    // 사용자 없는 경우 새로 생성
    if (!user) {
      user = new Click({ username, clicks: 0 });
    }

    user.clicks += 1;  // 클릭 수 증가
    await user.save();

    res.send({ status: 'success', clicks: user.clicks });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: 'error', message: '서버 오류' });
  }
});

// 서버 실행
app.listen(3000, () => {
  console.log('서버 실행 중: http://localhost:3000');
});
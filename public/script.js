const socket = io();

// 리더보드 영역 업데이트
socket.on('updateLeaderboard', (users) => {
  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = '';

  users
    .sort((a, b) => b.clicks - a.clicks)
    .forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.username}: ${user.clicks}`;
      leaderboard.appendChild(li);
    });
});
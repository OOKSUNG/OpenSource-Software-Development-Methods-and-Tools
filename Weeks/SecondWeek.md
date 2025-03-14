## 2주차 - Node.js 설치 -
2주차에는 간단한 웹서버를 만들어 같은 네트워크의 다른 컴퓨터에서 웹페이지에 접속해 볼 것 입니다.

우선 Node.js와 npm을 설치합니다.

```
sudo apt update
sudo apt install nodejs npm
```
sudo 명령어와 apt에 대한 설명은 아래를 참조합니다.

[sudo에 대한 정리](https://velog.io/@akfvh/sudoApt-vduqb7mk)

[apt에 대한 정리](https://velog.io/@tmxkdyd11/Linux%EC%9D%98-apt-%EB%AA%85%EB%A0%B9%EC%96%B4-%EC%A0%95%EB%A6%AC-%EB%A6%AC%EB%88%85%EC%8A%A4-%ED%8C%A8%ED%82%A4%EC%A7%80%EC%99%80-%ED%8C%A8%ED%82%A4%EC%A7%80-%EB%A7%A4%EB%8B%88%EC%A0%80)

sudo apt update는 apt의 설치 가능한 패키지 리스트를 최신화 하는것입니다.(upgrade와는 다릅니다.)

다음 sudo apt install nodejs npm을 입력해 node.js와 npm을 설치해줍니다.

npm은 Node.js의 패키지 매니저입니다.

```
nodejs -v
npm -v
```

위 명령어로 Node.js와 npm의 버전을 확인합니다.

이제 서버를 동작시킬 파일의 폴더를 만들겠습니다.

```
mkdir myserver
cd myserver
```

mkdir는 디렉토리를 만드는 명령어입니다.

cd는 change directory의 약자로 디렉토리 이동 명령어 입니다.

myserver 디렉토리 안에 서버를 동작시킬 js파일을 만듭니다.

```
nano server.js
```

nano는 CLI 에서 파일을 수정, 저장하게 해줍니다.

server.js에 아래와 같은 코드를 작성하고 저장합니다.

```
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Node.js Server!\n');
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
});
```
위 코드는 3000번 포트를 통해 다른 컴퓨터가 접속하도록 하며 접속시 'Hello, Node.js Server!\n'이라는 응답을 합니다.

다른 컴퓨터에서 서버에 접속하려면 3000번 포트를 열어줘야합니다.

```
sudo ufw allow 3000/tcp
sudo ufw reload
```
ufw는 우분투 방화벽입니다.

ufw는 기본적으로 들어오는 트래픽을 차단하고 나가는 트래픽은 허용합니다.

그래서 들어노는 트래픽을 허용해줘야합니다.

sudo ufw allow 3000/tcp는 3000번 포트로 들어오는 연결을 허용한다는 뜻입니다.

```
sudo ufw status
```
위 명령어로 3000번 포트가 열려있는지 확인합니다.
```
상태 : 활성

목적                    동작        출발
--                    --        --
3000/tcp              ALLOW     Anywhere
3000/tcp (v6)         ALLOW     Anywhere (v6)   
```
위 출력의 동작 부분이 ALLOW이면 3000번 포트가 열려있는 겁니다.]

이제 myserver 디렉토리로 이동해 서버를 실행해줍니다.
```
cd myserver
node server.js
```
node는 파일을 실행시키는 명령어 입니다.

이제 같은 네트워크의 다른 기기에서 서버에 접속 가능합니다.

```
hostname -I
```
위 명령어로 현재 우분투의 ip주소를 알 수 있습니다.

192.168.x.x 형식의 ip가 나옵니다.

이제 다른 기기의 웹브라우저에 http://192.168.x.x:3000을 입력합니다.

![image](./Photo/스크린샷 2025-03-12 134844.png)




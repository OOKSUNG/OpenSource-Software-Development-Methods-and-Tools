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

server.js에 아래와 같은 코드를 작성합니다.

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
위 코드를 설명하겠습니다.

const http = require('http');

Node.js의 내장 http 모듈을 불러옵니다.

웹 서버를 만들 때 http 모듈을 사용하면 **요청(req)과 응답(res)**을 처리할 수 있습니다.

javascript
복사
편집
```
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Node.js Server!\n');
});
http.createServer((req, res) => { ... })
```
요청(req)이 오면 실행되는 콜백 함수

req: 클라이언트 요청 정보 (예: 브라우저에서 요청한 URL, 헤더 등)

res: 서버에서 클라이언트로 보내는 응답 객체
```
res.writeHead(200, { 'Content-Type': 'text/plain' });
```
응답의 HTTP 상태 코드(200 OK)와 **헤더(Content-Type: text/plain)`를 설정

브라우저가 이 응답을 일반 텍스트로 인식하도록 함
```
res.end('Hello, Node.js Server!\n');
```
클라이언트에게 "Hello, Node.js Server!\n"라는 메시지를 보내고 응답 종료

javascript
복사
편집
```
const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
});
server.listen(PORT, '0.0.0.0', callback)
```

서버가 3000번 포트에서 실행되도록 설정

'0.0.0.0'은 모든 네트워크 인터페이스(로컬 및 외부)에서 접속 가능

**만약 '127.0.0.1'**로 하면 localhost에서만 접속 가능

서버 실행 후 실행될 콜백 함수

터미널에 Server is running at http://0.0.0.0:3000 메시지 출력





curl 설치
curl은 client url의 약자
공유기의 공인 ip(외부 ip)를 확인하기 위해 설치
sudo apt install curl로 설치



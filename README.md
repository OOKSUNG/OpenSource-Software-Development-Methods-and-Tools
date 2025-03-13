
# OpenSource-Software-Development-Methods-and-Tools
이 저장소는 오픈소스 소프트웨어 개발방법 및 도구 강의의 강의 내용과 리눅스 한 학기 살기 프로젝트의 진행 상황을 기록합니다.
## 리눅스 한 학기 살기
리눅스 한 학기 살기 프로젝트는 13주간 진행되는 프로젝트 입니다.

원하는 리눅스를 설치한 뒤 11개의 프로그램을 내려받고 그에대한 보고서를 작성합니다.

이 프로젝트는 양식 없는 자유 프로젝트입니다.

따라서 저는 이번 프로젝트의 목표를 리눅스를 통해 홈서버를 구축하고 웹페이지 혹은 게임을 호스팅하는 것으로 설정했습니다.

## [1주차 - 신성한 리눅스 설치 -](./First_week.md)
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




curl 설치
curl은 client url의 약자
공유기의 공인 ip(외부 ip)를 확인하기 위해 설치
sudo apt install curl로 설치



다음주에는 외부 네트워크에서 웹페이지에 접속할 수 있도록 해보겠습니다.

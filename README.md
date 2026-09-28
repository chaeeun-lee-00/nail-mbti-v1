# 내 네일 취향, 몇 대 몇?

파츠(Patz) 유입을 목표로 한 모바일 우선 멘헤라력 vs 모에력 네일 취향 테스트 프로토타입입니다.

## 가장 쉬운 실행 방법 (Mac)

압축을 해제한 폴더 안의 `start-mac.command`를 더블클릭합니다. 사용 중이 아닌 포트를 자동으로 찾아 브라우저를 엽니다. 처음 실행할 때 macOS가 막으면 파일을 우클릭한 뒤 **열기**를 선택합니다.

서버 없이 `index.html`을 더블클릭해도 테스트는 작동합니다. 다만 공유·클립보드처럼 브라우저 보안의 영향을 받는 기능까지 확인하려면 위 실행 파일을 권장합니다.

## 터미널에서 실행

Python이 설치된 환경에서 프로젝트 폴더로 이동한 뒤 실행합니다.

```bash
cd ~/Downloads/patz-nail-quiz-prototype-v1
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173`을 엽니다. `Directory listing for /`가 보인다면 서버를 프로젝트 폴더가 아닌 다른 폴더에서 실행한 것이므로, 서버를 종료하고 위 `cd` 명령부터 다시 실행합니다.

## 현재 포함된 기능

- 커버, 닉네임, 8개 문항, 분석 로딩, 결과 화면
- 복수 선택, 순위 선택, 네일 조합, 동적 최종 선택
- 멘헤라력·모에력 독립 점수
- 저장 취향과 실착 취향 차이에 따른 봉인형·본체형·폭주형
- 9개 결과 캐릭터
- Web Share API 및 결과 복사
- 모바일/데스크톱 반응형 UI

## 실제 그래픽 연결

네일 선택 카드에는 `assets/nails`의 N01부터 N12까지 WebP 이미지가 연결되어 있습니다. 점수 로직은 이미지와 분리되어 있습니다.

파츠 앱 CTA는 현재 안내 메시지만 표시합니다. 실제 배포 시 앱 딥링크 또는 스토어 주소로 교체해야 합니다.


## Production: patz.kr/nail-mbti

This repository remains a standalone static Vercel project at
`https://patz-nail-mbti.vercel.app`. The official site's Next.js rewrite forwards
`/nail-mbti` and everything below it to this project. No repository merge is needed.
The conditional base URL keeps styles, scripts, and images working with or without
an ending slash, while preserving root-domain and local-file use.

### Analytics and deployment

1. In Vercel, open the **patz-nail-mbti** project's **Analytics** and enable Web Analytics.
2. Deploy this repository, then deploy the routing change in patz-official-web.
3. Visit `https://patz.kr/nail-mbti` and confirm
   `/nail-mbti/_vercel/insights/script.js` loads and collection requests succeed.
4. Check visitors and page views in the nail project's Analytics dashboard.

`analytics.js` uses Vercel's supported `/_vercel/insights` endpoint, with the
mounted prefix for both the script and collection. Tracking only runs on HTTPS.
URL query strings and hashes are removed before sending; nicknames and quiz
answers are not sent. Custom events are not configured.
Analytics blockers can prevent collection without affecting the quiz.

The existing html2canvas 1.4.1 library is vendored in `assets/vendor` (MIT license
notice retained) so image saving complies with the official site's script policy.

### Vercel project ownership

The production project is `patz-nail-mbti` in `soarhigh03s-projects`.
The original `nail-mbti-v1.vercel.app` deployment is unchanged.
Deployment currently uses the Vercel CLI because the account’s Vercel GitHub
integration does not have access to `chaeeun-lee-00/nail-mbti-v1`.
To enable deployments on push, grant the Vercel GitHub app access to that
repository and connect it in this project's Settings → Git.

For manual releases from this repository:

```bash
npx vercel link --project patz-nail-mbti --scope soarhigh03s-projects
npx vercel deploy --prod --scope soarhigh03s-projects
```

`patz.kr` follows the main site's existing redirect to `www.patz.kr`.

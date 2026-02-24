# Google Sheets 연동 설정 가이드

## 1. Google 스프레드시트 생성

1. [Google Sheets](https://sheets.google.com)에 접속
2. **빈 스프레드시트** 생성
3. 첫 번째 행(헤더)에 다음 컬럼 입력:
   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | 타임스탬프 | 이름 | 연락처 | 예약일 | 관심평형 | 문의사항 |

## 2. Google Apps Script 설정

1. 스프레드시트 메뉴에서 **확장 프로그램 → Apps Script** 클릭
2. 기본 코드를 삭제하고 아래 코드 붙여넣기:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),           // 타임스탬프
      data.name,            // 이름
      data.phone,           // 연락처
      data.date,            // 예약일
      data.size || '',      // 관심평형
      data.message || ''    // 문의사항
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Ctrl+S**로 저장 (프로젝트 이름: "아파트 예약 시스템")

## 3. 웹 앱으로 배포

1. **배포 → 새 배포** 클릭
2. 유형 선택: **웹 앱**
3. 설정:
   - **설명**: 아파트 상담 예약 폼
   - **실행 계정**: 나
   - **액세스 권한**: **모든 사용자** (익명 포함)
4. **배포** 클릭
5. **URL 복사** (예: `https://script.google.com/macros/s/AKfyc.../exec`)

## 4. 환경 변수 설정

프로젝트 루트의 `.env.local` 파일을 수정:

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

위의 `YOUR_SCRIPT_ID` 부분을 3번에서 복사한 URL로 교체합니다.

## 5. Vercel 배포 시 환경 변수

Vercel 대시보드에서:
1. **Settings → Environment Variables**
2. `GOOGLE_SCRIPT_URL` 추가
3. Value에 Apps Script URL 붙여넣기

## 6. 테스트

1. `npm run dev`로 로컬 서버 실행
2. 폼 작성 후 제출
3. Google Sheets에서 새 행 추가 확인

## 주의사항

- Apps Script 무료 할당량: 하루 약 20,000건 요청
- CORS 이슈 없음 (Next.js API Route를 프록시로 사용)
- 스프레드시트 공유 설정과 무관하게 작동

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 진월 더리브 라포레",
  description: "개인정보처리방침 안내 페이지입니다.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-[1320px] mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            홈으로 돌아가기
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-[28px] tablet:text-[36px] font-bold text-gray-900 tracking-[-1px] mb-4">
          개인정보처리방침
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          시행일자: 2026년 2월 25일
        </p>

        <div className="space-y-10 text-[15px] font-light text-gray-700 leading-relaxed">
          {/* 제1조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제1조 (개인정보의 처리 목적)
            </h2>
            <p>
              본 사이트(이하 &ldquo;회사&rdquo;)는 다음의 목적을 위하여
              개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
              용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는
              개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를
              이행할 예정입니다.
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>방문상담 예약 접수 및 상담 안내 연락</li>
              <li>분양 관련 정보, 프로모션 및 이벤트 안내</li>
            </ul>
          </section>

          {/* 제2조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제2조 (처리하는 개인정보 항목)
            </h2>
            <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-800">
                      구분
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-800">
                      수집 항목
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-800">
                      수집 방법
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">필수</td>
                    <td className="border border-gray-200 px-4 py-2">
                      이름, 연락처, 방문예약일
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      홈페이지 예약 양식
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">선택</td>
                    <td className="border border-gray-200 px-4 py-2">
                      관심 평형, 문의사항
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      홈페이지 예약 양식
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 제3조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제3조 (개인정보의 처리 및 보유 기간)
            </h2>
            <p>
              회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터
              개인정보를 수집 시에 동의받은 개인정보 보유·이용 기간 내에서
              개인정보를 처리·보유합니다.
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>
                <strong className="font-medium text-gray-800">
                  방문상담 예약 정보:
                </strong>{" "}
                상담 완료 후 30일 이내 파기
              </li>
              <li>
                <strong className="font-medium text-gray-800">
                  마케팅 수신 동의 정보:
                </strong>{" "}
                동의 철회 시까지
              </li>
            </ul>
          </section>

          {/* 제4조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제4조 (개인정보의 제3자 제공)
            </h2>
            <p>
              회사는 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만
              처리하며, 정보주체의 동의, 법률의 특별한 규정 등
              개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를
              제3자에게 제공합니다.
            </p>
            <p className="mt-2">
              현재 개인정보를 제3자에게 제공하고 있지 않습니다.
            </p>
          </section>

          {/* 제5조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제5조 (개인정보처리의 위탁)
            </h2>
            <p>
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
              처리업무를 위탁하고 있습니다.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-800">
                      수탁업체
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-800">
                      위탁 업무
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">
                      Google LLC
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      예약 데이터 저장 (Google Sheets)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 제6조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제6조 (정보주체의 권리·의무 및 행사방법)
            </h2>
            <p>정보주체는 회사에 대해 언제든지 다음의 권리를 행사할 수 있습니다.</p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
            <p className="mt-3">
              위 권리 행사는 이메일(sunghagod@gmail.com)을 통해 하실 수 있으며,
              회사는 이에 대해 지체 없이 조치하겠습니다.
            </p>
          </section>

          {/* 제7조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제7조 (개인정보의 파기 절차 및 방법)
            </h2>
            <p>
              회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가
              불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>
                <strong className="font-medium text-gray-800">
                  파기 절차:
                </strong>{" "}
                불필요한 개인정보는 개인정보 보호책임자의 승인을 받아 파기합니다.
              </li>
              <li>
                <strong className="font-medium text-gray-800">
                  파기 방법:
                </strong>{" "}
                전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을
                사용하여 삭제합니다.
              </li>
            </ul>
          </section>

          {/* 제8조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제8조 (개인정보의 안전성 확보 조치)
            </h2>
            <p>
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
              있습니다.
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>개인정보 접근 권한 제한</li>
              <li>개인정보의 암호화 (HTTPS 통신)</li>
              <li>접속기록의 보관 및 위·변조 방지</li>
            </ul>
          </section>

          {/* 제9조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제9조 (개인정보 보호책임자)
            </h2>
            <p>
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
              관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이
              개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="mt-3 p-4 bg-gray-50 border border-gray-200 text-sm">
              <p>
                <strong className="font-medium text-gray-800">
                  개인정보 보호책임자
                </strong>
              </p>
              <p className="mt-1">성명: 김성하</p>
              <p>직위: 대표</p>
              <p>연락처: sunghagod@gmail.com</p>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에
              문의하시기 바랍니다.
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-500">
              <li>
                개인정보침해신고센터 (한국인터넷진흥원): 118,{" "}
                <span className="underline">privacy.kisa.or.kr</span>
              </li>
              <li>
                개인정보 분쟁조정위원회: 1833-6972,{" "}
                <span className="underline">kopico.go.kr</span>
              </li>
              <li>
                대검찰청 사이버수사과: 1301,{" "}
                <span className="underline">spo.go.kr</span>
              </li>
              <li>
                경찰청 사이버안전국: 182,{" "}
                <span className="underline">cyberbureau.police.go.kr</span>
              </li>
            </ul>
          </section>

          {/* 제10조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제10조 (개인정보 처리방침의 변경)
            </h2>
            <p>
              이 개인정보처리방침은 2026년 2월 25일부터 적용됩니다. 이전의
              개인정보처리방침은 아래에서 확인하실 수 있습니다.
            </p>
            <p className="mt-2">변경 이력: 해당 없음 (최초 시행)</p>
          </section>
        </div>
      </main>
    </div>
  );
}

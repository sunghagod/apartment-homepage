import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관 | 진월 더리브 라포레",
  description: "서비스 이용약관 안내 페이지입니다.",
};

export default function TermsPage() {
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
          이용약관
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          시행일자: 2026년 2월 25일
        </p>

        <div className="space-y-10 text-[15px] font-light text-gray-700 leading-relaxed">
          {/* 제1조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제1조 (목적)
            </h2>
            <p>
              이 약관은 Brand Apartment(이하 &ldquo;회사&rdquo;)가 운영하는
              웹사이트(이하 &ldquo;사이트&rdquo;)에서 제공하는 방문상담 예약
              서비스(이하 &ldquo;서비스&rdquo;)의 이용 조건 및 절차, 회사와
              이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          {/* 제2조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제2조 (용어의 정의)
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong className="font-medium text-gray-800">
                  &ldquo;사이트&rdquo;
                </strong>
                란 회사가 서비스를 제공하기 위하여 운영하는 인터넷 웹사이트를
                말합니다.
              </li>
              <li>
                <strong className="font-medium text-gray-800">
                  &ldquo;이용자&rdquo;
                </strong>
                란 사이트에 접속하여 이 약관에 따라 서비스를 이용하는 자를
                말합니다.
              </li>
              <li>
                <strong className="font-medium text-gray-800">
                  &ldquo;서비스&rdquo;
                </strong>
                란 사이트를 통해 제공되는 방문상담 예약, 분양정보 제공 등 일체의
                서비스를 말합니다.
              </li>
            </ul>
          </section>

          {/* 제3조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제3조 (약관의 게시와 개정)
            </h2>
            <ul className="space-y-2 list-decimal list-inside">
              <li>
                회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 사이트 내에
                게시합니다.
              </li>
              <li>
                회사는 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수
                있습니다.
              </li>
              <li>
                약관이 개정되는 경우 회사는 개정 내용과 적용일자를 명시하여
                사이트에 적용일자 7일 전부터 공지합니다.
              </li>
              <li>
                이용자가 개정약관의 적용에 동의하지 않는 경우, 서비스 이용을
                중단할 수 있습니다.
              </li>
            </ul>
          </section>

          {/* 제4조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제4조 (서비스의 내용)
            </h2>
            <p>회사가 제공하는 서비스의 내용은 다음과 같습니다.</p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>아파트 분양 관련 정보 제공</li>
              <li>방문상담 예약 접수</li>
              <li>평형별 정보 안내</li>
              <li>기타 회사가 정하는 서비스</li>
            </ul>
          </section>

          {/* 제5조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제5조 (서비스의 제공 및 변경)
            </h2>
            <ul className="space-y-2 list-decimal list-inside">
              <li>
                회사는 서비스를 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.
              </li>
              <li>
                회사는 시스템 점검, 교체 및 고장, 통신 두절 또는 운영상 상당한
                이유가 있는 경우 서비스의 제공을 일시적으로 중단할 수 있습니다.
              </li>
              <li>
                회사는 서비스의 내용을 변경하는 경우, 변경 내용을 사이트에
                공지합니다.
              </li>
            </ul>
          </section>

          {/* 제6조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제6조 (이용자의 의무)
            </h2>
            <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>허위 정보를 입력하여 예약을 신청하는 행위</li>
              <li>타인의 개인정보를 도용하는 행위</li>
              <li>
                사이트의 정상적인 운영을 방해하거나 시스템에 부하를 주는 행위
              </li>
              <li>회사의 지적재산권을 침해하는 행위</li>
              <li>기타 관계 법령에 위반되는 행위</li>
            </ul>
          </section>

          {/* 제7조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제7조 (지적재산권)
            </h2>
            <ul className="space-y-2 list-decimal list-inside">
              <li>
                사이트에 게시된 모든 콘텐츠(텍스트, 이미지, 디자인, 로고 등)에
                대한 저작권 및 지적재산권은 회사에 귀속됩니다.
              </li>
              <li>
                이용자는 사이트의 콘텐츠를 회사의 사전 서면 동의 없이 복제, 배포,
                전시, 전송, 2차적 저작물 작성 등의 방법으로 이용할 수 없습니다.
              </li>
            </ul>
          </section>

          {/* 제8조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제8조 (면책조항)
            </h2>
            <ul className="space-y-2 list-decimal list-inside">
              <li>
                회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등
                불가항력적인 사유로 서비스를 제공할 수 없는 경우에는 책임이
                면제됩니다.
              </li>
              <li>
                사이트에 게시된 분양 정보는 참고용이며, 실제 분양 조건과 차이가
                있을 수 있습니다. 정확한 내용은 모델하우스 방문 상담을 통해
                확인하시기 바랍니다.
              </li>
              <li>
                회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을
                지지 않습니다.
              </li>
            </ul>
          </section>

          {/* 제9조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              제9조 (분쟁해결)
            </h2>
            <ul className="space-y-2 list-decimal list-inside">
              <li>
                회사와 이용자 간에 발생한 분쟁에 대하여는 대한민국 법을
                적용합니다.
              </li>
              <li>
                서비스 이용으로 발생한 분쟁에 대한 소송은 회사의 본사 소재지를
                관할하는 법원을 관할 법원으로 합니다.
              </li>
            </ul>
          </section>

          {/* 부칙 */}
          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-3">부칙</h2>
            <p>
              이 약관은 2026년 2월 25일부터 시행합니다.
            </p>
            <p className="mt-2">변경 이력: 해당 없음 (최초 시행)</p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-500 font-light text-base py-16">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="flex flex-col tablet:flex-row justify-between gap-10">
          {/* Company Info */}
          <div className="flex-1">
            <h4 className="text-white text-lg font-bold tracking-[-0.5px] mb-4">
              BRAND APARTMENT
            </h4>
            <div className="space-y-2 text-sm leading-relaxed">
              <p>서울특별시 강남구 테헤란로 123</p>
              <p>대표전화: 1588-0000</p>
              <p>사업자등록번호: 123-45-67890</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex-1">
            <h4 className="text-white text-base font-medium tracking-[-0.5px] mb-4">
              고객 서비스
            </h4>
            <nav className="space-y-2 text-sm">
              <a
                href="#reservation"
                className="block text-gray-500 transition-colors duration-300 hover:text-white"
              >
                방문상담 예약
              </a>
              <a
                href="#features"
                className="block text-gray-500 transition-colors duration-300 hover:text-white"
              >
                단지소개
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className="flex-1">
            <h4 className="text-white text-base font-medium tracking-[-0.5px] mb-4">
              약관 및 정책
            </h4>
            <nav className="space-y-2 text-sm">
              <a
                href="#"
                className="block text-gray-500 transition-colors duration-300 hover:text-white"
              >
                개인정보처리방침
              </a>
              <a
                href="#"
                className="block text-gray-500 transition-colors duration-300 hover:text-white"
              >
                이용약관
              </a>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Brand Apartment. All rights
            reserved.
            <br />
            본 사이트의 내용은 분양 관련 참고용이며, 실제 내용과 차이가 있을 수
            있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

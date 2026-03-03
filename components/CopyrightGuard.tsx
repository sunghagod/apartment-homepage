"use client";

import { useEffect } from "react";

export default function CopyrightGuard() {
  useEffect(() => {
    const style = "color:#C8A870; font-weight:bold; font-size:14px;";
    const warn  = "color:#ff4d4d; font-weight:bold; font-size:13px;";
    const gray  = "color:#888; font-size:12px;";

    console.log("%c\n⚠️  저작권 경고 / COPYRIGHT WARNING\n", style);
    console.log(
      "%c이 사이트의 모든 코드, 디자인, 콘텐츠는 저작권법의 보호를 받습니다.\n무단 복제, 배포, 수정을 엄격히 금지합니다.",
      warn
    );
    console.log(
      "%cAll code, design, and content of this site are protected by copyright law.\nUnauthorized reproduction, distribution, or modification is strictly prohibited.",
      gray
    );
    console.log("%c\n© 2026 진월 더리브 라포레. All rights reserved.\n", style);
  }, []);

  return null;
}

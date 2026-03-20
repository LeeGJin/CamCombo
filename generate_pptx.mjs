import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE"; // 16:9
pptx.author = "Claude Code";

// ===== Color Palette =====
const C = {
  bg: "0D1B2A",        // Midnight Navy – 슬라이드 배경
  bg2: "1B263B",       // Steel Navy
  accent: "E2B714",    // Bright Gold – 주 강조 (프로젝터 채도 유지)
  accentDark: "C49B0E", // Dark Gold
  yellow: "FFD369",    // Light Gold – 하이라이트 텍스트
  text: "E0E1DD",      // Pearl White – 본문 (순백보다 눈부심 적음)
  dim: "778DA9",       // Cadet Gray – 보조 텍스트
  dimDark: "415A77",   // Slate Blue – 3차 텍스트
  border: "415A77",    // Slate Blue – 테두리
  red: "EF6461",       // Soft Red – 경고/문제
  green: "43AA8B",     // Teal Green – 성공/해결
  white: "FFFFFF",
  cardBg: "1B263B",    // Steel Navy – 카드 배경
};

// ===== Helpers =====
function addBg(slide) {
  slide.background = { fill: C.bg };
}

function addTitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: 0.6, y: 0.3, w: "90%", h: 0.7,
    fontSize: 28, fontFace: "맑은 고딕", bold: true,
    color: C.accent,
    borderBottom: { pt: 2, color: C.accent },
    ...opts,
  });
}

function addCard(slide, x, y, w, h, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: C.cardBg },
    line: { color: opts.borderColor || C.border, width: 1 },
    rectRadius: 0.1,
  });
}

function addBullet(slide, x, y, w, items, opts = {}) {
  const textItems = items.map(item => ({
    text: item,
    options: {
      fontSize: opts.fontSize || 16,
      fontFace: "맑은 고딕",
      color: opts.color || C.text,
      bullet: { type: "bullet", color: C.accent },
      paraSpaceAfter: 6,
    },
  }));
  slide.addText(textItems, { x, y, w, h: opts.h || 3, valign: "top" });
}

function addTag(slide, x, y, text, bgColor) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w: text.length * 0.14 + 0.4, h: 0.35,
    fill: { color: bgColor || C.accent },
    rectRadius: 0.17,
  });
  slide.addText(text, {
    x, y, w: text.length * 0.14 + 0.4, h: 0.35,
    fontSize: 12, fontFace: "맑은 고딕", bold: true,
    color: C.white, align: "center", valign: "middle",
  });
}

function addPromptBox(slide, x, y, w, h, text) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: "081422" },
    line: { color: C.accent, width: 1 },
    rectRadius: 0.08,
  });
  slide.addText(text, {
    x: x + 0.15, y: y + 0.1, w: w - 0.3, h: h - 0.2,
    fontSize: 14, fontFace: "Consolas", color: C.yellow,
    valign: "top", lineSpacingMultiple: 1.3,
  });
}

function addVersionBadge(slide, version) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: 0.15, w: 0.6, h: 0.32,
    fill: { color: C.accent },
    rectRadius: 0.16,
  });
  slide.addText(version, {
    x: 0.6, y: 0.15, w: 0.6, h: 0.32,
    fontSize: 12, fontFace: "맑은 고딕", bold: true,
    color: C.white, align: "center", valign: "middle",
  });
}

function addSubtitle(slide, x, y, w, text, color) {
  slide.addText(text, {
    x, y, w, h: 0.35,
    fontSize: 15, fontFace: "맑은 고딕", bold: true,
    color: color || C.accent,
  });
}

// ===================================================================
// 슬라이드 1: 표지
// ===================================================================
let slide = pptx.addSlide();
addBg(slide);
slide.addText([
  { text: "Vibe", options: { fontSize: 54, fontFace: "맑은 고딕", bold: true, color: C.accent } },
  { text: " Coding", options: { fontSize: 54, fontFace: "맑은 고딕", bold: true, color: C.white } },
], { x: 0, y: 1.5, w: "100%", h: 1.2, align: "center" });
slide.addText("GAI와 함께하는 새로운 개발 방식", {
  x: 0, y: 2.7, w: "100%", h: 0.5,
  fontSize: 20, fontFace: "맑은 고딕", color: C.dim, align: "center",
});
slide.addShape(pptx.ShapeType.line, {
  x: 3.5, y: 3.5, w: 6.3, h: 0,
  line: { color: C.border, width: 1.5 },
});
slide.addText("소프트웨어공학 과제 1", {
  x: 0, y: 3.7, w: "100%", h: 0.4,
  fontSize: 14, fontFace: "맑은 고딕", color: C.dimDark, align: "center",
});
slide.addText("사용 도구: Claude Code (Anthropic Claude Opus 4.6)", {
  x: 0, y: 4.2, w: "100%", h: 0.4,
  fontSize: 14, fontFace: "맑은 고딕", color: C.dimDark, align: "center",
});

// ===================================================================
// 슬라이드 2: 목차
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addTitle(slide, "목차");

const tocItems = [
  "Vibe Coding의 정의",
  "Vibe Coding에 대한 질문",
  "예제로 배우는 Vibe Coding — 요구사항 · Prompt 작성 · 반복 개선",
  "Vibe Coding에 대한 평가 — 한계점 · 적용 영역 · 과대 광고 · 대세 이유",
  "활용방안 · GAI 활용 효과 · 참고 자료",
];
tocItems.forEach((item, i) => {
  const yPos = 1.4 + i * 0.75;
  addCard(slide, 0.8, yPos, 11.5, 0.6);
  // Number circle
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 1.0, y: yPos + 0.08, w: 0.44, h: 0.44,
    fill: { color: C.accent },
  });
  slide.addText(String(i + 1), {
    x: 1.0, y: yPos + 0.08, w: 0.44, h: 0.44,
    fontSize: 16, fontFace: "맑은 고딕", bold: true,
    color: C.white, align: "center", valign: "middle",
  });
  slide.addText(item, {
    x: 1.7, y: yPos, w: 10, h: 0.6,
    fontSize: 16, fontFace: "맑은 고딕", color: C.text, valign: "middle",
  });
});

// ===================================================================
// 슬라이드 3: Vibe Coding 정의
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addTitle(slide, "Vibe Coding의 정의");

// Quote bar
slide.addShape(pptx.ShapeType.rect, {
  x: 0.6, y: 1.3, w: 0.06, h: 0.5,
  fill: { color: C.accent },
});
slide.addText("Andrej Karpathy (전 Tesla AI 디렉터)가 2025년 2월 제안한 용어", {
  x: 0.85, y: 1.3, w: 11, h: 0.5,
  fontSize: 15, fontFace: "맑은 고딕", italic: true, color: C.yellow,
});

// Before / After cards
addCard(slide, 0.6, 2.2, 5.5, 1.3);
addSubtitle(slide, 0.85, 2.35, 4, "기존 방식");
slide.addText('개발자가 직접 코드를 한 줄 한 줄 작성', {
  x: 0.85, y: 2.7, w: 5, h: 0.6,
  fontSize: 14, fontFace: "맑은 고딕", color: C.text,
});

addCard(slide, 6.7, 2.2, 5.5, 1.3, { borderColor: C.accent });
addSubtitle(slide, 6.95, 2.35, 4, "Vibe Coding");
slide.addText('자연어 프롬프트로 AI에게 의도를 전달하여 코드 생성', {
  x: 6.95, y: 2.7, w: 5, h: 0.6,
  fontSize: 14, fontFace: "맑은 고딕", bold: true, color: C.yellow,
});

// Arrow
slide.addText('"코드를 작성하는 것"  →  "AI와 대화하며 결과물을 만드는 것"', {
  x: 0, y: 3.7, w: "100%", h: 0.4,
  fontSize: 15, fontFace: "맑은 고딕", color: C.accent, align: "center", bold: true,
});

// Cycle: GAI에게 시킨다 → 실행·확인 → 수정 요청 → 반복
const cycleY = 4.35;
const steps = [
  { x: 1.2, label: "① GAI에게 시킨다", color: C.accent },
  { x: 4.7, label: "② 실행하여 결과 확인", color: C.green },
  { x: 8.2, label: "③ 수정사항을 다시 GAI에게", color: C.yellow },
];
steps.forEach(({ x, label, color }) => {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y: cycleY, w: 2.8, h: 0.55,
    fill: { color: C.cardBg },
    line: { color, width: 1.5 },
    rectRadius: 0.08,
  });
  slide.addText(label, {
    x, y: cycleY, w: 2.8, h: 0.55,
    fontSize: 14, fontFace: "맑은 고딕", bold: true,
    color, align: "center", valign: "middle",
  });
});
// Arrows between steps
slide.addText("→", { x: 4.0, y: cycleY, w: 0.7, h: 0.55, fontSize: 18, color: C.dim, align: "center", valign: "middle" });
slide.addText("→", { x: 7.5, y: cycleY, w: 0.7, h: 0.55, fontSize: 18, color: C.dim, align: "center", valign: "middle" });
// Loop arrow back
slide.addText("↻ 반복", {
  x: 0, y: cycleY + 0.6, w: "100%", h: 0.35,
  fontSize: 14, fontFace: "맑은 고딕", color: C.dim, align: "center",
});

// Tool tags
const tools = ["Claude Code", "GitHub Copilot", "Cursor", "Replit Agent"];
tools.forEach((tool, i) => {
  addTag(slide, 3.2 + i * 1.8, 5.6, tool);
});

// ===================================================================
// 슬라이드 4: 질문
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addTitle(slide, "Vibe Coding에 대한 질문");
slide.addText("Vibe Coding을 처음 접할 때 떠오르는 질문들", {
  x: 0.6, y: 1.1, w: 11, h: 0.3,
  fontSize: 14, fontFace: "맑은 고딕", color: C.dim,
});

const questions = [
  ["코딩을 전혀 모르는 사람도 할 수 있나요?", "기본 결과물은 가능하지만, 품질 판단과 디버깅에는 기초 지식 필요"],
  ["어떤 종류의 프로젝트에 적합한가요?", "프로토타입, 간단한 웹페이지, 데이터 시각화 등"],
  ["전통적인 코딩과 품질 차이가 있나요?", "단순 기능은 비슷, 복잡한 시스템은 사람의 설계 능력 필수"],
  ["보안이나 안정성은 괜찮은가요?", "AI 생성 코드도 반드시 리뷰 필요. 보안 취약점 포함 가능성"],
  ["프롬프트 작성 능력이 중요한가요?", "매우 중요. 구체적이고 단계적인 프롬프트 → 더 좋은 결과"],
];
questions.forEach(([q, a], i) => {
  const yPos = 1.6 + i * 0.8;
  addCard(slide, 0.6, yPos, 11.5, 0.68);
  slide.addText(`Q${i + 1}`, {
    x: 0.85, y: yPos + 0.08, w: 0.5, h: 0.5,
    fontSize: 14, fontFace: "맑은 고딕", bold: true, color: C.accent,
  });
  slide.addText(q, {
    x: 1.4, y: yPos + 0.05, w: 10, h: 0.3,
    fontSize: 13, fontFace: "맑은 고딕", bold: true, color: C.text,
  });
  slide.addText(a, {
    x: 1.4, y: yPos + 0.35, w: 10, h: 0.28,
    fontSize: 14, fontFace: "맑은 고딕", color: C.dim,
  });
});

// ===================================================================
// 슬라이드 5: 예제 소개
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addTitle(slide, "예제 소개 — CamCombo");
slide.addText("카메라 바디 + 렌즈 조합 비교 사이트", {
  x: 0.6, y: 1.1, w: 11, h: 0.3,
  fontSize: 14, fontFace: "맑은 고딕", color: C.dim,
});

// Left: Why
addCard(slide, 0.6, 1.6, 5.5, 3.5);
addSubtitle(slide, 0.85, 1.75, 4, "주제 선택 이유");
addBullet(slide, 0.85, 2.15, 5, [
  "평소 사진 촬영이 취미",
  "카메라 바디와 렌즈 조합 비교가 항상 불편",
  "마운트 호환성, 합산 가격을 한눈에 보기 어려움",
  "실제 불편함 해결 → Vibe Coding 실용성 입증",
], { h: 2.5 });

// Right: Requirements
addCard(slide, 6.7, 1.6, 5.5, 3.5);
addSubtitle(slide, 6.95, 1.75, 4, "요구사항");
addBullet(slide, 6.95, 2.15, 5, [
  "카드 형태 제품 목록",
  "브랜드 / 가격 필터링",
  "마운트 기반 호환 렌즈 자동 필터링",
  "바디 + 렌즈 합산 가격 표시",
  "구매 링크 (네이버 쇼핑, 쿠팡)",
], { h: 2.5 });
addTag(slide, 6.95, 4.55, "HTML");
addTag(slide, 7.95, 4.55, "CSS");
addTag(slide, 8.85, 4.55, "JavaScript");

// ===================================================================
// 슬라이드 6: Prompt 작성과정 소개
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addTitle(slide, "Prompt 작성과정 소개");

slide.addText("GAI와 대화하며 웹페이지를 만들어가는 전체 흐름", {
  x: 0.6, y: 1.1, w: 11, h: 0.3,
  fontSize: 14, fontFace: "맑은 고딕", color: C.dim,
});

// 3-step flow cards
const flowSteps = [
  { num: "STEP 1", title: "GAI와 대화하며 구조 설계", desc: "요구사항을 자연어로 전달하여\n전체 페이지 구조를 한 번에 생성", ver: "→ V1", color: C.accent },
  { num: "STEP 2", title: "Prompt를 통해 코드 생성", desc: "부족한 부분을 추가 프롬프트로\n요청하여 기능을 점진적으로 확장", ver: "→ V2, V3", color: C.green },
  { num: "STEP 3", title: "반복적 수정 및 개선", desc: "결과 확인 후 문제점을 피드백하여\nAI가 수정·보완하는 반복 사이클", ver: "→ V4", color: C.yellow },
];
flowSteps.forEach(({ num, title, desc, ver, color }, i) => {
  const x = 0.6 + i * 4.1;
  addCard(slide, x, 1.6, 3.8, 3.0, { borderColor: color });
  // Step badge
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.15, y: 1.75, w: 0.9, h: 0.3,
    fill: { color }, rectRadius: 0.15,
  });
  slide.addText(num, {
    x: x + 0.15, y: 1.75, w: 0.9, h: 0.3,
    fontSize: 12, fontFace: "맑은 고딕", bold: true,
    color: C.bg, align: "center", valign: "middle",
  });
  // Title
  slide.addText(title, {
    x: x + 0.2, y: 2.2, w: 3.4, h: 0.4,
    fontSize: 14, fontFace: "맑은 고딕", bold: true, color,
  });
  // Description
  slide.addText(desc, {
    x: x + 0.2, y: 2.7, w: 3.4, h: 1.0,
    fontSize: 14, fontFace: "맑은 고딕", color: C.text, lineSpacingMultiple: 1.4,
  });
  // Version tag
  slide.addText(ver, {
    x: x + 0.2, y: 3.8, w: 3.4, h: 0.3,
    fontSize: 14, fontFace: "맑은 고딕", bold: true, color: C.dim,
  });
  // Arrow between cards
  if (i < 2) {
    slide.addText("→", {
      x: x + 3.8, y: 2.5, w: 0.3, h: 0.5,
      fontSize: 22, color: C.dim, align: "center", valign: "middle",
    });
  }
});

// Bottom: 유의사항 체크리스트 (과제 필수 기록)
addCard(slide, 0.6, 5.0, 11.5, 1.8);
addSubtitle(slide, 0.85, 5.1, 4, "과제 필수 기록 사항");
const checkItems = [
  "어떤 GAI 도구를 사용했는가?  →  Claude Code (Anthropic Claude Opus 4.6)",
  "어떤 질문(Prompt)을 사용했는가?  →  V1~V4 각 슬라이드에 실제 프롬프트 기록",
  "처음 결과에서 무엇이 부족했는가?  →  이미지 없음(V1) · 가격 하드코딩(V2) · 색상 부적합(V3)",
  "어떻게 질문을 수정·보완했는가?  →  AI 오류 수정 슬라이드에서 구체적 사례 설명",
];
checkItems.forEach((item, i) => {
  slide.addText("✓ " + item, {
    x: 0.85, y: 5.4 + i * 0.33, w: 11, h: 0.3,
    fontSize: 13, fontFace: "맑은 고딕", color: C.text,
  });
});

// ===================================================================
// 슬라이드 7: V1
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addVersionBadge(slide, "V1");
addTitle(slide, "초기 구조 설계 및 전체 페이지 생성", { x: 1.4 });

// Left: Prompt + Results (compact)
addCard(slide, 0.5, 1.1, 4.5, 5.9);
addSubtitle(slide, 0.75, 1.2, 4, "사용한 프롬프트");
addPromptBox(slide, 0.75, 1.5, 4.0, 2.2,
  "카메라 바디 + 렌즈 조합 비교 사이트를\n단일 index.html 파일로 구현해줘.\n\n다크 테마, 카드 레이아웃, 브랜드 필터,\n가격대 슬라이더, 호환 렌즈 필터링,\n합산 가격, 구매 링크, 반응형"
);
addSubtitle(slide, 0.75, 3.9, 4, "AI 생성 결과");
addBullet(slide, 0.75, 4.2, 4.0, [
  "단일 HTML에 CSS, JS 내장 (~500줄)",
  "다크 테마 + 카드형 레이아웃",
  "브랜드 필터 + 가격 슬라이더",
  "마운트 호환 + 합산가격 + 구매링크",
], { h: 2.5, fontSize: 14 });

// Right: Screenshot (large)
addCard(slide, 5.3, 1.1, 7.5, 5.9, { borderColor: C.accent });
slide.addText("[ V1 스크린샷 삽입 ]", {
  x: 5.3, y: 1.1, w: 7.5, h: 5.9,
  fontSize: 14, fontFace: "맑은 고딕", color: C.dimDark,
  align: "center", valign: "middle",
});

// ===================================================================
// 슬라이드 7: V2
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addVersionBadge(slide, "V2");
addTitle(slide, "실제 제품 이미지 적용", { x: 1.4 });

// Left: Prompt + Process (compact)
addCard(slide, 0.5, 1.1, 4.5, 5.9);
addSubtitle(slide, 0.75, 1.2, 4, "사용한 프롬프트");
addPromptBox(slide, 0.75, 1.5, 4.0, 1.1,
  "카메라 렌즈와 바디에 대한 이미지가\n없는데 해당 장비에 대한 이미지가\n같이 보였으면 좋겠어"
);
addSubtitle(slide, 0.75, 2.8, 4, "AI의 작업 과정");
addBullet(slide, 0.75, 3.1, 4.0, [
  "제조사 공식 사이트에서 25개 이미지 수집",
  "HTTP 요청으로 모든 URL 검증",
  "CSS object-fit: contain 적용",
], { h: 1.5, fontSize: 14 });
addSubtitle(slide, 0.75, 4.5, 4, "이미지 출처");
slide.addText("sony.co.jp · global.canon\nimaging.nikon.com · fujifilm-x.com", {
  x: 0.75, y: 4.8, w: 4, h: 0.6,
  fontSize: 13, fontFace: "맑은 고딕", color: C.dim, lineSpacingMultiple: 1.4,
});

// Right: Screenshot (large)
addCard(slide, 5.3, 1.1, 7.5, 5.9, { borderColor: C.accent });
slide.addText("[ V2 스크린샷 삽입 ]", {
  x: 5.3, y: 1.1, w: 7.5, h: 5.9,
  fontSize: 14, fontFace: "맑은 고딕", color: C.dimDark,
  align: "center", valign: "middle",
});

// ===================================================================
// 슬라이드 8: V3
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addVersionBadge(slide, "V3");
addTitle(slide, "실시간 가격 시뮬레이션", { x: 1.4 });

// Left: Prompt + Changes (compact)
addCard(slide, 0.5, 1.1, 4.5, 5.9);
addSubtitle(slide, 0.75, 1.2, 4, "사용한 프롬프트");
addPromptBox(slide, 0.75, 1.5, 4.0, 1.1,
  "가격은 사이트를 열었을때 기준으로\n불러와서 가격을 띄워줄수있을까?\n가격의 출처와 업데이트된 시간도 함께"
);
addSubtitle(slide, 0.75, 2.8, 4, "AI의 판단");
addBullet(slide, 0.75, 3.1, 4.0, [
  "순수 HTML/JS → 외부 API 호출 불가",
  "Mock 시뮬레이션 방식 선택",
], { h: 0.9, fontSize: 14 });
addSubtitle(slide, 0.75, 4.1, 4, "주요 변경 내용");
addBullet(slide, 0.75, 4.4, 4.0, [
  "Shimmer 로딩 애니메이션",
  "네이버 쇼핑 출처 태그 + 시간 표시",
  "기준가 대비 ±5% 랜덤 변동",
  "상단 가격 업데이트 배너",
], { h: 2.3, fontSize: 14 });

// Right: Screenshot (large)
addCard(slide, 5.3, 1.1, 7.5, 5.9, { borderColor: C.accent });
slide.addText("[ V3 스크린샷 삽입 ]", {
  x: 5.3, y: 1.1, w: 7.5, h: 5.9,
  fontSize: 14, fontFace: "맑은 고딕", color: C.dimDark,
  align: "center", valign: "middle",
});

// ===================================================================
// 슬라이드 9: V4
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addVersionBadge(slide, "V4");
addTitle(slide, "발표 색 조합 조사 및 디자인 통일", { x: 1.4 });

// Left: Prompt + Process (compact)
addCard(slide, 0.5, 1.1, 4.5, 5.9);
addSubtitle(slide, 0.75, 1.2, 4, "사용한 프롬프트");
addPromptBox(slide, 0.75, 1.5, 4.0, 1.3,
  "웹 서치를 통해서 적절한 색 조합을\n찾고 웹 페이지와 발표자료를\n맞춰달라는 말이었어"
);
addSubtitle(slide, 0.75, 3.0, 4, "AI의 작업 과정");
addBullet(slide, 0.75, 3.3, 4.0, [
  "15개+ 디자인 소스 웹 검색",
  "프로젝터 최적화 5개 팔레트 비교 분석",
  "40~50대 청중 고려 → Deep Navy+Gold 선정",
  "WCAG 대비율 15.4:1 근거 제시",
], { h: 1.8, fontSize: 14 });
addSubtitle(slide, 0.75, 5.1, 4, "변경 범위");
addBullet(slide, 0.75, 5.4, 4.0, [
  "웹페이지 CSS 변수 + 하드코딩 색상 8곳 교체",
  "PPT 팔레트 동시 변경 → 양쪽 톤 통일",
], { h: 1.0, fontSize: 14 });

// Right: Screenshot (large)
addCard(slide, 5.3, 1.1, 7.5, 5.9, { borderColor: C.accent });
slide.addText("[ V4 스크린샷 삽입 ]", {
  x: 5.3, y: 1.1, w: 7.5, h: 5.9,
  fontSize: 14, fontFace: "맑은 고딕", color: C.dimDark,
  align: "center", valign: "middle",
});

// ===================================================================
// 슬라이드 10: AI 오류 수정
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addTitle(slide, "AI가 잘못한 부분과 수정 과정");

slide.addShape(pptx.ShapeType.rect, {
  x: 0.6, y: 1.2, w: 0.06, h: 0.4,
  fill: { color: C.accent },
});
slide.addText("AI 오류 발견 및 수정 요청 과정", {
  x: 0.85, y: 1.2, w: 11, h: 0.4,
  fontSize: 13, fontFace: "맑은 고딕", italic: true, color: C.yellow,
});

// Left: Problem
addCard(slide, 0.6, 1.9, 5.5, 4.8, { borderColor: C.red });
addSubtitle(slide, 0.85, 2.05, 4, "문제 상황", C.red);
addBullet(slide, 0.85, 2.35, 5, [
  "PPT 슬라이드 7에서 이미지 출처 태그가 카드 영역 밖으로 넘침",
  "forEach 동적 좌표 계산에서 태그 너비를 고려하지 않음",
  "사용자가 준 녹색 팔레트 그대로 적용 → 프로젝터 환경에서 저대비로 가독성 낮음",
], { h: 1.5, fontSize: 14 });
addSubtitle(slide, 0.85, 3.85, 4, "수정 요청 프롬프트", C.yellow);
addPromptBox(slide, 0.85, 4.15, 5, 1.8,
  "7번째 슬라이드에서 요소가 밖으로\n삐져나와 전체적으로 요소 배치를\n신경써서 수정해줘\n\n웹 서치를 통해 적절한 색 조합을\n찾고 웹 페이지와 발표자료를 맞춰줘"
);

// Right: Solution
addCard(slide, 6.7, 1.9, 5.5, 4.8, { borderColor: C.green });
addSubtitle(slide, 6.95, 2.05, 4, "수정 결과", C.green);
addBullet(slide, 6.95, 2.35, 5, [
  "태그 배치를 1행 → 2행×2열로 변경",
  "15개 이상의 디자인 소스를 웹 검색",
  "프로젝터 최적화된 Deep Navy + Gold 팔레트 선정",
  "웹페이지(V4)도 동일 색상으로 통일",
], { h: 1.8, fontSize: 14 });
addSubtitle(slide, 6.95, 4.15, 4, "교훈", C.accent);
addBullet(slide, 6.95, 4.45, 5, [
  "AI도 UI 배치를 실수함 → 직접 확인 필수",
  "색상은 사용 환경(프로젝터)을 명시해야 좋은 결과",
], { h: 1.0, fontSize: 14 });

// ===================================================================
// 슬라이드 10: 평가
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addTitle(slide, "Vibe Coding에 대한 평가");

// Left: 한계점
addCard(slide, 0.6, 1.2, 5.5, 3.8);
addSubtitle(slide, 0.85, 1.35, 4, "한계점");
addBullet(slide, 0.85, 1.7, 5, [
  "복잡한 비즈니스 로직, 대규모 아키텍처 → 전문 개발자 필수",
  "AI 생성 코드의 보안 취약점을 비전문가가 발견하기 어려움",
  "발전 방향: AI 코드 이해 능력 향상 → 복잡한 프로젝트에도 적용",
], { h: 2 });

// Right: Table
addCard(slide, 6.7, 1.2, 5.5, 3.8);
addSubtitle(slide, 6.95, 1.35, 4, "적용 가능 vs 불가");
const tableData = [
  [{ text: "적용 가능", options: { bold: true, color: "FFFFFF", fill: { color: C.accent } } },
   { text: "적용 어려움", options: { bold: true, color: "FFFFFF", fill: { color: C.accent } } }],
  [{ text: "프로토타입 / MVP" }, { text: "대규모 분산 시스템" }],
  [{ text: "간단한 웹페이지" }, { text: "실시간 트레이딩" }],
  [{ text: "데이터 시각화" }, { text: "의료/항공 안전 SW" }],
  [{ text: "자동화 스크립트" }, { text: "알고리즘 최적화" }],
];
slide.addTable(tableData, {
  x: 7.0, y: 1.75, w: 5, fontSize: 14, fontFace: "맑은 고딕",
  color: C.text,
  border: { type: "solid", pt: 0.5, color: C.border },
  rowH: [0.35, 0.35, 0.35, 0.35, 0.35],
  colW: [2.5, 2.5],
});

// ===================================================================
// 슬라이드 11: 과대 광고와 현실
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addTitle(slide, "과대 광고와 현실");

// Warning card
addCard(slide, 0.6, 1.3, 11.5, 1.6, { borderColor: C.red });
addSubtitle(slide, 0.85, 1.45, 4, "과대 광고에 대한 경고", C.red);
addBullet(slide, 0.85, 1.8, 11, [
  '"AI가 개발자를 대체한다"는 과장된 표현',
  "현실: AI는 도구이며, 문제 정의 능력과 결과물 검증 능력이 여전히 핵심",
  'Vibe Coding은 "코딩의 종말"이 아닌 "코딩의 민주화"에 가까움',
], { h: 1, fontSize: 13 });

// Green card
addCard(slide, 0.6, 3.2, 11.5, 1.8, { borderColor: C.green });
addSubtitle(slide, 0.85, 3.35, 4, "왜 대세인가?", C.green);
addBullet(slide, 0.85, 3.7, 11, [
  "개발 속도가 획기적으로 빨라짐 (단일 프롬프트로 전체 웹페이지 생성)",
  "비개발자도 아이디어를 빠르게 프로토타입할 수 있음",
  "반복적 작업을 AI가 처리 → 개발자는 설계와 검증에 집중",
], { h: 1.2, fontSize: 13 });

// ===================================================================
// 슬라이드 12: 활용방안
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addTitle(slide, "활용방안");

addCard(slide, 0.6, 1.3, 5.5, 3.5);
addSubtitle(slide, 0.85, 1.45, 4, "향후 활용 계획");
addBullet(slide, 0.85, 1.85, 5, [
  "(개인적인 활용 계획 작성)",
  "개인 프로젝트 프로토타입",
  "반복적 코드 작성 자동화",
  "새로운 기술 학습 시 예제 코드 생성",
], { h: 2.5 });

addCard(slide, 6.7, 1.3, 5.5, 3.5);
addSubtitle(slide, 6.95, 1.45, 4, "학습 및 조사 계획");
addBullet(slide, 6.95, 1.85, 5, [
  "(학습 계획 작성)",
  "다양한 GAI 도구 비교 사용",
  "프롬프트 엔지니어링 기법 학습",
  "오픈소스에서 AI 활용 사례 조사",
], { h: 2.5 });

// ===================================================================
// 슬라이드 13: GAI 활용 효과 — 전체 파이프라인
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addTitle(slide, "조사부터 PPT 제작까지 — GAI 활용 전 과정");

addCard(slide, 0.6, 1.2, 11.5, 0.55);
addSubtitle(slide, 0.85, 1.27, 2, "사용한 도구");
slide.addText("Claude Code (Anthropic Claude Opus 4.6) — VS Code 터미널 CLI", {
  x: 3.0, y: 1.2, w: 8, h: 0.55,
  fontSize: 14, fontFace: "맑은 고딕", color: C.text, valign: "middle",
});

// Left: Folder structure = evidence of GAI pipeline
addCard(slide, 0.6, 2.0, 6.0, 4.8, { borderColor: C.accent });
addSubtitle(slide, 0.85, 2.1, 5, "SE/ 폴더 — GAI가 생성한 전체 산출물");
addPromptBox(slide, 0.85, 2.45, 5.5, 3.9,
  "SE/\n" +
  "├─ PLAN.md            ← 구현 계획 수립\n" +
  "├─ CLAUDE.md          ← 작업 컨텍스트 관리\n" +
  "│\n" +
  "├─ index.html         ← V1 전체 웹페이지 생성\n" +
  "├─ index_v2.html      ← V2 이미지 검색·적용\n" +
  "├─ index_v3.html      ← V3 가격 시뮬레이션\n" +
  "├─ index_v4.html      ← V4 색 조합 조사·통일\n" +
  "│\n" +
  "├─ PPT_CONTENT.md     ← 발표 내용 작성\n" +
  "├─ generate_pptx.mjs  ← PPT 생성 코드 작성\n" +
  "└─ SE_과제1_발표자료.pptx ← 최종 산출물"
);
// Stage labels
addTag(slide, 0.85, 6.55, "조사·계획", C.dimDark);
addTag(slide, 2.25, 6.55, "웹 개발 (V1~V4)", C.accent);
addTag(slide, 4.45, 6.55, "PPT 제작", C.green);

// Right: 시행착오 (real)
addCard(slide, 6.9, 2.0, 5.3, 4.8, { borderColor: C.red });
addSubtitle(slide, 7.15, 2.1, 4, "실제 시행착오", C.red);
addBullet(slide, 7.15, 2.45, 4.8, [
  "PPT \"본인\" 등 문서체 표현 → 발표체로 수정 요청",
  "사용자 녹색 팔레트 적용 → 가독성 낮아 웹 검색 후 Deep Navy+Gold로 재선정",
  "슬라이드 7 태그가 카드 밖 넘침 → 2행 배치로 수정",
  "스크린샷 공간이 한 줄뿐 → 좌40:우60 레이아웃으로 재설계",
  "PPT 색상과 웹 색상 불일치 → V4에서 양쪽 동시 통일",
], { h: 3.0, fontSize: 14 });
addSubtitle(slide, 7.15, 5.5, 4, "핵심 교훈", C.accent);
addBullet(slide, 7.15, 5.8, 4.8, [
  "AI 결과물은 반드시 직접 확인 후 피드백",
  "구체적인 환경·맥락을 프롬프트에 명시",
], { h: 0.8, fontSize: 14 });

// ===================================================================
// 슬라이드 14: 참고 자료
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
addTitle(slide, "참고 자료");

const refs = [
  'Andrej Karpathy, "Vibe Coding" — 2025년 2월, X(Twitter) 게시글',
  "Anthropic Claude Code 공식 문서 — claude.ai/claude-code",
  "Color Hunt / Design Shack / SlideUplift — 발표 색상 팔레트 조사",
  "Edward Tufte — 프로젝터 발표 배경색 권장 사항",
];
refs.forEach((ref, i) => {
  const yPos = 1.5 + i * 0.9;
  addCard(slide, 0.6, yPos, 11.5, 0.7);
  slide.addText(`${i + 1}.`, {
    x: 0.85, y: yPos, w: 0.5, h: 0.7,
    fontSize: 18, fontFace: "맑은 고딕", bold: true, color: C.accent, valign: "middle",
  });
  slide.addText(ref, {
    x: 1.4, y: yPos, w: 10, h: 0.7,
    fontSize: 15, fontFace: "맑은 고딕", color: C.text, valign: "middle",
  });
});

// ===================================================================
// 슬라이드 15: 감사합니다
// ===================================================================
slide = pptx.addSlide();
addBg(slide);
slide.addText("감사합니다", {
  x: 0, y: 2, w: "100%", h: 1,
  fontSize: 48, fontFace: "맑은 고딕", bold: true,
  color: C.white, align: "center",
});
slide.addText("Q & A", {
  x: 0, y: 3.2, w: "100%", h: 0.6,
  fontSize: 20, fontFace: "맑은 고딕", color: C.dim, align: "center",
});

// ===== Export =====
const OUTPUT = "SE_과제1_발표자료.pptx";
pptx.writeFile({ fileName: OUTPUT })
  .then(() => console.log(`✓ ${OUTPUT} 생성 완료`))
  .catch(err => console.error("Error:", err));

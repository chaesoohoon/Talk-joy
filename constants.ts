import { Card, CardType } from './types';

// A. Realistic / Fun Talk Cards (Updated for better party vibes)
const lightTalks: Card[] = [
  { id: 'l-1', type: CardType.TALK_LIGHT, content: "📱 갤러리 '최신순' 10번째 사진 공개! (설명 필수, 사진 없으면 가장 최근 사진)" },
  { id: 'l-2', type: CardType.TALK_LIGHT, content: "🔍 최근 검색 기록(유튜브/포털) 상위 3개 있는 그대로 공개하기" },
  { id: 'l-3', type: CardType.TALK_LIGHT, content: "💰 지금 로또 100억 당첨! 여기 있는 사람들에게 각각 얼마씩 줄 것인가?" },
  { id: 'l-4', type: CardType.TALK_LIGHT, content: "💸 내 인생 가장 아까웠던 '최악의 지출'은 무엇인가요?" },
  { id: 'l-5', type: CardType.TALK_LIGHT, content: "🚻 만약 성별이 바뀐다면 가장 먼저 해보고 싶은 것 1가지는?" },
  { id: 'l-6', type: CardType.TALK_LIGHT, content: "🛌 자기 전에 문득 떠올라서 이불 킥하게 만드는 '흑역사' 하나 말하기" },
  { id: 'l-7', type: CardType.TALK_LIGHT, content: "🍔 지금 당장 먹고 싶은 음식 3가지! (3초 안에 대답 못하면 벌칙)" },
  { id: 'l-8', type: CardType.TALK_LIGHT, content: "💬 가장 최근에 온 카톡(또는 DM) 내용 소리 내어 읽기" },
  { id: 'l-9', type: CardType.TALK_LIGHT, content: "😴 나만의 특이한 잠버릇이나 생활 습관이 있다면?" },
  { id: 'l-10', type: CardType.TALK_LIGHT, content: "📛 학창 시절 별명은 무엇이었나요? 왜 그렇게 불렸나요?" },
];

const funnyTalks: Card[] = [
  { id: 'f-1', type: CardType.TALK_FUNNY, content: "👉 [지목] 여기 있는 사람 중 무인도에 같이 가면 가장 먼저 죽을 것 같은 사람은?" },
  { id: 'f-2', type: CardType.TALK_FUNNY, content: "💔 내가 겪은 가장 최악의 연애 썰 하나 풀기 (없으면 짝사랑 썰)" },
  { id: 'f-3', type: CardType.TALK_FUNNY, content: "📱 지금 당장 전 애인(혹은 썸녀/썸남)에게 '자니?' 카톡 보내기 vs 그냥 벌주 마시기" },
  { id: 'f-4', type: CardType.TALK_FUNNY, content: "⚖️ [밸런스] 평생 양치 안 하기(입 냄새) vs 평생 샤워 안 하기(몸 냄새)" },
  { id: 'f-5', type: CardType.TALK_FUNNY, content: "⚖️ [밸런스] 내 절친이랑 바람난 애인 vs 내 애인이랑 바람난 절친" },
  { id: 'f-6', type: CardType.TALK_FUNNY, content: "🍺 술 취해서 저지른 가장 충격적인 실수나 주사는?" },
  { id: 'f-7', type: CardType.TALK_FUNNY, content: "💯 내 외모 점수는 10점 만점에 몇 점? (솔직하게)" },
  { id: 'f-8', type: CardType.TALK_FUNNY, content: "👉 [지목] 여기서 가장 안 씻을 것 같은 사람 동시에 손가락으로 가리키기" },
  { id: 'f-9', type: CardType.TALK_FUNNY, content: "🤥 가장 최근에 한 거짓말은 무엇인가요?" },
  { id: 'f-10', type: CardType.TALK_FUNNY, content: "⚖️ [밸런스] 토 맛 토마토 먹기 vs 토마토 맛 토 먹기" },
];

const deepTalks: Card[] = [
  { id: 'd-1', type: CardType.TALK_DEEP, content: "🎯 올해 이것만큼은 꼭 이루고 싶다 하는 목표 1가지는?" },
  { id: 'd-2', type: CardType.TALK_DEEP, content: "🤝 인간관계에서 '이것만은 절대 용서 못 한다' 하는 것은?" },
  { id: 'd-3', type: CardType.TALK_DEEP, content: "🤔 내가 생각하는 '진정한 어른'이란 어떤 사람인가요?" },
  { id: 'd-4', type: CardType.TALK_DEEP, content: "⏳ 과거의 특정 시점으로 돌아갈 수 있다면 언제로 가고 싶나요?" },
  { id: 'd-5', type: CardType.TALK_DEEP, content: "😟 최근 나를 가장 잠 못 들게 했던 고민거리는?" },
  { id: 'd-6', type: CardType.TALK_DEEP, content: "🌻 오른쪽 사람의 장점을 찾아서 진심으로 칭찬해 주기" },
  { id: 'd-7', type: CardType.TALK_DEEP, content: "🪦 나중에 내 묘비명에 적혔으면 하는 문장은?" },
  { id: 'd-8', type: CardType.TALK_DEEP, content: "⚖️ 사랑과 우정 중 하나만 영원히 가질 수 있다면?" },
  { id: 'd-9', type: CardType.TALK_DEEP, content: "🧐 내가 생각하는 나의 가장 큰 단점(콤플렉스)은?" },
  { id: 'd-10', type: CardType.TALK_DEEP, content: "🔮 10년 뒤의 내 모습은 어떨 것 같나요?" },
];

// B. Forbidden Words Groups (Common filler words)
export const FORBIDDEN_GROUPS = [
  ["나", "너", "우리"],
  ["진짜", "솔직히", "그냥"],
  ["아니", "근데", "어"],
  ["음...", "막", "약간"],
  ["어쨌든", "사실", "그러니까"],
  ["좋아", "싫어", "몰라"],
  ["오늘", "어제", "내일"],
  ["친구", "일", "집"],
  ["생각", "느낌", "마음"],
  ["1", "2", "3"] // 숫자를 말하면 안됨
];

// C. Action Cards (More interactive)
const actionCards: Card[] = [
  { id: 'a-1', type: CardType.ACTION, content: "🚫 지금부터 이 라운드 끝날 때까지 '영어' 쓰지 않기! (쓰면 바로 벌칙)", actionType: "Rule" },
  { id: 'a-2', type: CardType.ACTION, content: "⏱️ 오른쪽 사람의 장점 3가지를 5초 안에 말하기 (실패 시 벌칙)", actionType: "Speed" },
  { id: 'a-3', type: CardType.ACTION, content: "💃 핸드폰으로 신나는 노래를 틀고 1분간 춤추기 (거부하면 벌주)", actionType: "Dance" },
  { id: 'a-4', type: CardType.ACTION, content: "✊ 가위바위보! 여기서 진 사람은 딱밤 맞기", actionType: "Game" },
  { id: 'a-5', type: CardType.ACTION, content: "😍 모두가 만족할 때까지 애교 보여주기 (통과 못 하면 계속함)", actionType: "Acting" },
  { id: 'a-6', type: CardType.ACTION, content: "😐 지금부터 1분간 웃지 않기! (이빨 보이면 탈락/벌칙)", actionType: "Challenge" },
  { id: 'a-7', type: CardType.ACTION, content: "👉 왼쪽 사람 볼을 찌르면서 세상 느끼하게 '귀여워' 라고 말하기", actionType: "Touch" },
  { id: 'a-8', type: CardType.ACTION, content: "🎤 자신 있는 성대모사 하나 보여주기", actionType: "Talent" },
];

// D. Event Cards
const eventCards: Card[] = [
  { id: 'e-1', type: CardType.EVENT, content: "📢 [단체 미션] 모든 플레이어 다 같이 원샷! (술이 없다면 만세 삼창)" },
  { id: 'e-2', type: CardType.EVENT, content: "🔄 [순서 변경] 지금부터 게임 진행 방향이 반대로 바뀝니다!" },
  { id: 'e-3', type: CardType.EVENT, content: "💣 [폭탄 돌리기] 핸드폰 타이머를 30초로 맞추고 옆으로 넘기세요! 알람이 울릴 때 폰을 쥔 사람이 벌칙!" },
  { id: 'e-4', type: CardType.EVENT, content: "👑 [왕 게임] 이번 턴 진행자가 왕입니다. 왕이 원하는 명령을 하나 내리세요! (거부권 없음)" },
  { id: 'e-5', type: CardType.EVENT, content: "🤐 [침묵의 시간] 지금부터 1분간 침묵! 먼저 말하거나 소리 내는 사람이 벌칙!" },
];

export const ALL_CARDS = {
  [CardType.TALK_LIGHT]: lightTalks,
  [CardType.TALK_FUNNY]: funnyTalks,
  [CardType.TALK_DEEP]: deepTalks,
  [CardType.ACTION]: actionCards,
  [CardType.EVENT]: eventCards,
};

export const getRandomForbiddenWords = () => {
  const randomIndex = Math.floor(Math.random() * FORBIDDEN_GROUPS.length);
  return FORBIDDEN_GROUPS[randomIndex];
};
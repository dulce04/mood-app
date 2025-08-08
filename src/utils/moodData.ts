import type { Answer, MoodResult, MoodType, Question, InspirationalQuote } from '../types';
import { getTodayYYYYMMDD } from './dateUtils';

// ===== 기분별 색상 데이터 =====
const moodColors = {
  joy: {
    primary: '#FFB74D',
    secondary: '#FF9800',
    gradient: 'linear-gradient(135deg, #FF9800 0%, #FF6F00 100%)',
    description: '즐겁고 행복한 주황빛'
  },
  sadness: {
    primary: '#5C6BC0',
    secondary: '#3949AB',
    gradient: 'linear-gradient(135deg, #5C6BC0 0%, #3949AB 100%)',
    description: '서글픈 남색'
  },
  depression: {
    primary: '#90A4AE',
    secondary: '#78909C',
    gradient: 'linear-gradient(135deg, #78909C 0%, #607D8B 100%)',
    description: '가라앉은 회색'
  },
  stressed: {
    primary: '#FF7043',
    secondary: '#F4511E',
    gradient: 'linear-gradient(135deg, #FF7043 0%, #F4511E 100%)',
    description: '압박감의 코랄'
  },
  calm: {
    primary: '#64B5F6',
    secondary: '#42A5F5',
    gradient: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
    description: '여유롭고 안정된 하늘색'
  },
  pride: {
    primary: '#AB47BC',
    secondary: '#9C27B0',
    gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
    description: '성취의 보라색'
  },
  boredom: {
    primary: '#BDBDBD',
    secondary: '#9E9E9E',
    gradient: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
    description: '심심한 회색'
  },
  tired: {
    primary: '#B0BEC5',
    secondary: '#90A4AE',
    gradient: 'linear-gradient(135deg, #B0BEC5 0%, #90A4AE 100%)',
    description: '지친 회청색'
  },
  fear: {
    primary: '#455A64',
    secondary: '#263238',
    gradient: 'linear-gradient(135deg, #455A64 0%, #263238 100%)',
    description: '불안한 청흑색'
  }
};

// ===== 기분별 할일 데이터 =====
const moodTasks = {
  joy: '좋아하는 것들로 하루 채우기',
  sadness: '감정 일기 쓰며 마음 정리하기',
  depression: '가벼운 산책으로 기분 환기하기',
  stressed: '우선순위 정리하고 작은 단위로 시작하기',
  calm: '심호흡과 스트레칭으로 여유 갖기',
  pride: '작은 목표 하나 완성하기',
  boredom: '새로운 소소한 취미 시도하기',
  tired: '따뜻한 샤워 후 충분히 쉬기',
  fear: '두려움 목록화하고 가장 작은 것부터 다루기'
};

const moodSelfCare = {
  joy: '좋아하는 음악 플레이리스트 듣기',
  sadness: '감정을 글로 써 내려가기',
  depression: '햇볕 쬐며 10분 걷기',
  stressed: '가벼운 스트레칭',
  calm: '가벼운 명상',
  pride: '오늘 잘한 일 3가지 적기',
  boredom: '산책하기',
  tired: '따뜻한 물 충분히 마시기',
  fear: '좋아하는 사람과 통화'
};

// ===== 기분별 문구 데이터 =====
const moodQuotes: InspirationalQuote[] = [
  // joy (기쁨)
  { id: 'joy-1', text: '오늘의 작은 기쁨들을 놓치지 말자. 그것들이 하루를 빛나게 해.', mood: 'joy' },
  { id: 'joy-2', text: '웃음은 전염돼. 네가 먼저 웃으면 세상도 따라와.', mood: 'joy' },
  { id: 'joy-3', text: '행복은 거창하지 않아. 지금 여기에서 시작돼.', mood: 'joy' },
  { id: 'joy-4', text: '행복한 일만 가득해져서 쉴 틈없이,\n빈틈도 없이 우울하지 않게,\n불안하지도 않게 하루 종일 행복할 수 있게.', mood: 'joy' },
  { id: 'joy-5', text: '내가 좋아하는 사람들이 행복만 가득했으면 좋겠어.\n내가 싫어하는 사람은 내 알 바 아니고!', mood: 'joy' },
  { id: 'calm-11', text: '행복이 뭐 별거인가.\n좋은 사람들과 함께 맛있는 밥을 먹을 수 있다면\n그걸로 된 거지.', mood: 'calm' },
  { id: 'sadness-6', text: '기분이 계속 안 좋으면 결국 나만 손해더라.\n생각해보면 사실 별 일 아니니까 너무 슬퍼하지 말자.', mood: 'sadness' },
  { id: 'calm-12', text: '매일 특별하지 않아도 돼.\n살아간다는 것 자체가 특별한 거니까.\n작은 일에 소소하게 웃고 행복하게 살아가면 돼.', mood: 'calm' },
  { id: 'pride-9', text: '있잖아, 행복은\n내가 좋아하는 사람들, 내가 사랑하는 가족들과\n잔뜩 낭비하는 시간에 있는 거 같아.', mood: 'pride' },

  // sadness (슬픔)
  { id: 'sadness-1', text: '울어도 괜찮아. 그 다음엔 조금 가벼워질 거야.', mood: 'sadness' },
  { id: 'sadness-2', text: '천천히 괜찮아질 거야. 네 속도로 가자.', mood: 'sadness' },
  { id: 'sadness-3', text: '오늘은 그냥 조용히 있어도 돼.', mood: 'sadness' },
  { id: 'sadness-4', text: '오늘은 느리게 걸어가자. 발걸음에 맞춰 호흡하기.', mood: 'sadness' },

  // depression (우울함)
  { id: 'depression-1', text: '우리는 완벽할 수 없고 완벽할 필요도 없어. 너는 너 그대로일 때가 가장 아름다워.', mood: 'depression' },
  { id: 'depression-2', text: '요즘은 싫은 사람을 애써 참지 않아. 적절한 순간에 적절한 사람들과.', mood: 'depression' },
  { id: 'depression-3', text: '마음을 비우고 가볍게 생각하자. 오늘만은.', mood: 'depression' },
  { id: 'depression-4', text: '몸을 상하게 하면서까지 해낼 일도, 마음을 아프게 하면서 지킬 관계도 없어.', mood: 'depression' },

  // stressed (스트레스)
  { id: 'stressed-1', text: '할 일을 쪼개면 마음도 가벼워져. 하나씩만 해보자.', mood: 'stressed' },
  { id: 'stressed-2', text: '완벽보다 완수. 오늘은 70%면 충분해.', mood: 'stressed' },
  { id: 'stressed-3', text: '숨 고르고 다시 시작해도 충분해.', mood: 'stressed' },

  // calm (편안함)
  { id: 'calm-1', text: '요즘은 싫은 사람을 애써 참지 않고 우정에 큰 의미를 두지 않으려 해.', mood: 'calm' },
  { id: 'calm-2', text: '단단함보다 유연함. 흔들려도 부러지지 않기.', mood: 'calm' },
  { id: 'calm-3', text: '물 흐르듯 자연스럽게, 그저 나답게.', mood: 'calm' },
  { id: 'calm-4', text: '마음을 비우고 가볍게 생각하기. 불편함은 흘려보내기.', mood: 'calm' },
  { id: 'calm-5', text: '우리는 완벽할 필요 없어. 있는 그대로도 충분해.', mood: 'calm' },
  { id: 'calm-6', text: '애쓰지 않아도 편안할 수 있는 하루.', mood: 'calm' },
  { id: 'calm-7', text: '내 몸을 상하게 하면서까지 해낼 일은 없어.', mood: 'calm' },
  { id: 'calm-8', text: '관계에도 쉼표가 필요해. 가볍게 대하기.', mood: 'calm' },
  { id: 'calm-9', text: '흔들려도 괜찮아. 다시 균형을 찾으면 돼.', mood: 'calm' },
  { id: 'calm-10', text: '가볍게 생각하고 부드럽게 지나가기.', mood: 'calm' },

  // pride (뿌듯함/자부심)
  { id: 'pride-1', text: '난 이 세상에 잘 살려고 왔지. 오래 살기만 하려고 온 게 아니야.', mood: 'pride' },
  { id: 'pride-2', text: '모든 파도를 잡지 말고, 정말 중요한 내 파도를 잡자.', mood: 'pride' },
  { id: 'pride-3', text: '나를 의심하게 하는 곳보다 나를 믿게 하는 곳으로.', mood: 'pride' },
  { id: 'pride-4', text: '완벽보다 나다움. 그게 제일 보기 좋아.', mood: 'pride' },
  { id: 'pride-5', text: '나는 내가 자라는 순간을 좋아해. 오늘도 한 뼘.', mood: 'pride' },
  { id: 'pride-6', text: '중요하지 않은 곳에 내 삶을 다 쓰지 않을래.', mood: 'pride' },
  { id: 'pride-7', text: '있는 그대로의 나로 시도하고 배우기.', mood: 'pride' },
  { id: 'pride-8', text: '한 번 더 해보면 더 나아질 거야.', mood: 'pride' },

  // boredom (지루함)
  { id: 'boredom-1', text: '심심함은 새로운 재미가 들어올 자리야.', mood: 'boredom' },
  { id: 'boredom-2', text: '5분만 낯선 걸 시도해 보자.', mood: 'boredom' },
  { id: 'boredom-3', text: '작은 호기심이 하루를 바꾼다.', mood: 'boredom' },

  // tired (피곤함)
  { id: 'tired-1', text: '잠깐 쉬는 게 멈추는 게 아니야. 더 멀리 가기 위한 숨 고르기야.', mood: 'tired' },
  { id: 'tired-2', text: '몸이 보내는 신호에 귀 기울이자. 오늘은 천천히 가도 괜찮아.', mood: 'tired' },
  { id: 'tired-3', text: '쉬어야 다시 달릴 수 있어.', mood: 'tired' },

  // fear (두려움)
  { id: 'fear-1', text: '두려움을 이름 붙이면 작아진다.', mood: 'fear' },
  { id: 'fear-2', text: '용기는 두려움 속에서도 한 걸음 내딛는 것.', mood: 'fear' },
  { id: 'fear-3', text: '지금 이 순간에만 집중하자.', mood: 'fear' }
];

// ===== 분기형 퀴즈 질문 데이터 =====
const quizQuestions: Question[] = [
  {
    id: 1,
    text: '아침에 눈 떴을 때 어땠어?',
    options: [
      { id: '1a', text: '바로 깼어', value: 3, mood: 'joy', nextId: 2 },
      { id: '1b', text: '개운했어', value: 3, mood: 'joy', nextId: 2 },
      { id: '1c', text: '비몽사몽했어', value: 3, mood: 'tired', nextId: 3 },
      { id: '1d', text: '일어나기 힘들었어', value: 3, mood: 'tired', nextId: 3 }
    ]
  },
  {
    id: 2,
    text: '오늘 할 일 생각하면 기분이 어때?',
    options: [
      { id: '2a', text: '기대돼', value: 3, mood: 'joy', nextId: 4 },
      { id: '2c', text: '얼른 하고 싶어', value: 4, mood: 'pride', nextId: 4 },
      { id: '2b', text: '별 생각 없어', value: 4, mood: 'calm', nextId: 4 },
      { id: '2d', text: '조금 부담스러워', value: 4, mood: 'stressed', nextId: 10 },
      { id: '2e', text: '하기 싫어', value: 4, mood: 'boredom', nextId: 4 }
    ]
  },
  {
    id: 3,
    text: '왜 이렇게 피곤했을까?',
    options: [
      { id: '3a', text: '어제 늦게 잤어', value: 4, mood: 'tired', nextId: 12 },
      { id: '3b', text: '걱정거리가 많았어', value: 4, mood: 'stressed', nextId: 12 },
      { id: '3c', text: '사람들 만나고 에너지를 다 썼어', value: 3, mood: 'tired', nextId: 12 },
      { id: '3d', text: '그냥 피곤해', value: 4, mood: 'depression', nextId: 12 }
    ]
  },
  {
    id: 10,
    text: '어떤 점이 부담돼?',
    options: [
      { id: '10a', text: '해야 할 일이 많아서', value: 3, mood: 'stressed', nextId: 4 },
      { id: '10b', text: '시간이 촉박해서', value: 3, mood: 'stressed', nextId: 4 },
      { id: '10c', text: '사람을 상대해야 해서', value: 3, mood: 'stressed', nextId: 4 },
      { id: '10d', text: '잘해야 한다는 압박감', value: 3, mood: 'stressed', nextId: 4 }
    ]
  },
  {
    id: 4,
    text: '지금 뭐 하고 싶어?',
    options: [
      { id: '4a', text: '산책', value: 3, mood: 'calm', nextId: 5 },
      { id: '4b', text: '맛있는 거 먹기', value: 3, mood: 'joy', nextId: 5 },
      { id: '4c', text: '노래 듣기', value: 4, mood: 'tired', nextId: 5 },
      { id: '4d', text: '새로운 거 해보기', value: 4, mood: 'pride', nextId: 5 },
      { id: '4e', text: '멍때리기', value: 4, mood: 'boredom', nextId: 5 }
    ]
  },
  {
    id: 5,
    text: '사람 만나는 마음은?',
    options: [
      { id: '5a', text: '지금 만나고 싶어', value: 3, mood: 'joy', nextId: 8 },
      { id: '5b', text: '가벼운 만남은 괜찮아', value: 3, mood: 'calm', nextId: 8 },
      { id: '5c', text: '오늘은 혼자가 더 좋아', value: 4, mood: 'tired', nextId: 8 },
      { id: '5d', text: '아무도 만나고 싶지 않아', value: 4, mood: 'sadness', nextId: 8 }
    ]
  },
  {
    id: 6,
    text: '오늘은 어떤 음악이 좋아?',
    options: [
      { id: '6a', text: '신나는 곡', value: 3, mood: 'joy', nextId: 11 },
      { id: '6b', text: '잔잔한 곡', value: 3, mood: 'calm', nextId: 11 },
      { id: '6c', text: '자연 소리/화이트 노이즈', value: 4, mood: 'tired', nextId: 11 },
      { id: '6d', text: '실험적인 곡', value: 4, mood: 'pride', nextId: 11 }
    ]
  },
  {
    id: 7,
    text: '지금 끌리는 색감은?',
    options: [
      { id: '7a', text: '따뜻한 노랑/주황', value: 4, mood: 'joy' },
      { id: '7b', text: '시원한 파랑/민트', value: 4, mood: 'calm' },
      { id: '7c', text: '부드러운 보라/핑크', value: 4, mood: 'pride' },
      { id: '7d', text: '잔잔한 블루그레이', value: 4, mood: 'depression' },
      { id: '7e', text: '무채색 그레이', value: 4, mood: 'boredom' },
      { id: '7f', text: '짙은 남색/먹색', value: 4, mood: 'fear' }
    ]
  }
  ,
  {
    id: 8,
    text: '지금 걱정이나 불안이 있어?',
    options: [
      { id: '8a', text: '딱히 없어', value: 3, mood: 'calm', nextId: 6 },
      { id: '8b', text: '조금 불안해', value: 3, mood: 'fear', nextId: 6 },
      { id: '8c', text: '꽤 불안해', value: 4, mood: 'fear', nextId: 9 }
    ]
  },
  {
    id: 9,
    text: '어떤 불안이 더 가까워?',
    options: [
      { id: '9a', text: '실수할까봐 걱정돼', value: 4, mood: 'fear', nextId: 6 },
      { id: '9b', text: '사람과의 관계가 신경 쓰여', value: 4, mood: 'fear', nextId: 6 },
      { id: '9c', text: '특별한 이유 없이 불안해', value: 4, mood: 'fear', nextId: 6 },
      { id: '9d', text: '건강이 걱정돼', value: 4, mood: 'fear', nextId: 6 }
    ]
  },
  {
    id: 11,
    text: '지금 뭐가 끌려?',
    options: [
      { id: '11a', text: '지금은 없어', value: 4, mood: 'boredom', nextId: 7 },
      { id: '11b', text: '새로운 게 끌려', value: 4, mood: 'pride', nextId: 7 },
      { id: '11c', text: '편하게 쉬고 싶어', value: 3, mood: 'calm', nextId: 7 }
    ]
  },
  {
    id: 12,
    text: '요즘 마음은 어때?',
    options: [
      { id: '12d', text: '의욕이 올라', value: 4, mood: 'pride', nextId: 4 },
      { id: '12c', text: '그럭저럭 괜찮아', value: 3, mood: 'calm', nextId: 4 },
      { id: '12a', text: '조금 쓸쓸해', value: 4, mood: 'sadness', nextId: 4 },
      { id: '12b', text: '축처지고 무기력해', value: 4, mood: 'depression', nextId: 4 }
    ]
  }
];

// 분기 탐색을 위한 헬퍼
const quizMap: Record<number, Question> = Object.fromEntries(
  quizQuestions.map(q => [q.id, q])
);

export function getQuestionById(id: number): Question | undefined {
  return quizMap[id];
}

export function getFirstQuestionId(): number {
  return quizQuestions[0].id;
}

const longestPathMemo = new Map<number, number>();
export function getLongestPathLenFrom(id: number): number {
  if (longestPathMemo.has(id)) return longestPathMemo.get(id)!;
  const q = getQuestionById(id);
  if (!q) {
    longestPathMemo.set(id, 0);
    return 0;
  }
  const nextIds = Array.from(new Set(q.options.map(o => o.nextId).filter((n): n is number => typeof n === 'number')));
  if (nextIds.length === 0) {
    longestPathMemo.set(id, 1);
    return 1;
  }
  const len = 1 + Math.max(...nextIds.map(n => getLongestPathLenFrom(n)));
  longestPathMemo.set(id, len);
  return len;
}

// ===== 색상 관련 함수들 =====
export function generateMoodResult(answers: Answer[]): MoodResult {
  const questionWeights: Record<number, number> = {
    // 색감 질문(7)은 결과 색상 취향용으로만 사용: 점수 영향 0
    7: 0,
    12: 1.6,
    8: 1.2,
    9: 1.4,
    3: 1.4,
    10: 1.2,
    11: 1.2
  };

  const moodScores: Record<MoodType, number> = {
    joy: 0,
    sadness: 0,
    depression: 0,
    stressed: 0,
    calm: 0,
    pride: 0,
    boredom: 0,
    tired: 0,
    fear: 0
  };

  answers.forEach(answer => {
    const mood = answer.selectedOption.mood;
    const baseValue = answer.selectedOption.value;
    const weight = questionWeights[answer.questionId] ?? 1;
    moodScores[mood] += baseValue * weight;
  });

  const entries = Object.entries(moodScores) as Array<[MoodType, number]>;
  entries.sort((a, b) => b[1] - a[1]);

  const topScore = entries[0][1];
  const topMoods = entries.filter(([, score]) => Math.abs(score - topScore) < 1e-6).map(([m]) => m);
  // 마지막 타이브레이크는 색감(7) 제외하고 계산
  const excludedForTie = new Set<number>([7]);
  const significantAnswers = answers.filter(a => !excludedForTie.has(a.questionId));
  const lastAnswerMood = significantAnswers[significantAnswers.length - 1]?.selectedOption.mood
    ?? answers[answers.length - 1]?.selectedOption.mood;

  const primaryMood: MoodType = topMoods.includes(lastAnswerMood as MoodType)
    ? (lastAnswerMood as MoodType)
    : topMoods[0];

  const secondaryMood: MoodType = entries
    .filter(([m]) => m !== primaryMood)
    .sort((a, b) => b[1] - a[1])[0]?.[0] ?? primaryMood;
  const primaryColor = moodColors[primaryMood];

  return {
    primaryMood,
    secondaryMood,
    color: primaryColor.primary,
    gradient: primaryColor.gradient,
    description: primaryColor.description,
    date: getTodayYYYYMMDD()
  };
}

export function getMoodColorInfo(mood: MoodType) {
  return moodColors[mood];
}

// ===== 할일 관련 함수들 =====
export function getMoodTask(mood: string) {
  return moodTasks[mood as keyof typeof moodTasks] || '오늘 하루를 잘 보내기';
}

export function getMoodSelfCare(mood: string) {
  return moodSelfCare[mood as keyof typeof moodSelfCare] || '자신을 위한 시간 가지기';
}

// ===== 문구 관련 함수들 =====
export function getQuotesByMood(mood: MoodType): InspirationalQuote[] {
  return moodQuotes.filter(quote => quote.mood === mood);
}

export function getRandomQuoteByMood(mood: MoodType): InspirationalQuote | undefined {
  const quotes = getQuotesByMood(mood);
  if (quotes.length === 0) return undefined;
  
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

export function getAllQuotes(): InspirationalQuote[] {
  return moodQuotes;
}

// ===== 퀴즈 관련 함수들 =====
export function getQuizQuestions(): Question[] {
  return quizQuestions;
}

// ===== 타입 재export =====
export type { InspirationalQuote }; 
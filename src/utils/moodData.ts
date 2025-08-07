import type { Answer, MoodResult, MoodType, Question, InspirationalQuote } from '../types';
import { getTodayYYYYMMDD } from './dateUtils';

// ===== 기분별 색상 데이터 =====
const moodColors = {
  calm: {
    primary: '#64B5F6',
    secondary: '#42A5F5',
    gradient: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
    description: '차분한 하늘색'
  },
  happy: {
    primary: '#FFB74D',
    secondary: '#FF9800',
    gradient: 'linear-gradient(135deg, #FF9800 0%, #FF6F00 100%)',
    description: '따뜻한 주황색'
  },
  energetic: {
    primary: '#F06292',
    secondary: '#E91E63',
    gradient: 'linear-gradient(135deg, #EC407A 0%, #D81B60 100%)',
    description: '활기찬 분홍색'
  },
  peaceful: {
    primary: '#81C784',
    secondary: '#66BB6A',
    gradient: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
    description: '평화로운 초록색'
  },
  creative: {
    primary: '#AB47BC',
    secondary: '#9C27B0',
    gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
    description: '창의적인 보라색'
  },
  melancholy: {
    primary: '#90A4AE',
    secondary: '#78909C',
    gradient: 'linear-gradient(135deg, #78909C 0%, #607D8B 100%)',
    description: '사색적인 회색'
  }
};

// ===== 기분별 할일 데이터 =====
const moodTasks = {
  happy: '오늘 하루를 즐겁게 보내기',
  calm: '차분하게 마음을 정리하기',
  energetic: '새로운 일에 도전하기',
  peaceful: '자연과 함께하는 시간 가지기',
  creative: '창의적인 활동 해보기',
  melancholy: '조용한 시간을 가지며 생각하기'
};

const moodSelfCare = {
  happy: '좋아하는 음식 먹기',
  calm: '따뜻한 차 한 잔 마시기',
  energetic: '운동으로 에너지 발산하기',
  peaceful: '명상이나 요가 하기',
  creative: '그림 그리거나 글쓰기',
  melancholy: '좋아하는 음악 듣기'
};

// ===== 기분별 문구 데이터 =====
const moodQuotes: InspirationalQuote[] = [
  // 행복한 기분
  {
    id: 'happy-1',
    text: '행복한 일만 가득해져서 쉴 틈없이, 빈틈도 없이 우울하지 않게, 불안하지도 않게 하루 종일 행복할 수 있게.',
    mood: 'happy'
  },
  {
    id: 'happy-2',
    text: '내가 좋아하는 사람들이 행복만 가득했으면 좋겠어.\n내가 싫어하는 사람은 내 알 바 아니고!',
    mood: 'happy'
  },
  {
    id: 'happy-3',
    text: '모든 날이 다 좋지는 못해도 웃는 날이 많았으면 좋겠다.\n자주, 오래.',
    mood: 'happy'
  },
  {
    id: 'happy-4',
    text: '잘해왔고, 잘하고 있어.\n그리고 앞으로도 잘 해낼 거야.',
    mood: 'happy'
  },
  {
    id: 'happy-5',
    text: '행복이란, 저녁 때 돌아갈 집이 있다는 것.\n힘들 때 떠올릴 사람이 있다는 것.\n외로울 때 혼자서 부를 노래가 있다는 것.',
    mood: 'happy'
  },
  {
    id: 'happy-6',
    text: '하루의 끝에서 안부를 나눌 수 있는 사람이 있기를.\n좋은 일이 있을 때나 슬픈 일이 있을 때\n바로 찾을 수 있는 사람이 있기를.',
    mood: 'happy'
  },
  {
    id: 'happy-7',
    text: '행복이 뭐 별거인가.\n좋은 사람들과 함께 맛있는 밥을 먹을 수 있다면\n그걸로 된 거지.',
    mood: 'happy'
  },
  {
    id: 'happy-8',
    text: '오늘도 버텨내줘서 고마워.\n수고한 너에게 우울한 새벽이 아닌\n행복한 새벽을 선물할게.',
    mood: 'happy'
  },
  {
    id: 'happy-9',
    text: '있잖아,행복은\n내가 좋아하는 사람들, 내가 사랑하는 가족들과\n잔뜩 낭비하는 시간에 있는 거 같아.',
    mood: 'happy'
  },
  {
    id: 'happy-10',
    text: '우리는 완벽할 수 없고 완벽할 필요도 없어.\n너는 너 그대로일 때가 가장 아름다운 거야.',
    mood: 'happy'
  },
  {
    id: 'happy-11',
    text: '기분이 계속 안 좋으면 결국 나만 손해더라.\n생각해보면 사실 별 일 아니니까 너무 슬퍼하지 말자.',
    mood: 'happy'
  },
  {
    id: 'happy-12',
    text: '매일 특별하지 않아도 돼.\n살아간다는 것 자체가 특별한 거니까.\n작은 일에 소소하게 웃고 행복하게 살아가면 돼.',
    mood: 'happy'
  },
  {
    id: 'happy-13',
    text: '너에게는 예쁜 바람만 불기를.\n좋은 곳으로만 휩쓸리기를.\n마음을 적시는 비가 내리기를.\n행복만 가득 쌓이기를.\n예쁜 말만 소화할 수 있기를.',
    mood: 'happy'
  },
  {
    id: 'happy-14',
    text: '밤 9시 이후에 떠오르는 부정적인 생각은 절대로 믿지 마.\n아침이 오면 언제 그랬냐는 듯 기분이 괜찮아질 거야.',
    mood: 'happy'
  },
  {
    id: 'happy-15',
    text: '너의 하루는 너의 예상보다 잘 풀릴 거야.\n너는 잘 될 거고, 잘 할 거고, 잘 해낼 거야.',
    mood: 'happy'
  },

  // 차분한 기분
  {
    id: 'calm-1',
    text: '요즘은 싫은 사람을 애써 참지 않고\n우정이라는 단어에 큰 의미를 두지 않으려 해.\n그냥 적절한 순간에 적절한 사람들과 어울릴 뿐이지.',
    mood: 'calm'
  },
  {
    id: 'calm-2',
    text: '단단한 사람보다 유연한 사람이 되기를.\n당신을 흔드는 모든 바람에 잠시 흔들리되 부러지지는 않기를.\n때로는 바람을 타고 더 먼 곳까지 날 수 있기를.',
    mood: 'calm'
  },
  {
    id: 'calm-3',
    text: '너무 애쓰지도 너무 무뎌지지도 말고.\n물 흐르듯 자연스럽게, 그저 나답게 살기.',
    mood: 'calm'
  },
  {
    id: 'calm-4',
    text: '마음을 비워야지.\n가볍게 생각해야지.\n나를 짜증나게 하는 것들이 내 속에 계속 차오르더라도.',
    mood: 'calm'
  },
  {
    id: 'calm-5',
    text: '우리는 완벽할 수 없고 완벽할 필요도 없어.\n너는 너 그대로일 때가 가장 아름다운 거야.',
    mood: 'calm'
  },
  {
    id: 'calm-6',
    text: '너무 애쓰지도 너무 무뎌지지도 말고.\n물 흐르듯 자연스럽게 그저 나답게 살기.',
    mood: 'calm'
  },

  // 활기찬 기분
  {
    id: 'energetic-1',
    text: '난 이 세상에 잘 살려고 왔지.\n오래 살기만 하려고 온 게 아니야.\n그러니 내 맘대로 할래.',
    mood: 'energetic'
  },
  {
    id: 'energetic-2',
    text: '왜 너의 일생 전부를 너한테\n그리 중요하지도 않은 일에 쏟는 거지?\n모든 파도를 잡으려 하지 말고,\n정말 중요한 너의 파도를 잡아.',
    mood: 'energetic'
  },
  {
    id: 'energetic-3',
    text: '내가 이상한 사람인가 하는 생각이 들게 하는 사람 말고,\n나도 좋은 사람이구나라는 생각이 들게 하는 사람을 만나자.',
    mood: 'energetic'
  },
  {
    id: 'energetic-4',
    text: '우리는 완벽할 수 없고 완벽할 필요도 없어.\n너는 너 그대로일 때가 가장 아름다운 거야.',
    mood: 'energetic'
  },

  // 평화로운 기분
  {
    id: 'peaceful-1',
    text: '내 몸을 상하게 하면서까지 해내야 할 일은 없듯.\n내 마음을 아프게 하면서까지 지켜내야 할 관계는 없어.',
    mood: 'peaceful'
  },
  {
    id: 'peaceful-2',
    text: '요즘은 싫은 사람을 애써 참지 않고\n우정이라는 단어에 큰 의미를 두지 않으려 해.\n그냥 적절한 순간에 적절한 사람들과 어울릴 뿐이지.',
    mood: 'peaceful'
  },
  {
    id: 'peaceful-3',
    text: '단단한 사람보다 유연한 사람이 되기를.\n당신을 흔드는 모든 바람에 잠시 흔들리되 부러지지는 않기를.',
    mood: 'peaceful'
  },
  {
    id: 'peaceful-4',
    text: '마음을 비워야지.\n가볍게 생각해야지.\n나를 짜증나게 하는 것들이 내 속에 계속 차오르더라도.',
    mood: 'peaceful'
  },

  // 창의적인 기분
  {
    id: 'creative-1',
    text: '내가 이상한 사람인가 하는 생각이 들게 하는 사람 말고,\n나도 좋은 사람이구나라는 생각이 들게 하는 사람을 만나자.',
    mood: 'creative'
  },
  {
    id: 'creative-2',
    text: '왜 너의 일생 전부를 너한테\n그리 중요하지도 않은 일에 쏟는 거지?\n모든 파도를 잡으려 하지 말고,\n정말 중요한 너의 파도를 잡아.',
    mood: 'creative'
  },
  {
    id: 'creative-3',
    text: '난 이 세상에 잘 살려고 왔지.\n오래 살기만 하려고 온 게 아니야.\n그러니 내 맘대로 할래.',
    mood: 'creative'
  },
  {
    id: 'creative-4',
    text: '우리는 완벽할 수 없고 완벽할 필요도 없어.\n너는 너 그대로일 때가 가장 아름다운 거야.',
    mood: 'creative'
  },

  // 사색적인 기분
  {
    id: 'melancholy-1',
    text: '우리는 완벽할 수 없고 완벽할 필요도 없어.\n너는 너 그대로일 때가 가장 아름다운 거야.',
    mood: 'melancholy'
  },
  {
    id: 'melancholy-2',
    text: '요즘은 싫은 사람을 애써 참지 않고\n우정이라는 단어에 큰 의미를 두지 않으려 해.\n그냥 적절한 순간에 적절한 사람들과 어울릴 뿐이지.',
    mood: 'melancholy'
  },
  {
    id: 'melancholy-3',
    text: '마음을 비워야지.\n가볍게 생각해야지.\n나를 짜증나게 하는 것들이 내 속에 계속 차오르더라도.',
    mood: 'melancholy'
  },
  {
    id: 'melancholy-4',
    text: '내 몸을 상하게 하면서까지 해내야 할 일은 없듯.\n내 마음을 아프게 하면서까지 지켜내야 할 관계는 없어.',
    mood: 'melancholy'
  }
];

// ===== 퀴즈 질문 데이터 =====
const quizQuestions: Question[] = [
  {
    id: 1,
    text: "오늘 아침에 일어났을 때 기분은 어땠나요?",
    options: [
      { id: "1a", text: "깨어나자마자 기운이 넘쳐요", value: 4, mood: "energetic" },
      { id: "1b", text: "마음이 차분하고 여유로워요", value: 4, mood: "calm" },
      { id: "1c", text: "오늘 하루가 기대돼요", value: 4, mood: "happy" },
      { id: "1d", text: "마음이 무겁고 우울해요", value: 4, mood: "melancholy" }
    ]
  },
  {
    id: 2,
    text: "지금 이 순간, 가장 하고 싶은 일은 무엇인가요?",
    options: [
      { id: "2a", text: "지금 당장 어디든 떠나고 싶어요", value: 4, mood: "energetic" },
      { id: "2b", text: "맛있는 거 먹고 싶어요", value: 4, mood: "happy" },
      { id: "2c", text: "좋아하는 노래를 듣고 싶어요", value: 4, mood: "calm" },
      { id: "2d", text: "뭔가 새롭게 시작해보고 싶어요", value: 4, mood: "creative" }
    ]
  },
  {
    id: 3,
    text: "요즘 가장 마음에 드는 색깔은?",
    options: [
      { id: "3a", text: "따뜻한 노랑이나 주황", value: 4, mood: "happy" },
      { id: "3b", text: "시원한 파랑이나 민트", value: 4, mood: "calm" },
      { id: "3c", text: "자연 같은 초록", value: 4, mood: "peaceful" },
      { id: "3d", text: "몽환적인 보라나 핑크", value: 4, mood: "creative" }
    ]
  },
  {
    id: 4,
    text: "스트레스를 받을 때 주로 어떻게 해소하시나요?",
    options: [
      { id: "4a", text: "음악 크게 틀고 춤추기", value: 4, mood: "energetic" },
      { id: "4b", text: "조용히 앉아서 명상하기", value: 4, mood: "calm" },
      { id: "4c", text: "글을 쓰거나 그림 그리기", value: 4, mood: "creative" },
      { id: "4d", text: "산책하기", value: 4, mood: "peaceful" }
    ]
  },
  {
    id: 5,
    text: "지금 당신의 기분은 어떤가요?",
    options: [
      { id: "5a", text: "지금 기분이 아주 좋아요", value: 4, mood: "happy" },
      { id: "5b", text: "마음이 고요하고 편해요", value: 4, mood: "peaceful" },
      { id: "5c", text: "에너지가 넘쳐요", value: 4, mood: "energetic" },
      { id: "5d", text: "마음이 복잡하고 생각이 많아요", value: 4, mood: "melancholy" }
    ]
  },
  {
    id: 6,
    text: "오늘 하루를 어떻게 보내고 싶으신가요?",
    options: [
      { id: "6a", text: "활발하게 움직이며 보내고 싶어요", value: 4, mood: "energetic" },
      { id: "6b", text: "차분하게 여유롭게 보내고 싶어요", value: 4, mood: "calm" },
      { id: "6c", text: "즐겁고 편안하게 보내고 싶어요", value: 4, mood: "happy" },
      { id: "6d", text: "혼자만의 시간을 갖고 싶어요", value: 4, mood: "melancholy" }
    ]
  }
];

// ===== 색상 관련 함수들 =====
export function generateMoodResult(answers: Answer[]): MoodResult {
  const moodScores: Record<MoodType, number> = {
    calm: 0,
    happy: 0,
    energetic: 0,
    peaceful: 0,
    creative: 0,
    melancholy: 0
  };

  answers.forEach(answer => {
    const mood = answer.selectedOption.mood;
    const value = answer.selectedOption.value;
    moodScores[mood] += value;
  });

  const sortedMoods = Object.entries(moodScores)
    .sort(([,a], [,b]) => b - a)
    .map(([mood]) => mood as MoodType);

  const primaryMood = sortedMoods[0];
  const secondaryMood = sortedMoods[1];
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
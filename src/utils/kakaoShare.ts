// 카카오톡 SDK 타입 정의
declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: {
          objectType: 'feed';
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons?: Array<{
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }>;
        }) => void;
      };
    };
  }
}

const KAKAO_APP_KEY = '408e16fe2e0757337513c500970ce64f';

export function initKakao() {
  if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
    try {
      window.Kakao.init(KAKAO_APP_KEY);
      console.log('카카오 SDK 초기화 성공');
    } catch (error) {
      console.error('카카오 SDK 초기화 실패:', error);
    }
  }
}

// 카카오톡 공유하기
export async function shareToKakao(result: {
  description: string;
  gradient: string;
  date: string;
}) {
  if (!window.Kakao) {
    alert('카카오톡 공유를 사용할 수 없습니다.');
    return;
  }

  if (!window.Kakao.isInitialized()) {
    initKakao();
  }

  try {
    console.log('카카오톡 공유 시도:', {
      title: '🎨 오늘의 기분은 무슨 색일까?',
      description: result.description,
      link: window.location.origin
    });
    
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '🎨 오늘의 기분은 무슨 색일까?',
        description: result.description,
        imageUrl: `${window.location.origin}/vite.svg`,
        link: {
          mobileWebUrl: window.location.origin,
          webUrl: window.location.origin,
        },
      },
      buttons: [
        {
          title: '나도 테스트하기',
          link: {
            mobileWebUrl: window.location.origin,
            webUrl: window.location.origin,
          },
        },
      ],
    });
  } catch (error) {
    console.error('카카오톡 공유 실패 (Internal Server Error):', error);
    alert('카카오톡 공유에 실패했습니다. 카카오 개발자 콘솔에서 도메인 설정을 확인해주세요.');
  }
} 
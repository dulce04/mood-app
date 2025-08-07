import React, { useEffect, useRef } from 'react';
import { Share2, RotateCcw, Calendar, Download } from 'lucide-react';
import { Button } from '../components/Button';
import { MusicRecommendation } from '../components/MusicRecommendation';
import { InspirationalQuoteComponent, type InspirationalQuoteRef } from '../components/InspirationalQuote';
import { useMoodStore } from '../store/moodStore';
import { getMoodTask, getMoodSelfCare } from '../utils/moodData';

import { shareToKakao, initKakao } from '../utils/kakaoShare';
import type { MoodEntry } from '../types';

interface ResultPageProps {
  onRestart: () => void;
  onShowCalendar: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ onRestart, onShowCalendar }) => {
  const { result, addMoodEntry } = useMoodStore();
  const quoteRef = useRef<InspirationalQuoteRef>(null);



  useEffect(() => {
    if (result) {
      const entry: MoodEntry = {
        id: Date.now().toString(),
        date: result.date,
        result
      };
      addMoodEntry(entry);
    }
    initKakao();
  }, [result, addMoodEntry]);

  if (!result) {
    return (
      <div className="center">
        <div className="glass-card">
          <p>결과를 생성하는 중...</p>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (result) {
      try {
        await shareToKakao(result);
      } catch (error) {
        console.error('공유 실패:', error);
      }
    }
  };

  const handleSaveImage = async () => {
    if (result) {
      try {
        // 현재 화면에 표시된 문구 가져오기
        const inspirationalQuote = quoteRef.current?.getCurrentQuote();
        
        // Spotify API에서 음악 리스트 가져오기
        let musicTracks: Array<{name: string; artists: Array<{name: string}>}> = [];
        try {
          const { searchMoodTracks } = await import('../utils/spotifyApi');
          musicTracks = await searchMoodTracks(result.primaryMood);
        } catch (error) {
          console.log('음악 리스트 로드 실패:', error);
        }
        
        // 스토리용 전용 컨테이너 생성
        const storyContainer = document.createElement('div');
        storyContainer.style.cssText = `
          position: fixed;
          top: -9999px;
          left: -9999px;
          width: 1080px;
          height: 1920px;
          background: ${result.gradient};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          z-index: -1;
          color: white;
          text-align: center;
          padding: 80px 60px;
        `;

        // 스토리용 내용 추가
        storyContainer.innerHTML = `
          <div style="
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border-radius: 32px;
            padding: 80px 60px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 900px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 60px;
          ">
            <div>
              <h1 style="
                font-size: 47px;
                font-weight: 700;
                margin: 0 0 24px 0;
                line-height: 1.2;
              ">
                당신의 오늘은 ${result.description}이에요!
              </h1>
              
              <p style="
                font-size: 38px;
                margin: 0;
                opacity: 0.8;
                font-weight: 400;
              ">
                ${new Date(result.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            ${musicTracks.length > 0 ? `
            <div style="
              background: rgba(255, 255, 255, 0.1);
              border-radius: 24px;
              padding: 40px;
            ">
              <h3 style="
                font-size: 42px;
                font-weight: 700;
                margin: 0 0 24px 0;
                display: flex;
                align-items: center;
                gap: 12px;
                justify-content: center;
              ">
                🎵 음악 추천
              </h3>
              <div style="
                display: flex;
                flex-direction: column;
                gap: 16px;
              ">
                ${musicTracks.slice(0, 3).map(track => `
                  <div style="
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 20px;
                    text-align: left;
                  ">
                    <div style="
                      font-size: 34px;
                      font-weight: 600;
                      margin-bottom: 6px;
                      line-height: 1.3;
                    ">
                      ${track.name}
                    </div>
                    <div style="
                      font-size: 30px;
                      opacity: 0.8;
                      line-height: 1.2;
                    ">
                      ${track.artists.map((artist: {name: string}) => artist.name).join(', ')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            ` : ''}

            <div style="
              background: rgba(255, 255, 255, 0.1);
              border-radius: 24px;
              padding: 36px;
            ">
              <h3 style="
                font-size: 42px;
                font-weight: 700;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                gap: 12px;
              ">
                ✨ 오늘 할일
              </h3>
              <div style="
                display: flex;
                flex-direction: column;
                gap: 16px;
              ">
                <div style="
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 16px;
                  padding: 20px;
                  display: flex;
                  align-items: center;
                  gap: 16px;
                ">
                  <span style="
                    font-size: 36px;
                    opacity: 0.8;
                  ">☀️</span>
                  <span style="
                    font-size: 36px;
                    font-weight: 500;
                    line-height: 1.3;
                  ">${getMoodTask(result.primaryMood)}</span>
                </div>
                <div style="
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 16px;
                  padding: 20px;
                  display: flex;
                  align-items: center;
                  gap: 16px;
                ">
                  <span style="
                    font-size: 36px;
                    opacity: 0.8;
                  ">💝</span>
                  <span style="
                    font-size: 36px;
                    font-weight: 500;
                    line-height: 1.3;
                  ">${getMoodSelfCare(result.primaryMood)}</span>
                </div>
              </div>
            </div>

            ${inspirationalQuote ? `
            <div style="
              background: rgba(255, 255, 255, 0.1);
              border-radius: 24px;
              padding: 36px;
            ">
              <h3 style="
                font-size: 42px;
                font-weight: 700;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 0;
              ">
                💭 오늘의 문구
              </h3>
              <p style="
                font-size: 36px;
                font-style: italic;
                line-height: 1.5;
                opacity: 0.95;
                font-weight: 400;
                white-space: pre-line;
              ">
                ${inspirationalQuote.text}
              </p> 
            </div>
            ` : ''}
          </div>
        `;

        // DOM에 추가
        document.body.appendChild(storyContainer);

        // 이미지 캡처
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(storyContainer, {
          width: 1080,
          height: 1920,
          useCORS: true,
          allowTaint: true,
          logging: false
        });

        // DOM에서 제거
        document.body.removeChild(storyContainer);

        // 이미지 다운로드 - 모바일에서 갤러리로 바로 저장
        const imageUrl = canvas.toDataURL('image/png', 1.0);
        
        // dataURL을 File 객체로 변환
        const arr = imageUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = window.atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        
        const file = new File([u8arr], `오늘의_기분_${result.date}.png`, { type: mime });
        const blobUrl = URL.createObjectURL(file);
        
        // 모바일/데스크톱 분기 처리
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
          // 모바일: Web Share API 시도 (모든 모바일에서)
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                title: '나의 오늘 기분은?',
                files: [file]
              });
            } catch {
              // Web Share API 실패시 모달로 표시
              showImageModal();
            }
          } else {
            // Web Share API 미지원시 모달로 표시
            showImageModal();
          }
          
          function showImageModal() {
            // 화면에 꽉 차는 모달
            const reader = new FileReader();
            reader.onload = function(e) {
              const dataUrl = e.target?.result as string;
              
              const imgElement = document.createElement('img');
              imgElement.src = dataUrl;
              imgElement.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                object-fit: contain;
                z-index: 9999;
              `;
              
              const closeButton = document.createElement('button');
              closeButton.textContent = '✕';
              closeButton.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(255,255,255,0.9);
                border: none;
                border-radius: 50%;
                width: 25px;
                height: 25px;
                font-size: 20px;
                color: black;
                z-index: 10000;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
              `;
              
              const closeModal = () => {
                document.body.removeChild(imgElement);
                document.body.removeChild(closeButton);
                setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
              };
              
              closeButton.onclick = closeModal;
              
              document.body.appendChild(imgElement);
              document.body.appendChild(closeButton);
            };
            reader.readAsDataURL(file);
          }
          

        } else {
          // 데스크톱: 일반 다운로드
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = file.name;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      } catch (error) {
        console.error('이미지 저장 실패:', error);
      }
    }
  };

  return (
    <div className="center result-page" style={{ 
      background: result.gradient,
      minHeight: '100vh',
      color: 'white'
    }}>
      <div className="container">
        {/* 결과 헤더 */}
        <div className="result-header">
          <h1 className="result-title">
            당신의 오늘은 {result.description}이에요!
          </h1>
          <p className="result-date">
            {new Date(result.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* 음악 추천 */}
        <MusicRecommendation mood={result.primaryMood} />

        {/* 오늘 할일 */}
        <div className="glass-card tasks-section">
          <h3 className="tasks-title">
            ✨ 오늘 할일
          </h3>
          <div className="tasks-list">
            <div className="task-item">
              <span className="task-icon">☀️</span>
              <span className="task-text">
                {getMoodTask(result.primaryMood)}
              </span>
            </div>
            <div className="task-item">
              <span className="task-icon">💝</span>
              <span className="task-text">
                {getMoodSelfCare(result.primaryMood)}
              </span>
            </div>
          </div>
        </div>

        {/* 감성 문구 */}
        <InspirationalQuoteComponent 
          mood={result.primaryMood} 
          ref={quoteRef}
        />

        {/* 버튼들 */}
        <div className="result-actions">
          <div className="action-row">
            <Button 
              onClick={handleShare} 
            >
              <Share2 size={18} />
              공유하기
            </Button>

            <Button 
              onClick={handleSaveImage} 
            >
              <Download size={18} />
              저장하기
            </Button>
          </div>

          <div className="action-row">
            <Button onClick={onShowCalendar} variant="secondary">
              <Calendar size={18} />
              기분 캘린더
            </Button>

            <Button onClick={onRestart} variant="secondary">
              <RotateCcw size={18} />
              다시하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
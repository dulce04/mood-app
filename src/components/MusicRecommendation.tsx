import React, { useState, useEffect } from 'react';
import { Play, Loader } from 'lucide-react';
import { Button } from './Button';
import { searchMoodTracks } from '../utils/spotifyApi';
import type { SpotifyTrack, MoodType } from '../types';

interface MusicRecommendationProps {
  mood: MoodType;
}

export const MusicRecommendation: React.FC<MusicRecommendationProps> = ({ mood }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);

  useEffect(() => {
    loadSpotifyData();
  }, [mood]);

  const loadSpotifyData = async () => {
    setIsLoading(true);
    try {
      const searchTracks = await searchMoodTracks(mood);
      setTracks(searchTracks);
    } catch (error) {
      console.error('음악 데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMoodEmoji = (mood: MoodType) => {
    const emojis: Record<MoodType, string> = {
      joy: '🎉',
      sadness: '🌧️',
      depression: '🌫️',
      stressed: '⚠️',
      calm: '🌙',
      pride: '🏆',
      boredom: '😶',
      tired: '😴',
      fear: '😨'
    };
    return emojis[mood];
  };

  const getMoodTitle = (mood: MoodType) => {
    const titles: Record<MoodType, string> = {
      joy: '신나는 하루 시작',
      sadness: '마음 토닥이는 노래',
      depression: '무기력한 날의 위로',
      stressed: '긴장 풀어주는 사운드',
      calm: '차분한 휴식',
      pride: '자신감 충전 플레이리스트',
      boredom: '심심함 달래기',
      tired: '피곤함 내려놓기',
      fear: '불안 잠재우는 멜로디'
    };
    return titles[mood];
  };

  const getMoodDescription = (mood: MoodType) => {
    const descriptions: Record<MoodType, string> = {
      joy: '기분 좋은 하루를 위한 신나는 곡들',
      sadness: '서글픈 마음을 다독이는 따뜻한 곡들',
      depression: '가라앉은 마음을 붙잡아 주는 잔잔한 곡들',
      stressed: '어깨를 가볍게 해주는 편안한 리듬',
      calm: '마음을 차분하게 만드는 평온한 사운드',
      pride: '뿌듯함을 더 오래 느끼게 하는 웅장한 곡들',
      boredom: '호기심을 깨우는 색다른 플레이리스트',
      tired: '지친 하루를 부드럽게 감싸는 곡들',
      fear: '불안한 마음을 안정시키는 따뜻한 선율'
    };
    return descriptions[mood];
  };

  return (
    <div className="music-recommendation">
      <div className="music-header">
        <div className="music-cover">
          <span className="music-emoji">{getMoodEmoji(mood)}</span>
        </div>
        <div className="music-info">
          <h3 className="music-title">{getMoodTitle(mood)}</h3>
          <p className="music-description">{getMoodDescription(mood)}</p>
        </div>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '접기' : '펼치기'}
        </Button>
      </div>

      {isExpanded && (
        <div className="music-tracks">
          {isLoading ? (
            <div className="loading-container">
              <Loader className="loading-spinner" />
              <span>음악을 찾는 중...</span>
            </div>
          ) : tracks.length > 0 ? (
            <div className="tracks-list">
              {tracks.map((track) => (
                <div key={track.id} className="track-item">
                  <div className="track-info">
                    <h4 className="track-name">{track.name}</h4>
                    <p className="track-artist">
                      {track.artists.map((artist) => artist.name).join(', ')}
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => window.open(track.external_urls.spotify, '_blank')}
                  >
                    <Play size={16} />
                    듣기
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-tracks">추천할 음악을 찾을 수 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}; 
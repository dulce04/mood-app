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
    const emojis = {
      happy: '🎵',
      calm: '🌙',
      energetic: '⚡',
      peaceful: '🌿',
      creative: '🎨',
      melancholy: '🌅'
    };
    return emojis[mood] || '🎵';
  };

  const getMoodTitle = (mood: MoodType) => {
    const titles = {
      happy: '신나는 하루 시작',
      calm: '조용한 밤의 위로',
      energetic: '에너지 충전 댄스',
      peaceful: '자연의 평화',
      creative: '창작의 영감',
      melancholy: '감성에 젖는 새벽'
    };
    return titles[mood] || '기분에 맞는 음악';
  };

  const getMoodDescription = (mood: MoodType) => {
    const descriptions = {
      happy: '기분 좋은 하루를 위한 신나는 곡들',
      calm: '마음을 차분하게 해주는 편안한 곡들',
      energetic: '에너지를 불어넣는 활기찬 곡들',
      peaceful: '마음을 평화롭게 해주는 힐링 곡들',
      creative: '창의력을 자극하는 영감을 주는 곡들',
      melancholy: '깊이 있는 감성을 담은 곡들'
    };
    return descriptions[mood] || '당신의 기분에 맞는 음악을 추천해드려요';
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
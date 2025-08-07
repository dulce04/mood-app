const SPOTIFY_CLIENT_ID = "34d94ead51f74ad78015e8bc95c4e2f2";
const SPOTIFY_CLIENT_SECRET = "2c133f917004484e9f7ac1a41b02b825";

import type { SpotifyTrack } from '../types';

export const getSpotifyToken = async (): Promise<string> => {
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: SPOTIFY_CLIENT_ID,
    client_secret: SPOTIFY_CLIENT_SECRET
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });

  
  if (!res.ok) {
    throw new Error('Spotify 토큰 발급 실패');
  }

  const { access_token: token } = await res.json();
  return token;
};

// 기분에 맞는 곡 검색
export const searchMoodTracks = async (mood: string): Promise<SpotifyTrack[]> => {
  try {
    // 토큰 발급
    const token = await getSpotifyToken();
    
    // 기분별 검색 키워드
    const keywords = {
      happy: 'happy upbeat kpop',
      calm: 'calm peaceful korean',
      energetic: 'energetic dance kpop',
      peaceful: 'nature peaceful korean',
      creative: 'creative artistic korean',
      melancholy: 'melancholy sad korean'
    };
    
    const query = keywords[mood as keyof typeof keywords] || 'korean music';
    
    // Spotify API 요청
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5&market=KR`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    if (!res.ok) {
      throw new Error('Spotify API 요청 실패');
    }

    const data = await res.json();
    return data.tracks.items;
  } catch (error) {
    console.error('Spotify API 실패:', error);
    return [];
  }
};
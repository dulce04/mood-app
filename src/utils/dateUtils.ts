/**
 * Date 객체를 로컬 시간대 기준으로 YYYY-MM-DD 형식의 문자열로 변환
 * @param date - 변환할 Date 객체 (기본값: 현재 시간)
 * @returns YYYY-MM-DD 형식의 날짜 문자열
 */
export function dateToYYYYMMDD(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 현재 날짜를 로컬 시간대 기준으로 YYYY-MM-DD 형식으로 반환
 * @returns 오늘 날짜 문자열 (YYYY-MM-DD)
 */
export function getTodayYYYYMMDD(): string {
  return dateToYYYYMMDD(new Date());
} 
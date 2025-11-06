export interface PostLike {
  id: number;
  title: string;
}

export function filterByLength<T extends PostLike>(posts: T[], minLength: number, maxLength?: number): T[] {
  const min = Number.isFinite(minLength) ? minLength : 0;
  const hasMax = typeof maxLength === 'number' && Number.isFinite(maxLength);
  return posts.filter((p) => {
    const len = (p.title || '').length;
    if (hasMax) {
      return len >= min && len <= (maxLength as number);
    }
    return len >= min;
  });
}




import { describe, expect, it } from 'vitest';
import { calculateStats } from '@/lib/firebase';

describe('calculateStats', () => {
  it('computes per-model win counts', () => {
    const submissions = [
      { name: 'A', email: 'a@example.com', sentence_id: 's1', naturalness_preferred: 'm1', accuracy_preferred: 'm2' },
      { name: 'B', email: 'b@example.com', sentence_id: 's2', naturalness_preferred: 'm1', accuracy_preferred: 'm1' },
      { name: 'C', email: 'c@example.com', sentence_id: 's3', naturalness_preferred: 'm2', accuracy_preferred: 'm2' },
    ];

    const stats = calculateStats(submissions);
    const m1 = stats.find((item) => item.model === 'm1');
    const m2 = stats.find((item) => item.model === 'm2');

    expect(m1).toMatchObject({
      model: 'm1',
      naturalness_wins: 2,
      accuracy_wins: 1,
      total_comparisons: 3,
    });

    expect(m2).toMatchObject({
      model: 'm2',
      naturalness_wins: 1,
      accuracy_wins: 2,
      total_comparisons: 3,
    });
  });
});

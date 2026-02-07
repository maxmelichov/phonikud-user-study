import { Button } from './ui/button';
import { Label } from './ui/label';
import { cn } from '../lib/utils';

interface RatingInputProps {
  naturalness?: 'A' | 'B';
  accuracy?: 'A' | 'B';
  onNaturalnessChange: (value: 'A' | 'B') => void;
  onAccuracyChange: (value: 'A' | 'B') => void;
  className?: string;
}

function ToggleRow({
  title,
  value,
  onChange
}: {
  title: string;
  value?: 'A' | 'B';
  onChange: (v: 'A' | 'B') => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold block text-center">{title}</Label>
      <div className="flex justify-center gap-4">
        {(['A', 'B'] as const).map(option => (
          <Button
            key={option}
            type="button"
            variant={value === option ? 'default' : 'outline'}
            size="lg"
            className={cn(
              "min-w-[80px] text-lg font-bold",
              value === option && "ring-2 ring-offset-2 ring-slate-900"
            )}
            onClick={() => onChange(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function RatingInput({
  naturalness,
  accuracy,
  onNaturalnessChange,
  onAccuracyChange,
  className
}: RatingInputProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <ToggleRow
        title="מה נשמע יותר טבעי?"
        value={naturalness}
        onChange={onNaturalnessChange}
      />
      <ToggleRow
        title="מה יותר תואם לטקסט?"
        value={accuracy}
        onChange={onAccuracyChange}
      />
    </div>
  );
}

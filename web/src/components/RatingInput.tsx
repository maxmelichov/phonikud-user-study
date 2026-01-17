import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { cn } from '../lib/utils';

interface RatingInputProps {
  label: string; // e.g., "A", "B", "C", "D"
  naturalness: number;
  accuracy: number;
  onNaturalnessChange: (value: number) => void;
  onAccuracyChange: (value: number) => void;
  className?: string;
}

export function RatingInput({
  label,
  naturalness,
  accuracy,
  onNaturalnessChange,
  onAccuracyChange,
  className
}: RatingInputProps) {
  const ratingOptions = [1, 2, 3, 4, 5];

  return (
    <div className={cn("p-4 border rounded-lg bg-white space-y-6", className)}>
      <div className="text-xl font-bold text-center mb-2">דגימה {label}</div>
      
      {/* Naturalness Rating */}
      <div className="space-y-3">
        <Label className="text-base font-semibold block text-center">טבעיות הדיבור</Label>
        
        <RadioGroup 
          value={naturalness.toString()} 
          onValueChange={(value) => onNaturalnessChange(parseInt(value))}
          className="flex justify-center gap-4"
        >
          {ratingOptions.map((rating) => (
            <div key={rating} className="flex flex-col items-center gap-1">
              <RadioGroupItem value={rating.toString()} id={`${label}-nat-${rating}`} />
              <Label htmlFor={`${label}-nat-${rating}`} className="cursor-pointer text-sm">
                {rating}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <div className="flex justify-between text-xs text-slate-500">
          <span>1 - לא טבעי</span>
          <span>5 - טבעי מאוד</span>
        </div>
      </div>

      {/* Accuracy Rating */}
      <div className="space-y-3">
        <Label className="text-base font-semibold block text-center">דיוק ההגייה</Label>
        
        <RadioGroup 
          value={accuracy.toString()} 
          onValueChange={(value) => onAccuracyChange(parseInt(value))}
          className="flex justify-center gap-4"
        >
          {ratingOptions.map((rating) => (
            <div key={rating} className="flex flex-col items-center gap-1">
              <RadioGroupItem value={rating.toString()} id={`${label}-acc-${rating}`} />
              <Label htmlFor={`${label}-acc-${rating}`} className="cursor-pointer text-sm">
                {rating}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <div className="flex justify-between text-xs text-slate-500">
          <span>1 - לא מדויק</span>
          <span>5 - מדויק מאוד</span>
        </div>
      </div>
    </div>
  );
}

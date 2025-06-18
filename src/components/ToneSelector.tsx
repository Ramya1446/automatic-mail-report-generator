
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Tone = 'formal' | 'casual' | 'professional' | 'friendly' | 'urgent';

interface ToneSelectorProps {
  tone: Tone;
  onToneChange: (tone: Tone) => void;
}

export const ToneSelector: React.FC<ToneSelectorProps> = ({
  tone,
  onToneChange,
}) => {
  return (
    <div className="space-y-2">
      <Label>Tone</Label>
      <Select value={tone} onValueChange={(value: Tone) => onToneChange(value)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="formal">Formal</SelectItem>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="casual">Casual</SelectItem>
          <SelectItem value="friendly">Friendly</SelectItem>
          <SelectItem value="urgent">Urgent</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

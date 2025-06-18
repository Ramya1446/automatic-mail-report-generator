
import React from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ContentTypeSelector } from './ContentTypeSelector';
import { ToneSelector } from './ToneSelector';

type ContentType = 'email' | 'report';
type Tone = 'formal' | 'casual' | 'professional' | 'friendly' | 'urgent';

interface InputFormProps {
  contentType: ContentType;
  tone: Tone;
  subject: string;
  recipient: string;
  bulletPoints: string;
  isGenerating: boolean;
  onContentTypeChange: (type: ContentType) => void;
  onToneChange: (tone: Tone) => void;
  onSubjectChange: (subject: string) => void;
  onRecipientChange: (recipient: string) => void;
  onBulletPointsChange: (points: string) => void;
  onGenerate: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  contentType,
  tone,
  subject,
  recipient,
  bulletPoints,
  isGenerating,
  onContentTypeChange,
  onToneChange,
  onSubjectChange,
  onRecipientChange,
  onBulletPointsChange,
  onGenerate,
}) => {
  return (
    <div className="space-y-6">
      <ContentTypeSelector
        contentType={contentType}
        onContentTypeChange={onContentTypeChange}
      />

      <ToneSelector
        tone={tone}
        onToneChange={onToneChange}
      />

      <div className="space-y-2">
        <Label>{contentType === 'email' ? 'Subject' : 'Report Title'}</Label>
        <Input
          placeholder={contentType === 'email' ? 'Email subject...' : 'Report title...'}
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
        />
      </div>

      {contentType === 'email' && (
        <div className="space-y-2">
          <Label>Recipient</Label>
          <Input
            placeholder="Recipient name..."
            value={recipient}
            onChange={(e) => onRecipientChange(e.target.value)}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Key Points (one per line)</Label>
        <Textarea
          placeholder="Enter your bullet points here, one per line..."
          value={bulletPoints}
          onChange={(e) => onBulletPointsChange(e.target.value)}
          rows={8}
          className="resize-none"
        />
      </div>

      <Button
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full transition-all duration-200 hover:scale-105"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="h-4 w-4 mr-2" />
            Generate {contentType === 'email' ? 'Email' : 'Report'}
          </>
        )}
      </Button>
    </div>
  );
};

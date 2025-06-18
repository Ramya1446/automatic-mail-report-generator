
import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { InputForm } from './InputForm';
import { ContentPreview } from './ContentPreview';
import { generateContent } from '@/utils/contentGenerator';

type ContentType = 'email' | 'report';
type Tone = 'formal' | 'casual' | 'professional' | 'friendly' | 'urgent';

export const EmailReportGenerator = () => {
  const [contentType, setContentType] = useState<ContentType>('email');
  const [tone, setTone] = useState<Tone>('professional');
  const [subject, setSubject] = useState('');
  const [recipient, setRecipient] = useState('');
  const [bulletPoints, setBulletPoints] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateContent = () => {
    if (!bulletPoints.trim()) {
      toast({
        title: "Missing Information",
        description: "Please add some bullet points to generate content.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      const content = generateContent({
        contentType,
        tone,
        subject,
        recipient,
        bulletPoints,
      });
      
      setGeneratedContent(content);
      setIsGenerating(false);
      
      toast({
        title: "Content Generated!",
        description: `Your ${contentType} has been successfully generated.`,
      });
    }, 1500);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-full">
      {/* Input Section */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Content Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InputForm
            contentType={contentType}
            tone={tone}
            subject={subject}
            recipient={recipient}
            bulletPoints={bulletPoints}
            isGenerating={isGenerating}
            onContentTypeChange={setContentType}
            onToneChange={setTone}
            onSubjectChange={setSubject}
            onRecipientChange={setRecipient}
            onBulletPointsChange={setBulletPoints}
            onGenerate={handleGenerateContent}
          />
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card className="animate-slide-in">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <ContentPreview
            contentType={contentType}
            tone={tone}
            generatedContent={generatedContent}
          />
        </CardContent>
      </Card>
    </div>
  );
};

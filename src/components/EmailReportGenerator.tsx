
import React, { useState, useEffect } from 'react';
import { Copy, Download, Mail, FileText, Wand2, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type ContentType = 'email' | 'report';
type Tone = 'formal' | 'casual' | 'professional' | 'friendly' | 'urgent';

export const EmailReportGenerator = () => {
  const [contentType, setContentType] = useState<ContentType>('email');
  const [tone, setTone] = useState<Tone>('professional');
  const [subject, setSubject] = useState('');
  const [recipient, setRecipient] = useState('');
  const [bulletPoints, setBulletPoints] = useState('');
  const [masterPrompt, setMasterPrompt] = useState('');
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateContent = () => {
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
      const points = bulletPoints.split('\n').filter(point => point.trim());
      
      if (contentType === 'email') {
        const emailContent = generateEmail(points, tone, subject, recipient, masterPrompt);
        setGeneratedContent(emailContent);
      } else {
        const reportContent = generateReport(points, tone, subject, masterPrompt);
        setGeneratedContent(reportContent);
      }
      
      setIsGenerating(false);
      
      toast({
        title: "Content Generated!",
        description: `Your ${contentType} has been successfully generated.`,
      });
    }, 1500);
  };

  const generateEmail = (points: string[], tone: Tone, subject: string, recipient: string, customPrompt: string) => {
    const greetings = {
      formal: 'Dear',
      casual: 'Hi',
      professional: 'Dear',
      friendly: 'Hello',
      urgent: 'Dear'
    };

    const closings = {
      formal: 'Sincerely',
      casual: 'Best',
      professional: 'Best regards',
      friendly: 'Warm regards',
      urgent: 'Urgently'
    };

    const introLines = {
      formal: 'I hope this email finds you well. I am writing to inform you about the following matters:',
      casual: 'Hope you\'re doing well! I wanted to update you on a few things:',
      professional: 'I hope this message finds you well. I would like to provide you with an update on the following items:',
      friendly: 'I hope you\'re having a great day! I wanted to share some updates with you:',
      urgent: 'I am writing to bring to your immediate attention the following critical matters:'
    };

    let content = `Subject: ${subject || 'Important Update'}

${greetings[tone]} ${recipient || '[Recipient Name]'},

${introLines[tone]}`;

    // Apply custom prompt modifications if provided
    if (customPrompt.trim()) {
      content += `\n\n[Note: Generated with custom instructions: "${customPrompt.trim()}"]`;
    }

    content += `\n\n${points.map(point => `• ${point.trim()}`).join('\n')}

Please let me know if you have any questions or need further clarification on any of these points.

${closings[tone]},
[Your Name]`;

    return content;
  };

  const generateReport = (points: string[], tone: Tone, title: string, customPrompt: string) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const introLines = {
      formal: 'This report presents a comprehensive overview of the following key points and findings:',
      casual: 'Here\'s a quick rundown of the main points covered:',
      professional: 'This document outlines the key findings and important information regarding:',
      friendly: 'This friendly report covers the following important topics:',
      urgent: 'This urgent report highlights critical issues that require immediate attention:'
    };

    let content = `${title || 'Executive Report'}
Generated on: ${dateStr}`;

    // Apply custom prompt modifications if provided
    if (customPrompt.trim()) {
      content += `\nCustom Instructions Applied: ${customPrompt.trim()}`;
    }

    content += `\n\nEXECUTIVE SUMMARY
${introLines[tone]}

KEY POINTS:
${points.map((point, index) => `${index + 1}. ${point.trim()}`).join('\n')}

CONCLUSION:
The points outlined above represent the current status and key findings. Further action may be required based on the nature of these items.

---
Report generated by ContentCraft`;

    return content;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      toast({
        title: "Copied!",
        description: "Content has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadAsPDF = () => {
    toast({
      title: "PDF Generation",
      description: "PDF download feature would be implemented with backend integration.",
    });
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
        <CardContent className="space-y-6">
          {/* Content Type Toggle */}
          <div className="space-y-2">
            <Label>Content Type</Label>
            <div className="flex gap-2">
              <Button
                variant={contentType === 'email' ? 'default' : 'outline'}
                onClick={() => setContentType('email')}
                className="flex-1 transition-all duration-200"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                variant={contentType === 'report' ? 'default' : 'outline'}
                onClick={() => setContentType('report')}
                className="flex-1 transition-all duration-200"
              >
                <FileText className="h-4 w-4 mr-2" />
                Report
              </Button>
            </div>
          </div>

          {/* Tone Selection */}
          <div className="space-y-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={(value: Tone) => setTone(value)}>
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

          {/* Subject/Title */}
          <div className="space-y-2">
            <Label>{contentType === 'email' ? 'Subject' : 'Report Title'}</Label>
            <Input
              placeholder={contentType === 'email' ? 'Email subject...' : 'Report title...'}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Recipient (Email only) */}
          {contentType === 'email' && (
            <div className="space-y-2">
              <Label>Recipient</Label>
              <Input
                placeholder="Recipient name..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
          )}

          {/* Master Prompting Section */}
          <Collapsible open={isPromptOpen} onOpenChange={setIsPromptOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-2 h-auto border border-dashed border-primary/30 hover:border-primary/50 transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Master Prompting</span>
                  <Badge variant="secondary" className="text-xs">Advanced</Badge>
                </div>
                {isPromptOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <Label className="text-xs text-muted-foreground">
                Provide custom instructions to fine-tune how your content is generated
              </Label>
              <Textarea
                placeholder="e.g., 'Use technical language for software team', 'Include action items at the end', 'Make it more concise and bullet-focused'..."
                value={masterPrompt}
                onChange={(e) => setMasterPrompt(e.target.value)}
                rows={4}
                className="resize-none text-sm"
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Bullet Points */}
          <div className="space-y-2">
            <Label>Key Points (one per line)</Label>
            <Textarea
              placeholder="Enter your bullet points here, one per line..."
              value={bulletPoints}
              onChange={(e) => setBulletPoints(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateContent}
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
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card className="animate-slide-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {contentType === 'email' ? (
                <Mail className="h-5 w-5 text-primary" />
              ) : (
                <FileText className="h-5 w-5 text-primary" />
              )}
              Preview
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="animate-scale-in">
                {tone.charAt(0).toUpperCase() + tone.slice(1)} Tone
              </Badge>
              {masterPrompt.trim() && (
                <Badge variant="outline" className="animate-scale-in">
                  <Lightbulb className="h-3 w-3 mr-1" />
                  Custom
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {generatedContent ? (
            <div className="space-y-4">
              <div className="relative">
                <pre className="whitespace-pre-wrap text-sm bg-muted/50 p-4 rounded-lg border min-h-[400px] max-h-[500px] overflow-y-auto">
                  {generatedContent}
                </pre>
              </div>
              
              <Separator />
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="transition-all duration-200 hover:scale-105"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                
                {contentType === 'report' && (
                  <Button
                    onClick={downloadAsPDF}
                    variant="outline"
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] text-muted-foreground">
              <div className="text-center space-y-2">
                <div className="text-6xl opacity-20">
                  {contentType === 'email' ? '📧' : '📄'}
                </div>
                <p>Generated content will appear here</p>
                <p className="text-sm">Fill out the form and click generate to get started</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

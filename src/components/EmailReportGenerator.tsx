import React, { useState } from 'react';
import { Copy, Download, Mail, FileText, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
type ContentType = 'email' | 'report';
type Tone = 'formal' | 'casual' | 'professional' | 'friendly' | 'urgent';

export const EmailReportGenerator = () => {
  const [contentType, setContentType] = useState<ContentType>('email');
  const [tone, setTone] = useState<Tone>('professional');
  const [recipient, setRecipient] = useState('');
  const [bulletPoints, setBulletPoints] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateContent = async () => {
  if (!bulletPoints.trim()) {
    toast({
      title: "Missing Information",
      description: "Please add some bullet points to generate content.",
      variant: "destructive",
    });
    return;
  }

  setIsGenerating(true);

  try {
    const response = await fetch('https://automatic-mail-report-backend.onrender.com/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contentType,
        tone,
        recipient,
        bulletPoints: bulletPoints.split('\n').filter(point => point.trim()),
      }),
    });

    const data = await response.json();

if (response.ok) {
  setGeneratedContent(data.content);
  toast({
    title: "Content Generated!",
    description: `Your ${contentType} has been successfully generated.`,
  });
} else {
  throw new Error(data.error || "Unknown error");
}
  } finally {
    setIsGenerating(false);
  }
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
  if (!generatedContent.trim()) {
    toast({
      title: "Nothing to download",
      description: "Generate a report first before downloading.",
      variant: "destructive",
    });
    return;
  }

  const doc = new jsPDF();
  const lines = doc.splitTextToSize(generatedContent, 180); // wraps content nicely
  doc.text(lines, 10, 10);
  doc.save('generated-report.pdf');

  toast({
    title: "Download Started",
    description: "Your report PDF is being downloaded.",
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
                className="flex-1"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                variant={contentType === 'report' ? 'default' : 'outline'}
                onClick={() => setContentType('report')}
                className="flex-1"
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
            <Badge variant="secondary" className="animate-scale-in">
              {tone.charAt(0).toUpperCase() + tone.slice(1)} Tone
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
              <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full mb-4" />
              <p className="text-sm">Generating {contentType} with LLM...</p>
            </div>
          ) : generatedContent ? (
            <div className="space-y-4">
              <div className="relative">
                <pre className="whitespace-pre-wrap text-sm bg-muted/50 p-4 rounded-lg border min-h-[400px] max-h-[500px] overflow-y-auto">
                  {generatedContent}
                </pre>
              </div>
              <Separator />
              <div className="flex gap-2 flex-wrap">
                <Button onClick={copyToClipboard} variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                {contentType === 'report' && (
  <Button onClick={downloadAsPDF} variant="outline">
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

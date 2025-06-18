
import React from 'react';
import { Copy, Download, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

type ContentType = 'email' | 'report';
type Tone = 'formal' | 'casual' | 'professional' | 'friendly' | 'urgent';

interface ContentPreviewProps {
  contentType: ContentType;
  tone: Tone;
  generatedContent: string;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({
  contentType,
  tone,
  generatedContent,
}) => {
  const { toast } = useToast();

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {contentType === 'email' ? (
            <Mail className="h-5 w-5 text-primary" />
          ) : (
            <FileText className="h-5 w-5 text-primary" />
          )}
          <span className="font-semibold">Preview</span>
        </div>
        <Badge variant="secondary" className="animate-scale-in">
          {tone.charAt(0).toUpperCase() + tone.slice(1)} Tone
        </Badge>
      </div>

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
    </div>
  );
};

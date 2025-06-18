
import React from 'react';
import { Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type ContentType = 'email' | 'report';

interface ContentTypeSelectorProps {
  contentType: ContentType;
  onContentTypeChange: (type: ContentType) => void;
}

export const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({
  contentType,
  onContentTypeChange,
}) => {
  return (
    <div className="space-y-2">
      <Label>Content Type</Label>
      <div className="flex gap-2">
        <Button
          variant={contentType === 'email' ? 'default' : 'outline'}
          onClick={() => onContentTypeChange('email')}
          className="flex-1 transition-all duration-200"
        >
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
        <Button
          variant={contentType === 'report' ? 'default' : 'outline'}
          onClick={() => onContentTypeChange('report')}
          className="flex-1 transition-all duration-200"
        >
          <FileText className="h-4 w-4 mr-2" />
          Report
        </Button>
      </div>
    </div>
  );
};

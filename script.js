
// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.bindEvents();
    }

    applyTheme(theme) {
        document.body.className = `${theme}-theme`;
        this.theme = theme;
        localStorage.setItem('theme', theme);
    }

    toggle() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => this.toggle());
    }
}

// Content Generator
class ContentGenerator {
    constructor() {
        this.form = document.getElementById('content-form');
        this.previewContent = document.getElementById('preview-content');
        this.generateBtn = document.getElementById('generate-btn');
        this.copyBtn = document.getElementById('copy-btn');
        this.downloadBtn = document.getElementById('download-btn');
        this.subjectLabel = document.getElementById('subject-label');
        this.recipientGroup = document.getElementById('recipient-group');
        this.masterPromptToggle = document.getElementById('master-prompt-toggle');
        this.masterPromptContent = document.getElementById('master-prompt-content');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateFormBasedOnType();
        lucide.createIcons();
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateContent();
        });

        // Content type change
        const contentTypeInputs = document.querySelectorAll('input[name="contentType"]');
        contentTypeInputs.forEach(input => {
            input.addEventListener('change', () => this.updateFormBasedOnType());
        });

        // Copy button
        this.copyBtn.addEventListener('click', () => this.copyContent());

        // Download button
        this.downloadBtn.addEventListener('click', () => this.downloadPDF());

        // Master prompt toggle
        this.masterPromptToggle.addEventListener('click', () => this.toggleMasterPrompt());
    }

    updateFormBasedOnType() {
        const selectedType = document.querySelector('input[name="contentType"]:checked').value;
        
        if (selectedType === 'email') {
            this.subjectLabel.textContent = 'Subject';
            this.recipientGroup.style.display = 'flex';
            this.downloadBtn.style.display = 'none';
        } else {
            this.subjectLabel.textContent = 'Title';
            this.recipientGroup.style.display = 'none';
            this.downloadBtn.style.display = 'flex';
        }
    }

    toggleMasterPrompt() {
        const isActive = this.masterPromptToggle.classList.contains('active');
        
        if (isActive) {
            this.masterPromptToggle.classList.remove('active');
            this.masterPromptContent.classList.remove('active');
        } else {
            this.masterPromptToggle.classList.add('active');
            this.masterPromptContent.classList.add('active');
        }
    }

    async generateContent() {
        const formData = new FormData(this.form);
        const data = {
            contentType: formData.get('contentType'),
            tone: formData.get('tone'),
            subject: document.getElementById('subject').value,
            recipient: document.getElementById('recipient').value,
            bulletPoints: document.getElementById('bulletPoints').value,
            masterPrompt: document.getElementById('masterPrompt').value
        };

        if (!data.subject || !data.bulletPoints) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        this.setLoading(true);

        try {
            // Simulate API call with mock content generation
            await this.delay(2000);
            const generatedContent = this.mockGenerateContent(data);
            this.displayContent(generatedContent);
        } catch (error) {
            this.showToast('Error generating content. Please try again.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    mockGenerateContent(data) {
        const isEmail = data.contentType === 'email';
        let content = '';

        if (isEmail) {
            content += `To: ${data.recipient || '[Recipient]'}\n`;
            content += `Subject: ${data.subject}\n\n`;
            
            // Email greeting based on tone
            if (data.tone === 'formal') {
                content += 'Dear ' + (data.recipient ? data.recipient.split(' ')[0] : '[Name]') + ',\n\n';
            } else if (data.tone === 'casual') {
                content += 'Hi ' + (data.recipient ? data.recipient.split(' ')[0] : '[Name]') + ',\n\n';
            } else {
                content += 'Hello ' + (data.recipient ? data.recipient.split(' ')[0] : '[Name]') + ',\n\n';
            }

            // Process bullet points for email
            const points = data.bulletPoints.split('\n').filter(point => point.trim());
            
            if (data.tone === 'formal') {
                content += 'I hope this message finds you well. I am writing to inform you about the following key points:\n\n';
                points.forEach((point, index) => {
                    content += `${index + 1}. ${point.replace(/^[•\-\*]\s*/, '')}\n`;
                });
                content += '\nI would appreciate your attention to these matters. Please feel free to reach out if you have any questions or require further clarification.\n\n';
                content += 'Best regards,\n[Your Name]';
            } else if (data.tone === 'casual') {
                content += 'Hope you\'re doing well! I wanted to quickly touch base on a few things:\n\n';
                points.forEach(point => {
                    content += `• ${point.replace(/^[•\-\*]\s*/, '')}\n`;
                });
                content += '\nLet me know what you think or if you have any questions!\n\n';
                content += 'Thanks,\n[Your Name]';
            } else {
                content += 'I wanted to share some important information with you:\n\n';
                points.forEach(point => {
                    content += `• ${point.replace(/^[•\-\*]\s*/, '')}\n`;
                });
                content += '\nPlease let me know if you need any additional information.\n\n';
                content += 'Best,\n[Your Name]';
            }
        } else {
            // Report generation
            content += `${data.subject}\n`;
            content += '='.repeat(data.subject.length) + '\n\n';
            
            if (data.tone === 'formal') {
                content += 'EXECUTIVE SUMMARY\n\n';
                content += 'This report presents the following key findings and recommendations:\n\n';
            } else {
                content += 'Overview\n\n';
                content += 'This report covers the following main points:\n\n';
            }

            const points = data.bulletPoints.split('\n').filter(point => point.trim());
            
            points.forEach((point, index) => {
                const cleanPoint = point.replace(/^[•\-\*]\s*/, '');
                content += `${index + 1}. ${cleanPoint}\n`;
            });

            content += '\n';
            
            if (data.tone === 'formal') {
                content += 'DETAILED ANALYSIS\n\n';
                points.forEach((point, index) => {
                    const cleanPoint = point.replace(/^[•\-\*]\s*/, '');
                    content += `${index + 1}. ${cleanPoint}\n`;
                    content += `   Analysis and implications of this point would be detailed here.\n\n`;
                });
                content += 'RECOMMENDATIONS\n\n';
                content += 'Based on the analysis above, the following actions are recommended:\n';
                content += '• Implement immediate action items\n';
                content += '• Monitor progress and outcomes\n';
                content += '• Schedule follow-up review\n\n';
                content += 'CONCLUSION\n\n';
                content += 'This report has outlined the key findings and recommendations. Further action should be taken to address the identified areas.\n';
            } else {
                content += 'Details\n\n';
                points.forEach((point, index) => {
                    const cleanPoint = point.replace(/^[•\-\*]\s*/, '');
                    content += `${cleanPoint}\n`;
                    content += `Additional context and details would be provided here.\n\n`;
                });
                content += 'Next Steps\n\n';
                content += 'Moving forward, we should focus on:\n';
                content += '• Taking action on key items\n';
                content += '• Following up on progress\n';
                content += '• Reviewing results\n';
            }
        }

        // Apply master prompting if provided
        if (data.masterPrompt) {
            content += '\n\n--- Custom Instructions Applied ---\n';
            content += `Based on your instructions: "${data.masterPrompt}", the content above has been tailored accordingly.`;
        }

        return content;
    }

    displayContent(content) {
        this.previewContent.innerHTML = `<div class="generated-content">${content}</div>`;
    }

    setLoading(loading) {
        if (loading) {
            this.generateBtn.classList.add('loading');
            this.generateBtn.disabled = true;
            this.generateBtn.innerHTML = '<i data-lucide="loader" class="animate-spin"></i> Generating...';
        } else {
            this.generateBtn.classList.remove('loading');
            this.generateBtn.disabled = false;
            this.generateBtn.innerHTML = '<i data-lucide="sparkles"></i> Generate Content';
        }
        lucide.createIcons();
    }

    async copyContent() {
        const contentElement = document.querySelector('.generated-content');
        if (!contentElement) {
            this.showToast('No content to copy', 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(contentElement.textContent);
            this.showToast('Content copied to clipboard!', 'success');
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = contentElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast('Content copied to clipboard!', 'success');
        }
    }

    downloadPDF() {
        const contentElement = document.querySelector('.generated-content');
        if (!contentElement) {
            this.showToast('No content to download', 'error');
            return;
        }

        // Create a simple text file download (PDF generation would require a library)
        const content = contentElement.textContent;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated-report.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast('Report downloaded successfully!', 'success');
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.querySelector('.toast-message');
        const toastIcon = document.querySelector('.toast-icon');

        toastMessage.textContent = message;
        
        if (type === 'error') {
            toastIcon.setAttribute('data-lucide', 'x-circle');
        } else {
            toastIcon.setAttribute('data-lucide', 'check-circle');
        }

        lucide.createIcons();
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new ContentGenerator();
    lucide.createIcons();
});


import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { EmailReportGenerator } from '@/components/EmailReportGenerator';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Header />
        <main className="container py-8">
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight">
                Generate Professional Content
                <span className="block text-primary mt-2">In Seconds, Not Hours</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your bullet points into polished emails and reports with AI-powered generation. 
                Choose your tone, add your points, and get professional content instantly.
              </p>
            </div>

            {/* Main Generator */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <EmailReportGenerator />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;

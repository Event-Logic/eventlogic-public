'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

export default function AICanvasPage({ params }: { params: { locale: string } }) {
  const [intent, setIntent] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedUI, setGeneratedUI] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  async function generateUI() {
    if (!intent.trim()) return;

    setLoading(true);
    try {
      // TODO: Implement actual AI UI generation
      // For now, just simulate a response
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setChatHistory((prev) => [
        ...prev,
        { role: 'user', content: intent },
        {
          role: 'assistant',
          content: 'I understand you want to see suppliers. Let me create a visualization for you.',
        },
      ]);

      setGeneratedUI({
        layout: 'grid',
        components: [],
      });

      setIntent('');
    } catch (error) {
      console.error('Failed to generate UI:', error);
    } finally {
      setLoading(false);
    }
  }

  const examplePrompts = [
    'Show me hotels in Krakow with missing images',
    'Display suppliers that need processing',
    'Compare image quality across cities',
    'Show failed suppliers from last week',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          AI Canvas
        </h1>
        <p className="text-muted-foreground mt-2">
          Describe what you want to see, and AI will generate the perfect visualization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Canvas Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Intent Input */}
          <Card>
            <CardHeader>
              <CardTitle>What would you like to see?</CardTitle>
              <CardDescription>
                Ask in natural language and AI will create the perfect view
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Show me hotels in Krakow with missing images..."
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && generateUI()}
                  className="flex-1"
                />
                <Button onClick={generateUI} disabled={loading || !intent.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>

              {/* Example Prompts */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      size="sm"
                      onClick={() => setIntent(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated UI Area */}
          <Card className="min-h-[400px]">
            <CardHeader>
              <CardTitle>Generated View</CardTitle>
            </CardHeader>
            <CardContent>
              {!generatedUI && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Sparkles className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No visualization yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter your request above to generate a custom view
                  </p>
                </div>
              )}

              {generatedUI && (
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    AI-generated UI will render here
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Layout: {generatedUI.layout}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chat/Refinement Panel */}
        <div className="space-y-6">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Refine your visualization</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatHistory.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">
                      Start a conversation by generating a view
                    </p>
                  </div>
                )}

                {chatHistory.map((message, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-8'
                        : 'bg-muted mr-8'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input placeholder="Refine the view..." />
                <Button size="icon">
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>How to use AI Canvas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-2">1. Describe your intent</h3>
              <p className="text-sm text-muted-foreground">
                Tell the AI what you want to see in natural language
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">2. AI generates the view</h3>
              <p className="text-sm text-muted-foreground">
                The AI creates the optimal layout and components for your needs
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">3. Refine through chat</h3>
              <p className="text-sm text-muted-foreground">
                Talk to the AI to adjust and improve the visualization
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

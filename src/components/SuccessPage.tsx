import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Wifi, Download, Upload, Globe, Clock } from 'lucide-react';

interface SuccessPageProps {
  username: string;
  onDisconnect?: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ username, onDisconnect }) => {
  const connectionInfo = {
    downloadSpeed: '150 Mbps',
    uploadSpeed: '50 Mbps',
    sessionTime: '00:23:45',
    dataUsed: '45.2 MB',
    ipAddress: '192.168.1.156',
    gateway: 'MikroTik-Gateway-01'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6 animate-slide-up">
        
        {/* Success Header */}
        <Card className="text-center p-8 bg-card/80 backdrop-blur-xl border-border/50 shadow-elegant">
          <div className="mb-6">
            <div className="bg-green-500/20 p-4 rounded-full inline-block mb-4 animate-glow-pulse">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Connected Successfully!</h1>
            <p className="text-muted-foreground">
              Welcome <span className="text-primary font-semibold">{username}</span>, you're now online
            </p>
          </div>

          {/* Connection Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-primary/10 p-4 rounded-lg">
              <Wifi className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Signal Strength</p>
              <p className="text-lg font-bold text-primary">Excellent</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <Globe className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Network Status</p>
              <p className="text-lg font-bold text-green-500">Online</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Session Time</p>
              <p className="text-lg font-bold text-primary">{connectionInfo.sessionTime}</p>
            </div>
          </div>

          <Button 
            variant="hero" 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={() => window.open('https://www.google.com', '_blank')}
          >
            <Globe className="w-4 h-4 mr-2" />
            Start Browsing
          </Button>
        </Card>

        {/* Connection Details */}
        <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50 shadow-elegant">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Wifi className="w-5 h-5 mr-2 text-primary" />
            Connection Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">Download Speed:</span>
                <div className="flex items-center text-foreground font-medium">
                  <Download className="w-4 h-4 mr-1 text-green-500" />
                  {connectionInfo.downloadSpeed}
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">Upload Speed:</span>
                <div className="flex items-center text-foreground font-medium">
                  <Upload className="w-4 h-4 mr-1 text-blue-500" />
                  {connectionInfo.uploadSpeed}
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">Data Used:</span>
                <span className="text-foreground font-medium">{connectionInfo.dataUsed}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">IP Address:</span>
                <span className="text-foreground font-medium font-mono text-sm">{connectionInfo.ipAddress}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">Gateway:</span>
                <span className="text-foreground font-medium">{connectionInfo.gateway}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">Session Time:</span>
                <span className="text-foreground font-medium">{connectionInfo.sessionTime}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50 shadow-elegant">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Speed Test
            </Button>
            
            <Button variant="outline" className="w-full">
              <Clock className="w-4 h-4 mr-2" />
              Usage Details
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full sm:col-span-2 lg:col-span-1"
              onClick={onDisconnect}
            >
              Disconnect
            </Button>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Stay connected and enjoy high-speed internet access</p>
          <p className="mt-1">For support, contact your network administrator</p>
        </div>
      </div>
    </div>
  );
};
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 font-cairo" dir="rtl">
      <div className="w-full max-w-2xl space-y-6 animate-slide-up">
        
        {/* Success Header */}
        <Card className="text-center p-8 bg-card/80 backdrop-blur-xl border-border/50 shadow-elegant">
          <div className="mb-6">
            <div className="bg-green-500/20 p-4 rounded-full inline-block mb-4 animate-glow-pulse">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">تم الاتصال بنجاح!</h1>
            <p className="text-muted-foreground">
              مرحباً <span className="text-primary font-semibold">{username}</span>، أنت متصل الآن بالإنترنت
            </p>
          </div>

          {/* Connection Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-primary/10 p-4 rounded-lg">
              <Wifi className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">قوة الإشارة</p>
              <p className="text-lg font-bold text-primary">ممتازة</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <Globe className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">حالة الشبكة</p>
              <p className="text-lg font-bold text-green-500">متصل</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">مدة الجلسة</p>
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
            ابدأ التصفح
          </Button>
        </Card>

        {/* Connection Details */}
        <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50 shadow-elegant">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Wifi className="w-5 h-5 mr-2 text-primary" />
تفاصيل الاتصال
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">سرعة التحميل:</span>
                <div className="flex items-center text-foreground font-medium">
                  <Download className="w-4 h-4 mr-1 text-green-500" />
                  {connectionInfo.downloadSpeed}
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">سرعة الرفع:</span>
                <div className="flex items-center text-foreground font-medium">
                  <Upload className="w-4 h-4 mr-1 text-blue-500" />
                  {connectionInfo.uploadSpeed}
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">البيانات المستخدمة:</span>
                <span className="text-foreground font-medium">{connectionInfo.dataUsed}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">عنوان IP:</span>
                <span className="text-foreground font-medium font-mono text-sm">{connectionInfo.ipAddress}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">البوابة:</span>
                <span className="text-foreground font-medium">{connectionInfo.gateway}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">مدة الجلسة:</span>
                <span className="text-foreground font-medium">{connectionInfo.sessionTime}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50 shadow-elegant">
          <h2 className="text-xl font-semibold text-foreground mb-4">إجراءات سريعة</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              اختبار السرعة
            </Button>
            
            <Button variant="outline" className="w-full">
              <Clock className="w-4 h-4 mr-2" />
              تفاصيل الاستخدام
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full sm:col-span-2 lg:col-span-1"
              onClick={onDisconnect}
            >
قطع الاتصال
            </Button>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>ابق متصلاً واستمتع بإنترنت عالي السرعة</p>
          <p className="mt-1">للدعم، اتصل بمدير الشبكة</p>
        </div>
      </div>
    </div>
  );
};
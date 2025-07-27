import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Wifi, Shield, Globe, Clock, Users, Zap, HelpCircle } from 'lucide-react';
import { HelpModal } from './HelpModal';
import networkBg from '@/assets/network-bg.jpg';

interface HotspotLoginProps {
  onLogin?: (credentials: { username: string; password: string; termsAccepted: boolean }) => void;
}

export const HotspotLogin: React.FC<HotspotLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved usernames
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('teranet-previous-users') || '[]');
    if (savedUsers.length > 0) {
      setUsername(savedUsers[0]); // Auto-fill with last used username
    }
  }, []);

  // Listen for username fill events from help modal
  useEffect(() => {
    const handleFillUsername = (event: any) => {
      setUsername(event.detail);
    };
    window.addEventListener('fillUsername', handleFillUsername);
    return () => window.removeEventListener('fillUsername', handleFillUsername);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the terms and conditions to continue.');
      return;
    }
    
    setIsLoading(true);
    
    // Save username to localStorage for future use
    const savedUsers = JSON.parse(localStorage.getItem('teranet-previous-users') || '[]');
    const updatedUsers = [username, ...savedUsers.filter((u: string) => u !== username)].slice(0, 5);
    localStorage.setItem('teranet-previous-users', JSON.stringify(updatedUsers));
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onLogin?.({ username, password, termsAccepted });
    setIsLoading(false);
  };

  const features = [
    { icon: Wifi, title: 'واي فاي عالي السرعة', description: 'اتصال إنترنت فائق السرعة' },
    { icon: Shield, title: 'اتصال آمن', description: 'بروتوكولات أمان على مستوى المؤسسات' },
    { icon: Globe, title: 'وصول عالمي', description: 'اتصل من أي مكان في المنطقة' },
    { icon: Clock, title: 'متاح ٢٤/٧', description: 'وصول للشبكة على مدار الساعة' },
    { icon: Users, title: 'أجهزة متعددة', description: 'اربط جميع أجهزتك بسلاسة' },
    { icon: Zap, title: 'اتصال فوري', description: 'مصادقة سريعة وسهلة' },
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative font-cairo"
      style={{ backgroundImage: `url(${networkBg})` }}
      dir="rtl"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-primary-glow/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding & Features */}
          <div className="space-y-8 animate-slide-up">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="bg-gradient-primary p-3 rounded-xl shadow-glow">
                  <Wifi className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mr-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  تيرا نت
                </h1>
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-foreground">
                مرحباً بك في شبكة تيرا نت المتميزة
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                استمتع بإنترنت فائق السرعة مع أمان على مستوى المؤسسات.
                اتصل فوراً واستمتع بتصفح سلس وآمن.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-300 hover:shadow-lg animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-sm text-foreground">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center lg:justify-end animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur-xl border-border/50 shadow-elegant">
              <div className="text-center mb-8">
                <div className="bg-gradient-primary p-4 rounded-full inline-block mb-4 shadow-glow">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">الاتصال بالواي فاي</h3>
                <p className="text-muted-foreground">أدخل بياناتك للاتصال بالإنترنت</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2 text-right">
                      اسم المستخدم أو البريد الإلكتروني
                    </label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="أدخل اسم المستخدم"
                      className="bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background/70 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2 text-right">
                      كلمة المرور أو رمز القسيمة
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="أدخل كلمة المرور"
                      className="bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background/70 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    className="border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground text-right">
                    أوافق على{' '}
                    <button type="button" className="text-primary hover:underline">
                      الشروط والأحكام
                    </button>
                    {' '}و{' '}
                    <button type="button" className="text-primary hover:underline">
                      سياسة الخصوصية
                    </button>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isLoading || !termsAccepted}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>جاري الاتصال...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-4 h-4" />
                      <span>اتصل الآن</span>
                    </div>
                  )}
                </Button>

                <div className="flex justify-between items-center">
                  <HelpModal>
                    <Button type="button" variant="outline" size="sm" className="gap-2">
                      <HelpCircle className="w-4 h-4" />
                      مساعدة
                    </Button>
                  </HelpModal>
                  <p className="text-xs text-muted-foreground">
                    تحتاج مساعدة؟ اتصل بـ{' '}
                    <button type="button" className="text-primary hover:underline">
                      الدعم الفني
                    </button>
                  </p>
                </div>
              </form>

              {/* Social Login Options */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-center text-sm text-muted-foreground mb-4">أو اتصل باستخدام</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="glass" size="sm" className="w-full">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    جوجل
                  </Button>
                  <Button variant="glass" size="sm" className="w-full">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    فيسبوك
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-t border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>© ٢٠٢٤ شبكة تيرا نت. جميع الحقوق محفوظة.</p>
            <div className="flex space-x-4 space-x-reverse mt-2 sm:mt-0">
              <button className="hover:text-primary transition-colors">الخصوصية</button>
              <button className="hover:text-primary transition-colors">الشروط</button>
              <button className="hover:text-primary transition-colors">الدعم</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
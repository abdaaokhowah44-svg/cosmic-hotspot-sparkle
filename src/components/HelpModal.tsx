import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wifi, Shield, Globe, Clock, Users, Zap, HelpCircle, Phone, Mail, MapPin } from 'lucide-react';

interface HelpModalProps {
  children?: React.ReactNode;
}

export const HelpModal: React.FC<HelpModalProps> = ({ children }) => {
  const helpSections = [
    {
      icon: Wifi,
      title: 'كيفية الاتصال',
      description: 'أدخل اسم المستخدم وكلمة المرور الخاصة بك للاتصال بالشبكة'
    },
    {
      icon: Shield,
      title: 'الأمان والحماية',
      description: 'شبكتنا محمية بأحدث بروتوكولات الأمان لضمان سلامة بياناتك'
    },
    {
      icon: Globe,
      title: 'سرعة الإنترنت',
      description: 'استمتع بسرعة تصل إلى 1 جيجابت في الثانية للتصفح والتحميل'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      description: 'الشبكة متاحة 24/7 طوال أيام الأسبوع'
    }
  ];

  const contactInfo = [
    { icon: Phone, label: 'الهاتف', value: '+966 11 123 4567' },
    { icon: Mail, label: 'البريد الإلكتروني', value: 'support@teranet.sa' },
    { icon: MapPin, label: 'العنوان', value: 'الرياض، المملكة العربية السعودية' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="gap-2">
            <HelpCircle className="w-4 h-4" />
            مساعدة
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/50" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground font-cairo">
            مساعدة شبكة تيرا نت
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-4">
          {/* Quick Help Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helpSections.map((section, index) => (
              <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-elegant transition-all duration-300">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-lg text-foreground font-cairo">{section.title}</h3>
                    <p className="text-muted-foreground mt-2 font-cairo text-sm leading-relaxed">{section.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Previous Login Cards */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="text-xl font-bold text-foreground mb-4 font-cairo">المستخدمون السابقون</h3>
            <div className="space-y-3">
              {JSON.parse(localStorage.getItem('teranet-previous-users') || '[]').map((user: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-foreground font-cairo">{user}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Dispatch custom event to fill login form
                      window.dispatchEvent(new CustomEvent('fillUsername', { detail: user }));
                    }}
                  >
                    استخدام
                  </Button>
                </div>
              ))}
              {JSON.parse(localStorage.getItem('teranet-previous-users') || '[]').length === 0 && (
                <p className="text-muted-foreground text-center py-4 font-cairo">لا توجد عمليات دخول سابقة</p>
              )}
            </div>
          </Card>

          {/* Connection Issues */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
            <h3 className="text-xl font-bold text-foreground mb-4 font-cairo">مشاكل الاتصال الشائعة</h3>
            <div className="space-y-4">
              <div className="border-r-4 border-primary pr-4">
                <h4 className="font-semibold text-foreground font-cairo">لا يمكنني الاتصال</h4>
                <p className="text-muted-foreground text-sm font-cairo">تأكد من صحة اسم المستخدم وكلمة المرور</p>
              </div>
              <div className="border-r-4 border-primary pr-4">
                <h4 className="font-semibold text-foreground font-cairo">الإنترنت بطيء</h4>
                <p className="text-muted-foreground text-sm font-cairo">جرب إعادة الاتصال أو الاتصال بالدعم الفني</p>
              </div>
              <div className="border-r-4 border-primary pr-4">
                <h4 className="font-semibold text-foreground font-cairo">انقطاع الاتصال</h4>
                <p className="text-muted-foreground text-sm font-cairo">تحقق من قوة الإشارة أو اتصل بالدعم الفني</p>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6 bg-gradient-primary text-white border-0">
            <h3 className="text-xl font-bold mb-4 font-cairo">تواصل معنا</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse">
                  <contact.icon className="w-5 h-5" />
                  <div className="text-right">
                    <p className="text-sm opacity-90 font-cairo">{contact.label}</p>
                    <p className="font-semibold font-cairo">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
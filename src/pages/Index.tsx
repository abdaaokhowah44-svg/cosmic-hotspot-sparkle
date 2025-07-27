import React, { useState } from 'react';
import { HotspotLogin } from '@/components/HotspotLogin';
import { SuccessPage } from '@/components/SuccessPage';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userCredentials, setUserCredentials] = useState<{ username: string; password: string; termsAccepted: boolean } | null>(null);
  const { toast } = useToast();

  const handleLogin = (credentials: { username: string; password: string; termsAccepted: boolean }) => {
    setUserCredentials(credentials);
    setIsConnected(true);
    
    toast({
      title: "تم الاتصال بنجاح!",
      description: `مرحباً ${credentials.username}. أنت متصل الآن بالشبكة.`,
    });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setUserCredentials(null);
    
    toast({
      title: "تم قطع الاتصال",
      description: "تم قطع اتصالك من الشبكة.",
      variant: "destructive",
    });
  };

  if (isConnected && userCredentials) {
    return (
      <SuccessPage 
        username={userCredentials.username} 
        onDisconnect={handleDisconnect}
      />
    );
  }

  return (
    <HotspotLogin onLogin={handleLogin} />
  );
};

export default Index;

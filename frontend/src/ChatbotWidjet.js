import React, { useEffect } from 'react';

const ChatbotWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.type = "text/javascript";
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '6739b7fa64d36c192771f747' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production'
      });
    };
    document.body.appendChild(script);
  }, []);

  return <div> {/* You can style the container as needed */} </div>;
};

export default ChatbotWidget;
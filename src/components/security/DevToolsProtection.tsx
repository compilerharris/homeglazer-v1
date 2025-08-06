import { useEffect } from 'react';

const DevToolsProtection: React.FC = () => {
  useEffect(() => {
    // Disable right-click context menu
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable developer tools hotkeys
    const disableDevToolsKeys = (e: KeyboardEvent) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+C (Element Inspector)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+S (Save As)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }
      
      // F5 (Refresh) - Optional, uncomment if needed
      // if (e.keyCode === 116) {
      //   e.preventDefault();
      //   return false;
      // }
      
      return true;
    };

    // Disable text selection
    const disableSelection = () => {
      document.onselectstart = () => false;
      document.ondragstart = () => false;
    };

    // Console warning message
    const showConsoleWarning = () => {
      console.clear();
      console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
      console.log('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, it is a scam and will give them access to your account.', 'color: red; font-size: 16px;');
    };

    // Anti-debugging techniques (basic)
    const antiDebug = () => {
      // Detect DevTools by timing
      let devtools = {
        open: false,
        orientation: null as string | null
      };
      
      const threshold = 160;
      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools.open) {
            devtools.open = true;
            console.clear();
            showConsoleWarning();
          }
        } else {
          devtools.open = false;
        }
      }, 500);
    };

    // Apply protections only in production
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', disableContextMenu);
      document.addEventListener('keydown', disableDevToolsKeys);
      disableSelection();
      antiDebug();
      showConsoleWarning();
    }

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('keydown', disableDevToolsKeys);
      document.onselectstart = null;
      document.ondragstart = null;
    };
  }, []);

  return null; // This component doesn't render anything
};

export default DevToolsProtection;
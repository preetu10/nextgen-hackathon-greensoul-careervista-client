import { useState, useEffect } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const scrolled = window.pageYOffset;
    // console.log('Scroll position:', scrolled); 
    
    if (scrolled > 300) {
      setIsVisible(true);
    //   console.log('Button should be visible'); 
    } else {
      setIsVisible(false);
    //   console.log('Button hidden'); 
    }
  };

  
  const scrollToTop = () => {
    // console.log('Scrolling to top'); 
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // console.log('ScrollToTop component mounted'); 
    window.addEventListener('scroll', toggleVisibility);
    
   
    toggleVisibility();
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  console.log('Rendering ScrollToTop, isVisible:', isVisible); 

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 9999 }}>
      <button
        onClick={scrollToTop}
        className="scroll-to-top"
        style={{
          display: isVisible ? 'flex' : 'none',
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#048998',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
        }}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </div>
  );
};

export default ScrollToTop;
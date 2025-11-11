import React, { useRef } from 'react';

const IframeSOPTester = () => {
  const iframeRef = useRef(null);
  
  // The React code trying to "spy" on the IFrame content
  const attemptAccessIFrame = () => {
    const iframe = iframeRef.current;
    
    if (!iframe) {
        console.error("IFrame reference is null.");
        return;
    }

    try {
      // 1. Attempt to access the IFrame's document content (The SOP Check)
      // This line is expected to cause a browser security error.
      const iframeWindow = iframe.contentWindow;
      const iframeDocument = iframe.contentDocument || iframeWindow.document;

      // 2. Try to read the exposed variable 'secretData'
      const secret = iframeWindow.secretData;

      // 3. Try to read the value of the simulated sensitive input field
      const sensitiveInput = iframeDocument.getElementById('sensitive-input');
      const inputValue = sensitiveInput ? sensitiveInput.value : 'Input Element Not Found';

      // **This SUCCESS block should ideally NOT run due to SOP**
      document.getElementById('sop-status').innerText = 'DANGER: SOP FAILURE! Data accessed successfully!';
      console.error('DANGER: SOP FAILURE!', { secret, inputValue });
      
    } catch (error) {
      // **This CATCH block is the expected SECURE outcome**
      document.getElementById('sop-status').innerText = 'SUCCESS: SOP BLOCK! Data access failed as expected.';
      document.getElementById('sop-error').innerText = `Browser Error: "${error.message}"`;
      console.log('SOP Verification Success (Error Caught):', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Payment UI (Parent App - runs on localhost:3000)</h2>
      <p>Click the button to try and read the IFrame's content:</p>
      
      <button onClick={attemptAccessIFrame} style={{ padding: '10px', background: 'navy', color: 'white', border: 'none', cursor: 'pointer' }}>
        Attempt to Read IFrame Data
      </button>

      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
        <h3>Security Status:</h3>
        <p id="sop-status" style={{ fontWeight: 'bold', color: 'blue' }}>Pending...</p>
        <p id="sop-error" style={{ color: 'red', fontStyle: 'italic' }}></p>
      </div>

      <hr style={{ margin: '30px 0' }} />

      {/* The IFrame loads content from a DIFFERENT origin (via file path) */}
      {/* For a real test, you'd host iframe-content.html on a server like https://iframe-domain.com */}
      {/* However, loading it locally will often trigger SOP violation because it uses the 'file://' protocol, 
          which is treated as a different origin from your 'http://localhost' React app. */}
      <iframe
        ref={iframeRef}
        src="/myIframe.html" 
        width="100%"
        height="350px"
        title="Secure Payment Form Simulation"
        style={{ border: '2px dashed gray' }}
      ></iframe>
    </div>
  );
};

export default IframeSOPTester;
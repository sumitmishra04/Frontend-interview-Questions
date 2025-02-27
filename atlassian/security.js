//     XSS (Cross-Site Scripting)
//         Vulnerability: Using dangerouslySetInnerHTML or inserting raw HTML
//         Solution:
//             Let React handle content rendering (automatic escaping)
//             Use proper content sanitization libraries if HTML is needed
//             Avoid dangerouslySetInnerHTML

//     SQL Injection
//         Vulnerability: Direct string concatenation in queries
//         Solution:
//             Use parameterized queries
//             Use ORMs with built-in protection
//             Never concatenate user input directly into queries

//     CSRF (Cross-Site Request Forgery)
//         Vulnerability: Not validating request origin
//         Solution:
//             Implement CSRF tokens
//             Validate tokens on server-side
//             Use SameSite cookies
//             Include CSRF tokens in headers

//     Clickjacking
//         Vulnerability: Site can be embedded in malicious iframes
//         Solution:
//             Set X-Frame-Options header
//             Use frame-ancestors CSP directive
//             Prevent site from being embedded in unauthorized frames

//     CSP (Content Security Policy)
//         Vulnerability: Allowing unsafe content/scripts
//         Solution:
//             Implement strict CSP headers
//             Restrict content sources
//             Disable unsafe-inline where possible
//             Use nonce-based CSP for necessary inline scripts

// Additional Security Best Practices:

//     Input Validation

// // Always validate and sanitize input
// const sanitizeInput = (input: string) => {
//   return input.trim().replace(/[<>]/g, '');
// };

// Secure Headers

// // Set security headers
// app.use(helmet()); // If using Express

// HTTPS Only

// // Redirect all HTTP to HTTPS
// app.use((req, res, next) => {
//   if (!req.secure) {
//     return res.redirect(`https://${req.headers.host}${req.url}`);
//   }
//   next();
// });

// Secure Cookie Settings

// // Set secure cookie options
// app.use(session({
//   cookie: {
//     secure: true,
//     httpOnly: true,
//     sameSite: 'strict'
//   }
// }));

// Rate Limiting

//     // Implement rate limiting
//     const rateLimit = require('express-rate-limit');
//     app.use(rateLimit({
//       windowMs: 15 * 60 * 1000, // 15 minutes
//       max: 100 // limit each IP to 100 requests per windowMs
//     }));

// Remember to:

//     Always update dependencies regularly
//     Use security linters (e.g., eslint-plugin-security)
//     Implement proper error handling
//     Use HTTPS everywhere
//     Regularly audit your code for security issues
//     Follow the principle of least privilege
//     Implement proper authentication and authorization
//     Use security headers (Helmet in Express.js)
//     Keep sensitive data out of client-side code

// The example code shows these concepts in practice and can be used as a reference for implementing secure patterns in your React applications.

import React, { useState } from 'react';

// ========== 1. XSS (Cross-Site Scripting) Examples ==========

// Vulnerable to XSS
const VulnerableXSS = () => {
  const [userInput, setUserInput] = useState('<img src="x" onerror="alert(\'XSS\')" />');
  
  // DANGEROUS: Direct HTML injection
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
};

// Fixed XSS
const SafeXSS = () => {
  const [userInput, setUserInput] = useState('<img src="x" onerror="alert(\'XSS\')" />');
  
  // Safe: React automatically escapes content
  return <div>{userInput}</div>;
};

// ========== 2. SQL Injection Examples ==========

// Vulnerable SQL query construction
const vulnerableSQLQuery = (userInput: string) => {
  // DANGEROUS: Direct string concatenation
  const query = `SELECT * FROM users WHERE username = '${userInput}'`;
  return query;
};

// Fixed SQL query using parameterized queries
const safeSQLQuery = (userInput: string) => {
  // Safe: Using parameterized queries
  const query = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [userInput],
  };
  return query;
};

// ========== 3. CSRF (Cross-Site Request Forgery) Example ==========

// Vulnerable CSRF endpoint
const vulnerableCSRFEndpoint = () => {
  const updateProfile = async (data: any) => {
    // DANGEROUS: No CSRF token
    await fetch('/api/update-profile', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };
};

// Fixed CSRF endpoint
const safeCSRFEndpoint = () => {
  const updateProfile = async (data: any) => {
    // Safe: Including CSRF token
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    await fetch('/api/update-profile', {
      method: 'POST',
      headers: {
        'CSRF-Token': csrfToken || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };
};

// ========== 4. Clickjacking Protection Example ==========

// Server-side headers (Express.js example)
const serverExample = `
const express = require('express');
const app = express();

// Safe: Set X-Frame-Options header
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});
`;

// ========== 5. Content Security Policy Example ==========

// Server-side CSP headers
const cspExample = `
const express = require('express');
const app = express();

// Safe: Set strict CSP headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "frame-src 'none'; " +
    "object-src 'none'"
  );
  next();
});
`;

// ========== Security Best Practices Component ==========

const SecurityBestPractices: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const csrfToken = 'example-token'; // In real app, get from server

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example of secure form submission
    try {
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken,
        },
        // Sanitize input before sending
        body: JSON.stringify({
          data: userInput.trim(),
        }),
      });

      if (!response.ok) throw new Error('Request failed');
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Secure Form Example</h2>
      
      {/* Safe form handling */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userInput" className="block mb-2">
            Enter text (safely handled):
          </label>
          <input
            id="userInput"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Display user input safely */}
        <div className="mt-4">
          <h3 className="font-bold">Safe Output:</h3>
          <div className="p-2 border rounded mt-2">
            {/* React automatically escapes this */}
            {userInput}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Safely
        </button>
      </form>

      {/* Security notes */}
      <div className="mt-8">
        <h3 className="font-bold">Security Measures Implemented:</h3>
        <ul className="list-disc pl-5 mt-2">
          <li>Input sanitization</li>
          <li>CSRF token protection</li>
          <li>Safe content rendering</li>
          <li>Proper error handling</li>
          <li>Type safety with TypeScript</li>
        </ul>
      </div>
    </div>
  );
};

export default SecurityBestPractices;
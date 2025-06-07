import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy for Tetris</h1>

      <p className="mb-4">Effective Date: June 7, 2025</p>

      <p className="mb-4">
        Thank you for playing <strong>Tetris</strong> (“we”, “us”, or “our”). We value your privacy and are committed to protecting your information. This Privacy Policy explains how we collect, use, and share data when you use our mobile app on Google Play.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <p className="mb-2 font-medium">a. Non-Personal Information:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Device type and operating system</li>
        <li>Game performance and crash logs</li>
        <li>Gameplay statistics (e.g., high scores, play time)</li>
      </ul>

      <p className="mb-2 font-medium">b. Personal Information (only if you provide it):</p>
      <ul className="list-disc list-inside mb-4">
        <li>Email address (if you contact support)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Improve app performance and gameplay experience</li>
        <li>Fix bugs and monitor crashes</li>
        <li>Respond to support inquiries</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do <strong>not</strong> sell, rent, or trade your personal information. We may share anonymized data with third-party services (e.g., Firebase, Unity Analytics) to help us improve the app.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Third-Party Services</h2>
      <p className="mb-4">
        Tetris may use third-party tools that collect data in accordance with their own privacy policies. Please review those policies for more details.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Data Security</h2>
      <p className="mb-4">
        We take reasonable steps to protect your data. However, no system is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Children’s Privacy</h2>
      <p className="mb-4">
        This app is not intended for children under 13. We do not knowingly collect data from children. If we learn that we have collected data from a child, we will delete it.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Your Rights and Choices</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Request deletion of any provided personal information</li>
        <li>Disable analytics or ad tracking through device settings</li>
        <li>Contact us directly for data concerns</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy. Any changes will be posted here with a new effective date. Continued use of the app indicates your acceptance of the updated policy.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">9. Contact Us</h2>
      <p className="mb-4">
        If you have questions or concerns, contact us at:<br />
        📧 <strong>alexanderstubmichelsen@gmail.com</strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;

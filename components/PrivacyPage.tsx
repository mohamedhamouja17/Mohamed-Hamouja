
import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="mt-10 animate-fade-in max-w-4xl mx-auto px-4 pb-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Privacy Policy
        </h1>
        <p className="text-gray-500">Last Updated: January 2025</p>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100 text-gray-600 space-y-8">
        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. 
                This may include your name and email address. Since our service is free, we do not collect or store any payment information.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
            <p className="leading-relaxed">
                We use the information we collect to operate, maintain, and improve our services. This includes personalizing your experience, 
                responding to your comments and questions, and sending you technical notices, updates, and support messages.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Cookies and Tracking</h2>
            <p className="leading-relaxed">
                We use cookies and similar tracking technologies to track the activity on our service and hold certain information. 
                These help us understand how you use our site and improve user experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Third-Party Services</h2>
            <p className="leading-relaxed">
                We may employ third-party companies and individuals to facilitate our Service, to provide the Service on our behalf, 
                or to assist us in analyzing how our Service is used (e.g., Google Analytics). These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Contact Us</h2>
            <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:walzoo@hotmail.com" className="text-orange-500 hover:underline">walzoo@hotmail.com</a>
            </p>
        </section>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPage;

import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="mt-10 animate-fade-in max-w-4xl mx-auto px-4 pb-12">
       <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Terms of Use
        </h1>
        <p className="text-gray-500">Last Updated: January 2025</p>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100 text-gray-600 space-y-8">
        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
                By accessing and using Walzoo, you accept and agree to be bound by the terms and provision of this agreement. 
                In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Intellectual Property</h2>
            <p className="leading-relaxed">
                The content found on or through this Service are the property of Walzoo or used with permission. You may not distribute, modify, transmit, 
                reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. User Accounts</h2>
            <p className="leading-relaxed">
                When you create an account with us, you must provide us information that is accurate, complete, and current at all times. 
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
        </section>

         <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Limitation of Liability</h2>
            <p className="leading-relaxed">
                In no event shall Walzoo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, 
                special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
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

export default TermsPage;
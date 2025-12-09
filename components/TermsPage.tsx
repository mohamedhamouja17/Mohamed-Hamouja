
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
                If you do not agree to abide by the above, please do not use this service.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Use License</h2>
            <p className="leading-relaxed mb-4">
                Permission is granted to download copies of the materials (wallpapers and icons) on Walzoo's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials for commercial purposes;</li>
                <li>Use the materials for any commercial public display (commercial or non-commercial) without permission;</li>
                <li>Attempt to decompile or reverse engineer any software contained on Walzoo's website;</li>
                <li>Remove any copyright or other proprietary notations from the materials; or</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
        </section>

        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Disclaimer</h2>
            <p className="leading-relaxed">
                The materials on Walzoo's website are provided on an 'as is' basis. Walzoo makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Limitations</h2>
            <p className="leading-relaxed">
                In no event shall Walzoo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Walzoo's website.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Contact Us</h2>
            <p className="leading-relaxed">
                If you have any questions about these Terms, please contact us at: <a href="mailto:walzoo@hotmail.com" className="text-orange-500 hover:underline">walzoo@hotmail.com</a>
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

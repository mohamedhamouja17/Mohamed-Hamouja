import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="mt-10 animate-fade-in max-w-4xl mx-auto px-4 pb-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Contact Us
        </h1>
        <p className="text-xl text-gray-600">We'd love to hear from you!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input type="text" id="name" className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Your Name" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="your@email.com" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea id="message" rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="How can we help?"></textarea>
                </div>
                <button type="button" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors">
                    Send Message
                </button>
            </form>
        </div>

        <div className="space-y-8">
            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                <h3 className="font-bold text-gray-800 text-xl mb-4">Contact Information</h3>
                <p className="text-gray-600 mb-4">
                    Have a question about a wallpaper or icon pack? Need help with your subscription? Our support team is here to assist you.
                </p>
                <div className="space-y-3">
                    <p className="flex items-center gap-3 text-gray-700">
                        <span className="font-semibold">Email:</span> walzoo@hotmail.com
                    </p>
                    <p className="flex items-center gap-3 text-gray-700">
                        <span className="font-semibold">Hours:</span> Mon-Fri, 9am - 5pm EST
                    </p>
                </div>
            </div>
            
             <div className="bg-sky-50 p-8 rounded-2xl border border-sky-100">
                <h3 className="font-bold text-gray-800 text-xl mb-4">FAQ</h3>
                <div className="space-y-4">
                    <div>
                        <p className="font-semibold text-gray-800">Can I request a wallpaper?</p>
                        <p className="text-gray-600 text-sm">Yes! Send us your request via the form.</p>
                    </div>
                     <div>
                        <p className="font-semibold text-gray-800">Refund policy?</p>
                        <p className="text-gray-600 text-sm">We offer a 30-day money-back guarantee.</p>
                    </div>
                </div>
            </div>
        </div>
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

export default ContactPage;
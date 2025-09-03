import React, { useState } from 'react';
import { Button } from './button';
import { Calendar } from 'lucide-react';

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = "", onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    projectInfo: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission delay
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form data after submission
      setFormData({
        name: '',
        email: '',
        service: '',
        projectInfo: '',
        notes: ''
      });
      
      // Call onSuccess callback if provided and hide the success message after 3 seconds
      if (onSuccess) {
        setTimeout(() => {
          setIsSubmitted(false);
          onSuccess();
        }, 3000);
      }
    }, 1000);
  };

  return (
    <div className={`w-full ${className}`}>
      {isSubmitted ? (
        <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-white/20 text-center">
          <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Thank You!</h3>
          <p className="text-gray-300 mb-2 md:mb-3 text-sm md:text-base">
            Your request has been submitted. Our team will contact you shortly to schedule your free consultation.
          </p>
          <p className="text-gray-300 mb-2 md:mb-3 text-sm md:text-base">
            PLease check your spam if you do not see your confirmation.
          </p>
          <Button 
            variant="outline" 
            className="border-white/20 hover:bg-white/5 text-sm md:text-base py-2 px-4 mt-4"
            onClick={() => setIsSubmitted(false)}
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-3 md:mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-base"
              placeholder="Your full name"
            />
          </div>
          <div className="mb-3 md:mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-base"
              placeholder="your@email.com"
            />
          </div>
          <div className="mb-3 md:mb-4">
            <label htmlFor="service" className="block text-sm font-medium text-gray-200 mb-1">
              Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-black border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent appearance-none text-base"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem" }}
            >
              <option value="" disabled>Select a service</option>
              <option value="AI Lead Generation">AI Lead Generation</option>
              <option value="CRM Integration">CRM Integration</option>
              <option value="Website Creation">Website Creation</option>
            </select>
          </div>
          <div className="mb-3 md:mb-4">
            <label htmlFor="projectInfo" className="block text-sm font-medium text-gray-200 mb-1">
              Project Information
            </label>
            <textarea
              id="projectInfo"
              name="projectInfo"
              value={formData.projectInfo}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 bg-black border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent resize-none text-base"
              placeholder="Tell us about your project goals, timeline, and specific requirements"
            ></textarea>
          </div>
          <div className="mb-4 md:mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-200 mb-1">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 bg-black border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent resize-none text-base"
              placeholder="Any other information you'd like to share"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="bg-white text-black hover:bg-gray-200 transition-colors flex items-center justify-center font-bold tracking-tight py-2.5 px-6 text-sm md:text-base"
              disabled={isSubmitting}
              style={{
                textRendering: "optimizeLegibility",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale"
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Book Consultation'}
              {!isSubmitting && <Calendar className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export { ContactForm };

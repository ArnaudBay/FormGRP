import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// Schéma de validation avec Zod
const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  serviceType: z.enum(['webDesign', 'webDevelopment', 'logoDesign', 'other']),
  message: z.string().min(1, { message: "Message is required" }),
});

// Type déduit du schéma Zod
type FormData = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceType: 'webDevelopment', // Valeur par défaut
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form submitted:', data);
    alert('Form submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Contact Us</h1>
        <p className="text-center text-gray-500 mb-8">Any question or remarks? Just write us a message!</p>

        <div className="bg-white rounded-[20px] shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Panel */}
            <div className="bg-[#4C35DE] p-8 md:w-[360px] text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="mb-12 text-[#E5E5E5] text-sm">Fill up the form and our Team will get back to you within 24 hours.</p>

                <div className="space-y-7">
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6" />
                    <span>+0123 4567 8910</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6" />
                    <span>hello@flowbase.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-6 h-6" />
                    <span>102 Street 2714 Don</span>
                  </div>
                </div>

                <div className="flex space-x-4 mt-32">
                  <Facebook className="w-5 h-5 cursor-pointer hover:text-[#E5E5E5] transition-colors" />
                  <Twitter className="w-5 h-5 cursor-pointer hover:text-[#E5E5E5] transition-colors" />
                  <Instagram className="w-5 h-5 cursor-pointer hover:text-[#E5E5E5] transition-colors" />
                  <Linkedin className="w-5 h-5 cursor-pointer hover:text-[#E5E5E5] transition-colors" />
                </div>
              </div>

              
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#6F5CFA] rounded-full translate-x-16 translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#FF8FAB] rounded-full translate-x-8 translate-y-8"></div>
            </div>

            
            <div className="p-8 md:p-12 md:flex-1">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full pb-2 border-b border-gray-300 focus:border-[#4C35DE] focus:outline-none bg-transparent text-gray-800"
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full pb-2 border-b border-gray-300 focus:border-[#4C35DE] focus:outline-none bg-transparent text-gray-800"
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Mail</label>
                    <input
                      type="email"
                      className="w-full pb-2 border-b border-gray-300 focus:border-[#4C35DE] focus:outline-none bg-transparent text-gray-800"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full pb-2 border-b border-gray-300 focus:border-[#4C35DE] focus:outline-none bg-transparent text-gray-800"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-4">What type of website do you need?</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { id: 'webDesign', label: 'Web Design' },
                      { id: 'webDevelopment', label: 'Web Development' },
                      { id: 'logoDesign', label: 'Logo Design' },
                      { id: 'other', label: 'Other' },
                    ].map((service) => (
                      <div key={service.id} className="flex items-center">
                        <input
                          type="radio"
                          id={service.id}
                          value={service.id}
                          {...register('serviceType')}
                          className="w-4 h-4 text-[#4C35DE] border-gray-300 focus:ring-[#4C35DE] focus:ring-offset-0"
                        />
                        <label htmlFor={service.id} className="ml-2 text-sm text-gray-600">
                          {service.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.serviceType && (
                    <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full pb-2 border-b border-gray-300 focus:border-[#4C35DE] focus:outline-none bg-transparent resize-none text-gray-800"
                    placeholder="Write your message.."
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#4C35DE] text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-[#3929B4] transition-colors duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
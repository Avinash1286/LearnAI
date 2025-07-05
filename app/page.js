// Filename: app/page.js (or your preferred page/component path)
"use client";
import React from 'react';
import { 
  BrainCircuit, 
  BarChart3, 
  BookOpenCheck, 
  PlayCircle,
  CheckCircle,
  ArrowRight,
  Menu,
} from 'lucide-react';
import Link from 'next/link';

// For a production app, it's highly recommended to use the Next.js <Image /> component
// instead of the standard <img> tag to benefit from automatic image optimization.
// import Image from 'next/image';

/**
 * This helper component uses Next.js's built-in `styled-jsx` to inject
 * the custom animation keyframes and the `animate-blob` class globally.
 * This removes the need to configure `tailwind.config.js`.
 */
const AnimationStyles = () => (
  <style jsx global>{`
    @keyframes blob {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }

    .animate-blob {
      animation: blob 7s infinite;
    }

    .animation-delay-4000 {
        animation-delay: -4s;
    }
  `}</style>
);


//
// ----------------- SECTION COMPONENTS -----------------
//

const Header = () => {
  // In a real app, you'd use state (useState) to manage the mobile menu.
  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          <a href="#">LearnAI</a>
        </h1>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-white hover:text-blue-200 transition-colors">Features</a>
          <a href="#courses" className="text-white hover:text-blue-200 transition-colors">Courses</a>
          <a href="#pricing" className="text-white hover:text-blue-200 transition-colors">Pricing</a>
          <a href="#testimonials" className="text-white hover:text-blue-200 transition-colors">Testimonials</a>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/workspace">
          <button className="text-white hover:text-blue-200 transition-colors hover:cursor-pointer">Log In</button>
          </Link>

          <Link href="/workspace">
          <button className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-full hover:bg-blue-100 hover:cursor-pointer transition-all">
            Get Started
          </button>
          </Link>
        </div>
        <button className="md:hidden text-white">
          <Menu size={28} />
          {/* Add state and onClick to toggle a mobile menu dropdown */}
        </button>
      </div>
    </header>
  );
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white overflow-hidden">
    <div className="absolute inset-0 bg-black opacity-20"></div>
    {/* Animated background blobs. The `animate-blob` class is provided by our <AnimationStyles /> component. */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
    
    <div className="relative z-10 container mx-auto text-center px-6">
      <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
        Unlock Your Potential with AI-Powered Learning
      </h2>
      <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-blue-100">
        Experience a smarter way to learn. Our platform adapts to you, creating a unique educational journey to help you master new skills faster.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/workspace">  
        <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-blue-100 transform hover:cursor-pointer hover:scale-105 transition-all shadow-lg w-full sm:w-auto">
          Start Your Free Trial
        </button>
        </Link>

        <Link href="/workspace">
        <button className="flex items-center justify-center space-x-2 text-white font-semibold px-8 py-4 hover:cursor-pointer rounded-full text-lg hover:bg-white/10 transform hover:scale-105 transition-all w-full sm:w-auto">
          <PlayCircle />
          <span>See How It Works</span>
        </button>
        </Link>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    { icon: <BrainCircuit size={32} className="text-blue-500" />, title: "Personalized Learning Paths", description: "Our AI analyzes your skills and goals to create a custom learning roadmap just for you." },
    { icon: <BarChart3 size={32} className="text-purple-500" />, title: "Intelligent Recommendations", description: "Discover new courses and content perfectly matched to your interests and career ambitions." },
    { icon: <BookOpenCheck size={32} className="text-green-500" />, title: "Progress Tracking", description: "Visualize your growth with detailed analytics and stay motivated with milestone achievements." },
    { icon: <PlayCircle size={32} className="text-red-500" />, title: "Interactive Content", description: "Engage with hands-on projects, quizzes, and simulations that make learning stick." }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">A Smarter Way to Learn</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">Core features designed to maximize your learning efficiency and enjoyment.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="mb-4 inline-block p-4 bg-gray-100 rounded-full">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CourseCategoriesSection = () => {
    const categories = [
        { name: 'Web Development', courses: 25, img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80' },
        { name: 'Data Science', courses: 18, img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80' },
        { name: 'UI/UX Design', courses: 12, img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80' },
        { name: 'Marketing', courses: 30, img: 'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80' },
    ];

    return (
        <section id="courses" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Explore Our Courses</h2>
                <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-12">Find the perfect course to kickstart your career or learn a new skill.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map(category => (
                        <div key={category.name} className="relative rounded-lg overflow-hidden shadow-lg group transform hover:scale-105 transition-transform duration-300">
                            <img src={category.img} alt={category.name} className="w-full h-80 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                                <p className="text-blue-200">{category.courses} Courses</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = () => {
  const testimonials = [
    { quote: "LearnAI's personalized path helped me switch careers into tech. The progress tracking kept me motivated every single day!", name: "Sarah Johnson", title: "Software Engineer", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { quote: "The interactive content is miles ahead of anything else I've tried. I actually feel like I'm learning by doing, not just watching.", name: "Michael Chen", title: "Data Analyst", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
    { quote: "As a designer, I appreciate the beautiful UI, but the intelligent course recommendations are what truly blew me away.", name: "Emily Rodriguez", title: "UX Designer", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d" }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Loved by Learners Worldwide</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md flex flex-col">
              <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => (
    <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Flexible Plans for Everyone</h2>
            <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-12">Choose a plan that fits your learning style and budget.</p>
            <div className="flex flex-wrap justify-center gap-8">
                {/* Plans */}
                <div className="w-full max-w-sm border border-gray-200 rounded-lg p-8 flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold mb-2">Basic</h3>
                    <p className="text-gray-500 mb-4">For casual learners</p>
                    <p className="text-4xl font-bold mb-6">$12 <span className="text-lg font-normal text-gray-500">/month</span></p>
                    <ul className="space-y-3 mb-8 text-gray-600 flex-grow">
                        <li className="flex items-center"><CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Access to all courses</li>
                        <li className="flex items-center"><CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Basic progress tracking</li>
                    </ul>
                    <button className="w-full bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors">Choose Plan</button>
                </div>
                <div className="w-full max-w-sm border-2 border-blue-500 rounded-lg p-8 flex flex-col relative shadow-2xl scale-105">
                    <span className="absolute top-0 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>
                    <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                    <p className="text-gray-500 mb-4">For serious learners</p>
                    <p className="text-4xl font-bold mb-6">$29 <span className="text-lg font-normal text-gray-500">/month</span></p>
                    <ul className="space-y-3 mb-8 text-gray-600 flex-grow">
                        <li className="flex items-center"><CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> All Pro features</li>
                        <li className="flex items-center"><CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> AI-powered learning paths</li>
                        <li className="flex items-center"><CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Intelligent recommendations</li>
                    </ul>
                    <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors">Choose Plan</button>
                </div>
                <div className="w-full max-w-sm border border-gray-200 rounded-lg p-8 flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold mb-2">Teams</h3>
                    <p className="text-gray-500 mb-4">For organizations</p>
                    <p className="text-4xl font-bold mb-6">Contact Us</p>
                    <ul className="space-y-3 mb-8 text-gray-600 flex-grow">
                        <li className="flex items-center"><CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> All Pro features</li>
                        <li className="flex items-center"><CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Team progress dashboards</li>
                    </ul>
                    <button className="w-full bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors">Contact Sales</button>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white">
    <div className="container mx-auto py-12 px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="mb-6 md:mb-0"><h3 className="text-lg font-bold mb-4">LearnAI</h3><p className="text-gray-400">A smarter way to master new skills.</p></div>
        <div><h4 className="font-semibold mb-4">Quick Links</h4><ul className="space-y-2"><li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li><li><a href="#courses" className="text-gray-400 hover:text-white">Courses</a></li><li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li></ul></div>
        <div><h4 className="font-semibold mb-4">Support</h4><ul className="space-y-2"><li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li><li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li><li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li></ul></div>
        <div><h4 className="font-semibold mb-4">Stay Connected</h4><p className="text-gray-400 mb-4">Get the latest updates and offers.</p><form className="flex"><input type="email" placeholder="Your email" className="w-full rounded-l-md px-3 py-2 text-gray-800 focus:outline-none" aria-label="Your email"/><button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-md" aria-label="Subscribe"><ArrowRight size={20} /></button></form></div>
      </div>
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500"><p>© {new Date().getFullYear()} LearnAI. All rights reserved.</p></div>
    </div>
  </footer>
);


//
// ----------------- MAIN PAGE COMPONENT -----------------
//

const AILearningPlatformPage = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      <AnimationStyles />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CourseCategoriesSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default AILearningPlatformPage;
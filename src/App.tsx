import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, User, Briefcase, MessageCircle, ChevronDown, Star, Calendar, MapPin } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  featured: boolean;
}

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
}

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Sample data - replace with your actual information
  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "TypeScript"],
      githubUrl: "https://github.com/naimnohan/ecommerce",
      liveUrl: "https://your-ecommerce-demo.com",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and progress tracking.",
      technologies: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/naimnohan/taskapp",
      liveUrl: "https://your-taskapp-demo.com",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      featured: true
    },
    {
      id: 3,
      title: "Weather Analytics Dashboard",
      description: "A comprehensive weather analytics platform with interactive charts, forecasting, and location-based insights.",
      technologies: ["React", "D3.js", "Express.js", "PostgreSQL"],
      githubUrl: "https://github.com/naimnohan/weather-dashboard",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
      featured: false
    }
  ];

  const skills: Skill[] = [
    { name: "React", level: 95, category: 'frontend' },
    { name: "TypeScript", level: 90, category: 'frontend' },
    { name: "JavaScript", level: 95, category: 'frontend' },
    { name: "Node.js", level: 85, category: 'backend' },
    { name: "Python", level: 80, category: 'backend' },
    { name: "MongoDB", level: 85, category: 'backend' },
    { name: "Git", level: 90, category: 'tools' },
    { name: "Docker", level: 75, category: 'tools' }
  ];

  const experiences: Experience[] = [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Frontend Developer",
      duration: "2023 - Present",
      location: "San Francisco, CA",
      description: [
        "Lead development of customer-facing web applications serving 100K+ users",
        "Implemented modern React patterns and performance optimizations",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      company: "Digital Solutions Ltd.",
      position: "Full Stack Developer",
      duration: "2021 - 2023",
      location: "New York, NY",
      description: [
        "Built and maintained multiple client projects using React and Node.js",
        "Collaborated with design teams to implement pixel-perfect UI components",
        "Integrated third-party APIs and payment processing systems"
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const NavItem: React.FC<{ id: string; label: string; icon: React.ReactNode }> = ({ id, label, icon }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        activeSection === id
          ? 'bg-blue-500 text-white shadow-lg'
          : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
        <span className="text-sm text-gray-500">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        {project.featured && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star size={12} />
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Github size={16} />
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </h1>
            <div className="flex items-center gap-2">
              <NavItem id="home" label="Home" icon={<User size={18} />} />
              <NavItem id="about" label="About" icon={<User size={18} />} />
              <NavItem id="skills" label="Skills" icon={<Code size={18} />} />
              <NavItem id="projects" label="Projects" icon={<Briefcase size={18} />} />
              <NavItem id="experience" label="Experience" icon={<Calendar size={18} />} />
              <NavItem id="contact" label="Contact" icon={<MessageCircle size={18} />} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 animate-fade-in">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Naim Nohan
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in-delay">
              Full Stack Developer & UI/UX Enthusiast
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto animate-fade-in-delay-2">
              I create beautiful, functional, and user-friendly applications that solve real-world problems.
              Passionate about clean code, modern technologies, and exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center">
                    <User size={120} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-lg text-gray-600 mb-6">
                  I'm a passionate full-stack developer with over 3 years of experience creating
                  digital solutions that make a difference. I specialize in React, TypeScript,
                  and modern web technologies.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  When I'm not coding, you can find me exploring new technologies, contributing
                  to open-source projects, or sharing knowledge with the developer community.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/naimnohan"
                    className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/naimnohan"
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="mailto:your.email@example.com"
                    className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Skills & Technologies</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {['frontend', 'backend', 'tools'].map((category) => (
                <div key={category} className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 capitalize">
                    {category === 'frontend' ? 'Frontend' : category === 'backend' ? 'Backend' : 'Tools & Others'}
                  </h3>
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, index) => (
                      <SkillBar key={index} skill={skill} />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 flex items-center gap-1">
                        <Calendar size={16} />
                        {exp.duration}
                      </p>
                      <p className="text-gray-500 flex items-center gap-1">
                        <MapPin size={16} />
                        {exp.location}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Let's Work Together</h2>
            <p className="text-xl text-gray-600 mb-12">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:your.email@example.com"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Mail size={20} />
                Send me an email
              </a>
              <a
                href="https://linkedin.com/in/naimnohan"
                className="flex items-center gap-3 px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                <Linkedin size={20} />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Your Name. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }
        
        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
};

export default App;
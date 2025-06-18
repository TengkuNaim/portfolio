import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Home,
  User,
  Briefcase,
  MessageCircle,
  ChevronDown,
  Star,
  Calendar,
  MapPin,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import me from "./assets/naim.jpg";
import Typewriter from "typewriter-effect";
import Tilt from "react-parallax-tilt";

// Import Swiper styles and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
  category: "frontend" | "backend" | "tools";
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
}

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1280);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const projects: Project[] = [
    {
      id: 1,
      title: "Math Worksheet",
      description: "A simple math worksheet based on www.mathinenglish.com.",
      technologies: ["Vue", "Node.js", "Tailwind", "TypeScript"],
      githubUrl: "https://github.com/TengkuNaim/bridge-asia-math-worksheet",
      liveUrl: "https://tengkunaim.github.io/bridge-asia-math-worksheet/",
      image:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      featured: true,
    },
  ];

  const skills: Skill[] = [
    { name: "React", level: 50, category: "frontend" },
    { name: "TypeScript", level: 70, category: "frontend" },
    { name: "JavaScript", level: 85, category: "frontend" },
    { name: "Node.js", level: 70, category: "backend" },
    { name: "MySql", level: 70, category: "backend" },
    { name: "Git", level: 70, category: "tools" },
    { name: "Laravel", level: 75, category: "backend" },
    { name: "Tailwind CSS", level: 60, category: "frontend" },
    { name: "REST APIs", level: 80, category: "backend" },
    { name: "Next.js", level: 70, category: "frontend" },
    { name: "Express.js", level: 70, category: "backend" },
  ];

  const experiences: Experience[] = [
    {
      company: "TalentCloud.ai Sdn. Bhd.",
      position: "Software Engineer",
      duration: "2024 - Present",
      location: "Kuala Lumpur, Malaysia",
      description: [
        "Developed and maintained Human Capital Management (HCM) software for enterprise clients.",
        "Collaborated with QA and backend teams to ensure system reliability, scalability, and security.",
        "Identified and resolved software defects, improving system stability and user experience.",
        "Implemented new features and enhancements based on client feedback and business requirements.",
        "Participated in code reviews and contributed to team knowledge sharing.",
        "Worked with cross-functional teams to deliver high-quality software solutions.",
      ],
    },
    {
      company: "Detik Ideal Sdn Bhd",
      position: "Software Developer",
      duration: "2021 - 2024",
      location: "Petaling Jaya, Malaysia",
      description: [
        "Led development for Celcom's Telco Microservices Migration, modernizing legacy systems using Perl and Node.js.",
        "Worked closely with stakeholders to translate business needs into technical solutions.",
        "Conducted UAT and post-deployment validation, ensuring smooth production releases.",
        "Spearheaded critical deployments, providing on-site and remote support for high-priority updates.",
        "Built a Smart Health Care tracking system using Vue.js, Mapbox, and MapLibre for real-time location data.",
        "Contributed to an in-house Digital Office platform using SwiftUI for cross-platform compatibility.",
      ],
    },
  ];

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1280);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    // Set up Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    // Observe all sections
    const sections = [
      "home",
      "about",
      "skills",
      "projects",
      "experience",
      "contact",
    ];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        sectionRefs.current[section] = element;
        observer.observe(element);
      }
    });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Clean up observer
      sections.forEach((section) => {
        const element = sectionRefs.current[section];
        if (element) observer.unobserve(element);
      });
    };
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const NavItem: React.FC<{
    id: string;
    label: string;
    icon: React.ReactNode;
    isMobile?: boolean;
  }> = ({ id, label, icon, isMobile = false }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        activeSection === id
          ? "bg-blue-500 text-white shadow-lg"
          : "text-gray-600 hover:text-blue-500 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      {(isMobile || !isMobile) && (
        <span className={isMobile ? "" : "hidden md:inline"}>{label}</span>
      )}
    </button>
  );

  const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {skill.name}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
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
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium"
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

  const ExperienceCard: React.FC<{ exp: Experience }> = ({ exp }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {exp.position}
          </h3>
          <p className="text-blue-600 dark:text-blue-400 font-medium">
            {exp.company}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <Calendar size={16} />
            {exp.duration}
          </p>
          <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <MapPin size={16} />
            {exp.location}
          </p>
        </div>
      </div>
      <ul className="space-y-2">
        {exp.description.map((item, idx) => (
          <li
            key={idx}
            className="text-gray-600 dark:text-gray-300 flex items-start gap-2"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl transition-all duration-1000 dark:from-blue-600/20 dark:to-purple-600/20"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Welcome!
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <NavItem id="home" label="Home" icon={<Home size={18} />} />
              <NavItem id="about" label="About" icon={<User size={18} />} />
              <NavItem id="skills" label="Skills" icon={<Code size={18} />} />
              <NavItem
                id="projects"
                label="Projects"
                icon={<Briefcase size={18} />}
              />
              <NavItem
                id="experience"
                label="Experience"
                icon={<Calendar size={18} />}
              />
              <NavItem
                id="contact"
                label="Contact"
                icon={<MessageCircle size={18} />}
              />
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
              <NavItem
                id="home"
                label="Home"
                icon={<User size={18} />}
                isMobile
              />
              <NavItem
                id="about"
                label="About"
                icon={<User size={18} />}
                isMobile
              />
              <NavItem
                id="skills"
                label="Skills"
                icon={<Code size={18} />}
                isMobile
              />
              <NavItem
                id="projects"
                label="Projects"
                icon={<Briefcase size={18} />}
                isMobile
              />
              <NavItem
                id="experience"
                label="Experience"
                icon={<Calendar size={18} />}
                isMobile
              />
              <NavItem
                id="contact"
                label="Contact"
                icon={<MessageCircle size={18} />}
                isMobile
              />
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative pt-16"
      >
        <div className="container mx-auto px-6 text-center">
          <div
            className={`max-w-4xl mx-auto ${isLargeScreen ? "max-w-6xl" : ""}`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6 animate-fade-in">
              Hi, I'm{" "}
              <Typewriter
                options={{
                  strings: ["Naim Nohan", "a Software Engineer"],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: "natural",
                }}
              />{" "}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-delay">
              Full Stack Developer & UI/UX Enthusiast
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in-delay-2">
              Passionate in creating functional, and user-friendly applications
              that solve real-world problems. Believe in clean code, modern
              technologies, and exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 border-2 border-blue-500 text-blue-500 dark:text-white dark:border-white rounded-full font-semibold hover:bg-blue-500 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 inset-x-0 flex justify-center animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown
            size={32}
            className="text-gray-400 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div
            className={`max-w-4xl mx-auto ${isLargeScreen ? "max-w-6xl" : ""}`}
          >
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Tilt
                tiltEnable={true}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                scale={1.05}
                transitionSpeed={1000}
              >
                <div className="flex justify-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center p-1">
                    <div className="w-full h-full bg-white dark:bg-gray-700 rounded-full overflow-hidden">
                      <img
                        src={me}
                        alt="Your Name"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Tilt>
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Software engineer by day, mountain conqueror by weekend (P.S.
                  it's been a while since my last hike). I'm the kind of person
                  who writes clean, efficient code while sipping on my third cup
                  of coffee (caramel, obviously). A big fan of Chelsea FC, team
                  wins, and the thrill of chasing bugs and bargains (seriously,
                  hit me up if you spot any deals).
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  I believe great tech doesn't have to be complicated—and
                  neither should getting freebies. Whether I'm hiking a trail or
                  debugging a system, I bring curiosity, care, and just the
                  right amount of cheek. Let's build something solid (and maybe
                  grab a free coffee along the way)
                </p>

                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <MapPin
                      size={20}
                      className="text-gray-500 dark:text-gray-400 mr-2"
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      Selangor, Malaysia
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone
                      size={20}
                      className="text-gray-500 dark:text-gray-400 mr-2"
                    />
                    <a
                      href="tel:+60122948862"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      +60 12-2948862
                    </a>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mb-6 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127481.5571078375!2d101.5184769!3d3.0732814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4d8d3830bad3%3A0x9c10c03b3c6790e4!2sSelangor!5e0!3m2!1sen!2smy!4v1621234567890"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="rounded-lg shadow-md"
                    title="Location in Selangor, Malaysia"
                  ></iframe>
                </div>

                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/in/naimnohan"
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="mailto:naimnohan@gmail.com"
                    className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors dark:bg-red-600 dark:hover:bg-red-500"
                  >
                    <Mail size={20} />
                  </a>
                  <a
                    href="tel:+60122948862"
                    className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors dark:bg-green-600 dark:hover:bg-green-500"
                  >
                    <Phone size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div
            className={`max-w-4xl mx-auto ${isLargeScreen ? "max-w-6xl" : ""}`}
          >
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
              Skills & Technologies
            </h2>

            {/* Desktop View - Grid Layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {["frontend", "backend", "tools"].map((category) => (
                <div
                  key={category}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 capitalize">
                    {category === "frontend"
                      ? "Frontend"
                      : category === "backend"
                      ? "Backend"
                      : "Tools & Others"}
                  </h3>
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill, index) => (
                      <SkillBar key={index} skill={skill} />
                    ))}
                </div>
              ))}
            </div>

            {/* Mobile View - Swiper Carousel */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
              >
                {["frontend", "backend", "tools"].map((category) => (
                  <SwiperSlide key={category}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-full">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 capitalize">
                        {category === "frontend"
                          ? "Frontend"
                          : category === "backend"
                          ? "Backend"
                          : "Tools & Others"}
                      </h3>
                      {skills
                        .filter((skill) => skill.category === category)
                        .map((skill, index) => (
                          <SkillBar key={index} skill={skill} />
                        ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div
            className={`max-w-6xl mx-auto ${isLargeScreen ? "max-w-7xl" : ""}`}
          >
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
              Featured Projects
            </h2>

            {/* Desktop View - Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Mobile View - Swiper Carousel */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 1.5,
                  },
                }}
              >
                {projects.map((project) => (
                  <SwiperSlide key={project.id}>
                    <div className="pb-10 px-2">
                      {" "}
                      {/* Add padding to prevent shadow clipping */}
                      <ProjectCard project={project} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div
            className={`max-w-4xl mx-auto ${isLargeScreen ? "max-w-6xl" : ""}`}
          >
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
              Experience
            </h2>

            {/* Desktop View - List Layout */}
            <div className="hidden md:block space-y-8">
              {experiences.map((exp, index) => (
                <ExperienceCard key={index} exp={exp} />
              ))}
            </div>

            {/* Mobile View - Swiper Carousel */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
              >
                {experiences.map((exp, index) => (
                  <SwiperSlide key={index}>
                    <div className="pb-10 px-2">
                      {" "}
                      {/* Add padding to prevent shadow clipping */}
                      <ExperienceCard exp={exp} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div
            className={`max-w-4xl mx-auto text-center ${
              isLargeScreen ? "max-w-6xl" : ""
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              I'm always open to discussing new opportunities and interesting
              projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:naimnohan@gmail.com"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Mail size={20} />
                Send me an email
              </a>
              <a
                href="https://linkedin.com/in/naimnohan"
                className="flex items-center gap-3 px-8 py-4 border-2 border-blue-500 text-blue-500 dark:text-white dark:border-white rounded-full font-semibold hover:bg-blue-500 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
              >
                <Linkedin size={20} />
                Connect on LinkedIn
              </a>
            </div>

            {/* Ko-fi Donation Section */}
            <div className="mt-16">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Buy me a coffee
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
                If you enjoy my work and would like to support me, you can buy
                me a coffee!
              </p>
              <a
                href="https://ko-fi.com/naimnohan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  height="36"
                  style={{ border: "0px", height: "36px" }}
                  src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
                  alt="Buy Me a Coffee at ko-fi.com"
                  className="mx-auto"
                />
              </a>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                https://ko-fi.com/naimnohan{" "}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Naim Nohan. Built with React,
            TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

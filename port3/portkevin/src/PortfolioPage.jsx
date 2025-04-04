// PortfolioPage.jsx - With Enhanced Mobile Experience
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Crosshair from './Crosshair';
import './PortfolioStyles.css';
import Footer from './Footer';

import { Helmet } from 'react-helmet';

const PortfolioPage = () => {
    const [activeProject, setActiveProject] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [mobileTab, setMobileTab] = useState('projects'); // 'projects' or 'skills'

    const projectsRef = useRef(null);
    const skillsRef = useRef(null);
    const portfolioContainerRef = useRef(null);
    const navigate = useNavigate();

    // Check window size to determine mobile view
    useEffect(() => {
        const checkMobileView = () => {
            setMobileView(window.innerWidth < 768);
        };

        // Initial check
        checkMobileView();

        // Listen for resize events
        window.addEventListener('resize', checkMobileView);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    // List of all possible skills
    const allSkills = [
        "Web Development",
        "React",
        "Tailwind",
        "GSAP",
        "Figma",
        "UI/UX",
        "3D Modeling",
        "3D Rendering",
        "Web Animations",
        "HTML",
        "CSS",
        "JavaScript",
        "Framer Motion",
        "Three.js"
    ];

    // Sample project data with associated skills
    const projects = [
        {
            id: "01",
            title: "FONTS.LOCAL",
            image: "/img/fontlocalcover.jpg",
            caption: "A digital art gallery that showcases the diverse range of styles and techniques used in Graffiti and Street Art.",
            skills: ["Web Development", "React", "Tailwind", "JavaScript", "CSS", "Figma", "UI/UX", "3D Modeling", "3D Rendering", "Web Animations"]
        },
        {
            id: "02",
            title: "DOUBLEBACK CONCEPT STORE",
            image: "/img/dbconceptcover.jpg",
            caption: "Concept storefront for a curated collection of unique and exclusive clothing products",
            skills: ["UI/UX", "Figma", "JavaScript", "CSS", "HTML"]
        },
        {
            id: "03",
            title: "COURTFINDER+",
            image: "/img/cfcover.JPG",
            caption: "A glossary of basketball courts in the lower mainland in British Columbia.",
            skills: ["Web Development", "React", "JavaScript", "UI/UX", "GSAP", "Figma", "Tailwind"]
        },
        {
            id: "04",
            title: "KIAMVP",
            image: "/img/kiacover.webp",
            caption: "Artists of the 17th century often included elements of idealized rural life, blending natural beauty with classical architectural elements.",
            skills: ["3D Modeling", "3D Rendering", "Web Animations", "GSAP", "JavaScript", "React", "Tailwind", "UI/UX", "Figma"]
        },
        {
            id: "05",
            title: "TERRA LINKTREE REDESIGN",
            image: "/img/terracover.mp4",
            caption: "A redesign for a static linktree to promote a more dynamic and engaging experience.",
            skills: ["Web Development", "React", "Tailwind", "UI/UX", "Figma", "JavaScript", "GSAP", "Framer Motion", "CSS"]
        },
        {
            id: "06",
            title: "3D ART GALLERY",
            image: "/img/threejscover.jpeg",
            caption: "A 3d museum viewing with user controls.",
            skills: ["Web Development", "HTML", "CSS", "UI/UX", "Figma", "JavaScript", "Three.js"]
        }
    ];

    // Track image loading status
    const handleImageLoad = (id) => {
        console.log(`Image loaded for project ${id}`);
        setImagesLoaded(prev => ({ ...prev, [id]: true }));
    };

    const handleImageError = (id) => {
        console.error(`Failed to load image for project ${id}`);
        setImagesLoaded(prev => ({ ...prev, [id]: true }));
    };

    // Apply spotlight effect for projects
    useEffect(() => {
        const applyProjectsSpotlight = () => {
            if (!projectsRef.current) return;

            const projectLinks = projectsRef.current.querySelectorAll('.project-item');
            const projectLinksArray = [...projectLinks];

            // Initialize all projects with full opacity
            gsap.set(projectLinksArray, {
                opacity: 1
            });

            projectLinksArray.forEach((currentLink, index) => {
                const otherLinks = projectLinksArray.filter(link => link !== currentLink);

                currentLink.addEventListener('mouseenter', () => {
                    setActiveProject(index);
                    gsap.to(otherLinks, {
                        opacity: 0.2,
                        duration: 0.15,
                        ease: 'power1.out'
                    });
                });

                currentLink.addEventListener('mouseleave', () => {
                    setActiveProject(null);
                    gsap.to(otherLinks, {
                        opacity: 1,
                        duration: 0.15,
                        ease: 'power1.out'
                    });
                });
            });
        };

        // Apply spotlight effect
        applyProjectsSpotlight();

        // Cleanup
        return () => {
            if (projectsRef.current) {
                const projectLinks = projectsRef.current.querySelectorAll('.project-item');
                projectLinks.forEach(link => {
                    link.removeEventListener('mouseenter', () => { });
                    link.removeEventListener('mouseleave', () => { });
                });
            }
        };
    }, []);

    // Highlight skills when project is hovered
    useEffect(() => {
        if (skillsRef.current) {
            const skillElements = skillsRef.current.querySelectorAll('.skill-item');

            if (activeProject === null) {
                // When no project is selected, all skills have full opacity
                gsap.to(skillElements, {
                    opacity: 1,
                    duration: 0.15,
                    ease: 'power1.out'
                });
            } else {
                // Get current project's skills
                const currentProjectSkills = projects[activeProject].skills;

                skillElements.forEach((element, index) => {
                    const skill = allSkills[index];

                    if (currentProjectSkills.includes(skill)) {
                        gsap.to(element, {
                            opacity: 1,
                            duration: 0.15,
                            ease: 'power1.out'
                        });
                    } else {
                        gsap.to(element, {
                            opacity: 0.2,
                            duration: 0.15,
                            ease: 'power1.out'
                        });
                    }
                });
            }
        }
    }, [activeProject]);

    // Handle view project details for mobile
    const handleViewProjectDetails = (projectIndex) => {
        if (projectIndex !== null) {
            navigate(`/project/${projects[projectIndex].id}`);
        }
    };

    // Get current project or use a placeholder
    const currentProject = activeProject !== null ? projects[activeProject] : {
        id: "00",
        title: "",
        image: "",
        caption: mobileView ? "Select a project from the list" : "Hover over a project to see details",
        skills: []
    };

    // Make project items function as links for the Crosshair component
    useEffect(() => {
        if (projectsRef.current) {
            const projectItems = projectsRef.current.querySelectorAll('.project-item');
            projectItems.forEach(item => {
                // Add a class to make the Crosshair component identify these as link elements
                item.classList.add('crosshair-link');
                // Add href attribute for the Crosshair component to detect as a link
                item.setAttribute('role', 'link');
                item.setAttribute('tabIndex', '0');
            });
        }
    }, []);

    return (
        <>
            <Helmet>
                {/* Basic Metadata */}
                <title>Portfolio | Kevin Lazo - Web Developer & Designer</title>
                <meta name="description" content="Explore Kevin Lazo's web development and design projects, showcasing expertise in React, UI/UX, animations, and interactive experiences." />

                {/* Search Engine Optimization */}
                <link rel="canonical" href="https://madebykevinlazo.com" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Portfolio | Kevin Lazo - Web Developer & Designer" />
                <meta property="og:description" content="Explore Kevin Lazo's web development and design projects, showcasing expertise in React, UI/UX, animations, and interactive experiences." />
                <meta property="og:image" content="https://madebykevinlazo.com/img/throw.png" />
                <meta property="og:url" content="https://madebykevinlazo.com" />

                {/* Twitter */}
                <meta name="twitter:title" content="Portfolio | Kevin Lazo - Web Developer & Designer" />
                <meta name="twitter:description" content="Explore Kevin Lazo's web development and design projects, showcasing expertise in React, UI/UX, animations, and interactive experiences." />
                <meta name="twitter:image" content="https://madebykevinlazo.com/img/throw.png" />
            </Helmet>
            <Navbar />

            {/* Mobile Menu Toggle */}
            {mobileView && (
                <div className="fixed top-0 right-0 z-40 p-4">
                    <motion.button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="bg-white p-2"
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className={`w-6 h-0.5 bg-black mb-1.5 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-black mb-1.5 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-black transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                    </motion.button>
                </div>
            )}

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {mobileView && mobileMenuOpen && (
                    <motion.div
                        className="fixed top-14 left-0 right-0 bg-white z-30 shadow-md"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav className="p-4 border-b border-black/10">
                            <div className="flex font-montreal mb-4">
                                <button
                                    onClick={() => setMobileTab('projects')}
                                    className={`flex-1 py-2 text-center uppercase text-sm tracking-wide ${mobileTab === 'projects' ? 'text-[#bf0a30] font-semibold border-b-2 border-[#bf0a30]' : 'text-[#666]'}`}
                                >
                                    Projects
                                </button>
                                <button
                                    onClick={() => setMobileTab('skills')}
                                    className={`flex-1 py-2 text-center uppercase text-sm tracking-wide ${mobileTab === 'skills' ? 'text-[#bf0a30] font-semibold border-b-2 border-[#bf0a30]' : 'text-[#666]'}`}
                                >
                                    Skills
                                </button>
                            </div>

                            {mobileTab === 'projects' && (
                                <motion.ul
                                    className="flex flex-col gap-3 font-montreal"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {projects.map((project, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05, duration: 0.2 }}
                                        >
                                            <button
                                                onClick={() => {
                                                    setActiveProject(index);
                                                    setMobileMenuOpen(false);
                                                }}
                                                className={`text-left text-sm uppercase tracking-wide py-2 w-full ${activeProject === index ? 'text-[#bf0a30] font-semibold' : 'text-[#666]'}`}
                                            >
                                                {project.title}
                                            </button>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            )}

                            {mobileTab === 'skills' && (
                                <motion.div
                                    className="flex flex-wrap gap-2 font-montreal"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {allSkills.map((skill, index) => (
                                        <motion.span
                                            key={index}
                                            className={`px-3 py-1 text-xs border ${activeProject !== null && projects[activeProject].skills.includes(skill)
                                                ? 'border-[#bf0a30] text-[#bf0a30]'
                                                : 'border-[#666] text-[#666]'
                                                }`}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.03, duration: 0.2 }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Layout */}
            <div
                className={`portfolio-container pb-12 ${mobileView ? 'hidden' : 'flex'}`} // Add pb-12 for footer space
                ref={portfolioContainerRef}
            >
                {/* Add Crosshair component only for desktop view */}
                {!mobileView && <Crosshair color="#bf0a30" containerRef={portfolioContainerRef} />}

                {/* Projects Column */}
                <div className="projects-column" ref={projectsRef}>
                    <div className="project-items">
                        <p className="font-montrealbold pb-4">Projects</p>
                        {projects.map((project, index) => (
                            <a
                                key={index}
                                href={`/project/${project.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/project/${project.id}`);
                                }}
                                className={`project-item spotlight-transition ${index === activeProject ? "active" : ""}`}
                                onMouseEnter={() => setActiveProject(index)}
                                onMouseLeave={() => setActiveProject(null)}
                            >
                                {project.title}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Skills Column */}
                <div className="skills-column" ref={skillsRef}>
                    <div className="skill-items">
                        <p className="font-montrealbold pb-4">Skills</p>
                        {allSkills.map((skill, index) => (
                            <div
                                key={index}
                                className={`skill-item spotlight-transition ${activeProject !== null && currentProject.skills.includes(skill) ? "active" : ""}`}
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Column */}
                <div className="content-column">
                    {/* Main image with logging */}
                    <div className="image-container">
                        {activeProject !== null ? (
                            currentProject.image.endsWith('.mp4') ? (
                                <video
                                    key={`video-${currentProject.id}`}
                                    src={currentProject.image}
                                    alt={currentProject.title}
                                    className="project-image"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : (
                                <img
                                    key={`img-${currentProject.id}`}
                                    src={currentProject.image}
                                    alt={currentProject.title}
                                    className="project-image"
                                    loading="eager"
                                    onLoad={() => handleImageLoad(currentProject.id)}
                                    onError={() => handleImageError(currentProject.id)}
                                />
                            )
                        ) : (
                            <div className="empty-state font-montreal">Select a project to view</div>
                        )}
                    </div>

                    {/* Caption and page number */}
                    <div className="content-footer">
                        <div className="project-caption">
                            {activeProject !== null ? currentProject.caption : "Hover over a project to see details"}
                        </div>
                        <div className="page-number">
                            {activeProject !== null ? `${currentProject.id} / ${projects.length.toString().padStart(2, '0')}` : ""}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            {mobileView && (
                <div className="mobile-portfolio-container px-4 pt-16 pb-24 bg-white min-h-screen">
                    {/* Page Header - Mobile */}
                    <div className="mb-6">
                        <motion.h1
                            className="text-2xl font-montreal uppercase tracking-wider mb-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Portfolio
                        </motion.h1>
                        <motion.p
                            className="text-sm text-gray-500 font-montreal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Selected projects and work
                        </motion.p>
                    </div>

                    {/* Content Section */}
                    <motion.div
                        className="mobile-content-section mb-6 bg-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject}
                                className="image-container aspect-[4/3] bg-white mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeProject !== null ? (
                                    currentProject.image.endsWith('.mp4') ? (
                                        <video
                                            key={`video-${currentProject.id}`}
                                            src={currentProject.image}
                                            alt={currentProject.title}
                                            className="w-full h-full object-cover"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                        />
                                    ) : (
                                        <img
                                            key={`img-${currentProject.id}`}
                                            src={currentProject.image}
                                            alt={currentProject.title}
                                            className="w-full h-full object-cover"
                                            loading="eager"
                                            onLoad={() => handleImageLoad(currentProject.id)}
                                            onError={() => handleImageError(currentProject.id)}
                                        />
                                    )
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center font-montreal text-[#666] bg-gray-50">
                                        Select a project to view
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            {activeProject !== null && (
                                <motion.div
                                    className="mobile-project-details bg-white"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="text-2xl font-montreal mb-2">{currentProject.title}</h2>
                                    <p className="text-sm text-[#666] mb-4 font-montreal">{currentProject.caption}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {currentProject.skills.map((skill, index) => (
                                            <motion.span
                                                key={index}
                                                className="text-xs border border-[#666] px-2 py-1 text-[#666] font-montreal"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.03, duration: 0.2 }}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>

                                    <motion.button
                                        onClick={() => handleViewProjectDetails(activeProject)}
                                        className="bg-[#bf0a30] text-white py-3 px-6 font-montreal text-sm uppercase tracking-wide w-full"
                                        whileHover={{ backgroundColor: "#a00920" }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        View Project Details
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Project Selection Pills - Always Visible */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-40">
                        <div className="flex overflow-x-auto gap-2 pb-1">
                            {projects.map((project, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setActiveProject(index)}
                                    className={`whitespace-nowrap px-3 py-2 text-xs font-montreal ${activeProject === index
                                        ? 'bg-[#bf0a30] text-white'
                                        : 'bg-gray-100 text-[#666]'
                                        }`}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {project.title}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default PortfolioPage;
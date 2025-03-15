// ProjectPage.jsx
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useSpotlightEffect } from './useSpotlightEffect';

// Sample project data (you would likely fetch this from an API in a real app)
const projects = [
    {
        id: '01',
        total: '05',
        title: 'Naples Bay View',
        category: 'Landscape Modeling',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
        description: 'A detailed landscape model depicting Naples Bay with mountains in the background during sunset.',
        tags: ['Landscape', 'Painting', 'Nature']
    },
    {
        id: '02',
        total: '05',
        title: 'Ship with Sails',
        category: 'Maritime Modeling',
        image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=2070&auto=format&fit=crop',
        description: 'Historical maritime model featuring detailed sails and rigging of an 18th century vessel.',
        tags: ['Maritime', 'History', 'Painting']
    },
    {
        id: '03',
        total: '05',
        title: 'Mountain Peaks',
        category: 'Terrain Modeling',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop',
        description: 'Stunning terrain model showcasing the majesty of snow-capped mountain peaks at dusk.',
        tags: ['Mountains', 'Nature', 'Landscape']
    },
    {
        id: '04',
        total: '05',
        title: 'Ocean Sunset',
        category: 'Seascape Modeling',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop',
        description: 'Vibrant seascape model capturing the golden colors of a sunset over calm ocean waters.',
        tags: ['Ocean', 'Sunset', 'Nature']
    },
    {
        id: '05',
        total: '05',
        title: 'Forest Path',
        category: 'Environmental Modeling',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop',
        description: 'Immersive environmental model featuring a winding path through a dense, sunlit forest.',
        tags: ['Forest', 'Path', 'Nature']
    }
];

// Main navigation categories and subcategories
const navigationItems = [
    {
        category: "Design",
        subcategories: [
            "Graphic Design",
            "Motion Graphics",
            "Web Design",
            "Branding",
            "Typography",
            "UI/UX Design",
            "Print Design",
            "Design Thinking"
        ]
    },
    {
        category: "Photography",
        subcategories: [
            "Modern Typography",
            "Character Modeling",
            "Color Theory",
            "Print Design",
            "Technical Writing",
            "Digital Illustration",
            "Art Direction",
            "2D Animation"
        ]
    },
    {
        category: "Modeling",
        subcategories: [
            "3D Rendering",
            "Character Design",
            "Storyboarding",
            "Graphic Design",
            "Ideation",
            "3D Typography",
            "Color Theory",
            "Creative Direction"
        ]
    },
    {
        category: "Architecture",
        subcategories: [
            "Product Design",
            "Visual Design",
            "Design Systems",
            "2D Animation",
            "3D Architecture",
            "Interaction Design",
            "Web Development"
        ]
    }
];

export default function ProjectPage() {
    const [currentProject, setCurrentProject] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Apply the spotlight effect to our navigation elements
    useSpotlightEffect('.nav-link', 0.2, 0.3);

    // Function to navigate between projects with a smooth transition
    const navigateProject = (direction) => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        const nextIndex = (currentProject + direction + projects.length) % projects.length;

        // Fade out current project
        gsap.to('#project-content', {
            opacity: 0,
            y: direction > 0 ? -20 : 20,
            duration: 0.3,
            onComplete: () => {
                setCurrentProject(nextIndex);

                // Fade in new project
                gsap.to('#project-content', {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    onComplete: () => setIsTransitioning(false)
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container-custom py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Project Portfolio</h1>
                    <p className="text-gray-600">Featuring the spotlight navigation hover effect</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left sidebar with navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4">Navigation</h2>

                            {/* Main navigation with spotlight effect */}
                            <nav>
                                <ul className="space-y-6">
                                    {navigationItems.map((item, index) => (
                                        <li key={index} className="nav-link">
                                            <h3 className="font-semibold text-lg mb-2">{item.category}</h3>
                                            <ul className="grid grid-cols-1 gap-2 pl-4">
                                                {item.subcategories.map((subcat, idx) => (
                                                    <li key={idx} className="nav-link text-sm text-gray-600">
                                                        {subcat}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/* Main content area with current project */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div id="project-content" className="p-6">
                                <div className="mb-6">
                                    <img
                                        src={projects[currentProject].image}
                                        alt={projects[currentProject].title}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold">{projects[currentProject].title}</h2>
                                    <div className="text-gray-500 font-medium">
                                        {projects[currentProject].id} / {projects[currentProject].total}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-lg font-medium text-gray-700">{projects[currentProject].category}</h3>
                                </div>

                                <p className="text-gray-600 mb-6">
                                    {projects[currentProject].description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {projects[currentProject].tags.map((tag, idx) => (
                                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        onClick={() => navigateProject(-1)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                                    >
                                        Previous Project
                                    </button>
                                    <button
                                        onClick={() => navigateProject(1)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                                    >
                                        Next Project
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Explanation section */}
                <div className="mt-12 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">About The Spotlight Effect</h2>
                    <p className="text-gray-700 mb-4">
                        This project demonstrates the "spotlight hover effect" technique described by Lawrence Gosset.
                        When a user hovers over a navigation item, that item maintains full opacity while other items
                        fade to a lower opacity value, creating a focus effect that guides the user's attention.
                    </p>
                    <p className="text-gray-700 mb-4">
                        The effect is implemented using React hooks and GSAP for smooth animations.
                        This technique improves user experience by:
                    </p>
                    <ul className="list-disc pl-6 mb-6 text-gray-700">
                        <li>Reducing visual noise and cognitive load</li>
                        <li>Highlighting the current focus area</li>
                        <li>Creating a more interactive and responsive feel</li>
                        <li>Guiding users through complex navigation structures</li>
                        <li>Enhancing the overall polish of the interface</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
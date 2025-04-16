// useState, useEffect, useEffect for Gsap and use Ref imports
import React, { useState, useEffect, useRef } from 'react';
// Meta data dependency
import { Helmet } from 'react-helmet';
// React icon library
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
// Routing imports
import { useNavigate, useParams } from 'react-router-dom';
// Framer motion animation library
import { motion } from 'framer-motion';
// Navbar and footer component imports
import Navbar from './Navbar';
import Footer from './Footer';
// Unique style imports
import './PortfolioStyles.css';

const ProjectDetailsPage = () => {
    // State variables originally had a section reference, but will leave the variable here in the future when I know how to implement them in a more visually appealing style
    // Right now, it is just simply scroll to navigate
    const [activeSection, setActiveSection] = useState(null);
    // Checks screen dimensions and adjusts the spacing, and composition accordingly
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    // Used for routing
    const navigate = useNavigate();
    // Which id should be rendered
    const { projectId } = useParams();
    // Reference to the main content container for scroll management and positioning
    const mainRef = useRef(null);

    // Array of projects, rearranged the id's of the projects to match the order of importance
    const projects = [
        // Project 1: FONTS.LOCAL
        {
            id: '01',
            title: 'FONTS.LOCAL',
            description: 'A digital art gallery that showcases the diverse range of styles and techniques used in Graffiti and Street Art.',
            liveUrl: 'https://fontsvancouver.madebykevinlazo.com/',
            featuredVideo: '/fontslocalproject/fontslocal.mp4',
            reflection: `This collaborative project pushed me to think deeply about how we experience art in digital spaces. Working with a team of designers and developers taught me valuable lessons about effective communication and iteration.

The technical challenges of creating a responsive image gallery that preserved the context of street art forced me to consider both aesthetic and functional concerns simultaneously. I'm particularly proud of how we maintained the raw energy of the artwork while making it accessible to wider audiences.

This project reinforced my belief that digital platforms can preserve cultural expressions without diluting their impact when designed with appropriate sensitivity to context.`,
            nextProject: {
                id: '02',
                title: 'DOUBLEBACK CONCEPT STORE',
                image: '/img/dbconceptcover.jpg'
            },
            prevProject: {
                id: '06',
                title: 'THREEJS GALLERY',
                image: '/img/threejscover.jpeg'
            },
            timeline: {
                start: 'January',
                end: 'March 2024',
            },
            client: {
                name: 'Personal Project',
                industry: 'Art & Culture'
            },
            team: [
                { name: 'Kevin Lazo', role: 'Lead Developer, Lead Designer' },
                { name: 'Denis Gurcu', role: 'Creative Direction' },
                { name: 'Sam Park', role: 'UI Design' },
                { name: 'Vahan Vartanian', role: 'UI Design' },
                { name: 'Daniel Kolpakov', role: 'Developer' },
            ],
            technologies: ['React', 'GSAP', 'TailwindCSS', 'Framer Motion', 'Adobe Dimension', 'After Effects'],
            overview: {
                challenge: 'Creating a platform that preserves the raw energy and cultural significance of street art in a digital format while making it accessible to a wider audience.',
                approach: 'Implementing a grid-based layout with careful attention to typography and negative space to let the art speak for itself. The design prioritizes the artwork while providing context and navigation that feels intuitive yet unobtrusive.',
                outcome: 'A minimalist yet engaging showcase that respects the original context while providing new perspectives. The platform has successfully attracted both street art enthusiasts and newcomers to the art form.'
            },
            overviewImages: [
                { src: '/fontslocalproject/overviewimages/o1.jpg', alt: 'Graffiti' },
                { src: '/fontslocalproject/overviewimages/o2.jpg', alt: 'Graffiti' },
                { src: '/fontslocalproject/overviewimages/o3.jpg', alt: 'Graffiti' },
                { src: '/fontslocalproject/overviewimages/o4.jpg', alt: 'Graffiti' },
            ],
            process: {
                description: "This project balanced preservation of street art's raw energy with accessible digital presentation. Our design process focused on creating a grid system that lets the artwork speak for itself while providing essential context and location data."
            },
            wireframes: [
                {
                    title: 'Initial Landing Page Wireframe',
                    image: '/fontslocalproject/wireframes/fw1.jpg',
                    description: 'An initial impression and the design that is consistent throughout the website.'
                },
                {
                    title: 'Initial Modal View',
                    image: '/fontslocalproject/wireframes/fw2.jpg',
                    description: 'The composition of elements and how they will be rendered in the UI'
                },
                {
                    title: 'Revised Composition',
                    image: '/fontslocalproject/wireframes/fw3.jpg',
                    description: 'Initial layout planning - showing key angles and compositions'
                },
                {
                    title: 'Map View',
                    image: '/fontslocalproject/wireframes/fw4.jpg',
                    description: 'Map is rendered within the image gallery modal.'
                },
                {
                    title: 'Street View Concept',
                    image: '/fontslocalproject/wireframes/fw5.jpg',
                    description: 'This would become our user submission model. Due to budget constraints, this feature was not implemented.'
                }
            ],
            technical: {
                description: "This gallery implementation focused on structured data modeling and responsive design to showcase street art effectively across all devices.",
                challenges: [
                    'Creating a structured data model for the images',
                    'Implementing a simple gallery with a modal for image viewing',
                    'Responsive design for mobile and tablet devices',
                    'Creating test plans and user paths for quality assurance'
                ],
                solutions: [
                    'Created a data structure array for the images with properties for image, artist, and location',
                    'Implemented event handlers for gallery navigation and modal interactions',
                    'Used Tailwind CSS for responsive design across all devices',
                    'Conducted a 4-week quality assurance test with a team of four'
                ]
            },
            gallery: [
                { type: 'video', src: '/fontslocalproject/fontslocal.mp4', caption: 'Video Demo' },
                { type: 'image', src: '/fontslocalproject/galleryimages/fl1.png', caption: 'Landing Page' },
                { type: 'image', src: '/fontslocalproject/galleryimages/fl2.png', caption: 'Gallery View' },
                { type: 'image', src: '/fontslocalproject/galleryimages/fl3.png', caption: 'Map View' },
                { type: 'image', src: '/fontslocalproject/galleryimages/fl4.png', caption: 'User Submission Modal' }
            ],

        },

        // Project 4: KIAMVP
        {
            id: '04',
            title: 'KIAMVP',
            description: 'NBA basketball is a core design influence in my style. This year, I wanted to create a 3D concept carousel with the focus of creating informative and interactive content.',
            reflection: `Merging my passion for basketball with interactive design created a uniquely satisfying development experience. The 3D carousel challenged me to think about interfaces beyond traditional 2D constraints.

I learned valuable lessons about optimizing animations for performance while maintaining visual fidelity. The cross-browser compatibility issues taught me to be more strategic about when to use native CSS versus JavaScript animation libraries.

This project demonstrated how personal interests can drive more engaging technical solutions - my familiarity with basketball stats helped me make better decisions about information hierarchy and visual presentation.`,
            liveUrl: 'https://kiamvp.madebykevinlazo.com/',
            featuredVideo: '/kiamvp-project/kiamvpraceoptim2.mp4',
            nextProject: {
                id: '05',
                title: 'TERRA LINKTREE REDESIGN',
                image: '/img/cfcover.jpg'
            },
            prevProject: {
                id: '03',
                title: 'COURTFINDER+',
                image: '/img/fontlocalcover.jpg'
            },
            timeline: {
                start: 'September',
                end: 'November 2023',
            },
            client: {
                name: 'Personal Project',
                industry: 'Sports & Entertainment'
            },
            team: [
                { name: 'Kevin Lazo', role: 'Developer & Designer' }
            ],
            technologies: ['React', 'Tailwind', 'GSAP', 'After Effects', 'Illustrator'],
            overview: {
                challenge: 'Creating an engaging, interactive way to present NBA MVP candidate statistics that goes beyond simple data tables and numbers.',
                approach: 'Developing a 3D carousel that mimics classic NBA video game selection screens, with dynamic magazine-style covers that blend statistics with visual appeal.',
                outcome: 'An informative, visually captivating presentation of MVP candidates that makes statistical information accessible and engaging for basketball fans.'
            },
            overviewImages: [
                { src: '/kiamvp-project/overviewimages/giannis.jpg', alt: 'Giannis Antetekoumpo Magazine Cover' },
                { src: '/kiamvp-project/overviewimages/kat.jpg', alt: 'Karl Anthony Towns Magazine Cover' },
                { src: '/kiamvp-project/overviewimages/magcover.jpg', alt: 'NBA 2025 MVP Magazine Cover' },
                { src: '/kiamvp-project/overviewimages/tatum.jpg', alt: 'Jayson Tatum Magazine Cover' },
            ],
            process: {
                description: "Inspired by classic NBA video games and sports magazines, this project combines interactive data visualization with engaging animations to make basketball statistics more accessible and visually compelling."
            },
            wireframes: [
                {
                    title: 'Shot List Planning',
                    image: '/kiamvp-project/wireframes/km1.jpeg',
                    description: 'Sketch of each player\'s card layout. This composition has the card with the team logo directly below it. The arrows below are used for navigation'
                },
                {
                    title: 'Physics',
                    image: '/kiamvp-project/wireframes/km2.jpeg',
                    description: 'A reference for how I would like the carousel to function.'
                },
                {
                    title: 'Front View Carousel',
                    image: '/kiamvp-project/wireframes/km3.jpeg',
                    description: 'The desired layout from the front view. Depending on browser compatibility, the carousel may not have the 3D depth of the wireframe.'
                },
                {
                    title: 'Information',
                    image: '/kiamvp-project/wireframes/km4.jpeg',
                    description: 'Planning out the information that will be displayed on the details page. Composing the layout with different sizes of squares. Made notes of the animations'
                },
                {
                    title: 'Initial Notes',
                    image: '/kiamvp-project/wireframes/km5.jpeg',
                    description: 'Notes on the project. Ensuring that I will render the information using the map method. Which means I need to create a data structured array with the same properties. Safari and Firefox handle 3D interactions differently so keep that in mind when testing.'
                }
            ],
            technical: {
                description: "This project required careful balance between visual impact and performance, with special attention to animation physics and cross-browser 3D compatibility.",

                challenges: [
                    'Creating 3D depth effects that work across different browsers',
                    'Implementing smooth carousel rotation with proper physics',
                    'Ensuring data is properly passed between components',
                    'Balancing visual impact with performance'
                ],
                solutions: [
                    'Used vanilla CSS for 3D effects instead of GSAP for better browser compatibility',
                    'Implemented GSAP for carousel animations with custom physics',
                    'Created a structured data file (playersData.js) with consistent properties',
                    'Optimized assets and animations for smooth performance'
                ]
            },
            gallery: [
                { type: 'video', src: '/kiamvp-project/kiamvpraceoptim2.mp4', caption: 'Video Demonstration' },
                { type: 'image', src: '/kiamvp-project/galleryimages/mvp1.png', caption: 'Carousel Page' },
                { type: 'image', src: '/kiamvp-project/galleryimages/mvp2.png', caption: 'Details Page - Video Section' },
                { type: 'image', src: '/kiamvp-project/galleryimages/mvp3.png', caption: 'Details Page - Stats Section' },
                { type: 'image', src: '/kiamvp-project/galleryimages/mvp4.png', caption: 'Details Page - Accolades Section' }
            ],
            testimonial: {
                quote: 'This interactive MVP race visualization makes basketball statistics exciting and accessible. The 3D carousel is a creative way to showcase player information that goes far beyond traditional stat tables.',
                name: 'Marcus Johnson',
                role: 'Basketball Analyst'
            }
        },

        // Project 3: COURTFINDER+
        {
            id: '03',
            title: 'COURTFINDER+',
            description: 'A web application that allows users to find basketball courts in the lower mainland. Aspiring to become an international platform for basketball players to find courts in their area.',
            reflection: `Courtfinder+ originated from a personal need, which made the development process especially meaningful. Creating something that solved a real problem for my community connected me more deeply to the project's purpose.

Implementing the theme toggling system taught me about maintaining visual and functional consistency across different UI contexts. This knowledge has influenced how I approach state management in all my subsequent projects.

What I value most about this project is how it balances utility with aesthetics - providing critical information efficiently while maintaining a clean, engaging interface.`,
            liveUrl: 'https://courtfinder.madebykevinlazo.com/',
            featuredVideo: '/courtfinderproject/courtfinder.mp4',
            nextProject: {
                id: '04',
                title: 'KIAMVP',
                image: '/img/dbconceptcover.jpg'
            },
            prevProject: {
                id: '02',
                title: 'DOUBLEBACK CONCEPT STORE',
                image: '/img/kiamvpcover.jpg'
            },
            timeline: {
                start: 'April',
                end: 'June 2023',
            },
            client: {
                name: 'Personal Project',
                industry: 'Sports & Recreation'
            },
            team: [
                { name: 'Kevin Lazo', role: 'Developer & Designer' }
            ],
            technologies: ['React', 'Tailwind', 'GSAP'],
            overview: {
                challenge: 'Creating a user-friendly web application that helps basketball players discover courts in their area, addressing the lack of centralized information about local basketball facilities.',
                approach: 'Implementing a minimalist design with a 5-column grid layout that focuses on court images and essential information, with intuitive navigation and filtering options.',
                outcome: 'A functional platform that provides basketball enthusiasts with a comprehensive directory of local courts, each with detailed information, directions, and features.'
            },
            overviewImages: [
                { src: '/courtfinderproject/overviewimages/hickey.jpg', alt: 'Hickey Park basketball courts' },
                { src: '/courtfinderproject/overviewimages/kits2.jpeg', alt: 'Kitsilano Beach basketball courts' },
                { src: '/courtfinderproject/overviewimages/stevenash.jpeg', alt: 'Steve Nash basketball courts' },
                { src: '/courtfinderproject/overviewimages/thefields.jpg', alt: 'The fields basketball courts' },
            ],
            process: {
                description: "Developed with a user-centered approach, Courtfinder+ emerged from research into basketball players' needs. The 5-column grid layout prioritizes court images while making essential facility information immediately accessible."
            },
            wireframes: [
                {
                    title: 'Home Page',
                    image: '/courtfinderproject/wireframes/cfw1.png',
                    description: 'Header and footer span the entire width of the page. The cards are centered between the header and footer. Cards are centered within the 2nd and 4th columns. Each card layout has the same spacing and alignment. Images are scaled to be proportionate.'
                },
                {
                    title: 'Details Page',
                    image: '/courtfinderproject/wireframes/cfw2.png',
                    description: 'Depending on the court, multiple images will be provided on the details page. The images are scaled equally in width, but may be different in height - covering the entire container if possible. The information pertaining to each court takes the first row as a position and is horizontally aligned. Each font size is consistent and adjusts depending on its importance. The importance of the text is determined by the font size and color.'
                },
                {
                    title: 'Information Pages',
                    image: '/courtfinderproject/wireframes/cfw3.png',
                    description: 'A static page with no page animations. Follows a UX optimized pattern of reading and should be referred to for all information pages related to courtfinder.'
                }
            ],
            technical: {
                description: "Building Courtfinder+ required developing a flexible data structure for court information alongside a context-based theme system that adapts to user preferences.",
                challenges: [
                    'Implementing a dark mode context provider',
                    'Creating smooth page transitions between views',
                    'Developing a responsive grid system that works on all devices',
                    'Organizing court data in an efficient, scalable structure'
                ],
                solutions: [
                    'Created a context provider for toggle between light and dark mode with inverted CSS styles',
                    'Implemented GSAP animations for page transitions that respond to the current UI context',
                    'Used Tailwind CSS to create a responsive grid that collapses to a single column on mobile',
                    'Developed a structured data array with consistent properties for each court'
                ]
            },
            gallery: [
                { type: 'video', src: '/courtfinderproject/courtfinder.mp4', caption: 'Video Demonstration' },
                { type: 'image', src: '/courtfinderproject/galleryimages/cf1.png', caption: 'Landing Page' },
                { type: 'image', src: '/courtfinderproject/galleryimages/cf2.png', caption: 'Home Page' },
                { type: 'image', src: '/courtfinderproject/galleryimages/cf3.png', caption: 'Details Page' },
                { type: 'image', src: '/courtfinderproject/galleryimages/cf4.png', caption: 'About Page' }
            ],
            testimonial: {
                quote: 'COURTFINDER+ solves a real problem for basketball players. The clean design makes it easy to find courts and get all the information you need in one place.',
                name: 'Chris Wang',
                role: 'Local Basketball Player'
            }
        },

        // Project 2: DOUBLEBACK CONCEPT STORE
        {
            id: '02',
            title: 'DOUBLEBACK CONCEPT STORE',
            description: 'A concept storefront for a curated collection of unique and exclusive clothing products, created for a friend looking to expand their online business presence.',
            reflection: `Working directly with a client to translate their brand vision into a digital experience was both challenging and rewarding. The minimalist aesthetic required careful attention to subtle details that might otherwise go unnoticed.

The grayscale-to-color interaction became a defining feature of the site, and finding the right implementation approach taught me to look for simple solutions to create distinctive experiences.

This project reinforced my appreciation for the Swiss design principles that have influenced my work across mediums - particularly the power of whitespace and typographic clarity in creating focused user experiences.`,
            liveUrl: 'https://dbconcept.madebykevinlazo.com/',
            featuredVideo: '/doublebackproject/dbconceptvid.mp4',
            nextProject: {
                id: '03',
                title: 'COURTFINDER+',
                image: '/img/threejscover.jpeg'
            },
            prevProject: {
                id: '01',
                title: 'FONTS.LOCAL',
                image: '/img/cfcover.jpg'
            },
            timeline: {
                start: 'October 2024',
                end: 'February 2025',
            },
            client: {
                name: 'Doubleback',
                industry: 'Fashion & Retail'
            },
            team: [
                { name: 'Kevin Lazo', role: 'Developer & Designer' }
            ],
            technologies: ['HTML', 'CSS', 'JavaScript'],
            overview: {
                challenge: 'Creating a minimalist yet engaging concept storefront that showcases clothing products effectively while maintaining the brands identity and focusing on functionality.',
                approach: 'Implementing Swiss design principles with careful grid layouts, consistent spacing, and grayscale-to-color interactions that create a clean, modern aesthetic perfect for showcasing products.',
                outcome: 'A distinctive e-commerce concept that stands apart from typical online stores, offering a curated shopping experience that feels both exclusive and accessible.'
            },
            overviewImages: [
                { src: '/doublebackproject/overviewimages/o1.png', alt: 'Store Concept' },
                { src: '/doublebackproject/overviewimages/o2.png', alt: 'Product Display' },
                { src: '/doublebackproject/overviewimages/o3.png', alt: 'Grid Layout' },
                { src: '/doublebackproject/overviewimages/o4.png', alt: 'Mobile View' },
            ],
            process: {
                description: "Following Swiss design principles, I created a minimalist e-commerce experience with strategic color interactions that highlight products against a clean, structured grid system."
            },
            wireframes: [
                {
                    title: 'Landing Page',
                    image: '/wireframes/dbw1.png',
                    description: '3 column grid, with consistent spacing and alignment. The images are scaled to be proportionate. The images are styled with a grayscale effect. On hover, the images will become colorized.'
                },
                {
                    title: 'Categories Page',
                    image: '/wireframes/dbw2.png',
                    description: '2 column grid, that collapses into a single column grid on mobile.'
                },
                {
                    title: 'Product Page',
                    image: '/wireframes/dbw3.png',
                    description: '2 column grid, the text is consistently spaced. Collapses into a single column on mobile.'
                },
                {
                    title: 'About Page',
                    image: '/wireframes/dbw4.png',
                    description: '2 column grid, to learn about the business and meet the owner.'
                }
            ],
            technical: {
                description: "The technical implementation emphasized consistent grid layouts and CSS transitions to create a cohesive shopping experience that works seamlessly across devices.",
                challenges: [
                    'Creating consistent grid layouts across different page types',
                    'Implementing responsive design that works well on mobile devices',
                    'Managing multiple HTML files and ensuring consistent styling',
                    'Creating interactive elements that enhance the shopping experience'
                ],
                solutions: [
                    'Implemented a 6-column grid system with consistent spacing across all pages',
                    'Created a hamburger menu for mobile and collapsing grids to single-column layouts',
                    'Developed reusable code blocks and a universal style sheet for the navbar',
                    'Implemented CSS hover effects to transition images from grayscale to color'
                ]
            },
            gallery: [
                { type: 'video', src: '/doublebackproject/dbconceptvid.mp4', caption: 'Video Demonstration' },
                { type: 'image', src: '/doublebackproject/galleryimages/db1.png', caption: 'Landing Page' },
                { type: 'image', src: '/doublebackproject/galleryimages/db2.png', caption: 'Collections Detailed View' },
                { type: 'image', src: '/doublebackproject/galleryimages/db3.png', caption: 'Collections Page' },
                { type: 'image', src: '/doublebackproject/galleryimages/db4.png', caption: 'Product Page' },
                { type: 'image', src: '/doublebackproject/galleryimages/db5.png', caption: 'About Page' }
            ],
            testimonial: {
                quote: 'The concept store captures exactly what I was looking for - clean, minimal design that puts the focus on the products while still feeling premium and exclusive.',
                name: 'James Liu',
                role: 'Doubleback Founder'
            }
        },

        // Project 6: THREEJS GALLERY
        {
            id: '06',
            title: 'THREEJS GALLERY',
            description: 'An interactive 3D art gallery inspired by video games, allowing users to explore and learn about gaming character models in a virtual space.',
            reflection: `Exploring 3D web development pushed me far outside my comfort zone in the best possible way. Learning the intricacies of Three.js while simultaneously designing an interactive space required me to bridge technical and creative thinking constantly.

Performance optimization became a central focus, as maintaining smooth interactions in a 3D environment demands careful attention to resource management. This has influenced how I approach even 2D interfaces, making me more conscious of rendering efficiency.

The project's playful nature reminded me why I became a developer - to create spaces where technology and creativity intersect to deliver memorable experiences.`,
            liveUrl: 'https://threejsbuild.madebykevinlazo.com/',
            featuredVideo: '/threejs-project/threejsbuild.mp4',
            nextProject: {
                id: '01',
                title: 'FONTS.LOCAL',
                image: '/img/fontlocalcover.jpg'
            },
            prevProject: {
                id: '05',
                title: 'TERRA LINKTREE REDESIGN',
                image: '/img/dbconceptcover.jpg'
            },
            timeline: {
                start: 'March 2024',
                end: 'April 2024',
            },
            client: {
                name: 'Personal Project',
                industry: 'Interactive Media'
            },
            team: [
                { name: 'Kevin Lazo', role: 'Developer & Designer' }
            ],
            technologies: ['HTML', 'CSS', 'Three.js', 'Adobe Dimension'],
            overview: {
                challenge: 'Creating an engaging 3D web experience that allows users to explore video game character models in an interactive gallery environment.',
                approach: 'Using Three.js to build a navigable 3D space combined with custom 3D models created in Adobe Dimension, with intuitive controls for exploration.',
                outcome: 'An immersive virtual gallery that showcases video game characters with interactive elements, bringing gaming nostalgia to life in a browser-based 3D environment.'
            },
            overviewImages: [
                { src: '/threejs-project/overviewimages/o1.jpeg', alt: 'Parappa the rapper' },
                { src: '/threejs-project/overviewimages/o2.jpg', alt: 'Jet set radio' },
                { src: '/threejs-project/overviewimages/o3.jpg', alt: 'Spyro the dragon' },
                { src: '/threejs-project/overviewimages/o4.jpg', alt: 'Samurai jack' },
            ],
            process: {
                description: "Combining 3D modeling with web development techniques, this project creates an immersive gallery experience that allows users to explore gaming character models in an interactive environment."
            },
            wireframes: [
                {
                    title: 'Landing Page',
                    image: '/threejs-project/wireframes/tjsw1.png',
                    description: 'Includes a text stack breakdown, a brief overview, and a call to action.'
                },
                {
                    title: 'Physics',
                    image: '/threejs-project/wireframes/tjsw2.png',
                    description: 'The environment physics and layout of the gallery'
                },
                {
                    title: 'Physics 2',
                    image: '/threejs-project/wireframes/tjsw3.png',
                    description: 'How I wanted to compose the gallery, and what it might look like after positioning the models.'
                },
                {
                    title: 'Mood Board',
                    image: '/threejs-project/wireframes/tsjw4.png',
                    description: '3D model menu, to show the user what they can see in the gallery.'
                },
                {
                    title: 'Model Viewing Page',
                    image: '/threejs-project/wireframes/tjsw5.png',
                    description: 'A page with more details about a particular model selected.'
                }
            ],
            technical: {
                description: "Creating this 3D gallery demanded integration of complex web technologies with optimized 3D models to maintain performance while delivering an immersive experience.",
                challenges: [
                    'Setting up the Three.js environment for 3D rendering',
                    'Creating and texturing 3D models for the gallery',
                    'Implementing navigation controls for the 3D space',
                    'Creating interactive elements within the 3D environment'
                ],
                solutions: [
                    'Set up Three.js renderer, scene, camera, and lighting for optimal 3D display',
                    'Created and textured display boards and character models in Adobe Dimension',
                    'Implemented keyboard and mouse controls for gallery navigation',
                    'Added event listeners to models to trigger information displays'
                ]
            },
            gallery: [
                { type: 'video', src: '/threejs-project/threejsbuild.mp4', caption: 'Video Demonstration' },
                { type: 'image', src: '/threejs-project/galleryimages/threejs1.png', caption: 'Gallery Overview' },
                { type: 'image', src: '/threejs-project/galleryimages/threejs2.png', caption: 'Character Model Display' },
                { type: 'image', src: '/threejs-project/galleryimages/threejs3.png', caption: 'Interactive Information' },
                { type: 'image', src: '/threejs-project/galleryimages/threejs4.png', caption: 'Navigation Experience' }
            ],
            testimonial: {
                quote: 'The Three.js gallery brings gaming characters to life in an interactive way that feels like stepping into a virtual museum. The attention to detail in both the models and the gallery environment is impressive.',
                name: 'Alex Rodriguez',
                role: 'Game Developer'
            }
        },
        // Project 5: TERRA LINKTREE
        {
            id: '05',
            title: 'TERRA LINKTREE REDESIGN',
            description: 'Redesign the terra linktree website, to be more dynamic and visually appealing for users.',
            reflection: `This project represented a refreshing departure from traditional development patterns. Instead of starting with wireframes and mockups, I took a code-first approach that allowed me to iterate rapidly with actual content.

I particularly enjoyed the challenge of optimizing video playback while maintaining visual fluidity. Finding the right balance between the grid system's responsiveness and the device's performance capabilities pushed me to think more critically about resource management.

The project also reinforced my belief that sometimes the most effective solutions come from direct implementation rather than extensive planning. By working directly with the videos and testing interactions in real-time, I discovered nuances that might have been missed in a static design process.`,
            liveUrl: '',
            featuredVideo: '/terraproject/terra_link.mp4',
            nextProject: {
                id: '06',
                title: '3D ART GALLERY',
                image: '/img/fontlocalcover.jpg'
            },
            prevProject: {
                id: '04',
                title: 'KIAMVP',
                image: '/img/dbconceptcover.jpg'
            },
            timeline: {
                start: 'Feb 2025',
                end: 'March 2025',
            },
            client: {
                name: 'Terra',
                industry: 'Music and entertainment'
            },
            team: [
                { name: 'Kevin Lazo', role: 'Developer & Designer' }
            ],
            technologies: ['HTML', 'CSS', 'Three.js', 'CSS'],
            overview: {
                challenge: 'Redesign a linktree website that can provide the same information as before, but with a more dynamic and visually appealing design.',
                approach: 'Using HTML and CSS, I created a modular grid system to develop a responsive and dynamic container for the visuals. I then created a fixed menu with modals for additonal information.',
                outcome: 'A dynamic, interactive linktree substitute that provides the same information as before, but with more dimension and visual appeal. It is easy to navigate and provides smooth transitions on hover and click.'
            },
            overviewImages: [
                { src: '/terraproject/overviewimages/o1.png', alt: 'Terra' },
                { src: '/terraproject/overviewimages/o2.png', alt: 'Terra' },
                { src: '/terraproject/overviewimages/o3.png', alt: 'Terra' },
                { src: '/terraproject/overviewimages/o4.png', alt: 'Terra' },
            ],
            process: {
                description: "This redesign focused on creating a dynamic video grid that responds to user interaction, transforming a standard linktree into an engaging visual experience while maintaining the simplicity of navigation. I took a code first approach to this app, there is no prototype."
            },
            wireframes: [

            ],
            technical: {
                description: "The Terra Linktree redesign required efficient video handling and dynamic grid calculations to create smooth, responsive interactions without compromising performance.",
                challenges: [
                    'Creating a responsive grid system that dynamically resizes based on user interaction',
                    'Managing multiple video elements efficiently to prevent performance issues',
                    'Implementing smooth transitions between grid states and detail views',
                    'Balancing visual appeal with performance across different devices',
                    'Developing an intuitive navigation system that maintains contextual awareness'
                ],
                solutions: [
                    'Implemented CSS Grid with dynamic template rows/columns that smoothly transition on hover',
                    'Created configurable autoplay modes (all videos or hover-only) to optimize performance',
                    'Utilized Framer Motion animations with carefully tuned timing for fluid transitions',
                    'Applied layered halftone background patterns for visual depth without performance impact',
                    'Built a persistent sidebar navigation with clear visual indicators for current location'
                ]
            },
            gallery: [
                { type: 'video', src: '/terraproject/terra_link.mp4', caption: 'Video Demonstration' },
                { type: 'image', src: '/terraproject/galleryimages/g1.png', caption: 'Home Page' },
                { type: 'image', src: '/terraproject/galleryimages/g2.png', caption: 'About Page ' },
                { type: 'image', src: '/terraproject/galleryimages/g3.png', caption: 'Contact Page' },

            ],
            testimonial: {
                quote: 'Youre an absolute beast of nature, this caught me by surpise! Wish you waited until I dropped my new song, send me a link!',
                name: 'TERRA',
                role: 'Musician'
            }
        }
    ];

    // Find the current project based on the projectId URL parameter
    const currentProject = projects.find(p => p.id === projectId) || projects[0];

    // Device detection for better responsive handling
    useEffect(() => {
        const checkDeviceSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 640);
            setIsTablet(width >= 640 && width < 1024);
            setIsDesktop(width >= 1024);

            // Set active section based on viewport if needed
            if (width < 640) {
                // Mobile-specific active sections could be set here
            } else if (width >= 640 && width < 1024) {
                // Tablet-specific active sections could be set here
            } else {
                // Desktop-specific active sections could be set here
            }
        };

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // Additional scroll-based effects could be implemented here
        };

        // Initial check
        checkDeviceSize();

        // Event listeners
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', checkDeviceSize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkDeviceSize);
        };
    }, []);

    return (
        <>
            <Helmet>
                {/* Basic Metadata - Dynamic based on current project */}
                <title>{currentProject.title} | Kevin Lazo - Web Developer & Designer</title>
                <meta name="description" content={currentProject.description} />

                {/* Search Engine Optimization */}
                <link rel="canonical" href={`https://madebykevinlazo.com/project/${currentProject.id}`} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${currentProject.title} | Kevin Lazo`} />
                <meta property="og:description" content={currentProject.description} />
                <meta property="og:image" content={`https://madebykevinlazo.com${currentProject.image || "/img/throw.png"}`} />
                <meta property="og:url" content={`https://madebykevinlazo.com/project/${currentProject.id}`} />

                {/* Twitter */}
                <meta name="twitter:title" content={`${currentProject.title} | Kevin Lazo`} />
                <meta name="twitter:description" content={currentProject.description} />
                <meta name="twitter:image" content={`https://madebykevinlazo.com${currentProject.image || "/img/throw.png"}`} />
            </Helmet>
            <Navbar />

            <div className="min-h-screen bg-white text-black font-montreal pb-16 md:pb-0">
                {/* Back to projects link - responsive padding */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 mb-6 sm:mb-8">
                    <motion.button
                        onClick={() => navigate('/')}
                        className="flex items-center text-sm uppercase tracking-wide"
                        whileHover={{ x: -5 }}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        PROJECTS
                    </motion.button>
                </div>

                {/* Project header with responsive layouts for different screen sizes */}
                <header className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
                    {/* Mobile and Tablet Layout - Stack */}
                    <div className="grid grid-cols-1 gap-6 lg:hidden">
                        {/* Top content with project number, title, description */}
                        <div>
                            <div className="flex items-baseline mb-4">
                                <span className="text-5xl sm:text-6xl md:text-7xl font-montrealbold leading-none mr-3 sm:mr-4">
                                    {currentProject.id}
                                </span>
                                <h1 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-tight font-montrealbold">
                                    {currentProject.title}
                                </h1>
                            </div>

                            <p className="text-base md:text-lg mb-6 max-w-2xl">
                                {currentProject.description}
                            </p>

                            <a
                                href={currentProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm bg-black text-white py-2 sm:py-3 px-4 sm:px-5 hover:bg-[#bf0a30] transition-colors mb-4"
                            >
                                Visit Website
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        </div>

                        {/* Video below for tablet/mobile */}
                        <div>
                            {currentProject.featuredVideo ? (
                                <video
                                    src={currentProject.featuredVideo}
                                    className="w-full h-auto border border-black/10 object-cover"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                ></video>
                            ) : (
                                <div className="w-full aspect-[16/9] bg-[#ff3b30]"></div>
                            )}
                        </div>
                    </div>

                    {/* Desktop Layout - Side-by-side */}
                    <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8 lg:items-start">
                        {/* Left content - Fixed width and spacing to prevent overlap */}
                        <div className="lg:col-span-5 lg:pr-6 xl:pr-8 w-full min-w-0">
                            <div className="flex flex-wrap items-baseline mb-6">
                                <span className="text-7xl xl:text-9xl font-montrealbold leading-none mr-5 xl:mr-6">
                                    {currentProject.id}
                                </span>
                                <h1 className="text-4xl xl:text-6xl uppercase tracking-tight font-montrealbold">
                                    {currentProject.title}
                                </h1>
                            </div>

                            <p className="text-lg mb-8 max-w-lg">
                                {currentProject.description}
                            </p>

                            <a
                                href={currentProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm bg-black text-white py-3 px-5 hover:bg-[#bf0a30] transition-colors"
                            >
                                Visit Website
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        </div>

                        {/* Right side - Featured video/image with constrained width */}
                        <div className="lg:col-span-7 relative flex justify-center">
                            <div className="w-full max-w-3xl xl:max-w-4xl">
                                {currentProject.featuredVideo ? (
                                    <video
                                        src={currentProject.featuredVideo}
                                        className="w-full h-auto border border-black/10 object-cover"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="auto"
                                    ></video>
                                ) : (
                                    <div className="w-full aspect-[16/9] bg-[#ff3b30]"></div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Technical details section - enhanced responsiveness */}
                <section className="py-5 sm:py-6 lg:py-8 bg-gray-50 border-y border-black/10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-4">
                            {/* Technical details data with consistent spacing */}
                            <div className="mb-4 sm:mb-0">
                                <p className="text-xs uppercase tracking-wide mb-1 text-black/50">Period</p>
                                <p className="text-sm">{currentProject.timeline.start} — {currentProject.timeline.end}</p>
                            </div>

                            <div className="mb-4 sm:mb-0">
                                <p className="text-xs uppercase tracking-wide mb-1 text-black/50">Client</p>
                                <p className="text-sm">{currentProject.client.name}</p>
                                <p className="text-sm text-black/60">{currentProject.client.industry}</p>
                            </div>

                            <div className="mb-4 sm:mb-0">
                                <p className="text-xs uppercase tracking-wide mb-1 text-black/50">Team</p>
                                <div className="text-sm">
                                    {currentProject.team.map((member, index) => (
                                        <p key={index} className="mb-1">
                                            {member.name}
                                            <span className="text-black/60 ml-1">— {member.role}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide mb-1 text-black/50">Technologies</p>
                                <div className="flex flex-wrap gap-2">
                                    {currentProject.technologies.map((tech, index) => (
                                        <span key={index} className="text-xs py-1 px-2 bg-black/5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main content area with improved responsive spacing */}
                <main ref={mainRef} className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-20 sm:pb-24 lg:pb-32">
                    {/* Overview section with responsive split layout */}
                    <section className="mb-16 sm:mb-20 lg:mb-32">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-24">
                            {/* Left side - Overview text content */}
                            <div className="lg:col-span-6">
                                {/* Challenge */}
                                <div className="mb-8 sm:mb-10 lg:mb-16">
                                    <p className="mb-2">
                                        <span className="text-sm text-black/50 mr-2">01</span>
                                        <span className="text-sm uppercase tracking-wide">Challenge</span>
                                    </p>
                                    <p className="text-lg sm:text-xl md:text-2xl md:leading-snug">
                                        {currentProject.overview.challenge}
                                    </p>
                                </div>

                                {/* Approach */}
                                <div className="mb-8 sm:mb-10 lg:mb-16">
                                    <p className="mb-2">
                                        <span className="text-sm text-black/50 mr-2">02</span>
                                        <span className="text-sm uppercase tracking-wide">Approach</span>
                                    </p>
                                    <p className="text-lg sm:text-xl md:text-2xl md:leading-snug">
                                        {currentProject.overview.approach}
                                    </p>
                                </div>

                                {/* Outcome */}
                                <div>
                                    <p className="mb-2">
                                        <span className="text-sm text-black/50 mr-2">03</span>
                                        <span className="text-sm uppercase tracking-wide">Outcome</span>
                                    </p>
                                    <p className="text-lg sm:text-xl md:text-2xl md:leading-snug">
                                        {currentProject.overview.outcome}
                                    </p>
                                </div>
                            </div>

                            {/* Right side - 2x2 image grid with responsive spacing */}
                            <div className="lg:col-span-6 mt-6 sm:mt-8 lg:mt-0">
                                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                                    {currentProject.overviewImages.slice(0, 4).map((image, index) => (
                                        <div key={index} className="aspect-square ">
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Process section - with responsive wireframes */}
                    <section className="mb-16 sm:mb-20 lg:mb-32">
                        <div className="mb-8 sm:mb-10 lg:mb-16">
                            <h2 className="text-xl sm:text-2xl md:text-3xl uppercase font-montrealbold tracking-tight leading-none mb-3 sm:mb-4 lg:mb-6">
                                Process
                            </h2>
                            <p className="text-base max-w-2xl">
                                {currentProject.process?.description || "The development process involved iterative design explorations and usability testing to ensure the platform effectively showcased the content while providing intuitive navigation."}
                            </p>
                        </div>

                        {/* Only render wireframes section if wireframes exist - some projects are designed during development */}
                        {currentProject.wireframes && currentProject.wireframes.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-y-10 md:gap-x-8 md:gap-y-16">
                                {currentProject.wireframes.map((wireframe, index) => (
                                    <div key={index}>
                                        <div className="mb-3 sm:mb-4">
                                            <img
                                                src={wireframe.image}
                                                alt={wireframe.title}
                                                className="w-full h-auto border border-black/10"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flex">
                                            <p className="text-sm text-black/50 mr-3 sm:mr-4 font-montrealbold">
                                                {String(index + 1).padStart(2, '0')}
                                            </p>
                                            <div>
                                                <p className="uppercase font-montrealbold text-base mb-1">
                                                    {wireframe.title}
                                                </p>
                                                <p className="text-sm text-black/70">
                                                    {wireframe.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </section>

                    {/* Technical details section - responsive grid */}
                    <section className="mb-16 sm:mb-20 lg:mb-32">
                        <div className="mb-8 sm:mb-10 lg:mb-16">
                            <h2 className="text-xl sm:text-2xl md:text-3xl uppercase font-montrealbold tracking-tight leading-none mb-3 sm:mb-4 lg:mb-6">
                                Technical Details
                            </h2>
                            <p className="text-base max-w-2xl">
                                {currentProject.technical?.description || "The technical implementation required careful consideration of performance optimization and responsive design to ensure a seamless experience across devices."}
                            </p>
                        </div>

                        {/* Technical challenges and solutions -  responsive grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-8">
                            <div>
                                <p className="text-sm uppercase tracking-wide mb-4 sm:mb-6">
                                    <span className="text-xs text-black/50 block mb-1">A</span>
                                    Challenges
                                </p>

                                <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
                                    {currentProject.technical.challenges.map((challenge, index) => (
                                        <li key={index} className="group">
                                            <div className="flex items-baseline">
                                                <span className="font-montrealbold text-sm mr-3 sm:mr-4 opacity-50 flex-shrink-0">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <p className="text-base group-hover:translate-x-2 transition-transform">
                                                    {challenge}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 md:mt-0">
                                <p className="text-sm uppercase tracking-wide mb-4 sm:mb-6">
                                    <span className="text-xs text-black/50 block mb-1">B</span>
                                    Solutions
                                </p>

                                <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
                                    {currentProject.technical.solutions.map((solution, index) => (
                                        <li key={index} className="group">
                                            <div className="flex items-baseline">
                                                <span className="font-montrealbold text-sm mr-3 sm:mr-4 opacity-50 flex-shrink-0">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <p className="text-base group-hover:translate-x-2 transition-transform">
                                                    {solution}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Gallery section with responsive spacing */}
                    <section className="mb-16 sm:mb-20 lg:mb-32">
                        <div className="mb-8 sm:mb-10 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase font-montrealbold tracking-tight leading-none mb-3 sm:mb-4 lg:mb-8">
                                Result
                            </h2>
                            <p className="text-base sm:text-lg max-w-2xl mb-8 sm:mb-10 lg:mb-16">
                                {currentProject.overview.outcome}
                            </p>
                        </div>

                        {/* Scrollable gallery with improved spacing */}
                        <div className="space-y-6 sm:space-y-8">
                            {currentProject.gallery.map((item, index) => (
                                <div key={index} className="scroll-mt-24" id={`gallery-item-${index}`}>
                                    <div className="border border-black/10 overflow-hidden">
                                        {item.type === 'video' ? (
                                            <video
                                                src={item.src}
                                                className="w-full h-auto"
                                                controls
                                                playsInline
                                                preload="metadata"
                                                poster={item.poster || ''}
                                            />
                                        ) : (
                                            <img
                                                src={item.src}
                                                alt={item.caption || `Gallery image ${index + 1}`}
                                                className="w-full h-auto"
                                                loading="lazy"
                                            />
                                        )}
                                    </div>

                                    {/* Caption with responsive grid */}
                                    <div className="grid grid-cols-12 gap-2 sm:gap-4 mt-3 sm:mt-4">
                                        <div className="col-span-2 sm:col-span-1">
                                            <p className="text-xs text-black/50 uppercase tracking-wide">
                                                {String(index + 1).padStart(2, '0')}
                                            </p>
                                        </div>
                                        <div className="col-span-10 sm:col-span-11">
                                            <p className="text-base">
                                                {item.caption}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>


                    {/* Reflection section  */}
                    <section className="mb-20 sm:mb-24 lg:mb-32">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                            <div className="md:col-span-4 mb-4 md:mb-0">
                                <h2 className="text-xl sm:text-2xl md:text-3xl uppercase font-montrealbold tracking-tight leading-none">
                                    Reflection
                                </h2>
                            </div>

                            <div className="md:col-span-8">
                                <div className="text-lg sm:text-xl font-light leading-relaxed max-w-3xl mb-6 sm:mb-8">
                                    {currentProject.reflection ? (
                                        <>
                                            {currentProject.reflection.split('\n\n').map((paragraph, index) => (
                                                <p key={index} className="mb-4">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </>
                                    ) : (
                                        <p>
                                            Working on this project helped me grow as a developer by challenging me to
                                            find the right balance between visual impact and performance. Each project
                                            teaches me something new about user experience design and efficient implementation.
                                        </p>
                                    )}
                                </div>
                                <div className="text-sm text-black/60">
                                    — Kevin Lazo, Developer & Designer
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Project navigation -  responsive layout */}
                    <section className="mt-16 sm:mt-20 lg:mt-32 pt-8 sm:pt-12 border-t border-black/10">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                            <div className="md:col-span-6 mb-8 md:mb-0">
                                <p className="text-xs uppercase tracking-wide text-black/50 mb-3 sm:mb-4">Previous Project</p>
                                <div className="flex items-center">
                                    <motion.button
                                        onClick={() => navigate(`/project/${currentProject.prevProject.id}`)}
                                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-montrealbold uppercase tracking-tight group flex items-center"
                                        whileHover={{ x: -10 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-3 sm:mr-4 opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="line-clamp-1">{currentProject.prevProject.title}</span>
                                    </motion.button>
                                </div>
                            </div>

                            <div className="md:col-span-6 text-left md:text-right">
                                <p className="text-xs uppercase tracking-wide text-black/50 mb-3 sm:mb-4">Next Project</p>
                                <div className="flex items-center md:justify-end">
                                    <motion.button
                                        onClick={() => navigate(`/project/${currentProject.nextProject.id}`)}
                                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-montrealbold uppercase tracking-tight group flex items-center"
                                        whileHover={{ x: 10 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="line-clamp-1">{currentProject.nextProject.title}</span>
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-3 sm:ml-4 opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/*  mobile fixed navigation */}
                        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 z-20 p-3 flex justify-between">
                            <button
                                onClick={() => navigate(`/project/${currentProject.prevProject.id}`)}
                                className="flex flex-col items-center px-4 sm:px-6 py-2"
                            >
                                <ArrowLeft className="w-5 h-5 mb-1" />
                                <span className="text-xs uppercase">Previous</span>
                            </button>

                            <button
                                onClick={() => {
                                    // Scroll to top with smooth animation
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="flex flex-col items-center px-4 sm:px-6 py-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                                <span className="text-xs uppercase">Top</span>
                            </button>

                            <button
                                onClick={() => navigate(`/project/${currentProject.nextProject.id}`)}
                                className="flex flex-col items-center px-4 sm:px-6 py-2"
                            >
                                <ArrowRight className="w-5 h-5 mb-1" />
                                <span className="text-xs uppercase">Next</span>
                            </button>
                        </div>
                    </section>
                </main>
            </div>

            <Footer />
        </>
    );
};

export default ProjectDetailsPage;
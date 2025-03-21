import React, { Suspense, lazy } from 'react';
import './PortfolioStyles.css/';
import Navbar from './Navbar';
import Footer from './Footer';

// Lazy load the optimized Threads component
const ThreadsOptimized = lazy(() => import('./ThreadsOptimized'));

// Simple fallback while ThreadsOptimized loads
const ThreadsFallback = () => (
    <div className="absolute inset-0 z-0 opacity-40 bg-gray-50"></div>
);

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="w-full h-screen bg-white flex flex-col pt-20 relative overflow-hidden">
                {/* Threads Background Effect with Suspense fallback */}
                <Suspense fallback={<ThreadsFallback />}>
                    <div className="absolute inset-0 z-0 opacity-40">
                        <ThreadsOptimized
                            color={[0.1, 0.1, 0.1]}
                            amplitude={0.7}
                            distance={0.4}
                            enableMouseInteraction={true}
                            quality="auto"
                        />
                    </div>
                </Suspense>

                {/* Main Content Container - All visible in one viewport */}
                <div className="flex-1 px-8 md:px-16 pt-8 md:pt-12 pb-8 flex flex-col relative z-10">
                    {/* Super Large Headline */}
                    <div className="mb-4 md:mb-6">
                        <h1 className="text-[4.5rem] md:text-[6rem] lg:text-[7rem] leading-[0.9] tracking-tight font-montrealbold">
                            I WOULD LOVE TO HEAR FROM YOU
                        </h1>
                    </div>

                    {/* Descriptive Text */}
                    <div className="mb-8 md:mb-12 max-w-3xl">
                        <p className="text-xl md:text-2xl font-light">
                            Feel free to reach out if you want to collaborate, or simply have a chat.
                        </p>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                        {/* Column 1 */}
                        <div>
                            <h2 className="text-sm font-montrealbold uppercase mb-2">Email</h2>
                            <a href="mailto:hellokevinlazo@gmail.com" className="block text-base hover:underline mb-1">
                                hellokevinlazo@gmail.com
                            </a>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <h2 className="text-sm font-montrealbold uppercase mb-2">Connect</h2>
                            <a href="https://www.linkedin.com/in/kevin-l-280314285/" target="_blank" rel="noopener noreferrer" className="block text-base hover:underline mb-1">
                                LinkedIn
                            </a>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <h2 className="text-sm font-montrealbold uppercase mb-2">Download</h2>
                            <a href="resume/kevin_resume.pdf" target="_blank" className="block text-base hover:underline mb-1">
                                Resume
                            </a>
                        </div>
                    </div>

                    {/* Message at bottom */}
                    <div className="mt-auto pb-20">
                        <p className="text-base font-montreal uppercase">
                            ENJOY THE REST OF YOUR DAY!
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
// projectImages.js - A collection of suitable landscape images for the portfolio

// Array of landscape images that resemble classical paintings
export const projectImages = [
    {
        id: "01",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
        caption: "Renaissance art reflected the intellectual and cultural shifts of the era, including the rise of scientific inquiry and exploration.",
        alt: "Sunset landscape with mountains and trees"
    },
    {
        id: "02",
        image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=2070&auto=format&fit=crop",
        caption: "Maritime paintings often depicted the growing naval power and exploration capabilities of European nations.",
        alt: "Historical sailing vessel on the sea"
    },
    {
        id: "03",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
        caption: "The beauty of nature was a central theme in Renaissance and Baroque landscape paintings, emphasizing harmony and divine order.",
        alt: "Mountain lake with reflections at sunset"
    },
    {
        id: "04",
        image: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?q=80&w=2071&auto=format&fit=crop",
        caption: "Classical landscape compositions used atmospheric perspective to create depth and dimension in their natural scenes.",
        alt: "Misty mountain vista with dramatic lighting"
    },
    {
        id: "05",
        image: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=2687&auto=format&fit=crop",
        caption: "Artists of the 17th century often included elements of idealized rural life, blending natural beauty with classical architectural elements.",
        alt: "Golden hour landscape with trees and water"
    }
];

// Function to get a specific image by ID
export const getImageById = (id) => {
    return projectImages.find(item => item.id === id) || projectImages[0];
};

// Function to get the next image in the sequence
export const getNextImage = (currentId) => {
    const currentIndex = projectImages.findIndex(item => item.id === currentId);
    const nextIndex = (currentIndex + 1) % projectImages.length;
    return projectImages[nextIndex];
};

// Function to get the previous image in the sequence
export const getPrevImage = (currentId) => {
    const currentIndex = projectImages.findIndex(item => item.id === currentId);
    const prevIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
    return projectImages[prevIndex];
};

export default projectImages;
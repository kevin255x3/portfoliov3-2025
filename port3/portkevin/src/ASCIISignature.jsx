// ASCIISignature.jsx - Separate component for the ASCII signature
import React from 'react';
import { motion } from 'framer-motion';
import ASCIIText from './ASCIIText';

const ASCIISignature = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <motion.div
            className="w-full h-24 relative overflow-hidden border border-gray-200 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <ASCIIText
                text="KL"
                asciiFontSize={4}
                textFontSize={130}
                textColor="#000000"
                planeBaseHeight={4}
                enableWaves={false}
            />
        </motion.div>
    );
};

export default ASCIISignature;
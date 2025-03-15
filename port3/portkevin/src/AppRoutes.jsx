// AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import PortfolioPage from './PortfolioPage';
import ProjectDetailsPage from './ProjectDetailsPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/project/:projectId" element={<ProjectDetailsPage />} />
        </Routes>
    );
};

export default AppRoutes;
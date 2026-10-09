import { Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import EventoPage from '../pages/EventoPage.tsx';
import SesionEventoPage from '../pages/SesionEventoPage.tsx';

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="evento" element={<EventoPage />} />
                <Route path="sesionevento" element={<SesionEventoPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

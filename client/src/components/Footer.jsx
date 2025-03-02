import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => { 
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.length > 1) { 
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    return (
        <footer className="w-100 mt-auto text-dark p-4">
            <div className="container text-center mb-5">
                {location.pathname !== '/' && (
                    <button
                        className="btn btn-dark mb-3"
                        onClick={handleGoBack}
                    >
                        ← Go Back
                    </button>
                )}
                <h4>© {new Date().getFullYear()} DONEZO</h4>
            </div>
        </footer>
    );
};

export default Footer;
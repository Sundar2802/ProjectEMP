import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleRedirect = ({ role }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'faculty') {
      navigate('/teacher');
    } else if (role === 'student') {
      navigate('/student');
    } else {
      navigate('/login'); // Redirect to login if the role is not recognized
    }
  }, [role, navigate]);

  return null;
};

export default RoleRedirect;

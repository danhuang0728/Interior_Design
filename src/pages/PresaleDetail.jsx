import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { presaleProjects } from '../data/presaleData';
import Navbar from '../components/Navbar';
import './Presale.css';

function PresaleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Scroll to top when loading a new project
    window.scrollTo(0, 0);
    const found = presaleProjects.find((p) => p.id === id);
    if (!found) {
      // If not found, could navigate to 404 or list
      navigate('/presale');
    } else {
      setProject(found);
    }
  }, [id, navigate]);

  if (!project) return null; // Or a loading spinner

  return (
    <>
      <Navbar />
      <main className="presale-detail-main">
        <div className="presale-detail-header-section" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${project.coverImage})`}}>
          <div className="presale-detail-header-content">
            <span className="presale-detail-style-badge">{project.style}</span>
            <h1 className="presale-detail-title">{project.title}</h1>
            <p className="presale-detail-subtitle">{project.subtitle}</p>
          </div>
        </div>

        <div className="presale-detail-container">
          <div className="presale-detail-info-bar">
            <div className="info-item">
              <span className="info-label">空間坪數</span>
              <span className="info-value">{project.size}</span>
            </div>
            {project.details.map((detail, index) => (
              <div className="info-item" key={index}>
                <span className="info-label">{detail.label}</span>
                <span className="info-value">{detail.value}</span>
              </div>
            ))}
          </div>

          <div className="presale-detail-content">
            <div className="presale-detail-text">
              <h2>設計理念與客變故事</h2>
              <p>{project.description}</p>
            </div>

            <div className="presale-detail-gallery">
              <h2>空間視角</h2>
              <div className="presale-detail-images">
                {project.images.map((img, index) => (
                  <div key={index} className="detail-image-wrapper">
                    <img src={img} alt={`${project.title} 視角 ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="presale-detail-actions">
              <Link to="/presale" className="btn-back">返回預售屋列表</Link>
              <Link to="/inquiry" className="btn-primary">預約客變諮詢</Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>Copyright © 2026 泰金閣設計裝修工作室. All rights reserved.</p>
      </footer>
    </>
  );
}

export default PresaleDetail;

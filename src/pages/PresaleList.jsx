import { Link } from 'react-router-dom';
import { presaleProjects } from '../data/presaleData';
import Navbar from '../components/Navbar';
import './Presale.css';

function PresaleList() {
  return (
    <>
      <Navbar />
      <main className="presale-list-main">
        <div className="presale-hero">
          <div className="presale-hero-content">
            <h1 className="presale-title">預售屋設計展示</h1>
            <p className="presale-subtitle">把握客變黃金期，打造專屬您的完美格局與生活動線。</p>
          </div>
        </div>

        <section className="presale-gallery-section">
          <div className="presale-grid">
            {presaleProjects.map((project) => (
              <Link to={`/presale/${project.id}`} key={project.id} className="presale-card">
                <div className="presale-card-image-wrapper">
                  <img src={project.coverImage} alt={project.title} className="presale-card-image" />
                  <div className="presale-card-overlay">
                    <span className="presale-card-action">探索設計細節</span>
                  </div>
                </div>
                <div className="presale-card-content">
                  <p className="presale-card-style">{project.style}</p>
                  <h3 className="presale-card-title">{project.title}</h3>
                  <p className="presale-card-size">{project.size}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>Copyright © 2026 泰金閣設計裝修工作室. All rights reserved.</p>
      </footer>
    </>
  );
}

export default PresaleList;

import "./HeroCard.css";

interface HeroCardProps {
  title: string;
  image: string;
  description: string;
  copyright?: string;
}

const HeroCard: React.FC<HeroCardProps> = ({
  title,
  image,
  description,
  copyright,
}) => {
  return (
    <div className="hero-card">
      <div className="hero-card-image-container">
        {image ? (
          <img src={image} alt={title} className="hero-card-image" />
        ) : (
          <div
            style={{
              width: "100%",
              height: "350px",
              background: "#333",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#aaa",
            }}
          >
            No image available
          </div>
        )}
        {copyright && (
          <span className="hero-card-copyright">© {copyright}</span>
        )}
      </div>
      <div className="hero-card-content">
        <h2 className="hero-card-title">{title}</h2>
        <p className="hero-card-description">{description}</p>
      </div>
    </div>
  );
};

export default HeroCard;

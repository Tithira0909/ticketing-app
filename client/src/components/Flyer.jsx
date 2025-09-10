import flyer from '../assets/flyer.jpg';
import './Flyer.css';

export default function Flyer() {
  return (
    <div className="flyer-container">
      <img src={flyer} alt="Event flyer" className="flyer-image" />
    </div>
  );
}

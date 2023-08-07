import '../App.css';
import FeatureCard from './feature-card.component';
import Navbar from './navbar.component';
import NeonHeading from './neon-heading.component';
import SkinToneAnalyzer from './skin-tone-analyzer.component';

function Recommendations() {
  return (
    <div className="App">
      <NeonHeading heading={"Recommendations By Skin Tone"} />
      <FeatureCard>
        <SkinToneAnalyzer />
      </FeatureCard>
    </div>
  );
}

export default Recommendations;

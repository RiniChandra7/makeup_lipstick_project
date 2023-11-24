import '../App.css';
import BrandsDropdown from './brands-dropdown.component';
import CollectionsDropdown from './collections-dropdown.component';
import ColorDropdown from './color-selector.component';
import FeatureCard from './feature-card.component';
import Navbar from './navbar.component';
import NeonHeading from './neon-heading.component';

function SwatchForm() {
  return (
    <div className="App">
        <NeonHeading heading={"Submit Swatches"} />
        <FeatureCard>
            <BrandsDropdown />
            <CollectionsDropdown />
            <ColorDropdown sourceIsSwatchSubmit={true} />
        </FeatureCard>
    </div>
  );
}

export default SwatchForm;

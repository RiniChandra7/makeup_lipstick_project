import '../App.css';
import BrandsDropdown from './brands-dropdown.component';
import React, {useEffect} from "react";
import FeatureCard from './feature-card.component';
import CollectionsDropdown from './collections-dropdown.component';
import ColorDropdown from './color-selector.component';
import NeonHeading from './neon-heading.component';

function DupeFinder() {
  return (
      <div className="App">
        <NeonHeading heading={"Dupe Finder"} />
        <FeatureCard>
          <BrandsDropdown />
          <CollectionsDropdown />
          <ColorDropdown />
        </FeatureCard>
      </div>    
  );
}

export default DupeFinder;

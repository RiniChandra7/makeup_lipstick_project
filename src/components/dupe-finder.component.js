import '../App.css';
import BrandsDropdown from './brands-dropdown.component';
import React from "react";
import FeatureCard from './feature-card.component';
import CollectionsDropdown from './collections-dropdown.component';
import ColorDropdown from './color-selector.component';

function DupeFinder() {
  return (
      <div className="App">
        <FeatureCard>
          <BrandsDropdown />
          <CollectionsDropdown />
          <ColorDropdown />
        </FeatureCard>
      </div>    
  );
}

export default DupeFinder;

import React from 'react';

export default function     SpaceSceneAssets() {
    return (
        <a-assets>
            {/* Example of adding a model to assets */}
            <a-asset-item id="model" src="models/hull_tall.gltf"></a-asset-item>
            <a-asset-item id="shipyard_obj" src="models/Shipyard.obj"></a-asset-item>
            <a-asset-item id="shipyard_mtl" src="models/Shipyard.mtl"></a-asset-item>
            <a-asset-item id="crystal_obj" src="models/crystals.obj"></a-asset-item>
            <a-asset-item id="crystal_mtl" src="models/crystals.mtl"></a-asset-item>
            <img id="floor" src="assets/images/floor2.webp" crossOrigin="anonymous" />
        </a-assets>
    )
}
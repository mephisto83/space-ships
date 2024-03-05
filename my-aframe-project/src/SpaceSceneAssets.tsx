import React from 'react';
import { texture_names } from './gui/components/texture';

export default function SpaceSceneAssets() {
    let assets = texture_names().map((name) => {
        return <img id={`c${name.split('.').join('_').split('-').join('_')}`} key={name} src={`assets/textures/combined/${name}`} crossOrigin="anonymous" />
    })
    return (
        <a-assets>
            {/* Example of adding a model to assets */}
            <a-asset-item id="model" src="models/hull_tall.gltf"></a-asset-item>
            <a-asset-item id="shipyard_obj" src="models/Shipyard.obj"></a-asset-item>
            <a-asset-item id="shipyard_mtl" src="models/Shipyard.mtl"></a-asset-item>
            <a-asset-item id="crystal_obj" src="models/crystals.obj"></a-asset-item>
            <a-asset-item id="crystal_mtl" src="models/crystals.mtl"></a-asset-item>
            <img id="floor" src="assets/images/floor2.webp" crossOrigin="anonymous" />
            <img id="blue" src="assets/textures/blue.webp" crossOrigin="anonymous" />
            <img id="red" src="assets/textures/red.webp" crossOrigin="anonymous" />
            <img id="yellow" src="assets/textures/yellow.webp" crossOrigin="anonymous" />
            {assets}
        </a-assets>
    )
}
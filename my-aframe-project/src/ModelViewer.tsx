import React, { useEffect, useRef } from 'react';
// Import A-Frame if you installed it via npm
import 'aframe';

const ModelViewer: React.FC<{ objectNameToShow: string }> = ({ objectNameToShow }) => {
    return (
        <>
            <a-entity scale=".1 .1 .1" position="1 -11 1">
                <a-model-loader
                    name='shipyard'
                    object="#shipyard_obj"
                    object_material="#shipyard_mtl"></a-model-loader>
            </a-entity>
            <a-entity position="0 1 5">
                <a-model-loader
                    name="crystal"
                    object="#crystal_obj"
                    object_material="#crystal_mtl"></a-model-loader>
            </a-entity>
        </>
    );
};

export default ModelViewer;

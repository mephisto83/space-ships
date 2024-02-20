import React from 'react';

export default function SpaceSceneControls() {
    return (
        <>
            <a-entity id="mouseCursor" cursor="rayOrigin: mouse" raycaster="objects: [gui-interactable]">
            </a-entity>
            <a-entity id="leftHand" laser-controls="hand: left" raycaster="objects: [gui-interactable]"></a-entity>
            <a-entity id="rightHand" laser-controls="hand: right" raycaster="objects: [gui-interactable]"></a-entity>
            <a-entity id="cameraRig">
                <a-entity id="acamera" camera>
                </a-entity>
                <a-entity id="leftHand"
                    laser-controls="hand: left"
                    raycaster="objects: .raycastable;"
                >
                </a-entity>
                <a-entity id="rightHand" laser-controls="hand: right" raycaster="objects: .raycastable" line="color: #118A7E">
                </a-entity>
            </a-entity>
        </>
    )
}
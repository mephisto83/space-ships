import { useEffect, useState } from "react";
import ModelViewer from "./ModelViewer";
import SpaceSceneAssets from "./SpaceSceneAssets";
import SpaceSceneControls from "./SpaceSceneControls";
import { useSceneLoaded } from "./useSceneLoaded";
import gui from "./gui";

export default function SpaceShipScene() {
    return (
        <a-scene>
            <SpaceSceneAssets />
            <a-light type="point" light="color: #fff; intensity:0.6" position="3 10 1"></a-light>
            <a-light type="point" light="color: #fff; intensity:0.2" position="-3 -10 0"></a-light>
            <a-light type="hemisphere" groundColor="#888" intensity="0.8"></a-light>
            <ModelViewer objectNameToShow={'hull.tall'} />
            <a-entity position="2 1.5 0" scale=".1 .1 .1">
                <a-ship-part name={'hull.tall'}></a-ship-part>
            </a-entity>
            <a-entity position="-2 1.5 0" scale=".1 .1 .1">
                <a-ship-part name={'hull.fish'}></a-ship-part>
            </a-entity>
            <a-entity position="-3 1.5 2" scale=".1 .1 .1">
                <a-ship-part name={'hull.bullHead'}></a-ship-part>
            </a-entity>
            <a-entity id="ground"
                geometry="primitive: box; width: 12; height: 0.01; depth: 12"
                material="shader: flat; src: #floor; repeat: 4 4">
            </a-entity>
            <SpaceSceneControls />
        </a-scene>
    )
}
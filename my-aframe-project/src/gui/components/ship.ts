import { FacePosition, adjustSecondPointToFaceFirst, calculateDistanceBetweenVectors, calculateRotationToNormal, convertEulerRadiansToDegrees, getRandomPartsFrom, getShipCollections, getShipPartFacePosition, seed } from "../../shipparts";
import { SpaceshipEvents } from "../events";
import { raiseCustomEvent } from "../util";


/* globals AFRAME THREE */
export default function () {
    const AFRAME: any = (window as any).AFRAME || {};
    const THREE: any = (window as any).THREE;
    AFRAME.registerComponent('ship', {
        schema: {
            name: { type: 'string' },
            seed: { type: 'string' },
            modelName: { type: 'string' }
        },
        update: function (oldData: any) {
            this.setup()
        },
        bindMethods: function () {
            this.onSpaceShipLoaded = this.onSpaceShipLoaded.bind(this);
        },
        onSpaceShipLoaded: function (evt: any) {
            let { detail } = evt;
            if (detail.name === this.data.modelName) {
                this.setLoader(detail.loader)
            }
        },
        setLoader: function (loader: any) {
            this.loader = loader;
            this.setup()
        },
        createPartAndPosition: function (engine: string, facePosition: FacePosition, entity: any) {
            let shipPart = document.createElement('a-ship-part');
            shipPart.setAttribute('name', engine);
            shipPart.setAttribute('model-name', this.data.modelName)
            let positionContainer = document.createElement('a-entity');
            let enginePoints = getShipPartFacePosition(engine);
            if (enginePoints) {
                let point = enginePoints[0];
                let distance = calculateDistanceBetweenVectors(facePosition.position, point.position);
                let {
                    position,
                    rotation
                } = adjustSecondPointToFaceFirst(facePosition, point, distance || 0)
                positionContainer.setAttribute('position', `${position.x} ${position.z} ${position.y} `);
                // positionContainer.setAttribute('rotation', `${rotation.x} ${rotation.z}  ${rotation.y} `);
                positionContainer.appendChild(shipPart);
                entity.appendChild(positionContainer);
            }
        },
        setup: function () {
            if (this.entity) {
                this.entity.parentNode.removeChild(this.entity);
                this.entity = null;
            }
            if (this.data.seed) {
                if (!this.model) {
                    let entity: any = document.createElement('a-entity');
                    let collection = 'Hulls';
                    let hull = getRandomPartsFrom(collection, 1, this.data.seed)[0];

                    let hullDom = document.createElement('a-ship-part');
                    hullDom.setAttribute('name', hull);
                    hullDom.setAttribute('model-name', this.data.modelName)
                    entity.appendChild(hullDom);

                    let hullBondPoints = getShipPartFacePosition(hull);
                    if (hullBondPoints) {
                        let engineParts = getRandomPartsFrom('Engines', 2, this.data.seed);
                        for (let i = 0; i < engineParts.length; i++) {
                            let engine = engineParts[i];
                            // if (seed(this.data.seed, `${this.data.seed}`.length) > `${this.data.seed}`.length / 2) {
                            this.createPartAndPosition(engine, hullBondPoints[i], hullDom)
                            // }
                        }
                    }
                    this.el.appendChild(entity);
                    this.entity = entity;
                }
            }
        },
        init: function () {
            this.bindMethods();
        }
    });

    AFRAME.registerPrimitive('a-ship', {
        defaultComponents: {
            'ship': {}
        },
        mappings: {
            //gui item general
            'name': 'ship.name',
            'seed': 'ship.seed',
            'model-name': 'ship.modelName'
        }
    });
};
import { SpaceshipEvents } from "../events";
import { raiseCustomEvent } from "../util";


/* globals AFRAME THREE */
export default function () {
    const AFRAME: any = (window as any).AFRAME || {};
    const THREE: any = (window as any).THREE;
    AFRAME.registerComponent('ship-part', {
        schema: {
            name: { type: 'string' },
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
        setup: function () {
            if (this.entity) {
                this.entity.parentNode.removeChild(this.entity);
                this.entity = null;
                this.model = null;
            }
            if (this.data.name && this.loader) {
                if (!this.model) {
                    let model = this.loader.cloneModel(this.data.name);
                    if (model) {
                        let entity: any = document.createElement('a-entity');
                        let imageElement = document.querySelector(`#red`);
                        if (imageElement) {
                            const texture = new THREE.Texture(imageElement);
                            texture.needsUpdate = true; // Important: Update the texture with the image data

                            model.traverse((child: any) => {
                                if (child.isMesh) {
                                    child.material.map = texture; // Apply the texture to each mesh
                                    child.material.needsUpdate = true; // Ensure the material is updated
                                }
                            });
                        }
                        entity.object3D.add(model);
                        this.el.appendChild(entity);
                        this.entity = entity;
                        this.model = model;
                    }
                }
            }
        },
        init: function () {
            this.bindMethods();
            window.addEventListener(SpaceshipEvents.SPACE_SHIP_LOADED, this.onSpaceShipLoaded)
            window.addEventListener(SpaceshipEvents.MODELS_LOADED, this.onSpaceShipLoaded);
            raiseCustomEvent(SpaceshipEvents.SHIP_PART_INIT, {
                shipPart: this,
                name: this.data.modelName
            });
        }
    });

    AFRAME.registerPrimitive('a-ship-part', {
        defaultComponents: {
            'ship-part': {}
        },
        mappings: {
            //gui item general
            'name': 'ship-part.name',
            'model-name': 'ship-part.modelName'
        }
    });
};
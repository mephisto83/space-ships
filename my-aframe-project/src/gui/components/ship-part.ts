import { SpaceshipEvents } from "../events";
import { raiseCustomEvent } from "../util";

const THREE: any = (window as any).THREE;

/* globals AFRAME THREE */
export default function () {
    const AFRAME: any = (window as any).AFRAME || {}
    AFRAME.registerComponent('ship-part', {
        schema: {
            name: { type: 'string' }
        },
        update: function (oldData: any) {
            this.setup()
        },
        bindMethods: function () {
            this.onSpaceShipLoaded = this.onSpaceShipLoaded.bind(this);
        },
        onSpaceShipLoaded: function (evt: any) {
            let { detail } = evt;
            this.setLoader(detail.loader)
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
                    let entity: any = document.createElement('a-entity');
                    entity.object3D.add(model);
                    this.el.appendChild(entity);
                    this.entity = entity;
                    this.model = model;
                }
            }
        },
        init: function () {
            this.bindMethods();
            window.addEventListener(SpaceshipEvents.MODELS_LOADED, this.onSpaceShipLoaded);
            raiseCustomEvent(SpaceshipEvents.SHIP_PART_INIT, {
                shipPart: this
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
        }
    });
};
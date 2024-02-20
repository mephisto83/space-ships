import { SpaceshipEvents } from "../events";
import { raiseCustomEvent } from "../util";

const THREE: any = (window as any).THREE;

/* globals AFRAME THREE */
export default function () {
    const AFRAME: any = (window as any).AFRAME || {}
    AFRAME.registerComponent('model-loader', {
        schema: {
            object: { type: 'string' },
            object_material: { type: 'string' },
            name: { type: 'string' }
        },
        update: function () {

        },
        onModelLoaded: function (evt: any) {
            let me = this;
            var model = evt.detail.model;

            // Hide the entire model initially
            model.traverse(function (child: any) {
                if (child.isMesh) {
                    child.visible = false;
                }
            });
            this.modelSource = model;
            raiseCustomEvent(SpaceshipEvents.MODELS_LOADED, {
                loader: this
            })
        },
        cloneModel: function (name: string) {
            return this.createModel(this.modelSource, name);
        },
        createModel: function (model: any, name: any) {
            var specifiedObject = model.getObjectByName(name);
            if (specifiedObject) {
                // Clone the specified object
                var clone = specifiedObject.clone();

                // The clone is now a separate entity, so it can be directly manipulated. 
                // Since it's being added to this.el, its position is relative to this.el's position.
                clone.position.set(0, 0, 0); // This positions the clone at (0, 0, 0) relative to this.el
                clone.visible = true; // Make sure the clone is visible

                // Since THREE.js objects are added to entities in A-Frame via the object3D property, do:
                this.el.object3D.add(clone);

                // Update internal references to include the cloned object for any future interactions
                return clone;
            }
            return null;
        },
        bindMethods: function () {
            this.onModelLoaded = this.onModelLoaded.bind(this);
            this.cloneModel = this.cloneModel.bind(this);
            this.onSpaceShipLoaded = this.onSpaceShipLoaded.bind(this);
        },
        onSpaceShipLoaded: function () {
            if (this.modelSource && this.data.name) {
                this.createModel(this.modelSource, this.data.name);
            }
        },
        init: function () {
            let me = this;
            var el = this.el;
            this.bindMethods();
            el.addEventListener('model-loaded', this.onModelLoaded);
            window.addEventListener(SpaceshipEvents.MODELS_LOADED, this.onSpaceShipLoaded);
            window.addEventListener(SpaceshipEvents.SHIP_PART_INIT, function (evt: any) {
                const { detail } = evt;
                if (detail?.shipPart) {
                    detail.shipPart.setLoader(me);
                }
            });

            let uiEl = this.uiEl = document.createElement('a-entity');
            uiEl.setAttribute('obj-model', `obj:${this.data.object}; mtl:${this.data.object_material};`);
            uiEl.setAttribute('position', '0 0 0');
            uiEl.setAttribute('scale', '1 1 1');
            (uiEl as any).setAttribute('visible', true);
            el.appendChild(uiEl);
        }
    });

    AFRAME.registerPrimitive('a-model-loader', {
        defaultComponents: {
            'model-loader': {}
        },
        mappings: {
            //gui item general
            'name': 'model-loader.name',
            'object': 'model-loader.object',
            'object_material': 'model-loader.object_material'
        }
    });
};
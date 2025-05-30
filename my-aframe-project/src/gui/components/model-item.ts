import { convertBlenderToAFrameCoordinates, getShipPartFacePosition, getShipScaleFor, scaleFace } from "../../shipparts";

export default function () {
    const AFRAME: any = (window as any).AFRAME || {};
    const THREE: any = (window as any).THREE;
    AFRAME.registerComponent('space-item', {
        schema: {
            options: { type: 'string' }
        },
        play: function () {

        },
        init: function () {
            let me = this;

            let { guiItem, part, modelName, } = JSON.parse(this.data.options);  // Component data
            me.guiItem = guiItem;
            let entity: any = document.createElement('a-entity');
            entity.setAttribute('rotation', `0 180 0`);
            entity.setAttribute('position', `0 0 .2`);
            let scale = getShipScaleFor(part, 1.8);
            entity.setAttribute('scale', `${scale} ${scale} ${scale}`);

            let shipPart: any = document.createElement('a-ship-part');
            shipPart.setAttribute('name', `${part}`);
            shipPart.setAttribute('model-name', `${modelName}`);
            let face_positions = getShipPartFacePosition(`${part}`);
            this.facePositions = [];
            if (face_positions) {
                // face_positions = face_positions?.map(f => scaleFace(f, scale));
                this.facePositions = face_positions.map((fp) => {
                    let sphere = document.createElement('a-sphere');
                    let pos = convertBlenderToAFrameCoordinates(fp.position);
                    sphere.setAttribute('radius', '.1');
                    sphere.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
                    sphere.setAttribute('color', 'red');
                    shipPart.appendChild(sphere);
                    return sphere;
                })
            }

            let text = document.createElement('a-troika-text');
            text.setAttribute('anchor', 'center');
            text.setAttribute('value', part);
            text.setAttribute('position', `0 -.5 .2`);
            text.setAttribute('rotation', `0 0 0`);
            scale = .7;
            text.setAttribute('scale', `${scale} ${scale} ${scale}`);

            entity.appendChild(shipPart);
            this.el.appendChild(text);
            this.el.appendChild(entity);
        }
    });
    AFRAME.registerPrimitive('a-space-item', {
        defaultComponents: {
            'space-item': {}
        },
        mappings: {
            options: 'space-item.options'
        }
    });
}
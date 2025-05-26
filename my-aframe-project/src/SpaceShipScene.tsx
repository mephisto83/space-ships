import { useEffect, useRef, useState } from "react";
import ModelViewer from "./ModelViewer";
import SpaceSceneAssets from "./SpaceSceneAssets";
import SpaceSceneControls from "./SpaceSceneControls";
import gui from "./gui";
import { setAttribute, load, raiseOn, useBindEventOn, useEventListenerOn } from 'a-frame-components';
import { getRandomPartsFrom, getShipCollections, getShipPartsFromCollection } from "./shipparts";

export default function SpaceShipScene() {
    const [loaded, setLoaded] = useState(false);
    const [collection, setCollection] = useState('');
    const menuProps = useBindEventOn('change', 'text-value', (evt: any) => {
        return evt.detail.value;
    });
    const shipPartsList = useBindEventOn('collection-change', 'options', (evt: any) => {
        let parts = getShipPartsFromCollection(evt.detail.value) || []
        return JSON.stringify(parts.map((text, index) => {
            return {
                id: index,
                value: index,
                part: text,
                modelName: 'shipyard'
            }
        }))
    })
    const shipCollectionProps = useBindEventOn('change', 'text-value', (evt: any) => {
        raiseOn(shipPartsList, 'collection-change', { value: evt.detail.value })
        setCollection(evt.detail.value);
        return evt.detail.value;
    });

    const ship = useEventListenerOn('ship-update', (evt: any) => {

    });

    const randomShipBuild = useEventListenerOn('clicked', (evt: any) => {
        let parts = getRandomPartsFrom(collection, 1, 'Andrew');
        console.log(parts);
        setAttribute(ship, 'seed', 'andrew');
    });

    const buttonProps = useBindEventOn('change', 'value', (evt: any) => {
        return evt.detail.value;
    })

    const imageGrabbed = useEventListenerOn('drop-grabbed-data', (evt: any) => {
        console.log('dropped grabbed data caught.')
        console.log(evt);
        console.log(evt.detail.data.value);
        raiseOn(buttonProps, 'change', { value: evt.detail.data.value })
    });



    useEffect(() => {
        load().catch(console.log).then(() => {
            gui();
            setLoaded(true);
        });
    }, [])
    useEffect(() => {
        if (loaded) {
            let radio = document.querySelector(`[id="radio"]`);
            radio?.addEventListener('change', (evt: any) => {
                console.log(evt.detail);
            })
        }
    }, [loaded])
    if (!loaded) {
        return <></>
    }
    const margin = '.1 1 .1 1'
    return (
        <a-scene>
            <a-entity position="0 1.5 -22">
                <frame-container direction="horizontal" alignment="flexStart" margin={margin}>
                    <frame-canvas-image
                        {...imageGrabbed}
                        url="assets/images/floor2.webp"
                        grabanddropzone=''
                        height={2}></frame-canvas-image>
                    <frame-container margin={margin} direction="vertical">
                        <frame-radio options='[{"text": "Apple", "value": "A", "id": "A"}, {"text": "Banana", "value": "B", "id": "B"}, {"text": "Cherry", "value": "C", "id": "C"}]' value="A"></frame-radio>
                        <frame-checkbox label="Checkboxing it" value="false"></frame-checkbox>
                    </frame-container>
                    <frame-slider orientation="vertical" percent={.3} bar-thickness=".2" bar-length="3" height=".3" targetbarsize={1} title={'Slider'} title-position="0 .2 0"></frame-slider>
                    <frame-container direction="horizontal" alignment="flexStart" margin={margin}>
                        <frame-container direction="vertical" alignment="flexStart" margin={margin}>
                            <frame-button
                                font-size=".07"
                                title={'Title 1'}
                                interactive-type={'button'}
                                width={1}
                                height={1}
                                margin="0 0 0.05 0" value="a b asdfutton" />
                            <frame-menu-container
                                id="menu"
                                {...menuProps}
                                forward-step="0.05"
                                text-value="Menu 1 a"
                                menu-direction={'up'}
                                flex-direction="column"
                                justify-content="flexStart"
                                align-items="flexStart"
                                component-padding="0.01"
                                menu-item-height={`.2`}
                                menu-item-width={`1.0`}>
                                <frame-base-interactive
                                    font-size=".07"
                                    value={'word1'}
                                    title={'Title 1'}
                                    interactive-type={'button'}
                                    width={1}
                                    height={"0.2"}
                                    margin="0 0 0.05 0"
                                />
                                <frame-base-interactive
                                    font-size=".07"
                                    value={'word2'}
                                    interactive-type={'button'}
                                    title={'Title 2'}
                                    width={1}
                                    height={"0.2"}
                                    margin="0 0 0.05 0"
                                />
                                <frame-base-interactive
                                    font-size=".07"
                                    value={'word3'}
                                    title={'Title 3'}
                                    interactive-type={'button'}
                                    width={2}
                                    height={"0.2"}
                                    margin="0 0 0.05 0"
                                />
                            </frame-menu-container>
                            <frame-text-input value="text field" font-size=".05"></frame-text-input>
                            <frame-menu-container
                                id="menu"
                                forward-step="0.05"
                                text-value="Menu 1 a"
                                menu-direction={'up'}
                                flex-direction="column"
                                justify-content="flexStart"
                                align-items="flexStart"
                                component-padding="0.01"
                                menu-item-height={`.2`}
                                menu-item-width={`1.0`}>
                                <frame-base-interactive
                                    font-size=".07"
                                    value={'word1'}
                                    title={'Title 1'}
                                    interactive-type={'button'}
                                    width={1}
                                    height={"0.2"}
                                    margin="0 0 0.05 0"
                                />
                                <frame-base-interactive
                                    font-size=".07"
                                    value={'word2'}
                                    interactive-type={'button'}
                                    title={'Title 2'}
                                    width={1}
                                    height={"0.2"}
                                    margin="0 0 0.05 0"
                                />
                                <frame-base-interactive
                                    font-size=".07"
                                    value={'word3'}
                                    title={'Title 3'}
                                    interactive-type={'button'}
                                    width={2}
                                    height={"0.2"}
                                    margin="0 0 0.05 0"
                                />
                            </frame-menu-container>
                        </frame-container>
                        <frame-infinite-list
                            speed=".1"
                            itemtemplate="a-model-item"
                            options={JSON.stringify(new Array(100).fill((_: any, g: any) => 1).map((text, index) => {
                                return {
                                    id: index,
                                    value: index,
                                    text,
                                    url: 'assets/images/test.png'
                                }
                            }))}
                            hideclose={`true`}
                            selectionevent="my-image-selection"
                            closeevent={'close-my-images-ignored'}
                            width={3}
                            columns={4}>
                        </frame-infinite-list>
                        <frame-container direction="vertical" alignment="flexStart" margin={margin}>
                            <frame-button
                                font-size=".07"
                                title={'Title 1'}
                                interactive-type={'button'}
                                width={1}
                                height={1}
                                margin="0 0 0.05 0" value="a b asdfutton" />
                            <frame-menu-container
                                id="menu"
                                forward-step="0.05"
                                text-value="Menu 1 a"
                                menu-direction={'up'}
                                flex-direction="column"
                                justify-content="flexStart"
                                align-items="flexStart"
                                component-padding="0.01"
                                menu-item-height={`.2`}
                                menu-item-width={`1.0`}>
                                <frame-base-interactive
                                    font-size=".07"
                                    value={'word1'}
                                    title={'Title 1'}
                                    interactive-type={'button'}
                                    width={1}
                                    height={"0.2"}
                                    margin="0 0 0.05 0"
                                />
                                <frame-base-interactive
                                    font-size=".07"
                                    value={'word2'}
                                    interactive-type={'button'}
                                    title={'Title 2'}
                                    width={1}
                                    height={"0.2"}
                                    margin="0 0 0.05 0"
                                />
                                <frame-base-interactive
                                    font-size=".07"
                                    value={'word3'}
                                    title={'Title 3'}
                                    interactive-type={'button'}
                                    width={2}
                                    height={"0.2"}
                                    margin="0 0 0.05 0"
                                />
                            </frame-menu-container>
                            <frame-menu-container
                                id="menu"
                                forward-step="0.05"
                                text-value="Menu 1 a"
                                menu-direction={'up'}
                                flex-direction="column"
                                justify-content="flexStart"
                                align-items="flexStart"
                                component-padding="0.01"
                                menu-item-height={`.2`}
                                menu-item-width={`1.0`}>
                                <frame-base-interactive
                                    font-size=".07"
                                    value={'word1'}
                                    title={'Title 1'}
                                    interactive-type={'button'}
                                    width={1}
                                    height={"0.2"}
                                    margin="0 0 0.05 0"
                                />
                                <frame-base-interactive
                                    font-size=".07"
                                    value={'word2'}
                                    interactive-type={'button'}
                                    title={'Title 2'}
                                    width={1}
                                    height={"0.2"}
                                    margin="0 0 0.05 0"
                                />
                                <frame-base-interactive
                                    font-size=".07"
                                    value={'word3'}
                                    title={'Title 3'}
                                    interactive-type={'button'}
                                    width={2}
                                    height={"0.2"}
                                    margin="0 0 0.05 0"
                                />
                            </frame-menu-container>
                        </frame-container>
                    </frame-container>
                </frame-container>
            </a-entity>
            <a-entity rotation="0 0 0" position="0 2 -2">
                <frame-container direction="horizontal" alignment="flexStart" margin={margin}>
                    <frame-base-interactive font-size=".07"
                        {...randomShipBuild}
                        value={'Build Random'}
                        title={'Build Random'}
                        interactive-type={'button'}
                        width={1}
                        height={"0.2"}
                        margin="0 0 0.05 0" />
                    <frame-menu-container
                        {...shipCollectionProps}
                        forward-step="0.05"
                        text-value="---Select---"
                        menu-direction={'down'}
                        flex-direction="column"
                        justify-content="flexStart"
                        align-items="flexStart"
                        component-padding="0.01"
                        menu-item-height={`.2`}
                        menu-item-width={`1.0`}>
                        {
                            getShipCollections().map((collectionName) => {
                                return (
                                    <frame-base-interactive
                                        font-size=".07"
                                        value={collectionName}
                                        title={collectionName}
                                        interactive-type={'button'}
                                        width={1}
                                        height={"0.2"}
                                        margin="0 0 0.05 0"
                                    />
                                )
                            })
                        }
                    </frame-menu-container>
                    <frame-infinite-list
                        {...shipPartsList}
                        speed=".1"
                        itemtemplate="a-space-item"
                        itemsize="1.5"
                        options={JSON.stringify([])}
                        hideclose={`true`}
                        selectionevent="my-image-selection"
                        closeevent={'close-my-images-ignored'}
                        width={6}
                        columns={4}>
                    </frame-infinite-list>
                </frame-container>
            </a-entity>
            <SpaceSceneAssets />
            <a-light type="point" light="color: #fff; intensity:0.6" position="3 10 1"></a-light>
            <a-light type="point" light="color: #fff; intensity:0.2" position="-3 -10 0"></a-light>
            <a-light type="hemisphere" groundColor="#888" intensity="0.8"></a-light>
            <ModelViewer objectNameToShow={'hull.tall'} />
            <a-entity position="2 2 -12" scale="1 1 1">
                <a-ship {...ship} model-name="shipyard"/>
            </a-entity>
            {/* <a-entity position="2 1.5 0" scale=".1 .1 .1">
                <a-ship-part name={'hull.tall'} model-name="shipyard"></a-ship-part>
            </a-entity>
            <a-entity position="-2 1.5 0" scale=".1 .1 .1">
                <a-ship-part name={'hull.fish'} model-name="shipyard"></a-ship-part>
            </a-entity>
            <a-entity position="-3 1.5 2" scale=".1 .1 .1">
                <a-ship-part name={'hull.bullHead'} model-name="shipyard"></a-ship-part>
            </a-entity>
            <a-entity position="1 1.5 2" scale=".1 .1 .1">
                <a-ship-part name={'hull.bullHead'} model-name="shipyard"></a-ship-part>
            </a-entity> */}
            <a-entity id="ground"
                geometry="primitive: box; width: 12; height: 0.01; depth: 12"
                material="shader: flat; src: #floor; repeat: 10 10">
            </a-entity>
            <SpaceSceneControls />
        </a-scene>
    )
}
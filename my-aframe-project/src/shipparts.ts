const cache: any = {
    collections: null
}
export function getShipCollections(): string[] {
    if (cache?.collections) {
        return cache?.collections;
    }
    let parts = getShipParts();
    let collections: string[] = [];
    Object.values(parts).map(t => {
        if (collections.indexOf(t.collection) === -1) {
            collections.push(t.collection);
        }
    })
    cache.collections = collections;
    return collections;
}

export function getShipPartsFromCollection(collection: string) {
    let collections = getShipCollections();
    if (collections?.indexOf(collection) === -1) {
        return [];
    }

    let parts = Object.values(getShipParts());
    return parts.filter(x => x.collection === collection).map(d => d.object_name);
}


export function getRandomPartsFrom(collection: string, count: number, seed: string): string[] {
    let parts = getShipPartsFromCollection(collection);
    return seededSelection(parts, count, seed);
}

export function stringToSeed(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export function seed(str: string, max: number): number {
    let num = stringToSeed(str);
    return num % max;
}

export function seededRandomGenerator(seed: number): () => number {
    return function () {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
}

export function seededSelection<T>(items: T[], count: number, seedStr: string): T[] {
    let seed = stringToSeed(seedStr);
    const random = seededRandomGenerator(seed);

    const indices = Array.from(items.keys());

    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const selectedIndices = indices.slice(0, count);
    return selectedIndices.map(index => items[index]);
}
export function calculateScaleToFit(
    objectDimensions: { height: number; width: number; depth: number },
    boxSize: number
): number {
    // Destructure the object dimensions for easier access
    const { height, width, depth } = objectDimensions;

    // Find the largest dimension of the object
    const largestDimension = Math.max(height, width, depth);

    // Calculate the scale factor required to fit the object within the box
    const scaleFactor = boxSize / largestDimension;

    return scaleFactor;
}

export function getShipPart(part: string) {
    let shipPart = Object.values(getShipParts()).find(x => x.object_name === part)
    return shipPart;
}

export function getShipPartDimension(name: string) {
    let part = getShipPart(name);
    return part?.dimensions;
}

export function getShipPartFacePosition(name: string): FacePosition[] | null {
    let part = getShipPart(name);
    return (part?.face_information as any) || null;
}
export function scaleFace(facePosition: FacePosition, scale: number): FacePosition {
    let res = {
        ...facePosition,
        position: scalePosition(facePosition.position, scale)
    };
    return res;
}
export function getShipScaleFor(name: string, size: number) {
    let dimensions = getShipPartDimension(name);
    return calculateScaleToFit({
        width: dimensions?.width || 1,
        depth: dimensions?.depth || 1,
        height: dimensions?.height || 1
    }, size);
}
function radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI);
}

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

function calculateDirectionVector(from: Vector3, to: Vector3): Vector3 {
    return {
        x: to.x - from.x,
        y: to.y - from.y,
        z: to.z - from.z
    };
}

function normalizeVector(vector: Vector3): Vector3 {
    const length = Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
    return {
        x: vector.x / length,
        y: vector.y / length,
        z: vector.z / length
    };
}
interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
}

function vectorToQuaternion(normal: Vector3): Quaternion {
    // Assuming the default vector is the Z-axis
    const defaultVector: Vector3 = { x: 0, y: 0, z: 1 };
    const crossProduct: Vector3 = {
        x: defaultVector.y * normal.z - defaultVector.z * normal.y,
        y: defaultVector.z * normal.x - defaultVector.x * normal.z,
        z: defaultVector.x * normal.y - defaultVector.y * normal.x,
    };

    const dotProduct = defaultVector.x * normal.x + defaultVector.y * normal.y + defaultVector.z * normal.z;
    const s = Math.sqrt((1 + dotProduct) * 2);
    const invS = 1 / s;

    return {
        x: crossProduct.x * invS,
        y: crossProduct.y * invS,
        z: crossProduct.z * invS,
        w: s * 0.5,
    };
}

function quaternionToEuler(quaternion: Quaternion): Vector3 {
    const { x, y, z, w } = quaternion;

    const sinr_cosp = 2 * (w * x + y * z);
    const cosr_cosp = 1 - 2 * (x * x + y * y);
    const roll = Math.atan2(sinr_cosp, cosr_cosp);

    const sinp = 2 * (w * y - z * x);
    const pitch = Math.abs(sinp) >= 1 ? Math.sign(sinp) * Math.PI / 2 : Math.asin(sinp);

    const siny_cosp = 2 * (w * z + x * y);
    const cosy_cosp = 1 - 2 * (y * y + z * z);
    const yaw = Math.atan2(siny_cosp, cosy_cosp);

    // Convert from radians to degrees, if necessary
    return {
        x: roll,
        y: pitch,
        z: yaw,
    };
}

export function calculateDistanceBetweenVectors(vectorA: Vector3, vectorB: Vector3): number {
    const xDiff = vectorB.x - vectorA.x;
    const yDiff = vectorB.y - vectorA.y;
    const zDiff = vectorB.z - vectorA.z;

    return Math.sqrt(xDiff ** 2 + yDiff ** 2 + zDiff ** 2);
}
// Adjusts the second point to face the first point
export function adjustSecondPointToFaceFirst(
    pointA: {
        position: Vector3; normal: Vector3;
    },
    pointB: {
        position: Vector3; normal: Vector3;
    }, desiredDistance?: number): {
        position: Vector3;
        rotation: Vector3;
    } {
    const directionVector = calculateDirectionVector(pointB.position, pointA.position);
    const normalizedDirection = normalizeVector(directionVector);

    // Calculate rotation for point B's normal to face point A
    const rotationQuaternionB = vectorToQuaternion(normalizedDirection);
    const rotationEulerB = quaternionToEuler(rotationQuaternionB); // If needed

    let newPositionB = pointB.position;
    if (desiredDistance !== undefined) {
        // Move point B to be at `desiredDistance` from point A
        newPositionB = {
            x: pointA.position.x - normalizedDirection.x * desiredDistance,
            y: pointA.position.y - normalizedDirection.y * desiredDistance,
            z: pointA.position.z - normalizedDirection.z * desiredDistance
        };
    }

    return {
        position: newPositionB,
        rotation: convertEulerRadiansToDegrees(rotationEulerB) // or `rotationEulerB` if using Euler angles
    };
}

export function convertEulerRadiansToDegrees(eulerRadians: Vector3d): Vector3 {
    return {
        x: radiansToDegrees(eulerRadians.x),
        y: radiansToDegrees(eulerRadians.y),
        z: radiansToDegrees(eulerRadians.z),
    };
}

export function calculateRotationToNormal(normal: Vector3d): Vector3d {
    // Assuming initial vector pointing in the Z-axis direction (0, 0, 1)
    const initialVector: Vector3d = { x: 0, y: 0, z: 1 };

    // Calculate the cross product to find the rotation axis
    const rotationAxis: Vector3d = {
        x: initialVector.y * normal.z - initialVector.z * normal.y,
        y: initialVector.z * normal.x - initialVector.x * normal.z,
        z: initialVector.x * normal.y - initialVector.y * normal.x
    };

    // Calculate the angle between the vectors
    const dotProduct = initialVector.x * normal.x + initialVector.y * normal.y + initialVector.z * normal.z;
    const angle = Math.acos(dotProduct); // Angle in radians

    // To find the Euler angles (in radians) from the rotation axis and angle,
    // one could use conversion formulas or a library like three.js for more complex calculations.
    // For simplicity, this example will assume a direct conversion for scenarios aligned with cardinal axes.
    // Note: This simplistic approach does not account for all cases or gimbal lock.

    // Assuming the rotation axis is normalized
    let rotationMagnitude = Math.sqrt(rotationAxis.x ** 2 + rotationAxis.y ** 2 + rotationAxis.z ** 2);
    let normalizedAxis = {
        x: rotationAxis.x / rotationMagnitude,
        y: rotationAxis.y / rotationMagnitude,
        z: rotationAxis.z / rotationMagnitude
    };

    // Simple approach: assuming rotation primarily around a single axis for demonstration
    return {
        x: normalizedAxis.x * angle,
        y: normalizedAxis.y * angle,
        z: normalizedAxis.z * angle
    };
}

export interface FacePosition {
    position: Vector3d;
    normal: Vector3d;
}
interface Vector3d {
    x: number;
    y: number;
    z: number;
}

export function convertBlenderToAFrameCoordinates(blenderCoords: Vector3d): Vector3d {
    // In Blender, Z is up, but in A-Frame, Y is up.
    // Additionally, A-Frame's Z-axis points backward (into the screen), opposite Blender's Y-axis direction.
    return {
        x: blenderCoords.x,
        y: blenderCoords.z,
        z: -blenderCoords.y
    };
}

function scalePosition(position: Vector3d, scale: number): Vector3d {
    return {
        x: position.x * scale,
        y: position.y * scale,
        z: position.z * scale,
    };
}
interface Dimension {
    width: number;
    height: number;
    depth: number;
}

interface Position {
    x: number;
    y: number;
    z: number;
}

interface Normal {
    x: number;
    y: number;
    z: number;
}

interface FaceInformation {
    position: Position;
    normal: Normal;
}

interface Component {
    collection: string;
    object_name: string;
    dimensions: Dimension;
    face_information: FaceInformation[];
}

export function getShipParts(): { [key: string]: Component } {
    let temp = {
        "Components_ventPortBlock": {
            "collection": "Components",
            "object_name": "ventPortBlock",
            "dimensions": {
                "width": 0.8979556560516357,
                "height": 0.8128712773323059,
                "depth": 3.56246280670166
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.202938973903656,
                        "y": 1.2981230020523071,
                        "z": 0.5074144005775452
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_splitBlock": {
            "collection": "Components",
            "object_name": "splitBlock",
            "dimensions": {
                "width": 1.394844651222229,
                "height": 1.7760794162750244,
                "depth": 3.257807731628418
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.1548399925231934e-07,
                        "y": 0.1443939357995987,
                        "z": 1.0534847974777222
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_plumbBlock": {
            "collection": "Components",
            "object_name": "plumbBlock",
            "dimensions": {
                "width": 1.524379849433899,
                "height": 1.719730257987976,
                "depth": 3.2402262687683105
            },
            "face_information": [
                {
                    "position": {
                        "x": -4.470348358154297e-08,
                        "y": -0.8532254099845886,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Components_checkBlock": {
            "collection": "Components",
            "object_name": "checkBlock",
            "dimensions": {
                "width": 1.2786953449249268,
                "height": 1.9176993370056152,
                "depth": 4.0846686363220215
            },
            "face_information": [
                {
                    "position": {
                        "x": -2.9802322387695312e-08,
                        "y": -0.2555353045463562,
                        "z": -0.7754524350166321
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.024971244856715202,
                        "z": -0.9996882081031799
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 1.1583874225616455,
                        "z": -0.778957724571228
                    },
                    "normal": {
                        "x": 2.810104717809736e-07,
                        "y": -9.323111527237415e-08,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -2.4959444999694824e-07,
                        "y": -1.3619706630706787,
                        "z": 0.1402222216129303
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999999403953552,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.9371509552001953e-07,
                        "y": -1.3619706630706787,
                        "z": -0.13782823085784912
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 2.682209014892578e-07,
                        "y": 2.718825578689575,
                        "z": 0.19548764824867249
                    },
                    "normal": {
                        "x": 3.3061994031413633e-07,
                        "y": 0.9998366236686707,
                        "z": -0.01807473786175251
                    }
                },
                {
                    "position": {
                        "x": 2.5331974029541016e-07,
                        "y": 2.7149531841278076,
                        "z": -0.14560404419898987
                    },
                    "normal": {
                        "x": 4.962207071912417e-07,
                        "y": 1.0,
                        "z": -4.6973542566774995e-07
                    }
                },
                {
                    "position": {
                        "x": 0.0648934617638588,
                        "y": -0.2922135591506958,
                        "z": 1.100310206413269
                    },
                    "normal": {
                        "x": -5.3646864728307264e-09,
                        "y": -0.006991614121943712,
                        "z": 0.9999755620956421
                    }
                },
                {
                    "position": {
                        "x": 0.20854689180850983,
                        "y": -0.4908749759197235,
                        "z": 1.0989211797714233
                    },
                    "normal": {
                        "x": 2.5895283783938794e-07,
                        "y": -0.006991703528910875,
                        "z": 0.9999755024909973
                    }
                },
                {
                    "position": {
                        "x": -0.16899579763412476,
                        "y": -0.612598717212677,
                        "z": 1.0980700254440308
                    },
                    "normal": {
                        "x": -4.364904953035875e-07,
                        "y": -0.006992202252149582,
                        "z": 0.9999755620956421
                    }
                },
                {
                    "position": {
                        "x": -0.16844072937965393,
                        "y": -0.36744293570518494,
                        "z": 1.0997841358184814
                    },
                    "normal": {
                        "x": -7.013109097897541e-07,
                        "y": -0.0069915615022182465,
                        "z": 0.9999755024909973
                    }
                },
                {
                    "position": {
                        "x": 0.0639953538775444,
                        "y": -0.6888839602470398,
                        "z": 1.0975366830825806
                    },
                    "normal": {
                        "x": -2.701852110931213e-07,
                        "y": -0.006992432754486799,
                        "z": 0.9999755024909973
                    }
                }
            ]
        },
        "Components_postTube": {
            "collection": "Components",
            "object_name": "postTube",
            "dimensions": {
                "width": 2.266733169555664,
                "height": 1.5451991558074951,
                "depth": 1.545198917388916
            },
            "face_information": [
                {
                    "position": {
                        "x": -1.0051848888397217,
                        "y": -0.20963940024375916,
                        "z": -0.12103544175624847
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Components_falseBlock": {
            "collection": "Components",
            "object_name": "falseBlock",
            "dimensions": {
                "width": 0.6236121654510498,
                "height": 0.9710882902145386,
                "depth": 1.8434131145477295
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.15738528966903687,
                        "y": -0.8058133125305176,
                        "z": -0.005358844995498657
                    },
                    "normal": {
                        "x": 0.004732734989374876,
                        "y": 0.999988853931427,
                        "z": -4.2531405597401317e-07
                    }
                },
                {
                    "position": {
                        "x": 0.15127310156822205,
                        "y": 1.036870002746582,
                        "z": -0.005359262228012085
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 8.429360605077818e-07
                    }
                },
                {
                    "position": {
                        "x": 0.15127310156822205,
                        "y": -0.08694618940353394,
                        "z": -0.4903377294540405
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.15127313137054443,
                        "y": -0.08694586157798767,
                        "z": 0.48075056076049805
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                }
            ]
        },
        "Components_anglePort": {
            "collection": "Components",
            "object_name": "anglePort",
            "dimensions": {
                "width": 1.643134593963623,
                "height": 2.0770368576049805,
                "depth": 3.800649642944336
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.6695460081100464,
                        "y": 1.5784471035003662,
                        "z": -0.1714857965707779
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 3.611469026054692e-07,
                        "z": -2.308705262521471e-07
                    }
                },
                {
                    "position": {
                        "x": -0.6695461273193359,
                        "y": 1.5784471035003662,
                        "z": 0.3448609709739685
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 3.611469026054692e-07,
                        "z": -2.3087055467385653e-07
                    }
                },
                {
                    "position": {
                        "x": -0.6695464849472046,
                        "y": -0.7728672027587891,
                        "z": 0.34486085176467896
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 1.023771147856678e-07,
                        "z": -1.1543529154778298e-07
                    }
                },
                {
                    "position": {
                        "x": -0.6695464849472046,
                        "y": -0.7728672027587891,
                        "z": -0.17148593068122864
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 2.047542295713356e-07,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.669546365737915,
                        "y": -0.18538057804107666,
                        "z": 0.34486085176467896
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 1.0055331500780085e-07,
                        "z": -1.1543528444235562e-07
                    }
                },
                {
                    "position": {
                        "x": -0.6695463061332703,
                        "y": -0.18538054823875427,
                        "z": -0.17148593068122864
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 1.0055331500780085e-07,
                        "z": -1.1543528444235562e-07
                    }
                },
                {
                    "position": {
                        "x": -0.4581749737262726,
                        "y": 1.5784471035003662,
                        "z": 0.6030343770980835
                    },
                    "normal": {
                        "x": -6.789326858960137e-14,
                        "y": -2.4076450699794805e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.6695463061332703,
                        "y": 0.675828218460083,
                        "z": 0.34486085176467896
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": 7.313616379178711e-08,
                        "z": -1.1543527733692827e-07
                    }
                },
                {
                    "position": {
                        "x": -0.6695462465286255,
                        "y": 0.6758282780647278,
                        "z": -0.17148593068122864
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 1.462723133727195e-07,
                        "z": -2.3087056888471125e-07
                    }
                },
                {
                    "position": {
                        "x": -0.4015599489212036,
                        "y": 0.6758280992507935,
                        "z": 0.603034257888794
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.16937050223350525,
                        "y": 2.4431827068328857,
                        "z": -0.3190971612930298
                    },
                    "normal": {
                        "x": 3.215427852865105e-07,
                        "y": -0.9999785423278809,
                        "z": -0.006554143037647009
                    }
                },
                {
                    "position": {
                        "x": -0.484575480222702,
                        "y": 2.443182945251465,
                        "z": -0.3191419541835785
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999785423278809,
                        "z": -0.006554143037647009
                    }
                },
                {
                    "position": {
                        "x": -0.16937044262886047,
                        "y": 2.4431827068328857,
                        "z": -0.0238741934299469
                    },
                    "normal": {
                        "x": 3.219215898297989e-07,
                        "y": -0.9999785423278809,
                        "z": 0.006554140709340572
                    }
                },
                {
                    "position": {
                        "x": -0.4845755100250244,
                        "y": 2.443182945251465,
                        "z": -0.023829415440559387
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999784827232361,
                        "z": 0.006554141640663147
                    }
                },
                {
                    "position": {
                        "x": -0.6607432961463928,
                        "y": 0.7216006517410278,
                        "z": -0.8900551199913025
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 1.6026345406316977e-07,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.6607431173324585,
                        "y": 1.5414583683013916,
                        "z": -0.8900550007820129
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 2.661272162640671e-07,
                        "z": 0.0
                    }
                }
            ]
        },
        "Components_tooCompBlock": {
            "collection": "Components",
            "object_name": "tooCompBlock",
            "dimensions": {
                "width": 2.000000476837158,
                "height": 1.5835494995117188,
                "depth": 4.48261833190918
            },
            "face_information": [
                {
                    "position": {
                        "x": -4.76837158203125e-07,
                        "y": -7.152557373046875e-07,
                        "z": 0.7389265894889832
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_wrenchPlug": {
            "collection": "Components",
            "object_name": "wrenchPlug",
            "dimensions": {
                "width": 0.9178215861320496,
                "height": 0.4271448850631714,
                "depth": 1.731398344039917
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.07581955194473267,
                        "y": -0.45519575476646423,
                        "z": 0.2135724425315857
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.07581943273544312,
                        "y": -0.45519548654556274,
                        "z": -0.2135724425315857
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.4520389139652252,
                        "y": -0.5836837887763977,
                        "z": 1.862645149230957e-09
                    },
                    "normal": {
                        "x": 0.9993998408317566,
                        "y": 0.03464174643158913,
                        "z": 3.252939677622635e-07
                    }
                }
            ]
        },
        "Components_lifePreserver": {
            "collection": "Components",
            "object_name": "lifePreserver",
            "dimensions": {
                "width": 0.2822662591934204,
                "height": 1.074822187423706,
                "depth": 1.074822187423706
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Components_angleBar": {
            "collection": "Components",
            "object_name": "angleBar",
            "dimensions": {
                "width": 0.33458444476127625,
                "height": 1.540645718574524,
                "depth": 3.035658359527588
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.16623905301094055,
                        "y": -1.4797807931900024,
                        "z": 0.7318498492240906
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.16623905301094055,
                        "y": -1.4797807931900024,
                        "z": 0.6041967272758484
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.09317295998334885,
                        "y": 1.4910775423049927,
                        "z": -0.5993593335151672
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.09317295998334885,
                        "y": 1.4910775423049927,
                        "z": -0.7316181063652039
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Components_ElephantBlock": {
            "collection": "Components",
            "object_name": "ElephantBlock",
            "dimensions": {
                "width": 2.0120842456817627,
                "height": 3.3883848190307617,
                "depth": 5.79559326171875
            },
            "face_information": [
                {
                    "position": {
                        "x": 3.5762786865234375e-07,
                        "y": 3.307098388671875,
                        "z": -1.3103477954864502
                    },
                    "normal": {
                        "x": 1.600080992147923e-07,
                        "y": 1.0,
                        "z": 8.350322673322808e-07
                    }
                },
                {
                    "position": {
                        "x": -1.341104507446289e-07,
                        "y": -0.34103626012802124,
                        "z": 0.6589932441711426
                    },
                    "normal": {
                        "x": -2.887731609391153e-09,
                        "y": -0.005207403097301722,
                        "z": 0.9999864101409912
                    }
                },
                {
                    "position": {
                        "x": -2.682209014892578e-07,
                        "y": -2.488494634628296,
                        "z": 0.058529797941446304
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.7136335372924805e-07,
                        "y": -2.488494634628296,
                        "z": -0.36898836493492126
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.4901161193847656e-08,
                        "y": -0.31926462054252625,
                        "z": -2.7265846729278564
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_TongueBlock": {
            "collection": "Components",
            "object_name": "TongueBlock",
            "dimensions": {
                "width": 2.243433952331543,
                "height": 4.053370475769043,
                "depth": 5.684225082397461
            },
            "face_information": [
                {
                    "position": {
                        "x": 8.903443813323975e-07,
                        "y": 3.1269102096557617,
                        "z": -1.597648024559021
                    },
                    "normal": {
                        "x": 5.844671591148654e-07,
                        "y": 0.999910295009613,
                        "z": -0.01339107658714056
                    }
                },
                {
                    "position": {
                        "x": -4.76837158203125e-07,
                        "y": -2.402632713317871,
                        "z": -0.9758073687553406
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 2.2351741790771484e-08,
                        "y": -0.3702967166900635,
                        "z": -3.5558977127075195
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_eleBridge": {
            "collection": "Components",
            "object_name": "eleBridge",
            "dimensions": {
                "width": 1.5418697595596313,
                "height": 2.5324530601501465,
                "depth": 1.1878232955932617
            },
            "face_information": [
                {
                    "position": {
                        "x": 2.980232238769531e-07,
                        "y": -0.4078165590763092,
                        "z": -0.8797112703323364
                    },
                    "normal": {
                        "x": 1.1601865423926938e-07,
                        "y": -1.0,
                        "z": -3.710509872689727e-07
                    }
                },
                {
                    "position": {
                        "x": -6.705522537231445e-08,
                        "y": -0.05245150625705719,
                        "z": 0.7924017310142517
                    },
                    "normal": {
                        "x": 1.0097366261803582e-14,
                        "y": -1.0,
                        "z": -2.5384434820807655e-07
                    }
                },
                {
                    "position": {
                        "x": 7.450580596923828e-08,
                        "y": -0.0524514839053154,
                        "z": -0.05094083771109581
                    },
                    "normal": {
                        "x": -1.9382846361466234e-14,
                        "y": -1.0,
                        "z": 8.701392317789214e-08
                    }
                },
                {
                    "position": {
                        "x": 2.9802322387695312e-08,
                        "y": -0.05245143920183182,
                        "z": 0.3771849274635315
                    },
                    "normal": {
                        "x": -1.1306656565873707e-14,
                        "y": -0.9999999403953552,
                        "z": 8.701390896703742e-08
                    }
                },
                {
                    "position": {
                        "x": 4.5821070671081543e-07,
                        "y": 0.33451688289642334,
                        "z": -1.4273755550384521
                    },
                    "normal": {
                        "x": -4.0860351191440714e-07,
                        "y": 7.252752814556479e-14,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_DualWindow": {
            "collection": "Components",
            "object_name": "DualWindow",
            "dimensions": {
                "width": 0.14455273747444153,
                "height": 0.4817955493927002,
                "depth": 0.6478849649429321
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.07227639853954315,
                        "y": -1.1548399925231934e-07,
                        "z": -0.11091960966587067
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 5.15423117519731e-08,
                        "z": 5.113112777621609e-08
                    }
                },
                {
                    "position": {
                        "x": 0.07227639853954315,
                        "y": -1.5273690223693848e-07,
                        "z": 0.11091961711645126
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 3.6079620713280747e-07,
                        "z": -5.11310425110878e-08
                    }
                }
            ]
        },
        "Components_windowblocklowpro": {
            "collection": "Components",
            "object_name": "windowblocklowpro",
            "dimensions": {
                "width": 0.21862509846687317,
                "height": 0.20671583712100983,
                "depth": 0.5838308930397034
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.07116587460041046,
                        "y": -2.2351741790771484e-08,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -4.169968192968554e-08,
                        "z": 1.7460067169849935e-07
                    }
                }
            ]
        },
        "Components_InstrumentTube": {
            "collection": "Components",
            "object_name": "InstrumentTube",
            "dimensions": {
                "width": 3.2554516792297363,
                "height": 3.2554519176483154,
                "depth": 6.551003932952881
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 2.1699185371398926,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Components_Bridge.BeerBelly": {
            "collection": "Components",
            "object_name": "Bridge.BeerBelly",
            "dimensions": {
                "width": 1.854931354522705,
                "height": 2.246534585952759,
                "depth": 2.077881336212158
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.30385160446167e-07,
                        "y": 0.28813275694847107,
                        "z": 0.8637879490852356
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -2.7567148208618164e-07,
                        "y": -0.713198721408844,
                        "z": 0.7131810188293457
                    },
                    "normal": {
                        "x": -2.076198100161436e-13,
                        "y": -4.5250789071360487e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.289420485496521,
                        "y": -0.09511025249958038,
                        "z": -1.3548485040664673
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 3.725290298461914e-09,
                        "y": -0.09511028230190277,
                        "z": -1.3548485040664673
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.289420485496521,
                        "y": -0.09511031955480576,
                        "z": -1.3548485040664673
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.27557313442230225,
                        "y": 0.12488527595996857,
                        "z": -1.3548485040664673
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 6.51925802230835e-08,
                        "y": 0.12488523125648499,
                        "z": -1.3548485040664673
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.2755732536315918,
                        "y": 0.1248851865530014,
                        "z": -1.3548485040664673
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.19060753285884857,
                        "y": 0.3448807895183563,
                        "z": -1.3548485040664673
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 9.12696123123169e-08,
                        "y": 0.34488072991371155,
                        "z": -1.3548485040664673
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.1906077265739441,
                        "y": 0.34488070011138916,
                        "z": -1.3548485040664673
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -1.6391277313232422e-07,
                        "y": -1.293749213218689,
                        "z": 0.04282614216208458
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Components_block.bird": {
            "collection": "Components",
            "object_name": "block.bird",
            "dimensions": {
                "width": 2.3935515880584717,
                "height": 1.2332884073257446,
                "depth": 3.593777656555176
            },
            "face_information": [
                {
                    "position": {
                        "x": -3.725290298461914e-07,
                        "y": -1.6920500993728638,
                        "z": 0.41705331206321716
                    },
                    "normal": {
                        "x": -8.212338116209139e-07,
                        "y": -1.0,
                        "z": -8.205723247556307e-07
                    }
                },
                {
                    "position": {
                        "x": 3.390014171600342e-07,
                        "y": 0.10095241665840149,
                        "z": -0.3889971673488617
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 4.637986421585083e-07,
                        "y": 1.9017270803451538,
                        "z": 0.3803015351295471
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Components_block.doorStop": {
            "collection": "Components",
            "object_name": "block.doorStop",
            "dimensions": {
                "width": 2.835293769836426,
                "height": 0.8285006880760193,
                "depth": 5.2592267990112305
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.4176455736160278,
                        "y": -1.9760665893554688,
                        "z": -0.12158689647912979
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -9.006546406453708e-07,
                        "z": 3.2102554996527033e-06
                    }
                },
                {
                    "position": {
                        "x": -1.4176467657089233,
                        "y": -1.9760661125183105,
                        "z": -0.1215868890285492
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 9.006500363284431e-07,
                        "z": -1.0700863413148909e-06
                    }
                },
                {
                    "position": {
                        "x": -1.1541414260864258,
                        "y": -1.9760675430297852,
                        "z": -0.32173264026641846
                    },
                    "normal": {
                        "x": -0.006044783629477024,
                        "y": 3.8114271774247754e-06,
                        "z": -0.999981701374054
                    }
                },
                {
                    "position": {
                        "x": -1.1541417837142944,
                        "y": -1.9760645627975464,
                        "z": 0.07855886220932007
                    },
                    "normal": {
                        "x": -0.006044791080057621,
                        "y": -3.814781848632265e-06,
                        "z": 0.9999817609786987
                    }
                },
                {
                    "position": {
                        "x": 1.1541402339935303,
                        "y": -1.9760655164718628,
                        "z": 0.07855886965990067
                    },
                    "normal": {
                        "x": 0.006044794339686632,
                        "y": -3.847001607937273e-06,
                        "z": 0.999981701374054
                    }
                },
                {
                    "position": {
                        "x": 1.154140830039978,
                        "y": -1.9760675430297852,
                        "z": -0.32173264026641846
                    },
                    "normal": {
                        "x": 0.006044733338057995,
                        "y": 3.7863983379793353e-06,
                        "z": -0.999981701374054
                    }
                },
                {
                    "position": {
                        "x": -2.682209014892578e-07,
                        "y": -0.08422759175300598,
                        "z": 0.04929380491375923
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.341104507446289e-07,
                        "y": -0.08285444974899292,
                        "z": -0.29183515906333923
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -8.791685104370117e-07,
                        "y": -3.920377254486084,
                        "z": -0.1215914785861969
                    },
                    "normal": {
                        "x": -5.313495989867079e-07,
                        "y": -1.0,
                        "z": -9.650112588133197e-06
                    }
                },
                {
                    "position": {
                        "x": 1.2293457984924316e-07,
                        "y": 1.3388482332229614,
                        "z": -0.12158554047346115
                    },
                    "normal": {
                        "x": 1.362442503705097e-06,
                        "y": 1.0,
                        "z": 1.872650500445161e-06
                    }
                },
                {
                    "position": {
                        "x": -6.891787052154541e-07,
                        "y": -2.1206698417663574,
                        "z": -0.5358384847640991
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -7.059425115585327e-07,
                        "y": -2.1206765174865723,
                        "z": 0.29266220331192017
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_block.finger": {
            "collection": "Components",
            "object_name": "block.finger",
            "dimensions": {
                "width": 2.0257225036621094,
                "height": 2.1036136150360107,
                "depth": 3.2962753772735596
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.24730677902698517,
                        "y": -1.1349949836730957,
                        "z": -0.13924731314182281
                    },
                    "normal": {
                        "x": -2.4101501594486763e-07,
                        "y": -1.0,
                        "z": -1.803757214702273e-07
                    }
                },
                {
                    "position": {
                        "x": -0.13457095623016357,
                        "y": 0.780811071395874,
                        "z": -0.9726390838623047
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.13457095623016357,
                        "y": 0.2921369969844818,
                        "z": -0.9726390838623047
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.1345708668231964,
                        "y": -0.19653695821762085,
                        "z": -0.9726390838623047
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.1422377973794937,
                        "y": 2.1612801551818848,
                        "z": -0.4643571972846985
                    },
                    "normal": {
                        "x": 8.380985150324705e-07,
                        "y": 1.0,
                        "z": 4.2770841446326813e-07
                    }
                },
                {
                    "position": {
                        "x": 0.24730677902698517,
                        "y": -1.1349949836730957,
                        "z": -0.13924729824066162
                    },
                    "normal": {
                        "x": 2.4101501594486763e-07,
                        "y": -1.0,
                        "z": -1.803757214702273e-07
                    }
                },
                {
                    "position": {
                        "x": 0.13457095623016357,
                        "y": 0.780811071395874,
                        "z": -0.9726390838623047
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.13457095623016357,
                        "y": 0.2921369969844818,
                        "z": -0.9726390838623047
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.1345708668231964,
                        "y": -0.19653694331645966,
                        "z": -0.9726390838623047
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.1422377973794937,
                        "y": 2.1612801551818848,
                        "z": -0.4643572270870209
                    },
                    "normal": {
                        "x": -8.380985150324705e-07,
                        "y": 1.0,
                        "z": 4.2770841446326813e-07
                    }
                }
            ]
        },
        "Components_bridge.compact": {
            "collection": "Components",
            "object_name": "bridge.compact",
            "dimensions": {
                "width": 0.8246739506721497,
                "height": 0.9397433996200562,
                "depth": 1.5814732313156128
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.06305348873138428,
                        "y": -0.19138383865356445,
                        "z": -0.331960529088974
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.06305348873138428,
                        "y": -0.19138382375240326,
                        "z": -0.331960529088974
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.17767897248268127,
                        "y": 0.05892448499798775,
                        "z": -0.3844688832759857
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.17767897248268127,
                        "y": 0.05892447754740715,
                        "z": -0.3844688832759857
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.02225291170179844,
                        "y": -0.7467636466026306,
                        "z": -0.2563282549381256
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.02225291170179844,
                        "y": -0.7467636466026306,
                        "z": -0.2563282549381256
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.20215022563934326,
                        "y": -0.5153413414955139,
                        "z": -0.331960529088974
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.20215022563934326,
                        "y": -0.5153413414955139,
                        "z": -0.331960529088974
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_doubleBlock": {
            "collection": "Components",
            "object_name": "doubleBlock",
            "dimensions": {
                "width": 3.2578125,
                "height": 3.529193878173828,
                "depth": 5.0434441566467285
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 1.9922317266464233,
                        "z": 1.4727082252502441
                    },
                    "normal": {
                        "x": 6.797087053200812e-07,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.2814998626708984e-06,
                        "y": -3.0512120723724365,
                        "z": 1.4727081060409546
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999999403953552,
                        "z": -0.0
                    }
                }
            ]
        },
        "Components_Clipbridge": {
            "collection": "Components",
            "object_name": "Clipbridge",
            "dimensions": {
                "width": 1.7261545658111572,
                "height": 1.9191646575927734,
                "depth": 2.290358066558838
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.1920928955078125e-07,
                        "y": -0.605674147605896,
                        "z": -1.0604591369628906
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 1.2665987014770508e-07,
                        "y": -0.42300084233283997,
                        "z": -1.0604591369628906
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_CrabClaw": {
            "collection": "Components",
            "object_name": "CrabClaw",
            "dimensions": {
                "width": 2.2034859657287598,
                "height": 4.606679916381836,
                "depth": 6.513511657714844
            },
            "face_information": [
                {
                    "position": {
                        "x": -8.940696716308594e-08,
                        "y": -1.489194631576538,
                        "z": 0.5423197150230408
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 4.917383193969727e-07,
                        "y": 1.8582029342651367,
                        "z": -2.003948211669922
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 8.195638656616211e-07,
                        "y": 2.8773913383483887,
                        "z": -2.003948211669922
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 4.917383193969727e-07,
                        "y": 3.9005284309387207,
                        "z": 1.9500291347503662
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 4.917383193969727e-07,
                        "y": 1.9176044464111328,
                        "z": 1.950028896331787
                    },
                    "normal": {
                        "x": -3.94840925363113e-13,
                        "y": -5.74518708162941e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.4901161193847656e-07,
                        "y": -1.3704746961593628,
                        "z": -2.1670970916748047
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.2665987014770508e-07,
                        "y": -1.3704746961593628,
                        "z": -1.8877241611480713
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 4.917383193969727e-07,
                        "y": 5.024316787719727,
                        "z": 1.357811450958252
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Components_Gblock": {
            "collection": "Components",
            "object_name": "Gblock",
            "dimensions": {
                "width": 1.654303789138794,
                "height": 1.769739031791687,
                "depth": 7.545317649841309
            },
            "face_information": [
                {
                    "position": {
                        "x": -9.685754776000977e-08,
                        "y": 0.4920387268066406,
                        "z": 0.8564288020133972
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 1.4156103134155273e-06,
                        "y": -3.486660957336426,
                        "z": -0.3501491844654083
                    },
                    "normal": {
                        "x": -4.765659866734495e-07,
                        "y": 1.0,
                        "z": -4.765659866734495e-07
                    }
                },
                {
                    "position": {
                        "x": 4.6193599700927734e-07,
                        "y": -1.569223403930664,
                        "z": -0.9133102297782898
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 0.9999999403953552
                    }
                }
            ]
        },
        "Components_Ram": {
            "collection": "Components",
            "object_name": "Ram",
            "dimensions": {
                "width": 3.133126974105835,
                "height": 2.8021697998046875,
                "depth": 4.930736541748047
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.8156713247299194,
                        "y": 0.44623756408691406,
                        "z": -0.8622081875801086
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.8156713247299194,
                        "y": 0.44623756408691406,
                        "z": -0.8622081875801086
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                }
            ]
        },
        "Components_WindowBlockhalf.001": {
            "collection": "Components",
            "object_name": "WindowBlockhalf.001",
            "dimensions": {
                "width": 0.7571772933006287,
                "height": 0.39091548323631287,
                "depth": 1.9951170682907104
            },
            "face_information": [
                {
                    "position": {
                        "x": -2.9802322387695312e-08,
                        "y": 0.0,
                        "z": -0.0068912506103515625
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": -2.980230284777008e-08
                    }
                }
            ]
        },
        "Components_WindowBlock2": {
            "collection": "Components",
            "object_name": "WindowBlock2",
            "dimensions": {
                "width": 2.0000009536743164,
                "height": 0.48837900161743164,
                "depth": 2.6349434852600098
            },
            "face_information": [
                {
                    "position": {
                        "x": 5.960464477539063e-08,
                        "y": 1.1920928955078125e-07,
                        "z": -0.10532939434051514
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -1.862645149230957e-07,
                        "y": -1.6391277313232422e-07,
                        "z": 0.08712685108184814
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_BeardBlock": {
            "collection": "Components",
            "object_name": "BeardBlock",
            "dimensions": {
                "width": 2.9073169231414795,
                "height": 4.9798502922058105,
                "depth": 8.326736450195312
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.7137525081634521,
                        "y": 0.3609900176525116,
                        "z": -1.872249960899353
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -4.842877388000488e-07,
                        "y": 0.43903255462646484,
                        "z": -1.872249960899353
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.7137534618377686,
                        "y": 0.360990434885025,
                        "z": -1.872249960899353
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.7137535810470581,
                        "y": -1.9334440231323242,
                        "z": 3.107600450515747
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -6.705522537231445e-07,
                        "y": -2.0110344886779785,
                        "z": 3.107600450515747
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.7137523889541626,
                        "y": -1.9334441423416138,
                        "z": 3.107600450515747
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.7137532830238342,
                        "y": 1.3047049045562744,
                        "z": 3.107600450515747
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.9371509552001953e-07,
                        "y": 1.4603376388549805,
                        "z": 3.107600450515747
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.7137529253959656,
                        "y": 1.3047049045562744,
                        "z": 3.107600450515747
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -5.140900611877441e-07,
                        "y": -4.291353702545166,
                        "z": 1.2169297933578491
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Components_Pointer": {
            "collection": "Components",
            "object_name": "Pointer",
            "dimensions": {
                "width": 1.2361599206924438,
                "height": 2.494506359100342,
                "depth": 7.20218563079834
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.6180797815322876,
                        "y": 2.980232238769531e-07,
                        "z": 0.7751007676124573
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 1.1432587143644923e-07,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.618079662322998,
                        "y": -7.748603820800781e-07,
                        "z": 0.7751007676124573
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -2.7438204597274307e-07,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -4.470348358154297e-08,
                        "y": -2.086162567138672e-07,
                        "z": 1.2185475826263428
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_RailRunner": {
            "collection": "Components",
            "object_name": "RailRunner",
            "dimensions": {
                "width": 1.8072433471679688,
                "height": 1.6553306579589844,
                "depth": 6.633926868438721
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.49229881167411804,
                        "y": -0.9967271089553833,
                        "z": 0.04794982075691223
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -1.187005864267121e-06,
                        "z": 2.8524172535071557e-07
                    }
                },
                {
                    "position": {
                        "x": 0.11118228733539581,
                        "y": -3.13016939163208,
                        "z": 0.04794982075691223
                    },
                    "normal": {
                        "x": -6.255819471334689e-07,
                        "y": -1.0,
                        "z": -3.265882030957512e-13
                    }
                },
                {
                    "position": {
                        "x": 0.2600341737270355,
                        "y": -1.0060780048370361,
                        "z": 0.875615119934082
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_Beard": {
            "collection": "Components",
            "object_name": "Beard",
            "dimensions": {
                "width": 1.7625367641448975,
                "height": 2.4289774894714355,
                "depth": 9.595779418945312
            },
            "face_information": [
                {
                    "position": {
                        "x": -7.450580596923828e-08,
                        "y": -1.1920928955078125e-07,
                        "z": 0.6961690187454224
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -7.152557373046875e-07,
                        "y": -2.3604941368103027,
                        "z": 0.696168839931488
                    },
                    "normal": {
                        "x": -8.964895069785844e-14,
                        "y": -1.253458492556092e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.3709068298339844e-06,
                        "y": -5.322963714599609,
                        "z": 0.43721598386764526
                    },
                    "normal": {
                        "x": 2.3866043689924066e-13,
                        "y": 2.8602133284039155e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.296401023864746e-06,
                        "y": -5.843944549560547,
                        "z": -0.2589528560638428
                    },
                    "normal": {
                        "x": -4.172073886365979e-07,
                        "y": -1.0,
                        "z": 3.424721626288374e-07
                    }
                },
                {
                    "position": {
                        "x": 7.152557373046875e-07,
                        "y": 3.751833915710449,
                        "z": -0.3472529649734497
                    },
                    "normal": {
                        "x": 3.9054054923326476e-07,
                        "y": 0.9999999403953552,
                        "z": 3.312558476409322e-07
                    }
                },
                {
                    "position": {
                        "x": 4.6193599700927734e-07,
                        "y": 2.050649404525757,
                        "z": 0.546013355255127
                    },
                    "normal": {
                        "x": -7.994978648302037e-14,
                        "y": -3.307271470021078e-07,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_Crabface": {
            "collection": "Components",
            "object_name": "Crabface",
            "dimensions": {
                "width": 3.150132656097412,
                "height": 1.2993239164352417,
                "depth": 3.7190709114074707
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.029168963432312,
                        "y": -0.5553285479545593,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -5.028580289945239e-07,
                        "z": -1.3013463191161728e-13
                    }
                },
                {
                    "position": {
                        "x": 1.0291688442230225,
                        "y": -1.6694343090057373,
                        "z": -1.4528632164001465e-07
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -1.0194153787779214e-07,
                        "z": 4.892456786365074e-07
                    }
                },
                {
                    "position": {
                        "x": 0.9107799530029297,
                        "y": -2.5464768409729004,
                        "z": -2.905726432800293e-07
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999999403953552,
                        "z": -8.02716556336236e-07
                    }
                },
                {
                    "position": {
                        "x": 0.33175018429756165,
                        "y": -2.5464766025543213,
                        "z": -2.905726432800293e-07
                    },
                    "normal": {
                        "x": -2.5879000986606115e-07,
                        "y": -1.0,
                        "z": -1.5580126164899122e-13
                    }
                }
            ]
        },
        "Components_DogEar": {
            "collection": "Components",
            "object_name": "DogEar",
            "dimensions": {
                "width": 2.2502689361572266,
                "height": 2.973649501800537,
                "depth": 8.889202117919922
            },
            "face_information": [
                {
                    "position": {
                        "x": 4.470348358154297e-08,
                        "y": 1.043081283569336e-07,
                        "z": -1.0
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -2.682209014892578e-07,
                        "y": -1.525190830230713,
                        "z": -1.0
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -7.748603820800781e-07,
                        "y": -2.859541893005371,
                        "z": -1.0
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -1.3709068298339844e-06,
                        "y": -4.301303863525391,
                        "z": -1.0
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 5.960464477539063e-08,
                        "y": 1.4840247631072998,
                        "z": -1.0
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 6.705522537231445e-08,
                        "y": 3.2922749519348145,
                        "z": 0.46766918897628784
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 1.1381669082766166e-06
                    }
                },
                {
                    "position": {
                        "x": -1.996755599975586e-06,
                        "y": -5.596926689147949,
                        "z": -0.8208041191101074
                    },
                    "normal": {
                        "x": -2.3279417860067042e-07,
                        "y": -1.0,
                        "z": -3.097306482471862e-13
                    }
                }
            ]
        },
        "Components_InstrumentMast-2": {
            "collection": "Components",
            "object_name": "InstrumentMast-2",
            "dimensions": {
                "width": 2.734619617462158,
                "height": 2.1873013973236084,
                "depth": 16.469161987304688
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.2154123783111572,
                        "y": -1.9730525016784668,
                        "z": -5.960464477539063e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -7.004302915447624e-07,
                        "z": 9.634089792598388e-08
                    }
                },
                {
                    "position": {
                        "x": -0.7381336688995361,
                        "y": -3.6309688091278076,
                        "z": 6.109476089477539e-07
                    },
                    "normal": {
                        "x": 3.13351250724736e-07,
                        "y": -1.0,
                        "z": 3.3326705306535587e-07
                    }
                }
            ]
        },
        "Components_WindowBlock": {
            "collection": "Components",
            "object_name": "WindowBlock",
            "dimensions": {
                "width": 0.6486351490020752,
                "height": 0.9300442934036255,
                "depth": 1.492142915725708
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.34304091334342957,
                        "y": -2.4586915969848633e-07,
                        "z": 0.0428791269659996
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -8.987777277980058e-08,
                        "z": 5.100069344621261e-08
                    }
                }
            ]
        },
        "Components_FinRunner": {
            "collection": "Components",
            "object_name": "FinRunner",
            "dimensions": {
                "width": 0.7862261533737183,
                "height": 1.6112067699432373,
                "depth": 7.205816268920898
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.23821714520454407,
                        "y": 5.066394805908203e-07,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 4.993070490399987e-08,
                        "z": -1.4074392140628333e-07
                    }
                },
                {
                    "position": {
                        "x": 3.5278499126434326e-06,
                        "y": 4.525562763214111,
                        "z": 1.914799213409424e-06
                    },
                    "normal": {
                        "x": 2.147921577488887e-06,
                        "y": 1.0,
                        "z": 7.159737265283184e-07
                    }
                },
                {
                    "position": {
                        "x": -2.3543834686279297e-06,
                        "y": -2.680251359939575,
                        "z": -4.76837158203125e-07
                    },
                    "normal": {
                        "x": -1.7514801129436819e-06,
                        "y": -1.0,
                        "z": -7.506347401431412e-07
                    }
                }
            ]
        },
        "Components_InstrumentMast": {
            "collection": "Components",
            "object_name": "InstrumentMast",
            "dimensions": {
                "width": 2.6484107971191406,
                "height": 2.3648762702941895,
                "depth": 19.90271759033203
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.7485312223434448,
                        "y": -2.747570037841797,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -6.47715054924447e-08,
                        "z": 5.9286687559279017e-08
                    }
                },
                {
                    "position": {
                        "x": -8.493661880493164e-07,
                        "y": -7.700980186462402,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -4.777728577209928e-07,
                        "y": -1.0,
                        "z": -2.3714709129762923e-07
                    }
                }
            ]
        },
        "Components_StubWing": {
            "collection": "Components",
            "object_name": "StubWing",
            "dimensions": {
                "width": 4.36411190032959,
                "height": 1.543013334274292,
                "depth": 4.7399420738220215
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.5142168998718262,
                        "z": -5.960464477539063e-08
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Components_Fore-Bridge": {
            "collection": "Components",
            "object_name": "Fore-Bridge",
            "dimensions": {
                "width": 1.8967787027359009,
                "height": 2.4134621620178223,
                "depth": 3.907454013824463
            },
            "face_information": [
                {
                    "position": {
                        "x": -1.4901161193847656e-08,
                        "y": 0.3262491226196289,
                        "z": -0.5076276659965515
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_Outrigger": {
            "collection": "Components",
            "object_name": "Outrigger",
            "dimensions": {
                "width": 4.244276523590088,
                "height": 2.0694289207458496,
                "depth": 6.688608169555664
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.5000000596046448,
                        "y": 0.3112582862377167,
                        "z": -0.5424422025680542
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_VentBlock": {
            "collection": "Components",
            "object_name": "VentBlock",
            "dimensions": {
                "width": 1.5458855628967285,
                "height": 1.4133812189102173,
                "depth": 5.641093730926514
            },
            "face_information": [
                {
                    "position": {
                        "x": -2.384185791015625e-07,
                        "y": -2.3286995887756348,
                        "z": -0.49659445881843567
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 3.2782554626464844e-07,
                        "z": -0.2601490616798401
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.5133993625640869,
                        "y": 3.011147975921631,
                        "z": -0.5074102282524109
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_PE-Wing": {
            "collection": "Components",
            "object_name": "PE-Wing",
            "dimensions": {
                "width": 8.902162551879883,
                "height": 1.6109259128570557,
                "depth": 4.297305107116699
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.35791245102882385
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_leafPanel": {
            "collection": "Components",
            "object_name": "leafPanel",
            "dimensions": {
                "width": 2.1341137886047363,
                "height": 6.808373928070068,
                "depth": 9.01439094543457
            },
            "face_information": [
                {
                    "position": {
                        "x": -1.1920928955078125e-07,
                        "y": 3.129243850708008e-07,
                        "z": -0.18889620900154114
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_SideBridge.001": {
            "collection": "Components",
            "object_name": "SideBridge.001",
            "dimensions": {
                "width": 1.366004228591919,
                "height": 1.7994658946990967,
                "depth": 1.1296107769012451
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.828035831451416,
                        "y": 0.12559211254119873,
                        "z": -0.19327858090400696
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Components_Hangar": {
            "collection": "Components",
            "object_name": "Hangar",
            "dimensions": {
                "width": 2.0000007152557373,
                "height": 1.5081244707107544,
                "depth": 2.1465516090393066
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.4901161193847656e-08,
                        "z": -0.20583844184875488
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 1.4901161193847656e-08,
                        "y": -4.470348358154297e-07,
                        "z": 1.3022860288619995
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 1.0732752084732056,
                        "z": 0.46556127071380615
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 2.4126202902152727e-07
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.0732758045196533,
                        "z": 0.46556127071380615
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999999403953552,
                        "z": -4.825240580430545e-07
                    }
                }
            ]
        },
        "Components_vertmisstube": {
            "collection": "Components",
            "object_name": "vertmisstube",
            "dimensions": {
                "width": 1.6962707042694092,
                "height": 1.5848288536071777,
                "depth": 0.9644542932510376
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0107020139694214
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_FinWing": {
            "collection": "Components",
            "object_name": "FinWing",
            "dimensions": {
                "width": 8.898377418518066,
                "height": 4.542902946472168,
                "depth": 4.630553245544434
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.3169480264186859
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_Build-upBlock": {
            "collection": "Components",
            "object_name": "Build-upBlock",
            "dimensions": {
                "width": 2.320042133331299,
                "height": 2.221571445465088,
                "depth": 7.346309661865234
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.1341528594493866,
                        "y": 3.7997961044311523e-07,
                        "z": -0.9275428056716919
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.1341528594493866,
                        "y": 3.7997961044311523e-07,
                        "z": -0.9275428056716919
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.13415291905403137,
                        "y": -2.5142791271209717,
                        "z": -0.9275428056716919
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.13415291905403137,
                        "y": -2.5142791271209717,
                        "z": -0.9275428056716919
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.13415279984474182,
                        "y": 2.514279842376709,
                        "z": -0.9275428056716919
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.13415279984474182,
                        "y": 2.514279842376709,
                        "z": -0.9275428056716919
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.13415293395519257,
                        "y": -3.2523951530456543,
                        "z": -0.5970145463943481
                    },
                    "normal": {
                        "x": -3.554429667929071e-06,
                        "y": -1.0,
                        "z": -3.606631366892543e-07
                    }
                },
                {
                    "position": {
                        "x": 0.13415293395519257,
                        "y": -3.2523951530456543,
                        "z": -0.5970145463943481
                    },
                    "normal": {
                        "x": 3.554429667929071e-06,
                        "y": -1.0,
                        "z": -3.606631366892543e-07
                    }
                },
                {
                    "position": {
                        "x": -0.1341528296470642,
                        "y": 3.2523956298828125,
                        "z": -0.5970146059989929
                    },
                    "normal": {
                        "x": 5.331648480932927e-06,
                        "y": 0.9999999403953552,
                        "z": 1.0819892395375064e-06
                    }
                },
                {
                    "position": {
                        "x": 0.1341528296470642,
                        "y": 3.2523956298828125,
                        "z": -0.5970146059989929
                    },
                    "normal": {
                        "x": -5.331648480932927e-06,
                        "y": 0.9999999403953552,
                        "z": 1.0819892395375064e-06
                    }
                }
            ]
        },
        "Components_Horns": {
            "collection": "Components",
            "object_name": "Horns",
            "dimensions": {
                "width": 3.612335443496704,
                "height": 1.5297014713287354,
                "depth": 6.565664768218994
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.32402122020721436,
                        "y": 0.6641570925712585,
                        "z": -0.590827465057373
                    },
                    "normal": {
                        "x": 3.9967516600979136e-13,
                        "y": 6.789699682485661e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -1.313631296157837,
                        "y": 2.881895065307617,
                        "z": -0.21487434208393097
                    },
                    "normal": {
                        "x": -0.00020198122365400195,
                        "y": 0.9999931454658508,
                        "z": 0.0036859847605228424
                    }
                },
                {
                    "position": {
                        "x": -0.29638612270355225,
                        "y": 1.4899978637695312,
                        "z": -0.22157426178455353
                    },
                    "normal": {
                        "x": 7.038664193714794e-07,
                        "y": 1.0,
                        "z": 8.073093908933515e-07
                    }
                },
                {
                    "position": {
                        "x": -0.3032568395137787,
                        "y": -1.9912538528442383,
                        "z": -0.822171688079834
                    },
                    "normal": {
                        "x": -2.082336525432993e-09,
                        "y": -0.025248480960726738,
                        "z": -0.9996811747550964
                    }
                },
                {
                    "position": {
                        "x": -0.23937636613845825,
                        "y": -1.3443912267684937,
                        "z": 0.615058422088623
                    },
                    "normal": {
                        "x": -3.514275803695455e-08,
                        "y": -0.04613041505217552,
                        "z": 0.9989354014396667
                    }
                },
                {
                    "position": {
                        "x": -0.23937636613845825,
                        "y": -2.0191845893859863,
                        "z": 0.5838966369628906
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.04613057151436806,
                        "z": 0.9989354014396667
                    }
                },
                {
                    "position": {
                        "x": 0.32402122020721436,
                        "y": 0.6641571521759033,
                        "z": -0.590827465057373
                    },
                    "normal": {
                        "x": -3.9967516600979136e-13,
                        "y": 6.789699682485661e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 1.313631296157837,
                        "y": 2.881894826889038,
                        "z": -0.21487435698509216
                    },
                    "normal": {
                        "x": 0.00020198122365400195,
                        "y": 0.9999931454658508,
                        "z": 0.0036859847605228424
                    }
                },
                {
                    "position": {
                        "x": 0.29638612270355225,
                        "y": 1.4899978637695312,
                        "z": -0.22157426178455353
                    },
                    "normal": {
                        "x": -7.038664193714794e-07,
                        "y": 1.0,
                        "z": 8.073093908933515e-07
                    }
                },
                {
                    "position": {
                        "x": 0.3032568395137787,
                        "y": -1.9912537336349487,
                        "z": -0.822171688079834
                    },
                    "normal": {
                        "x": 2.082336525432993e-09,
                        "y": -0.025248480960726738,
                        "z": -0.9996811747550964
                    }
                },
                {
                    "position": {
                        "x": 0.23937636613845825,
                        "y": -1.344391107559204,
                        "z": 0.615058422088623
                    },
                    "normal": {
                        "x": 3.514275803695455e-08,
                        "y": -0.04613041505217552,
                        "z": 0.9989354014396667
                    }
                },
                {
                    "position": {
                        "x": 0.23937636613845825,
                        "y": -2.0191845893859863,
                        "z": 0.5838965773582458
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.04613057151436806,
                        "z": 0.9989354014396667
                    }
                }
            ]
        },
        "Components_Bridge-1": {
            "collection": "Components",
            "object_name": "Bridge-1",
            "dimensions": {
                "width": 1.370189905166626,
                "height": 2.796600103378296,
                "depth": 1.6377232074737549
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.1479036808013916,
                        "y": -0.14790362119674683,
                        "z": -0.8969516158103943
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.147903710603714,
                        "y": 0.14790375530719757,
                        "z": -0.8969516158103943
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.14790372550487518,
                        "y": -0.14790359139442444,
                        "z": -0.8969516158103943
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.1479036808013916,
                        "y": 0.14790378510951996,
                        "z": -0.8969516158103943
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.14790363609790802,
                        "y": 0.5330303311347961,
                        "z": -0.8969516158103943
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.14790375530719757,
                        "y": 0.5330303311347961,
                        "z": -0.8969516158103943
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.1479036659002304,
                        "y": -0.5330302119255066,
                        "z": -0.8969516158103943
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.14790377020835876,
                        "y": -0.5330301523208618,
                        "z": -0.8969516158103943
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.14790377020835876,
                        "y": 0.8188616037368774,
                        "z": -0.8969516158103943
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.14790362119674683,
                        "y": 0.8188616633415222,
                        "z": -0.8969516158103943
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_FinHangar": {
            "collection": "Components",
            "object_name": "FinHangar",
            "dimensions": {
                "width": 2.4916458129882812,
                "height": 6.254108428955078,
                "depth": 7.111417770385742
            },
            "face_information": [
                {
                    "position": {
                        "x": 2.0116567611694336e-07,
                        "y": 0.1263158917427063,
                        "z": -4.5601396560668945
                    },
                    "normal": {
                        "x": -8.388301608874826e-09,
                        "y": -0.018226511776447296,
                        "z": -0.9998338222503662
                    }
                },
                {
                    "position": {
                        "x": 2.7194619178771973e-07,
                        "y": 0.06432417035102844,
                        "z": 1.654965877532959
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 2.086162567138672e-07,
                        "y": 2.750553607940674,
                        "z": -0.7058883905410767
                    },
                    "normal": {
                        "x": 7.654500677745091e-07,
                        "y": 1.0,
                        "z": 3.1424085022990766e-07
                    }
                }
            ]
        },
        "Components_Misc-1": {
            "collection": "Components",
            "object_name": "Misc-1",
            "dimensions": {
                "width": 1.191342830657959,
                "height": 0.8398028612136841,
                "depth": 2.655031204223633
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.0428997240960598
                    },
                    "normal": {
                        "x": -1.9021670993879525e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_Telescope": {
            "collection": "Components",
            "object_name": "Telescope",
            "dimensions": {
                "width": 1.9539659023284912,
                "height": 2.4491162300109863,
                "depth": 8.622116088867188
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.022113367915153503,
                        "y": 0.2013798952102661,
                        "z": -1.0376018285751343
                    },
                    "normal": {
                        "x": -2.3029471662994183e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_Beehive": {
            "collection": "Components",
            "object_name": "Beehive",
            "dimensions": {
                "width": 0.8638791441917419,
                "height": 1.0887041091918945,
                "depth": 1.3085523843765259
            },
            "face_information": [
                {
                    "position": {
                        "x": 2.2351741790771484e-08,
                        "y": 5.21540641784668e-08,
                        "z": -0.43193936347961426
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.43193936347961426,
                        "y": -1.2665987014770508e-07,
                        "z": -0.2244788557291031
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -2.9323530270630727e-07,
                        "z": 1.077395594961672e-07
                    }
                },
                {
                    "position": {
                        "x": -0.43193939328193665,
                        "y": 9.685754776000977e-08,
                        "z": -0.2244788557291031
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 2.242387608930585e-07,
                        "z": -2.5139271997431933e-07
                    }
                },
                {
                    "position": {
                        "x": -4.0978193283081055e-08,
                        "y": -9.12696123123169e-08,
                        "z": 0.656764805316925
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_Wing-2": {
            "collection": "Components",
            "object_name": "Wing-2",
            "dimensions": {
                "width": 2.1475250720977783,
                "height": 0.7592376470565796,
                "depth": 4.649598598480225
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.645329475402832,
                        "z": 0.1522110104560852
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -2.6802608966827393,
                        "z": 0.02682650089263916
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Components_HorseThing": {
            "collection": "Components",
            "object_name": "HorseThing",
            "dimensions": {
                "width": 0.9974220991134644,
                "height": 1.258237600326538,
                "depth": 2.1231043338775635
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.7508864402770996e-07,
                        "y": 0.5556819438934326,
                        "z": 0.5710322856903076
                    },
                    "normal": {
                        "x": 2.2836882607180087e-08,
                        "y": 0.08921849727630615,
                        "z": 0.9960120320320129
                    }
                },
                {
                    "position": {
                        "x": -3.5762786865234375e-07,
                        "y": -0.9186144471168518,
                        "z": 0.22690898180007935
                    },
                    "normal": {
                        "x": -3.4209324439871125e-07,
                        "y": -1.0,
                        "z": -2.7200519525649725e-07
                    }
                },
                {
                    "position": {
                        "x": 1.2665987014770508e-07,
                        "y": 0.5601724982261658,
                        "z": -0.5806916952133179
                    },
                    "normal": {
                        "x": 8.281651867102571e-14,
                        "y": 2.63154447566194e-07,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 3.725290298461914e-09,
                        "y": -0.02824712172150612,
                        "z": -0.5806918144226074
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_Bridge-1.001": {
            "collection": "Components",
            "object_name": "Bridge-1.001",
            "dimensions": {
                "width": 1.584038257598877,
                "height": 2.531283140182495,
                "depth": 5.466967582702637
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.16432686150074005,
                        "y": 2.006648540496826,
                        "z": -0.5814977288246155
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.16432686150074005,
                        "y": 2.006648540496826,
                        "z": -0.5814977288246155
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.16432693600654602,
                        "y": -0.47830483317375183,
                        "z": -0.5814977288246155
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.16432693600654602,
                        "y": -0.47830483317375183,
                        "z": -0.5814977288246155
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.16432689130306244,
                        "y": 1.0667500495910645,
                        "z": -0.5814977288246155
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.16432689130306244,
                        "y": 1.0667500495910645,
                        "z": -0.5814977288246155
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.16432686150074005,
                        "y": 2.2953579425811768,
                        "z": -0.5814977288246155
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.16432686150074005,
                        "y": 2.2953579425811768,
                        "z": -0.5814977288246155
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_topWing ": {
            "collection": "Components",
            "object_name": "topWing ",
            "dimensions": {
                "width": 8.406118392944336,
                "height": 1.5597162246704102,
                "depth": 4.477975845336914
            },
            "face_information": [
                {
                    "position": {
                        "x": -3.3989243507385254,
                        "y": 0.16720670461654663,
                        "z": 1.5541843175888062
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.6542225012017298e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 3.3989243507385254,
                        "y": 0.16720670461654663,
                        "z": 1.5541844367980957
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.6542225012017298e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.3683657646179199,
                        "z": -0.005531654693186283
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                }
            ]
        },
        "Components_CurveWing": {
            "collection": "Components",
            "object_name": "CurveWing",
            "dimensions": {
                "width": 5.187256336212158,
                "height": 2.916367769241333,
                "depth": 2.0000014305114746
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.7881393432617188e-07,
                        "z": -1.2538304328918457
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -2.9802322387695312e-08,
                        "z": 1.31256103515625
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 4.951470851898193,
                        "y": -7.152557373046875e-07,
                        "z": -1.2044811248779297
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.7881393432617188e-07,
                        "z": -1.0280795097351074
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": 0.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Components_fintube": {
            "collection": "Components",
            "object_name": "fintube",
            "dimensions": {
                "width": 3.589207887649536,
                "height": 1.061118483543396,
                "depth": 3.589207887649536
            },
            "face_information": [
                {
                    "position": {
                        "x": -3.3527612686157227e-08,
                        "y": 2.2351741790771484e-08,
                        "z": 0.6159026622772217
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.3931920528411865
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Components_Tank": {
            "collection": "Components",
            "object_name": "Tank",
            "dimensions": {
                "width": 2.8136627674102783,
                "height": 2.7568113803863525,
                "depth": 5.619126319885254
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.06374245882034302,
                        "z": -1.7193334102630615
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Components_spire": {
            "collection": "Components",
            "object_name": "spire",
            "dimensions": {
                "width": 0.9253109097480774,
                "height": 1.6492252349853516,
                "depth": 1.2153515815734863
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.14901535212993622,
                        "y": 0.36689865589141846,
                        "z": -0.8261085152626038
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.14901535212993622,
                        "y": 0.36689865589141846,
                        "z": -0.8261085152626038
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Engines_eng.body.tooth": {
            "collection": "Engines",
            "object_name": "eng.body.tooth",
            "dimensions": {
                "width": 2.2726736068725586,
                "height": 2.5081124305725098,
                "depth": 4.222699165344238
            },
            "face_information": [
                {
                    "position": {
                        "x": -5.960464477539063e-08,
                        "y": 0.8528827428817749,
                        "z": -1.0
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 3.725290298461914e-08,
                        "y": -1.315362811088562,
                        "z": 0.19383400678634644
                    },
                    "normal": {
                        "x": -7.585723693637192e-08,
                        "y": 1.0,
                        "z": 6.483411652880022e-06
                    }
                },
                {
                    "position": {
                        "x": -2.980232238769531e-07,
                        "y": 1.0631927251815796,
                        "z": 1.5081124305725098
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Engines_eng.split": {
            "collection": "Engines",
            "object_name": "eng.split",
            "dimensions": {
                "width": 0.9868897199630737,
                "height": 2.151318311691284,
                "depth": 3.7014355659484863
            },
            "face_information": [
                {
                    "position": {
                        "x": 8.195638656616211e-08,
                        "y": 0.8458494544029236,
                        "z": 0.09423238784074783
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Engines_eng.body.slant": {
            "collection": "Engines",
            "object_name": "eng.body.slant",
            "dimensions": {
                "width": 1.9267741441726685,
                "height": 3.020310878753662,
                "depth": 5.27656364440918
            },
            "face_information": [
                {
                    "position": {
                        "x": 3.2782554626464844e-07,
                        "y": 0.8713902235031128,
                        "z": -1.3923373222351074
                    },
                    "normal": {
                        "x": 1.1517867280590177e-13,
                        "y": 2.3155553208198398e-07,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 7.599592208862305e-07,
                        "y": 2.8752479553222656,
                        "z": 0.5653234720230103
                    },
                    "normal": {
                        "x": 6.914004870850476e-07,
                        "y": 1.0,
                        "z": 2.5568087380634097e-07
                    }
                },
                {
                    "position": {
                        "x": -1.9744038581848145e-07,
                        "y": 1.9410072565078735,
                        "z": 1.5858515501022339
                    },
                    "normal": {
                        "x": 4.310394530193662e-08,
                        "y": 0.04444011673331261,
                        "z": 0.9990121126174927
                    }
                }
            ]
        },
        "Engines_eng.Rect": {
            "collection": "Engines",
            "object_name": "eng.Rect",
            "dimensions": {
                "width": 1.1526145935058594,
                "height": 1.1659095287322998,
                "depth": 2.261922836303711
            },
            "face_information": [
                {
                    "position": {
                        "x": -2.2351741790771484e-08,
                        "y": -0.3545386791229248,
                        "z": -0.5829547047615051
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -6.332993507385254e-08,
                        "y": -0.35453885793685913,
                        "z": 0.5829547047615051
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 2.682209014892578e-07,
                        "y": 1.0295403003692627,
                        "z": 3.110617399215698e-07
                    },
                    "normal": {
                        "x": -5.818427553094807e-07,
                        "y": -1.0,
                        "z": -1.6527989146197797e-06
                    }
                }
            ]
        },
        "Engines_eng.Vanes": {
            "collection": "Engines",
            "object_name": "eng.Vanes",
            "dimensions": {
                "width": 2.289761781692505,
                "height": 2.209927558898926,
                "depth": 3.772857189178467
            },
            "face_information": [
                {
                    "position": {
                        "x": -1.1448802947998047,
                        "y": 0.7229596972465515,
                        "z": 1.043081283569336e-07
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -2.738445630257047e-07,
                        "z": -2.886140464397613e-07
                    }
                },
                {
                    "position": {
                        "x": 1.144880771636963,
                        "y": 0.7229592204093933,
                        "z": 5.960464477539063e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 2.738451030381839e-07,
                        "z": -7.215348318823089e-07
                    }
                },
                {
                    "position": {
                        "x": -0.6197640895843506,
                        "y": 1.3951106071472168,
                        "z": 3.725290298461914e-07
                    },
                    "normal": {
                        "x": -5.575766977017338e-07,
                        "y": -1.0,
                        "z": -1.8701068427162681e-07
                    }
                },
                {
                    "position": {
                        "x": 0.619763970375061,
                        "y": 1.3951101303100586,
                        "z": 3.8743019104003906e-07
                    },
                    "normal": {
                        "x": -2.787884625377046e-07,
                        "y": -1.0,
                        "z": -2.805157919283374e-07
                    }
                }
            ]
        },
        "Engines_eng.5Pole": {
            "collection": "Engines",
            "object_name": "eng.5Pole",
            "dimensions": {
                "width": 2.2164931297302246,
                "height": 2.151165246963501,
                "depth": 3.0853466987609863
            },
            "face_information": [
                {
                    "position": {
                        "x": 5.960464477539063e-08,
                        "y": 1.9686100482940674,
                        "z": 2.682209014892578e-07
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Engines_eng.body.splt": {
            "collection": "Engines",
            "object_name": "eng.body.splt",
            "dimensions": {
                "width": 1.9851089715957642,
                "height": 3.1095120906829834,
                "depth": 3.9904916286468506
            },
            "face_information": [
                {
                    "position": {
                        "x": -7.525086402893066e-07,
                        "y": 2.932424783706665,
                        "z": 4.470348358154297e-08
                    },
                    "normal": {
                        "x": -7.583511205666582e-07,
                        "y": 0.9999999403953552,
                        "z": -2.113317387839736e-14
                    }
                },
                {
                    "position": {
                        "x": 8.717179298400879e-07,
                        "y": 0.5891363024711609,
                        "z": -1.4433095455169678
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 8.419156074523926e-07,
                        "y": 0.4748955965042114,
                        "z": 1.6662025451660156
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Engines_eng.strut.vacuum": {
            "collection": "Engines",
            "object_name": "eng.strut.vacuum",
            "dimensions": {
                "width": 0.9637303352355957,
                "height": 1.8935508728027344,
                "depth": 4.884524822235107
            },
            "face_information": [
                {
                    "position": {
                        "x": 4.470348358154297e-08,
                        "y": 2.4422624111175537,
                        "z": 0.3881209194660187
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.6391277313232422e-07,
                        "y": -1.9421532154083252,
                        "z": -0.9467753171920776
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 2.384185791015625e-07,
                        "y": -2.4422624111175537,
                        "z": -0.6569198369979858
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Engines_eng.flap": {
            "collection": "Engines",
            "object_name": "eng.flap",
            "dimensions": {
                "width": 0.8677361011505127,
                "height": 1.4498891830444336,
                "depth": 2.4291086196899414
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.4126031696796417,
                        "y": -0.6739364862442017,
                        "z": 1.1920928955078125e-07
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.41390538215637207,
                        "y": -0.6739365458488464,
                        "z": -2.9802322387695312e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Engines_eng.strut.ladder": {
            "collection": "Engines",
            "object_name": "eng.strut.ladder",
            "dimensions": {
                "width": 1.0665149688720703,
                "height": 3.198045492172241,
                "depth": 5.29780387878418
            },
            "face_information": [
                {
                    "position": {
                        "x": -1.1175870895385742e-08,
                        "y": -0.20679593086242676,
                        "z": -0.21557378768920898
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                }
            ]
        },
        "Engines_eng.trumpet": {
            "collection": "Engines",
            "object_name": "eng.trumpet",
            "dimensions": {
                "width": 1.6841802597045898,
                "height": 1.3192380666732788,
                "depth": 2.6605310440063477
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.8420900702476501,
                        "y": 0.5433015823364258,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -3.3423847867197765e-07,
                        "z": 2.6719817469711415e-07
                    }
                },
                {
                    "position": {
                        "x": 0.8420898914337158,
                        "y": 0.5433018207550049,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -3.3423847867197765e-07,
                        "z": -2.671962420208729e-07
                    }
                }
            ]
        },
        "Engines_eng.multi": {
            "collection": "Engines",
            "object_name": "eng.multi",
            "dimensions": {
                "width": 1.5542429685592651,
                "height": 1.5542430877685547,
                "depth": 2.619231700897217
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.6933333873748779,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999999403953552,
                        "z": -0.0
                    }
                }
            ]
        },
        "Engines_eng.body.Y-block": {
            "collection": "Engines",
            "object_name": "eng.body.Y-block",
            "dimensions": {
                "width": 1.10054349899292,
                "height": 2.7816171646118164,
                "depth": 3.694200038909912
            },
            "face_information": [
                {
                    "position": {
                        "x": -5.587935447692871e-08,
                        "y": -0.4055080711841583,
                        "z": 1.2503526210784912
                    },
                    "normal": {
                        "x": -1.8645162996010212e-13,
                        "y": -1.3534415188587445e-07,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -1.1175870895385742e-08,
                        "y": 0.17865344882011414,
                        "z": -1.0784690380096436
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.5474571585655212,
                        "y": -0.01837824285030365,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -1.902439521472843e-07,
                        "z": -2.8782810090888233e-07
                    }
                },
                {
                    "position": {
                        "x": -0.5474571585655212,
                        "y": -0.018378283828496933,
                        "z": 7.450580596923828e-09
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 4.4390256448423315e-07,
                        "z": 2.8782781669178803e-07
                    }
                }
            ]
        },
        "Engines_eng.body.wide_mouth": {
            "collection": "Engines",
            "object_name": "eng.body.wide_mouth",
            "dimensions": {
                "width": 4.763623237609863,
                "height": 1.704000473022461,
                "depth": 2.5061092376708984
            },
            "face_information": [
                {
                    "position": {
                        "x": -4.470348358154297e-08,
                        "y": -0.0454743355512619,
                        "z": -0.9157310724258423
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 8.195638656616211e-08,
                        "y": 1.2622241973876953,
                        "z": -5.960464477539063e-08
                    },
                    "normal": {
                        "x": -1.3814752719554235e-07,
                        "y": 1.0,
                        "z": -1.5136704689666658e-07
                    }
                },
                {
                    "position": {
                        "x": 2.8312206268310547e-07,
                        "y": 0.15169493854045868,
                        "z": 0.7882693409919739
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Engines_eng.strut.foot": {
            "collection": "Engines",
            "object_name": "eng.strut.foot",
            "dimensions": {
                "width": 0.6119043827056885,
                "height": 2.600588321685791,
                "depth": 5.169995307922363
            },
            "face_information": [
                {
                    "position": {
                        "x": 3.039836883544922e-06,
                        "y": 3.6090972423553467,
                        "z": 1.1501156091690063
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Engines_eng.body.chin": {
            "collection": "Engines",
            "object_name": "eng.body.chin",
            "dimensions": {
                "width": 0.9514579772949219,
                "height": 2.033602714538574,
                "depth": 3.082383632659912
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.825392246246338e-07,
                        "y": -1.6195149421691895,
                        "z": 1.1761444807052612
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.6391277313232422e-07,
                        "y": -1.619515061378479,
                        "z": -0.28030550479888916
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 1.862645149230957e-07,
                        "y": -1.9860248565673828,
                        "z": 0.4479195773601532
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 2.0667903299909085e-07
                    }
                }
            ]
        },
        "Engines_eng.body.split": {
            "collection": "Engines",
            "object_name": "eng.body.split",
            "dimensions": {
                "width": 3.079943895339966,
                "height": 1.9734020233154297,
                "depth": 4.692239761352539
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.7728974223136902,
                        "y": -1.3785842657089233,
                        "z": -0.24696575105190277
                    },
                    "normal": {
                        "x": -8.752791380572944e-09,
                        "y": -2.195498893797776e-07,
                        "z": -1.0
                    }
                }
            ]
        },
        "Engines_eng.onion": {
            "collection": "Engines",
            "object_name": "eng.onion",
            "dimensions": {
                "width": 1.5124049186706543,
                "height": 1.498645305633545,
                "depth": 2.654264450073242
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 1.4760510921478271,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Engines_eng.strut.cylindar": {
            "collection": "Engines",
            "object_name": "eng.strut.cylindar",
            "dimensions": {
                "width": 1.7861719131469727,
                "height": 3.684535026550293,
                "depth": 5.292727470397949
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.4832168221473694,
                        "z": -0.28498274087905884
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Engines_eng.bit": {
            "collection": "Engines",
            "object_name": "eng.bit",
            "dimensions": {
                "width": 1.6538866758346558,
                "height": 1.4323081970214844,
                "depth": 2.3026914596557617
            },
            "face_information": [
                {
                    "position": {
                        "x": -5.960464477539063e-08,
                        "y": 0.5562567710876465,
                        "z": -2.9802322387695312e-08
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Engines_eng.body.fish": {
            "collection": "Engines",
            "object_name": "eng.body.fish",
            "dimensions": {
                "width": 1.6532261371612549,
                "height": 3.0411081314086914,
                "depth": 3.931370258331299
            },
            "face_information": [
                {
                    "position": {
                        "x": 3.725290298461914e-09,
                        "y": -0.1493513286113739,
                        "z": 1.5293697118759155
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -3.948807716369629e-07,
                        "y": -1.6859885454177856,
                        "z": 1.1920928955078125e-07
                    },
                    "normal": {
                        "x": -1.4505171748169232e-06,
                        "y": -0.9999999403953552,
                        "z": 3.0128867933854053e-07
                    }
                },
                {
                    "position": {
                        "x": 4.0978193283081055e-08,
                        "y": -0.3155425190925598,
                        "z": -1.4850075244903564
                    },
                    "normal": {
                        "x": -8.336978218892455e-09,
                        "y": 0.06862228363752365,
                        "z": -0.9976426959037781
                    }
                }
            ]
        },
        "Engines_BracketEngine": {
            "collection": "Engines",
            "object_name": "BracketEngine",
            "dimensions": {
                "width": 3.681663751602173,
                "height": 2.3532865047454834,
                "depth": 5.011017799377441
            },
            "face_information": [
                {
                    "position": {
                        "x": 4.172325134277344e-07,
                        "y": 1.0393962860107422,
                        "z": 1.0916571617126465
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 4.172325134277344e-07,
                        "y": -0.3007984459400177,
                        "z": 1.0916571617126465
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.8408308029174805,
                        "y": 0.45980939269065857,
                        "z": -2.9802322387695312e-08
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 3.9306002008743235e-07,
                        "z": -5.726076324208407e-07
                    }
                },
                {
                    "position": {
                        "x": -1.8408311605453491,
                        "y": -0.6205722093582153,
                        "z": -2.9802322387695312e-08
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 3.275499409483018e-07,
                        "z": -5.010317636333639e-07
                    }
                },
                {
                    "position": {
                        "x": -1.8408315181732178,
                        "y": -1.7009539604187012,
                        "z": -2.9802322387695312e-08
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 3.930598779788852e-07,
                        "z": -4.2945578115904937e-07
                    }
                },
                {
                    "position": {
                        "x": 1.8408305644989014,
                        "y": -1.7009546756744385,
                        "z": 3.725290298461914e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -3.9305982113546634e-07,
                        "z": 1.0020632998930523e-06
                    }
                },
                {
                    "position": {
                        "x": 1.8408308029174805,
                        "y": -0.6205729842185974,
                        "z": 2.2351741790771484e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -3.275499409483018e-07,
                        "z": 2.1472774847097753e-07
                    }
                },
                {
                    "position": {
                        "x": 1.8408312797546387,
                        "y": 0.4598087966442108,
                        "z": -2.9802322387695312e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -3.9305990640059463e-07,
                        "z": -5.726078597945161e-07
                    }
                },
                {
                    "position": {
                        "x": 8.940696716308594e-08,
                        "y": 0.34013399481773376,
                        "z": -1.015000581741333
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 8.940696716308594e-08,
                        "y": -1.615709662437439,
                        "z": -0.9745156764984131
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 4.3213367462158203e-07,
                        "y": 1.3740025758743286,
                        "z": 0.13240346312522888
                    },
                    "normal": {
                        "x": 3.6611734799407714e-07,
                        "y": 1.0,
                        "z": 1.130088548961794e-06
                    }
                }
            ]
        },
        "Engines_BlockEnginesingle": {
            "collection": "Engines",
            "object_name": "BlockEnginesingle",
            "dimensions": {
                "width": 1.9536638259887695,
                "height": 2.519076108932495,
                "depth": 5.986325263977051
            },
            "face_information": [
                {
                    "position": {
                        "x": -1.7881393432617188e-07,
                        "y": 0.9115967750549316,
                        "z": -1.2404803037643433
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.9302399158477783,
                        "y": 1.1677838563919067,
                        "z": 0.554106593132019
                    },
                    "normal": {
                        "x": 0.9964834451675415,
                        "y": -1.4203901343989855e-07,
                        "z": 0.08378875255584717
                    }
                },
                {
                    "position": {
                        "x": -0.930240273475647,
                        "y": 1.1677850484848022,
                        "z": 0.554106593132019
                    },
                    "normal": {
                        "x": -0.996483564376831,
                        "y": 1.51650695556782e-07,
                        "z": 0.08378853648900986
                    }
                },
                {
                    "position": {
                        "x": -2.086162567138672e-07,
                        "y": 1.1268330812454224,
                        "z": 1.2785958051681519
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.06380832195281982,
                        "y": 3.7036056518554688,
                        "z": 0.0035437047481536865
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9998817443847656,
                        "z": -0.015378964133560658
                    }
                }
            ]
        },
        "Engines_5-Engine": {
            "collection": "Engines",
            "object_name": "5-Engine",
            "dimensions": {
                "width": 4.089623928070068,
                "height": 3.263840436935425,
                "depth": 5.4085845947265625
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.8229644894599915,
                        "z": 0.6461273431777954
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Engines_FishEngine": {
            "collection": "Engines",
            "object_name": "FishEngine",
            "dimensions": {
                "width": 1.0549116134643555,
                "height": 3.039275884628296,
                "depth": 4.7016825675964355
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.5274556875228882,
                        "y": 0.6192677021026611,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Engines_Trusswork-Wing": {
            "collection": "Engines",
            "object_name": "Trusswork-Wing",
            "dimensions": {
                "width": 2.273084878921509,
                "height": 1.0821882486343384,
                "depth": 3.9000256061553955
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.9093685150146484,
                        "y": 1.1165354251861572,
                        "z": 0.22280937433242798
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.9093685150146484,
                        "y": 1.8237316608428955,
                        "z": -0.20588919520378113
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.9093685150146484,
                        "y": -1.5293235778808594,
                        "z": -0.20588919520378113
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.9093685150146484,
                        "y": -0.6715652942657471,
                        "z": 0.22280937433242798
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Engines_Trap-Engine": {
            "collection": "Engines",
            "object_name": "Trap-Engine",
            "dimensions": {
                "width": 3.6666154861450195,
                "height": 6.174328804016113,
                "depth": 7.267556190490723
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.3527263402938843,
                        "y": -2.0330190658569336,
                        "z": 2.9802322387695312e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 4.1674715589579137e-07
                    }
                },
                {
                    "position": {
                        "x": 1.3527263402938843,
                        "y": -0.6776732802391052,
                        "z": 2.9802322387695312e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -8.795486650114981e-08,
                        "z": 1.0418678186852048e-07
                    }
                },
                {
                    "position": {
                        "x": 1.3527265787124634,
                        "y": 1.0146745443344116,
                        "z": 7.450580596923828e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -8.811390728169499e-08,
                        "z": -5.209338738154656e-08
                    }
                }
            ]
        },
        "Engines_CubeEngine": {
            "collection": "Engines",
            "object_name": "CubeEngine",
            "dimensions": {
                "width": 3.0264713764190674,
                "height": 3.6405463218688965,
                "depth": 9.330972671508789
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.5042812824249268,
                        "y": -1.3572174310684204,
                        "z": -0.33387091755867004
                    },
                    "normal": {
                        "x": 0.9999128580093384,
                        "y": -0.013203214854001999,
                        "z": -1.8667289225504646e-07
                    }
                },
                {
                    "position": {
                        "x": -1.5042812824249268,
                        "y": -1.3572174310684204,
                        "z": -0.33387091755867004
                    },
                    "normal": {
                        "x": -0.9999128580093384,
                        "y": -0.013203214854001999,
                        "z": -1.8667289225504646e-07
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 1.056668758392334,
                        "z": -2.1304006576538086
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Engines_eng.bit.001": {
            "collection": "Engines",
            "object_name": "eng.bit.001",
            "dimensions": {
                "width": 1.3636237382888794,
                "height": 1.1809332370758057,
                "depth": 1.8985610008239746
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.4586317837238312,
                        "z": -2.9802322387695312e-08
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Engines_eng.bit.002": {
            "collection": "Engines",
            "object_name": "eng.bit.002",
            "dimensions": {
                "width": 1.3636237382888794,
                "height": 1.1809332370758057,
                "depth": 1.8985610008239746
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.4586317837238312,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Engines_eng.bit.003": {
            "collection": "Engines",
            "object_name": "eng.bit.003",
            "dimensions": {
                "width": 1.3636237382888794,
                "height": 1.1809332370758057,
                "depth": 1.8985610008239746
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.4586317837238312,
                        "z": -2.9802322387695312e-08
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Engines_eng.bit.004": {
            "collection": "Engines",
            "object_name": "eng.bit.004",
            "dimensions": {
                "width": 1.3636237382888794,
                "height": 1.1809332370758057,
                "depth": 1.8985610008239746
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.4586317837238312,
                        "z": -2.9802322387695312e-08
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Engines_eng.body.Y-block.001": {
            "collection": "Engines",
            "object_name": "eng.body.Y-block.001",
            "dimensions": {
                "width": 1.8311400413513184,
                "height": 4.6281962394714355,
                "depth": 6.146597862243652
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.8998980522155762e-07,
                        "y": -0.674704909324646,
                        "z": 2.080400228500366
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -2.2351741790771484e-08,
                        "y": 0.29725271463394165,
                        "z": -1.7944116592407227
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.9108870625495911,
                        "y": -0.03057878464460373,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 4.573581406930316e-07,
                        "z": 3.459782362824626e-07
                    }
                },
                {
                    "position": {
                        "x": 0.9108870625495911,
                        "y": -0.030578553676605225,
                        "z": 1.4901161193847656e-08
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": -7.24150481801189e-07,
                        "z": -2.8831479426116857e-07
                    }
                }
            ]
        },
        "Engines_eng.body.Y-block.002": {
            "collection": "Engines",
            "object_name": "eng.body.Y-block.002",
            "dimensions": {
                "width": 1.8311400413513184,
                "height": 4.6281962394714355,
                "depth": 6.146597862243652
            },
            "face_information": [
                {
                    "position": {
                        "x": -1.8998980522155762e-07,
                        "y": -0.674704909324646,
                        "z": 2.080400228500366
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 2.2351741790771484e-08,
                        "y": 0.29725271463394165,
                        "z": -1.7944116592407227
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.9108870625495911,
                        "y": -0.03057878464460373,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -4.573581406930316e-07,
                        "z": -3.459782362824626e-07
                    }
                },
                {
                    "position": {
                        "x": -0.9108870625495911,
                        "y": -0.030578553676605225,
                        "z": 1.4901161193847656e-08
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": 7.24150481801189e-07,
                        "z": 2.8831479426116857e-07
                    }
                }
            ]
        },
        "Engines_eng.strut.cylinda.000": {
            "collection": "Engines",
            "object_name": "eng.strut.cylinda.000",
            "dimensions": {
                "width": 1.7861719131469727,
                "height": 3.684535264968872,
                "depth": 5.292727470397949
            },
            "face_information": [
                {
                    "position": {
                        "x": -5.960464477539063e-08,
                        "y": 2.9802322387695312e-08,
                        "z": -0.2849828004837036
                    },
                    "normal": {
                        "x": 9.219120045145246e-08,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Engines_eng.strut.cylinda.001": {
            "collection": "Engines",
            "object_name": "eng.strut.cylinda.001",
            "dimensions": {
                "width": 1.7861719131469727,
                "height": 3.684535264968872,
                "depth": 5.292727470397949
            },
            "face_information": [
                {
                    "position": {
                        "x": 5.960464477539063e-08,
                        "y": 5.960464477539063e-08,
                        "z": 0.2849828004837036
                    },
                    "normal": {
                        "x": 8.60116387002563e-08,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Greebly_mushroom": {
            "collection": "Greebly",
            "object_name": "mushroom",
            "dimensions": {
                "width": 0.7817493081092834,
                "height": 1.1528700590133667,
                "depth": 0.7817493081092834
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.051233921200037
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Greebly_portalblock": {
            "collection": "Greebly",
            "object_name": "portalblock",
            "dimensions": {
                "width": 0.9270902872085571,
                "height": 0.987604022026062,
                "depth": 2.0067198276519775
            },
            "face_information": [
                {
                    "position": {
                        "x": -5.960464477539063e-08,
                        "y": -0.9999999403953552,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -1.0473424936208175e-06,
                        "y": -1.0,
                        "z": -2.9946255608592764e-07
                    }
                },
                {
                    "position": {
                        "x": 5.960464477539063e-08,
                        "y": 1.0,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 9.241255725100928e-07,
                        "y": 1.0,
                        "z": 7.78602043283172e-07
                    }
                },
                {
                    "position": {
                        "x": 2.2351741790771484e-08,
                        "y": 1.043081283569336e-07,
                        "z": -0.24879857897758484
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                }
            ]
        },
        "Greebly_misc": {
            "collection": "Greebly",
            "object_name": "misc",
            "dimensions": {
                "width": 0.7940084934234619,
                "height": 2.3288376331329346,
                "depth": 4.650140762329102
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.16083404421806335,
                        "y": 2.7939677238464355e-08,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 8.121979533370904e-08,
                        "z": -3.653376268175634e-08
                    }
                },
                {
                    "position": {
                        "x": 0.501530110836029,
                        "y": -7.450580596923828e-08,
                        "z": -1.0691688060760498
                    },
                    "normal": {
                        "x": -0.06851861625909805,
                        "y": 0.0,
                        "z": -0.9976497292518616
                    }
                },
                {
                    "position": {
                        "x": 0.8948370218276978,
                        "y": -7.078051567077637e-08,
                        "z": -0.9581408500671387
                    },
                    "normal": {
                        "x": 0.9976497888565063,
                        "y": 0.0,
                        "z": -0.06851933151483536
                    }
                },
                {
                    "position": {
                        "x": 0.8363078236579895,
                        "y": -1.0244548320770264e-07,
                        "z": -0.4311625361442566
                    },
                    "normal": {
                        "x": 0.9976497292518616,
                        "y": 0.0,
                        "z": -0.06851911544799805
                    }
                }
            ]
        },
        "Greebly_Cargobox": {
            "collection": "Greebly",
            "object_name": "Cargobox",
            "dimensions": {
                "width": 0.6948129534721375,
                "height": 0.8062325119972229,
                "depth": 1.5173728466033936
            },
            "face_information": [
                {
                    "position": {
                        "x": 6.705522537231445e-08,
                        "y": 0.7471086382865906,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 4.818887191504473e-07,
                        "y": 1.0,
                        "z": 4.818887191504473e-07
                    }
                },
                {
                    "position": {
                        "x": -1.1175870895385742e-07,
                        "y": -0.7615455985069275,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 6.660596341134806e-07,
                        "y": 1.0,
                        "z": 8.76162786767054e-08
                    }
                },
                {
                    "position": {
                        "x": 1.4901161193847656e-08,
                        "y": 1.1920928955078125e-07,
                        "z": 0.40311625599861145
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 1.4901161193847656e-08,
                        "y": 2.9802322387695312e-08,
                        "z": -0.40311625599861145
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                }
            ]
        },
        "Greebly_AngledRib-block": {
            "collection": "Greebly",
            "object_name": "AngledRib-block",
            "dimensions": {
                "width": 0.28113213181495667,
                "height": 0.3804451823234558,
                "depth": 1.1540606021881104
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.6763806343078613e-08,
                        "y": 0.5305603742599487,
                        "z": -0.10021071135997772
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 5.587935447692871e-09,
                        "y": -0.04646993428468704,
                        "z": -0.10021071135997772
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -3.725290298461914e-09,
                        "y": -0.43115678429603577,
                        "z": -0.10021071135997772
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Greebly_SplitMast": {
            "collection": "Greebly",
            "object_name": "SplitMast",
            "dimensions": {
                "width": 0.49948328733444214,
                "height": 0.4251367747783661,
                "depth": 0.3319009840488434
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.01259768009185791,
                        "z": -0.11437200754880905
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Greebly_5mast": {
            "collection": "Greebly",
            "object_name": "5mast",
            "dimensions": {
                "width": 0.6142945289611816,
                "height": 0.9981541633605957,
                "depth": 0.6352875828742981
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.02684319019317627,
                        "y": 0.0,
                        "z": -0.49816203117370605
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Greebly_5starblock": {
            "collection": "Greebly",
            "object_name": "5starblock",
            "dimensions": {
                "width": 0.2709157466888428,
                "height": 0.2709156274795532,
                "depth": 4.0011396408081055
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.0005491375923156738,
                        "y": -2.0005693435668945,
                        "z": -0.0005499422550201416
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": -0.0005490779876708984,
                        "y": 2.000570297241211,
                        "z": -0.0005498528480529785
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Greebly_DishPanel": {
            "collection": "Greebly",
            "object_name": "DishPanel",
            "dimensions": {
                "width": 0.25276005268096924,
                "height": 0.4754391014575958,
                "depth": 0.26544898748397827
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.1920928955078125e-07,
                        "z": -0.0036387182772159576
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Greebly_Flower": {
            "collection": "Greebly",
            "object_name": "Flower",
            "dimensions": {
                "width": 0.24338862299919128,
                "height": 0.1367175281047821,
                "depth": 0.2327892780303955
            },
            "face_information": []
        },
        "Greebly_ResBlock": {
            "collection": "Greebly",
            "object_name": "ResBlock",
            "dimensions": {
                "width": 0.8429183959960938,
                "height": 0.42243167757987976,
                "depth": 2.4232215881347656
            },
            "face_information": [
                {
                    "position": {
                        "x": -3.725290298461914e-09,
                        "y": -0.08429154753684998,
                        "z": -0.21121583878993988
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.21958805620670319,
                        "z": 0.21121583878993988
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Greebly_HexTube": {
            "collection": "Greebly",
            "object_name": "HexTube",
            "dimensions": {
                "width": 0.9328317642211914,
                "height": 0.3352862298488617,
                "depth": 0.3650885224342346
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.3524837791919708,
                        "y": 1.1920928955078125e-07,
                        "z": -0.16764310002326965
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.3524837791919708,
                        "y": 1.1920928955078125e-07,
                        "z": -0.16764310002326965
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.07736632227897644,
                        "y": 1.1920928955078125e-07,
                        "z": -0.16764310002326965
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.07736632227897644,
                        "y": 1.1920928955078125e-07,
                        "z": -0.16764310002326965
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.35248368978500366,
                        "y": 1.7881393432617188e-07,
                        "z": 0.16764312982559204
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.35248371958732605,
                        "y": 1.7881393432617188e-07,
                        "z": 0.16764312982559204
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Greebly_Bi-PolarEngine": {
            "collection": "Greebly",
            "object_name": "Bi-PolarEngine",
            "dimensions": {
                "width": 0.6917251944541931,
                "height": 0.9611667394638062,
                "depth": 1.565786361694336
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.34586232900619507,
                        "y": 0.05256307125091553,
                        "z": -1.4156103134155273e-07
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -4.171268297675605e-14,
                        "z": -1.0860904922083137e-06
                    }
                },
                {
                    "position": {
                        "x": 0.34586259722709656,
                        "y": 0.05256307125091553,
                        "z": -8.940696716308594e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Hulls_hull.Grill": {
            "collection": "Hulls",
            "object_name": "hull.Grill",
            "dimensions": {
                "width": 3.961848020553589,
                "height": 4.863903045654297,
                "depth": 14.978105545043945
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.056178092956543,
                        "y": -4.472515106201172,
                        "z": 1.3786684274673462
                    },
                    "normal": {
                        "x": 0.9960851669311523,
                        "y": -0.08839969336986542,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.056178092956543,
                        "y": -4.472515106201172,
                        "z": 1.3786684274673462
                    },
                    "normal": {
                        "x": -0.9960851669311523,
                        "y": -0.08839969336986542,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.1980386972427368,
                        "y": 4.654153823852539,
                        "z": 0.9709427952766418
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -0.00018294743495061994,
                        "z": 0.0003129086398985237
                    }
                },
                {
                    "position": {
                        "x": -1.1980386972427368,
                        "y": 4.654153823852539,
                        "z": 0.9709427952766418
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -0.00018294743495061994,
                        "z": 0.0003129086398985237
                    }
                },
                {
                    "position": {
                        "x": 0.8179128766059875,
                        "y": 7.798577308654785,
                        "z": 1.6485648155212402
                    },
                    "normal": {
                        "x": 0.9566349983215332,
                        "y": 0.29128149151802063,
                        "z": -0.00213412893936038
                    }
                },
                {
                    "position": {
                        "x": -0.7194501161575317,
                        "y": 7.311549663543701,
                        "z": 2.3303639888763428
                    },
                    "normal": {
                        "x": -0.8053675889968872,
                        "y": 0.17531849443912506,
                        "z": 0.566256582736969
                    }
                }
            ]
        },
        "Hulls_hull.Horse": {
            "collection": "Hulls",
            "object_name": "hull.Horse",
            "dimensions": {
                "width": 2.27075457572937,
                "height": 4.22120475769043,
                "depth": 13.668858528137207
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.7460012435913086,
                        "y": -1.6264936923980713,
                        "z": -1.358155369758606
                    },
                    "normal": {
                        "x": 0.8421972393989563,
                        "y": -0.01232774555683136,
                        "z": 0.5390287041664124
                    }
                },
                {
                    "position": {
                        "x": 0.7460012435913086,
                        "y": -1.6264938116073608,
                        "z": -1.3581552505493164
                    },
                    "normal": {
                        "x": -0.8421972990036011,
                        "y": -0.012327738106250763,
                        "z": 0.5390287041664124
                    }
                },
                {
                    "position": {
                        "x": -0.7562209367752075,
                        "y": 3.742417812347412,
                        "z": 0.6987099647521973
                    },
                    "normal": {
                        "x": -0.9421938061714172,
                        "y": 1.2535298310467624e-07,
                        "z": 0.33506810665130615
                    }
                },
                {
                    "position": {
                        "x": 0.7562208771705627,
                        "y": 3.742417812347412,
                        "z": 0.6987099647521973
                    },
                    "normal": {
                        "x": 0.9421938061714172,
                        "y": 1.2535298310467624e-07,
                        "z": 0.33506810665130615
                    }
                },
                {
                    "position": {
                        "x": -0.9876363277435303,
                        "y": -1.7387309074401855,
                        "z": 0.038028962910175323
                    },
                    "normal": {
                        "x": -0.9996930360794067,
                        "y": 0.00855171401053667,
                        "z": -0.02325417846441269
                    }
                },
                {
                    "position": {
                        "x": 0.987636387348175,
                        "y": -1.7387309074401855,
                        "z": 0.038028962910175323
                    },
                    "normal": {
                        "x": 0.9996930360794067,
                        "y": 0.00855171401053667,
                        "z": -0.02325417846441269
                    }
                },
                {
                    "position": {
                        "x": -0.809978723526001,
                        "y": -1.6138854026794434,
                        "z": 0.7952026128768921
                    },
                    "normal": {
                        "x": -0.9508479833602905,
                        "y": 0.02066127583384514,
                        "z": 0.30896782875061035
                    }
                },
                {
                    "position": {
                        "x": 0.809978723526001,
                        "y": -1.613885521888733,
                        "z": 0.7952026128768921
                    },
                    "normal": {
                        "x": 0.9508479833602905,
                        "y": 0.02066127583384514,
                        "z": 0.30896782875061035
                    }
                },
                {
                    "position": {
                        "x": -0.7516971826553345,
                        "y": -4.118439197540283,
                        "z": 1.1872327327728271
                    },
                    "normal": {
                        "x": -0.9561125636100769,
                        "y": 0.03292977437376976,
                        "z": 0.29114294052124023
                    }
                },
                {
                    "position": {
                        "x": 0.7516972422599792,
                        "y": -4.118439197540283,
                        "z": 1.1872327327728271
                    },
                    "normal": {
                        "x": 0.9561125636100769,
                        "y": 0.03292977437376976,
                        "z": 0.29114294052124023
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 5.453028202056885,
                        "z": 0.1258646845817566
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 2.6233508378936676e-06
                    }
                },
                {
                    "position": {
                        "x": -1.4901161193847656e-08,
                        "y": 5.453027725219727,
                        "z": 0.8045834302902222
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 5.241608142852783,
                        "z": 1.8160004615783691
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999999403953552,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -8.215060234069824,
                        "z": 2.1476056575775146
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.9999830722808838,
                        "z": 0.005808133166283369
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -8.214290618896484,
                        "z": 0.6764736175537109
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.4901161193847656e-08,
                        "y": -8.214290618896484,
                        "z": 1.490480899810791
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.9418513774871826,
                        "y": -6.7670698165893555,
                        "z": 1.420488715171814
                    },
                    "normal": {
                        "x": -0.9551251530647278,
                        "y": 0.010073665529489517,
                        "z": 0.2960312068462372
                    }
                },
                {
                    "position": {
                        "x": -0.8437438011169434,
                        "y": -6.711963176727295,
                        "z": 0.6048586964607239
                    },
                    "normal": {
                        "x": -0.7904467582702637,
                        "y": 0.00967475026845932,
                        "z": -0.6124542951583862
                    }
                },
                {
                    "position": {
                        "x": 0.8437438607215881,
                        "y": -6.711963176727295,
                        "z": 0.6048586964607239
                    },
                    "normal": {
                        "x": 0.7904467582702637,
                        "y": 0.00967475026845932,
                        "z": -0.6124542951583862
                    }
                },
                {
                    "position": {
                        "x": 0.9418513774871826,
                        "y": -6.7670698165893555,
                        "z": 1.420488715171814
                    },
                    "normal": {
                        "x": 0.9551251530647278,
                        "y": 0.010073665529489517,
                        "z": 0.2960312068462372
                    }
                }
            ]
        },
        "Hulls_Hull.PugNose": {
            "collection": "Hulls",
            "object_name": "Hull.PugNose",
            "dimensions": {
                "width": 0.9754624366760254,
                "height": 2.0321033000946045,
                "depth": 3.5666396617889404
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.33366310596466064,
                        "y": 0.6019471287727356,
                        "z": 0.48643842339515686
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.33366310596466064,
                        "y": 0.7173423767089844,
                        "z": 0.6960995197296143
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.33366310596466064,
                        "y": 0.9798400402069092,
                        "z": 0.5949667096138
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.2223656177520752,
                        "z": -0.37689685821533203
                    },
                    "normal": {
                        "x": -1.1859012971626726e-07,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0001758784055709839,
                        "y": -0.6883422136306763,
                        "z": -0.37297171354293823
                    },
                    "normal": {
                        "x": 0.013678141869604588,
                        "y": -0.009753544814884663,
                        "z": 0.9998588562011719
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 1.4111506938934326,
                        "z": 0.37186145782470703
                    },
                    "normal": {
                        "x": 1.2101342861114972e-07,
                        "y": 0.9940825700759888,
                        "z": 0.10862637311220169
                    }
                },
                {
                    "position": {
                        "x": -3.725290298461914e-09,
                        "y": -0.675048828125,
                        "z": 0.7559959888458252
                    },
                    "normal": {
                        "x": 1.6752970566358272e-07,
                        "y": -0.2934786081314087,
                        "z": 0.9559656381607056
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.08286075294017792,
                        "z": 0.8346891403198242
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -3.725290298461914e-09,
                        "y": 1.2608113288879395,
                        "z": -0.08107541501522064
                    },
                    "normal": {
                        "x": -4.0206919038610067e-07,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.33366310596466064,
                        "y": 0.9798398017883301,
                        "z": 0.5949668288230896
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.33366310596466064,
                        "y": 0.7173422574996948,
                        "z": 0.6960995197296143
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.33366310596466064,
                        "y": 0.6019470691680908,
                        "z": 0.4864383935928345
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.3179801404476166,
                        "y": 0.9805757403373718,
                        "z": -0.22579598426818848
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -1.6340049313612326e-08,
                        "z": -3.4995210285160283e-07
                    }
                },
                {
                    "position": {
                        "x": -0.31798017024993896,
                        "y": 0.7160038352012634,
                        "z": -0.09841132164001465
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": -4.4656189857050776e-08,
                        "z": -2.6442125999892596e-07
                    }
                },
                {
                    "position": {
                        "x": 0.3179801404476166,
                        "y": 0.980575680732727,
                        "z": -0.2257959544658661
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -1.63400706298944e-08,
                        "z": -3.4995201758647454e-07
                    }
                },
                {
                    "position": {
                        "x": 0.31798020005226135,
                        "y": 0.7160038948059082,
                        "z": -0.09841124713420868
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": -4.4656221831473886e-08,
                        "z": -2.6442117473379767e-07
                    }
                },
                {
                    "position": {
                        "x": 0.3889696002006531,
                        "y": 0.15622133016586304,
                        "z": -0.6809319257736206
                    },
                    "normal": {
                        "x": 0.8879538178443909,
                        "y": 0.0021783995907753706,
                        "z": -0.4599275290966034
                    }
                },
                {
                    "position": {
                        "x": -0.38879379630088806,
                        "y": 0.1615293025970459,
                        "z": -0.6742123365402222
                    },
                    "normal": {
                        "x": -0.8946735262870789,
                        "y": -0.009805446490645409,
                        "z": -0.4466129541397095
                    }
                },
                {
                    "position": {
                        "x": -0.19724634289741516,
                        "y": 0.15732493996620178,
                        "z": -0.9336822032928467
                    },
                    "normal": {
                        "x": -0.5565902590751648,
                        "y": -9.675793499752672e-09,
                        "z": -0.830787181854248
                    }
                },
                {
                    "position": {
                        "x": 0.19724619388580322,
                        "y": 0.15732499957084656,
                        "z": -0.9336823225021362
                    },
                    "normal": {
                        "x": 0.5565901398658752,
                        "y": 1.1610950423346367e-07,
                        "z": -0.8307873010635376
                    }
                },
                {
                    "position": {
                        "x": -9.12696123123169e-08,
                        "y": 0.15732496976852417,
                        "z": -0.9960675239562988
                    },
                    "normal": {
                        "x": -5.724182869926153e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -2.9802322387695312e-08,
                        "y": 0.39607489109039307,
                        "z": -0.6447065472602844
                    },
                    "normal": {
                        "x": -1.5850272916395625e-07,
                        "y": 0.9784054160118103,
                        "z": -0.2066953480243683
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -2.0431971549987793,
                        "z": -0.17922687530517578
                    },
                    "normal": {
                        "x": 8.498681758339899e-09,
                        "y": 0.7071071863174438,
                        "z": 0.7071064114570618
                    }
                },
                {
                    "position": {
                        "x": 7.450580596923828e-09,
                        "y": -2.1449155807495117,
                        "z": 0.15304528176784515
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": -5.170566623746709e-07
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -2.0724034309387207,
                        "z": 0.437002032995224
                    },
                    "normal": {
                        "x": -1.3692216782601463e-07,
                        "y": 0.5930062532424927,
                        "z": -0.8051978349685669
                    }
                },
                {
                    "position": {
                        "x": -3.725290298461914e-08,
                        "y": 0.9901225566864014,
                        "z": 1.0020376443862915
                    },
                    "normal": {
                        "x": -9.506864557806693e-07,
                        "y": -5.009157693670885e-14,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -2.9802322387695312e-08,
                        "y": 1.273795485496521,
                        "z": 0.805531919002533
                    },
                    "normal": {
                        "x": -4.774720423483814e-07,
                        "y": -0.9999902844429016,
                        "z": -0.0043987431563436985
                    }
                },
                {
                    "position": {
                        "x": -0.47225865721702576,
                        "y": -1.4273064136505127,
                        "z": 0.022641386836767197
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -5.826740107295336e-06,
                        "z": 1.0471866517036688e-05
                    }
                },
                {
                    "position": {
                        "x": -0.47218018770217896,
                        "y": -0.7628241181373596,
                        "z": 0.0017963461577892303
                    },
                    "normal": {
                        "x": -0.9999998807907104,
                        "y": 0.00023401154612656683,
                        "z": -0.00039057427784428
                    }
                },
                {
                    "position": {
                        "x": -0.47216710448265076,
                        "y": -0.1261615753173828,
                        "z": 0.002042226493358612
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": -0.00023471501481253654,
                        "z": -0.0003316315123811364
                    }
                },
                {
                    "position": {
                        "x": 0.47227609157562256,
                        "y": -1.4268485307693481,
                        "z": 0.022642720490694046
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -5.654742199112661e-05,
                        "z": 9.609928383724764e-05
                    }
                },
                {
                    "position": {
                        "x": 0.4720611572265625,
                        "y": -0.7676613330841064,
                        "z": -0.004909012466669083
                    },
                    "normal": {
                        "x": 0.9999994039535522,
                        "y": 0.0006746813305653632,
                        "z": -0.0009721164824441075
                    }
                },
                {
                    "position": {
                        "x": 0.4720118045806885,
                        "y": -0.13145332038402557,
                        "z": -0.005544625222682953
                    },
                    "normal": {
                        "x": 0.999999463558197,
                        "y": -0.0006173487054184079,
                        "z": -0.0008691243710927665
                    }
                }
            ]
        },
        "Hulls_Hull.Jaw": {
            "collection": "Hulls",
            "object_name": "Hull.Jaw",
            "dimensions": {
                "width": 2.1761717796325684,
                "height": 2.505890130996704,
                "depth": 6.173211574554443
            },
            "face_information": [
                {
                    "position": {
                        "x": -9.5367431640625e-07,
                        "y": -4.092742919921875,
                        "z": -0.3557456135749817
                    },
                    "normal": {
                        "x": 6.806596388742037e-07,
                        "y": 0.99980628490448,
                        "z": -0.019681433215737343
                    }
                },
                {
                    "position": {
                        "x": 6.109476089477539e-07,
                        "y": 2.0013680458068848,
                        "z": -0.7780584096908569
                    },
                    "normal": {
                        "x": -3.586339687444706e-07,
                        "y": -1.0,
                        "z": -5.371444444790541e-07
                    }
                },
                {
                    "position": {
                        "x": -7.897615432739258e-07,
                        "y": -3.2629282474517822,
                        "z": 0.2640725374221802
                    },
                    "normal": {
                        "x": 2.2128313048597192e-07,
                        "y": 0.12485285103321075,
                        "z": -0.992175281047821
                    }
                },
                {
                    "position": {
                        "x": -1.1175870895385742e-08,
                        "y": -1.133264183998108,
                        "z": 0.3229272961616516
                    },
                    "normal": {
                        "x": -5.769901534335986e-08,
                        "y": 0.012733867391943932,
                        "z": -0.9999189376831055
                    }
                },
                {
                    "position": {
                        "x": -0.7261898517608643,
                        "y": -3.1528944969177246,
                        "z": -0.8452121019363403
                    },
                    "normal": {
                        "x": 0.9802029132843018,
                        "y": 0.19000940024852753,
                        "z": 0.05566652491688728
                    }
                },
                {
                    "position": {
                        "x": -5.513429641723633e-07,
                        "y": -3.152989149093628,
                        "z": -1.3357884883880615
                    },
                    "normal": {
                        "x": 4.1397264283205004e-08,
                        "y": 0.43616750836372375,
                        "z": 0.8998655676841736
                    }
                },
                {
                    "position": {
                        "x": 0.726188600063324,
                        "y": -3.152894973754883,
                        "z": -0.8452119827270508
                    },
                    "normal": {
                        "x": -0.980202853679657,
                        "y": 0.1900097280740738,
                        "z": 0.055666226893663406
                    }
                },
                {
                    "position": {
                        "x": 1.0862517356872559,
                        "y": -1.1191517114639282,
                        "z": -0.8623903393745422
                    },
                    "normal": {
                        "x": -0.9999955296516418,
                        "y": 0.0017784929368644953,
                        "z": 0.0024166645016521215
                    }
                },
                {
                    "position": {
                        "x": -1.086251974105835,
                        "y": -1.11915123462677,
                        "z": -0.8623903393745422
                    },
                    "normal": {
                        "x": 0.9999955296516418,
                        "y": 0.0017779214540496469,
                        "z": 0.0024168211966753006
                    }
                },
                {
                    "position": {
                        "x": 5.513429641723633e-07,
                        "y": 1.9040310382843018,
                        "z": -1.283135175704956
                    },
                    "normal": {
                        "x": 1.8952569291741383e-07,
                        "y": 0.6358077526092529,
                        "z": -0.7718473672866821
                    }
                },
                {
                    "position": {
                        "x": 5.21540641784668e-07,
                        "y": 1.1095492839813232,
                        "z": 0.22470834851264954
                    },
                    "normal": {
                        "x": 1.423453994675583e-07,
                        "y": 0.19509367644786835,
                        "z": 0.9807845950126648
                    }
                },
                {
                    "position": {
                        "x": 6.556510925292969e-07,
                        "y": 2.0466976165771484,
                        "z": -0.2102941870689392
                    },
                    "normal": {
                        "x": 4.0703659465179953e-07,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.5852416753768921,
                        "y": 0.9495672583580017,
                        "z": 0.12474919110536575
                    },
                    "normal": {
                        "x": -0.6025311350822449,
                        "y": 0.20672562718391418,
                        "z": 0.7708571553230286
                    }
                },
                {
                    "position": {
                        "x": 0.5852426290512085,
                        "y": 0.9495669007301331,
                        "z": 0.12474916875362396
                    },
                    "normal": {
                        "x": 0.6025311946868896,
                        "y": 0.20672540366649628,
                        "z": 0.7708571553230286
                    }
                },
                {
                    "position": {
                        "x": 2.682209014892578e-07,
                        "y": 0.7586509585380554,
                        "z": -1.6567246913909912
                    },
                    "normal": {
                        "x": 4.781178120083496e-08,
                        "y": 0.1914980262517929,
                        "z": -0.9814929962158203
                    }
                },
                {
                    "position": {
                        "x": 0.6040613055229187,
                        "y": -1.2156087160110474,
                        "z": -1.9333850145339966
                    },
                    "normal": {
                        "x": -0.7479774951934814,
                        "y": 0.023023750633001328,
                        "z": 0.6633246541023254
                    }
                },
                {
                    "position": {
                        "x": -1.4156103134155273e-07,
                        "y": -1.7760603427886963,
                        "z": -1.9184300899505615
                    },
                    "normal": {
                        "x": -2.0270304901259806e-07,
                        "y": 0.7772809863090515,
                        "z": 0.6291536092758179
                    }
                },
                {
                    "position": {
                        "x": -0.604061484336853,
                        "y": -1.2156087160110474,
                        "z": -1.9333851337432861
                    },
                    "normal": {
                        "x": 0.7479773163795471,
                        "y": 0.023023629561066628,
                        "z": 0.6633249521255493
                    }
                },
                {
                    "position": {
                        "x": -2.9802322387695312e-08,
                        "y": -0.6569019556045532,
                        "z": -1.9483067989349365
                    },
                    "normal": {
                        "x": -2.852023044397356e-07,
                        "y": -0.7594032883644104,
                        "z": 0.6506200432777405
                    }
                }
            ]
        },
        "Hulls_hull.pot": {
            "collection": "Hulls",
            "object_name": "hull.pot",
            "dimensions": {
                "width": 2.1550259590148926,
                "height": 4.282876968383789,
                "depth": 11.675575256347656
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.5877745151519775,
                        "y": 6.288706302642822,
                        "z": -0.3671867251396179
                    },
                    "normal": {
                        "x": -0.8047122955322266,
                        "y": 0.5780361890792847,
                        "z": -0.13532233238220215
                    }
                },
                {
                    "position": {
                        "x": -0.4326920509338379,
                        "y": -3.1187961101531982,
                        "z": -1.567875862121582
                    },
                    "normal": {
                        "x": -0.5816596150398254,
                        "y": 3.1343054729404685e-07,
                        "z": -0.8134323358535767
                    }
                },
                {
                    "position": {
                        "x": -0.4327581524848938,
                        "y": 1.9741051197052002,
                        "z": -1.4226912260055542
                    },
                    "normal": {
                        "x": -0.9256699681282043,
                        "y": -0.0009376676171086729,
                        "z": -0.3783307373523712
                    }
                },
                {
                    "position": {
                        "x": -0.5093249082565308,
                        "y": 6.145854949951172,
                        "z": -1.393657922744751
                    },
                    "normal": {
                        "x": -0.8401880264282227,
                        "y": 0.5226752161979675,
                        "z": -0.144550159573555
                    }
                },
                {
                    "position": {
                        "x": -0.9999991655349731,
                        "y": 3.7736597061157227,
                        "z": -0.20801693201065063
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": 6.896518698340515e-07,
                        "z": -2.4791239638943807e-07
                    }
                },
                {
                    "position": {
                        "x": -1.077512502670288,
                        "y": 1.7016671895980835,
                        "z": -0.141610786318779
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -1.4103408441101806e-09,
                        "z": 2.894132364872348e-07
                    }
                },
                {
                    "position": {
                        "x": -1.077512502670288,
                        "y": -0.018330544233322144,
                        "z": -7.450580596923828e-09
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -8.883327495823323e-08,
                        "z": 1.4285319593909662e-07
                    }
                },
                {
                    "position": {
                        "x": -1.0775127410888672,
                        "y": -1.719996690750122,
                        "z": -5.21540641784668e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -2.2308179836727504e-07,
                        "z": 2.9134463375157793e-07
                    }
                },
                {
                    "position": {
                        "x": 1.0775127410888672,
                        "y": -1.719996690750122,
                        "z": -5.21540641784668e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 2.2308179836727504e-07,
                        "z": -2.9134463375157793e-07
                    }
                },
                {
                    "position": {
                        "x": 1.077512502670288,
                        "y": -0.018330544233322144,
                        "z": -7.450580596923828e-09
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 8.883327495823323e-08,
                        "z": -1.4285319593909662e-07
                    }
                },
                {
                    "position": {
                        "x": 1.077512502670288,
                        "y": 1.7016671895980835,
                        "z": -0.141610786318779
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 1.4103408441101806e-09,
                        "z": -2.894132364872348e-07
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 3.583799362182617,
                        "z": 0.7000367045402527
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.48235276341438293,
                        "z": -0.8759770393371582
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 2.3170857429504395,
                        "z": 0.9741734266281128
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.9999991655349731,
                        "y": 3.7736597061157227,
                        "z": -0.20801693201065063
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": -6.896518698340515e-07,
                        "z": 2.4791239638943807e-07
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 5.200664520263672,
                        "z": -2.1225061416625977
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 3.725290298461914e-09,
                        "y": -2.1598024368286133,
                        "z": 2.1603705883026123
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.8423906564712524,
                        "z": 2.1603705883026123
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.5093249082565308,
                        "y": 6.145854949951172,
                        "z": -1.393657922744751
                    },
                    "normal": {
                        "x": -0.8401880264282227,
                        "y": -0.5226752161979675,
                        "z": 0.144550159573555
                    }
                },
                {
                    "position": {
                        "x": 0.4327581524848938,
                        "y": 1.9741051197052002,
                        "z": -1.4226912260055542
                    },
                    "normal": {
                        "x": -0.9256699681282043,
                        "y": 0.0009376676171086729,
                        "z": 0.3783307373523712
                    }
                },
                {
                    "position": {
                        "x": 0.4326920509338379,
                        "y": -3.1187961101531982,
                        "z": -1.567875862121582
                    },
                    "normal": {
                        "x": -0.5816596150398254,
                        "y": -3.1343054729404685e-07,
                        "z": 0.8134323358535767
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -3.661008834838867,
                        "z": 1.444075584411621
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 3.7232518934615655e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.4077090322971344,
                        "z": -1.9335496425628662
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -4.474499702453613,
                        "z": 1.4440752267837524
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 3.624736564233899e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -4.967815399169922,
                        "z": 0.4440751075744629
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": -2.384185791015625e-07
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -2.062427282333374,
                        "z": -1.785826325416565
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -3.718672752380371,
                        "z": -0.9529249668121338
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": 0.5877745151519775,
                        "y": 6.288706302642822,
                        "z": -0.3671867251396179
                    },
                    "normal": {
                        "x": -0.8047122955322266,
                        "y": -0.5780361890792847,
                        "z": 0.13532233238220215
                    }
                }
            ]
        },
        "Hulls_hull.tall": {
            "collection": "Hulls",
            "object_name": "hull.tall",
            "dimensions": {
                "width": 2.4415977001190186,
                "height": 14.524029731750488,
                "depth": 8.029149055480957
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.6218180656433105,
                        "z": -6.953186988830566
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.7032507658004761,
                        "z": -0.7109417915344238
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.7883696556091309,
                        "z": 7.262014865875244
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.7883696556091309,
                        "z": -7.262014865875244
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.0008281469345092773,
                        "z": -7.262014865875244
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 1.4700829982757568,
                        "z": -3.813124656677246
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.9985461235046387,
                        "z": 0.053904782980680466
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -4.24138069152832,
                        "z": -6.404097080230713
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9218114018440247,
                        "z": -0.3876385986804962
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -3.4101810455322266,
                        "z": -4.917638778686523
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 3.4360296726226807,
                        "z": 1.6230623722076416
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 3.4360296726226807,
                        "z": -1.6230623722076416
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 3.4360296726226807,
                        "z": 1.1024770736694336
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 3.4360296726226807,
                        "z": -1.1024770736694336
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -3.74044132232666,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -7.450580596923828e-09,
                        "y": 0.795362114906311,
                        "z": -6.511538028717041
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.8922793865203857,
                        "z": -0.45148351788520813
                    }
                },
                {
                    "position": {
                        "x": 7.450580596923828e-09,
                        "y": 0.795362114906311,
                        "z": 6.511538028717041
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.8922793865203857,
                        "z": 0.45148351788520813
                    }
                },
                {
                    "position": {
                        "x": -7.450580596923828e-09,
                        "y": 1.8417198657989502,
                        "z": 3.2357497215270996
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 1.8417198657989502,
                        "z": 3.622260332107544
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -7.450580596923828e-09,
                        "y": 1.468064308166504,
                        "z": 5.210635185241699
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.9999999403953552,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.4901161193847656e-08,
                        "y": 1.468064308166504,
                        "z": 4.816911220550537
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.4901161193847656e-08,
                        "y": -4.505688667297363,
                        "z": 6.515511512756348
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9204673171043396,
                        "z": 0.39081957936286926
                    }
                },
                {
                    "position": {
                        "x": -0.5662699341773987,
                        "y": -2.5775370597839355,
                        "z": 2.4234137535095215
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 3.331294635700033e-07
                    }
                },
                {
                    "position": {
                        "x": 0.5662699341773987,
                        "y": -2.5775370597839355,
                        "z": 2.4234137535095215
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 3.331294635700033e-07
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -3.4337315559387207,
                        "z": 2.49595308303833
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9907501935958862,
                        "z": -0.1356983780860901
                    }
                },
                {
                    "position": {
                        "x": 1.196711540222168,
                        "y": -2.4354770183563232,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.196711540222168,
                        "y": -2.435476779937744,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Hulls_hull.knuckle": {
            "collection": "Hulls",
            "object_name": "hull.knuckle",
            "dimensions": {
                "width": 2.4540929794311523,
                "height": 3.026242256164551,
                "depth": 9.58796215057373
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.8224996328353882,
                        "y": 1.2883957624435425,
                        "z": -0.5184232592582703
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 4.007588074728119e-07,
                        "z": -7.090893916483765e-08
                    }
                },
                {
                    "position": {
                        "x": 0.8224996328353882,
                        "y": 1.2883957624435425,
                        "z": -0.5184232592582703
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 4.007588074728119e-07,
                        "z": -7.090893916483765e-08
                    }
                },
                {
                    "position": {
                        "x": -0.8224307298660278,
                        "y": 0.34843504428863525,
                        "z": -0.42663493752479553
                    },
                    "normal": {
                        "x": -0.9999988079071045,
                        "y": -0.0014925864525139332,
                        "z": -0.0002088362380163744
                    }
                },
                {
                    "position": {
                        "x": 0.8224307298660278,
                        "y": 0.34843504428863525,
                        "z": -0.42663493752479553
                    },
                    "normal": {
                        "x": 0.9999988079071045,
                        "y": -0.0014925864525139332,
                        "z": -0.0002088362380163744
                    }
                },
                {
                    "position": {
                        "x": -0.8223955035209656,
                        "y": 2.1431686878204346,
                        "z": -0.42490559816360474
                    },
                    "normal": {
                        "x": -0.9999973177909851,
                        "y": 0.002316468395292759,
                        "z": -0.00032080913661047816
                    }
                },
                {
                    "position": {
                        "x": 0.8223955035209656,
                        "y": 2.1431689262390137,
                        "z": -0.42490559816360474
                    },
                    "normal": {
                        "x": 0.9999973177909851,
                        "y": 0.002316468395292759,
                        "z": -0.00032080913661047816
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 3.5142149925231934,
                        "z": -0.3736615478992462
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.777887225151062,
                        "z": -0.6284039616584778
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.3462953567504883,
                        "z": -1.1531778573989868
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -3.332195520401001,
                        "z": -1.1531778573989868
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -7.450580596923828e-09,
                        "y": -4.793981075286865,
                        "z": -0.11253651976585388
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 7.450580596923828e-09,
                        "y": -4.616621494293213,
                        "z": 0.7182360887527466
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.6578822135925293,
                        "z": 0.7531207799911499
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -3.430630683898926,
                        "z": 1.106367826461792
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.40864959359169006,
                        "z": 0.9126913547515869
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.8945225477218628,
                        "z": 1.3395686149597168
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 3.51010799407959,
                        "z": 1.5131211280822754
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -7.450580596923828e-09,
                        "y": 2.6254324913024902,
                        "z": 1.5131211280822754
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 1.3104896545410156,
                        "z": 1.3503358364105225
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.285870224237442,
                        "z": 0.9582682847976685
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 4.793980121612549,
                        "z": 0.8056016564369202
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.4901161193847656e-08,
                        "y": 2.8216073513031006,
                        "z": -1.0576759576797485
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.6076512932777405,
                        "z": -0.7942039966583252
                    }
                },
                {
                    "position": {
                        "x": -1.4901161193847656e-08,
                        "y": 1.3719961643218994,
                        "z": -1.513121247291565
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Hulls_hull.joined": {
            "collection": "Hulls",
            "object_name": "hull.joined",
            "dimensions": {
                "width": 6.083013534545898,
                "height": 2.3200674057006836,
                "depth": 9.248125076293945
            },
            "face_information": [
                {
                    "position": {
                        "x": -1.641841173171997,
                        "y": 2.1556239128112793,
                        "z": 0.6337013840675354
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.641841173171997,
                        "y": 2.1556239128112793,
                        "z": 0.6337013840675354
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.6418405771255493,
                        "y": 2.1556241512298584,
                        "z": -0.5549154877662659
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 1.6418405771255493,
                        "y": 2.1556241512298584,
                        "z": -0.5549154877662659
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -1.6418414115905762,
                        "y": 0.5055338144302368,
                        "z": -0.8180815577507019
                    },
                    "normal": {
                        "x": 9.076114082517961e-08,
                        "y": 0.4991959035396576,
                        "z": -0.8664891719818115
                    }
                },
                {
                    "position": {
                        "x": 1.6418414115905762,
                        "y": 0.5055338144302368,
                        "z": -0.8180814981460571
                    },
                    "normal": {
                        "x": -9.076114082517961e-08,
                        "y": 0.4991959035396576,
                        "z": -0.8664891719818115
                    }
                },
                {
                    "position": {
                        "x": -1.6418421268463135,
                        "y": 0.5055338144302368,
                        "z": 0.8968675136566162
                    },
                    "normal": {
                        "x": 9.076114793060697e-08,
                        "y": 0.4991960823535919,
                        "z": 0.866489052772522
                    }
                },
                {
                    "position": {
                        "x": 1.6418421268463135,
                        "y": 0.5055338144302368,
                        "z": 0.8968675136566162
                    },
                    "normal": {
                        "x": -9.076114793060697e-08,
                        "y": 0.4991960823535919,
                        "z": 0.866489052772522
                    }
                },
                {
                    "position": {
                        "x": -1.6418414115905762,
                        "y": -1.2663583755493164,
                        "z": -0.8715246915817261
                    },
                    "normal": {
                        "x": -2.6339170844380533e-08,
                        "y": -0.23089823126792908,
                        "z": -0.9729779362678528
                    }
                },
                {
                    "position": {
                        "x": 1.6418414115905762,
                        "y": -1.2663583755493164,
                        "z": -0.8715246915817261
                    },
                    "normal": {
                        "x": 2.6339170844380533e-08,
                        "y": -0.23089823126792908,
                        "z": -0.9729779362678528
                    }
                },
                {
                    "position": {
                        "x": -1.6418421268463135,
                        "y": -1.2663583755493164,
                        "z": 0.9503093957901001
                    },
                    "normal": {
                        "x": -2.633917617345105e-08,
                        "y": -0.23089830577373505,
                        "z": 0.9729779362678528
                    }
                },
                {
                    "position": {
                        "x": 1.6418421268463135,
                        "y": -1.2663583755493164,
                        "z": 0.9503093957901001
                    },
                    "normal": {
                        "x": 2.633917617345105e-08,
                        "y": -0.23089830577373505,
                        "z": 0.9729779362678528
                    }
                },
                {
                    "position": {
                        "x": -2.4474077224731445,
                        "y": 2.7495200634002686,
                        "z": 0.03939312696456909
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 6.556511493727157e-07,
                        "z": -7.112262778719014e-07
                    }
                },
                {
                    "position": {
                        "x": 2.4474077224731445,
                        "y": 2.7495200634002686,
                        "z": 0.03939312696456909
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 6.556511493727157e-07,
                        "z": -7.112262778719014e-07
                    }
                },
                {
                    "position": {
                        "x": -1.3315098285675049,
                        "y": -3.5592799186706543,
                        "z": -0.686035692691803
                    },
                    "normal": {
                        "x": -0.5229028463363647,
                        "y": 0.0,
                        "z": -0.852392315864563
                    }
                },
                {
                    "position": {
                        "x": 1.3315098285675049,
                        "y": -3.5592799186706543,
                        "z": -0.686035692691803
                    },
                    "normal": {
                        "x": 0.5229028463363647,
                        "y": 0.0,
                        "z": -0.852392315864563
                    }
                },
                {
                    "position": {
                        "x": 2.9802322387695312e-08,
                        "y": -4.522697925567627,
                        "z": 0.039392441511154175
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999999403953552,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -4.522697925567627,
                        "z": 0.5832217335700989
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -4.522697925567627,
                        "z": -0.504436731338501
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -3.5592799186706543,
                        "z": 0.9107758402824402
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -7.450580596923828e-09,
                        "y": -4.522697925567627,
                        "z": -0.7715965509414673
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -3.5592799186706543,
                        "z": -1.0134121179580688
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.15045657753944397,
                        "z": -0.9886166453361511
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -2.372985363006592,
                        "z": -1.1600337028503418
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.677736759185791,
                        "z": -1.1600337028503418
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -3.041506290435791,
                        "y": -0.2097378969192505,
                        "z": 0.03939235210418701
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": 2.1682326344519415e-13,
                        "z": -6.017546638759086e-07
                    }
                },
                {
                    "position": {
                        "x": 3.04150652885437,
                        "y": -0.2097378969192505,
                        "z": 0.03939235210418701
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 2.1682326344519415e-13,
                        "z": -6.017546638759086e-07
                    }
                },
                {
                    "position": {
                        "x": -3.041506290435791,
                        "y": -1.3581920862197876,
                        "z": 0.03939211368560791
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": 9.020970683773152e-14,
                        "z": -7.402987876048428e-07
                    }
                },
                {
                    "position": {
                        "x": 3.04150652885437,
                        "y": -1.3581920862197876,
                        "z": 0.03939212113618851
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 9.020970683773152e-14,
                        "z": -7.402987876048428e-07
                    }
                },
                {
                    "position": {
                        "x": 1.4901161193847656e-08,
                        "y": 3.136108636856079,
                        "z": 0.5257793068885803
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.8796552419662476,
                        "y": 3.9885053634643555,
                        "z": 0.04932759702205658
                    },
                    "normal": {
                        "x": 0.5273483991622925,
                        "y": 0.8496491312980652,
                        "z": 7.097004868228396e-07
                    }
                },
                {
                    "position": {
                        "x": -1.8842171430587769,
                        "y": 3.9856739044189453,
                        "z": 0.04932759702205658
                    },
                    "normal": {
                        "x": -0.5273484587669373,
                        "y": 0.8496491312980652,
                        "z": 4.21019393570532e-07
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 4.6240620613098145,
                        "z": 0.17547085881233215
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.8029758334159851,
                        "z": 0.5960116386413574
                    }
                }
            ]
        },
        "Hulls_hull.block_split": {
            "collection": "Hulls",
            "object_name": "hull.block_split",
            "dimensions": {
                "width": 3.064769744873047,
                "height": 2.1798691749572754,
                "depth": 4.7654805183410645
            },
            "face_information": [
                {
                    "position": {
                        "x": -1.1143004894256592,
                        "y": -0.8103212714195251,
                        "z": -0.626167893409729
                    },
                    "normal": {
                        "x": -0.28198152780532837,
                        "y": 8.805479723150711e-08,
                        "z": -0.9594197869300842
                    }
                },
                {
                    "position": {
                        "x": 1.1143004894256592,
                        "y": -0.8103212714195251,
                        "z": -0.626167893409729
                    },
                    "normal": {
                        "x": 0.28198152780532837,
                        "y": 8.805479723150711e-08,
                        "z": -0.9594197869300842
                    }
                },
                {
                    "position": {
                        "x": -0.5444386601448059,
                        "y": -1.0477252006530762,
                        "z": -0.8001031279563904
                    },
                    "normal": {
                        "x": 0.04965163394808769,
                        "y": -0.4539729952812195,
                        "z": -0.889630913734436
                    }
                },
                {
                    "position": {
                        "x": 0.5444386601448059,
                        "y": -1.0477252006530762,
                        "z": -0.8001031279563904
                    },
                    "normal": {
                        "x": -0.04965163394808769,
                        "y": -0.4539729952812195,
                        "z": -0.889630913734436
                    }
                },
                {
                    "position": {
                        "x": -1.2270762920379639,
                        "y": -2.382740020751953,
                        "z": 0.04329966753721237
                    },
                    "normal": {
                        "x": -1.0432087265144219e-06,
                        "y": -1.0,
                        "z": -3.9287860074607717e-13
                    }
                },
                {
                    "position": {
                        "x": 1.2270762920379639,
                        "y": -2.382740020751953,
                        "z": 0.04329966753721237
                    },
                    "normal": {
                        "x": 1.0432087265144219e-06,
                        "y": -1.0,
                        "z": -3.9287860074607717e-13
                    }
                },
                {
                    "position": {
                        "x": -1.2270760536193848,
                        "y": -2.382740020751953,
                        "z": -0.35237017273902893
                    },
                    "normal": {
                        "x": -1.0432087265144219e-06,
                        "y": -1.0,
                        "z": -3.1430286433382915e-13
                    }
                },
                {
                    "position": {
                        "x": 1.2270761728286743,
                        "y": -2.382740020751953,
                        "z": -0.3523702025413513
                    },
                    "normal": {
                        "x": 1.0432087265144219e-06,
                        "y": -1.0,
                        "z": -3.1430286433382915e-13
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.12197545170783997,
                        "z": -1.0899345874786377
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.6946138143539429,
                        "y": 1.8261702060699463,
                        "z": 0.4729907810688019
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 4.344789488186507e-07,
                        "z": -8.003865303862767e-08
                    }
                },
                {
                    "position": {
                        "x": 0.6946138143539429,
                        "y": 1.8261702060699463,
                        "z": 0.4729907810688019
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 4.344789488186507e-07,
                        "z": -8.003865303862767e-08
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 2.382739782333374,
                        "z": 0.4729909896850586
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": -0.4665679931640625,
                        "y": 2.382740020751953,
                        "z": 0.4729909896850586
                    },
                    "normal": {
                        "x": 5.227431643106684e-07,
                        "y": 1.0,
                        "z": 4.046595449835877e-07
                    }
                },
                {
                    "position": {
                        "x": 0.4665680229663849,
                        "y": 2.382740020751953,
                        "z": 0.4729909300804138
                    },
                    "normal": {
                        "x": -5.227431643106684e-07,
                        "y": 1.0,
                        "z": 4.046595449835877e-07
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.22382058203220367,
                        "z": 0.8046499490737915
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.19353561103343964,
                        "z": 0.9810932874679565
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 1.7169585227966309,
                        "z": 1.0899345874786377
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -2.466643707066396e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 1.189231514930725,
                        "z": 1.0899344682693481
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.3704429864883423,
                        "y": 1.6620466709136963,
                        "z": -0.4023771286010742
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.6931641101837158,
                        "z": -0.7207798361778259
                    }
                },
                {
                    "position": {
                        "x": 0.3704429864883423,
                        "y": 1.6620466709136963,
                        "z": -0.4023771286010742
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.6931641101837158,
                        "z": -0.7207798361778259
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.629741907119751,
                        "z": 0.014031194150447845
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.629741907119751,
                        "z": -0.3231015205383301
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Hulls_hull.compact": {
            "collection": "Hulls",
            "object_name": "hull.compact",
            "dimensions": {
                "width": 1.0246868133544922,
                "height": 1.3710373640060425,
                "depth": 3.2595911026000977
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.3170506954193115,
                        "y": 0.5464286804199219,
                        "z": -0.36517760157585144
                    },
                    "normal": {
                        "x": 0.4970422089099884,
                        "y": -3.215776089859901e-08,
                        "z": -0.8677263259887695
                    }
                },
                {
                    "position": {
                        "x": 1.1175870895385742e-07,
                        "y": 0.5464286804199219,
                        "z": -0.4559824466705322
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.3170504868030548,
                        "y": 0.5464286804199219,
                        "z": -0.36517760157585144
                    },
                    "normal": {
                        "x": -0.49704214930534363,
                        "y": 1.554291628735882e-07,
                        "z": -0.8677263855934143
                    }
                },
                {
                    "position": {
                        "x": 1.7881393432617188e-07,
                        "y": 1.2413643598556519,
                        "z": 0.47140535712242126
                    },
                    "normal": {
                        "x": 5.639917048938514e-07,
                        "y": 1.0,
                        "z": 1.3918948127411568e-07
                    }
                },
                {
                    "position": {
                        "x": -1.1175870895385742e-08,
                        "y": 0.7657884359359741,
                        "z": 0.6855186820030212
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.3170505464076996,
                        "y": -0.3741843104362488,
                        "z": -0.5947138071060181
                    },
                    "normal": {
                        "x": 0.4970422089099884,
                        "y": -1.3344912019874755e-07,
                        "z": -0.8677263855934143
                    }
                },
                {
                    "position": {
                        "x": -8.195638656616211e-08,
                        "y": -0.46146857738494873,
                        "z": -0.6855186223983765
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.7761288972906186e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.3170507252216339,
                        "y": -0.374184250831604,
                        "z": -0.5947137475013733
                    },
                    "normal": {
                        "x": -0.4970419704914093,
                        "y": 3.387553135780763e-07,
                        "z": -0.8677264451980591
                    }
                },
                {
                    "position": {
                        "x": 0.36110883951187134,
                        "y": 1.1938073635101318,
                        "z": -0.14007627964019775
                    },
                    "normal": {
                        "x": 0.9721025824546814,
                        "y": 0.2345561385154724,
                        "z": -4.946542730976944e-07
                    }
                },
                {
                    "position": {
                        "x": -0.3611081540584564,
                        "y": 1.1938073635101318,
                        "z": -0.14007627964019775
                    },
                    "normal": {
                        "x": -0.972102165222168,
                        "y": 0.2345576286315918,
                        "z": -1.349055906985086e-07
                    }
                },
                {
                    "position": {
                        "x": -4.6566128730773926e-07,
                        "y": -1.1977282762527466,
                        "z": 0.5528357028961182
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -3.2782554626464844e-07,
                        "y": -1.6297955513000488,
                        "z": 0.009840978309512138
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -3.762543201446533e-07,
                        "y": -1.6297955513000488,
                        "z": 0.3387223780155182
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -3.203749656677246e-07,
                        "y": -1.528336524963379,
                        "z": -0.20425257086753845
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9007161259651184,
                        "z": -0.4344083070755005
                    }
                },
                {
                    "position": {
                        "x": -3.203749656677246e-07,
                        "y": -1.4804327487945557,
                        "z": -0.3908073306083679
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -3.427267074584961e-07,
                        "y": -0.256214439868927,
                        "z": 0.5904160737991333
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.512343168258667,
                        "y": 0.5213382244110107,
                        "z": -0.11822029203176498
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -1.768039510352537e-07,
                        "z": 1.1451222547975703e-07
                    }
                },
                {
                    "position": {
                        "x": 0.5123431086540222,
                        "y": 0.5213380455970764,
                        "z": 0.16124063730239868
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -4.950510970047617e-07,
                        "z": -8.204467514443328e-14
                    }
                },
                {
                    "position": {
                        "x": -0.5123429298400879,
                        "y": 0.5213384628295898,
                        "z": -0.11822029203176498
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 3.1824703228267026e-07,
                        "z": -1.1451236758830419e-07
                    }
                },
                {
                    "position": {
                        "x": -0.5123429894447327,
                        "y": 0.5213384032249451,
                        "z": 0.16124063730239868
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 2.8288627618167084e-07,
                        "z": -5.800537792310934e-07
                    }
                },
                {
                    "position": {
                        "x": -0.5123432278633118,
                        "y": -0.09016591310501099,
                        "z": 0.1612406075000763
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 8.884131830200204e-07,
                        "z": -5.800540066047688e-07
                    }
                },
                {
                    "position": {
                        "x": -0.512343168258667,
                        "y": -0.09016591310501099,
                        "z": -0.11822032183408737
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 8.884129556463449e-07,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.5123427510261536,
                        "y": -0.09016624093055725,
                        "z": 0.1612406224012375
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -7.77361378823116e-07,
                        "z": 7.250668545566441e-07
                    }
                },
                {
                    "position": {
                        "x": 0.5123429298400879,
                        "y": -0.09016609191894531,
                        "z": -0.11822031438350677
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -6.663098588433058e-07,
                        "z": 6.870740207887138e-07
                    }
                },
                {
                    "position": {
                        "x": 0.31705084443092346,
                        "y": 1.1930822134017944,
                        "z": 0.1688077300786972
                    },
                    "normal": {
                        "x": 0.34327512979507446,
                        "y": 0.9392349123954773,
                        "z": -1.2003737026589079e-07
                    }
                },
                {
                    "position": {
                        "x": -0.31705039739608765,
                        "y": 1.193082332611084,
                        "z": 0.1688077300786972
                    },
                    "normal": {
                        "x": -0.3432753384113312,
                        "y": 0.9392347931861877,
                        "z": 1.050326972062976e-07
                    }
                },
                {
                    "position": {
                        "x": 4.377216100692749e-07,
                        "y": 1.6297955513000488,
                        "z": -0.27322569489479065
                    },
                    "normal": {
                        "x": 5.412362611423305e-07,
                        "y": 1.0,
                        "z": 3.47427004498968e-07
                    }
                }
            ]
        },
        "Hulls_hull.horse": {
            "collection": "Hulls",
            "object_name": "hull.horse",
            "dimensions": {
                "width": 1.3748912811279297,
                "height": 2.3733558654785156,
                "depth": 5.896114349365234
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.00036329030990600586,
                        "y": 2.945826292037964,
                        "z": 0.696051299571991
                    },
                    "normal": {
                        "x": -0.00011037426884286106,
                        "y": 0.9999843239784241,
                        "z": 0.005599407944828272
                    }
                },
                {
                    "position": {
                        "x": -0.35454851388931274,
                        "y": 0.8719560503959656,
                        "z": -0.7929558157920837
                    },
                    "normal": {
                        "x": -0.9053052663803101,
                        "y": 3.847255314326503e-08,
                        "z": -0.4247616231441498
                    }
                },
                {
                    "position": {
                        "x": 0.3545484244823456,
                        "y": 0.8719552159309387,
                        "z": -0.7929558157920837
                    },
                    "normal": {
                        "x": 0.9053052067756653,
                        "y": 0.0,
                        "z": -0.42476168274879456
                    }
                },
                {
                    "position": {
                        "x": -0.35454854369163513,
                        "y": -0.24852217733860016,
                        "z": -0.6977487802505493
                    },
                    "normal": {
                        "x": -0.938936710357666,
                        "y": -0.06494299322366714,
                        "z": -0.33790552616119385
                    }
                },
                {
                    "position": {
                        "x": 0.3545484244823456,
                        "y": -0.24852275848388672,
                        "z": -0.6977487802505493
                    },
                    "normal": {
                        "x": 0.9389366507530212,
                        "y": -0.06494304537773132,
                        "z": -0.3379056453704834
                    }
                },
                {
                    "position": {
                        "x": -6.258487701416016e-07,
                        "y": -2.164484977722168,
                        "z": 0.7794837951660156
                    },
                    "normal": {
                        "x": -5.446643028088338e-13,
                        "y": -3.629872082910879e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.00018323957920074463,
                        "y": 2.946272134780884,
                        "z": 1.0608826875686646
                    },
                    "normal": {
                        "x": -7.158214430091903e-05,
                        "y": 0.9998993873596191,
                        "z": -0.014183985069394112
                    }
                },
                {
                    "position": {
                        "x": 7.450580596923828e-07,
                        "y": 2.3737077713012695,
                        "z": 1.1866775751113892
                    },
                    "normal": {
                        "x": -9.08111801901923e-13,
                        "y": -6.226663913366792e-07,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 3.650784492492676e-07,
                        "y": 1.4080085754394531,
                        "z": 1.1866772174835205
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -8.568167686462402e-08,
                        "y": -0.3104287087917328,
                        "z": 0.7813841104507446
                    },
                    "normal": {
                        "x": -2.0839112835346896e-07,
                        "y": -0.06623035669326782,
                        "z": 0.9978044033050537
                    }
                },
                {
                    "position": {
                        "x": -0.6874455213546753,
                        "y": 0.8719558119773865,
                        "z": -0.02634844183921814
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 9.535136058502758e-08,
                        "z": -3.8881179875716043e-07
                    }
                },
                {
                    "position": {
                        "x": 0.6874454617500305,
                        "y": 0.8719548583030701,
                        "z": -0.02634844183921814
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -1.1918920250764131e-07,
                        "z": -3.240101023038733e-07
                    }
                },
                {
                    "position": {
                        "x": -2.0287930965423584e-05,
                        "y": 2.195708751678467,
                        "z": 0.06417100131511688
                    },
                    "normal": {
                        "x": 0.0014739520847797394,
                        "y": 0.46732160449028015,
                        "z": -0.8840861916542053
                    }
                },
                {
                    "position": {
                        "x": -4.0978193283081055e-07,
                        "y": -1.7377303838729858,
                        "z": 0.7794838547706604
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -9.685754776000977e-08,
                        "y": -1.8008642196655273,
                        "z": -0.5175172686576843
                    },
                    "normal": {
                        "x": -5.521069965652714e-07,
                        "y": -0.9103609919548035,
                        "z": -0.41381484270095825
                    }
                },
                {
                    "position": {
                        "x": 0.6230556964874268,
                        "y": -2.496037483215332,
                        "z": 0.07531572878360748
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -1.3519204458134482e-06,
                        "z": 7.85284782978124e-07
                    }
                },
                {
                    "position": {
                        "x": -0.6230568885803223,
                        "y": -2.4960362911224365,
                        "z": 0.07531573623418808
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 1.3969844303574064e-06,
                        "z": -2.8046093802913674e-07
                    }
                },
                {
                    "position": {
                        "x": 4.6566128730773926e-07,
                        "y": 1.6804860830307007,
                        "z": -0.9844822883605957
                    },
                    "normal": {
                        "x": 3.853714133583708e-06,
                        "y": 1.0,
                        "z": -2.8400618987643733e-13
                    }
                },
                {
                    "position": {
                        "x": 4.470348358154297e-07,
                        "y": 0.9919817447662354,
                        "z": -1.1866779327392578
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 4.3585896492004395e-07,
                        "y": 0.10596480965614319,
                        "z": -1.1866779327392578
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -8.046627044677734e-07,
                        "y": -2.948056697845459,
                        "z": -0.2514338493347168
                    },
                    "normal": {
                        "x": -6.068173661333276e-07,
                        "y": -1.0,
                        "z": -5.790386616369436e-13
                    }
                },
                {
                    "position": {
                        "x": -9.238719940185547e-07,
                        "y": -2.94805645942688,
                        "z": 0.16832402348518372
                    },
                    "normal": {
                        "x": -1.156586336037435e-06,
                        "y": -0.9999999403953552,
                        "z": -4.589866898010997e-13
                    }
                }
            ]
        },
        "Hulls_hull.angle": {
            "collection": "Hulls",
            "object_name": "hull.angle",
            "dimensions": {
                "width": 1.1529173851013184,
                "height": 2.168290376663208,
                "depth": 5.1139984130859375
            },
            "face_information": [
                {
                    "position": {
                        "x": 7.450580596923828e-09,
                        "y": 0.14111395180225372,
                        "z": -0.6557404398918152
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -2.60770320892334e-07,
                        "y": -1.2497587203979492,
                        "z": 0.8901069760322571
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -2.3096799850463867e-07,
                        "y": -1.1452804803848267,
                        "z": -0.40261363983154297
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 7.860362529754639e-07,
                        "y": 2.892300605773926,
                        "z": 1.236268401145935
                    },
                    "normal": {
                        "x": 1.0655420510374825e-06,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.7136335372924805e-07,
                        "y": 1.257861852645874,
                        "z": -0.4244629740715027
                    },
                    "normal": {
                        "x": 7.472099383676323e-08,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 1.043081283569336e-07,
                        "y": 0.8716598749160767,
                        "z": 1.3944242000579834
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -2.4586915969848633e-07,
                        "y": -2.2216975688934326,
                        "z": 0.1928229033946991
                    },
                    "normal": {
                        "x": -5.7773269190875e-07,
                        "y": -1.0,
                        "z": -2.4177924728974176e-07
                    }
                }
            ]
        },
        "Hulls_hull.lump": {
            "collection": "Hulls",
            "object_name": "hull.lump",
            "dimensions": {
                "width": 2.2574493885040283,
                "height": 2.827028751373291,
                "depth": 8.193129539489746
            },
            "face_information": [
                {
                    "position": {
                        "x": 8.940696716308594e-08,
                        "y": 0.4943996071815491,
                        "z": -1.0425173044204712
                    },
                    "normal": {
                        "x": -1.6141859759954968e-07,
                        "y": -0.6793705821037292,
                        "z": -0.7337952852249146
                    }
                },
                {
                    "position": {
                        "x": 9.98377799987793e-07,
                        "y": 4.278010368347168,
                        "z": 1.046254277229309
                    },
                    "normal": {
                        "x": -7.512593214187291e-08,
                        "y": -0.2745150923728943,
                        "z": 0.9615828394889832
                    }
                },
                {
                    "position": {
                        "x": 8.940696716308594e-07,
                        "y": 4.739656448364258,
                        "z": -0.8554085493087769
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.8284882307052612,
                        "z": -0.5600064992904663
                    }
                },
                {
                    "position": {
                        "x": 3.241002559661865e-07,
                        "y": 1.3620790243148804,
                        "z": 1.1717572212219238
                    },
                    "normal": {
                        "x": -1.3427512612906867e-07,
                        "y": -0.4982174038887024,
                        "z": 0.8670521378517151
                    }
                },
                {
                    "position": {
                        "x": 5.662441253662109e-07,
                        "y": 2.4857640266418457,
                        "z": 1.3831151723861694
                    },
                    "normal": {
                        "x": -1.9033356162857784e-13,
                        "y": -3.1542802503281564e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 2.980232238769531e-07,
                        "y": 1.36207914352417,
                        "z": -1.2021563053131104
                    },
                    "normal": {
                        "x": -6.232785665361007e-08,
                        "y": -0.5492441654205322,
                        "z": -0.8356619477272034
                    }
                },
                {
                    "position": {
                        "x": 5.438923835754395e-07,
                        "y": 2.4857640266418457,
                        "z": -1.4439131021499634
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.577139840946984e-07,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.8900190591812134,
                        "y": 2.4612386226654053,
                        "z": 2.905726432800293e-07
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 3.9610924318367324e-07,
                        "z": -5.245223633210117e-07
                    }
                },
                {
                    "position": {
                        "x": 0.8900200724601746,
                        "y": 2.461238384246826,
                        "z": 2.905726432800293e-07
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -4.4271033061704657e-07,
                        "z": -7.34331422336254e-07
                    }
                },
                {
                    "position": {
                        "x": -1.6242265701293945e-06,
                        "y": -2.9975929260253906,
                        "z": 0.5061944723129272
                    },
                    "normal": {
                        "x": -6.42711484033498e-07,
                        "y": -0.5736860632896423,
                        "z": 0.819075345993042
                    }
                },
                {
                    "position": {
                        "x": -1.8849968910217285e-06,
                        "y": -3.256704092025757,
                        "z": -3.8743019104003906e-07
                    },
                    "normal": {
                        "x": -4.910346547148947e-07,
                        "y": -1.0,
                        "z": -1.8027032232421913e-13
                    }
                },
                {
                    "position": {
                        "x": -2.7194619178771973e-07,
                        "y": -1.028977632522583,
                        "z": -1.2770813703536987
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -3.8370490074157715e-07,
                        "y": -1.028977870941162,
                        "z": 1.2770812511444092
                    },
                    "normal": {
                        "x": -8.017065201808282e-13,
                        "y": -4.0815623947310087e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -6.109476089477539e-07,
                        "y": -1.9918301105499268,
                        "z": 1.0466737747192383
                    },
                    "normal": {
                        "x": -7.26520738680847e-07,
                        "y": -0.40203243494033813,
                        "z": 0.9156253933906555
                    }
                },
                {
                    "position": {
                        "x": -4.6938657760620117e-07,
                        "y": -1.9918298721313477,
                        "z": -1.0466742515563965
                    },
                    "normal": {
                        "x": -1.8163021309192118e-07,
                        "y": -0.4020323157310486,
                        "z": -0.9156255125999451
                    }
                },
                {
                    "position": {
                        "x": -0.835240364074707,
                        "y": -1.9606752395629883,
                        "z": 0.40895041823387146
                    },
                    "normal": {
                        "x": 5.221246013320524e-08,
                        "y": 2.9729241290965547e-09,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.8352377414703369,
                        "y": -1.9606761932373047,
                        "z": 0.40895041823387146
                    },
                    "normal": {
                        "x": -5.221260934717975e-08,
                        "y": 2.9729636530362313e-09,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.8071357011795044,
                        "y": -2.6204938888549805,
                        "z": 0.32008230686187744
                    },
                    "normal": {
                        "x": -0.2675703763961792,
                        "y": -0.4542892575263977,
                        "z": 0.8497219085693359
                    }
                },
                {
                    "position": {
                        "x": 0.807132363319397,
                        "y": -2.620494842529297,
                        "z": 0.32008230686187744
                    },
                    "normal": {
                        "x": 0.267570823431015,
                        "y": -0.4542897939682007,
                        "z": 0.8497214913368225
                    }
                },
                {
                    "position": {
                        "x": 0.8071322441101074,
                        "y": -2.786717176437378,
                        "z": -0.0006174370646476746
                    },
                    "normal": {
                        "x": 0.2822478413581848,
                        "y": -0.9593415260314941,
                        "z": -8.987900628198986e-07
                    }
                },
                {
                    "position": {
                        "x": -0.807135820388794,
                        "y": -2.7867166996002197,
                        "z": -0.0006174370646476746
                    },
                    "normal": {
                        "x": -0.28224802017211914,
                        "y": -0.9593415260314941,
                        "z": 9.347422746941447e-07
                    }
                },
                {
                    "position": {
                        "x": -1.1287263631820679,
                        "y": -1.8185701370239258,
                        "z": -0.0006174147129058838
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.1287230253219604,
                        "y": -1.8185707330703735,
                        "z": -0.0006174147129058838
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.1287230253219604,
                        "y": -2.431081771850586,
                        "z": -0.0006174258887767792
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.1287263631820679,
                        "y": -2.4310812950134277,
                        "z": -0.0006174258887767792
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Hulls_hull.handle": {
            "collection": "Hulls",
            "object_name": "hull.handle",
            "dimensions": {
                "width": 1.4131731986999512,
                "height": 1.7279329299926758,
                "depth": 5.876346588134766
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.1780560165643692,
                        "y": -1.7758516073226929,
                        "z": -0.6661291122436523
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.1479501873254776,
                        "y": 0.2523092031478882,
                        "z": 0.8305805325508118
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.12041492760181427,
                        "y": 1.436169147491455,
                        "z": -0.33045676350593567
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 3.8917070810384757e-07,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.06641975045204163,
                        "y": 2.4021964073181152,
                        "z": 0.4036077857017517
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.15361425280570984,
                        "y": 1.1783413887023926,
                        "z": 0.9532116651535034
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.1312071681022644,
                        "y": -3.4383950233459473,
                        "z": 0.06449878215789795
                    },
                    "normal": {
                        "x": 9.085577516998455e-07,
                        "y": 1.0,
                        "z": -6.38761207483185e-07
                    }
                },
                {
                    "position": {
                        "x": 0.6280859112739563,
                        "y": -2.7307240962982178,
                        "z": 0.1680324673652649
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 3.144154451769146e-14,
                        "z": 8.363460892724106e-07
                    }
                },
                {
                    "position": {
                        "x": 0.628086268901825,
                        "y": -3.0623955726623535,
                        "z": 0.1680324822664261
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -2.679145381989656e-06,
                        "z": 5.700150040865992e-07
                    }
                },
                {
                    "position": {
                        "x": 0.1089906096458435,
                        "y": 0.25643670558929443,
                        "z": -0.7747212648391724
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.5576153993606567,
                        "y": 0.5132460594177246,
                        "z": 0.21518363058567047
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -2.846757354291185e-07,
                        "z": -1.1061001714551821e-06
                    }
                },
                {
                    "position": {
                        "x": 0.14795047044754028,
                        "y": -2.0484883785247803,
                        "z": 0.897971510887146
                    },
                    "normal": {
                        "x": -1.7276130748200558e-08,
                        "y": 0.015022315084934235,
                        "z": -0.9998871684074402
                    }
                },
                {
                    "position": {
                        "x": 0.14795061945915222,
                        "y": -2.8622584342956543,
                        "z": 0.8701552152633667
                    },
                    "normal": {
                        "x": -1.8185008343607478e-07,
                        "y": 0.049650292843580246,
                        "z": -0.9987666606903076
                    }
                },
                {
                    "position": {
                        "x": 0.7065863609313965,
                        "y": -0.10923512279987335,
                        "z": 1.4901161193847656e-08
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": -9.078823381969414e-07
                    }
                },
                {
                    "position": {
                        "x": 0.7065863609313965,
                        "y": -0.8846425414085388,
                        "z": 1.4901161193847656e-08
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": -9.078822813535226e-07
                    }
                },
                {
                    "position": {
                        "x": 0.7065863609313965,
                        "y": -1.6600499153137207,
                        "z": 1.4901161193847656e-08
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": 0.0,
                        "z": -9.078822245101037e-07
                    }
                },
                {
                    "position": {
                        "x": 0.04772169888019562,
                        "y": 2.388965606689453,
                        "z": -0.1647464483976364
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.7457409501075745,
                        "z": 0.6662359833717346
                    }
                },
                {
                    "position": {
                        "x": -0.1780560165643692,
                        "y": -1.7758517265319824,
                        "z": -0.6661291122436523
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.1479501873254776,
                        "y": 0.2523092031478882,
                        "z": 0.8305805325508118
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.12041492760181427,
                        "y": 1.4361690282821655,
                        "z": -0.3304567337036133
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 3.8917070810384757e-07,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.06641975045204163,
                        "y": 2.4021964073181152,
                        "z": 0.4036077857017517
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.15361425280570984,
                        "y": 1.1783415079116821,
                        "z": 0.9532116651535034
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.1312071681022644,
                        "y": -3.4383952617645264,
                        "z": 0.06449877470731735
                    },
                    "normal": {
                        "x": -9.085577516998455e-07,
                        "y": 1.0,
                        "z": -6.38761207483185e-07
                    }
                },
                {
                    "position": {
                        "x": -0.6280859112739563,
                        "y": -2.7307240962982178,
                        "z": 0.1680324822664261
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 3.144154451769146e-14,
                        "z": 8.363460892724106e-07
                    }
                },
                {
                    "position": {
                        "x": -0.628086268901825,
                        "y": -3.0623955726623535,
                        "z": 0.16803249716758728
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -2.679145381989656e-06,
                        "z": 5.700150040865992e-07
                    }
                },
                {
                    "position": {
                        "x": -0.1089906096458435,
                        "y": 0.25643670558929443,
                        "z": -0.7747212648391724
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.5576153993606567,
                        "y": 0.5132460594177246,
                        "z": 0.21518364548683167
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -2.846757354291185e-07,
                        "z": -1.1061001714551821e-06
                    }
                },
                {
                    "position": {
                        "x": -0.14795047044754028,
                        "y": -2.0484883785247803,
                        "z": 0.897971510887146
                    },
                    "normal": {
                        "x": 1.7276130748200558e-08,
                        "y": 0.015022315084934235,
                        "z": -0.9998871684074402
                    }
                },
                {
                    "position": {
                        "x": -0.14795061945915222,
                        "y": -2.8622584342956543,
                        "z": 0.8701552152633667
                    },
                    "normal": {
                        "x": 1.8185008343607478e-07,
                        "y": 0.049650292843580246,
                        "z": -0.9987666606903076
                    }
                },
                {
                    "position": {
                        "x": -0.7065864205360413,
                        "y": -0.10923512279987335,
                        "z": 1.4901161193847656e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": -9.078823381969414e-07
                    }
                },
                {
                    "position": {
                        "x": -0.7065864205360413,
                        "y": -0.884642481803894,
                        "z": 1.4901161193847656e-08
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": -9.078822813535226e-07
                    }
                },
                {
                    "position": {
                        "x": -0.7065864205360413,
                        "y": -1.6600499153137207,
                        "z": 1.4901161193847656e-08
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 0.0,
                        "z": -9.078822245101037e-07
                    }
                },
                {
                    "position": {
                        "x": -0.04772169888019562,
                        "y": 2.388965606689453,
                        "z": -0.1647464483976364
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.7457409501075745,
                        "z": 0.6662359833717346
                    }
                }
            ]
        },
        "Hulls_hull.cruise": {
            "collection": "Hulls",
            "object_name": "hull.cruise",
            "dimensions": {
                "width": 1.4512782096862793,
                "height": 3.1487555503845215,
                "depth": 8.381627082824707
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.7605547904968262,
                        "y": -1.1695395708084106,
                        "z": 0.5274904370307922
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": -1.8729303974396316e-07
                    }
                },
                {
                    "position": {
                        "x": 0.3300282955169678,
                        "y": -1.169539451599121,
                        "z": 0.5274903774261475
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 5.618791192318895e-07
                    }
                },
                {
                    "position": {
                        "x": -0.2152639776468277,
                        "y": 1.880822777748108,
                        "z": -1.0558146238327026
                    },
                    "normal": {
                        "x": 5.653361867530293e-08,
                        "y": 0.14310601353645325,
                        "z": -0.989707350730896
                    }
                },
                {
                    "position": {
                        "x": -0.21526429057121277,
                        "y": 4.024706840515137,
                        "z": -0.3941057324409485
                    },
                    "normal": {
                        "x": -5.408916692317689e-08,
                        "y": 0.4818679392337799,
                        "z": -0.8762438297271729
                    }
                },
                {
                    "position": {
                        "x": -0.21526426076889038,
                        "y": 4.121598243713379,
                        "z": 0.9051501154899597
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.4209628105163574,
                        "y": 2.655263662338257,
                        "z": -0.06359747052192688
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 2.1782908277145907e-07,
                        "z": 2.52096697295201e-07
                    }
                },
                {
                    "position": {
                        "x": -0.8514910936355591,
                        "y": 2.655263900756836,
                        "z": -0.06359747052192688
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -2.4505760620741057e-07,
                        "z": 4.2016122847599036e-07
                    }
                },
                {
                    "position": {
                        "x": -0.9409021735191345,
                        "y": -1.3619563579559326,
                        "z": -0.6364854574203491
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 4.5284512140142397e-08,
                        "z": 3.552505347670376e-07
                    }
                },
                {
                    "position": {
                        "x": 0.5103751420974731,
                        "y": -1.361956238746643,
                        "z": -0.6364854574203491
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -1.5094832050976947e-08,
                        "z": -1.9128871997509123e-07
                    }
                },
                {
                    "position": {
                        "x": -0.2152632474899292,
                        "y": -2.4792356491088867,
                        "z": 0.737076461315155
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.21526318788528442,
                        "y": -3.0038492679595947,
                        "z": 0.47316211462020874
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.8950445652008057,
                        "z": 0.4459766447544098
                    }
                },
                {
                    "position": {
                        "x": -0.21526432037353516,
                        "y": 4.806170463562012,
                        "z": 0.22754916548728943
                    },
                    "normal": {
                        "x": 7.164626367739402e-07,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.21526432037353516,
                        "y": 4.7092790603637695,
                        "z": -0.28090208768844604
                    },
                    "normal": {
                        "x": 3.48013458051355e-07,
                        "y": 0.48186779022216797,
                        "z": -0.8762439489364624
                    }
                },
                {
                    "position": {
                        "x": -0.21526360511779785,
                        "y": -2.73508882522583,
                        "z": -1.7256040573120117
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.19584089517593384,
                        "y": -3.575456142425537,
                        "z": -0.6973143219947815
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.6263679265975952,
                        "y": -3.575456142425537,
                        "z": -0.6973143219947815
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.21526360511779785,
                        "y": -1.7800415754318237,
                        "z": -1.7256040573120117
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.21526363492012024,
                        "y": -0.7964991331100464,
                        "z": -1.8475093841552734
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.21526376903057098,
                        "y": 1.0154507160186768,
                        "z": 1.1883835792541504
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.21526385843753815,
                        "y": 2.301633596420288,
                        "z": 1.1883835792541504
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.21526339650154114,
                        "y": -1.4399724006652832,
                        "z": 1.0622010231018066
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.49231353402137756,
                        "z": 0.8704178333282471
                    }
                }
            ]
        },
        "Hulls_hull.split": {
            "collection": "Hulls",
            "object_name": "hull.split",
            "dimensions": {
                "width": 1.6090495586395264,
                "height": 3.9552161693573,
                "depth": 9.375259399414062
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.25599420070648193,
                        "y": -1.0337615013122559,
                        "z": -1.2646517753601074
                    },
                    "normal": {
                        "x": -9.355947128142361e-08,
                        "y": -0.42537569999694824,
                        "z": -0.9050168395042419
                    }
                },
                {
                    "position": {
                        "x": -0.12140157073736191,
                        "y": 5.207454681396484,
                        "z": 0.5777811408042908
                    },
                    "normal": {
                        "x": 1.963883732969407e-06,
                        "y": 0.9999999403953552,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.12140157073736191,
                        "y": 5.207454681396484,
                        "z": 0.9964168667793274
                    },
                    "normal": {
                        "x": 1.963883732969407e-06,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.12140166014432907,
                        "y": 4.207843780517578,
                        "z": 0.34731030464172363
                    },
                    "normal": {
                        "x": 1.626292687757075e-13,
                        "y": 3.312403293875832e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.21046559512615204,
                        "y": -2.5242390632629395,
                        "z": 1.5770800113677979
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.2559942305088043,
                        "y": -3.511049270629883,
                        "z": 1.40436851978302
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.3510882556438446,
                        "z": 0.9363422989845276
                    }
                },
                {
                    "position": {
                        "x": -0.5119882225990295,
                        "y": 2.227524518966675,
                        "z": 1.047263264656067
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": 9.021309033130365e-09,
                        "z": -1.1250050135913625e-07
                    }
                },
                {
                    "position": {
                        "x": -0.25599405169487,
                        "y": 1.476133108139038,
                        "z": -1.5293036699295044
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.2799651026725769,
                        "y": 0.2735040485858917,
                        "z": -1.5901854038238525
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.29676368832588196,
                        "y": -2.6038100719451904,
                        "z": -1.103546380996704
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.6443764567375183,
                        "y": -0.3085152506828308,
                        "z": -0.5455071330070496
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 7.615415853479135e-08,
                        "z": -1.4659534031125077e-07
                    }
                },
                {
                    "position": {
                        "x": -0.8045247197151184,
                        "y": -0.16954469680786133,
                        "z": 1.2332990169525146
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 9.456852723133125e-08,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.1945827752351761,
                        "y": 0.11404049396514893,
                        "z": 2.135648250579834
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.13317157328128815,
                        "y": 1.1910059452056885,
                        "z": 2.2789177894592285
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.1607009768486023,
                        "y": 5.114762306213379,
                        "z": 2.0286829471588135
                    },
                    "normal": {
                        "x": 1.4836163018117077e-06,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.10493768751621246,
                        "y": 3.744255542755127,
                        "z": 2.365030527114868
                    },
                    "normal": {
                        "x": -3.1112666696447855e-13,
                        "y": -1.8258594991493737e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.2559942901134491,
                        "y": -4.133610248565674,
                        "z": 0.6408603191375732
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.20527976751327515,
                        "y": -3.8307113647460938,
                        "z": -0.7383312582969666
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.8858184814453125,
                        "z": -0.46403202414512634
                    }
                },
                {
                    "position": {
                        "x": 0.25599420070648193,
                        "y": -1.0337615013122559,
                        "z": -1.2646517753601074
                    },
                    "normal": {
                        "x": 9.355947128142361e-08,
                        "y": -0.42537569999694824,
                        "z": -0.9050168395042419
                    }
                },
                {
                    "position": {
                        "x": 0.12140157073736191,
                        "y": 5.207454681396484,
                        "z": 0.5777812004089355
                    },
                    "normal": {
                        "x": -1.963883732969407e-06,
                        "y": 0.9999999403953552,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.12140157073736191,
                        "y": 5.207454681396484,
                        "z": 0.9964169263839722
                    },
                    "normal": {
                        "x": -1.963883732969407e-06,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.12140166014432907,
                        "y": 4.207843780517578,
                        "z": 0.34731030464172363
                    },
                    "normal": {
                        "x": -1.626292687757075e-13,
                        "y": 3.312403293875832e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.21046559512615204,
                        "y": -2.5242390632629395,
                        "z": 1.5770800113677979
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.2559942305088043,
                        "y": -3.511049270629883,
                        "z": 1.4043684005737305
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.3510882556438446,
                        "z": 0.9363422989845276
                    }
                },
                {
                    "position": {
                        "x": 0.5119882225990295,
                        "y": 2.227524518966675,
                        "z": 1.0472633838653564
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 9.021309033130365e-09,
                        "z": -1.1250050135913625e-07
                    }
                },
                {
                    "position": {
                        "x": 0.25599405169487,
                        "y": 1.476133108139038,
                        "z": -1.5293036699295044
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.2799651026725769,
                        "y": 0.2735040485858917,
                        "z": -1.5901854038238525
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.29676368832588196,
                        "y": -2.6038100719451904,
                        "z": -1.103546380996704
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.6443765163421631,
                        "y": -0.3085152804851532,
                        "z": -0.5455071330070496
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 7.615415853479135e-08,
                        "z": -1.4659534031125077e-07
                    }
                },
                {
                    "position": {
                        "x": 0.8045246601104736,
                        "y": -0.16954469680786133,
                        "z": 1.2332990169525146
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 9.456852723133125e-08,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.1945827752351761,
                        "y": 0.11404049396514893,
                        "z": 2.135648250579834
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.13317157328128815,
                        "y": 1.1910059452056885,
                        "z": 2.2789177894592285
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.1607009768486023,
                        "y": 5.114762306213379,
                        "z": 2.0286829471588135
                    },
                    "normal": {
                        "x": -1.4836163018117077e-06,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.10493768751621246,
                        "y": 3.744255781173706,
                        "z": 2.365030527114868
                    },
                    "normal": {
                        "x": 3.1112666696447855e-13,
                        "y": -1.8258594991493737e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.2559942901134491,
                        "y": -4.133610248565674,
                        "z": 0.6408603191375732
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.20527976751327515,
                        "y": -3.8307113647460938,
                        "z": -0.7383312582969666
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.8858184814453125,
                        "z": -0.46403202414512634
                    }
                }
            ]
        },
        "Hulls_hull.duckHead": {
            "collection": "Hulls",
            "object_name": "hull.duckHead",
            "dimensions": {
                "width": 3.508737802505493,
                "height": 5.026704788208008,
                "depth": 23.963077545166016
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.559052050113678,
                        "y": 1.3080930709838867,
                        "z": -1.990351676940918
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.22612783312797546,
                        "z": -0.9740976095199585
                    }
                },
                {
                    "position": {
                        "x": 1.1156044006347656,
                        "y": -3.790846824645996,
                        "z": -0.3372200131416321
                    },
                    "normal": {
                        "x": 0.9999793171882629,
                        "y": -0.0023932193871587515,
                        "z": 0.005984642077237368
                    }
                },
                {
                    "position": {
                        "x": 1.7245063781738281,
                        "y": 3.241044759750366,
                        "z": -0.18188536167144775
                    },
                    "normal": {
                        "x": 0.9997135996818542,
                        "y": 0.023928450420498848,
                        "z": 3.7013325027146493e-07
                    }
                },
                {
                    "position": {
                        "x": 0.4470970630645752,
                        "y": 15.981086730957031,
                        "z": 0.5964748859405518
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.03564190864562988,
                        "z": 0.9993646740913391
                    }
                },
                {
                    "position": {
                        "x": 0.2899089455604553,
                        "y": -3.0883607864379883,
                        "z": -1.7687692642211914
                    },
                    "normal": {
                        "x": 0.10000123083591461,
                        "y": -0.3972444534301758,
                        "z": -0.9122480750083923
                    }
                },
                {
                    "position": {
                        "x": 0.3815310001373291,
                        "y": -3.842769145965576,
                        "z": 0.9180542230606079
                    },
                    "normal": {
                        "x": -0.0035102481488138437,
                        "y": -0.2643280029296875,
                        "z": 0.9644264578819275
                    }
                },
                {
                    "position": {
                        "x": 0.37837105989456177,
                        "y": -4.767163276672363,
                        "z": 0.3427148461341858
                    },
                    "normal": {
                        "x": -0.0013265704037621617,
                        "y": -0.9983739852905273,
                        "z": 0.056988224387168884
                    }
                },
                {
                    "position": {
                        "x": 0.48239588737487793,
                        "y": 13.417547225952148,
                        "z": 0.6862965822219849
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.03463518247008324,
                        "z": 0.9994000792503357
                    }
                },
                {
                    "position": {
                        "x": 1.4317424297332764,
                        "y": 12.447324752807617,
                        "z": -0.18188539147377014
                    },
                    "normal": {
                        "x": 0.9992334842681885,
                        "y": 0.03914661332964897,
                        "z": -1.942883898209402e-07
                    }
                },
                {
                    "position": {
                        "x": 0.33350157737731934,
                        "y": 12.063398361206055,
                        "z": -1.3248587846755981
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.01914200931787491,
                        "z": -0.9998167157173157
                    }
                },
                {
                    "position": {
                        "x": 0.375705361366272,
                        "y": 7.591283798217773,
                        "z": -1.413171410560608
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.020904965698719025,
                        "z": -0.9997814893722534
                    }
                },
                {
                    "position": {
                        "x": -0.559052050113678,
                        "y": 1.3080930709838867,
                        "z": -1.990351676940918
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.22612783312797546,
                        "z": -0.9740976095199585
                    }
                },
                {
                    "position": {
                        "x": -1.1156044006347656,
                        "y": -3.790846824645996,
                        "z": -0.3372200131416321
                    },
                    "normal": {
                        "x": -0.9999793171882629,
                        "y": -0.0023932193871587515,
                        "z": 0.005984642077237368
                    }
                },
                {
                    "position": {
                        "x": -1.7245063781738281,
                        "y": 3.241044521331787,
                        "z": -0.18188537657260895
                    },
                    "normal": {
                        "x": -0.9997135996818542,
                        "y": 0.023928450420498848,
                        "z": 3.7013325027146493e-07
                    }
                },
                {
                    "position": {
                        "x": -0.4470970630645752,
                        "y": 15.981086730957031,
                        "z": 0.5964748859405518
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.03564190864562988,
                        "z": 0.9993646740913391
                    }
                },
                {
                    "position": {
                        "x": -0.2899089455604553,
                        "y": -3.0883607864379883,
                        "z": -1.768769383430481
                    },
                    "normal": {
                        "x": -0.10000123083591461,
                        "y": -0.3972444534301758,
                        "z": -0.9122480750083923
                    }
                },
                {
                    "position": {
                        "x": -0.3815310001373291,
                        "y": -3.842769145965576,
                        "z": 0.9180542230606079
                    },
                    "normal": {
                        "x": 0.0035102481488138437,
                        "y": -0.2643280029296875,
                        "z": 0.9644264578819275
                    }
                },
                {
                    "position": {
                        "x": -0.37837105989456177,
                        "y": -4.767163276672363,
                        "z": 0.3427148461341858
                    },
                    "normal": {
                        "x": 0.0013265704037621617,
                        "y": -0.9983739852905273,
                        "z": 0.056988224387168884
                    }
                },
                {
                    "position": {
                        "x": -0.48239588737487793,
                        "y": 13.417547225952148,
                        "z": 0.6862966418266296
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.03463518247008324,
                        "z": 0.9994000792503357
                    }
                },
                {
                    "position": {
                        "x": -1.4317424297332764,
                        "y": 12.4473237991333,
                        "z": -0.18188539147377014
                    },
                    "normal": {
                        "x": -0.9992334842681885,
                        "y": 0.03914661332964897,
                        "z": -1.942883898209402e-07
                    }
                },
                {
                    "position": {
                        "x": -0.33350157737731934,
                        "y": 12.063398361206055,
                        "z": -1.3248587846755981
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.01914200931787491,
                        "z": -0.9998167157173157
                    }
                },
                {
                    "position": {
                        "x": -0.375705361366272,
                        "y": 7.591283798217773,
                        "z": -1.413171410560608
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.020904965698719025,
                        "z": -0.9997814893722534
                    }
                }
            ]
        },
        "Hulls_hull.beard": {
            "collection": "Hulls",
            "object_name": "hull.beard",
            "dimensions": {
                "width": 4.214455604553223,
                "height": 4.371039867401123,
                "depth": 19.172283172607422
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.5480239391326904,
                        "y": 7.874508857727051,
                        "z": 1.0496903657913208
                    },
                    "normal": {
                        "x": 4.35051362046579e-07,
                        "y": 0.9999999403953552,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.5480238199234009,
                        "y": 7.376459121704102,
                        "z": -1.4777202606201172
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": 0.46746551990509033,
                        "y": -8.68868637084961,
                        "z": 1.269323706626892
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.143473505973816,
                        "y": 1.315537929534912,
                        "z": -0.06470224261283875
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -3.612770527183784e-08,
                        "z": 2.4708299406484e-07
                    }
                },
                {
                    "position": {
                        "x": 1.3132476806640625,
                        "y": -2.3157784938812256,
                        "z": -0.5041138529777527
                    },
                    "normal": {
                        "x": 0.9956943392753601,
                        "y": 0.01404566690325737,
                        "z": -0.09162778407335281
                    }
                },
                {
                    "position": {
                        "x": 0.4135890305042267,
                        "y": -6.177774429321289,
                        "z": 1.4114481210708618
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.04759000986814499,
                        "z": 0.9988669753074646
                    }
                },
                {
                    "position": {
                        "x": 0.29548144340515137,
                        "y": 5.356152057647705,
                        "z": 1.8866242170333862
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.29548126459121704,
                        "y": 1.3155378103256226,
                        "z": 1.8866242170333862
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 1.272512435913086,
                        "y": -11.297774314880371,
                        "z": -0.539392352104187
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 2.062239646911621,
                        "y": -6.673220157623291,
                        "z": -0.5393922924995422
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 3.4484708066884195e-07
                    }
                },
                {
                    "position": {
                        "x": 2.081977367401123,
                        "y": -9.290998458862305,
                        "z": -0.5393922328948975
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 3.448470522471325e-07
                    }
                },
                {
                    "position": {
                        "x": -0.5480239391326904,
                        "y": 7.874509334564209,
                        "z": 1.0496902465820312
                    },
                    "normal": {
                        "x": -4.35051362046579e-07,
                        "y": 0.9999999403953552,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.5480238199234009,
                        "y": 7.376459121704102,
                        "z": -1.4777202606201172
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.46746551990509033,
                        "y": -8.68868637084961,
                        "z": 1.269323706626892
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.143473505973816,
                        "y": 1.315537929534912,
                        "z": -0.06470225751399994
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -3.612770527183784e-08,
                        "z": 2.4708299406484e-07
                    }
                },
                {
                    "position": {
                        "x": -1.313247561454773,
                        "y": -2.3157782554626465,
                        "z": -0.5041139125823975
                    },
                    "normal": {
                        "x": -0.9956943392753601,
                        "y": 0.01404566690325737,
                        "z": -0.09162778407335281
                    }
                },
                {
                    "position": {
                        "x": -0.4135890305042267,
                        "y": -6.177774429321289,
                        "z": 1.4114480018615723
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.04759000986814499,
                        "z": 0.9988669753074646
                    }
                },
                {
                    "position": {
                        "x": -0.29548144340515137,
                        "y": 5.356152057647705,
                        "z": 1.8866242170333862
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.29548126459121704,
                        "y": 1.315537929534912,
                        "z": 1.8866242170333862
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -1.272512435913086,
                        "y": -11.297774314880371,
                        "z": -0.539392352104187
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -2.062239646911621,
                        "y": -6.673220634460449,
                        "z": -0.5393922924995422
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": 3.4484708066884195e-07
                    }
                },
                {
                    "position": {
                        "x": -2.081977367401123,
                        "y": -9.290998458862305,
                        "z": -0.5393922328948975
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": 3.448470522471325e-07
                    }
                }
            ]
        },
        "Hulls_hull.v": {
            "collection": "Hulls",
            "object_name": "hull.v",
            "dimensions": {
                "width": 5.275944709777832,
                "height": 2.492705821990967,
                "depth": 6.321554660797119
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.1047725677490234,
                        "y": -0.5378818511962891,
                        "z": -0.7112318873405457
                    },
                    "normal": {
                        "x": 9.081631446861138e-08,
                        "y": -0.36715301871299744,
                        "z": -0.9301605820655823
                    }
                },
                {
                    "position": {
                        "x": 1.1047725677490234,
                        "y": 3.2289352416992188,
                        "z": -0.30176541209220886
                    },
                    "normal": {
                        "x": 8.568648723894512e-08,
                        "y": 0.6675403714179993,
                        "z": -0.7445735931396484
                    }
                },
                {
                    "position": {
                        "x": 1.1047725677490234,
                        "y": 2.687023162841797,
                        "z": -0.7511237263679504
                    },
                    "normal": {
                        "x": 7.021215964186922e-08,
                        "y": 0.5883464813232422,
                        "z": -0.8086089491844177
                    }
                },
                {
                    "position": {
                        "x": 1.1047718524932861,
                        "y": -0.639670193195343,
                        "z": 0.8637487888336182
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.5152479410171509,
                        "z": 0.8570411801338196
                    }
                },
                {
                    "position": {
                        "x": 1.1047725677490234,
                        "y": 1.2787786722183228,
                        "z": -0.8936389684677124
                    },
                    "normal": {
                        "x": 9.6631772805722e-08,
                        "y": 7.213820367724111e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 1.1047725677490234,
                        "y": 1.8519525527954102,
                        "z": -0.8936386108398438
                    },
                    "normal": {
                        "x": 1.031290182140765e-07,
                        "y": 6.296615993051091e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.2300778031349182,
                        "y": 1.8103084564208984,
                        "z": -1.2086992263793945
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.2300778031349182,
                        "y": 1.252751111984253,
                        "z": -1.2086992263793945
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.2099553942680359,
                        "y": 1.4402263164520264,
                        "z": 0.5567883253097534
                    },
                    "normal": {
                        "x": -2.682810299869248e-13,
                        "y": -4.725054907339654e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.2099553644657135,
                        "y": 2.1971020698547363,
                        "z": 0.5567886829376221
                    },
                    "normal": {
                        "x": -2.6828105709197914e-13,
                        "y": -4.725055475773843e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.21217001974582672,
                        "y": -1.0345851182937622,
                        "z": 0.06318860501050949
                    },
                    "normal": {
                        "x": -5.616502676275559e-07,
                        "y": -0.9999279379844666,
                        "z": 0.012003577314317226
                    }
                },
                {
                    "position": {
                        "x": 1.1047730445861816,
                        "y": 1.353271245956421,
                        "z": 1.1132395267486572
                    },
                    "normal": {
                        "x": -1.0929674942872225e-07,
                        "y": 2.1818310030311157e-14,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.1047730445861816,
                        "y": 2.3803162574768066,
                        "z": 1.2840059995651245
                    },
                    "normal": {
                        "x": -2.8806283580706804e-07,
                        "y": -3.653780709100829e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.1047730445861816,
                        "y": 3.1633472442626953,
                        "z": 1.2840063571929932
                    },
                    "normal": {
                        "x": -1.4403151737951703e-07,
                        "y": -5.480672484736715e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.1047725677490234,
                        "y": 0.19057446718215942,
                        "z": -0.8936392068862915
                    },
                    "normal": {
                        "x": 1.031290182140765e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 1.1047725677490234,
                        "y": 0.7232508063316345,
                        "z": -0.8936392068862915
                    },
                    "normal": {
                        "x": 1.0312901110864914e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 2.526097059249878,
                        "y": -1.420419692993164,
                        "z": -2.086162567138672e-07
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -3.935278414246568e-07,
                        "z": 9.037789823196363e-07
                    }
                },
                {
                    "position": {
                        "x": 2.526097297668457,
                        "y": -0.5116457939147949,
                        "z": -2.086162567138672e-07
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -3.935278414246568e-07,
                        "z": -1.8075624552693625e-07
                    }
                },
                {
                    "position": {
                        "x": 0.2121702879667282,
                        "y": 0.4295145869255066,
                        "z": 0.5663765668869019
                    },
                    "normal": {
                        "x": -3.95093469052199e-09,
                        "y": -0.006103945896029472,
                        "z": 0.9999814033508301
                    }
                },
                {
                    "position": {
                        "x": 0.21217000484466553,
                        "y": -0.5425961017608643,
                        "z": 0.5604426860809326
                    },
                    "normal": {
                        "x": -4.515360085832754e-09,
                        "y": -0.00610394636169076,
                        "z": 0.9999814629554749
                    }
                },
                {
                    "position": {
                        "x": 1.104772686958313,
                        "y": 0.7691975831985474,
                        "z": 1.1320385932922363
                    },
                    "normal": {
                        "x": -1.1624914009189524e-07,
                        "y": 9.708213237220181e-14,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.1047722101211548,
                        "y": 0.19821807742118835,
                        "z": 1.1320385932922363
                    },
                    "normal": {
                        "x": -1.1624914009189524e-07,
                        "y": 9.708213237220181e-14,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.6957001686096191,
                        "y": 1.7352595329284668,
                        "z": 0.8210324048995972
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.6957001686096191,
                        "y": 2.553924083709717,
                        "z": 0.8210328817367554
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.6956992149353027,
                        "y": -0.17407280206680298,
                        "z": 0.8210322856903076
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -6.437301180994837e-07,
                        "z": 8.40404027258046e-07
                    }
                },
                {
                    "position": {
                        "x": 1.69569993019104,
                        "y": 0.8259272575378418,
                        "z": 0.8210322856903076
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -5.722045557376987e-07,
                        "z": 6.382362585100054e-07
                    }
                },
                {
                    "position": {
                        "x": 2.226095199584961,
                        "y": -2.351069688796997,
                        "z": -5.364418029785156e-07
                    },
                    "normal": {
                        "x": 7.541479918847516e-14,
                        "y": -0.9999999403953552,
                        "z": -4.726236397800676e-07
                    }
                },
                {
                    "position": {
                        "x": 1.5823912620544434,
                        "y": -1.47761869430542,
                        "z": -0.4777512550354004
                    },
                    "normal": {
                        "x": 1.1137940703065397e-07,
                        "y": 5.157166356184462e-07,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 2.160353183746338,
                        "y": -0.9776187539100647,
                        "z": -0.4777511954307556
                    },
                    "normal": {
                        "x": -3.5941101828029787e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 2.160353183746338,
                        "y": 0.022381305694580078,
                        "z": -0.4777511954307556
                    },
                    "normal": {
                        "x": -3.5941101828029787e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 2.1603527069091797,
                        "y": -0.9776192903518677,
                        "z": 0.49881142377853394
                    },
                    "normal": {
                        "x": 3.5941073406320356e-07,
                        "y": -2.4678772480440925e-13,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 2.160353422164917,
                        "y": 0.022380754351615906,
                        "z": 0.4988115131855011
                    },
                    "normal": {
                        "x": 4.5127438852432533e-07,
                        "y": -4.291569055681066e-08,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.582390546798706,
                        "y": -1.4776192903518677,
                        "z": 0.49881136417388916
                    },
                    "normal": {
                        "x": -1.4850579077574366e-07,
                        "y": -5.977693717795773e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.1047725677490234,
                        "y": 3.903008460998535,
                        "z": 0.353617787361145
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.1047728061676025,
                        "y": 3.970484495162964,
                        "z": 0.9332884550094604
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 1.1735320413208683e-06
                    }
                },
                {
                    "position": {
                        "x": -1.1047725677490234,
                        "y": -0.5378818511962891,
                        "z": -0.7112319469451904
                    },
                    "normal": {
                        "x": -9.081631446861138e-08,
                        "y": -0.36715301871299744,
                        "z": -0.9301605820655823
                    }
                },
                {
                    "position": {
                        "x": -1.104772686958313,
                        "y": 3.2289352416992188,
                        "z": -0.3017653822898865
                    },
                    "normal": {
                        "x": -8.568648723894512e-08,
                        "y": 0.6675403714179993,
                        "z": -0.7445735931396484
                    }
                },
                {
                    "position": {
                        "x": -1.1047725677490234,
                        "y": 2.687023162841797,
                        "z": -0.7511237263679504
                    },
                    "normal": {
                        "x": -7.021215964186922e-08,
                        "y": 0.5883464813232422,
                        "z": -0.8086089491844177
                    }
                },
                {
                    "position": {
                        "x": -1.1047718524932861,
                        "y": -0.639670193195343,
                        "z": 0.8637487292289734
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.5152479410171509,
                        "z": 0.8570411801338196
                    }
                },
                {
                    "position": {
                        "x": -1.1047725677490234,
                        "y": 1.2787786722183228,
                        "z": -0.8936390280723572
                    },
                    "normal": {
                        "x": -9.6631772805722e-08,
                        "y": 7.213820367724111e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -1.1047725677490234,
                        "y": 1.8519525527954102,
                        "z": -0.8936386108398438
                    },
                    "normal": {
                        "x": -1.031290182140765e-07,
                        "y": 6.296615993051091e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.2300778031349182,
                        "y": 1.8103084564208984,
                        "z": -1.2086992263793945
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.2300778031349182,
                        "y": 1.252751111984253,
                        "z": -1.2086992263793945
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.2099553942680359,
                        "y": 1.440226435661316,
                        "z": 0.5567883253097534
                    },
                    "normal": {
                        "x": 2.682810299869248e-13,
                        "y": -4.725054907339654e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.2099553644657135,
                        "y": 2.1971020698547363,
                        "z": 0.5567886829376221
                    },
                    "normal": {
                        "x": 2.6828105709197914e-13,
                        "y": -4.725055475773843e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.21217001974582672,
                        "y": -1.0345851182937622,
                        "z": 0.0631885975599289
                    },
                    "normal": {
                        "x": 5.616502676275559e-07,
                        "y": -0.9999279379844666,
                        "z": 0.012003577314317226
                    }
                },
                {
                    "position": {
                        "x": -1.1047730445861816,
                        "y": 1.353271245956421,
                        "z": 1.1132395267486572
                    },
                    "normal": {
                        "x": 1.0929674942872225e-07,
                        "y": 2.1818310030311157e-14,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.1047730445861816,
                        "y": 2.3803162574768066,
                        "z": 1.2840059995651245
                    },
                    "normal": {
                        "x": 2.8806283580706804e-07,
                        "y": -3.653780709100829e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.1047730445861816,
                        "y": 3.163347005844116,
                        "z": 1.2840063571929932
                    },
                    "normal": {
                        "x": 1.4403151737951703e-07,
                        "y": -5.480672484736715e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.1047725677490234,
                        "y": 0.19057446718215942,
                        "z": -0.8936392068862915
                    },
                    "normal": {
                        "x": -1.031290182140765e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -1.1047725677490234,
                        "y": 0.7232508063316345,
                        "z": -0.8936392068862915
                    },
                    "normal": {
                        "x": -1.0312901110864914e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -2.526097059249878,
                        "y": -1.4204198122024536,
                        "z": -2.086162567138672e-07
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -3.935278414246568e-07,
                        "z": 9.037789823196363e-07
                    }
                },
                {
                    "position": {
                        "x": -2.526097297668457,
                        "y": -0.5116457939147949,
                        "z": -2.086162567138672e-07
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -3.935278414246568e-07,
                        "z": -1.8075624552693625e-07
                    }
                },
                {
                    "position": {
                        "x": -0.2121702879667282,
                        "y": 0.4295145571231842,
                        "z": 0.5663765072822571
                    },
                    "normal": {
                        "x": 3.95093469052199e-09,
                        "y": -0.006103945896029472,
                        "z": 0.9999814033508301
                    }
                },
                {
                    "position": {
                        "x": -0.21217000484466553,
                        "y": -0.5425961017608643,
                        "z": 0.5604426860809326
                    },
                    "normal": {
                        "x": 4.515360085832754e-09,
                        "y": -0.00610394636169076,
                        "z": 0.9999814629554749
                    }
                },
                {
                    "position": {
                        "x": -1.104772686958313,
                        "y": 0.7691976428031921,
                        "z": 1.1320385932922363
                    },
                    "normal": {
                        "x": 1.1624914009189524e-07,
                        "y": 9.708213237220181e-14,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.1047722101211548,
                        "y": 0.19821807742118835,
                        "z": 1.1320385932922363
                    },
                    "normal": {
                        "x": 1.1624914009189524e-07,
                        "y": 9.708213237220181e-14,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.6957001686096191,
                        "y": 1.7352595329284668,
                        "z": 0.8210324048995972
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.6957001686096191,
                        "y": 2.553924083709717,
                        "z": 0.8210328221321106
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.6956992149353027,
                        "y": -0.17407281696796417,
                        "z": 0.8210322856903076
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -6.437301180994837e-07,
                        "z": 8.40404027258046e-07
                    }
                },
                {
                    "position": {
                        "x": -1.69569993019104,
                        "y": 0.8259272575378418,
                        "z": 0.8210322856903076
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -5.722045557376987e-07,
                        "z": 6.382362585100054e-07
                    }
                },
                {
                    "position": {
                        "x": -2.226095199584961,
                        "y": -2.351069688796997,
                        "z": -5.364418029785156e-07
                    },
                    "normal": {
                        "x": -7.541479918847516e-14,
                        "y": -0.9999999403953552,
                        "z": -4.726236397800676e-07
                    }
                },
                {
                    "position": {
                        "x": -1.5823912620544434,
                        "y": -1.47761869430542,
                        "z": -0.4777512550354004
                    },
                    "normal": {
                        "x": -1.1137940703065397e-07,
                        "y": 5.157166356184462e-07,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -2.160353183746338,
                        "y": -0.9776187539100647,
                        "z": -0.4777511954307556
                    },
                    "normal": {
                        "x": 3.5941101828029787e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -2.160353183746338,
                        "y": 0.022381305694580078,
                        "z": -0.4777511954307556
                    },
                    "normal": {
                        "x": 3.5941101828029787e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -2.1603527069091797,
                        "y": -0.9776193499565125,
                        "z": 0.49881142377853394
                    },
                    "normal": {
                        "x": -3.5941073406320356e-07,
                        "y": -2.4678772480440925e-13,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -2.160353422164917,
                        "y": 0.022380750626325607,
                        "z": 0.4988114833831787
                    },
                    "normal": {
                        "x": -4.5127438852432533e-07,
                        "y": -4.291569055681066e-08,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.582390546798706,
                        "y": -1.4776194095611572,
                        "z": 0.49881139397621155
                    },
                    "normal": {
                        "x": 1.4850579077574366e-07,
                        "y": -5.977693717795773e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.104772686958313,
                        "y": 3.903008460998535,
                        "z": 0.353617787361145
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.1047728061676025,
                        "y": 3.9704842567443848,
                        "z": 0.9332884550094604
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 1.1735320413208683e-06
                    }
                }
            ]
        },
        "Hulls_hull.bullHead": {
            "collection": "Hulls",
            "object_name": "hull.bullHead",
            "dimensions": {
                "width": 2.464251756668091,
                "height": 2.829333543777466,
                "depth": 9.753388404846191
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.4591504633426666,
                        "y": -0.21933960914611816,
                        "z": 1.1204850673675537
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": -0.15528243780136108,
                        "y": 4.286196708679199,
                        "z": 0.9439973831176758
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.9987979531288147,
                        "z": 0.049017250537872314
                    }
                },
                {
                    "position": {
                        "x": -0.32518357038497925,
                        "y": -5.333817005157471,
                        "z": 0.17046503722667694
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.2635241746902466,
                        "y": 4.039893627166748,
                        "z": -0.57129967212677
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.295572966337204,
                        "z": -0.9553201794624329
                    }
                },
                {
                    "position": {
                        "x": -0.6294378638267517,
                        "y": 0.6260751485824585,
                        "z": 0.23233488202095032
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 3.474484699950153e-08,
                        "z": -1.724215081821967e-07
                    }
                },
                {
                    "position": {
                        "x": -0.3147188723087311,
                        "y": 0.6260751485824585,
                        "z": -0.4590480923652649
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.436954306655025e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.4587361812591553,
                        "y": 3.1824049949645996,
                        "z": 1.616497278213501
                    },
                    "normal": {
                        "x": -0.9470054507255554,
                        "y": 0.002498617861419916,
                        "z": -0.3212076723575592
                    }
                },
                {
                    "position": {
                        "x": -0.17136916518211365,
                        "y": 0.31957849860191345,
                        "z": 1.856427788734436
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -1.2269710302352905,
                        "y": -4.243925094604492,
                        "z": 0.06541760265827179
                    },
                    "normal": {
                        "x": -0.9999706149101257,
                        "y": 0.007674093823879957,
                        "z": -1.6131319569012703e-07
                    }
                },
                {
                    "position": {
                        "x": -0.20464970171451569,
                        "y": -1.1866838932037354,
                        "z": 1.3924081325531006
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": -0.2881101965904236,
                        "y": -3.1782617568969727,
                        "z": -0.9729053974151611
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 2.1532666494294972e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.6294379830360413,
                        "y": 3.226895570755005,
                        "z": 0.21973295509815216
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": -0.21232959628105164,
                        "y": 4.412234306335449,
                        "z": 0.21973295509815216
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.25541049242019653,
                        "y": 3.180079698562622,
                        "z": 1.856427788734436
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.48419392108917236,
                        "y": -4.452890872955322,
                        "z": 1.0318934917449951
                    },
                    "normal": {
                        "x": 1.6223918208879695e-08,
                        "y": -1.4144347915134858e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.4591504633426666,
                        "y": -0.21933960914611816,
                        "z": 1.1204850673675537
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.15528243780136108,
                        "y": 4.286196708679199,
                        "z": 0.9439973831176758
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.9987979531288147,
                        "z": 0.049017250537872314
                    }
                },
                {
                    "position": {
                        "x": 0.32518357038497925,
                        "y": -5.333817005157471,
                        "z": 0.17046502232551575
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.2635241746902466,
                        "y": 4.039893627166748,
                        "z": -0.57129967212677
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.295572966337204,
                        "z": -0.9553201794624329
                    }
                },
                {
                    "position": {
                        "x": 0.6294378638267517,
                        "y": 0.6260752081871033,
                        "z": 0.23233488202095032
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 3.474484699950153e-08,
                        "z": -1.724215081821967e-07
                    }
                },
                {
                    "position": {
                        "x": 0.3147188723087311,
                        "y": 0.6260752081871033,
                        "z": -0.4590480923652649
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.436954306655025e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.4587361812591553,
                        "y": 3.1824049949645996,
                        "z": 1.6164973974227905
                    },
                    "normal": {
                        "x": 0.9470054507255554,
                        "y": 0.002498617861419916,
                        "z": -0.3212076723575592
                    }
                },
                {
                    "position": {
                        "x": 0.17136916518211365,
                        "y": 0.31957852840423584,
                        "z": 1.856427788734436
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.2269710302352905,
                        "y": -4.243925094604492,
                        "z": 0.06541761010885239
                    },
                    "normal": {
                        "x": 0.9999706149101257,
                        "y": 0.007674093823879957,
                        "z": -1.6131319569012703e-07
                    }
                },
                {
                    "position": {
                        "x": 0.20464970171451569,
                        "y": -1.1866838932037354,
                        "z": 1.3924081325531006
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.2881101965904236,
                        "y": -3.1782617568969727,
                        "z": -0.9729054570198059
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 2.1532666494294972e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.6294379830360413,
                        "y": 3.226895809173584,
                        "z": 0.21973295509815216
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.21232959628105164,
                        "y": 4.412234306335449,
                        "z": 0.21973295509815216
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.25541049242019653,
                        "y": 3.180079698562622,
                        "z": 1.856427788734436
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.48419395089149475,
                        "y": -4.452890872955322,
                        "z": 1.0318934917449951
                    },
                    "normal": {
                        "x": -1.6223918208879695e-08,
                        "y": -1.4144347915134858e-07,
                        "z": 1.0
                    }
                }
            ]
        },
        "Hulls_hull.hangar": {
            "collection": "Hulls",
            "object_name": "hull.hangar",
            "dimensions": {
                "width": 1.9733846187591553,
                "height": 2.8331339359283447,
                "depth": 14.242925643920898
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.8962276577949524,
                        "y": 0.406233549118042,
                        "z": -1.0541985034942627
                    },
                    "normal": {
                        "x": 0.9669960141181946,
                        "y": -1.7911338545673061e-06,
                        "z": -0.2547914981842041
                    }
                },
                {
                    "position": {
                        "x": -0.8962388038635254,
                        "y": 0.40623438358306885,
                        "z": -1.0541985034942627
                    },
                    "normal": {
                        "x": -0.9669960141181946,
                        "y": 1.8878142782341456e-06,
                        "z": -0.2547915577888489
                    }
                },
                {
                    "position": {
                        "x": -0.8962389826774597,
                        "y": 0.40622127056121826,
                        "z": 0.4734986424446106
                    },
                    "normal": {
                        "x": -0.9952418208122253,
                        "y": 4.130552952119615e-06,
                        "z": 0.09743660688400269
                    }
                },
                {
                    "position": {
                        "x": -0.8741024732589722,
                        "y": -3.746030569076538,
                        "z": 0.461831271648407
                    },
                    "normal": {
                        "x": -0.995242178440094,
                        "y": 3.4407871680741664e-06,
                        "z": 0.09743312001228333
                    }
                },
                {
                    "position": {
                        "x": -0.8741021752357483,
                        "y": -3.746030569076538,
                        "z": -1.028148889541626
                    },
                    "normal": {
                        "x": -0.9669958353042603,
                        "y": 3.49198535332107e-06,
                        "z": -0.25479215383529663
                    }
                },
                {
                    "position": {
                        "x": 0.8740689158439636,
                        "y": -3.746032476425171,
                        "z": 0.461831271648407
                    },
                    "normal": {
                        "x": 0.995242178440094,
                        "y": -3.5204525374865625e-06,
                        "z": 0.09743280708789825
                    }
                },
                {
                    "position": {
                        "x": 0.874069333076477,
                        "y": -3.7460312843322754,
                        "z": -1.028148889541626
                    },
                    "normal": {
                        "x": 0.9669961929321289,
                        "y": -3.2836578611750156e-06,
                        "z": -0.2547907829284668
                    }
                },
                {
                    "position": {
                        "x": -0.32477760314941406,
                        "y": 7.683357238769531,
                        "z": -0.37663060426712036
                    },
                    "normal": {
                        "x": 3.6704832950817945e-07,
                        "y": 1.0,
                        "z": 3.27484963236202e-06
                    }
                },
                {
                    "position": {
                        "x": -0.32477760314941406,
                        "y": 6.96507453918457,
                        "z": -0.6501909494400024
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.22305303812026978,
                        "z": -0.9748063683509827
                    }
                },
                {
                    "position": {
                        "x": -0.32477760314941406,
                        "y": 5.982520580291748,
                        "z": 0.6211716532707214
                    },
                    "normal": {
                        "x": 4.842709699914849e-07,
                        "y": 0.46577292680740356,
                        "z": 0.8849042654037476
                    }
                },
                {
                    "position": {
                        "x": -0.3247830271720886,
                        "y": 0.40623366832733154,
                        "z": -1.3974950313568115
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.9268973971975356e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.5215194225311279,
                        "y": 7.683357238769531,
                        "z": -0.37663060426712036
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 2.1832329366588965e-06
                    }
                },
                {
                    "position": {
                        "x": 0.19674120843410492,
                        "y": 7.683357238769531,
                        "z": -0.37663060426712036
                    },
                    "normal": {
                        "x": 6.059210022613115e-07,
                        "y": 1.0,
                        "z": 3.27484963236202e-06
                    }
                },
                {
                    "position": {
                        "x": 0.5215194225311279,
                        "y": 6.96507453918457,
                        "z": -0.6501909494400024
                    },
                    "normal": {
                        "x": -7.897246945276493e-08,
                        "y": 0.22305308282375336,
                        "z": -0.9748063087463379
                    }
                },
                {
                    "position": {
                        "x": 0.19674120843410492,
                        "y": 6.96507453918457,
                        "z": -0.6501909494400024
                    },
                    "normal": {
                        "x": 2.0557907021157007e-07,
                        "y": 0.22305305302143097,
                        "z": -0.9748064279556274
                    }
                },
                {
                    "position": {
                        "x": 0.1967412233352661,
                        "y": 5.98252010345459,
                        "z": 0.6211715340614319
                    },
                    "normal": {
                        "x": 2.2206428695881186e-07,
                        "y": 0.4657728672027588,
                        "z": 0.8849043250083923
                    }
                },
                {
                    "position": {
                        "x": 0.5215194225311279,
                        "y": 5.98252010345459,
                        "z": 0.6211714744567871
                    },
                    "normal": {
                        "x": 1.364883104315595e-07,
                        "y": 0.4657728672027588,
                        "z": 0.8849042654037476
                    }
                },
                {
                    "position": {
                        "x": 0.5215139985084534,
                        "y": 0.40623366832733154,
                        "z": -1.3974950313568115
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.9268972550889885e-07,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.521513819694519,
                        "y": 0.4063214659690857,
                        "z": 1.3977320194244385
                    },
                    "normal": {
                        "x": -0.000233680140809156,
                        "y": -0.0001545665436424315,
                        "z": 0.9999998807907104
                    }
                },
                {
                    "position": {
                        "x": 0.1967357099056244,
                        "y": 0.40629351139068604,
                        "z": 1.3976560831069946
                    },
                    "normal": {
                        "x": -0.00023372501891572028,
                        "y": -0.00010549314902164042,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.46569588780403137,
                        "y": -5.451729774475098,
                        "z": 1.2479608058929443
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.1820436269044876,
                        "z": 0.983290433883667
                    }
                },
                {
                    "position": {
                        "x": 0.819746732711792,
                        "y": 5.5850605964660645,
                        "z": 0.27356022596359253
                    },
                    "normal": {
                        "x": 0.9990217089653015,
                        "y": 0.013190560042858124,
                        "z": 0.04221037030220032
                    }
                },
                {
                    "position": {
                        "x": -0.819746732711792,
                        "y": 5.585061550140381,
                        "z": 0.2735602855682373
                    },
                    "normal": {
                        "x": -0.9990216493606567,
                        "y": 0.01319095678627491,
                        "z": 0.04221075773239136
                    }
                },
                {
                    "position": {
                        "x": -0.32477760314941406,
                        "y": 4.900796890258789,
                        "z": 0.817977786064148
                    },
                    "normal": {
                        "x": 1.8165118831348082e-07,
                        "y": -0.0025154852773994207,
                        "z": 0.9999968409538269
                    }
                },
                {
                    "position": {
                        "x": 0.5215193629264832,
                        "y": 4.900796890258789,
                        "z": 0.8179776668548584
                    },
                    "normal": {
                        "x": -1.1616145911830245e-07,
                        "y": -0.0025154214818030596,
                        "z": 0.9999968409538269
                    }
                },
                {
                    "position": {
                        "x": 0.1967412233352661,
                        "y": 4.900796890258789,
                        "z": 0.8179776668548584
                    },
                    "normal": {
                        "x": 2.2721138748238445e-07,
                        "y": -0.0025154638569802046,
                        "z": 0.9999969005584717
                    }
                },
                {
                    "position": {
                        "x": -0.32478606700897217,
                        "y": 0.4062483012676239,
                        "z": 1.4354450702667236
                    },
                    "normal": {
                        "x": -0.00023380748461931944,
                        "y": -2.670613866939675e-05,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.1756685972213745,
                        "y": -5.455012798309326,
                        "z": 1.2837245464324951
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.18204353749752045,
                        "z": 0.983290433883667
                    }
                },
                {
                    "position": {
                        "x": -0.2900483012199402,
                        "y": -5.455012798309326,
                        "z": 1.2837245464324951
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.18204352259635925,
                        "z": 0.9832904934883118
                    }
                },
                {
                    "position": {
                        "x": 0.4702422320842743,
                        "y": -6.3610076904296875,
                        "z": 0.3206077814102173
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.29288268089294434,
                        "y": -6.3610076904296875,
                        "z": 0.3206077814102173
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Hulls_hull.large": {
            "collection": "Hulls",
            "object_name": "hull.large",
            "dimensions": {
                "width": 4.307114601135254,
                "height": 4.75990629196167,
                "depth": 31.226520538330078
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.8483121395111084,
                        "y": 14.25975227355957,
                        "z": 0.37077605724334717
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.9080584049224854,
                        "z": 0.41884365677833557
                    }
                },
                {
                    "position": {
                        "x": -0.28411632776260376,
                        "y": 14.38038444519043,
                        "z": 0.4173027276992798
                    },
                    "normal": {
                        "x": -0.011913134716451168,
                        "y": 0.9060235023498535,
                        "z": 0.4230596423149109
                    }
                },
                {
                    "position": {
                        "x": -1.1805963516235352,
                        "y": 7.066468238830566,
                        "z": -0.3388606309890747
                    },
                    "normal": {
                        "x": -0.9988028407096863,
                        "y": 2.5883732490683542e-08,
                        "z": 0.04891671612858772
                    }
                },
                {
                    "position": {
                        "x": -1.204088568687439,
                        "y": 7.066468238830566,
                        "z": -1.0662249326705933
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.0507155656814575,
                        "y": 7.109269618988037,
                        "z": 1.0476624965667725
                    },
                    "normal": {
                        "x": -0.9931899309158325,
                        "y": 0.0002388722641626373,
                        "z": 0.11650662869215012
                    }
                },
                {
                    "position": {
                        "x": -2.1046371459960938,
                        "y": -8.260542869567871,
                        "z": -1.2081626653671265
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 4.764552841152181e-08,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -2.1046371459960938,
                        "y": -0.7949495315551758,
                        "z": 0.8416805863380432
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 5.7950938270323604e-08,
                        "z": 3.592002784102988e-08
                    }
                },
                {
                    "position": {
                        "x": -1.3119704723358154,
                        "y": -15.94685173034668,
                        "z": -1.0108064413070679
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999999403953552,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.46461305022239685,
                        "y": -15.94685173034668,
                        "z": -1.0108063220977783
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.3119704723358154,
                        "y": -15.94685173034668,
                        "z": -0.40279436111450195
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.46461305022239685,
                        "y": -15.94685173034668,
                        "z": -0.4027943015098572
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -2.104637384414673,
                        "y": -3.3364415168762207,
                        "z": 0.8416805863380432
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": 0.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": -2.104637384414673,
                        "y": -3.3364415168762207,
                        "z": -1.208162546157837
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": -2.104637384414673,
                        "y": -3.3364415168762207,
                        "z": -0.3388606309890747
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": -1.0021299123764038,
                        "y": 9.093917846679688,
                        "z": 1.4669594764709473
                    },
                    "normal": {
                        "x": -0.993232250213623,
                        "y": -0.0010947615373879671,
                        "z": 0.11614025384187698
                    }
                },
                {
                    "position": {
                        "x": -0.9544371962547302,
                        "y": 10.787690162658691,
                        "z": 1.8971271514892578
                    },
                    "normal": {
                        "x": -0.9938206076622009,
                        "y": -0.0006805877201259136,
                        "z": 0.11099647730588913
                    }
                },
                {
                    "position": {
                        "x": -0.7078368067741394,
                        "y": 13.855382919311523,
                        "z": 1.6279120445251465
                    },
                    "normal": {
                        "x": 0.003058871952816844,
                        "y": 0.9067232608795166,
                        "z": 0.42171481251716614
                    }
                },
                {
                    "position": {
                        "x": -0.24891376495361328,
                        "y": 13.855382919311523,
                        "z": 1.6268432140350342
                    },
                    "normal": {
                        "x": -0.0007709646015428007,
                        "y": 0.9065051674842834,
                        "z": 0.42219412326812744
                    }
                },
                {
                    "position": {
                        "x": -2.153557300567627,
                        "y": -8.260542869567871,
                        "z": 0.8416805267333984
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 4.764552485880813e-08,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -2.153557300567627,
                        "y": -8.260542869567871,
                        "z": -0.33886075019836426
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": 4.764552130609445e-08,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.8483121395111084,
                        "y": 14.25975227355957,
                        "z": 0.37077605724334717
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.9080584049224854,
                        "z": 0.41884365677833557
                    }
                },
                {
                    "position": {
                        "x": 0.28411632776260376,
                        "y": 14.38038444519043,
                        "z": 0.4173027276992798
                    },
                    "normal": {
                        "x": 0.011913134716451168,
                        "y": 0.9060235023498535,
                        "z": 0.4230596423149109
                    }
                },
                {
                    "position": {
                        "x": 1.1805963516235352,
                        "y": 7.066468715667725,
                        "z": -0.3388606309890747
                    },
                    "normal": {
                        "x": 0.9988028407096863,
                        "y": 2.5883732490683542e-08,
                        "z": 0.04891671612858772
                    }
                },
                {
                    "position": {
                        "x": 1.204088568687439,
                        "y": 7.066468715667725,
                        "z": -1.0662249326705933
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.0507155656814575,
                        "y": 7.109269142150879,
                        "z": 1.0476624965667725
                    },
                    "normal": {
                        "x": 0.9931899309158325,
                        "y": 0.0002388722641626373,
                        "z": 0.11650662869215012
                    }
                },
                {
                    "position": {
                        "x": 2.1046371459960938,
                        "y": -8.260542869567871,
                        "z": -1.208162546157837
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 4.764552841152181e-08,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 2.1046371459960938,
                        "y": -0.7949495315551758,
                        "z": 0.8416805863380432
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 5.7950938270323604e-08,
                        "z": 3.592002784102988e-08
                    }
                },
                {
                    "position": {
                        "x": 1.311970591545105,
                        "y": -15.94685173034668,
                        "z": -1.0108064413070679
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -0.9999999403953552,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.46461305022239685,
                        "y": -15.94685173034668,
                        "z": -1.0108063220977783
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.311970591545105,
                        "y": -15.94685173034668,
                        "z": -0.40279433131217957
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.46461305022239685,
                        "y": -15.94685173034668,
                        "z": -0.40279433131217957
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 2.104637384414673,
                        "y": -3.3364415168762207,
                        "z": 0.8416805863380432
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 2.104637384414673,
                        "y": -3.3364415168762207,
                        "z": -1.208162546157837
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 2.104637384414673,
                        "y": -3.3364415168762207,
                        "z": -0.3388606309890747
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.0021299123764038,
                        "y": 9.093917846679688,
                        "z": 1.4669594764709473
                    },
                    "normal": {
                        "x": 0.993232250213623,
                        "y": -0.0010947615373879671,
                        "z": 0.11614025384187698
                    }
                },
                {
                    "position": {
                        "x": 0.9544371962547302,
                        "y": 10.787689208984375,
                        "z": 1.8971271514892578
                    },
                    "normal": {
                        "x": 0.9938206076622009,
                        "y": -0.0006805877201259136,
                        "z": 0.11099647730588913
                    }
                },
                {
                    "position": {
                        "x": 0.7078368067741394,
                        "y": 13.855382919311523,
                        "z": 1.627911925315857
                    },
                    "normal": {
                        "x": -0.003058871952816844,
                        "y": 0.9067232608795166,
                        "z": 0.42171481251716614
                    }
                },
                {
                    "position": {
                        "x": 0.24891376495361328,
                        "y": 13.855382919311523,
                        "z": 1.6268432140350342
                    },
                    "normal": {
                        "x": 0.0007709646015428007,
                        "y": 0.9065051674842834,
                        "z": 0.42219412326812744
                    }
                },
                {
                    "position": {
                        "x": 2.153557300567627,
                        "y": -8.260542869567871,
                        "z": 0.8416805863380432
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 4.764552485880813e-08,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 2.153557300567627,
                        "y": -8.260542869567871,
                        "z": -0.33886075019836426
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 4.764552130609445e-08,
                        "z": 0.0
                    }
                }
            ]
        },
        "Hulls_hull.slick": {
            "collection": "Hulls",
            "object_name": "hull.slick",
            "dimensions": {
                "width": 1.4165889024734497,
                "height": 2.500062942504883,
                "depth": 8.840755462646484
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.12338511645793915,
                        "y": -0.2896222770214081,
                        "z": 1.0428279638290405
                    },
                    "normal": {
                        "x": 2.7153629389431444e-07,
                        "y": 0.10953712463378906,
                        "z": 0.9939826726913452
                    }
                },
                {
                    "position": {
                        "x": -0.1434403359889984,
                        "y": -2.491626024246216,
                        "z": 0.990713357925415
                    },
                    "normal": {
                        "x": -7.31879936211044e-07,
                        "y": -0.2438219040632248,
                        "z": 0.969819962978363
                    }
                },
                {
                    "position": {
                        "x": -0.27155768871307373,
                        "y": 0.6880479454994202,
                        "z": -1.1295925378799438
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.2715578079223633,
                        "y": -0.7412539124488831,
                        "z": -1.1295925378799438
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.24519948661327362,
                        "y": 4.395837306976318,
                        "z": -1.0562732219696045
                    },
                    "normal": {
                        "x": 4.860306148657401e-07,
                        "y": 0.9999281167984009,
                        "z": -0.011985426768660545
                    }
                },
                {
                    "position": {
                        "x": -0.202865332365036,
                        "y": 4.397408485412598,
                        "z": -0.5962953567504883
                    },
                    "normal": {
                        "x": 1.1752553064070526e-06,
                        "y": 1.0,
                        "z": 5.736133061873261e-07
                    }
                },
                {
                    "position": {
                        "x": -0.2391556203365326,
                        "y": -2.6243269443511963,
                        "z": -0.9538295269012451
                    },
                    "normal": {
                        "x": 1.5314764972677863e-13,
                        "y": 4.992685376237205e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.2966516315937042,
                        "y": -4.44334602355957,
                        "z": -0.766431987285614
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.23915593326091766,
                        "y": -3.9620041847229004,
                        "z": -0.9538301229476929
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 3.095754834703257e-07,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.21713140606880188,
                        "y": -3.9620046615600586,
                        "z": 0.24296694993972778
                    },
                    "normal": {
                        "x": -7.085548645591189e-07,
                        "y": -0.322387158870697,
                        "z": 0.9466078281402588
                    }
                },
                {
                    "position": {
                        "x": -0.6397840976715088,
                        "y": 0.27834591269493103,
                        "z": -0.21713025867938995
                    },
                    "normal": {
                        "x": -0.9536578059196472,
                        "y": 8.127416606384941e-08,
                        "z": 0.3008933663368225
                    }
                },
                {
                    "position": {
                        "x": -0.6392755508422852,
                        "y": -2.6243271827697754,
                        "z": -0.2933287024497986
                    },
                    "normal": {
                        "x": -0.9720397591590881,
                        "y": 7.513216928600741e-07,
                        "z": 0.2348162978887558
                    }
                },
                {
                    "position": {
                        "x": -0.14877435564994812,
                        "y": 3.682015895843506,
                        "z": -1.3476189374923706
                    },
                    "normal": {
                        "x": 2.0127120456403524e-12,
                        "y": 1.0047536989077344e-06,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.4932570159435272,
                        "y": 0.2783457934856415,
                        "z": 0.2472759336233139
                    },
                    "normal": {
                        "x": -0.953657865524292,
                        "y": 5.3929838372823724e-08,
                        "z": 0.3008933365345001
                    }
                },
                {
                    "position": {
                        "x": -0.4927483797073364,
                        "y": -2.6243269443511963,
                        "z": 0.24848829209804535
                    },
                    "normal": {
                        "x": -0.9538450241088867,
                        "y": 6.963346095290035e-07,
                        "z": 0.3002992868423462
                    }
                },
                {
                    "position": {
                        "x": -0.24900758266448975,
                        "y": -4.44334602355957,
                        "z": -0.07406090199947357
                    },
                    "normal": {
                        "x": -9.57475094764959e-07,
                        "y": -1.0,
                        "z": 1.993545311052003e-07
                    }
                },
                {
                    "position": {
                        "x": -0.31751543283462524,
                        "y": -4.44334602355957,
                        "z": -0.4030957818031311
                    },
                    "normal": {
                        "x": -3.754440172087925e-07,
                        "y": -1.0,
                        "z": -5.993936724735249e-07
                    }
                },
                {
                    "position": {
                        "x": -0.14132192730903625,
                        "y": -1.7130546569824219,
                        "z": 1.119165062904358
                    },
                    "normal": {
                        "x": -2.298512242759898e-07,
                        "y": -0.08290734887123108,
                        "z": 0.996557354927063
                    }
                },
                {
                    "position": {
                        "x": -0.21712999045848846,
                        "y": 2.463216543197632,
                        "z": 0.4342610538005829
                    },
                    "normal": {
                        "x": -5.901223520260457e-13,
                        "y": -8.598877911936142e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.27155745029449463,
                        "y": 2.459317684173584,
                        "z": -1.1295925378799438
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.12338511645793915,
                        "y": -0.2896222770214081,
                        "z": 1.0428279638290405
                    },
                    "normal": {
                        "x": -2.7153629389431444e-07,
                        "y": 0.10953712463378906,
                        "z": 0.9939826726913452
                    }
                },
                {
                    "position": {
                        "x": 0.1434403359889984,
                        "y": -2.491626262664795,
                        "z": 0.990713357925415
                    },
                    "normal": {
                        "x": 7.31879936211044e-07,
                        "y": -0.2438219040632248,
                        "z": 0.969819962978363
                    }
                },
                {
                    "position": {
                        "x": 0.27155768871307373,
                        "y": 0.6880479454994202,
                        "z": -1.1295925378799438
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.2715578079223633,
                        "y": -0.7412538528442383,
                        "z": -1.1295925378799438
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.24519948661327362,
                        "y": 4.395837783813477,
                        "z": -1.0562732219696045
                    },
                    "normal": {
                        "x": -4.860306148657401e-07,
                        "y": 0.9999281167984009,
                        "z": -0.011985426768660545
                    }
                },
                {
                    "position": {
                        "x": 0.202865332365036,
                        "y": 4.397408485412598,
                        "z": -0.5962953567504883
                    },
                    "normal": {
                        "x": -1.1752553064070526e-06,
                        "y": 1.0,
                        "z": 5.736133061873261e-07
                    }
                },
                {
                    "position": {
                        "x": 0.2391556203365326,
                        "y": -2.6243271827697754,
                        "z": -0.9538295865058899
                    },
                    "normal": {
                        "x": -1.5314764972677863e-13,
                        "y": 4.992685376237205e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.2966516315937042,
                        "y": -4.44334602355957,
                        "z": -0.7664320468902588
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.23915593326091766,
                        "y": -3.9620041847229004,
                        "z": -0.9538301229476929
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 3.095754834703257e-07,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.21713140606880188,
                        "y": -3.9620046615600586,
                        "z": 0.24296696484088898
                    },
                    "normal": {
                        "x": 7.085548645591189e-07,
                        "y": -0.322387158870697,
                        "z": 0.9466078281402588
                    }
                },
                {
                    "position": {
                        "x": 0.6397841572761536,
                        "y": 0.27834588289260864,
                        "z": -0.21713025867938995
                    },
                    "normal": {
                        "x": 0.9536578059196472,
                        "y": 8.127416606384941e-08,
                        "z": 0.3008933663368225
                    }
                },
                {
                    "position": {
                        "x": 0.6392754912376404,
                        "y": -2.6243271827697754,
                        "z": -0.29332873225212097
                    },
                    "normal": {
                        "x": 0.9720397591590881,
                        "y": 7.513216928600741e-07,
                        "z": 0.2348162978887558
                    }
                },
                {
                    "position": {
                        "x": 0.14877435564994812,
                        "y": 3.682016134262085,
                        "z": -1.3476189374923706
                    },
                    "normal": {
                        "x": -2.0127120456403524e-12,
                        "y": 1.0047536989077344e-06,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.4932570457458496,
                        "y": 0.2783457934856415,
                        "z": 0.2472759187221527
                    },
                    "normal": {
                        "x": 0.953657865524292,
                        "y": 5.3929838372823724e-08,
                        "z": 0.3008933365345001
                    }
                },
                {
                    "position": {
                        "x": 0.4927483797073364,
                        "y": -2.6243271827697754,
                        "z": 0.24848827719688416
                    },
                    "normal": {
                        "x": 0.9538450241088867,
                        "y": 6.963346095290035e-07,
                        "z": 0.3002992868423462
                    }
                },
                {
                    "position": {
                        "x": 0.24900758266448975,
                        "y": -4.44334602355957,
                        "z": -0.07406090945005417
                    },
                    "normal": {
                        "x": 9.57475094764959e-07,
                        "y": -1.0,
                        "z": 1.993545311052003e-07
                    }
                },
                {
                    "position": {
                        "x": 0.31751543283462524,
                        "y": -4.44334602355957,
                        "z": -0.4030957520008087
                    },
                    "normal": {
                        "x": 3.754440172087925e-07,
                        "y": -1.0,
                        "z": -5.993936724735249e-07
                    }
                },
                {
                    "position": {
                        "x": 0.14132192730903625,
                        "y": -1.7130546569824219,
                        "z": 1.119165062904358
                    },
                    "normal": {
                        "x": 2.298512242759898e-07,
                        "y": -0.08290734887123108,
                        "z": 0.996557354927063
                    }
                },
                {
                    "position": {
                        "x": 0.21712999045848846,
                        "y": 2.463216543197632,
                        "z": 0.4342610538005829
                    },
                    "normal": {
                        "x": 5.901223520260457e-13,
                        "y": -8.598877911936142e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.27155745029449463,
                        "y": 2.459317684173584,
                        "z": -1.1295925378799438
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                }
            ]
        },
        "Hulls_hull.fish": {
            "collection": "Hulls",
            "object_name": "hull.fish",
            "dimensions": {
                "width": 2.063112497329712,
                "height": 1.9594241380691528,
                "depth": 5.581357955932617
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.17370650172233582,
                        "y": 0.5896077752113342,
                        "z": -0.43245428800582886
                    },
                    "normal": {
                        "x": 3.392382907918545e-08,
                        "y": 0.1535504162311554,
                        "z": -0.9881407618522644
                    }
                },
                {
                    "position": {
                        "x": -0.17370659112930298,
                        "y": -0.03507278114557266,
                        "z": 0.6646218299865723
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.17370668053627014,
                        "y": -1.0662602186203003,
                        "z": -0.48098987340927124
                    },
                    "normal": {
                        "x": 7.112906658525257e-15,
                        "y": 4.145849530345913e-08,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.1483115553855896,
                        "y": 1.5315147638320923,
                        "z": -0.25595247745513916
                    },
                    "normal": {
                        "x": 1.5492130955863104e-07,
                        "y": 0.22564204037189484,
                        "z": -0.9742103219032288
                    }
                },
                {
                    "position": {
                        "x": -0.08320383727550507,
                        "y": 2.1198177337646484,
                        "z": 0.18292120099067688
                    },
                    "normal": {
                        "x": 1.4327379176393151e-06,
                        "y": 1.0,
                        "z": 1.1455116369352147e-13
                    }
                },
                {
                    "position": {
                        "x": -0.5660613775253296,
                        "y": -3.428175926208496,
                        "z": 0.40078991651535034
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9626776576042175,
                        "z": -0.27065032720565796
                    }
                },
                {
                    "position": {
                        "x": -0.56606125831604,
                        "y": -3.428175926208496,
                        "z": -0.22682343423366547
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9918588399887085,
                        "z": 0.12734222412109375
                    }
                },
                {
                    "position": {
                        "x": -0.8805279731750488,
                        "y": -1.2343789339065552,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -0.9881883263587952,
                        "y": -0.15324486792087555,
                        "z": -3.164663553434366e-07
                    }
                },
                {
                    "position": {
                        "x": -0.9744524955749512,
                        "y": -0.5638781189918518,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -0.9922674298286438,
                        "y": -0.12411842495203018,
                        "z": -3.089458004978951e-07
                    }
                },
                {
                    "position": {
                        "x": -0.9783439636230469,
                        "y": 0.10662271082401276,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -0.9936228394508362,
                        "y": 0.1127542182803154,
                        "z": -2.4749422777858854e-07
                    }
                },
                {
                    "position": {
                        "x": -0.8844195008277893,
                        "y": 0.7771234512329102,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -0.9863910675048828,
                        "y": 0.1644161343574524,
                        "z": -4.0363840980717214e-07
                    }
                },
                {
                    "position": {
                        "x": -0.56606125831604,
                        "y": -2.0547237396240234,
                        "z": -0.5624843239784241
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.56606125831604,
                        "y": -2.374774217605591,
                        "z": -0.5624843239784241
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.56606125831604,
                        "y": -2.694824695587158,
                        "z": -0.5624843239784241
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.56606125831604,
                        "y": -3.0148751735687256,
                        "z": -0.5624843239784241
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.6701839566230774,
                        "y": -2.0547237396240234,
                        "z": 0.8213503360748291
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.6701839566230774,
                        "y": -2.374774217605591,
                        "z": 0.8213503360748291
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.6701839566230774,
                        "y": -2.694824695587158,
                        "z": 0.8213503360748291
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.6701839566230774,
                        "y": -3.0148754119873047,
                        "z": 0.8213503360748291
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.995458722114563,
                        "y": -2.0547237396240234,
                        "z": 0.6650964021682739
                    },
                    "normal": {
                        "x": -0.9583398103713989,
                        "y": 0.0,
                        "z": 0.28563055396080017
                    }
                },
                {
                    "position": {
                        "x": -0.995458722114563,
                        "y": -2.37477445602417,
                        "z": 0.6650964021682739
                    },
                    "normal": {
                        "x": -0.9583398103713989,
                        "y": 0.0,
                        "z": 0.28563058376312256
                    }
                },
                {
                    "position": {
                        "x": -0.995458722114563,
                        "y": -2.694824695587158,
                        "z": 0.6650964021682739
                    },
                    "normal": {
                        "x": -0.9583398103713989,
                        "y": 0.0,
                        "z": 0.28563058376312256
                    }
                },
                {
                    "position": {
                        "x": -0.995458722114563,
                        "y": -3.0148751735687256,
                        "z": 0.6650964021682739
                    },
                    "normal": {
                        "x": -0.9583398103713989,
                        "y": 0.0,
                        "z": 0.28563055396080017
                    }
                },
                {
                    "position": {
                        "x": -0.07680018246173859,
                        "y": -2.8123021125793457,
                        "z": 0.671824038028717
                    },
                    "normal": {
                        "x": -3.688565470838512e-07,
                        "y": -0.23402932286262512,
                        "z": 0.9722294807434082
                    }
                },
                {
                    "position": {
                        "x": -0.0768001601099968,
                        "y": -3.163423776626587,
                        "z": 0.2623928487300873
                    },
                    "normal": {
                        "x": -1.5523505680903327e-06,
                        "y": -0.9999989867210388,
                        "z": -0.0014548917533829808
                    }
                },
                {
                    "position": {
                        "x": -0.07246757298707962,
                        "y": 1.6357367038726807,
                        "z": 0.7546805143356323
                    },
                    "normal": {
                        "x": -4.64013169221289e-07,
                        "y": -0.3418129086494446,
                        "z": -0.9397680163383484
                    }
                },
                {
                    "position": {
                        "x": -0.07680018246173859,
                        "y": -2.122089385986328,
                        "z": 0.9557008743286133
                    },
                    "normal": {
                        "x": -2.469221840328828e-07,
                        "y": -0.507125735282898,
                        "z": 0.8618720173835754
                    }
                },
                {
                    "position": {
                        "x": 0.17370650172233582,
                        "y": 0.5896077156066895,
                        "z": -0.43245425820350647
                    },
                    "normal": {
                        "x": -3.392382907918545e-08,
                        "y": 0.1535504162311554,
                        "z": -0.9881407618522644
                    }
                },
                {
                    "position": {
                        "x": 0.17370659112930298,
                        "y": -0.03507278859615326,
                        "z": 0.6646218299865723
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.17370668053627014,
                        "y": -1.0662602186203003,
                        "z": -0.48098987340927124
                    },
                    "normal": {
                        "x": -7.112906658525257e-15,
                        "y": 4.145849530345913e-08,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.1483115553855896,
                        "y": 1.5315148830413818,
                        "z": -0.25595247745513916
                    },
                    "normal": {
                        "x": -1.5492130955863104e-07,
                        "y": 0.22564204037189484,
                        "z": -0.9742103219032288
                    }
                },
                {
                    "position": {
                        "x": 0.08320383727550507,
                        "y": 2.1198177337646484,
                        "z": 0.18292120099067688
                    },
                    "normal": {
                        "x": -1.4327379176393151e-06,
                        "y": 1.0,
                        "z": 1.1455116369352147e-13
                    }
                },
                {
                    "position": {
                        "x": 0.5660613775253296,
                        "y": -3.428175926208496,
                        "z": 0.40078991651535034
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9626776576042175,
                        "z": -0.27065032720565796
                    }
                },
                {
                    "position": {
                        "x": 0.5660611987113953,
                        "y": -3.428175926208496,
                        "z": -0.22682341933250427
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9918588399887085,
                        "z": 0.12734222412109375
                    }
                },
                {
                    "position": {
                        "x": 0.8805279731750488,
                        "y": -1.2343789339065552,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 0.9881883263587952,
                        "y": -0.15324486792087555,
                        "z": -3.164663553434366e-07
                    }
                },
                {
                    "position": {
                        "x": 0.9744523763656616,
                        "y": -0.5638781189918518,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 0.9922674298286438,
                        "y": -0.12411842495203018,
                        "z": -3.089458004978951e-07
                    }
                },
                {
                    "position": {
                        "x": 0.9783439636230469,
                        "y": 0.10662271082401276,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 0.9936228394508362,
                        "y": 0.1127542182803154,
                        "z": -2.4749422777858854e-07
                    }
                },
                {
                    "position": {
                        "x": 0.8844194412231445,
                        "y": 0.7771234512329102,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 0.9863910675048828,
                        "y": 0.1644161343574524,
                        "z": -4.0363840980717214e-07
                    }
                },
                {
                    "position": {
                        "x": 0.5660611987113953,
                        "y": -2.0547237396240234,
                        "z": -0.5624843239784241
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.5660611987113953,
                        "y": -2.374774217605591,
                        "z": -0.5624843239784241
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.5660611987113953,
                        "y": -2.694824695587158,
                        "z": -0.5624843239784241
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.5660611987113953,
                        "y": -3.0148749351501465,
                        "z": -0.5624843239784241
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.6701839566230774,
                        "y": -2.0547237396240234,
                        "z": 0.8213503360748291
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.6701839566230774,
                        "y": -2.374774217605591,
                        "z": 0.8213503360748291
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.6701839566230774,
                        "y": -2.694824695587158,
                        "z": 0.8213503360748291
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.6701839566230774,
                        "y": -3.0148754119873047,
                        "z": 0.8213503360748291
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.995458722114563,
                        "y": -2.0547237396240234,
                        "z": 0.6650964021682739
                    },
                    "normal": {
                        "x": 0.9583398103713989,
                        "y": 0.0,
                        "z": 0.28563055396080017
                    }
                },
                {
                    "position": {
                        "x": 0.995458722114563,
                        "y": -2.374774217605591,
                        "z": 0.6650964021682739
                    },
                    "normal": {
                        "x": 0.9583398103713989,
                        "y": 0.0,
                        "z": 0.28563058376312256
                    }
                },
                {
                    "position": {
                        "x": 0.995458722114563,
                        "y": -2.694824695587158,
                        "z": 0.6650964021682739
                    },
                    "normal": {
                        "x": 0.9583398103713989,
                        "y": 0.0,
                        "z": 0.28563058376312256
                    }
                },
                {
                    "position": {
                        "x": 0.995458722114563,
                        "y": -3.0148749351501465,
                        "z": 0.6650964021682739
                    },
                    "normal": {
                        "x": 0.9583398103713989,
                        "y": 0.0,
                        "z": 0.28563055396080017
                    }
                },
                {
                    "position": {
                        "x": 0.07680018246173859,
                        "y": -2.8123018741607666,
                        "z": 0.671824038028717
                    },
                    "normal": {
                        "x": 3.688565470838512e-07,
                        "y": -0.23402932286262512,
                        "z": 0.9722294807434082
                    }
                },
                {
                    "position": {
                        "x": 0.0768001601099968,
                        "y": -3.163424015045166,
                        "z": 0.2623928487300873
                    },
                    "normal": {
                        "x": 1.5523505680903327e-06,
                        "y": -0.9999989867210388,
                        "z": -0.0014548917533829808
                    }
                },
                {
                    "position": {
                        "x": 0.07246757298707962,
                        "y": 1.6357365846633911,
                        "z": 0.7546804547309875
                    },
                    "normal": {
                        "x": 4.64013169221289e-07,
                        "y": -0.3418129086494446,
                        "z": -0.9397680163383484
                    }
                },
                {
                    "position": {
                        "x": 0.07680018246173859,
                        "y": -2.122089385986328,
                        "z": 0.9557008743286133
                    },
                    "normal": {
                        "x": 2.469221840328828e-07,
                        "y": -0.507125735282898,
                        "z": 0.8618720173835754
                    }
                }
            ]
        },
        "Hulls_hull.rib": {
            "collection": "Hulls",
            "object_name": "hull.rib",
            "dimensions": {
                "width": 2.967479944229126,
                "height": 3.696343421936035,
                "depth": 10.57741928100586
            },
            "face_information": [
                {
                    "position": {
                        "x": -1.0463755130767822,
                        "y": -3.8696694374084473,
                        "z": -1.6076035499572754
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.0463755130767822,
                        "y": -2.8488852977752686,
                        "z": -1.6076035499572754
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.4817192256450653,
                        "y": -5.8477654457092285,
                        "z": -1.0974411964416504
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.27074167132377625,
                        "y": 2.679058790206909,
                        "z": -0.7022675275802612
                    },
                    "normal": {
                        "x": 2.2254870657434367e-07,
                        "y": 0.25110816955566406,
                        "z": -0.967958927154541
                    }
                },
                {
                    "position": {
                        "x": -0.8554712533950806,
                        "y": -0.1834789514541626,
                        "z": -1.1331449747085571
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 0.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": -1.2290163040161133,
                        "y": 1.500400424003601,
                        "z": -6.705522537231445e-08
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": 1.2976494190297672e-07,
                        "z": -1.5285847609902703e-07
                    }
                },
                {
                    "position": {
                        "x": -0.3839684724807739,
                        "y": -0.18347910046577454,
                        "z": -1.6885180473327637
                    },
                    "normal": {
                        "x": -3.104663619524217e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.13026435673236847,
                        "y": 3.571938991546631,
                        "z": 0.5211349129676819
                    },
                    "normal": {
                        "x": 1.8302672515346785e-06,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.25978100299835205,
                        "y": -2.906480312347412,
                        "z": 1.3547170162200928
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.2597811222076416,
                        "y": -3.976975440979004,
                        "z": 1.3547170162200928
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.25978124141693115,
                        "y": -5.073208808898926,
                        "z": 1.3547170162200928
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.2651822566986084,
                        "y": -4.217204570770264,
                        "z": -1.9912993907928467
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.2651822566986084,
                        "y": -3.1051363945007324,
                        "z": -1.9912993907928467
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.2651823163032532,
                        "y": -5.300655364990234,
                        "z": -1.9103866815567017
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.15163928270339966,
                        "z": -0.9884358644485474
                    }
                },
                {
                    "position": {
                        "x": -0.23445531725883484,
                        "y": -5.9760212898254395,
                        "z": 0.7121151089668274
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.9372740387916565,
                        "y": -5.976020812988281,
                        "z": -0.046903908252716064
                    },
                    "normal": {
                        "x": -0.9999999403953552,
                        "y": 1.58778078684918e-07,
                        "z": -5.903303303966823e-07
                    }
                },
                {
                    "position": {
                        "x": -0.15929192304611206,
                        "y": 2.5869319438934326,
                        "z": 1.5554735660552979
                    },
                    "normal": {
                        "x": -0.018103094771504402,
                        "y": -7.020535122137517e-07,
                        "z": 0.9998362064361572
                    }
                },
                {
                    "position": {
                        "x": -0.17252600193023682,
                        "y": 1.5507686138153076,
                        "z": 1.6992794275283813
                    },
                    "normal": {
                        "x": -0.03339293971657753,
                        "y": -1.4038818108019768e-06,
                        "z": 0.9994423389434814
                    }
                },
                {
                    "position": {
                        "x": -0.16913090646266937,
                        "y": 0.5146064758300781,
                        "z": 1.5896458625793457
                    },
                    "normal": {
                        "x": -0.028635894879698753,
                        "y": -1.40779116009071e-06,
                        "z": 0.9995899200439453
                    }
                },
                {
                    "position": {
                        "x": -0.1546255350112915,
                        "y": -0.521555483341217,
                        "z": 1.4010562896728516
                    },
                    "normal": {
                        "x": -0.0068617211654782295,
                        "y": -1.4120801097305957e-06,
                        "z": 0.9999764561653137
                    }
                },
                {
                    "position": {
                        "x": -0.15266603231430054,
                        "y": -1.5639655590057373,
                        "z": 1.388509750366211
                    },
                    "normal": {
                        "x": -0.00555995712056756,
                        "y": 1.1306052760673424e-09,
                        "z": 0.9999845623970032
                    }
                },
                {
                    "position": {
                        "x": -0.13026422262191772,
                        "y": 3.736936092376709,
                        "z": 1.3984445333480835
                    },
                    "normal": {
                        "x": 2.745403662629542e-06,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.13026422262191772,
                        "y": 3.736936092376709,
                        "z": 1.0867252349853516
                    },
                    "normal": {
                        "x": 2.7454034352558665e-06,
                        "y": 0.9999999403953552,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.45506471395492554,
                        "y": 1.3185752630233765,
                        "z": -1.1751444339752197
                    },
                    "normal": {
                        "x": -1.7930882734162878e-07,
                        "y": -2.77803906101326e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 1.0463755130767822,
                        "y": -3.8696696758270264,
                        "z": -1.6076034307479858
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.0463755130767822,
                        "y": -2.8488855361938477,
                        "z": -1.6076034307479858
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.4817192256450653,
                        "y": -5.847765922546387,
                        "z": -1.0974410772323608
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": 0.27074167132377625,
                        "y": 2.6790590286254883,
                        "z": -0.7022675275802612
                    },
                    "normal": {
                        "x": -2.2254870657434367e-07,
                        "y": 0.25110816955566406,
                        "z": -0.967958927154541
                    }
                },
                {
                    "position": {
                        "x": 0.8554712533950806,
                        "y": -0.1834789663553238,
                        "z": -1.1331449747085571
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.2290163040161133,
                        "y": 1.500400424003601,
                        "z": -6.705522537231445e-08
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 1.2976494190297672e-07,
                        "z": -1.5285847609902703e-07
                    }
                },
                {
                    "position": {
                        "x": 0.3839684724807739,
                        "y": -0.18347910046577454,
                        "z": -1.6885180473327637
                    },
                    "normal": {
                        "x": 3.104663619524217e-07,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.13026435673236847,
                        "y": 3.5719387531280518,
                        "z": 0.5211349129676819
                    },
                    "normal": {
                        "x": -1.8302672515346785e-06,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.25978100299835205,
                        "y": -2.906480312347412,
                        "z": 1.3547170162200928
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.2597811222076416,
                        "y": -3.976975440979004,
                        "z": 1.3547170162200928
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.25978124141693115,
                        "y": -5.073208808898926,
                        "z": 1.3547170162200928
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.2651822566986084,
                        "y": -4.217204570770264,
                        "z": -1.9912993907928467
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.2651822566986084,
                        "y": -3.1051363945007324,
                        "z": -1.9912993907928467
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 0.2651823163032532,
                        "y": -5.300655364990234,
                        "z": -1.910386562347412
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.15163928270339966,
                        "z": -0.9884358644485474
                    }
                },
                {
                    "position": {
                        "x": 0.23445531725883484,
                        "y": -5.976020812988281,
                        "z": 0.7121151089668274
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.9372740387916565,
                        "y": -5.976020336151123,
                        "z": -0.04690389335155487
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 1.58778078684918e-07,
                        "z": -5.903303303966823e-07
                    }
                },
                {
                    "position": {
                        "x": 0.15929192304611206,
                        "y": 2.5869317054748535,
                        "z": 1.5554734468460083
                    },
                    "normal": {
                        "x": 0.018103094771504402,
                        "y": -7.020535122137517e-07,
                        "z": 0.9998362064361572
                    }
                },
                {
                    "position": {
                        "x": 0.17252600193023682,
                        "y": 1.5507687330245972,
                        "z": 1.6992794275283813
                    },
                    "normal": {
                        "x": 0.03339293971657753,
                        "y": -1.4038818108019768e-06,
                        "z": 0.9994423389434814
                    }
                },
                {
                    "position": {
                        "x": 0.16913090646266937,
                        "y": 0.5146064758300781,
                        "z": 1.5896457433700562
                    },
                    "normal": {
                        "x": 0.028635894879698753,
                        "y": -1.40779116009071e-06,
                        "z": 0.9995899200439453
                    }
                },
                {
                    "position": {
                        "x": 0.1546255350112915,
                        "y": -0.521555483341217,
                        "z": 1.401056170463562
                    },
                    "normal": {
                        "x": 0.0068617211654782295,
                        "y": -1.4120801097305957e-06,
                        "z": 0.9999764561653137
                    }
                },
                {
                    "position": {
                        "x": 0.15266603231430054,
                        "y": -1.5639655590057373,
                        "z": 1.388509750366211
                    },
                    "normal": {
                        "x": 0.00555995712056756,
                        "y": 1.1306052760673424e-09,
                        "z": 0.9999845623970032
                    }
                },
                {
                    "position": {
                        "x": 0.13026422262191772,
                        "y": 3.736936092376709,
                        "z": 1.398444414138794
                    },
                    "normal": {
                        "x": -2.745403662629542e-06,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.13026422262191772,
                        "y": 3.736936092376709,
                        "z": 1.0867252349853516
                    },
                    "normal": {
                        "x": -2.7454034352558665e-06,
                        "y": 0.9999999403953552,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.45506471395492554,
                        "y": 1.318575382232666,
                        "z": -1.1751444339752197
                    },
                    "normal": {
                        "x": 1.7930882734162878e-07,
                        "y": -2.77803906101326e-07,
                        "z": -1.0
                    }
                }
            ]
        },
        "Hulls_hull.long": {
            "collection": "Hulls",
            "object_name": "hull.long",
            "dimensions": {
                "width": 3.441624402999878,
                "height": 4.340109825134277,
                "depth": 28.03052520751953
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.619705080986023,
                        "y": -5.43317985534668,
                        "z": -2.3619983196258545
                    },
                    "normal": {
                        "x": -0.03178589791059494,
                        "y": -0.14638420939445496,
                        "z": 0.9887170195579529
                    }
                },
                {
                    "position": {
                        "x": 0.16943584382534027,
                        "y": 0.9178371429443359,
                        "z": 1.373867154121399
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.16943581402301788,
                        "y": 9.013914108276367,
                        "z": 1.3005702495574951
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.2654634714126587,
                        "z": -0.9641210436820984
                    }
                },
                {
                    "position": {
                        "x": 0.2506459355354309,
                        "y": -12.004512786865234,
                        "z": -2.5273003578186035
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 4.688080537107453e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.25064635276794434,
                        "y": -13.83534049987793,
                        "z": -2.5272998809814453
                    },
                    "normal": {
                        "x": -2.9729143409193415e-13,
                        "y": 3.125386172087019e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.250646710395813,
                        "y": -15.666171073913574,
                        "z": -2.527299404144287
                    },
                    "normal": {
                        "x": -5.945817297715872e-13,
                        "y": 3.1253847510015476e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.12831763923168182,
                        "y": 9.225552558898926,
                        "z": -0.9154036045074463
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.1439228057861328,
                        "y": -2.3279857635498047,
                        "z": 0.5847743153572083
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -2.332695032691845e-07,
                        "z": 1.435475383004814e-07
                    }
                },
                {
                    "position": {
                        "x": 0.31661102175712585,
                        "y": -17.45929718017578,
                        "z": -1.5475314855575562
                    },
                    "normal": {
                        "x": -3.0121325380605413e-06,
                        "y": 1.0,
                        "z": 3.9528474352241993e-13
                    }
                },
                {
                    "position": {
                        "x": 0.3166114091873169,
                        "y": -18.00474739074707,
                        "z": -0.1975986361503601
                    },
                    "normal": {
                        "x": -1.5060643363540294e-06,
                        "y": 0.9999999403953552,
                        "z": -7.586135780002223e-06
                    }
                },
                {
                    "position": {
                        "x": 0.31661149859428406,
                        "y": -18.18927001953125,
                        "z": 1.3140933513641357
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.31661146879196167,
                        "y": -18.18927001953125,
                        "z": 0.5331223011016846
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.12831763923168182,
                        "y": 9.225552558898926,
                        "z": -1.232084035873413
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.12831763923168182,
                        "y": 9.225552558898926,
                        "z": -1.5018911361694336
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.6976497173309326,
                        "y": -4.504899501800537,
                        "z": -2.648207664489746
                    },
                    "normal": {
                        "x": 0.0008844429976306856,
                        "y": 0.0,
                        "z": 0.9999995827674866
                    }
                },
                {
                    "position": {
                        "x": -0.619705080986023,
                        "y": -5.4331793785095215,
                        "z": -2.3619983196258545
                    },
                    "normal": {
                        "x": 0.03178589791059494,
                        "y": -0.14638420939445496,
                        "z": 0.9887170195579529
                    }
                },
                {
                    "position": {
                        "x": -0.16943584382534027,
                        "y": 0.9178371429443359,
                        "z": 1.373867154121399
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -0.16943581402301788,
                        "y": 9.013914108276367,
                        "z": 1.3005702495574951
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.2654634714126587,
                        "z": -0.9641210436820984
                    }
                },
                {
                    "position": {
                        "x": -0.2506459355354309,
                        "y": -12.004511833190918,
                        "z": -2.5273003578186035
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 4.688080537107453e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.25064635276794434,
                        "y": -13.835341453552246,
                        "z": -2.5272998809814453
                    },
                    "normal": {
                        "x": 2.9729143409193415e-13,
                        "y": 3.125386172087019e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.250646710395813,
                        "y": -15.666170120239258,
                        "z": -2.527299404144287
                    },
                    "normal": {
                        "x": 5.945817297715872e-13,
                        "y": 3.1253847510015476e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -0.12831763923168182,
                        "y": 9.225552558898926,
                        "z": -0.9154036045074463
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -1.1439228057861328,
                        "y": -2.327986001968384,
                        "z": 0.5847742557525635
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -2.332695032691845e-07,
                        "z": 1.435475383004814e-07
                    }
                },
                {
                    "position": {
                        "x": -0.31661102175712585,
                        "y": -17.45929718017578,
                        "z": -1.5475313663482666
                    },
                    "normal": {
                        "x": 3.0121325380605413e-06,
                        "y": 1.0,
                        "z": 3.9528474352241993e-13
                    }
                },
                {
                    "position": {
                        "x": -0.3166114091873169,
                        "y": -18.004745483398438,
                        "z": -0.1975986361503601
                    },
                    "normal": {
                        "x": 1.5060643363540294e-06,
                        "y": 0.9999999403953552,
                        "z": -7.586135780002223e-06
                    }
                },
                {
                    "position": {
                        "x": -0.31661149859428406,
                        "y": -18.18927001953125,
                        "z": 1.3140933513641357
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.31661146879196167,
                        "y": -18.18927001953125,
                        "z": 0.5331223607063293
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.12831763923168182,
                        "y": 9.225552558898926,
                        "z": -1.232084035873413
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.12831763923168182,
                        "y": 9.225552558898926,
                        "z": -1.5018911361694336
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.6976497173309326,
                        "y": -4.504899501800537,
                        "z": -2.648207664489746
                    },
                    "normal": {
                        "x": -0.0008844429976306856,
                        "y": 0.0,
                        "z": 0.9999995827674866
                    }
                }
            ]
        },
        "Ships_hull.knuckle.002": {
            "collection": "Ships",
            "object_name": "hull.knuckle.002",
            "dimensions": {
                "width": 3.595008373260498,
                "height": 7.317727088928223,
                "depth": 16.29335594177246
            },
            "face_information": []
        },
        "Ships_hull.knuckle.001": {
            "collection": "Ships",
            "object_name": "hull.knuckle.001",
            "dimensions": {
                "width": 3.595008373260498,
                "height": 7.317727088928223,
                "depth": 16.29335594177246
            },
            "face_information": []
        },
        "Ships_CruiseShip.002": {
            "collection": "Ships",
            "object_name": "CruiseShip.002",
            "dimensions": {
                "width": 12.3479585647583,
                "height": 6.895923614501953,
                "depth": 23.15503692626953
            },
            "face_information": []
        },
        "Ships_DogEar.003": {
            "collection": "Ships",
            "object_name": "DogEar.003",
            "dimensions": {
                "width": 1.0093576908111572,
                "height": 0.8007861971855164,
                "depth": 2.3938095569610596
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.4901161193847656e-08,
                        "y": 2.9802322387695312e-08,
                        "z": -0.2692940831184387
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -3.501772880554199e-07,
                        "y": -0.7700576782226562,
                        "z": -0.2692940831184387
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -6.556510925292969e-07,
                        "y": -1.1824748516082764,
                        "z": 0.16399642825126648
                    },
                    "normal": {
                        "x": -4.7324525098701997e-07,
                        "y": -1.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Ships_FinRunner.002": {
            "collection": "Ships",
            "object_name": "FinRunner.002",
            "dimensions": {
                "width": 0.7862261533737183,
                "height": 1.6112067699432373,
                "depth": 7.205816268920898
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.23821714520454407,
                        "y": 5.066394805908203e-07,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -4.993070490399987e-08,
                        "z": 1.4074392140628333e-07
                    }
                }
            ]
        },
        "Ships_FinRunner.001": {
            "collection": "Ships",
            "object_name": "FinRunner.001",
            "dimensions": {
                "width": 0.7862261533737183,
                "height": 1.6112067699432373,
                "depth": 7.205816268920898
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.23821714520454407,
                        "y": 5.066394805908203e-07,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 4.993070490399987e-08,
                        "z": -1.4074392140628333e-07
                    }
                },
                {
                    "position": {
                        "x": 3.5278499126434326e-06,
                        "y": 4.525562763214111,
                        "z": 1.914799213409424e-06
                    },
                    "normal": {
                        "x": 2.147921577488887e-06,
                        "y": 1.0,
                        "z": 7.159737265283184e-07
                    }
                },
                {
                    "position": {
                        "x": -2.3543834686279297e-06,
                        "y": -2.680251359939575,
                        "z": -4.76837158203125e-07
                    },
                    "normal": {
                        "x": -1.7514801129436819e-06,
                        "y": -1.0,
                        "z": -7.506347401431412e-07
                    }
                }
            ]
        },
        "Ships_WindowBlockhalf.028": {
            "collection": "Ships",
            "object_name": "WindowBlockhalf.028",
            "dimensions": {
                "width": 0.37856703996658325,
                "height": 0.23600387573242188,
                "depth": 0.9975016117095947
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.023006677627563477,
                        "y": 0.0513477623462677,
                        "z": -0.008314497768878937
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 0.0,
                        "z": -7.372268100880319e-06
                    }
                }
            ]
        },
        "Ships_WindowBlockhalf.027": {
            "collection": "Ships",
            "object_name": "WindowBlockhalf.027",
            "dimensions": {
                "width": 0.37856703996658325,
                "height": 0.23600387573242188,
                "depth": 0.9975016117095947
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.027358680963516235,
                        "y": -0.2246617078781128,
                        "z": 0.010663270950317383
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Ships_WindowBlockhalf.002": {
            "collection": "Ships",
            "object_name": "WindowBlockhalf.002",
            "dimensions": {
                "width": 0.37856703996658325,
                "height": 0.23600389063358307,
                "depth": 0.9975016117095947
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.02518269419670105,
                        "y": -0.0866570770740509,
                        "z": -0.005383335053920746
                    },
                    "normal": {
                        "x": 0.9999999403953552,
                        "y": 0.0,
                        "z": -9.179283466664856e-08
                    }
                }
            ]
        },
        "Ships_WindowBlockhalf.000": {
            "collection": "Ships",
            "object_name": "WindowBlockhalf.000",
            "dimensions": {
                "width": 0.37856703996658325,
                "height": 0.23600389063358307,
                "depth": 0.9975016117095947
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.02518269419670105,
                        "y": -0.0866570770740509,
                        "z": -0.008293498307466507
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": -9.83277459454257e-08
                    }
                }
            ]
        },
        "Ships_hull.lump.001": {
            "collection": "Ships",
            "object_name": "hull.lump.001",
            "dimensions": {
                "width": 2.2574493885040283,
                "height": 2.827028751373291,
                "depth": 8.193129539489746
            },
            "face_information": [
                {
                    "position": {
                        "x": 8.940696716308594e-07,
                        "y": 4.739656448364258,
                        "z": -0.8554085493087769
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.8284882307052612,
                        "z": -0.5600064992904663
                    }
                },
                {
                    "position": {
                        "x": 5.662441253662109e-07,
                        "y": 2.4857640266418457,
                        "z": 1.3831151723861694
                    },
                    "normal": {
                        "x": -1.9033356162857784e-13,
                        "y": -3.1542802503281564e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 5.438923835754395e-07,
                        "y": 2.4857640266418457,
                        "z": -1.4439131021499634
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.577139840946984e-07,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": -0.8900190591812134,
                        "y": 2.4612386226654053,
                        "z": 2.905726432800293e-07
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 3.9610924318367324e-07,
                        "z": -5.245223633210117e-07
                    }
                },
                {
                    "position": {
                        "x": 0.8900200724601746,
                        "y": 2.461238384246826,
                        "z": 2.905726432800293e-07
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -4.4271033061704657e-07,
                        "z": -7.34331422336254e-07
                    }
                },
                {
                    "position": {
                        "x": -1.8849968910217285e-06,
                        "y": -3.256704092025757,
                        "z": -3.8743019104003906e-07
                    },
                    "normal": {
                        "x": -4.910346547148947e-07,
                        "y": -1.0,
                        "z": -1.8027032232421913e-13
                    }
                },
                {
                    "position": {
                        "x": -2.7194619178771973e-07,
                        "y": -1.028977632522583,
                        "z": -1.2770813703536987
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -3.8370490074157715e-07,
                        "y": -1.028977870941162,
                        "z": 1.2770812511444092
                    },
                    "normal": {
                        "x": -8.017065201808282e-13,
                        "y": -4.0815623947310087e-07,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.9134498834609985,
                        "y": -0.7590206861495972,
                        "z": -0.0006174147129058838
                    },
                    "normal": {
                        "x": 0.9567577838897705,
                        "y": 0.2908857464790344,
                        "z": 1.7206588154294877e-07
                    }
                },
                {
                    "position": {
                        "x": -0.913453221321106,
                        "y": -0.759020209312439,
                        "z": -0.0006174147129058838
                    },
                    "normal": {
                        "x": -0.9567577838897705,
                        "y": 0.2908857762813568,
                        "z": -4.916168450108671e-08
                    }
                }
            ]
        },
        "Ships_HandleHull.001": {
            "collection": "Ships",
            "object_name": "HandleHull.001",
            "dimensions": {
                "width": 2.360805034637451,
                "height": 1.9307613372802734,
                "depth": 8.028614044189453
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.03381022810935974,
                        "y": -4.69774055480957,
                        "z": 0.12193235754966736
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": -0.4295012354850769,
                        "y": 3.2820239067077637,
                        "z": 0.12193182110786438
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": -1.1049299240112305,
                        "y": -2.798766613006592,
                        "z": 0.12193211913108826
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Ships_Ram.002": {
            "collection": "Ships",
            "object_name": "Ram.002",
            "dimensions": {
                "width": 3.133126974105835,
                "height": 2.8021697998046875,
                "depth": 4.930736541748047
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.7524676322937012,
                        "z": 0.11502537131309509
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.9006348848342896,
                        "z": 0.5050883293151855
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Ships_CrabClaw.001": {
            "collection": "Ships",
            "object_name": "CrabClaw.001",
            "dimensions": {
                "width": 2.2034859657287598,
                "height": 4.606679916381836,
                "depth": 6.513511657714844
            },
            "face_information": [
                {
                    "position": {
                        "x": -8.940696716308594e-08,
                        "y": -1.489194631576538,
                        "z": 0.5423197150230408
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 4.917383193969727e-07,
                        "y": 1.8582029342651367,
                        "z": -2.003948211669922
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 8.195638656616211e-07,
                        "y": 2.8773913383483887,
                        "z": -2.003948211669922
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 6.854534149169922e-07,
                        "y": 4.129878997802734,
                        "z": 0.742599606513977
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": 1.9371509552001953e-07,
                        "y": -0.9192732572555542,
                        "z": -0.9408539533615112
                    },
                    "normal": {
                        "x": -1.987885127618938e-07,
                        "y": -1.0,
                        "z": 1.0024144359022102e-07
                    }
                },
                {
                    "position": {
                        "x": 1.4901161193847656e-07,
                        "y": -1.3704746961593628,
                        "z": -2.1670970916748047
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 2.384185791015625e-07,
                        "y": 0.7733111381530762,
                        "z": 1.7258079051971436
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Ships_Clipbridge.001": {
            "collection": "Ships",
            "object_name": "Clipbridge.001",
            "dimensions": {
                "width": 1.7261545658111572,
                "height": 1.9191646575927734,
                "depth": 2.290358066558838
            },
            "face_information": []
        },
        "Ships_double-block": {
            "collection": "Ships",
            "object_name": "double-block",
            "dimensions": {
                "width": 3.2578125,
                "height": 3.529193878173828,
                "depth": 5.0434441566467285
            },
            "face_information": [
                {
                    "position": {
                        "x": -1.2814998626708984e-06,
                        "y": -3.0512120723724365,
                        "z": 1.4727081060409546
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999999403953552,
                        "z": -0.0
                    }
                }
            ]
        },
        "Ships_Ram.001": {
            "collection": "Ships",
            "object_name": "Ram.001",
            "dimensions": {
                "width": 3.133126974105835,
                "height": 2.8021697998046875,
                "depth": 4.930736541748047
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.7524676322937012,
                        "z": -0.11502525210380554
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999999403953552,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.44623756408691406,
                        "z": 0.7012773752212524
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                }
            ]
        },
        "Ships_HandleHull.002": {
            "collection": "Ships",
            "object_name": "HandleHull.002",
            "dimensions": {
                "width": 2.360805034637451,
                "height": 1.9307613372802734,
                "depth": 8.028614044189453
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.03381025791168213,
                        "y": -4.69774055480957,
                        "z": 0.12193235754966736
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": -1.0320374965667725,
                        "y": -2.426274061203003,
                        "z": 0.1219322681427002
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.42950111627578735,
                        "y": 3.2820239067077637,
                        "z": 0.12193182110786438
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": -0.0
                    }
                }
            ]
        },
        "Ships_Gblock.001": {
            "collection": "Ships",
            "object_name": "Gblock.001",
            "dimensions": {
                "width": 1.654303789138794,
                "height": 1.769739031791687,
                "depth": 7.545317649841309
            },
            "face_information": [
                {
                    "position": {
                        "x": -9.685754776000977e-08,
                        "y": 0.4920387268066406,
                        "z": -0.8564288020133972
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 1.4156103134155273e-06,
                        "y": -3.486660957336426,
                        "z": 0.3501491844654083
                    },
                    "normal": {
                        "x": 4.765659866734495e-07,
                        "y": -1.0,
                        "z": -4.765659866734495e-07
                    }
                },
                {
                    "position": {
                        "x": 4.6193599700927734e-07,
                        "y": -1.569223403930664,
                        "z": 0.9133102297782898
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 0.9999999403953552
                    }
                },
                {
                    "position": {
                        "x": 2.7567148208618164e-07,
                        "y": -0.9122288227081299,
                        "z": 0.9133102297782898
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Ships_CruiseShip.001": {
            "collection": "Ships",
            "object_name": "CruiseShip.001",
            "dimensions": {
                "width": 1.9024596214294434,
                "height": 4.127658367156982,
                "depth": 10.987354278564453
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.834019660949707,
                        "y": 2.674083709716797,
                        "z": 0.28298914432525635
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 2.1809734107591794e-07,
                        "z": 2.24361883738311e-07
                    }
                },
                {
                    "position": {
                        "x": -0.8340216875076294,
                        "y": 2.674083709716797,
                        "z": 0.28298914432525635
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -2.492540431831003e-07,
                        "z": 4.4872390958516917e-07
                    }
                },
                {
                    "position": {
                        "x": -2.60770320892334e-07,
                        "y": -5.353609085083008,
                        "z": -0.5781659483909607
                    },
                    "normal": {
                        "x": -0.0,
                        "y": -1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -3.501772880554199e-07,
                        "y": -1.8507822751998901,
                        "z": -2.0555152893066406
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -5.289912223815918e-07,
                        "y": 0.5244765281677246,
                        "z": 1.924193024635315
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Ships_BeardHull.002": {
            "collection": "Ships",
            "object_name": "BeardHull.002",
            "dimensions": {
                "width": 15.57632064819336,
                "height": 11.663938522338867,
                "depth": 37.463565826416016
            },
            "face_information": []
        },
        "Ships_BattleShip": {
            "collection": "Ships",
            "object_name": "BattleShip",
            "dimensions": {
                "width": 15.576321601867676,
                "height": 11.663938522338867,
                "depth": 37.46356201171875
            },
            "face_information": []
        },
        "Ships_ship": {
            "collection": "Ships",
            "object_name": "ship",
            "dimensions": {
                "width": 19.122570037841797,
                "height": 12.892131805419922,
                "depth": 39.099693298339844
            },
            "face_information": []
        },
        "Ships_shipblue": {
            "collection": "Ships",
            "object_name": "shipblue",
            "dimensions": {
                "width": 19.122570037841797,
                "height": 12.892129898071289,
                "depth": 39.099693298339844
            },
            "face_information": []
        },
        "Weapons_hardPoint.dev.gas": {
            "collection": "Weapons",
            "object_name": "hardPoint.dev.gas",
            "dimensions": {
                "width": 1.7260305881500244,
                "height": 0.9266287088394165,
                "depth": 2.153050184249878
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.24217721819877625,
                        "z": 0.8422272801399231
                    },
                    "normal": {
                        "x": -0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 3.725290298461914e-09,
                        "y": 0.8553544282913208,
                        "z": 0.5704496502876282
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.9999998807907104,
                        "z": -0.000460114300949499
                    }
                },
                {
                    "position": {
                        "x": 0.7226247191429138,
                        "y": 0.8553541302680969,
                        "z": 0.5704496502876282
                    },
                    "normal": {
                        "x": 9.192656875711691e-07,
                        "y": 0.9999998807907104,
                        "z": -0.0004591990727931261
                    }
                },
                {
                    "position": {
                        "x": -0.7226247191429138,
                        "y": 0.8553541302680969,
                        "z": 0.5704496502876282
                    },
                    "normal": {
                        "x": -9.192656875711691e-07,
                        "y": 0.9999998807907104,
                        "z": -0.0004591990727931261
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.2976508140563965,
                        "z": 0.5705496072769165
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9999999403953552,
                        "z": -0.0
                    }
                },
                {
                    "position": {
                        "x": 2.9802322387695312e-08,
                        "y": -0.07476019859313965,
                        "z": 0.1028861552476883
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_hardPoint.dev.Clunk": {
            "collection": "Weapons",
            "object_name": "hardPoint.dev.Clunk",
            "dimensions": {
                "width": 1.6408754587173462,
                "height": 0.9172118306159973,
                "depth": 1.913369059562683
            },
            "face_information": []
        },
        "Weapons_hardPoint.dev.dual": {
            "collection": "Weapons",
            "object_name": "hardPoint.dev.dual",
            "dimensions": {
                "width": 1.225330114364624,
                "height": 0.8360453844070435,
                "depth": 1.7603719234466553
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.5988312363624573,
                        "y": 0.061942026019096375,
                        "z": 0.49581679701805115
                    },
                    "normal": {
                        "x": 0.9998744130134583,
                        "y": -0.013792338781058788,
                        "z": 0.007812095806002617
                    }
                },
                {
                    "position": {
                        "x": -0.5988312363624573,
                        "y": 0.061942026019096375,
                        "z": 0.49581679701805115
                    },
                    "normal": {
                        "x": -0.9998744130134583,
                        "y": -0.013792338781058788,
                        "z": 0.007812095806002617
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.20409232378005981,
                        "z": 0.7504981160163879
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.18323282897472382,
                        "z": 0.9830695390701294
                    }
                },
                {
                    "position": {
                        "x": -1.862645149230957e-09,
                        "y": -0.7146055698394775,
                        "z": 0.5335360765457153
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.9998526573181152,
                        "z": 0.017165152356028557
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 3.5762786865234375e-07,
                        "z": 0.03743015229701996
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.9999999403953552
                    }
                }
            ]
        },
        "Weapons_hardpoint.gun.bracket": {
            "collection": "Weapons",
            "object_name": "hardpoint.gun.bracket",
            "dimensions": {
                "width": 0.28297537565231323,
                "height": 0.40691107511520386,
                "depth": 1.500324010848999
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.0803341865539551e-07,
                        "y": -0.052351538091897964,
                        "z": -0.1618661880493164
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 8.568167686462402e-08,
                        "y": -0.04926152527332306,
                        "z": 0.09781220555305481
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.30385160446167e-08,
                        "y": -0.31570112705230713,
                        "z": -0.05876842513680458
                    },
                    "normal": {
                        "x": -1.478508579566551e-06,
                        "y": -0.9999999403953552,
                        "z": -5.914038752052875e-07
                    }
                }
            ]
        },
        "Weapons_Cube.002": {
            "collection": "Weapons",
            "object_name": "Cube.002",
            "dimensions": {
                "width": 0.25066888332366943,
                "height": 0.4170219898223877,
                "depth": 1.6852811574935913
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.210719347000122e-08,
                        "y": -0.048457637429237366,
                        "z": 0.1995740681886673
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 7.729977369308472e-08,
                        "y": 0.2083413302898407,
                        "z": -0.1798921376466751
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -1.7508864402770996e-07,
                        "y": -0.5730572938919067,
                        "z": 0.06973535567522049
                    },
                    "normal": {
                        "x": -4.209840085422911e-07,
                        "y": -1.0,
                        "z": -9.877659294943442e-07
                    }
                },
                {
                    "position": {
                        "x": 0.12533438205718994,
                        "y": -0.34846705198287964,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.12533438205718994,
                        "y": -0.34846705198287964,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Weapons_hardpoitn.gun.dual": {
            "collection": "Weapons",
            "object_name": "hardpoitn.gun.dual",
            "dimensions": {
                "width": 0.28554150462150574,
                "height": 0.3860030174255371,
                "depth": 1.9096742868423462
            },
            "face_information": [
                {
                    "position": {
                        "x": -7.450580596923828e-09,
                        "y": 0.162871852517128,
                        "z": 0.1718548983335495
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -5.587935447692871e-09,
                        "y": -0.17201115190982819,
                        "z": 0.05105866491794586
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -1.0,
                        "z": 3.1538800726593763e-07
                    }
                },
                {
                    "position": {
                        "x": -0.13834476470947266,
                        "y": 0.07880577445030212,
                        "z": 0.005991220474243164
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.13997423648834229,
                        "y": 0.07880574464797974,
                        "z": 0.0059912800788879395
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Weapons_hardpoint.gun.barb": {
            "collection": "Weapons",
            "object_name": "hardpoint.gun.barb",
            "dimensions": {
                "width": 0.2507562041282654,
                "height": 0.5145243406295776,
                "depth": 1.4530174732208252
            },
            "face_information": [
                {
                    "position": {
                        "x": 4.284083843231201e-08,
                        "y": -0.11192557215690613,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -4.956270913680783e-07,
                        "y": -1.0,
                        "z": -1.3313473345988314e-07
                    }
                },
                {
                    "position": {
                        "x": 5.774199962615967e-08,
                        "y": 0.08824864774942398,
                        "z": -0.1932326704263687
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 5.21540641784668e-08,
                        "y": 0.17794546484947205,
                        "z": 0.26209962368011475
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.12537798285484314,
                        "y": 0.24456584453582764,
                        "z": 0.033997077494859695
                    },
                    "normal": {
                        "x": 1.0,
                        "y": 0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": -0.12537822127342224,
                        "y": 0.2445659041404724,
                        "z": 0.0339970737695694
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Weapons_hardpoint.gun.fork": {
            "collection": "Weapons",
            "object_name": "hardpoint.gun.fork",
            "dimensions": {
                "width": 0.2530416250228882,
                "height": 0.5777534246444702,
                "depth": 1.7610139846801758
            },
            "face_information": [
                {
                    "position": {
                        "x": -3.725290298461914e-08,
                        "y": 0.05882638692855835,
                        "z": 0.29144614934921265
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -5.21540641784668e-08,
                        "y": 0.23784488439559937,
                        "z": -0.25439226627349854
                    },
                    "normal": {
                        "x": 3.553667505661745e-13,
                        "y": 3.236933991956903e-07,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -5.960464477539063e-08,
                        "y": -0.05224907398223877,
                        "z": -0.13714289665222168
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.24529531598091125,
                        "z": -0.9694483876228333
                    }
                },
                {
                    "position": {
                        "x": -0.12652087211608887,
                        "y": 0.08943289518356323,
                        "z": 0.06368443369865417
                    },
                    "normal": {
                        "x": -1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 0.12652075290679932,
                        "y": 0.08943295478820801,
                        "z": 0.06368441879749298
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -0.0,
                        "z": 0.0
                    }
                }
            ]
        },
        "Weapons_hardpoint.dev.flush": {
            "collection": "Weapons",
            "object_name": "hardpoint.dev.flush",
            "dimensions": {
                "width": 1.3702685832977295,
                "height": 0.7551456689834595,
                "depth": 1.9211723804473877
            },
            "face_information": [
                {
                    "position": {
                        "x": -5.587935447692871e-07,
                        "y": -1.0217020511627197,
                        "z": 0.07648426294326782
                    },
                    "normal": {
                        "x": -7.974035298730087e-08,
                        "y": -1.0,
                        "z": -2.4274461338791298e-06
                    }
                },
                {
                    "position": {
                        "x": -7.37607479095459e-07,
                        "y": -0.8099969029426575,
                        "z": 0.20337927341461182
                    },
                    "normal": {
                        "x": -3.5053023594855404e-08,
                        "y": -0.14421804249286652,
                        "z": 0.9895458817481995
                    }
                },
                {
                    "position": {
                        "x": 0.6851338744163513,
                        "y": -0.003014449030160904,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -5.012407768845151e-07,
                        "z": -5.438851644612441e-07
                    }
                },
                {
                    "position": {
                        "x": -0.6851338744163513,
                        "y": -0.0030143074691295624,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 5.012404926674208e-07,
                        "z": -5.438849370875687e-07
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -0.061861634254455566,
                        "z": -0.4331660270690918
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_hardpoint.dev.lowPro": {
            "collection": "Weapons",
            "object_name": "hardpoint.dev.lowPro",
            "dimensions": {
                "width": 1.5131375789642334,
                "height": 0.740803599357605,
                "depth": 1.9596586227416992
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.7565685510635376,
                        "y": -0.3378719091415405,
                        "z": 0.0
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 3.5380108442950586e-07,
                        "z": -9.061313335223531e-07
                    }
                },
                {
                    "position": {
                        "x": 0.756568193435669,
                        "y": -0.33787208795547485,
                        "z": 0.0
                    },
                    "normal": {
                        "x": 1.0,
                        "y": -3.53800828634121e-07,
                        "z": 1.132663783209864e-06
                    }
                },
                {
                    "position": {
                        "x": -0.000995934009552002,
                        "y": -1.0370973348617554,
                        "z": -1.341104507446289e-07
                    },
                    "normal": {
                        "x": -1.3273559318349726e-07,
                        "y": -1.0,
                        "z": -1.2130782351960079e-06
                    }
                },
                {
                    "position": {
                        "x": -2.9802322387695312e-08,
                        "y": -1.4901161193847656e-07,
                        "z": -0.36553025245666504
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_hardpoint.dev.cruise": {
            "collection": "Weapons",
            "object_name": "hardpoint.dev.cruise",
            "dimensions": {
                "width": 1.302577257156372,
                "height": 1.0790879726409912,
                "depth": 1.7505097389221191
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.2154555320739746,
                        "z": -0.3296804428100586
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_hardpoint.dev.hammer": {
            "collection": "Weapons",
            "object_name": "hardpoint.dev.hammer",
            "dimensions": {
                "width": 0.97054123878479,
                "height": 0.9892548322677612,
                "depth": 1.6245248317718506
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.5118459463119507,
                        "z": -0.38484323024749756
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_hardpoint.dev.dish": {
            "collection": "Weapons",
            "object_name": "hardpoint.dev.dish",
            "dimensions": {
                "width": 2.9670603275299072,
                "height": 3.425825595855713,
                "depth": 2.0067784786224365
            },
            "face_information": [
                {
                    "position": {
                        "x": 8.940696716308594e-08,
                        "y": -1.0103754997253418,
                        "z": -1.1793150901794434
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_hardpoint.base.nose": {
            "collection": "Weapons",
            "object_name": "hardpoint.base.nose",
            "dimensions": {
                "width": 2.5233936309814453,
                "height": 0.8780555129051208,
                "depth": 2.8176164627075195
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": -2.384185791015625e-07,
                        "z": 0.4865807890892029
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 3.725290298461914e-08,
                        "y": 6.407499313354492e-07,
                        "z": -0.39147472381591797
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 8.940696716308594e-08,
                        "y": 1.4088075160980225,
                        "z": -0.21924276649951935
                    },
                    "normal": {
                        "x": 1.425509594810137e-06,
                        "y": 1.0,
                        "z": 2.1483640466612997e-06
                    }
                },
                {
                    "position": {
                        "x": -2.9802322387695312e-08,
                        "y": -1.408807635307312,
                        "z": -0.21924276649951935
                    },
                    "normal": {
                        "x": -2.138264562745462e-06,
                        "y": -1.0,
                        "z": -8.05637284884142e-07
                    }
                }
            ]
        },
        "Weapons_hardpoint.base.tower": {
            "collection": "Weapons",
            "object_name": "hardpoint.base.tower",
            "dimensions": {
                "width": 1.4045706987380981,
                "height": 1.2775886058807373,
                "depth": 1.4047991037368774
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.00014994293451309204,
                        "y": 1.4901161193847656e-08,
                        "z": -0.6649297475814819
                    },
                    "normal": {
                        "x": 4.00077406084165e-05,
                        "y": -6.252379690374621e-12,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": -5.960464477539063e-08,
                        "z": 0.6126307845115662
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_hardpoint.base.clip": {
            "collection": "Weapons",
            "object_name": "hardpoint.base.clip",
            "dimensions": {
                "width": 1.209366798400879,
                "height": 0.5752457976341248,
                "depth": 2.0635416507720947
            },
            "face_information": [
                {
                    "position": {
                        "x": 5.21540641784668e-08,
                        "y": -0.3221226930618286,
                        "z": -0.07015451043844223
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": 1.9371509552001953e-07,
                        "y": 0.38664934039115906,
                        "z": 0.06615334749221802
                    },
                    "normal": {
                        "x": 3.28441359442877e-07,
                        "y": 0.9999999403953552,
                        "z": 1.0385389259681688e-06
                    }
                },
                {
                    "position": {
                        "x": -2.384185791015625e-07,
                        "y": -0.5144029855728149,
                        "z": 0.5050912499427795
                    },
                    "normal": {
                        "x": 0.0,
                        "y": -0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": -3.594905138015747e-07,
                        "y": -1.6143609285354614,
                        "z": 0.3986043632030487
                    },
                    "normal": {
                        "x": -2.9364727538450097e-07,
                        "y": -1.0,
                        "z": -4.450211008588667e-07
                    }
                }
            ]
        },
        "Weapons_hardpoint.base.cap": {
            "collection": "Weapons",
            "object_name": "hardpoint.base.cap",
            "dimensions": {
                "width": 1.3121874332427979,
                "height": 0.682742714881897,
                "depth": 1.9591069221496582
            },
            "face_information": [
                {
                    "position": {
                        "x": -1.1175870895385742e-08,
                        "y": 2.9802322387695312e-08,
                        "z": -0.24882353842258453
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -1.0
                    }
                },
                {
                    "position": {
                        "x": -1.2293457984924316e-07,
                        "y": -1.0346283912658691,
                        "z": -0.16151300072669983
                    },
                    "normal": {
                        "x": -3.822360952199233e-07,
                        "y": -0.9999999403953552,
                        "z": -6.82673658047861e-07
                    }
                },
                {
                    "position": {
                        "x": 2.980232238769531e-07,
                        "y": 0.9244781136512756,
                        "z": -0.041616667062044144
                    },
                    "normal": {
                        "x": 1.5296060951186519e-07,
                        "y": 1.0,
                        "z": 1.48187075410533e-06
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 0.4339190423488617
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_BigGun": {
            "collection": "Weapons",
            "object_name": "BigGun",
            "dimensions": {
                "width": 4.072839260101318,
                "height": 2.622154951095581,
                "depth": 5.350696563720703
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.4901161193847656e-07,
                        "y": -2.5000381469726562,
                        "z": -0.44864726066589355
                    },
                    "normal": {
                        "x": -1.067568901796977e-14,
                        "y": 5.977199180051684e-08,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 1.9371509552001953e-07,
                        "y": -2.749338150024414,
                        "z": -0.2118847370147705
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.9371509552001953e-07,
                        "y": 1.9871466159820557,
                        "z": -0.2118847370147705
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 1.0,
                        "z": 0.0
                    }
                },
                {
                    "position": {
                        "x": 1.4901161193847656e-07,
                        "y": 1.7378463745117188,
                        "z": -0.44864726066589355
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 5.977197048423477e-08,
                        "z": -0.9999999403953552
                    }
                }
            ]
        },
        "Weapons_Anti-Air-station": {
            "collection": "Weapons",
            "object_name": "Anti-Air-station",
            "dimensions": {
                "width": 0.5984303951263428,
                "height": 0.6094539165496826,
                "depth": 2.085120916366577
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.24349918961524963
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_MedGun": {
            "collection": "Weapons",
            "object_name": "MedGun",
            "dimensions": {
                "width": 1.386338710784912,
                "height": 0.7887215614318848,
                "depth": 2.095242977142334
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.00431486964225769,
                        "y": -0.005461931228637695,
                        "z": -0.38841184973716736
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_SmallGun.001": {
            "collection": "Weapons",
            "object_name": "SmallGun.001",
            "dimensions": {
                "width": 1.2162973880767822,
                "height": 0.48674607276916504,
                "depth": 0.41878536343574524
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.12488231062889099,
                        "y": 0.0,
                        "z": -0.22881418466567993
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_hardpoint.base.3x": {
            "collection": "Weapons",
            "object_name": "hardpoint.base.3x",
            "dimensions": {
                "width": 1.9798271656036377,
                "height": 0.6737138032913208,
                "depth": 2.2156870365142822
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": -1.4901161193847656e-07,
                        "z": 0.04223291203379631
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                },
                {
                    "position": {
                        "x": 0.0,
                        "y": 0.11747550964355469,
                        "z": -0.5625295639038086
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_Squirtgun": {
            "collection": "Weapons",
            "object_name": "Squirtgun",
            "dimensions": {
                "width": 0.7071393728256226,
                "height": 0.7315396666526794,
                "depth": 0.97164386510849
            },
            "face_information": [
                {
                    "position": {
                        "x": 0.0,
                        "y": -2.9802322387695312e-08,
                        "z": 0.009255610406398773
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": 1.0
                    }
                }
            ]
        },
        "Weapons_SideGunPlatform": {
            "collection": "Weapons",
            "object_name": "SideGunPlatform",
            "dimensions": {
                "width": 0.3367619514465332,
                "height": 0.5521261096000671,
                "depth": 1.1964175701141357
            },
            "face_information": [
                {
                    "position": {
                        "x": -0.07772382348775864,
                        "y": 7.82310962677002e-08,
                        "z": 0.16618385910987854
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 9.028383374243276e-08,
                        "z": -4.7282065906983917e-07
                    }
                },
                {
                    "position": {
                        "x": -0.07772383093833923,
                        "y": 8.195638656616211e-08,
                        "z": -0.16618385910987854
                    },
                    "normal": {
                        "x": -1.0,
                        "y": 9.028383374243276e-08,
                        "z": 4.7282065906983917e-07
                    }
                }
            ]
        },
        "Weapons_TurretSet": {
            "collection": "Weapons",
            "object_name": "TurretSet",
            "dimensions": {
                "width": 1.6033897399902344,
                "height": 1.1096768379211426,
                "depth": 2.1106648445129395
            },
            "face_information": [
                {
                    "position": {
                        "x": 1.4901161193847656e-08,
                        "y": -0.1002424955368042,
                        "z": -0.5883375406265259
                    },
                    "normal": {
                        "x": 0.0,
                        "y": 0.0,
                        "z": -0.9999999403953552
                    }
                }
            ]
        }
    }
    let result: any = {};
    Object.entries(temp).map(([key, value]) => {
        if (value?.face_information?.length) {
            result[key] = value;
        }
    });
    return result;
}
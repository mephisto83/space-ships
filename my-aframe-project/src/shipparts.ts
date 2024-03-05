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

export function getShipScaleFor(name: string, size: number) {
    let dimensions = getShipPartDimension(name);
    return calculateScaleToFit({
        width: dimensions?.width || 1,
        depth: dimensions?.depth || 1,
        height: dimensions?.height || 1
    }, size);
}

//   // Example usage
//   const objectDimensions = { height: 2, width: 3, depth: 1 };
//   const boxSize = 6;
//   const scale = calculateScaleToFit(objectDimensions, boxSize);
//   console.log(`Scale factor required to fit the object: ${scale}`);

export function getShipParts() {
    return {
        "Components_ventPortBlock": {
            "collection": "Components",
            "object_name": "ventPortBlock",
            "dimensions": {
                "width": 0.8979556560516357,
                "height": 0.8128712773323059,
                "depth": 3.56246280670166
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.25076159834861755,
                        0.22906982898712158,
                        -0.0369814932346344
                    ],
                    "area": 0.5770263671875,
                    "normal": [
                        -0.9948055148124695,
                        0.10179327428340912,
                        -1.8076839580771775e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2507615089416504,
                        2.3671767711639404,
                        -0.0369814932346344
                    ],
                    "area": 0.5770263075828552,
                    "normal": [
                        -0.9948056936264038,
                        -0.10179319977760315,
                        -1.29120294900531e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.1960662454366684,
                        1.2981232404708862,
                        -0.0369814932346344
                    ],
                    "area": 0.5740290284156799,
                    "normal": [
                        -1.0,
                        5.575460448881131e-08,
                        -1.387572581279528e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.05623232200741768,
                        0.229069784283638,
                        -0.30545687675476074
                    ],
                    "area": 0.4159243106842041,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.0562322661280632,
                        2.3671765327453613,
                        0.30545687675476074
                    ],
                    "area": 0.4159243106842041,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.0015370361506938934,
                        1.2981231212615967,
                        0.30545687675476074
                    ],
                    "area": 0.4159243106842041,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.05623224750161171,
                        2.3671765327453613,
                        -0.30545687675476074
                    ],
                    "area": 0.4159242808818817,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.056232426315546036,
                        0.22906973958015442,
                        0.30545687675476074
                    ],
                    "area": 0.4159242510795593,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.001536976546049118,
                        1.2981232404708862,
                        -0.30545687675476074
                    ],
                    "area": 0.41592422127723694,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.31998687982559204,
                        0.22451245784759521,
                        -0.24740365147590637
                    ],
                    "area": 0.2408006489276886,
                    "normal": [
                        0.005687144584953785,
                        -0.0012420733692124486,
                        0.9999831318855286
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.5295226573944092,
                        0.49980399012565613,
                        0.0
                    ],
                    "area": 0.9083585739135742,
                    "normal": [
                        1.0,
                        -9.483037644031356e-08,
                        -2.9082116270728875e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5295224785804749,
                        0.4998043477535248,
                        1.4901161193847656e-08
                    ],
                    "area": 0.9083585739135742,
                    "normal": [
                        -1.0,
                        1.1063543325917635e-07,
                        -1.1278307177065017e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5295226573944092,
                        0.181655615568161,
                        0.4817296862602234
                    ],
                    "area": 0.8152793049812317,
                    "normal": [
                        1.0,
                        -1.7609505675864057e-07,
                        -2.758094410637568e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5295224785804749,
                        0.18165603280067444,
                        0.4817296862602234
                    ],
                    "area": 0.8152791261672974,
                    "normal": [
                        -1.0,
                        1.4087603972257057e-07,
                        1.2166317731043819e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -7.450580596923828e-09,
                        0.5572369694709778,
                        -0.6301592588424683
                    ],
                    "area": 0.7691887021064758,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6134723424911499,
                        0.6194019913673401,
                        -0.42695459723472595
                    ],
                    "area": 0.7072212100028992,
                    "normal": [
                        -0.9115370512008667,
                        1.1061756310937199e-07,
                        0.41121792793273926
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6134724020957947,
                        0.6194016933441162,
                        -0.42695462703704834
                    ],
                    "area": 0.7072211503982544,
                    "normal": [
                        0.9115371108055115,
                        -3.423877714681112e-08,
                        0.4112177789211273
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1548399925231934e-07,
                        0.1443939357995987,
                        1.0534847974777222
                    ],
                    "area": 0.6045649647712708,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.23060575127601624,
                        0.0756794810295105,
                        0.8407357931137085
                    ],
                    "area": 0.5577512383460999,
                    "normal": [
                        -1.0,
                        3.637701411207672e-07,
                        -8.24711747782203e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.23060552775859833,
                        0.07567963004112244,
                        0.8407357931137085
                    ],
                    "area": 0.5577511787414551,
                    "normal": [
                        1.0,
                        -3.2966673302325944e-07,
                        7.145632707761251e-08
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3912924528121948,
                        0.16578003764152527,
                        -0.6011847257614136
                    ],
                    "area": 0.5714923143386841,
                    "normal": [
                        -0.724711537361145,
                        7.170384463961454e-08,
                        -0.689052402973175
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3912925720214844,
                        0.16577975451946259,
                        -0.6011846661567688
                    ],
                    "area": 0.5714921355247498,
                    "normal": [
                        0.7247115969657898,
                        -2.6074131298514658e-08,
                        -0.6890522837638855
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3912925124168396,
                        0.16577987372875214,
                        0.6011846661567688
                    ],
                    "area": 0.5714921355247498,
                    "normal": [
                        -0.7247116565704346,
                        3.259266279087569e-08,
                        0.6890522837638855
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3912925720214844,
                        0.16577953100204468,
                        0.6011846661567688
                    ],
                    "area": 0.5714920163154602,
                    "normal": [
                        0.724711537361145,
                        -1.4992627939136582e-07,
                        0.6890523433685303
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.39129209518432617,
                        1.3905571699142456,
                        0.3980455994606018
                    ],
                    "area": 0.2972146272659302,
                    "normal": [
                        -0.628528356552124,
                        0.33608734607696533,
                        0.7014251947402954
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3912919759750366,
                        1.3905574083328247,
                        -0.39804548025131226
                    ],
                    "area": 0.2972146272659302,
                    "normal": [
                        -0.6285282373428345,
                        0.33608773350715637,
                        -0.7014251351356506
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3912929892539978,
                        1.390556812286377,
                        -0.39804548025131226
                    ],
                    "area": 0.2972145974636078,
                    "normal": [
                        0.6285287737846375,
                        0.336086630821228,
                        -0.7014252543449402
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.39129310846328735,
                        1.3905563354492188,
                        0.3980455994606018
                    ],
                    "area": 0.2972145974636078,
                    "normal": [
                        0.6285287737846375,
                        0.33608636260032654,
                        0.701425313949585
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6293872594833374,
                        0.2688564658164978,
                        -0.32235559821128845
                    ],
                    "area": 0.2960265874862671,
                    "normal": [
                        -0.9879742860794067,
                        0.15461748838424683,
                        1.0067447675510266e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6293873190879822,
                        0.26885631680488586,
                        0.3223555088043213
                    ],
                    "area": 0.29602640867233276,
                    "normal": [
                        -0.9879744648933411,
                        0.15461748838424683,
                        -1.0067451228223945e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        1.7881393432617188e-07,
                        2.468416452407837,
                        -0.2680371105670929
                    ],
                    "area": 0.4930052161216736,
                    "normal": [
                        -8.500821380152956e-09,
                        -0.018074510619044304,
                        -0.9998366236686707
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        8.195638656616211e-08,
                        0.5911375284194946,
                        0.42726367712020874
                    ],
                    "area": 0.42747852206230164,
                    "normal": [
                        4.7930111435334766e-08,
                        0.21765460073947906,
                        0.9760258793830872
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3636707663536072,
                        -0.7019069194793701,
                        -0.14356687664985657
                    ],
                    "area": 0.3866838216781616,
                    "normal": [
                        -1.0,
                        0.0,
                        -7.052344841440572e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.36367037892341614,
                        -0.7019069194793701,
                        -0.14356690645217896
                    ],
                    "area": 0.3866838216781616,
                    "normal": [
                        1.0,
                        0.0,
                        4.231405910104513e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        9.685754776000977e-08,
                        0.17811308801174164,
                        0.4301477074623108
                    ],
                    "area": 0.3737579882144928,
                    "normal": [
                        -5.980270856298375e-08,
                        -0.23435509204864502,
                        0.9721510410308838
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.9802322387695312e-08,
                        -0.2555353045463562,
                        -0.7754524350166321
                    ],
                    "area": 0.32335689663887024,
                    "normal": [
                        0.0,
                        -0.024971244856715202,
                        -0.9996882081031799
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.682209014892578e-07,
                        2.718825578689575,
                        0.19548764824867249
                    ],
                    "area": 0.30880236625671387,
                    "normal": [
                        3.3061994031413633e-07,
                        0.9998366236686707,
                        -0.01807473786175251
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1920928955078125e-07,
                        2.061723232269287,
                        -0.2635803520679474
                    ],
                    "area": 0.30698198080062866,
                    "normal": [
                        -1.5548268450515934e-08,
                        -4.652064689025792e-08,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6393470764160156,
                        1.903611421585083,
                        0.20434510707855225
                    ],
                    "area": 0.2759399116039276,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6393473148345947,
                        1.903611421585083,
                        0.20434510707855225
                    ],
                    "area": 0.27593979239463806,
                    "normal": [
                        1.0,
                        -9.251353816353003e-08,
                        8.364345327471767e-10
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27504780888557434,
                        0.7208449840545654,
                        0.19315023720264435
                    ],
                    "area": 0.2199982851743698,
                    "normal": [
                        -5.926644064402353e-08,
                        0.9659256935119629,
                        0.2588196098804474
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27504777908325195,
                        -0.19314968585968018,
                        -0.7208452224731445
                    ],
                    "area": 0.2199980914592743,
                    "normal": [
                        6.773313998564845e-08,
                        -0.2588190734386444,
                        -0.9659258723258972
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27504780888557434,
                        0.7208451628684998,
                        -0.19314968585968018
                    ],
                    "area": 0.2199980467557907,
                    "normal": [
                        8.466644274562896e-09,
                        0.9659258723258972,
                        -0.25881877541542053
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27504780888557434,
                        0.5276954174041748,
                        -0.5276951193809509
                    ],
                    "area": 0.2199980467557907,
                    "normal": [
                        0.0,
                        0.7071070075035095,
                        -0.7071066498756409
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2750478684902191,
                        -0.1931503415107727,
                        0.7208449840545654
                    ],
                    "area": 0.2199980467557907,
                    "normal": [
                        -1.0159973129475475e-07,
                        -0.25881972908973694,
                        0.9659256339073181
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2750478684902191,
                        0.19314929842948914,
                        0.7208452820777893
                    ],
                    "area": 0.2199980467557907,
                    "normal": [
                        -6.773315419650316e-08,
                        0.25881844758987427,
                        0.9659259915351868
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27504780888557434,
                        0.1931500881910324,
                        -0.720845103263855
                    ],
                    "area": 0.21999803185462952,
                    "normal": [
                        1.693329032548263e-08,
                        0.25881946086883545,
                        -0.9659256935119629
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27504783868789673,
                        0.527694821357727,
                        0.5276956558227539
                    ],
                    "area": 0.21999803185462952,
                    "normal": [
                        -8.466643919291528e-08,
                        0.7071061730384827,
                        0.707107424736023
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27504783868789673,
                        -0.5276955366134644,
                        0.5276949405670166
                    ],
                    "area": 0.21999801695346832,
                    "normal": [
                        -8.466643919291528e-08,
                        -0.7071071863174438,
                        0.7071062922477722
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27504777908325195,
                        -0.7208452224731445,
                        0.19314953684806824
                    ],
                    "area": 0.21999798715114594,
                    "normal": [
                        -2.5399938152759205e-08,
                        -0.965925931930542,
                        0.258818656206131
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.003250710666179657,
                        -0.0869460254907608,
                        -0.005358941853046417
                    ],
                    "area": 0.5818432569503784,
                    "normal": [
                        1.0,
                        -1.8317890471608242e-14,
                        -5.756245613497413e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.003250710666179657,
                        0.6622647047042847,
                        -0.0053591541945934296
                    ],
                    "area": 0.33522045612335205,
                    "normal": [
                        1.0,
                        -2.9144889220110784e-14,
                        -9.991134675146895e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.003250710666179657,
                        -0.6333175897598267,
                        -0.005358844995498657
                    ],
                    "area": 0.29283833503723145,
                    "normal": [
                        1.0,
                        0.0,
                        -5.244223899580902e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.15738528966903687,
                        -0.8058133125305176,
                        -0.005358844995498657
                    ],
                    "area": 0.23796197772026062,
                    "normal": [
                        0.004732734989374876,
                        0.999988853931427,
                        -4.2531405597401317e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.15127310156822205,
                        -0.08694618940353394,
                        -0.4903377294540405
                    ],
                    "area": 0.22179993987083435,
                    "normal": [
                        -0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.15127313137054443,
                        -0.08694586157798767,
                        0.48075056076049805
                    ],
                    "area": 0.22179993987083435,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.15127313137054443,
                        0.7291512489318848,
                        0.20366275310516357
                    ],
                    "area": 0.16107890009880066,
                    "normal": [
                        0.0,
                        -0.21456611156463623,
                        -0.9767095446586609
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.15127308666706085,
                        0.72915118932724,
                        -0.21438108384609222
                    ],
                    "area": 0.16107873618602753,
                    "normal": [
                        0.0,
                        -0.21456563472747803,
                        0.9767095446586609
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.3952175974845886,
                        -0.02151951938867569,
                        0.48075056076049805
                    ],
                    "area": 0.11862838268280029,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.39521756768226624,
                        -0.02151971310377121,
                        -0.4903377294540405
                    ],
                    "area": 0.11862838268280029,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6695461273193359,
                        1.5784471035003662,
                        0.3448609709739685
                    ],
                    "area": 0.5113155841827393,
                    "normal": [
                        -1.0,
                        3.611469026054692e-07,
                        -2.3087055467385653e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6695460081100464,
                        1.5784471035003662,
                        -0.1714857965707779
                    ],
                    "area": 0.5113155245780945,
                    "normal": [
                        -1.0,
                        3.611469026054692e-07,
                        -2.308705262521471e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.20259159803390503,
                        1.584348440170288,
                        -0.17151883244514465
                    ],
                    "area": 0.49772414565086365,
                    "normal": [
                        0.9365596175193787,
                        0.35050830245018005,
                        -1.1975437530509225e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.4015599489212036,
                        0.6758280992507935,
                        0.603034257888794
                    ],
                    "area": 0.4368079900741577,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.39609724283218384,
                        1.541458249092102,
                        -0.8900550007820129
                    ],
                    "area": 0.4237193763256073,
                    "normal": [
                        0.9915516972541809,
                        0.1297118067741394,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3776855170726776,
                        0.6758279800415039,
                        0.35518619418144226
                    ],
                    "area": 0.4212648570537567,
                    "normal": [
                        -1.0,
                        2.2274983280112792e-07,
                        1.1358186213783483e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6695462465286255,
                        0.6758282780647278,
                        -0.17148593068122864
                    ],
                    "area": 0.42081329226493835,
                    "normal": [
                        -1.0,
                        1.462723133727195e-07,
                        -2.3087056888471125e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6695463061332703,
                        0.675828218460083,
                        0.34486085176467896
                    ],
                    "area": 0.42081326246261597,
                    "normal": [
                        -0.9999999403953552,
                        7.313616379178711e-08,
                        -1.1543527733692827e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6607431173324585,
                        1.5414583683013916,
                        -0.8900550007820129
                    ],
                    "area": 0.4201395511627197,
                    "normal": [
                        -1.0,
                        2.661272162640671e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.4581749737262726,
                        1.5784471035003662,
                        0.6030343770980835
                    ],
                    "area": 0.41862332820892334,
                    "normal": [
                        -6.789326858960137e-14,
                        -2.4076450699794805e-07,
                        1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -5.066394805908203e-07,
                        -0.9297120571136475,
                        0.7351931929588318
                    ],
                    "area": 1.6184732913970947,
                    "normal": [
                        -1.979488644110461e-07,
                        0.012046235613524914,
                        0.9999274015426636
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -5.066394805908203e-07,
                        0.929710865020752,
                        0.735193133354187
                    ],
                    "area": 1.618472695350647,
                    "normal": [
                        -6.444849276476816e-08,
                        -0.01204611174762249,
                        0.9999274611473083
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -7.748603820800781e-07,
                        2.24130916595459,
                        0.524684488773346
                    ],
                    "area": 0.8868362903594971,
                    "normal": [
                        0.0,
                        1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -7.450580596923828e-07,
                        -2.24130916595459,
                        0.524684488773346
                    ],
                    "area": 0.8868362903594971,
                    "normal": [
                        0.0,
                        -1.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -5.066394805908203e-07,
                        2.24130916595459,
                        0.06526309251785278
                    ],
                    "area": 0.7112354040145874,
                    "normal": [
                        0.0,
                        0.9999999403953552,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -4.76837158203125e-07,
                        -2.24130916595459,
                        0.06526309251785278
                    ],
                    "area": 0.7112354040145874,
                    "normal": [
                        -0.0,
                        -0.9999999403953552,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.8386712074279785e-05,
                        -1.472067952156067,
                        -0.2942235469818115
                    ],
                    "area": 0.5122900605201721,
                    "normal": [
                        -3.984966951975366e-06,
                        -0.2615925669670105,
                        -0.965178370475769
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.839416265487671e-05,
                        1.472067952156067,
                        -0.2942235469818115
                    ],
                    "area": 0.5122900605201721,
                    "normal": [
                        -3.984966951975366e-06,
                        0.2615925669670105,
                        -0.965178370475769
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.7644995450973511,
                        0.5004035234451294,
                        0.48354092240333557
                    ],
                    "area": 0.47150957584381104,
                    "normal": [
                        -0.023388296365737915,
                        1.629534374103514e-08,
                        0.9997264742851257
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.7644996047019958,
                        -0.5004041194915771,
                        0.48354095220565796
                    ],
                    "area": 0.47150909900665283,
                    "normal": [
                        -0.023388298228383064,
                        -1.6295363280960373e-08,
                        0.999726414680481
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.08135923743247986,
                        -0.6676161885261536,
                        -0.2135724425315857
                    ],
                    "area": 0.14358018338680267,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.08135944604873657,
                        -0.6676163673400879,
                        0.2135724425315857
                    ],
                    "area": 0.14358015358448029,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4534616768360138,
                        -0.08804409205913544,
                        1.3969838619232178e-07
                    ],
                    "area": 0.10307858139276505,
                    "normal": [
                        0.9998703002929688,
                        -0.01610712893307209,
                        3.5688543675860274e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.06645481288433075,
                        0.3846691846847534,
                        0.09970657527446747
                    ],
                    "area": 0.09811840951442719,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.06645481288433075,
                        0.38466930389404297,
                        -0.09970599412918091
                    ],
                    "area": 0.09811834990978241,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.35680878162384033,
                        -0.5930734872817993,
                        -0.1576530635356903
                    ],
                    "area": 0.09168580919504166,
                    "normal": [
                        0.5207660794258118,
                        -0.02896363101899624,
                        -0.8532080054283142
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3568083643913269,
                        -0.5930739045143127,
                        0.15765318274497986
                    ],
                    "area": 0.09168574959039688,
                    "normal": [
                        0.5207652449607849,
                        -0.028964659199118614,
                        0.8532083630561829
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.04217773675918579,
                        -0.7816041111946106,
                        1.1175870895385742e-08
                    ],
                    "area": 0.08796228468418121,
                    "normal": [
                        -0.012071200646460056,
                        -0.9999271035194397,
                        -2.0513762422069703e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.448487788438797,
                        -0.5919498205184937,
                        1.1734664440155029e-07
                    ],
                    "area": 0.08648835122585297,
                    "normal": [
                        0.998796820640564,
                        -0.04904019832611084,
                        1.868280037342629e-06
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.07666711509227753,
                        -0.2672520875930786,
                        0.2135724425315857
                    ],
                    "area": 0.08093571662902832,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                }
            ]
        },
        "Components_lifePreserver": {
            "collection": "Components",
            "object_name": "lifePreserver",
            "dimensions": {
                "width": 0.27712130546569824,
                "height": 1.074822187423706,
                "depth": 1.074822187423706
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.005145043134689331,
                        0.2778654098510742,
                        0.16042613983154297
                    ],
                    "area": 0.11033697426319122,
                    "normal": [
                        0.9999999403953552,
                        4.64423379753498e-08,
                        1.7332588697627216e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.005144968628883362,
                        2.9969515935590607e-07,
                        -0.32085156440734863
                    ],
                    "area": 0.11033695191144943,
                    "normal": [
                        0.9999999403953552,
                        -1.04645987513384e-13,
                        1.2688335004895634e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.0051449984312057495,
                        -0.27786552906036377,
                        -0.16042602062225342
                    ],
                    "area": 0.11033691465854645,
                    "normal": [
                        0.9999999403953552,
                        -6.34417887113159e-08,
                        1.0988416221380248e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.005145043134689331,
                        -4.0683505631022854e-07,
                        0.3208516240119934
                    ],
                    "area": 0.11033690720796585,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.0051449984312057495,
                        0.27786579728126526,
                        -0.16042554378509521
                    ],
                    "area": 0.11033689975738525,
                    "normal": [
                        1.0,
                        6.344159686477724e-08,
                        1.0988429011149492e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.005145043134689331,
                        -0.27786582708358765,
                        0.1604255586862564
                    ],
                    "area": 0.11033689975738525,
                    "normal": [
                        1.0,
                        -4.644270035214504e-08,
                        1.7332588697627216e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.15481972694396973,
                        -0.017394039779901505,
                        -0.22922681272029877
                    ],
                    "area": 0.0748090147972107,
                    "normal": [
                        0.0,
                        -0.9999999403953552,
                        -2.2847362401989812e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.15481972694396973,
                        0.14978840947151184,
                        -0.17438727617263794
                    ],
                    "area": 0.0748090147972107,
                    "normal": [
                        0.0,
                        -0.7071066498756409,
                        -0.7071070075035095
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.15481972694396973,
                        -0.17438727617263794,
                        -0.14978836476802826
                    ],
                    "area": 0.0748090073466301,
                    "normal": [
                        0.0,
                        -0.70710688829422,
                        0.7071067094802856
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.15481972694396973,
                        0.22922682762145996,
                        -0.01739402301609516
                    ],
                    "area": 0.0748090073466301,
                    "normal": [
                        0.0,
                        3.1732446359455935e-07,
                        -0.9999999403953552
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.16208729147911072,
                        -0.3510565459728241,
                        0.033563032746315
                    ],
                    "area": 0.0469704307615757,
                    "normal": [
                        -0.9800931215286255,
                        -0.1011824831366539,
                        -0.17081999778747559
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.16208729147911072,
                        -0.3510565459728241,
                        -0.09898592531681061
                    ],
                    "area": 0.0469704270362854,
                    "normal": [
                        -0.9800931215286255,
                        -0.1011824682354927,
                        -0.17081999778747559
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.16138479113578796,
                        -0.3435475826263428,
                        0.050686389207839966
                    ],
                    "area": 0.0468703918159008,
                    "normal": [
                        -0.9620491862297058,
                        0.14450886845588684,
                        0.23147040605545044
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.16138479113578796,
                        -0.3435475826263428,
                        -0.08186256885528564
                    ],
                    "area": 0.04687037318944931,
                    "normal": [
                        -0.9620494246482849,
                        0.14450852572917938,
                        0.23146983981132507
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.15369078516960144,
                        -0.3561060428619385,
                        -0.11491146683692932
                    ],
                    "area": 0.04657778888940811,
                    "normal": [
                        -0.7270980477333069,
                        -0.35571494698524475,
                        -0.5871927738189697
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.15369078516960144,
                        -0.3561060428619385,
                        0.017637550830841064
                    ],
                    "area": 0.04657769948244095,
                    "normal": [
                        -0.7270980477333069,
                        -0.35571494698524475,
                        -0.5871927738189697
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09459750354290009,
                        -0.3406556248664856,
                        -0.10834816098213196
                    ],
                    "area": 0.046483878046274185,
                    "normal": [
                        0.961998701095581,
                        -0.14622990787029266,
                        -0.23059722781181335
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09459750354290009,
                        -0.3406556248664856,
                        0.024200797080993652
                    ],
                    "area": 0.04648387059569359,
                    "normal": [
                        0.961998701095581,
                        -0.14622990787029266,
                        -0.23059722781181335
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09389502555131912,
                        -0.3331466317176819,
                        -0.09122471511363983
                    ],
                    "area": 0.046369850635528564,
                    "normal": [
                        0.9801611304283142,
                        0.09917936474084854,
                        0.17160312831401825
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09389502555131912,
                        -0.3331466317176819,
                        0.04132424294948578
                    ],
                    "area": 0.046369846910238266,
                    "normal": [
                        0.980161190032959,
                        0.09917909651994705,
                        0.17160268127918243
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.9909763932228088,
                        -0.38402077555656433,
                        -0.5121127367019653
                    ],
                    "area": 1.6873846054077148,
                    "normal": [
                        1.0,
                        -7.47055466376878e-08,
                        1.6950612291566358e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9909765124320984,
                        -0.38402044773101807,
                        -0.5121128559112549
                    ],
                    "area": 1.6873846054077148,
                    "normal": [
                        -1.0,
                        1.368554052305626e-07,
                        -2.1188169796459988e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8320425152778625,
                        -0.3625328242778778,
                        0.24925699830055237
                    ],
                    "area": 1.5280159711837769,
                    "normal": [
                        0.9323091506958008,
                        -0.0004898705519735813,
                        0.3616620898246765
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8320426940917969,
                        -0.36253219842910767,
                        0.24925696849822998
                    ],
                    "area": 1.5280159711837769,
                    "normal": [
                        -0.9323091506958008,
                        -0.0004895487800240517,
                        0.36166203022003174
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.341104507446289e-07,
                        -0.34103626012802124,
                        0.6589932441711426
                    ],
                    "area": 1.4512954950332642,
                    "normal": [
                        -2.887731609391153e-09,
                        -0.005207403097301722,
                        0.9999864101409912
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.2351741790771484e-07,
                        2.6532652378082275,
                        -1.6206960678100586
                    ],
                    "area": 1.3610162734985352,
                    "normal": [
                        1.0441359047177762e-14,
                        1.5986792334388156e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.2351741790771484e-07,
                        2.6532649993896484,
                        -1.0
                    ],
                    "area": 1.361015796661377,
                    "normal": [
                        -4.176544296497463e-14,
                        -1.59867951765591e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.341104507446289e-07,
                        1.9936497211456299,
                        -1.6206961870193481
                    ],
                    "area": 1.0468670129776,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0004757642745972,
                        1.6114567518234253,
                        -0.5548117756843567
                    ],
                    "area": 0.8341933488845825,
                    "normal": [
                        0.999863862991333,
                        0.009555035270750523,
                        -0.013455052860081196
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.0004760026931763,
                        1.6114563941955566,
                        -0.5548118352890015
                    ],
                    "area": 0.8341933488845825,
                    "normal": [
                        -0.999863862991333,
                        0.009555203840136528,
                        -0.013455121777951717
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2187051773071289,
                        -1.9215669631958008,
                        -1.0070363283157349
                    ],
                    "area": 0.7752389907836914,
                    "normal": [
                        -1.0,
                        2.478024896390707e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2187044620513916,
                        -1.9215669631958008,
                        -1.0070363283157349
                    ],
                    "area": 0.7752389907836914,
                    "normal": [
                        1.0,
                        -2.478024896390707e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.032599687576294,
                        2.3439130783081055,
                        -1.591099500656128
                    ],
                    "area": 0.6814661622047424,
                    "normal": [
                        -0.9981914758682251,
                        0.060114480555057526,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.0326006412506104,
                        2.3439126014709473,
                        -1.591099500656128
                    ],
                    "area": 0.6814661026000977,
                    "normal": [
                        0.9981915354728699,
                        0.06011389568448067,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -5.140900611877441e-07,
                        -1.9019834995269775,
                        0.463031142950058
                    ],
                    "area": 0.6760371923446655,
                    "normal": [
                        2.0388779375934973e-07,
                        0.06477976590394974,
                        0.99789959192276
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.6211711764335632,
                        0.4995897114276886,
                        -2.4465556144714355
                    ],
                    "area": 0.607071042060852,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6211713552474976,
                        0.49958932399749756,
                        -2.4465556144714355
                    ],
                    "area": 0.6070709228515625,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        6.631016731262207e-07,
                        2.3371353149414062,
                        -1.8569753170013428
                    ],
                    "area": 0.5042257308959961,
                    "normal": [
                        -2.687435198822641e-07,
                        0.008223195560276508,
                        -0.9999661445617676
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.6567803621292114,
                        0.3524569869041443,
                        -1.294411063194275
                    ],
                    "area": 0.4852191209793091,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.6567803025245667,
                        0.35735437273979187,
                        -1.873537540435791
                    ],
                    "area": 0.4852191209793091,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        1.564621925354004e-07,
                        -0.23013406991958618,
                        -0.4084036350250244
                    ],
                    "area": 0.39438316226005554,
                    "normal": [
                        -1.3224212125351187e-07,
                        -0.8155730962753296,
                        0.5786541104316711
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3210945427417755,
                        0.152734637260437,
                        -0.4084034562110901
                    ],
                    "area": 0.3835292458534241,
                    "normal": [
                        0.9999999403953552,
                        -2.724384273733449e-07,
                        4.236037511873292e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3210941553115845,
                        0.152734637260437,
                        -0.4084036350250244
                    ],
                    "area": 0.3835292160511017,
                    "normal": [
                        -0.9999999403953552,
                        -9.729937744396011e-08,
                        -2.227254185527272e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3210940361022949,
                        -0.06484156847000122,
                        -0.8797112107276917
                    ],
                    "area": 0.3030202090740204,
                    "normal": [
                        -1.0,
                        -1.5206370562736993e-07,
                        -1.661294390942203e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.32109469175338745,
                        -0.06484153121709824,
                        -0.8797111511230469
                    ],
                    "area": 0.3030201494693756,
                    "normal": [
                        1.0,
                        -2.6068082092933764e-07,
                        3.898450984252122e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.1606683731079102e-07,
                        0.16958335041999817,
                        1.100587010383606
                    ],
                    "area": 0.2851765751838684,
                    "normal": [
                        -2.7844455985359673e-07,
                        -4.0267082113132346e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.980232238769531e-07,
                        -0.4078165590763092,
                        -0.8797112703323364
                    ],
                    "area": 0.28368842601776123,
                    "normal": [
                        1.1601865423926938e-07,
                        -1.0,
                        -3.710509872689727e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.5460145473480225,
                        0.20073121786117554,
                        -0.15797215700149536
                    ],
                    "area": 0.22778356075286865,
                    "normal": [
                        3.7956919385351284e-08,
                        2.354214245769981e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.546014130115509,
                        0.20073121786117554,
                        -0.1579723060131073
                    ],
                    "area": 0.22778335213661194,
                    "normal": [
                        -6.86666794535995e-08,
                        1.1771071228849905e-07,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.546014666557312,
                        0.1016717255115509,
                        1.100587010383606
                    ],
                    "area": 0.13866175711154938,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.07227637618780136,
                        -0.1580391228199005,
                        0.11091962456703186
                    ],
                    "area": 0.024993833154439926,
                    "normal": [
                        0.9999999403953552,
                        0.0,
                        1.0226222713072275e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07227640599012375,
                        0.15803882479667664,
                        -0.11091961711645126
                    ],
                    "area": 0.024993829429149628,
                    "normal": [
                        0.9999999403953552,
                        0.0,
                        -1.0226222713072275e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07227639853954315,
                        -0.15803904831409454,
                        -0.11091961711645126
                    ],
                    "area": 0.02499382197856903,
                    "normal": [
                        1.0,
                        -0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07227642834186554,
                        0.15803875029087067,
                        0.11091961711645126
                    ],
                    "area": 0.024993807077407837,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        6.705522537231445e-08,
                        0.15803885459899902,
                        -0.038062017410993576
                    ],
                    "area": 0.024794433265924454,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        7.450580596923828e-08,
                        0.15803880989551544,
                        0.03806202486157417
                    ],
                    "area": 0.024794425815343857,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        3.725290298461914e-08,
                        -0.15803906321525574,
                        0.03806202486157417
                    ],
                    "area": 0.024794425815343857,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.470348358154297e-08,
                        -0.15803904831409454,
                        -0.038062017410993576
                    ],
                    "area": 0.024794425815343857,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07227639853954315,
                        -1.1548399925231934e-07,
                        -0.11091960966587067
                    ],
                    "area": 0.02106352522969246,
                    "normal": [
                        -1.0,
                        5.15423117519731e-08,
                        5.113112777621609e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07227639853954315,
                        -1.5273690223693848e-07,
                        0.11091961711645126
                    ],
                    "area": 0.02106352522969246,
                    "normal": [
                        -1.0,
                        3.6079620713280747e-07,
                        -5.11310425110878e-08
                    ]
                }
            ]
        },
        "Components_windowblocklowpro": {
            "collection": "Components",
            "object_name": "windowblocklowpro",
            "dimensions": {
                "width": 0.21862508356571198,
                "height": 0.20671583712100983,
                "depth": 0.5838308930397034
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.11944393813610077,
                        -3.725290298461914e-08,
                        0.0
                    ],
                    "area": 0.08054108917713165,
                    "normal": [
                        1.0,
                        -3.312677776534656e-08,
                        1.664460711481297e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.016050729900598526,
                        -3.725290298461914e-08,
                        0.1378035545349121
                    ],
                    "area": 0.0661010816693306,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.11944392323493958,
                        -0.3574290871620178,
                        0.0
                    ],
                    "area": 0.047454919666051865,
                    "normal": [
                        0.9999999403953552,
                        -2.8111591277024672e-08,
                        2.9128059964023123e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.11944395303726196,
                        0.3574289381504059,
                        0.0
                    ],
                    "area": 0.04745488986372948,
                    "normal": [
                        0.9999999403953552,
                        -2.8111609040593066e-08,
                        4.1611492918036674e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.006508048623800278,
                        -3.725290298461914e-08,
                        -0.14780855178833008
                    ],
                    "area": 0.04580622911453247,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.06674159318208694,
                        -3.725290298461914e-08,
                        0.01445094496011734
                    ],
                    "area": 0.03997470438480377,
                    "normal": [
                        -1.0,
                        1.86409927493969e-08,
                        -2.2348434924879257e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.06696662306785583,
                        -3.725290298461914e-08,
                        -0.11866700649261475
                    ],
                    "area": 0.03315439075231552,
                    "normal": [
                        -0.7907558083534241,
                        4.9158327186660244e-08,
                        -0.612131655216217
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.016050737351179123,
                        -0.33175885677337646,
                        0.1378035545349121
                    ],
                    "area": 0.03140240162611008,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.01605072058737278,
                        0.3317587375640869,
                        0.1378035545349121
                    ],
                    "area": 0.03140239045023918,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.17268598079681396,
                        0.2741836905479431,
                        -0.10065366327762604
                    ],
                    "area": 0.02997828647494316,
                    "normal": [
                        -0.4285156726837158,
                        0.0,
                        0.9035342931747437
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3636668920516968,
                        1.4182679653167725,
                        -1.3572207689285278
                    ],
                    "area": 0.8141605257987976,
                    "normal": [
                        -0.25881949067115784,
                        -8.236117565729728e-08,
                        -0.9659256935119629
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.3572211265563965,
                        1.4182679653167725,
                        0.3636660873889923
                    ],
                    "area": 0.814159631729126,
                    "normal": [
                        0.9659258723258972,
                        -6.405877428505846e-08,
                        0.2588188648223877
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3636660873889923,
                        1.4182679653167725,
                        -1.3572211265563965
                    ],
                    "area": 0.8141595125198364,
                    "normal": [
                        0.2588188648223877,
                        1.8302511506362862e-08,
                        -0.965925931930542
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.3572208881378174,
                        1.418268084526062,
                        0.36366695165634155
                    ],
                    "area": 0.8141594529151917,
                    "normal": [
                        -0.9659256935119629,
                        -4.575626988412296e-08,
                        0.258819580078125
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.993554949760437,
                        1.4182684421539307,
                        0.9935546517372131
                    ],
                    "area": 0.8141593933105469,
                    "normal": [
                        0.7071069478988647,
                        -7.321003892002409e-08,
                        0.7071067094802856
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.993554413318634,
                        1.4182685613632202,
                        0.9935551881790161
                    ],
                    "area": 0.8141591548919678,
                    "normal": [
                        -0.7071065902709961,
                        7.321006734173352e-08,
                        0.70710688829422
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7720580101013184,
                        1.9205455780029297,
                        -0.7720578908920288
                    ],
                    "area": 0.5597826838493347,
                    "normal": [
                        0.7071067690849304,
                        -2.1295635121987289e-07,
                        -0.7071068286895752
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2825925946235657,
                        1.920546531677246,
                        1.0546510219573975
                    ],
                    "area": 0.5597826838493347,
                    "normal": [
                        -0.2588188946247101,
                        2.7950531489295827e-07,
                        0.9659258127212524
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.054650902748108,
                        1.9205455780029297,
                        -0.2825927734375
                    ],
                    "area": 0.5597824454307556,
                    "normal": [
                        0.9659258723258972,
                        -7.9858679669087e-08,
                        -0.25881892442703247
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7720584869384766,
                        1.9205455780029297,
                        -0.7720574736595154
                    ],
                    "area": 0.5597823858261108,
                    "normal": [
                        -0.7071073055267334,
                        -2.2626629458954994e-07,
                        -0.707106351852417
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -2.60770320892334e-07,
                        -0.9281027913093567,
                        0.310339093208313
                    ],
                    "area": 0.21390476822853088,
                    "normal": [
                        0.0,
                        0.8541275262832642,
                        -0.5200636386871338
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.086162567138672e-07,
                        -1.1492688655853271,
                        0.18439394235610962
                    ],
                    "area": 0.21159619092941284,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.1920928955078125e-07,
                        -1.1502532958984375,
                        -0.09874166548252106
                    ],
                    "area": 0.2105255126953125,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6391277313232422e-07,
                        -1.293749213218689,
                        0.04282614216208458
                    ],
                    "area": 0.20769673585891724,
                    "normal": [
                        0.0,
                        1.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -5.960464477539063e-08,
                        -0.974392294883728,
                        -0.2340621054172516
                    ],
                    "area": 0.20413057506084442,
                    "normal": [
                        0.0,
                        -0.9725694060325623,
                        -0.2326129525899887
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.42726075649261475,
                        -0.3192780017852783,
                        -0.8515516519546509
                    ],
                    "area": 0.20284023880958557,
                    "normal": [
                        0.361827552318573,
                        -0.932245135307312,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4272608160972595,
                        -0.31927791237831116,
                        -0.8515516519546509
                    ],
                    "area": 0.20284022390842438,
                    "normal": [
                        -0.36182767152786255,
                        -0.9322449564933777,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.30385160446167e-07,
                        0.28813275694847107,
                        0.8637879490852356
                    ],
                    "area": 0.1921369880437851,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2608683407306671,
                        -0.6288940906524658,
                        -0.5047029852867126
                    ],
                    "area": 0.18296413123607635,
                    "normal": [
                        -0.8079864382743835,
                        0.010988440364599228,
                        -0.5890986323356628
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.26086825132369995,
                        -0.6288942098617554,
                        -0.5047029852867126
                    ],
                    "area": 0.18296411633491516,
                    "normal": [
                        0.8079864978790283,
                        0.010988575406372547,
                        -0.5890986919403076
                    ]
                }
            ]
        },
        "Components_block.bird": {
            "collection": "Components",
            "object_name": "block.bird",
            "dimensions": {
                "width": 2.3935515880584717,
                "height": 1.2332884073257446,
                "depth": 3.5937774181365967
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.0986192524433136,
                        -0.16271276772022247,
                        0.12813690304756165
                    ],
                    "area": 0.07595156133174896,
                    "normal": [
                        -0.7244287133216858,
                        -0.11734414100646973,
                        0.6792888045310974
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.09861890971660614,
                        -0.16271288692951202,
                        0.12813690304756165
                    ],
                    "area": 0.07595150917768478,
                    "normal": [
                        0.7244292497634888,
                        -0.11734408140182495,
                        0.6792882680892944
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.10802002251148224,
                        0.013072088360786438,
                        -0.06918185949325562
                    ],
                    "area": 0.07501396536827087,
                    "normal": [
                        0.5215689539909363,
                        -4.966128841488171e-08,
                        -0.8532090187072754
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.10801982879638672,
                        0.013072103261947632,
                        -0.06918185949325562
                    ],
                    "area": 0.07501395046710968,
                    "normal": [
                        -0.5215690732002258,
                        1.0553026186244097e-07,
                        -0.8532090187072754
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        8.754432201385498e-08,
                        0.026144228875637054,
                        -0.10074079781770706
                    ],
                    "area": 0.0699143260717392,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2347905933856964,
                        -5.21540641784668e-08,
                        -0.02467442862689495
                    ],
                    "area": 0.06706784665584564,
                    "normal": [
                        -0.16981084644794464,
                        7.463874140967164e-08,
                        -0.9854767322540283
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2347906231880188,
                        -1.564621925354004e-07,
                        0.0246744304895401
                    ],
                    "area": 0.06706781685352325,
                    "normal": [
                        0.16981087625026703,
                        -1.735785133405443e-07,
                        0.9854767322540283
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.23479074239730835,
                        -6.705522537231445e-08,
                        -0.02467442862689495
                    ],
                    "area": 0.06706780940294266,
                    "normal": [
                        0.1698109209537506,
                        -1.7357853820954006e-08,
                        -0.9854767322540283
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.23479068279266357,
                        -7.450580596923828e-08,
                        0.02467442862689495
                    ],
                    "area": 0.06706780940294266,
                    "normal": [
                        -0.16981089115142822,
                        7.463876983138107e-08,
                        0.9854766130447388
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.09904845058917999,
                        0.26821404695510864,
                        0.13776172697544098
                    ],
                    "area": 0.03490353375673294,
                    "normal": [
                        0.4092848002910614,
                        0.002920494880527258,
                        0.9124019742012024
                    ]
                }
            ]
        },
        "Components_block.doorStop": {
            "collection": "Components",
            "object_name": "block.doorStop",
            "dimensions": {
                "width": 2.835293769836426,
                "height": 0.8285006880760193,
                "depth": 5.259227275848389
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -1.2548532485961914,
                        0.03831097483634949,
                        -0.612004280090332
                    ],
                    "area": 2.3980236053466797,
                    "normal": [
                        -0.9711733460426331,
                        0.23837465047836304,
                        -2.4855739866325166e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.2548531293869019,
                        0.0383104532957077,
                        -0.612004280090332
                    ],
                    "area": 2.3980233669281006,
                    "normal": [
                        0.9711734056472778,
                        0.23837417364120483,
                        2.9826890113326954e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.2351741790771484e-07,
                        -0.07049798965454102,
                        -1.4689562320709229
                    ],
                    "area": 2.0452377796173096,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.470348358154297e-07,
                        -0.07166635990142822,
                        0.24812105298042297
                    ],
                    "area": 2.037461519241333,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1211259365081787,
                        -2.706990957260132,
                        -0.6120150685310364
                    ],
                    "area": 1.6069282293319702,
                    "normal": [
                        -0.6631283164024353,
                        -0.7485057711601257,
                        -8.160303650583955e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1211236715316772,
                        -2.70699143409729,
                        -0.6120151281356812
                    ],
                    "area": 1.6069272756576538,
                    "normal": [
                        0.6631285548210144,
                        -0.7485055327415466,
                        -9.087614785130427e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1056718826293945,
                        -1.911207914352417,
                        0.21238631010055542
                    ],
                    "area": 1.5746757984161377,
                    "normal": [
                        -0.5624864101409912,
                        -0.04154614731669426,
                        0.8257620930671692
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1056698560714722,
                        -1.9112088680267334,
                        0.21238628029823303
                    ],
                    "area": 1.5746749639511108,
                    "normal": [
                        0.5624867677688599,
                        -0.04154668375849724,
                        0.8257617950439453
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1056702136993408,
                        -1.9112061262130737,
                        -1.4364056587219238
                    ],
                    "area": 1.5746718645095825,
                    "normal": [
                        0.5624831914901733,
                        -0.041535571217536926,
                        -0.8257647752761841
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1056714057922363,
                        -1.9112060070037842,
                        -1.4364056587219238
                    ],
                    "area": 1.5746718645095825,
                    "normal": [
                        -0.5624831318855286,
                        -0.04153507947921753,
                        -0.8257648348808289
                    ]
                }
            ]
        },
        "Components_block.finger": {
            "collection": "Components",
            "object_name": "block.finger",
            "dimensions": {
                "width": 2.0257225036621094,
                "height": 2.1036136150360107,
                "depth": 3.2962751388549805
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6769616007804871,
                        2.451240062713623,
                        -0.3949163556098938
                    ],
                    "area": 0.8836129307746887,
                    "normal": [
                        -0.98371422290802,
                        0.1797393262386322,
                        -1.728549818835745e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3743717670440674,
                        -1.7181497812271118,
                        -0.21079188585281372
                    ],
                    "area": 0.7490869164466858,
                    "normal": [
                        -1.5921244767014286e-07,
                        -1.0,
                        -1.191546488144013e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7487435340881348,
                        -1.4460288286209106,
                        -0.30285412073135376
                    ],
                    "area": 0.6446996331214905,
                    "normal": [
                        -1.0,
                        -3.404585413591121e-08,
                        -1.0063396871373698e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7487434148788452,
                        -2.9802322387695312e-08,
                        0.7861772179603577
                    ],
                    "area": 0.5751001238822937,
                    "normal": [
                        1.0,
                        -5.148320383341343e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7487434148788452,
                        0.8844709396362305,
                        0.7861772179603577
                    ],
                    "area": 0.5750999450683594,
                    "normal": [
                        1.0,
                        -5.148322088643909e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7487434148788452,
                        1.768941879272461,
                        0.7861772179603577
                    ],
                    "area": 0.5750998854637146,
                    "normal": [
                        1.0,
                        -5.148323225512286e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7487434148788452,
                        -0.8844707012176514,
                        0.7861772179603577
                    ],
                    "area": 0.5750998854637146,
                    "normal": [
                        1.0,
                        -5.148323225512286e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3384808599948883,
                        2.451240062713623,
                        0.15822023153305054
                    ],
                    "area": 0.5607883334159851,
                    "normal": [
                        1.0628723146055563e-07,
                        0.31680047512054443,
                        0.9484922885894775
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.374371737241745,
                        -1.4460289478302002,
                        -0.8951456546783447
                    ],
                    "area": 0.4920141398906708,
                    "normal": [
                        0.0,
                        -0.5603985786437988,
                        -0.8282230496406555
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9749072790145874,
                        -0.28943735361099243,
                        0.7861772179603577
                    ],
                    "area": 0.4493780732154846,
                    "normal": [
                        0.0,
                        -1.0,
                        -0.0
                    ]
                }
            ]
        },
        "Components_bridge.compact": {
            "collection": "Components",
            "object_name": "bridge.compact",
            "dimensions": {
                "width": 0.8246739506721497,
                "height": 0.9397433400154114,
                "depth": 1.5814732313156128
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5684293508529663,
                        0.5393428802490234,
                        -2.272575855255127
                    ],
                    "area": 0.994676947593689,
                    "normal": [
                        -0.6979030966758728,
                        0.7147900462150574,
                        -0.044791918247938156
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5684293508529663,
                        0.5393428802490234,
                        -2.272575855255127
                    ],
                    "area": 0.9946768879890442,
                    "normal": [
                        0.6979030966758728,
                        0.7147900462150574,
                        -0.044791918247938156
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7253794074058533,
                        0.16136372089385986,
                        -2.5146632194519043
                    ],
                    "area": 0.8656019568443298,
                    "normal": [
                        0.9979467988014221,
                        2.065775674964243e-07,
                        -0.06404898315668106
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7253794074058533,
                        0.16136372089385986,
                        -2.5146632194519043
                    ],
                    "area": 0.8656018972396851,
                    "normal": [
                        -0.9979467988014221,
                        2.065775674964243e-07,
                        -0.06404898315668106
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3679733872413635,
                        -0.4261820316314697,
                        1.5342841148376465
                    ],
                    "area": 0.8246269226074219,
                    "normal": [
                        -0.979585587978363,
                        2.710527837734844e-07,
                        0.2010275423526764
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3679733872413635,
                        -0.42618197202682495,
                        1.5342841148376465
                    ],
                    "area": 0.8246269226074219,
                    "normal": [
                        0.979585587978363,
                        2.710527837734844e-07,
                        0.2010275423526764
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4114794135093689,
                        -0.5241014957427979,
                        -2.1739699840545654
                    ],
                    "area": 0.8088601231575012,
                    "normal": [
                        0.9878122806549072,
                        -1.381681471457341e-07,
                        0.15564998984336853
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4114794135093689,
                        -0.5241014957427979,
                        -2.1739699840545654
                    ],
                    "area": 0.8088601231575012,
                    "normal": [
                        -0.9878122806549072,
                        -1.381681471457341e-07,
                        0.15564998984336853
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.000000238418579,
                        -0.24625734984874725,
                        0.0
                    ],
                    "area": 0.7922171950340271,
                    "normal": [
                        -1.0,
                        3.0095102943050733e-07,
                        -1.1920930376163597e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.000000238418579,
                        -0.24625734984874725,
                        0.0
                    ],
                    "area": 0.7922171950340271,
                    "normal": [
                        1.0,
                        3.0095102943050733e-07,
                        -1.1920930376163597e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.43424201011657715,
                        0.9331008195877075,
                        0.12519413232803345
                    ],
                    "area": 2.235077142715454,
                    "normal": [
                        0.9796802997589111,
                        0.16448068618774414,
                        -0.11477277427911758
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.43424201011657715,
                        0.9331012964248657,
                        0.12519413232803345
                    ],
                    "area": 2.235077142715454,
                    "normal": [
                        -0.9796801805496216,
                        0.1644807755947113,
                        -0.11477290093898773
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5261488556861877,
                        -0.40188151597976685,
                        0.2684532403945923
                    ],
                    "area": 1.8339545726776123,
                    "normal": [
                        -1.0,
                        6.020329124112322e-08,
                        -6.500122395891594e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5261486768722534,
                        -0.4018818736076355,
                        0.2684532403945923
                    ],
                    "area": 1.833954095840454,
                    "normal": [
                        1.0,
                        -5.780433909308158e-08,
                        1.2676591154558992e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.30947524309158325,
                        -1.7952072620391846,
                        0.03648458421230316
                    ],
                    "area": 1.6195462942123413,
                    "normal": [
                        0.8999374508857727,
                        -0.24782244861125946,
                        -0.35874301195144653
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3094766139984131,
                        -1.7952072620391846,
                        0.03648458421230316
                    ],
                    "area": 1.6195461750030518,
                    "normal": [
                        -0.8999376893043518,
                        -0.24782150983810425,
                        -0.35874316096305847
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3094756603240967,
                        -0.47567713260650635,
                        -0.7832875847816467
                    ],
                    "area": 1.3806768655776978,
                    "normal": [
                        0.8853327035903931,
                        -0.22389793395996094,
                        -0.40749940276145935
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.30947625637054443,
                        -0.47567689418792725,
                        -0.7832875847816467
                    ],
                    "area": 1.3806761503219604,
                    "normal": [
                        -0.8853331804275513,
                        -0.22389741241931915,
                        -0.4074985682964325
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9439250230789185,
                        0.683989405632019,
                        1.787552833557129
                    ],
                    "area": 1.2218989133834839,
                    "normal": [
                        0.35347315669059753,
                        0.0,
                        0.935444712638855
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.943924069404602,
                        0.6839901208877563,
                        1.787552833557129
                    ],
                    "area": 1.2218965291976929,
                    "normal": [
                        -0.35347387194633484,
                        1.2195108922696818e-08,
                        0.9354443550109863
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        1.1920928955078125e-07,
                        -0.8496261239051819,
                        -0.07470178604125977
                    ],
                    "area": 0.5353239178657532,
                    "normal": [
                        -2.1572735420249955e-07,
                        -0.9975347518920898,
                        0.0701746717095375
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.341104507446289e-07,
                        -0.17904892563819885,
                        -0.07470178604125977
                    ],
                    "area": 0.5353237986564636,
                    "normal": [
                        3.23591024198322e-07,
                        0.9975347518920898,
                        0.07017466425895691
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1175870895385742e-07,
                        -0.7633118629455566,
                        0.17742276191711426
                    ],
                    "area": 0.35843682289123535,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.2665987014770508e-07,
                        -0.04803553223609924,
                        -0.17848777770996094
                    ],
                    "area": 0.35339224338531494,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.4901161193847656e-08,
                        -0.5143377184867859,
                        -0.17848777770996094
                    ],
                    "area": 0.35339224338531494,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        9.685754776000977e-08,
                        -0.9806396961212158,
                        -0.3965120315551758
                    ],
                    "area": 0.35339221358299255,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.2665987014770508e-07,
                        -0.5143375396728516,
                        -0.3965120315551758
                    ],
                    "area": 0.35339218378067017,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -8.195638656616211e-08,
                        -0.9806398749351501,
                        -0.17848777770996094
                    ],
                    "area": 0.3533921539783478,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.564621925354004e-07,
                        -0.04803534597158432,
                        -0.3965120315551758
                    ],
                    "area": 0.3533921241760254,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1175870895385742e-07,
                        -0.2621897757053375,
                        0.3954470157623291
                    ],
                    "area": 0.3118617832660675,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -5.960464477539063e-08,
                        -1.359464168548584,
                        0.4950758218765259
                    ],
                    "area": 1.1467573642730713,
                    "normal": [
                        0.0,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.6193599700927734e-07,
                        1.7617101669311523,
                        -0.42990535497665405
                    ],
                    "area": 0.9941323399543762,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8624958992004395,
                        -0.02660636603832245,
                        0.8283513784408569
                    ],
                    "area": 0.9209167957305908,
                    "normal": [
                        0.8174780607223511,
                        -4.2070058725585113e-07,
                        0.5759598016738892
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8624957203865051,
                        -0.026606202125549316,
                        0.8283513784408569
                    ],
                    "area": 0.920916736125946,
                    "normal": [
                        -0.8174778819084167,
                        1.5776271311551682e-07,
                        0.5759599804878235
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.0044410228729248,
                        -2.980232238769531e-07,
                        0.31868791580200195
                    ],
                    "area": 0.9126121401786804,
                    "normal": [
                        0.9999906420707703,
                        -5.60191892873263e-07,
                        -0.004321479704231024
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0044407844543457,
                        -5.960464477539063e-08,
                        0.31868791580200195
                    ],
                    "area": 0.9126117825508118,
                    "normal": [
                        -0.9999906420707703,
                        2.4007320575947233e-07,
                        -0.004321882966905832
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5067538022994995,
                        8.940696716308594e-08,
                        -0.6666415929794312
                    ],
                    "area": 0.827649712562561,
                    "normal": [
                        -0.9999836683273315,
                        4.039690111312666e-07,
                        -0.005720613058656454
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5067540407180786,
                        -5.960464477539063e-08,
                        -0.6666415929794312
                    ],
                    "area": 0.827649712562561,
                    "normal": [
                        0.9999836683273315,
                        0.0,
                        -0.005720698274672031
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.76837158203125e-07,
                        1.6963263750076294,
                        -1.8293752670288086
                    ],
                    "area": 0.7665156722068787,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        7.301568984985352e-07,
                        2.6267287731170654,
                        -1.8293752670288086
                    ],
                    "area": 0.7665156722068787,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -9.685754776000977e-08,
                        -0.4920387268066406,
                        0.8564288020133972
                    ],
                    "area": 0.8971675038337708,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.31495440006256104,
                        -0.4920390844345093,
                        0.5815612077713013
                    ],
                    "area": 0.875983715057373,
                    "normal": [
                        0.7687963843345642,
                        -6.804310004326908e-08,
                        0.6394935250282288
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.31495460867881775,
                        -0.49203842878341675,
                        0.5815612077713013
                    ],
                    "area": 0.8759836554527283,
                    "normal": [
                        -0.7687963843345642,
                        2.9768855824841012e-08,
                        0.6394936442375183
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4360184967517853,
                        -0.4656308889389038,
                        0.22213920950889587
                    ],
                    "area": 0.8436957001686096,
                    "normal": [
                        1.0,
                        -6.799477603181003e-08,
                        3.7479438219634176e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.43601858615875244,
                        -0.4656303822994232,
                        0.22213920950889587
                    ],
                    "area": 0.8436957001686096,
                    "normal": [
                        -0.9999999403953552,
                        6.043979539072097e-08,
                        -2.7122089818476525e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.35830169916152954,
                        -0.43922239542007446,
                        -0.21387933194637299
                    ],
                    "area": 0.5906088352203369,
                    "normal": [
                        -0.9439006447792053,
                        8.199805279218708e-08,
                        -0.3302297592163086
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3583018183708191,
                        -0.43922263383865356,
                        -0.21387933194637299
                    ],
                    "area": 0.5906087160110474,
                    "normal": [
                        0.9439006447792053,
                        0.0,
                        -0.33022958040237427
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.7567148208618164e-07,
                        0.9122288227081299,
                        -0.9133102297782898
                    ],
                    "area": 0.5322743654251099,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6315845847129822,
                        1.6027603149414062,
                        -0.19007685780525208
                    ],
                    "area": 0.5061988830566406,
                    "normal": [
                        -0.8158777952194214,
                        3.6796706126551726e-07,
                        0.5782243609428406
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6315856575965881,
                        1.602759838104248,
                        -0.19007685780525208
                    ],
                    "area": 0.5061988830566406,
                    "normal": [
                        0.8158777952194214,
                        -7.359341225310345e-07,
                        0.5782243609428406
                    ]
                }
            ]
        },
        "Components_Ram": {
            "collection": "Components",
            "object_name": "Ram",
            "dimensions": {
                "width": 3.133126974105835,
                "height": 2.8021700382232666,
                "depth": 4.930736541748047
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.16962675750255585,
                        0.2720210552215576,
                        -0.42749032378196716
                    ],
                    "area": 0.3489880859851837,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.16962675750255585,
                        0.2720211148262024,
                        -0.42749032378196716
                    ],
                    "area": 0.3489880859851837,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.857035219669342,
                        0.02776108682155609,
                        0.0
                    ],
                    "area": 0.3392602205276489,
                    "normal": [
                        1.0,
                        -3.4062756526509474e-07,
                        -1.1163360369437214e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.857035219669342,
                        0.02776108682155609,
                        0.0
                    ],
                    "area": 0.3392602205276489,
                    "normal": [
                        -1.0,
                        -3.4062756526509474e-07,
                        -1.1163360369437214e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.12895631790161133,
                        0.4237499237060547,
                        0.3470892608165741
                    ],
                    "area": 0.3324665129184723,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.12895631790161133,
                        0.4237499237060547,
                        0.3470892608165741
                    ],
                    "area": 0.3324665129184723,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3741254210472107,
                        0.3997263014316559,
                        0.4046768546104431
                    ],
                    "area": 0.32924214005470276,
                    "normal": [
                        -1.0,
                        1.6183513196210697e-07,
                        7.153225567435584e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3741254210472107,
                        0.3997263014316559,
                        0.4046768546104431
                    ],
                    "area": 0.32924214005470276,
                    "normal": [
                        1.0,
                        1.6183513196210697e-07,
                        7.153225567435584e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7700328826904297,
                        0.39972609281539917,
                        0.4046768546104431
                    ],
                    "area": 0.32924214005470276,
                    "normal": [
                        -0.9999999403953552,
                        -3.2367029234592337e-07,
                        9.030273417920398e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7700328826904297,
                        0.39972609281539917,
                        0.4046768546104431
                    ],
                    "area": 0.32924211025238037,
                    "normal": [
                        0.9999999403953552,
                        -3.2367029234592337e-07,
                        9.030273417920398e-08
                    ]
                }
            ]
        },
        "Components_WindowBlockhalf.001": {
            "collection": "Components",
            "object_name": "WindowBlockhalf.001",
            "dimensions": {
                "width": 0.7571772933006287,
                "height": 0.3909154534339905,
                "depth": 1.9951171875
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.450942724943161,
                        -0.729091227054596,
                        1.1873552799224854
                    ],
                    "area": 0.763822078704834,
                    "normal": [
                        1.0,
                        -2.334244015855802e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07226915657520294,
                        -0.7290910482406616,
                        1.1873552799224854
                    ],
                    "area": 0.7638219594955444,
                    "normal": [
                        -1.0,
                        2.3342444421814434e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.450942724943161,
                        -0.457816481590271,
                        -0.7444218397140503
                    ],
                    "area": 0.6040402054786682,
                    "normal": [
                        1.0,
                        -2.3342441579643491e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07226915657520294,
                        -0.45781630277633667,
                        -0.7444217801094055
                    ],
                    "area": 0.6040400862693787,
                    "normal": [
                        -1.0,
                        2.3342445842899906e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6666666269302368,
                        -0.7460345029830933,
                        -1.0
                    ],
                    "area": 0.5502682328224182,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6666667461395264,
                        0.746034562587738,
                        -1.0
                    ],
                    "area": 0.5502681732177734,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6845752000808716,
                        0.2968701720237732,
                        -0.8695697784423828
                    ],
                    "area": 0.5300071835517883,
                    "normal": [
                        0.9836104512214661,
                        -0.18030652403831482,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6845752000808716,
                        0.02559543401002884,
                        1.1873552799224854
                    ],
                    "area": 0.5300071239471436,
                    "normal": [
                        0.9836104512214661,
                        -0.1803065538406372,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6166784167289734,
                        0.6900944709777832,
                        0.8271845579147339
                    ],
                    "area": 0.4708411395549774,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6166778206825256,
                        -0.6900953054428101,
                        0.8271845579147339
                    ],
                    "area": 0.4708409309387207,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.42213743925094604,
                        0.32352256774902344,
                        1.2991455793380737
                    ],
                    "area": 0.9791117906570435,
                    "normal": [
                        -1.0,
                        1.8521207323374256e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5912628769874573,
                        0.32352250814437866,
                        1.2991455793380737
                    ],
                    "area": 0.9791117906570435,
                    "normal": [
                        1.0,
                        -1.8521207323374256e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1175870895385742e-07,
                        0.825402557849884,
                        -1.0
                    ],
                    "area": 0.6560920476913452,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        7.450580596923828e-09,
                        -0.8254022598266602,
                        -1.0
                    ],
                    "area": 0.6560919880867004,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5007895231246948,
                        -0.29296743869781494,
                        -0.742952823638916
                    ],
                    "area": 0.6304506063461304,
                    "normal": [
                        -0.9201588034629822,
                        -0.3915453851222992,
                        1.772679780742692e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6021204590797424,
                        0.16486650705337524,
                        -0.742952823638916
                    ],
                    "area": 0.578586995601654,
                    "normal": [
                        -0.999862790107727,
                        -0.016564778983592987,
                        8.04824928923864e-10
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2644902765750885,
                        -0.029096126556396484,
                        -0.6058527231216431
                    ],
                    "area": 0.563409149646759,
                    "normal": [
                        0.0,
                        1.0,
                        6.013804920712573e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        3.725290298461914e-08,
                        0.7635113000869751,
                        0.8271845579147339
                    ],
                    "area": 0.5613900423049927,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.3958425521850586e-07,
                        -0.7635116577148438,
                        0.8271845579147339
                    ],
                    "area": 0.5613898038864136,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.6666666269302368,
                        -0.7460343241691589,
                        -1.0
                    ],
                    "area": 0.550268292427063,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.5331974029541016e-07,
                        2.017289876937866,
                        4.292795658111572
                    ],
                    "area": 8.03658390045166,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -6.258487701416016e-07,
                        0.6064733862876892,
                        -2.5862998962402344
                    ],
                    "area": 5.817765235900879,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.574002981185913,
                        0.6365140676498413,
                        2.1511478424072266
                    ],
                    "area": 5.595707893371582,
                    "normal": [
                        -1.0,
                        2.1259101856685447e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.5740116834640503,
                        0.6365134716033936,
                        2.1511480808258057
                    ],
                    "area": 5.595707893371582,
                    "normal": [
                        1.0,
                        2.1259101856685447e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.9272168874740601,
                        1.802301049232483,
                        4.292795658111572
                    ],
                    "area": 4.844701766967773,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.9272173643112183,
                        1.802301049232483,
                        4.292795658111572
                    ],
                    "area": 4.844699859619141,
                    "normal": [
                        0.0,
                        -0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.8884069919586182,
                        0.8171210289001465,
                        3.8440279960632324
                    ],
                    "area": 4.230913162231445,
                    "normal": [
                        1.0,
                        -4.299090790027549e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.8884074687957764,
                        0.8171215653419495,
                        3.8440279960632324
                    ],
                    "area": 4.230913162231445,
                    "normal": [
                        -1.0,
                        2.02310104668868e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.289616346359253,
                        1.2350764274597168,
                        0.5892488360404968
                    ],
                    "area": 3.316805839538574,
                    "normal": [
                        1.0,
                        9.866388239743173e-08,
                        -1.2323017472226638e-05
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.2896121740341187,
                        1.235077142715454,
                        0.5892488956451416
                    ],
                    "area": 3.316802501678467,
                    "normal": [
                        -1.0,
                        1.5433575129009114e-07,
                        -1.258595148101449e-07
                    ]
                }
            ]
        },
        "Components_Pointer": {
            "collection": "Components",
            "object_name": "Pointer",
            "dimensions": {
                "width": 1.2361599206924438,
                "height": 2.494506359100342,
                "depth": 7.202186107635498
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -8.940696716308594e-08,
                        -4.76837158203125e-07,
                        2.394887924194336
                    ],
                    "area": 12.447023391723633,
                    "normal": [
                        0.0,
                        -0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.2147506475448608,
                        -1.430511474609375e-06,
                        1.5233540534973145
                    ],
                    "area": 8.930229187011719,
                    "normal": [
                        1.0,
                        -2.79217715615232e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.2147507667541504,
                        4.76837158203125e-07,
                        1.5233540534973145
                    ],
                    "area": 8.930228233337402,
                    "normal": [
                        -1.0,
                        1.1634073615596208e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.2147507667541504,
                        -5.066394805908203e-07,
                        -0.6697902679443359
                    ],
                    "area": 5.121381759643555,
                    "normal": [
                        1.0,
                        -9.21652514307425e-08,
                        5.2686992546568945e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.2147505283355713,
                        5.662441253662109e-07,
                        -0.6697902679443359
                    ],
                    "area": 5.1213812828063965,
                    "normal": [
                        -1.0,
                        1.448311195417773e-07,
                        -1.5806115527539077e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        4.172325134277344e-07,
                        4.145345687866211,
                        1.5233540534973145
                    ],
                    "area": 4.234786033630371,
                    "normal": [
                        9.813473980102572e-07,
                        1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -5.960464477539062e-07,
                        -4.145346641540527,
                        1.5233540534973145
                    ],
                    "area": 4.2347846031188965,
                    "normal": [
                        -1.570156655361643e-06,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        4.172325134277344e-07,
                        3.353494167327881,
                        0.13235658407211304
                    ],
                    "area": 4.015553951263428,
                    "normal": [
                        1.7812129726735293e-07,
                        0.286174476146698,
                        -0.9581775069236755
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -3.5762786865234375e-07,
                        -3.3534939289093018,
                        0.13235658407211304
                    ],
                    "area": 4.015552997589111,
                    "normal": [
                        -2.8202552471157105e-07,
                        -0.28617459535598755,
                        -0.9581775069236755
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.2147506475448608,
                        -1.0728836059570312e-06,
                        0.27383893728256226
                    ],
                    "area": 3.8730108737945557,
                    "normal": [
                        1.0,
                        -2.21047358195392e-07,
                        7.884583652639776e-08
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.49229976534843445,
                        0.14190766215324402,
                        0.04794993996620178
                    ],
                    "area": 1.3300230503082275,
                    "normal": [
                        1.0,
                        -5.618734348900034e-07,
                        2.8524198114610044e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.842877388000488e-07,
                        2.10548996925354,
                        -0.4105721712112427
                    ],
                    "area": 1.1912213563919067,
                    "normal": [
                        3.752743538143477e-08,
                        0.08125533163547516,
                        -0.9966933131217957
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.8443052768707275,
                        2.105489730834961,
                        0.01582229882478714
                    ],
                    "area": 1.1230970621109009,
                    "normal": [
                        0.0,
                        0.08125349879264832,
                        0.9966934323310852
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.8443050384521484,
                        2.105490207672119,
                        -0.4105721712112427
                    ],
                    "area": 1.1230970621109009,
                    "normal": [
                        0.0,
                        0.08125533908605576,
                        -0.9966933131217957
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.08012813329696655,
                        0.14190804958343506,
                        -0.47445374727249146
                    ],
                    "area": 1.0493762493133545,
                    "normal": [
                        5.416877341644921e-14,
                        1.872911070677219e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.08012792468070984,
                        0.14190787076950073,
                        0.570353627204895
                    ],
                    "area": 1.0493756532669067,
                    "normal": [
                        -2.1667517498095978e-13,
                        -1.8729113548943133e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.49229881167411804,
                        -0.9967271089553833,
                        0.04794982075691223
                    ],
                    "area": 1.0492849349975586,
                    "normal": [
                        1.0,
                        -1.187005864267121e-06,
                        2.8524172535071557e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3788001835346222,
                        2.105489492416382,
                        -0.19737493991851807
                    ],
                    "area": 0.6752038598060608,
                    "normal": [
                        0.9896718263626099,
                        0.14335182309150696,
                        -3.0896779890099424e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.201441764831543,
                        2.10548996925354,
                        -0.19737493991851807
                    ],
                    "area": 0.6752038598060608,
                    "normal": [
                        -0.9896716475486755,
                        0.14335274696350098,
                        -3.0896779890099424e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.49229755997657776,
                        -2.374340534210205,
                        0.04794982075691223
                    ],
                    "area": 0.6745444536209106,
                    "normal": [
                        1.0,
                        -5.539327503356617e-07,
                        2.8524198114610044e-07
                    ]
                }
            ]
        },
        "Components_Beard": {
            "collection": "Components",
            "object_name": "Beard",
            "dimensions": {
                "width": 1.7625367641448975,
                "height": 2.4289772510528564,
                "depth": 9.595779418945312
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -7.748603820800781e-07,
                        -1.6773568391799927,
                        -0.6953248381614685
                    ],
                    "area": 4.83359956741333,
                    "normal": [
                        -8.232042163821424e-14,
                        -1.2907470647860464e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -7.748603820800781e-07,
                        -1.6773567199707031,
                        0.4836520552635193
                    ],
                    "area": 4.46183967590332,
                    "normal": [
                        8.91793420793735e-14,
                        1.2907469226774992e-07,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5919009447097778,
                        -2.006951093673706,
                        -1.7881393432617188e-07
                    ],
                    "area": 3.3502767086029053,
                    "normal": [
                        -0.9999999403953552,
                        2.9485335062418017e-07,
                        -1.5105071327070618e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5918997526168823,
                        -2.0069515705108643,
                        -1.7881393432617188e-07
                    ],
                    "area": 3.3502767086029053,
                    "normal": [
                        1.0,
                        -2.948533790458896e-07,
                        3.52451536400622e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.470348358154297e-07,
                        -2.006951332092285,
                        -0.5919005274772644
                    ],
                    "area": 3.3502767086029053,
                    "normal": [
                        0.0,
                        1.263657196659551e-07,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -7.450580596923828e-07,
                        -2.006951332092285,
                        0.5919001698493958
                    ],
                    "area": 3.350275754928589,
                    "normal": [
                        -5.0900354487933355e-14,
                        -1.263657054551004e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7726361155509949,
                        -1.6773571968078613,
                        0.007606208324432373
                    ],
                    "area": 2.3476953506469727,
                    "normal": [
                        -1.0,
                        2.904180291807279e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7726377248764038,
                        -1.6773563623428345,
                        0.007606208324432373
                    ],
                    "area": 2.3476951122283936,
                    "normal": [
                        1.0,
                        -2.904180291807279e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -4.76837158203125e-07,
                        0.15358173847198486,
                        -0.03526794910430908
                    ],
                    "area": 1.9820356369018555,
                    "normal": [
                        -2.040617204102091e-07,
                        -0.9999999403953552,
                        2.0587249593972956e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -4.6193599700927734e-07,
                        0.031849510967731476,
                        -0.03526794910430908
                    ],
                    "area": 1.9820356369018555,
                    "normal": [
                        2.0508201714619645e-07,
                        0.9999999403953552,
                        -2.0415690471509151e-07
                    ]
                }
            ]
        },
        "Components_Crabface": {
            "collection": "Components",
            "object_name": "Crabface",
            "dimensions": {
                "width": 3.150132656097412,
                "height": 1.2993237972259521,
                "depth": 3.7190709114074707
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.7201929092407227,
                        -3.624154567718506,
                        -0.6611967086791992
                    ],
                    "area": 7.735480785369873,
                    "normal": [
                        -1.5410714482300136e-08,
                        -0.17519444227218628,
                        -0.9845338463783264
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7201924324035645,
                        -3.624154567718506,
                        0.6611959934234619
                    ],
                    "area": 7.735480308532715,
                    "normal": [
                        -9.246429755194185e-08,
                        -0.17519475519657135,
                        0.9845337867736816
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.2342097759246826,
                        -3.624154806137085,
                        -3.129243850708008e-07
                    ],
                    "area": 5.035567283630371,
                    "normal": [
                        1.0,
                        -1.2522252745839069e-07,
                        5.408799665929109e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27980726957321167,
                        -3.624154567718506,
                        -3.129243850708008e-07
                    ],
                    "area": 5.035567283630371,
                    "normal": [
                        -1.0,
                        1.2522247061497183e-07,
                        -1.802933695671527e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        1.1920928955078125e-07,
                        -1.0
                    ],
                    "area": 3.999999523162842,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.23421049118042,
                        -1.205556035041809,
                        0.0
                    ],
                    "area": 2.0585532188415527,
                    "normal": [
                        1.0,
                        -5.790925570181571e-07,
                        5.960450621955715e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6399036049842834,
                        -1.3600966930389404,
                        0.0
                    ],
                    "area": 2.037014961242676,
                    "normal": [
                        -0.7071071863174438,
                        -0.7071064114570618,
                        -1.4630389344461037e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.9772017002105713,
                        -3.624154806137085,
                        -0.6611967086791992
                    ],
                    "area": 1.988085389137268,
                    "normal": [
                        0.0,
                        -0.17519444227218628,
                        -0.9845337867736816
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.977200984954834,
                        -3.624155044555664,
                        0.6611959934234619
                    ],
                    "area": 1.9880852699279785,
                    "normal": [
                        0.0,
                        -0.17519475519657135,
                        0.9845337271690369
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.023313522338867e-07,
                        -0.43984293937683105,
                        1.0
                    ],
                    "area": 1.7755546569824219,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -7.748603820800781e-07,
                        -2.859541893005371,
                        -1.0
                    ],
                    "area": 2.6686625480651855,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.3709068298339844e-06,
                        -4.301303863525391,
                        -1.0
                    ],
                    "area": 2.5915427207946777,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.125133991241455,
                        -3.2782554626464844e-07,
                        -0.3641393184661865
                    ],
                    "area": 2.543442726135254,
                    "normal": [
                        1.0,
                        -2.980232238769531e-07,
                        9.373841436399744e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.125133991241455,
                        2.086162567138672e-07,
                        -0.3641393184661865
                    ],
                    "area": 2.543442487716675,
                    "normal": [
                        -1.0,
                        2.980232238769531e-07,
                        -2.8121553441451397e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.470348358154297e-08,
                        1.043081283569336e-07,
                        -1.0
                    ],
                    "area": 2.4994874000549316,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.341104507446289e-06,
                        -2.334392786026001,
                        0.849083423614502
                    ],
                    "area": 2.1453635692596436,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.205371856689453e-06,
                        -5.265416145324707,
                        -0.2608163356781006
                    ],
                    "area": 2.0683038234710693,
                    "normal": [
                        -3.458175399373431e-07,
                        -0.7542256712913513,
                        0.6566153168678284
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8750030994415283,
                        1.7881393432617188e-07,
                        0.6358606815338135
                    ],
                    "area": 1.767090082168579,
                    "normal": [
                        -0.8242686986923218,
                        1.6021937199184322e-07,
                        0.5661988258361816
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8750028610229492,
                        -5.513429641723633e-07,
                        0.6358606815338135
                    ],
                    "area": 1.767090082168579,
                    "normal": [
                        0.8242688179016113,
                        -3.9633212622902647e-07,
                        0.5661985874176025
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0241620540618896,
                        -4.301303386688232,
                        -0.44001221656799316
                    ],
                    "area": 1.4169970750808716,
                    "normal": [
                        -1.0,
                        4.711071142082801e-07,
                        -3.193176780769136e-07
                    ]
                }
            ]
        },
        "Components_InstrumentMast-2": {
            "collection": "Components",
            "object_name": "InstrumentMast-2",
            "dimensions": {
                "width": 2.734619617462158,
                "height": 2.1873011589050293,
                "depth": 16.469161987304688
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        3.3978652954101562,
                        -2.2649765014648438e-06,
                        2.384185791015625e-07
                    ],
                    "area": 33.7886848449707,
                    "normal": [
                        1.0,
                        -9.153358604407913e-08,
                        2.297406354045961e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.500379800796509,
                        0.9496080875396729,
                        -1.0
                    ],
                    "area": 25.239376068115234,
                    "normal": [
                        9.931591904432935e-08,
                        -6.756516698935063e-15,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        3.3978633880615234,
                        -5.515956878662109,
                        -1.1920928955078125e-07
                    ],
                    "area": 23.454315185546875,
                    "normal": [
                        1.0,
                        -7.120702889551467e-07,
                        1.1487021112088769e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.0635597705841064,
                        17.70891571044922,
                        -0.9263961315155029
                    ],
                    "area": 22.23251724243164,
                    "normal": [
                        1.3404834930952347e-07,
                        0.013046801090240479,
                        -0.9999148845672607
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0782766342163086,
                        17.708913803100586,
                        4.947185516357422e-06
                    ],
                    "area": 20.90409278869629,
                    "normal": [
                        0.9999037384986877,
                        0.013875906355679035,
                        1.910396605353526e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -3.0488433837890625,
                        17.708913803100586,
                        4.634261131286621e-06
                    ],
                    "area": 20.90409278869629,
                    "normal": [
                        -0.9999037384986877,
                        0.013875898905098438,
                        -2.4236376816588745e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        7.450580596923828e-08,
                        0.4748040437698364,
                        -1.7972142696380615
                    ],
                    "area": 19.084529876708984,
                    "normal": [
                        -0.6233659982681274,
                        1.873915067562848e-08,
                        -0.7819302082061768
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.2819697856903076,
                        8.611675262451172,
                        -0.999997615814209
                    ],
                    "area": 17.724882125854492,
                    "normal": [
                        1.162363929552157e-07,
                        7.082757633725123e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.2819700241088867,
                        8.611674308776855,
                        1.000002145767212
                    ],
                    "area": 17.72488021850586,
                    "normal": [
                        -1.2786004788267746e-07,
                        -7.032303983578458e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -4.000760078430176,
                        0.9496079683303833,
                        -2.980232238769531e-07
                    ],
                    "area": 16.821983337402344,
                    "normal": [
                        -1.0,
                        2.8346070379825505e-08,
                        -1.1920930376163597e-07
                    ]
                }
            ]
        },
        "Components_WindowBlock": {
            "collection": "Components",
            "object_name": "WindowBlock",
            "dimensions": {
                "width": 0.6486351490020752,
                "height": 0.9300442337989807,
                "depth": 1.4921430349349976
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.43454840779304504,
                        0.9999998807907104,
                        0.0
                    ],
                    "area": 2.961721181869507,
                    "normal": [
                        4.743479564695008e-07,
                        1.0,
                        1.5931607322272612e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.43454790115356445,
                        -1.0,
                        0.0
                    ],
                    "area": 2.9617209434509277,
                    "normal": [
                        -4.743480417346291e-07,
                        -1.0,
                        -6.827840337564339e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.5626180171966553,
                        -3.2782554626464844e-07,
                        0.19532275199890137
                    ],
                    "area": 2.6618316173553467,
                    "normal": [
                        1.0,
                        -2.682209014892578e-07,
                        4.4784652430962524e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.5626177787780762,
                        -0.6666669845581055,
                        0.09766137599945068
                    ],
                    "area": 2.5316162109375,
                    "normal": [
                        1.0,
                        -3.096092200394196e-07,
                        1.4126459291219362e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.5626182556152344,
                        0.6666663289070129,
                        0.09766137599945068
                    ],
                    "area": 2.5316162109375,
                    "normal": [
                        1.0,
                        -3.7602268321279553e-07,
                        -6.278432351791707e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.2813092470169067,
                        0.9999996423721313,
                        0.0
                    ],
                    "area": 2.0266075134277344,
                    "normal": [
                        0.0,
                        1.0,
                        1.3237746543381945e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.281308650970459,
                        -1.000000238418579,
                        0.0
                    ],
                    "area": 2.0266072750091553,
                    "normal": [
                        0.0,
                        -1.0,
                        -1.6547184600312903e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        4.470348358154297e-08,
                        1.043081283569336e-07,
                        -1.400525450706482
                    ],
                    "area": 1.4363043308258057,
                    "normal": [
                        -0.3718112111091614,
                        8.299723930349501e-08,
                        -0.9283084273338318
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2172742336988449,
                        0.6666667461395264,
                        -1.3549871444702148
                    ],
                    "area": 1.3130367994308472,
                    "normal": [
                        -0.4529587924480438,
                        0.4038335978984833,
                        -0.79482501745224
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.21727408468723297,
                        -0.6666666269302368,
                        -1.3549871444702148
                    ],
                    "area": 1.3130367994308472,
                    "normal": [
                        -0.452958881855011,
                        -0.4038335382938385,
                        -0.79482501745224
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0000001192092896,
                        2.0265579223632812e-06,
                        0.0
                    ],
                    "area": 23.80307388305664,
                    "normal": [
                        -1.0,
                        4.757739446858977e-08,
                        -1.341104507446289e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.658964216709137,
                        1.7881393432617188e-06,
                        -1.7681450843811035
                    ],
                    "area": 15.246318817138672,
                    "normal": [
                        -0.9139713644981384,
                        3.909445212002538e-08,
                        -0.405778706073761
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6589641571044922,
                        -1.9669532775878906e-06,
                        1.7681450843811035
                    ],
                    "area": 15.246316909790039,
                    "normal": [
                        0.9139713644981384,
                        -7.427945547533454e-08,
                        0.405778706073761
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6589642763137817,
                        1.7881393432617188e-07,
                        -1.7681450843811035
                    ],
                    "area": 15.246315956115723,
                    "normal": [
                        0.9139713644981384,
                        0.0,
                        -0.4057787358760834
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6589644551277161,
                        1.2516975402832031e-06,
                        1.7681450843811035
                    ],
                    "area": 15.24631404876709,
                    "normal": [
                        -0.9139713048934937,
                        3.51850140134502e-08,
                        0.40577879548072815
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        3.7997961044311523e-06,
                        10.164379119873047,
                        0.8494720458984375
                    ],
                    "area": 14.326481819152832,
                    "normal": [
                        4.992542912418685e-08,
                        0.03570143133401871,
                        0.9993625283241272
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8494663238525391,
                        10.16438102722168,
                        2.0265579223632812e-06
                    ],
                    "area": 14.326478958129883,
                    "normal": [
                        -0.9993624687194824,
                        0.035702746361494064,
                        -1.1649269282543173e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        3.725290298461914e-06,
                        10.16438102722168,
                        -0.8494679927825928
                    ],
                    "area": 14.326475143432617,
                    "normal": [
                        6.656726725395856e-08,
                        0.03570239245891571,
                        -0.9993624091148376
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.887580871582031e-06,
                        -8.601031303405762,
                        -1.0000009536743164
                    ],
                    "area": 10.601056098937988,
                    "normal": [
                        2.573785368858994e-13,
                        3.823314500550623e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0000051259994507,
                        -8.601030349731445,
                        -1.0132789611816406e-06
                    ],
                    "area": 10.601054191589355,
                    "normal": [
                        -1.0,
                        1.7992066432270803e-06,
                        -1.1921019904548302e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.48188456892967224,
                        -1.768812894821167,
                        0.0
                    ],
                    "area": 2.6840028762817383,
                    "normal": [
                        1.0,
                        -6.467930546705247e-08,
                        4.6046213952877224e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.7592944502830505,
                        4.676012992858887,
                        -0.21960675716400146
                    ],
                    "area": 1.3934450149536133,
                    "normal": [
                        8.158688432962843e-14,
                        4.476164008337946e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.7094245553016663,
                        2.7578516006469727,
                        -0.2716100215911865
                    ],
                    "area": 1.3823490142822266,
                    "normal": [
                        2.6948983489205602e-08,
                        0.060860101133584976,
                        -0.9981463551521301
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.4731360673904419,
                        -1.4858649969100952,
                        -0.8706773519515991
                    ],
                    "area": 1.3522495031356812,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.2712114453315735,
                        -1.435542106628418,
                        -0.6082144975662231
                    ],
                    "area": 1.237226128578186,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.48188453912734985,
                        -1.5770163536071777,
                        0.46591365337371826
                    ],
                    "area": 1.071053385734558,
                    "normal": [
                        1.0,
                        -1.4254399616220326e-07,
                        1.9212444613003754e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.48188459873199463,
                        -1.5770158767700195,
                        -0.46591365337371826
                    ],
                    "area": 1.071053385734558,
                    "normal": [
                        1.0,
                        0.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6960778832435608,
                        -0.608462929725647,
                        -0.14998826384544373
                    ],
                    "area": 0.9959372282028198,
                    "normal": [
                        -0.2439359575510025,
                        3.1794144206287456e-08,
                        -0.9697914123535156
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6960780024528503,
                        -0.6084628701210022,
                        0.14998818933963776
                    ],
                    "area": 0.995936930179596,
                    "normal": [
                        -0.24393637478351593,
                        -5.610732323191314e-09,
                        0.9697912335395813
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3049754500389099,
                        2.7578513622283936,
                        4.76837158203125e-07
                    ],
                    "area": 0.936870813369751,
                    "normal": [
                        0.9890426397323608,
                        0.14763016998767853,
                        -2.703891652799939e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.49999988079071045,
                        1.7881393432617188e-07,
                        -0.5832338333129883
                    ],
                    "area": 2.0,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4999997019767761,
                        1.6909606456756592,
                        -0.3781244158744812
                    ],
                    "area": 1.441521167755127,
                    "normal": [
                        1.0337110012414996e-07,
                        0.2845734655857086,
                        -0.9586542248725891
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9999995827674866,
                        1.6909606456756592,
                        0.06986761093139648
                    ],
                    "area": 1.2381792068481445,
                    "normal": [
                        -1.0,
                        2.74221378049333e-07,
                        -3.658830678432423e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.207537293434143,
                        0.5062227249145508,
                        0.0
                    ],
                    "area": 1.0815367698669434,
                    "normal": [
                        -0.9218814969062805,
                        0.38747209310531616,
                        -1.377776754907245e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.7520089149475098,
                        -1.387550950050354,
                        0.28146064281463623
                    ],
                    "area": 0.7348105311393738,
                    "normal": [
                        -0.15793274343013763,
                        -0.06261524558067322,
                        0.9854626059532166
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.7520089149475098,
                        -1.3875508308410645,
                        -0.28146064281463623
                    ],
                    "area": 0.7348104119300842,
                    "normal": [
                        -0.1579328328371048,
                        -0.06261522322893143,
                        -0.9854626059532166
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.466033935546875,
                        -1.4875842332839966,
                        0.0
                    ],
                    "area": 0.6842808127403259,
                    "normal": [
                        0.9405118823051453,
                        -0.33976083993911743,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.182055950164795,
                        -1.2875175476074219,
                        0.0
                    ],
                    "area": 0.6789079904556274,
                    "normal": [
                        -1.0,
                        0.0,
                        -4.926297947349667e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7857726812362671,
                        -1.26871657371521,
                        -0.061696410179138184
                    ],
                    "area": 0.6347253918647766,
                    "normal": [
                        -0.7819264531135559,
                        -0.6233707070350647,
                        -1.0564447450178704e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.5716474056243896,
                        -0.003342673182487488,
                        0.871422290802002
                    ],
                    "area": 0.5932034254074097,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                }
            ]
        },
        "Components_Fore-Bridge": {
            "collection": "Components",
            "object_name": "Fore-Bridge",
            "dimensions": {
                "width": 1.8967787027359009,
                "height": 2.4134621620178223,
                "depth": 3.907454252243042
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        2.9802322387695312e-08,
                        0.6426936388015747,
                        -1.0
                    ],
                    "area": 6.570774078369141,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        3.9664549827575684,
                        -1.0
                    ],
                    "area": 2.261871814727783,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        2.843186855316162,
                        -1.0
                    ],
                    "area": 2.231199026107788,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        5.107538223266602,
                        -1.289757251739502
                    ],
                    "area": 2.165215492248535,
                    "normal": [
                        0.0,
                        -0.4496321380138397,
                        -0.8932138085365295
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        2.50893497467041,
                        0.7992656826972961
                    ],
                    "area": 1.7512989044189453,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        7.450580596923828e-09,
                        3.992975950241089,
                        0.7992656826972961
                    ],
                    "area": 1.5247445106506348,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.000000238418579,
                        0.8429758548736572,
                        -0.5958414077758789
                    ],
                    "area": 1.3977229595184326,
                    "normal": [
                        -0.9999999403953552,
                        4.816509857619167e-08,
                        -3.4163406326115364e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.000000238418579,
                        0.8429758548736572,
                        -0.5958414077758789
                    ],
                    "area": 1.3977229595184326,
                    "normal": [
                        0.9999999403953552,
                        4.816509857619167e-08,
                        -3.4163406326115364e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        1.0446194410324097,
                        0.725200891494751
                    ],
                    "area": 1.3878843784332275,
                    "normal": [
                        0.0,
                        -0.1217055469751358,
                        0.9925662279129028
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        7.450580596923828e-09,
                        -0.5557764172554016,
                        -0.6710399389266968
                    ],
                    "area": 1.1717991828918457,
                    "normal": [
                        0.0,
                        -0.42265766859054565,
                        0.9062893986701965
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        2.2385034561157227,
                        0.8464083075523376,
                        -0.43398433923721313
                    ],
                    "area": 1.810219168663025,
                    "normal": [
                        0.21630018949508667,
                        0.0,
                        -0.9763269424438477
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5000000596046448,
                        -1.072946548461914,
                        -0.32983511686325073
                    ],
                    "area": 1.4544706344604492,
                    "normal": [
                        -2.0490150021146292e-08,
                        -0.29234978556632996,
                        -0.9563113451004028
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5000003576278687,
                        -1.0729466676712036,
                        0.32983511686325073
                    ],
                    "area": 1.454470157623291,
                    "normal": [
                        -1.4343109455694503e-07,
                        -0.29234984517097473,
                        0.9563114643096924
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.4999998211860657,
                        0.311258465051651,
                        -0.5424422025680542
                    ],
                    "area": 1.3774833679199219,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.5000000596046448,
                        0.3112582862377167,
                        -0.5424422025680542
                    ],
                    "area": 1.3774832487106323,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.3744759559631348,
                        0.578833281993866,
                        -0.5424420833587646
                    ],
                    "area": 1.191796064376831,
                    "normal": [
                        3.183362480285723e-07,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.728055000305176,
                        0.8464080095291138,
                        1.1920928955078125e-07
                    ],
                    "area": 1.175208330154419,
                    "normal": [
                        1.0,
                        -2.6416304876875074e-07,
                        -1.9347521360620762e-13
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.188946485519409,
                        0.8417791128158569,
                        0.31662479043006897
                    ],
                    "area": 1.0152554512023926,
                    "normal": [
                        0.21630041301250458,
                        -1.1374871178304602e-07,
                        0.9763268828392029
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6715383529663086,
                        -1.0729471445083618,
                        0.0
                    ],
                    "area": 1.014740228652954,
                    "normal": [
                        0.9042243957519531,
                        -0.4270575940608978,
                        2.9369408593993285e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.33576884865760803,
                        -1.0729471445083618,
                        0.32983511686325073
                    ],
                    "area": 0.9767330288887024,
                    "normal": [
                        -2.1358573576435447e-07,
                        -0.29234975576400757,
                        0.9563114047050476
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -5.960464477539062e-07,
                        -5.829158306121826,
                        0.0
                    ],
                    "area": 6.541066646575928,
                    "normal": [
                        -1.093484911507403e-06,
                        -1.0,
                        -5.960469025012571e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        3.5762786865234375e-07,
                        5.829158782958984,
                        0.0
                    ],
                    "area": 6.541066646575928,
                    "normal": [
                        8.747879292059224e-07,
                        1.0,
                        1.1920927818209748e-06
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.5795230865478516e-06,
                        9.372512817382812,
                        0.9410353899002075
                    ],
                    "area": 6.116031169891357,
                    "normal": [
                        1.9491281477712619e-07,
                        -0.3274654448032379,
                        -0.9448632597923279
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        3.725290298461914e-07,
                        5.829158306121826,
                        2.0732734203338623
                    ],
                    "area": 5.605656623840332,
                    "normal": [
                        1.0955576499327435e-06,
                        1.0,
                        -2.221413382130777e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -7.599592208862305e-07,
                        -5.829158782958984,
                        2.0732734203338623
                    ],
                    "area": 5.605654716491699,
                    "normal": [
                        -2.1911159819865134e-06,
                        -1.0,
                        3.2449187109019617e-13
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6768522262573242,
                        11.063791275024414,
                        -0.3177717924118042
                    ],
                    "area": 3.7926907539367676,
                    "normal": [
                        1.7154665954421944e-07,
                        -1.0,
                        -3.494704401418858e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.0666697025299072,
                        9.841815948486328,
                        -0.3177717924118042
                    ],
                    "area": 3.3346617221832275,
                    "normal": [
                        0.9999999403953552,
                        1.463319563299592e-07,
                        8.736767398431766e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1822686195373535,
                        9.372513771057129,
                        -0.31777191162109375
                    ],
                    "area": 3.334660291671753,
                    "normal": [
                        -1.0,
                        -1.9510935089783743e-07,
                        -4.368380359665025e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1822692155838013,
                        6.968268871307373,
                        -0.31777191162109375
                    ],
                    "area": 3.226313829421997,
                    "normal": [
                        -0.9999999403953552,
                        -2.52076887363728e-07,
                        1.7618686457693267e-13
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1822710037231445,
                        6.968267917633057,
                        -0.31777191162109375
                    ],
                    "area": 3.2263126373291016,
                    "normal": [
                        1.0,
                        2.2686931799853483e-07,
                        2.184190748266701e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.4649333357810974,
                        8.940696716308594e-08,
                        -0.3717421293258667
                    ],
                    "area": 1.8597335815429688,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.658799648284912,
                        0.8652525544166565,
                        0.22834515571594238
                    ],
                    "area": 1.056419014930725,
                    "normal": [
                        -7.42726115277037e-07,
                        1.5853721890835004e-08,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.658799409866333,
                        0.8652524352073669,
                        -0.228346586227417
                    ],
                    "area": 1.0564188957214355,
                    "normal": [
                        7.427260584336182e-07,
                        -1.5853563795076298e-08,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -3.9071969985961914,
                        0.6685667634010315,
                        0.3870563507080078
                    ],
                    "area": 1.0463953018188477,
                    "normal": [
                        -7.330126550186833e-07,
                        4.345846599251857e-13,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.26149851083755493,
                        0.21420881152153015,
                        0.5859510898590088
                    ],
                    "area": 1.0459940433502197,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.1798666715621948,
                        1.1920928955078125e-07,
                        -0.3717421293258667
                    ],
                    "area": 1.0,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.7094253301620483,
                        0.36214378476142883,
                        -0.22834619879722595
                    ],
                    "area": 0.9468173384666443,
                    "normal": [
                        1.191907699649164e-06,
                        1.345332663049703e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.709425449371338,
                        0.36214426159858704,
                        0.2283455729484558
                    ],
                    "area": 0.9468173384666443,
                    "normal": [
                        -1.191907699649164e-06,
                        -1.3453278313591e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7264319658279419,
                        0.10710462927818298,
                        0.47884660959243774
                    ],
                    "area": 0.9196270108222961,
                    "normal": [
                        -0.4658604562282562,
                        2.3495050527344574e-07,
                        0.8848581314086914
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4649335741996765,
                        -0.9999998807907104,
                        0.0
                    ],
                    "area": 0.6913415789604187,
                    "normal": [
                        -1.6025042270939593e-07,
                        -1.0,
                        3.6076195897294383e-07
                    ]
                }
            ]
        },
        "Components_leafPanel": {
            "collection": "Components",
            "object_name": "leafPanel",
            "dimensions": {
                "width": 2.1341140270233154,
                "height": 6.808373928070068,
                "depth": 9.01439094543457
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -5.960464477539063e-08,
                        3.1559362411499023,
                        -0.2062968909740448
                    ],
                    "area": 2.5249805450439453,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.4901161193847656e-07,
                        -1.4765194654464722,
                        -0.2062968909740448
                    ],
                    "area": 1.9806402921676636,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.1920928955078125e-07,
                        3.725290298461914e-07,
                        -0.2062968909740448
                    ],
                    "area": 1.980640172958374,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.4901161193847656e-07,
                        -2.9530391693115234,
                        -0.2062968909740448
                    ],
                    "area": 1.980639934539795,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.1920928955078125e-07,
                        1.47652006149292,
                        -0.2062968909740448
                    ],
                    "area": 1.9806398153305054,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.682209014892578e-07,
                        -1.3561904430389404,
                        0.23704491555690765
                    ],
                    "area": 1.5289661884307861,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -3.427267074584961e-07,
                        0.13791152834892273
                    ],
                    "area": 1.4967987537384033,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -5.21540641784668e-07,
                        -2.7123806476593018,
                        0.23704491555690765
                    ],
                    "area": 1.2229301929473877,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.917383193969727e-07,
                        2.7123799324035645,
                        0.13791152834892273
                    ],
                    "area": 1.0009112358093262,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.4901161193847656e-08,
                        -3.377455949783325,
                        1.1698737144470215
                    ],
                    "area": 0.9490488767623901,
                    "normal": [
                        0.0,
                        1.0,
                        0.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6187546253204346,
                        0.24552421271800995,
                        -1.629821538925171
                    ],
                    "area": 1.3473851680755615,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5053324699401855,
                        0.23057812452316284,
                        -1.629821538925171
                    ],
                    "area": 0.9317265152931213,
                    "normal": [
                        0.9999999403953552,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.3741048574447632,
                        -0.25135189294815063,
                        -1.629821538925171
                    ],
                    "area": 0.6634199619293213,
                    "normal": [
                        0.0,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.3741048574447632,
                        0.7424002885818481,
                        -1.629821538925171
                    ],
                    "area": 0.6634199619293213,
                    "normal": [
                        -0.0,
                        1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.2145296335220337,
                        0.24552419781684875,
                        -2.5679051876068115
                    ],
                    "area": 0.5440047383308411,
                    "normal": [
                        0.9504697322845459,
                        0.0,
                        -0.3108171820640564
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.2145296335220337,
                        0.24552421271800995,
                        -0.6917380690574646
                    ],
                    "area": 0.5440046787261963,
                    "normal": [
                        0.9504697322845459,
                        0.0,
                        0.31081724166870117
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2526661455631256,
                        -0.2747543454170227,
                        -1.629821538925171
                    ],
                    "area": 0.525091290473938,
                    "normal": [
                        3.121605516298587e-07,
                        -0.8872047066688538,
                        -0.46137598156929016
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.25266632437705994,
                        -0.2747543454170227,
                        -1.629821538925171
                    ],
                    "area": 0.525090754032135,
                    "normal": [
                        -3.1216080742524355e-07,
                        -0.8872047662734985,
                        -0.46137598156929016
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6187546253204346,
                        0.24552421271800995,
                        -2.5679051876068115
                    ],
                    "area": 0.5170600414276123,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6187546253204346,
                        0.24552419781684875,
                        -0.6917380690574646
                    ],
                    "area": 0.5170599818229675,
                    "normal": [
                        -1.0,
                        0.0,
                        -0.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        1.4901161193847656e-08,
                        -4.470348358154297e-07,
                        1.3022860288619995
                    ],
                    "area": 3.3230462074279785,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -3.5762786865234375e-07,
                        1.1511430740356445
                    ],
                    "area": 2.4175477027893066,
                    "normal": [
                        0.0,
                        8.955689878575868e-08,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -1.4901161193847656e-08,
                        -0.20583844184875488
                    ],
                    "area": 1.9512193202972412,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -1.7881393432617188e-07,
                        0.01611638069152832
                    ],
                    "area": 1.4259064197540283,
                    "normal": [
                        0.0,
                        -1.1194612881126886e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        1.0732752084732056,
                        0.46556127071380615
                    ],
                    "area": 1.3902643918991089,
                    "normal": [
                        0.0,
                        1.0,
                        2.4126202902152727e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        -1.0732758045196533,
                        0.46556127071380615
                    ],
                    "area": 1.3902634382247925,
                    "normal": [
                        0.0,
                        -0.9999999403953552,
                        -4.825240580430545e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8845807313919067,
                        -4.023313522338867e-07,
                        0.7041244506835938
                    ],
                    "area": 1.0579272508621216,
                    "normal": [
                        0.9316249489784241,
                        -4.0847200466487266e-07,
                        -0.3634210228919983
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8845807313919067,
                        -4.023313522338867e-07,
                        0.7041244506835938
                    ],
                    "area": 1.0579272508621216,
                    "normal": [
                        -0.9316249489784241,
                        -4.0847200466487266e-07,
                        -0.3634210228919983
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        0.9411757588386536,
                        0.7041244506835938
                    ],
                    "area": 0.9448379278182983,
                    "normal": [
                        -0.0,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7983404397964478,
                        -3.5762786865234375e-07,
                        0.704124391078949
                    ],
                    "area": 0.8401332497596741,
                    "normal": [
                        -0.9375662207603455,
                        3.902065657257481e-07,
                        0.34780678153038025
                    ]
                }
            ]
        },
        "Components_vertmisstube": {
            "collection": "Components",
            "object_name": "vertmisstube",
            "dimensions": {
                "width": 1.6962707042694092,
                "height": 1.5848288536071777,
                "depth": 0.9644543528556824
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -1.7199517488479614,
                        1.6391277313232422e-07,
                        -1.0861921310424805
                    ],
                    "area": 4.349699020385742,
                    "normal": [
                        -1.0,
                        1.253530399480951e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.038196086883545,
                        -1.0638171434402466,
                        -0.8383685350418091
                    ],
                    "area": 3.1850433349609375,
                    "normal": [
                        -1.4494904121420404e-07,
                        -1.0,
                        1.71364902712412e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0381953716278076,
                        1.0638176202774048,
                        -0.8383685350418091
                    ],
                    "area": 3.185042381286621,
                    "normal": [
                        1.715202557761586e-07,
                        1.0,
                        -6.426186871522077e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.3217791318893433,
                        4.6193599700927734e-07,
                        0.7238439321517944
                    ],
                    "area": 2.235142469406128,
                    "normal": [
                        -0.46256783604621887,
                        3.8667215562782076e-07,
                        0.8865839242935181
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.23293939232826233,
                        -1.0638172626495361,
                        -0.7020964622497559
                    ],
                    "area": 1.4233167171478271,
                    "normal": [
                        -2.558808773756027e-07,
                        -1.0,
                        7.803878787626672e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2329387068748474,
                        1.0638175010681152,
                        -0.7020964622497559
                    ],
                    "area": 1.4233163595199585,
                    "normal": [
                        3.838214297502418e-07,
                        1.0,
                        -1.950976269426974e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.8710286617279053,
                        3.8743019104003906e-07,
                        0.2930665910243988
                    ],
                    "area": 0.5202991366386414,
                    "normal": [
                        -1.0,
                        5.616990392809385e-07,
                        -1.4466069160334882e-06
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5436655282974243,
                        2.980232238769531e-07,
                        0.959415078163147
                    ],
                    "area": 0.33375227451324463,
                    "normal": [
                        -0.462568074464798,
                        3.3346006489409774e-07,
                        0.8865837454795837
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.7954901456832886,
                        1.7881393432617188e-07,
                        0.10306565463542938
                    ],
                    "area": 0.3186984062194824,
                    "normal": [
                        -0.5183787941932678,
                        6.867332302817886e-08,
                        -0.8551511168479919
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6969912052154541,
                        3.2782554626464844e-07,
                        0.9646202325820923
                    ],
                    "area": 0.3186984062194824,
                    "normal": [
                        0.5183788537979126,
                        -3.857395256545715e-07,
                        0.8551510572433472
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        1.3990442752838135,
                        -0.624366044998169,
                        -0.33359986543655396
                    ],
                    "area": 1.3629649877548218,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.3990442752838135,
                        0.5807098150253296,
                        -0.33359986543655396
                    ],
                    "area": 1.3629648685455322,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.530064344406128,
                        0.38904041051864624,
                        0.333601713180542
                    ],
                    "area": 1.2830581665039062,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.530064105987549,
                        0.3890405595302582,
                        -0.33359986543655396
                    ],
                    "area": 1.283057689666748,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.4167671203613281,
                        0.5453845262527466,
                        -0.33359986543655396
                    ],
                    "area": 1.063361644744873,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.4167671203613281,
                        -0.730341911315918,
                        -0.33359986543655396
                    ],
                    "area": 1.063361644744873,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.530064105987549,
                        -1.1130530834197998,
                        0.3982192575931549
                    ],
                    "area": 0.9619970321655273,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.530064344406128,
                        -1.1130529642105103,
                        -0.39821740984916687
                    ],
                    "area": 0.9619969725608826,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        3.5138092041015625,
                        -0.5387071967124939,
                        1.2088820934295654
                    ],
                    "area": 0.9033311605453491,
                    "normal": [
                        -1.0,
                        2.6484798354431405e-07,
                        1.8345707530897926e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        3.5138089656829834,
                        -1.4389163255691528,
                        1.2088820934295654
                    ],
                    "area": 0.9033311605453491,
                    "normal": [
                        -1.0,
                        5.296959670886281e-07,
                        8.272449036894614e-08
                    ]
                }
            ]
        },
        "Components_Build-upBlock": {
            "collection": "Components",
            "object_name": "Build-upBlock",
            "dimensions": {
                "width": 2.320042133331299,
                "height": 2.221571683883667,
                "depth": 7.346309185028076
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.3853221833705902,
                        -2.384185791015625e-07,
                        1.0
                    ],
                    "area": 3.2295210361480713,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.3853221833705902,
                        -2.384185791015625e-07,
                        1.0
                    ],
                    "area": 3.2295210361480713,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.0704553127288818,
                        4.76837158203125e-07,
                        1.0
                    ],
                    "area": 2.5128207206726074,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.0704553127288818,
                        4.76837158203125e-07,
                        1.0
                    ],
                    "area": 2.5128207206726074,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.2078702449798584,
                        1.1942894458770752,
                        -0.8718589544296265
                    ],
                    "area": 1.4643479585647583,
                    "normal": [
                        4.799283601641946e-07,
                        -6.945276709302561e-08,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.207870364189148,
                        1.194289207458496,
                        -0.6316001415252686
                    ],
                    "area": 1.4643473625183105,
                    "normal": [
                        -4.799283601641946e-07,
                        6.945280972558976e-08,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.5708341598510742,
                        0.19330120086669922,
                        0.6929516196250916
                    ],
                    "area": 1.3744617700576782,
                    "normal": [
                        0.2717953026294708,
                        -0.007113943342119455,
                        -0.9623288512229919
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.5708343982696533,
                        0.19330108165740967,
                        0.9447815418243408
                    ],
                    "area": 1.3744615316390991,
                    "normal": [
                        0.2717951536178589,
                        -0.007113939616829157,
                        0.9623288512229919
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7706442475318909,
                        -1.2245018482208252,
                        -0.6436517834663391
                    ],
                    "area": 1.2412831783294678,
                    "normal": [
                        -1.0,
                        0.0,
                        -1.6726517060305923e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7706442475318909,
                        -1.2245018482208252,
                        -0.6436517834663391
                    ],
                    "area": 1.2412831783294678,
                    "normal": [
                        1.0,
                        0.0,
                        -1.6726517060305923e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6065136790275574,
                        -2.8752830028533936,
                        -0.22872525453567505
                    ],
                    "area": 1.7388584613800049,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.8061665296554565,
                        0.6537259817123413,
                        -0.1760469675064087
                    ],
                    "area": 1.2057604789733887,
                    "normal": [
                        -1.0,
                        5.85823954679654e-07,
                        -3.2189339549404394e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9323387145996094,
                        -1.742200493812561,
                        -0.29962170124053955
                    ],
                    "area": 0.9200078248977661,
                    "normal": [
                        -0.9738283157348633,
                        -0.18389903008937836,
                        0.1335652470588684
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0556591749191284,
                        -1.070540189743042,
                        -0.273980975151062
                    ],
                    "area": 0.862144947052002,
                    "normal": [
                        -0.9749729037284851,
                        -0.1837860643863678,
                        0.1251019537448883
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.3032568395137787,
                        -3.010596990585327,
                        -1.3758013248443604
                    ],
                    "area": 0.7893849611282349,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.3130744695663452,
                        0.7488030195236206,
                        -1.0865390300750732
                    ],
                    "area": 0.7063210606575012,
                    "normal": [
                        6.531436156365089e-07,
                        9.073830256056681e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.8061671257019043,
                        0.028896905481815338,
                        -0.2143031358718872
                    ],
                    "area": 0.6227207183837891,
                    "normal": [
                        -1.0,
                        1.6721835436328547e-06,
                        -1.739751525065003e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.3188228607177734,
                        1.5066542625427246,
                        0.9184704422950745
                    ],
                    "area": 0.5964423418045044,
                    "normal": [
                        -6.495685056506773e-07,
                        0.10679098218679428,
                        0.994281530380249
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.4819019138813019,
                        -0.6185681819915771,
                        -0.9654104709625244
                    ],
                    "area": 0.5799225568771362,
                    "normal": [
                        -0.09406513720750809,
                        0.08508017659187317,
                        -0.9919239282608032
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2134000062942505,
                        -3.105454444885254,
                        -0.36379122734069824
                    ],
                    "area": 0.5779886245727539,
                    "normal": [
                        0.0,
                        -0.956246018409729,
                        0.292563796043396
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.2693987488746643,
                        -1.1642367839813232,
                        -3.366548538208008
                    ],
                    "area": 1.9351009130477905,
                    "normal": [
                        -2.3101371482425748e-07,
                        -0.9988354444503784,
                        0.04824776202440262
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2693990170955658,
                        -1.1642365455627441,
                        -3.366548538208008
                    ],
                    "area": 1.9351009130477905,
                    "normal": [
                        -2.3101368640254805e-07,
                        -0.9988353848457336,
                        0.04824775829911232
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2693990468978882,
                        1.1642367839813232,
                        -3.366548538208008
                    ],
                    "area": 1.9351004362106323,
                    "normal": [
                        2.3101377166767634e-07,
                        0.9988353848457336,
                        0.04824776574969292
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.26939857006073,
                        1.1642370223999023,
                        -3.366548538208008
                    ],
                    "area": 1.9351003170013428,
                    "normal": [
                        2.3101377166767634e-07,
                        0.9988353848457336,
                        0.04824776574969292
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9693800210952759,
                        -0.39212024211883545,
                        -7.460974216461182
                    ],
                    "area": 1.7792984247207642,
                    "normal": [
                        -0.4660111963748932,
                        -0.8847787976264954,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9693797826766968,
                        -0.3921204209327698,
                        -7.46097469329834
                    ],
                    "area": 1.779298186302185,
                    "normal": [
                        0.4660114049911499,
                        -0.8847787380218506,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9693797826766968,
                        0.3921205997467041,
                        -7.46097469329834
                    ],
                    "area": 1.7792980670928955,
                    "normal": [
                        -0.4660114645957947,
                        0.8847787380218506,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9693797826766968,
                        0.3921204209327698,
                        -7.460974216461182
                    ],
                    "area": 1.7792980670928955,
                    "normal": [
                        0.46601131558418274,
                        0.8847787976264954,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.0660549402236938,
                        -0.39212048053741455,
                        -4.369635581970215
                    ],
                    "area": 1.7425647974014282,
                    "normal": [
                        0.5649969577789307,
                        -0.8244507312774658,
                        -0.03254985436797142
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0660550594329834,
                        -0.39212024211883545,
                        -4.369635581970215
                    ],
                    "area": 1.7425647974014282,
                    "normal": [
                        -0.5649968385696411,
                        -0.8244507908821106,
                        -0.03254979848861694
                    ]
                }
            ]
        },
        "Components_FinHangar": {
            "collection": "Components",
            "object_name": "FinHangar",
            "dimensions": {
                "width": 2.4916460514068604,
                "height": 6.254108428955078,
                "depth": 7.111417293548584
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6422430276870728,
                        0.08727014064788818,
                        0.5734724998474121
                    ],
                    "area": 1.1469260454177856,
                    "normal": [
                        -1.0,
                        2.8816091912631236e-07,
                        -1.048079667498314e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.642242968082428,
                        0.08727014064788818,
                        0.5734724998474121
                    ],
                    "area": 1.1469260454177856,
                    "normal": [
                        1.0,
                        -4.4332449533612817e-07,
                        -6.987200151797879e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6177400350570679,
                        0.12084031105041504,
                        -1.3667482137680054
                    ],
                    "area": 1.0377360582351685,
                    "normal": [
                        0.9977755546569824,
                        0.0,
                        -0.06666263192892075
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6177399754524231,
                        0.12084031105041504,
                        -1.3667482137680054
                    ],
                    "area": 1.0377360582351685,
                    "normal": [
                        -0.9977755546569824,
                        1.9026072095584823e-07,
                        -0.06666266173124313
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4713343381881714,
                        -1.002918004989624,
                        -0.4265275001525879
                    ],
                    "area": 1.0357747077941895,
                    "normal": [
                        0.9255995154380798,
                        -0.37850430607795715,
                        1.007054066803903e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4713344871997833,
                        -1.002917766571045,
                        -0.4265275001525879
                    ],
                    "area": 1.0357744693756104,
                    "normal": [
                        -0.9255993962287903,
                        -0.3785046935081482,
                        -5.7545967990790814e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.9802322387695312e-08,
                        -0.03406095504760742,
                        -0.8337142467498779
                    ],
                    "area": 1.0307883024215698,
                    "normal": [
                        -4.51752579788689e-10,
                        -0.0017259403830394149,
                        -0.9999984502792358
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1920928955078125e-07,
                        0.07632538676261902,
                        -2.7554285526275635
                    ],
                    "area": 0.972879946231842,
                    "normal": [
                        -1.1487410134236598e-08,
                        -0.01822645217180252,
                        -0.999833881855011
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6981450319290161,
                        0.1557067334651947,
                        -0.4265275001525879
                    ],
                    "area": 0.9342582821846008,
                    "normal": [
                        -0.9999991655349731,
                        0.001307861995883286,
                        -1.299653433761705e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6981450319290161,
                        0.1557067334651947,
                        -0.4265275001525879
                    ],
                    "area": 0.9342582821846008,
                    "normal": [
                        0.9999991655349731,
                        0.0013074890011921525,
                        8.672662943354226e-08
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        0.0,
                        -0.08622509241104126
                    ],
                    "area": 1.9505133628845215,
                    "normal": [
                        -1.8927771350263356e-07,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        1.0323264598846436,
                        -0.08622509241104126
                    ],
                    "area": 1.9505131244659424,
                    "normal": [
                        -1.8927771350263356e-07,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -1.0323264598846436,
                        -0.08622509241104126
                    ],
                    "area": 1.9505131244659424,
                    "normal": [
                        -1.8927771350263356e-07,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        2.027135133743286,
                        -0.08622516691684723
                    ],
                    "area": 1.2918612957000732,
                    "normal": [
                        -1.9875622569998086e-07,
                        -1.5565964872621407e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -2.015286684036255,
                        -0.08622516691684723
                    ],
                    "area": 1.2598822116851807,
                    "normal": [
                        1.9875622569998086e-07,
                        -1.5961067845182697e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9371567368507385,
                        0.0001360774040222168,
                        1.053049087524414
                    ],
                    "area": 1.092406153678894,
                    "normal": [
                        0.8662744164466858,
                        0.0011919088428840041,
                        0.49956706166267395
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.937156617641449,
                        0.00013595819473266602,
                        1.0530495643615723
                    ],
                    "area": 1.0924060344696045,
                    "normal": [
                        -0.8662741780281067,
                        0.0011920182732865214,
                        0.4995673596858978
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8585855960845947,
                        -1.0514140129089355,
                        0.9461855888366699
                    ],
                    "area": 0.9758087992668152,
                    "normal": [
                        0.8746252655982971,
                        0.0012354353675618768,
                        0.48479798436164856
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8563135266304016,
                        1.0513633489608765,
                        0.9449261426925659
                    ],
                    "area": 0.9758085012435913,
                    "normal": [
                        0.8746253252029419,
                        0.0012354509672150016,
                        0.4847979247570038
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8585854768753052,
                        -1.0514142513275146,
                        0.9461859464645386
                    ],
                    "area": 0.9758084416389465,
                    "normal": [
                        -0.8746250867843628,
                        0.0012354205828160048,
                        0.4847983717918396
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        2.2351741790771484e-08,
                        0.16514268517494202,
                        1.4115145206451416
                    ],
                    "area": 0.9114885330200195,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9659258127212524,
                        0.1991087794303894,
                        7.450580596923828e-08
                    ],
                    "area": 0.8379190564155579,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9659258127212524,
                        0.1991087794303894,
                        5.364418029785156e-07
                    ],
                    "area": 0.8379188179969788,
                    "normal": [
                        -1.0,
                        0.0,
                        4.6058943325988366e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.022113367915153503,
                        0.2013798952102661,
                        -1.0376018285751343
                    ],
                    "area": 0.837918758392334,
                    "normal": [
                        -2.3029471662994183e-07,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8365166187286377,
                        0.19910874962806702,
                        -0.48296234011650085
                    ],
                    "area": 0.8379186987876892,
                    "normal": [
                        -0.8660257458686829,
                        0.0,
                        -0.499999463558197
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5535342693328857,
                        0.1514279842376709,
                        1.3702147006988525
                    ],
                    "area": 0.8078860640525818,
                    "normal": [
                        -0.1562803089618683,
                        3.2278109074468375e-08,
                        0.9877127408981323
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5535342693328857,
                        0.15142777562141418,
                        1.3702147006988525
                    ],
                    "area": 0.8078857660293579,
                    "normal": [
                        0.15628032386302948,
                        -9.222319796720058e-09,
                        0.9877128005027771
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9880399703979492,
                        0.20137996971607208,
                        -0.5818338990211487
                    ],
                    "area": 0.778558611869812,
                    "normal": [
                        1.0,
                        0.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8740193843841553,
                        2.933361291885376,
                        -0.03735140338540077
                    ],
                    "area": 0.7462594509124756,
                    "normal": [
                        0.9995188117027283,
                        0.028183192014694214,
                        -0.012952595017850399
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7382475137710571,
                        2.933361291885376,
                        -0.4693564772605896
                    ],
                    "area": 0.7462592720985413,
                    "normal": [
                        -0.8591326475143433,
                        0.028183186426758766,
                        -0.510976254940033
                    ]
                }
            ]
        },
        "Components_Beehive": {
            "collection": "Components",
            "object_name": "Beehive",
            "dimensions": {
                "width": 0.8638791441917419,
                "height": 1.088704228401184,
                "depth": 1.3085523843765259
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        1.1920928955078125e-07,
                        -1.0
                    ],
                    "area": 3.999999523162842,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.043081283569336e-07,
                        -2.086162567138672e-07,
                        0.15125060081481934
                    ],
                    "area": 3.0859947204589844,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9999999403953552,
                        -2.980232238769531e-07,
                        -0.5196999311447144
                    ],
                    "area": 1.9212003946304321,
                    "normal": [
                        1.0,
                        -2.8312206268310547e-07,
                        9.307392190294195e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0,
                        2.086162567138672e-07,
                        -0.5196999311447144
                    ],
                    "area": 1.9212003946304321,
                    "normal": [
                        -1.0,
                        2.2351744632942427e-07,
                        -2.792221778236126e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.5331974029541016e-07,
                        1.056626796722412,
                        -0.3717767000198364
                    ],
                    "area": 1.3486647605895996,
                    "normal": [
                        2.789828101867897e-07,
                        0.9857954382896423,
                        0.16795025765895844
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -5.21540641784668e-07,
                        -1.0566272735595703,
                        -0.3717767000198364
                    ],
                    "area": 1.3486642837524414,
                    "normal": [
                        -4.6957521249169076e-07,
                        -0.9857954978942871,
                        0.16795030236244202
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        9.834766387939453e-07,
                        0.9999996423721313,
                        0.4070853590965271
                    ],
                    "area": 1.1571130752563477,
                    "normal": [
                        7.152554815093026e-08,
                        1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.4007091522216797e-06,
                        -1.0000001192092896,
                        0.4070853590965271
                    ],
                    "area": 1.1571128368377686,
                    "normal": [
                        -1.4305115314527939e-07,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.1920928955078125e-07,
                        -1.3139971494674683,
                        -1.0
                    ],
                    "area": 0.8029718399047852,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.7881393432617188e-07,
                        1.3139973878860474,
                        -1.0
                    ],
                    "area": 0.8029718399047852,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.4024463891983032,
                        -1.0733386278152466,
                        -0.6685871481895447
                    ],
                    "area": 11.630987167358398,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.4024465084075928,
                        -1.0733387470245361,
                        0.6685871481895447
                    ],
                    "area": 11.630986213684082,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.6677451133728027,
                        -4.751918792724609,
                        0.6685876250267029
                    ],
                    "area": 10.708538055419922,
                    "normal": [
                        6.369880209237955e-14,
                        2.9705000770263723e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.361436367034912,
                        -8.319303512573242,
                        -1.3673913478851318
                    ],
                    "area": 10.685327529907227,
                    "normal": [
                        0.0,
                        -3.3415062716812827e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -3.5372002124786377,
                        -9.273563385009766,
                        0.6685888767242432
                    ],
                    "area": 6.396984100341797,
                    "normal": [
                        -3.2435698926747136e-07,
                        2.9502803045033943e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -3.5372002124786377,
                        -9.273564338684082,
                        -1.3673914670944214
                    ],
                    "area": 6.396982669830322,
                    "normal": [
                        3.3502530527584895e-07,
                        -2.8589710154847126e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6677448749542236,
                        -4.044622421264648,
                        -0.9067443013191223
                    ],
                    "area": 6.197278022766113,
                    "normal": [
                        0.0,
                        0.2563611567020416,
                        -0.9665810465812683
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6677449941635132,
                        -5.649864196777344,
                        -1.256146788597107
                    ],
                    "area": 4.776371002197266,
                    "normal": [
                        0.0,
                        0.15537221729755402,
                        -0.9878559708595276
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.8308942914009094,
                        -10.543664932250977,
                        1.73867666721344
                    ],
                    "area": 4.085979461669922,
                    "normal": [
                        3.3388371819924323e-13,
                        5.817962573928526e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.1923305988311768,
                        -8.435789108276367,
                        0.6685887575149536
                    ],
                    "area": 3.7740731239318848,
                    "normal": [
                        1.429231986094237e-07,
                        3.9510715055257606e-07,
                        1.0
                    ]
                }
            ]
        },
        "Components_HorseThing": {
            "collection": "Components",
            "object_name": "HorseThing",
            "dimensions": {
                "width": 0.9974220991134644,
                "height": 1.2582377195358276,
                "depth": 2.1231043338775635
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        3.427267074584961e-07,
                        1.4307992458343506,
                        -1.4832097291946411
                    ],
                    "area": 2.238964080810547,
                    "normal": [
                        7.616481637008274e-14,
                        2.7474041530695104e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.4901161193847656e-08,
                        -0.0721491277217865,
                        -1.4832099676132202
                    ],
                    "area": 1.638730525970459,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.6193599700927734e-07,
                        1.4193296432495117,
                        1.4585374593734741
                    ],
                    "area": 1.596350908279419,
                    "normal": [
                        1.8669028989393155e-08,
                        0.08921847492456436,
                        0.9960120916366577
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7908321619033813,
                        1.3800690174102783,
                        0.10184279084205627
                    ],
                    "area": 1.541344404220581,
                    "normal": [
                        1.0,
                        -4.906233357360179e-07,
                        -4.238522421928792e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7908313274383545,
                        1.3800692558288574,
                        0.10184279829263687
                    ],
                    "area": 1.541344165802002,
                    "normal": [
                        -1.0,
                        4.5771051304654975e-07,
                        -1.5894443095021416e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.7881393432617188e-07,
                        -1.0700678825378418,
                        -0.46066153049468994
                    ],
                    "area": 1.1419163942337036,
                    "normal": [
                        1.2444742739298794e-14,
                        1.1754838880051466e-07,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        6.258487701416016e-07,
                        2.2654080390930176,
                        0.9329992532730103
                    ],
                    "area": 1.0757315158843994,
                    "normal": [
                        -2.0778180953584524e-07,
                        -0.9714788794517517,
                        -0.23712588846683502
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        5.364418029785156e-07,
                        2.3333983421325684,
                        0.012019358575344086
                    ],
                    "area": 1.0644824504852295,
                    "normal": [
                        2.1173821096454049e-07,
                        1.0,
                        2.5219844701496186e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        6.258487701416016e-07,
                        2.2293779850006104,
                        0.939997136592865
                    ],
                    "area": 1.0517549514770508,
                    "normal": [
                        2.054345884516806e-07,
                        0.9748806953430176,
                        0.2227277010679245
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        5.513429641723633e-07,
                        2.3786773681640625,
                        0.008286148309707642
                    ],
                    "area": 1.0374155044555664,
                    "normal": [
                        -2.117382251753952e-07,
                        -1.0,
                        -2.5877852749545127e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.584444522857666,
                        -0.5588870644569397,
                        -0.3662797212600708
                    ],
                    "area": 2.22693133354187,
                    "normal": [
                        -1.0,
                        3.712950658041336e-08,
                        -2.030955101872678e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.584444522857666,
                        -0.5588871240615845,
                        -0.3662797212600708
                    ],
                    "area": 2.22693133354187,
                    "normal": [
                        1.0,
                        3.712950658041336e-08,
                        -2.030955101872678e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.2922222316265106,
                        -0.8505684733390808,
                        -1.03407621383667
                    ],
                    "area": 2.217381000518799,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.2922222316265106,
                        -0.8505684733390808,
                        -1.03407621383667
                    ],
                    "area": 2.217381000518799,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5844444632530212,
                        -0.850568413734436,
                        -0.8735806941986084
                    ],
                    "area": 1.217839241027832,
                    "normal": [
                        -1.0,
                        3.142049820326065e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5844444632530212,
                        -0.850568413734436,
                        -0.8735806941986084
                    ],
                    "area": 1.217839241027832,
                    "normal": [
                        1.0,
                        3.142049820326065e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6431758999824524,
                        -0.08367633819580078,
                        0.23736774921417236
                    ],
                    "area": 1.1910033226013184,
                    "normal": [
                        -0.9748381972312927,
                        5.160967120332316e-08,
                        -0.22291356325149536
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6431759595870972,
                        -0.08367633819580078,
                        0.23736774921417236
                    ],
                    "area": 1.1910032033920288,
                    "normal": [
                        0.9748381972312927,
                        5.160967120332316e-08,
                        -0.22291356325149536
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.9063227772712708,
                        1.896999478340149,
                        -1.03407621383667
                    ],
                    "area": 1.0951194763183594,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.9063227772712708,
                        1.896999478340149,
                        -1.03407621383667
                    ],
                    "area": 1.0951194763183594,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                }
            ]
        },
        "Components_topWing ": {
            "collection": "Components",
            "object_name": "topWing ",
            "dimensions": {
                "width": 8.406118392944336,
                "height": 1.5597161054611206,
                "depth": 4.477975368499756
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -5.795594215393066,
                        0.28510844707489014,
                        2.6500799655914307
                    ],
                    "area": 3.9617323875427246,
                    "normal": [
                        0.0,
                        1.2935291238136415e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.7799432277679443,
                        0.6393923163414001,
                        0.36512017250061035
                    ],
                    "area": 3.947645425796509,
                    "normal": [
                        -0.4500988721847534,
                        5.2845745557306145e-08,
                        -0.8929787874221802
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.5975477695465088,
                        0.6393923759460449,
                        1.0181432962417603
                    ],
                    "area": 3.601708173751831,
                    "normal": [
                        -1.9949757756876352e-07,
                        3.156469972009045e-14,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.5975474119186401,
                        0.6393922567367554,
                        0.07033213973045349
                    ],
                    "area": 3.601707935333252,
                    "normal": [
                        1.496232044928547e-07,
                        -2.9591909163958346e-14,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -3.9503231048583984,
                        0.6393923759460449,
                        0.7125734090805054
                    ],
                    "area": 3.543531656265259,
                    "normal": [
                        -0.08958248794078827,
                        -1.3877068738565868e-07,
                        -0.995979368686676
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -3.6985342502593994,
                        0.6393924951553345,
                        1.284909963607788
                    ],
                    "area": 3.5435307025909424,
                    "normal": [
                        0.08958249539136887,
                        9.146252466507576e-08,
                        0.9959794282913208
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.4999999403953552,
                        0.6281099915504456,
                        -0.009432166814804077
                    ],
                    "area": 3.2562196254730225,
                    "normal": [
                        0.0,
                        -0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -5.795594215393066,
                        0.6393923759460449,
                        0.5604617595672607
                    ],
                    "area": 3.238898515701294,
                    "normal": [
                        0.0,
                        -1.7799858653688716e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.771152496337891,
                        0.6393924951553345,
                        1.3375751972198486
                    ],
                    "area": 2.9359054565429688,
                    "normal": [
                        0.0,
                        1.1866573146335213e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.6540489196777344,
                        0.6393924355506897,
                        1.1251940727233887
                    ],
                    "area": 2.840590000152588,
                    "normal": [
                        0.22715255618095398,
                        2.0983193849133386e-08,
                        0.9738592505455017
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        2.295292377471924,
                        -1.1920928955078125e-07,
                        0.7006994485855103
                    ],
                    "area": 8.147008895874023,
                    "normal": [
                        -0.21605657041072845,
                        -1.46322767236029e-08,
                        -0.9763808250427246
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.4013547897338867,
                        -0.3180129826068878,
                        1.1800118684768677
                    ],
                    "area": 3.355884313583374,
                    "normal": [
                        0.21605657041072845,
                        0.0,
                        0.9763808250427246
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.2381036281585693,
                        -9.834766387939453e-07,
                        0.8534296751022339
                    ],
                    "area": 1.8464398384094238,
                    "normal": [
                        0.17312538623809814,
                        -1.0007063337980071e-06,
                        0.9848998188972473
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.1940815448760986,
                        -7.152557373046875e-07,
                        0.45052969455718994
                    ],
                    "area": 1.2531428337097168,
                    "normal": [
                        -0.31996819376945496,
                        4.3996817566949176e-07,
                        -0.9474283456802368
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.333314895629883,
                        -0.8991459608078003,
                        0.8725314140319824
                    ],
                    "area": 0.9333651065826416,
                    "normal": [
                        -2.7623246978691895e-07,
                        -1.0,
                        -6.049409080333135e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.3334178924560547,
                        0.8991453647613525,
                        0.8729905486106873
                    ],
                    "area": 0.9291360378265381,
                    "normal": [
                        3.897909834904567e-07,
                        1.0,
                        1.1181227819179185e-06
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.3889169692993164,
                        0.394762247800827,
                        1.1238006353378296
                    ],
                    "area": 0.9275494813919067,
                    "normal": [
                        0.21605657041072845,
                        -6.426034104833889e-08,
                        0.9763808846473694
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.4013562202453613,
                        0.7127748727798462,
                        1.180011510848999
                    ],
                    "area": 0.8157589435577393,
                    "normal": [
                        0.21605655550956726,
                        0.0,
                        0.9763808250427246
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.1759462356567383,
                        0.7835244536399841,
                        0.5467889308929443
                    ],
                    "area": 0.7747799754142761,
                    "normal": [
                        1.5611142600846506e-07,
                        1.0,
                        3.5711335044652515e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.175945997238159,
                        -0.7835261225700378,
                        0.5467873811721802
                    ],
                    "area": 0.7747793197631836,
                    "normal": [
                        -2.341671887506891e-07,
                        -1.0,
                        -5.356700967240613e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.5293539762496948,
                        0.5290632247924805,
                        0.44512516260147095
                    ],
                    "area": 0.2698439955711365,
                    "normal": [
                        0.5237054824829102,
                        0.5234255790710449,
                        0.6721295118331909
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5290631651878357,
                        -0.5293539762496948,
                        0.44512516260147095
                    ],
                    "area": 0.2698439657688141,
                    "normal": [
                        0.5234255790710449,
                        -0.5237056016921997,
                        0.6721296310424805
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5293540954589844,
                        -0.5290631055831909,
                        0.44512516260147095
                    ],
                    "area": 0.2698439657688141,
                    "normal": [
                        -0.5237056612968445,
                        -0.5234255194664001,
                        0.6721295714378357
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5290632247924805,
                        0.5293540954589844,
                        0.44512516260147095
                    ],
                    "area": 0.26984381675720215,
                    "normal": [
                        -0.5234255790710449,
                        0.5237056612968445,
                        0.6721294522285461
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5124977827072144,
                        -0.5122302770614624,
                        -0.21627792716026306
                    ],
                    "area": 0.24101397395133972,
                    "normal": [
                        -0.7072725892066956,
                        -0.7069409489631653,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.51249760389328,
                        0.5122304558753967,
                        -0.21627792716026306
                    ],
                    "area": 0.24101397395133972,
                    "normal": [
                        0.7072724103927612,
                        0.7069410681724548,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5122303366661072,
                        -0.5124976634979248,
                        -0.21627792716026306
                    ],
                    "area": 0.24101397395133972,
                    "normal": [
                        0.7069410085678101,
                        -0.707272469997406,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.512230396270752,
                        0.5124977231025696,
                        -0.21627792716026306
                    ],
                    "area": 0.24101383984088898,
                    "normal": [
                        -0.7069410085678101,
                        0.7072725296020508,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6359384655952454,
                        -0.6356076598167419,
                        0.1536547690629959
                    ],
                    "area": 0.22889795899391174,
                    "normal": [
                        -0.7045138478279114,
                        -0.7041806578636169,
                        0.08826123178005219
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.635938286781311,
                        0.6356078386306763,
                        0.15365475416183472
                    ],
                    "area": 0.22889794409275055,
                    "normal": [
                        0.704513669013977,
                        0.7041807770729065,
                        0.08826117217540741
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        1.00571870803833,
                        -1.7193334102630615
                    ],
                    "area": 1.5727672576904297,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -1.8461780548095703,
                        -1.7193334102630615
                    ],
                    "area": 1.5727670192718506,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -1.1332038640975952,
                        -1.7193334102630615
                    ],
                    "area": 1.5727670192718506,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        0.2927446663379669,
                        -1.7193334102630615
                    ],
                    "area": 1.5727670192718506,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -2.559152126312256,
                        -1.7193334102630615
                    ],
                    "area": 1.5727667808532715,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -0.42022955417633057,
                        -1.7193334102630615
                    ],
                    "area": 1.5727667808532715,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        2.431666851043701,
                        -1.7193334102630615
                    ],
                    "area": 1.5727667808532715,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        1.7186927795410156,
                        -1.7193334102630615
                    ],
                    "area": 1.5727665424346924,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        8.940696716308594e-08,
                        -1.8461780548095703,
                        -1.1610645055770874
                    ],
                    "area": 1.3580381870269775,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        8.940696716308594e-08,
                        0.2927446961402893,
                        -1.1610645055770874
                    ],
                    "area": 1.3580375909805298,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                }
            ]
        },
        "Components_spire": {
            "collection": "Components",
            "object_name": "spire",
            "dimensions": {
                "width": 0.9253109097480774,
                "height": 1.6492252349853516,
                "depth": 1.2153517007827759
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.31149911880493164,
                        0.7669587135314941,
                        -1.726883053779602
                    ],
                    "area": 1.1196094751358032,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6229982972145081,
                        0.8290761709213257,
                        -1.3813974857330322
                    ],
                    "area": 0.6135233640670776,
                    "normal": [
                        -1.0,
                        2.0779866360953747e-07,
                        -1.4301635076208186e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.7068212032318115,
                        -0.06516315042972565,
                        1.043614387512207
                    ],
                    "area": 0.5159213542938232,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6229983568191528,
                        0.871575117111206,
                        -0.9925038814544678
                    ],
                    "area": 0.5063568949699402,
                    "normal": [
                        -1.0,
                        2.517775214982976e-07,
                        -5.123071034063287e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6229983568191528,
                        0.7842056751251221,
                        -0.614820122718811
                    ],
                    "area": 0.45534858107566833,
                    "normal": [
                        -1.0,
                        2.15869590647344e-07,
                        -1.5051659918441374e-09
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6229983568191528,
                        0.6127927303314209,
                        -0.24834632873535156
                    ],
                    "area": 0.4547957181930542,
                    "normal": [
                        -1.0,
                        2.161320651339338e-07,
                        4.094989947134309e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.45926445722579956,
                        -0.3476038873195648,
                        1.2884668111801147
                    ],
                    "area": 0.44752591848373413,
                    "normal": [
                        -0.9732969999313354,
                        2.289152121193183e-07,
                        0.2295495867729187
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6229984164237976,
                        0.13311919569969177,
                        0.45097142457962036
                    ],
                    "area": 0.4335116446018219,
                    "normal": [
                        -1.0,
                        2.6017676191258943e-07,
                        1.1471077243641048e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6229984164237976,
                        0.38768449425697327,
                        0.10691751539707184
                    ],
                    "area": 0.43299251794815063,
                    "normal": [
                        -1.0,
                        2.604886901735881e-07,
                        9.727656191671485e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.35341042280197144,
                        0.6143636703491211,
                        1.043614387512207
                    ],
                    "area": 0.3990235924720764,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -5.960464477539063e-08,
                        -0.8528827428817749,
                        -1.0
                    ],
                    "area": 1.244218111038208,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4977567791938782,
                        0.7094357013702393,
                        0.19226622581481934
                    ],
                    "area": 0.9345670938491821,
                    "normal": [
                        0.9853484630584717,
                        0.17055076360702515,
                        0.0009329418535344303
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.49775686860084534,
                        0.7094359397888184,
                        0.19226619601249695
                    ],
                    "area": 0.9345669150352478,
                    "normal": [
                        -0.9853484034538269,
                        0.17055106163024902,
                        0.0009327188017778099
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -6.705522537231445e-08,
                        -1.845487356185913,
                        -0.8642971515655518
                    ],
                    "area": 0.9259911179542542,
                    "normal": [
                        0.0,
                        -0.29057005047798157,
                        -0.9568536281585693
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.0978193283081055e-08,
                        0.7149306535720825,
                        1.3559377193450928
                    ],
                    "area": 0.9258797764778137,
                    "normal": [
                        8.04702793288925e-08,
                        0.10494663566350937,
                        0.9944778680801392
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4228278696537018,
                        0.7447865009307861,
                        1.062182903289795
                    ],
                    "area": 0.8453360199928284,
                    "normal": [
                        -0.9452143311500549,
                        0.16213157773017883,
                        0.2833426892757416
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4228278398513794,
                        0.7447859048843384,
                        1.062182903289795
                    ],
                    "area": 0.8453359603881836,
                    "normal": [
                        0.9452145099639893,
                        0.1621311902999878,
                        0.2833424210548401
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5677408576011658,
                        0.6465013027191162,
                        -0.7088965177536011
                    ],
                    "area": 0.8114543557167053,
                    "normal": [
                        -0.8816666603088379,
                        0.15022368729114532,
                        -0.44732189178466797
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5677409768104553,
                        0.6465010046958923,
                        -0.7088965177536011
                    ],
                    "area": 0.8114542365074158,
                    "normal": [
                        0.8816666603088379,
                        0.150223508477211,
                        -0.4473218321800232
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.21540641784668e-08,
                        0.5482158660888672,
                        -1.0
                    ],
                    "area": 0.7893452644348145,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2742859125137329,
                        -0.7544269561767578,
                        0.7705941200256348
                    ],
                    "area": 0.36006101965904236,
                    "normal": [
                        -0.9319544434547424,
                        -0.05604639649391174,
                        0.35821735858917236
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2742859125137329,
                        -0.7544270753860474,
                        -0.5821292996406555
                    ],
                    "area": 0.3600609600543976,
                    "normal": [
                        -0.9319544434547424,
                        -0.056046437472105026,
                        -0.35821735858917236
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2742857336997986,
                        -0.7544273138046265,
                        0.7705941200256348
                    ],
                    "area": 0.3600608706474304,
                    "normal": [
                        0.9319546222686768,
                        -0.05604607239365578,
                        0.3582170605659485
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2742857038974762,
                        -0.7544273734092712,
                        -0.5821293592453003
                    ],
                    "area": 0.36006081104278564,
                    "normal": [
                        0.9319546222686768,
                        -0.05604608356952667,
                        -0.35821712017059326
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.25744277238845825,
                        -1.2298444509506226,
                        0.7017119526863098
                    ],
                    "area": 0.2742619216442108,
                    "normal": [
                        -0.9671826958656311,
                        4.6182083224266535e-07,
                        0.25408172607421875
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.25744250416755676,
                        -1.2298448085784912,
                        -0.5132472515106201
                    ],
                    "area": 0.2742619216442108,
                    "normal": [
                        0.9671828150749207,
                        -4.6182083224266535e-07,
                        -0.2540815472602844
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.25744277238845825,
                        -1.2298444509506226,
                        -0.5132472515106201
                    ],
                    "area": 0.2742619216442108,
                    "normal": [
                        -0.9671828150749207,
                        4.6182083224266535e-07,
                        -0.25408172607421875
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.25744253396987915,
                        -1.2298448085784912,
                        0.7017119526863098
                    ],
                    "area": 0.2742618918418884,
                    "normal": [
                        0.9671828150749207,
                        -4.618208890860842e-07,
                        0.2540815770626068
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -3.3155083656311035e-07,
                        -1.8001998662948608,
                        0.7017120122909546
                    ],
                    "area": 0.25614386796951294,
                    "normal": [
                        -6.690121381325298e-07,
                        -0.9146247506141663,
                        0.40430399775505066
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -3.3155083656311035e-07,
                        -1.8001997470855713,
                        -0.5132471919059753
                    ],
                    "area": 0.25614383816719055,
                    "normal": [
                        -6.690121381325298e-07,
                        -0.9146247506141663,
                        -0.40430399775505066
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        3.948807716369629e-07,
                        1.3647661209106445,
                        1.426011085510254
                    ],
                    "area": 1.681301474571228,
                    "normal": [
                        -8.452293769403707e-14,
                        -1.7842148736235686e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -4.470348358154297e-08,
                        0.14804436266422272,
                        -0.5237577557563782
                    ],
                    "area": 1.4510825872421265,
                    "normal": [
                        -2.0438174885839544e-07,
                        -1.0,
                        -1.422524604777209e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.9802322387695312e-08,
                        0.14804422855377197,
                        0.523757815361023
                    ],
                    "area": 1.451082468032837,
                    "normal": [
                        -5.109544076731254e-07,
                        -1.0,
                        -1.0668918548617512e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -6.92903995513916e-07,
                        -1.4058201313018799,
                        1.367797613143921
                    ],
                    "area": 1.2381598949432373,
                    "normal": [
                        0.0,
                        -0.09040304273366928,
                        0.9959052205085754
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7378804683685303,
                        1.4923274517059326,
                        0.3923216760158539
                    ],
                    "area": 1.1143053770065308,
                    "normal": [
                        -0.9935541749000549,
                        0.11323990672826767,
                        0.005182632245123386
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7378692030906677,
                        1.492324709892273,
                        0.39231783151626587
                    ],
                    "area": 1.1142922639846802,
                    "normal": [
                        0.9935557246208191,
                        0.11322414875030518,
                        0.005219561513513327
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7438254356384277,
                        1.3071391582489014,
                        -0.313288152217865
                    ],
                    "area": 1.0909630060195923,
                    "normal": [
                        -0.9872116446495056,
                        0.1481553167104721,
                        -0.05884983763098717
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.74381422996521,
                        1.307136058807373,
                        -0.31328439712524414
                    ],
                    "area": 1.0909576416015625,
                    "normal": [
                        0.9872128367424011,
                        0.14813847839832306,
                        -0.05887143313884735
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.9802322387695312e-08,
                        -0.20097924768924713,
                        1.4260109663009644
                    ],
                    "area": 1.0835936069488525,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -7.227063179016113e-07,
                        -1.3986870050430298,
                        1.204169511795044
                    ],
                    "area": 1.0599998235702515,
                    "normal": [
                        0.0,
                        0.09137703478336334,
                        -0.9958162903785706
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27733883261680603,
                        -0.6607015132904053,
                        -2.9802322387695312e-08
                    ],
                    "area": 0.3157225549221039,
                    "normal": [
                        -1.0,
                        1.9034943932183523e-07,
                        -1.1823146905953763e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.27733850479125977,
                        -0.6607016324996948,
                        -2.9802322387695312e-08
                    ],
                    "area": 0.3157225549221039,
                    "normal": [
                        1.0,
                        -1.9034946774354466e-07,
                        1.7734713253503287e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        8.940696716308594e-08,
                        0.03619807958602905,
                        0.5435449481010437
                    ],
                    "area": 0.23774832487106323,
                    "normal": [
                        3.9172626031813707e-08,
                        0.16129083931446075,
                        0.9869069457054138
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.9802322387695312e-08,
                        0.036198198795318604,
                        -0.5435449481010437
                    ],
                    "area": 0.23774823546409607,
                    "normal": [
                        4.70071661595739e-08,
                        0.16129085421562195,
                        -0.9869069457054138
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.49165529012680054,
                        -0.014605067670345306,
                        0.0
                    ],
                    "area": 0.16300956904888153,
                    "normal": [
                        -0.9759592413902283,
                        0.2179528921842575,
                        2.2853200221106817e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4916554391384125,
                        -0.014604873955249786,
                        0.0
                    ],
                    "area": 0.16300952434539795,
                    "normal": [
                        0.9759594798088074,
                        0.21795204281806946,
                        2.5138527348644857e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.14560259878635406,
                        -0.851542592048645,
                        -5.960464477539063e-08
                    ],
                    "area": 0.1553933471441269,
                    "normal": [
                        -1.0,
                        5.9266259455625914e-08,
                        -1.4466110087596462e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.1456022560596466,
                        -0.8515426516532898,
                        -5.960464477539063e-08
                    ],
                    "area": 0.1553933471441269,
                    "normal": [
                        1.0,
                        -5.926626656105327e-08,
                        1.4466110087596462e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5763068795204163,
                        0.5218378305435181,
                        2.9802322387695312e-08
                    ],
                    "area": 0.1410181224346161,
                    "normal": [
                        1.0,
                        -2.7261319246463245e-07,
                        2.0793174826394534e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5763071775436401,
                        0.521837592124939,
                        2.9802322387695312e-08
                    ],
                    "area": 0.1410180926322937,
                    "normal": [
                        -1.0,
                        1.8174199567511096e-07,
                        6.931061875548039e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -4.023313522338867e-07,
                        -1.229072093963623,
                        -1.043081283569336e-07
                    ],
                    "area": 1.0449016094207764,
                    "normal": [
                        -4.915362978863413e-07,
                        -1.0,
                        -1.660124979707689e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4322431683540344,
                        -1.44138503074646,
                        -5.960464477539063e-08
                    ],
                    "area": 0.9757484197616577,
                    "normal": [
                        -0.9999999403953552,
                        4.614180681983271e-07,
                        -1.183639000146286e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4322422742843628,
                        -1.4413855075836182,
                        -1.341104507446289e-07
                    ],
                    "area": 0.9757483005523682,
                    "normal": [
                        0.9999999403953552,
                        -4.6141812504174595e-07,
                        3.1563666880174424e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.40241849422454834,
                        -1.4966998100280762,
                        -8.940696716308594e-08
                    ],
                    "area": 0.791230320930481,
                    "normal": [
                        1.0,
                        -3.8975062466306554e-07,
                        1.209650832834086e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.40241745114326477,
                        -1.4967002868652344,
                        -1.4901161193847656e-07
                    ],
                    "area": 0.7912302613258362,
                    "normal": [
                        -1.0,
                        3.8975062466306554e-07,
                        -3.225732143619098e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.043081283569336e-07,
                        1.3044559955596924,
                        3.725290298461914e-07
                    ],
                    "area": 0.6207003593444824,
                    "normal": [
                        -3.0606375389652385e-07,
                        -0.9999999403953552,
                        -2.805158771934657e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3756469190120697,
                        -1.2228124141693115,
                        -1.1920928955078125e-07
                    ],
                    "area": 0.5219008922576904,
                    "normal": [
                        -1.0,
                        5.152559197085793e-07,
                        -1.1890278983628377e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.24611356854438782,
                        -1.2228126525878906,
                        -1.1920928955078125e-07
                    ],
                    "area": 0.5219008922576904,
                    "normal": [
                        1.0,
                        -5.367248263610236e-07,
                        1.436741143834297e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.22020694613456726,
                        -1.2228126525878906,
                        -1.1920928955078125e-07
                    ],
                    "area": 0.5219008922576904,
                    "normal": [
                        -1.0,
                        5.581938467003056e-07,
                        -1.48628373608517e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09067362546920776,
                        -1.2228126525878906,
                        -1.1920928955078125e-07
                    ],
                    "area": 0.5219008922576904,
                    "normal": [
                        1.0,
                        -5.0452132427381e-07,
                        1.8083119357470423e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3009008765220642,
                        0.32885462045669556,
                        0.30972975492477417
                    ],
                    "area": 0.09312807768583298,
                    "normal": [
                        0.7071050405502319,
                        -1.5000676256704537e-08,
                        -0.7071085572242737
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.06137992814183235,
                        0.3288545310497284,
                        -0.42744123935699463
                    ],
                    "area": 0.09312806278467178,
                    "normal": [
                        -0.1564328968524933,
                        -2.5001125614210196e-09,
                        0.9876885414123535
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.06138129159808159,
                        0.3288545310497284,
                        -0.4274410605430603
                    ],
                    "area": 0.09312805533409119,
                    "normal": [
                        0.1564360409975052,
                        7.875355123587724e-08,
                        0.9876880645751953
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3875536322593689,
                        0.3288545608520508,
                        -0.19046200811862946
                    ],
                    "area": 0.09312804043292999,
                    "normal": [
                        0.8910073637962341,
                        6.000271923767286e-08,
                        0.4539887309074402
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.20158475637435913,
                        0.32885462045669556,
                        0.38188669085502625
                    ],
                    "area": 0.0931280329823494,
                    "normal": [
                        0.4539879560470581,
                        -1.5000678033061376e-08,
                        -0.8910077810287476
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.20158612728118896,
                        0.32885462045669556,
                        0.38188597559928894
                    ],
                    "area": 0.0931280255317688,
                    "normal": [
                        -0.45399144291877747,
                        -6.750306624780933e-08,
                        -0.8910061120986938
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4254884719848633,
                        0.3288545608520508,
                        -0.07371050119400024
                    ],
                    "area": 0.0931280255317688,
                    "normal": [
                        -0.9876883029937744,
                        2.500114115733254e-09,
                        0.15643559396266937
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4254887104034424,
                        0.32885459065437317,
                        -0.07370908558368683
                    ],
                    "area": 0.0931280255317688,
                    "normal": [
                        0.9876887202262878,
                        2.0000909373152354e-08,
                        0.15643246471881866
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.30090194940567017,
                        0.32885462045669556,
                        0.3097286820411682
                    ],
                    "area": 0.09312799572944641,
                    "normal": [
                        -0.7071072459220886,
                        -5.500250921386396e-08,
                        -0.7071062922477722
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.38755303621292114,
                        0.32885459065437317,
                        -0.19046327471733093
                    ],
                    "area": 0.09312799572944641,
                    "normal": [
                        -0.8910058736801147,
                        2.750125460693198e-08,
                        0.45399177074432373
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        1.4454126358032227e-06,
                        0.011520981788635254,
                        1.4901161193847656e-07
                    ],
                    "area": 2.2443552017211914,
                    "normal": [
                        -3.6126255054114154e-07,
                        1.0,
                        -1.402153628760061e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6599578857421875,
                        -0.3748900294303894,
                        1.4901161193847656e-07
                    ],
                    "area": 1.3140857219696045,
                    "normal": [
                        -1.0,
                        0.0,
                        -1.0516154702600033e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6599607467651367,
                        -0.3748895525932312,
                        1.4901161193847656e-07
                    ],
                    "area": 1.314085602760315,
                    "normal": [
                        1.0,
                        0.0,
                        -2.4537692411286116e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6328871846199036,
                        1.9915573596954346,
                        -1.4901161193847656e-08
                    ],
                    "area": 1.234541654586792,
                    "normal": [
                        0.9999114871025085,
                        -0.013310020789504051,
                        1.4144762872092542e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6328877210617065,
                        1.9915578365325928,
                        -1.4901161193847656e-08
                    ],
                    "area": 1.2345415353775024,
                    "normal": [
                        -0.9999114274978638,
                        -0.01331065222620964,
                        -6.78948666177348e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9275374412536621,
                        0.5313223600387573,
                        -1.4901161193847656e-08
                    ],
                    "area": 1.1140217781066895,
                    "normal": [
                        -1.0,
                        -2.877345934848563e-07,
                        3.7406599062705936e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9275357127189636,
                        0.5313220620155334,
                        7.450580596923828e-08
                    ],
                    "area": 1.1140210628509521,
                    "normal": [
                        1.0,
                        3.836463520201505e-07,
                        1.4962634509174677e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        8.717179298400879e-07,
                        0.5891363024711609,
                        1.4433095455169678
                    ],
                    "area": 0.8228381276130676,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        8.419156074523926e-07,
                        0.5891361236572266,
                        -1.4433095455169678
                    ],
                    "area": 0.8228374123573303,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5578001141548157,
                        0.5891364216804504,
                        1.162774682044983
                    ],
                    "area": 0.798257052898407,
                    "normal": [
                        -0.8119755387306213,
                        -2.5200614572895574e-07,
                        -0.5836913585662842
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        5.21540641784668e-08,
                        -0.5207214951515198,
                        -0.3623306453227997
                    ],
                    "area": 0.04971141368150711,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        -0.743261456489563,
                        -0.3623306453227997
                    ],
                    "area": 0.04929836094379425,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11122691631317139,
                        -0.19811321794986725,
                        -0.04235510900616646
                    ],
                    "area": 0.04887370020151138,
                    "normal": [
                        -0.9999999403953552,
                        -1.5633047212304518e-07,
                        2.307315298821777e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.11122703552246094,
                        -0.19811321794986725,
                        -0.04235513508319855
                    ],
                    "area": 0.04887370020151138,
                    "normal": [
                        1.0,
                        2.0845817516601528e-08,
                        1.2825788431314322e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09674854576587677,
                        0.564415454864502,
                        0.14853376150131226
                    ],
                    "area": 0.042376499623060226,
                    "normal": [
                        -0.9999999403953552,
                        -8.247062055488641e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.09674859046936035,
                        0.564415454864502,
                        0.14853374660015106
                    ],
                    "area": 0.04039542004466057,
                    "normal": [
                        1.0,
                        6.185297252159216e-08,
                        -6.665132445959898e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.862645149230957e-08,
                        0.9346531629562378,
                        0.14853377640247345
                    ],
                    "area": 0.03371315076947212,
                    "normal": [
                        0.0,
                        0.9999999403953552,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        7.636845111846924e-08,
                        -0.3518998324871063,
                        0.0525488555431366
                    ],
                    "area": 0.03248976543545723,
                    "normal": [
                        0.0,
                        -0.5240259170532227,
                        0.8517022132873535
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        0.25062352418899536,
                        0.30393990874290466
                    ],
                    "area": 0.0320938415825367,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.08285243064165115,
                        -0.27790284156799316,
                        0.019420119002461433
                    ],
                    "area": 0.030511053279042244,
                    "normal": [
                        0.0,
                        -0.5240258574485779,
                        0.8517023921012878
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3395388126373291,
                        -0.6427571773529053,
                        0.5654304027557373
                    ],
                    "area": 0.3459504246711731,
                    "normal": [
                        -0.7120456099510193,
                        -0.00023048961884342134,
                        0.7021331191062927
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.33953890204429626,
                        -0.6427570581436157,
                        0.5654304027557373
                    ],
                    "area": 0.3459503948688507,
                    "normal": [
                        0.7120454907417297,
                        -0.00023026883718557656,
                        0.7021332383155823
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3395388126373291,
                        -0.64275723695755,
                        -0.5654304623603821
                    ],
                    "area": 0.3459503650665283,
                    "normal": [
                        -0.7120456695556641,
                        -0.00023057580983731896,
                        -0.7021331787109375
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.33953922986984253,
                        -0.6427571177482605,
                        -0.565430223941803
                    ],
                    "area": 0.34595033526420593,
                    "normal": [
                        0.712046205997467,
                        -0.00023036582570057362,
                        -0.7021325826644897
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4061172902584076,
                        -0.6815974712371826,
                        -0.1863994300365448
                    ],
                    "area": 0.34037041664123535,
                    "normal": [
                        -0.9999944567680359,
                        0.00019743776647374034,
                        -0.0033062261063605547
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4061172604560852,
                        -0.6815974712371826,
                        0.18639935553073883
                    ],
                    "area": 0.34037041664123535,
                    "normal": [
                        -0.9999944567680359,
                        0.00019743827579077333,
                        0.0033062261063605547
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4061174690723419,
                        -0.6815973520278931,
                        -0.1863991767168045
                    ],
                    "area": 0.3403702676296234,
                    "normal": [
                        0.9999944567680359,
                        0.0001977643696591258,
                        -0.003306186990812421
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.40611743927001953,
                        -0.6815972924232483,
                        0.18639947474002838
                    ],
                    "area": 0.340370237827301,
                    "normal": [
                        0.9999944567680359,
                        0.00019773183157667518,
                        0.0033065108582377434
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.12384514510631561,
                        -0.64275723695755,
                        -0.6917603015899658
                    ],
                    "area": 0.3390730619430542,
                    "normal": [
                        0.2588194012641907,
                        -4.944010001395327e-08,
                        -0.9659256935119629
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.12384481728076935,
                        -0.64275723695755,
                        -0.6917603611946106
                    ],
                    "area": 0.33907270431518555,
                    "normal": [
                        -0.25881898403167725,
                        -8.240025550776409e-08,
                        -0.9659258127212524
                    ]
                }
            ]
        },
        "Engines_eng.strut.ladder": {
            "collection": "Engines",
            "object_name": "eng.strut.ladder",
            "dimensions": {
                "width": 1.0665150880813599,
                "height": 3.198045492172241,
                "depth": 5.297804355621338
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1036441326141357,
                        6.223833084106445,
                        6.05223274230957
                    ],
                    "area": 8.077852249145508,
                    "normal": [
                        -1.0,
                        -1.098052280212869e-06,
                        -1.6153418869180314e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1036441326141357,
                        6.223833084106445,
                        6.05223274230957
                    ],
                    "area": 8.077850341796875,
                    "normal": [
                        1.0,
                        -1.098052280212869e-06,
                        -1.6153418869180314e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9339841604232788,
                        6.2238335609436035,
                        6.05223274230957
                    ],
                    "area": 8.077836036682129,
                    "normal": [
                        1.0,
                        1.1501606422825716e-06,
                        7.787627964717103e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9339841604232788,
                        6.2238335609436035,
                        6.0522332191467285
                    ],
                    "area": 8.077835083007812,
                    "normal": [
                        -1.0,
                        1.1501606422825716e-06,
                        7.787627964717103e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.9802322387695312e-08,
                        -0.7850062251091003,
                        -0.8183273673057556
                    ],
                    "area": 7.437849044799805,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8317165970802307,
                        -0.24445822834968567,
                        1.5234143733978271
                    ],
                    "area": 5.92108154296875,
                    "normal": [
                        -1.0,
                        8.17726473201219e-08,
                        4.5399083603570034e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8317165970802307,
                        -0.24445825815200806,
                        1.5234143733978271
                    ],
                    "area": 5.92108154296875,
                    "normal": [
                        1.0,
                        8.17726473201219e-08,
                        4.5399083603570034e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.2058789730072021,
                        -0.2444591522216797,
                        1.523413896560669
                    ],
                    "area": 5.921081066131592,
                    "normal": [
                        1.0,
                        -8.177264021469455e-08,
                        -4.539910136713843e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.2058789730072021,
                        -0.24445916712284088,
                        1.523413896560669
                    ],
                    "area": 5.921081066131592,
                    "normal": [
                        -1.0,
                        -8.177264021469455e-08,
                        -4.539910136713843e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6449038982391357,
                        -0.6052740216255188,
                        0.8595706224441528
                    ],
                    "area": 5.428778171539307,
                    "normal": [
                        0.9635894298553467,
                        -1.3998715076013468e-07,
                        0.26738622784614563
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.14228706061840057,
                        -0.506961464881897,
                        -0.5310203433036804
                    ],
                    "area": 0.27540549635887146,
                    "normal": [
                        0.2542559802532196,
                        0.18696938455104828,
                        -0.9488921761512756
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5310205221176147,
                        -0.5069612860679626,
                        0.14228615164756775
                    ],
                    "area": 0.2754051983356476,
                    "normal": [
                        -0.9488925933837891,
                        0.18696922063827515,
                        0.2542543411254883
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.14228610694408417,
                        -0.506961464881897,
                        -0.5310205817222595
                    ],
                    "area": 0.2754051089286804,
                    "normal": [
                        -0.25425466895103455,
                        0.18696928024291992,
                        -0.9488925337791443
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3887341320514679,
                        -0.5069612264633179,
                        0.38873374462127686
                    ],
                    "area": 0.27540504932403564,
                    "normal": [
                        -0.6946377754211426,
                        0.18696923553943634,
                        0.69463711977005
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3887336254119873,
                        -0.5069614052772522,
                        -0.38873419165611267
                    ],
                    "area": 0.27540501952171326,
                    "normal": [
                        -0.6946370601654053,
                        0.18696917593479156,
                        -0.6946378946304321
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.14228616654872894,
                        -0.5069611668586731,
                        0.5310206413269043
                    ],
                    "area": 0.27540498971939087,
                    "normal": [
                        0.2542542815208435,
                        0.18696939945220947,
                        0.9488926529884338
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.38873371481895447,
                        -0.5069611668586731,
                        0.3887343406677246
                    ],
                    "area": 0.27540498971939087,
                    "normal": [
                        0.694636881351471,
                        0.18696947395801544,
                        0.6946380734443665
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.53102046251297,
                        -0.5069611668586731,
                        0.14228706061840057
                    ],
                    "area": 0.27540498971939087,
                    "normal": [
                        0.9488921165466309,
                        0.18696950376033783,
                        0.25425606966018677
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5310207605361938,
                        -0.5069612264633179,
                        -0.14228591322898865
                    ],
                    "area": 0.27540498971939087,
                    "normal": [
                        0.9488926529884338,
                        0.18696948885917664,
                        -0.25425422191619873
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.38873451948165894,
                        -0.5069613456726074,
                        -0.38873350620269775
                    ],
                    "area": 0.27540498971939087,
                    "normal": [
                        0.6946383118629456,
                        0.18696944415569305,
                        -0.6946365833282471
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.4156103134155273e-07,
                        -0.02110987901687622,
                        0.3281022012233734
                    ],
                    "area": 0.8656619787216187,
                    "normal": [
                        2.6952170628646854e-07,
                        -1.9033889131492288e-08,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.328102171421051,
                        -0.021109938621520996,
                        -4.470348358154297e-08
                    ],
                    "area": 0.8656618595123291,
                    "normal": [
                        1.0,
                        1.1420348755564191e-07,
                        5.390437607388776e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        9.685754776000977e-08,
                        -0.02110987901687622,
                        -0.3281022012233734
                    ],
                    "area": 0.8656618595123291,
                    "normal": [
                        -1.0780865977721987e-07,
                        -7.613569152908894e-08,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2320033609867096,
                        -0.021109849214553833,
                        -0.23200321197509766
                    ],
                    "area": 0.8656618595123291,
                    "normal": [
                        -0.70710688829422,
                        -1.893496488492019e-07,
                        0.7071066498756409
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3281022012233734,
                        -0.021109819412231445,
                        1.1920928955078125e-07
                    ],
                    "area": 0.8656618595123291,
                    "normal": [
                        -1.0,
                        -1.9033916487387614e-07,
                        -2.1561733376529446e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.23200328648090363,
                        -0.02110990881919861,
                        0.23200322687625885
                    ],
                    "area": 0.8656617999076843,
                    "normal": [
                        0.70710688829422,
                        9.467483863545567e-08,
                        -0.7071067690849304
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.23200322687625885,
                        -0.02110990881919861,
                        -0.232003316283226
                    ],
                    "area": 0.8656617999076843,
                    "normal": [
                        0.7071067094802856,
                        4.303401723859679e-08,
                        0.70710688829422
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.23200319707393646,
                        -0.021109849214553833,
                        0.23200339078903198
                    ],
                    "area": 0.8656617999076843,
                    "normal": [
                        -0.7071066498756409,
                        -1.2049522979395988e-07,
                        -0.7071069478988647
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.9802322387695312e-08,
                        -0.02110987901687622,
                        0.32810214161872864
                    ],
                    "area": 0.8656617403030396,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.23543119430541992,
                        -0.04127877950668335,
                        0.5204281806945801
                    ],
                    "area": 0.5999401211738586,
                    "normal": [
                        0.9780175089836121,
                        6.519909589997042e-08,
                        0.2085229456424713
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -8.940696716308594e-08,
                        -2.487974166870117,
                        1.9371509552001953e-07
                    ],
                    "area": 0.6644389629364014,
                    "normal": [
                        0.0,
                        -0.9999999403953552,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3972427248954773,
                        -0.971631646156311,
                        -0.7564758062362671
                    ],
                    "area": 0.662959098815918,
                    "normal": [
                        -1.0,
                        1.6568687044582475e-07,
                        -1.3885069449770526e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3972424864768982,
                        -0.9716315865516663,
                        -0.7564758062362671
                    ],
                    "area": 0.6629589796066284,
                    "normal": [
                        1.0,
                        -1.656869130783889e-07,
                        1.388507229194147e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3972429633140564,
                        -0.9716314077377319,
                        0.7564759850502014
                    ],
                    "area": 0.6629588603973389,
                    "normal": [
                        -1.0,
                        2.13454327990803e-07,
                        8.185111965985925e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.39724254608154297,
                        -0.9716314077377319,
                        0.7564760446548462
                    ],
                    "area": 0.6629588007926941,
                    "normal": [
                        1.0,
                        -2.134543422016577e-07,
                        -8.185114808156868e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -5.960464477539063e-08,
                        -1.3784292936325073,
                        1.188159465789795
                    ],
                    "area": 0.648160994052887,
                    "normal": [
                        -1.3793945186080236e-07,
                        -0.3777006268501282,
                        0.9259277582168579
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.9802322387695312e-08,
                        -0.654639720916748,
                        -1.0221248865127563
                    ],
                    "area": 0.6367615461349487,
                    "normal": [
                        4.6802956177316446e-08,
                        0.7664476633071899,
                        -0.6423067450523376
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        5.960464477539063e-08,
                        -1.394264817237854,
                        -1.2269794940948486
                    ],
                    "area": 0.6314970850944519,
                    "normal": [
                        -2.3596562925831677e-08,
                        -0.37770065665245056,
                        -0.9259276986122131
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5502715110778809,
                        -2.05086612701416,
                        1.1920928955078125e-07
                    ],
                    "area": 0.5754361748695374,
                    "normal": [
                        1.0,
                        1.930579855979886e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5502718687057495,
                        -2.0508663654327393,
                        2.384185791015625e-07
                    ],
                    "area": 0.5754359364509583,
                    "normal": [
                        -1.0,
                        -1.9305805665226217e-07,
                        0.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.470348358154297e-08,
                        -0.0454743355512619,
                        -0.9157310724258423
                    ],
                    "area": 1.869959831237793,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.8312206268310547e-07,
                        0.15169493854045868,
                        0.7882693409919739
                    ],
                    "area": 1.2684822082519531,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.611513376235962,
                        0.11584332585334778,
                        0.509068489074707
                    ],
                    "area": 1.1717511415481567,
                    "normal": [
                        -0.1130363792181015,
                        1.8916540511781932e-07,
                        0.9935908317565918
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.6115139722824097,
                        0.11584660410881042,
                        0.5090687274932861
                    ],
                    "area": 1.1717498302459717,
                    "normal": [
                        0.11303577572107315,
                        -1.2240127489349106e-07,
                        0.9935909509658813
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.7693377733230591,
                        0.20422367751598358,
                        0.7882693409919739
                    ],
                    "area": 0.9101207852363586,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.7693381905555725,
                        0.20422348380088806,
                        0.7882693409919739
                    ],
                    "area": 0.9101200103759766,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.611513376235962,
                        0.3587089776992798,
                        -0.6474519371986389
                    ],
                    "area": 0.8498905301094055,
                    "normal": [
                        0.11303665488958359,
                        -1.7313875844138238e-07,
                        -0.9935908317565918
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.611513376235962,
                        0.35870596766471863,
                        -0.6474522352218628
                    ],
                    "area": 0.84988933801651,
                    "normal": [
                        -0.11303573101758957,
                        1.0081509316250958e-07,
                        -0.9935908913612366
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.682209014892578e-07,
                        -0.640072226524353,
                        0.0
                    ],
                    "area": 0.7944236397743225,
                    "normal": [
                        6.039238797939106e-08,
                        -1.0,
                        2.221504189492407e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.763084352016449,
                        0.018216803669929504,
                        -0.8541045188903809
                    ],
                    "area": 0.7852810621261597,
                    "normal": [
                        0.23110255599021912,
                        -6.167062593931405e-08,
                        -0.9729293584823608
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.3560056686401367e-06,
                        -0.8115538358688354,
                        0.5586070418357849
                    ],
                    "area": 1.3517687320709229,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.9802322387695312e-08,
                        0.6357032060623169,
                        -0.4289027452468872
                    ],
                    "area": 1.3015633821487427,
                    "normal": [
                        1.717299547010498e-08,
                        0.08222707360982895,
                        -0.9966135621070862
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        3.948807716369629e-07,
                        0.3137217164039612,
                        0.5552847981452942
                    ],
                    "area": 1.2640045881271362,
                    "normal": [
                        -1.7683275643776142e-07,
                        -0.33131664991378784,
                        0.943519651889801
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7228860855102539,
                        -0.6422409415245056,
                        -0.6129804849624634
                    ],
                    "area": 0.6623953580856323,
                    "normal": [
                        -0.30438563227653503,
                        5.6239677803660015e-08,
                        -0.9525489211082458
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7228857278823853,
                        -0.6422410011291504,
                        -0.6129804849624634
                    ],
                    "area": 0.6623953580856323,
                    "normal": [
                        0.30438560247421265,
                        0.0,
                        -0.9525489211082458
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.1457672119140625e-06,
                        1.071624755859375,
                        0.9830131530761719
                    ],
                    "area": 0.5602138638496399,
                    "normal": [
                        -6.915755648151389e-07,
                        -0.6556816101074219,
                        0.7550375461578369
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.1010637283325195e-06,
                        -1.43662428855896,
                        0.3509121239185333
                    ],
                    "area": 0.559149980545044,
                    "normal": [
                        -6.395920877366734e-07,
                        -0.8826666474342346,
                        0.46999967098236084
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1007784605026245,
                        -0.6422415375709534,
                        0.13827913999557495
                    ],
                    "area": 0.5538017749786377,
                    "normal": [
                        1.0,
                        -3.457111574789451e-07,
                        4.395169810322841e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1007791757583618,
                        -0.6422408819198608,
                        0.13827913999557495
                    ],
                    "area": 0.5538017153739929,
                    "normal": [
                        -1.0,
                        2.2894421647379204e-07,
                        -4.395172652493784e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1086463928222656e-05,
                        3.5965805053710938,
                        0.9288134574890137
                    ],
                    "area": 0.5479787588119507,
                    "normal": [
                        2.4643614437991346e-07,
                        0.9984043836593628,
                        -0.05646899715065956
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.47572895884513855,
                        -1.2536756992340088,
                        0.44791948795318604
                    ],
                    "area": 2.185401439666748,
                    "normal": [
                        1.0,
                        3.387188485248771e-08,
                        -1.1998575644156517e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.47572869062423706,
                        -1.2536753416061401,
                        0.44791948795318604
                    ],
                    "area": 2.185401439666748,
                    "normal": [
                        -1.0,
                        -5.0807823726017887e-08,
                        -9.598858952131195e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.862645149230957e-07,
                        -1.9860248565673828,
                        0.4479195773601532
                    ],
                    "area": 0.9363194704055786,
                    "normal": [
                        0.0,
                        -1.0,
                        2.0667903299909085e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.47572872042655945,
                        0.03627389669418335,
                        0.2940923571586609
                    ],
                    "area": 0.7603645324707031,
                    "normal": [
                        -0.9999999403953552,
                        7.235065169197696e-08,
                        1.928829931330256e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.47572892904281616,
                        0.03627374768257141,
                        0.2940923571586609
                    ],
                    "area": 0.7603643536567688,
                    "normal": [
                        1.0,
                        1.237953561883387e-08,
                        -1.6073585129561252e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6391277313232422e-07,
                        -0.7396604418754578,
                        1.1225097179412842
                    ],
                    "area": 0.5144835114479065,
                    "normal": [
                        5.79266732358974e-08,
                        0.14505675435066223,
                        0.9894232749938965
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        6.705522537231445e-08,
                        -0.7396606206893921,
                        -0.2266707569360733
                    ],
                    "area": 0.5144833922386169,
                    "normal": [
                        -7.240836819022434e-09,
                        0.14505675435066223,
                        -0.989423394203186
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.825392246246338e-07,
                        -1.6195149421691895,
                        1.1761444807052612
                    ],
                    "area": 0.5126768946647644,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.6391277313232422e-07,
                        -1.619515061378479,
                        -0.28030550479888916
                    ],
                    "area": 0.5126766562461853,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3673096299171448,
                        0.10561667382717133,
                        -0.4438598155975342
                    ],
                    "area": 0.4869789481163025,
                    "normal": [
                        0.9414762258529663,
                        0.058235909789800644,
                        -0.33201074600219727
                    ]
                }
            ]
        },
        "Engines_eng.body.split": {
            "collection": "Engines",
            "object_name": "eng.body.split",
            "dimensions": {
                "width": 3.079943895339966,
                "height": 1.9734022617340088,
                "depth": 4.692239761352539
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        1.155037522315979,
                        -2.0601913928985596,
                        -0.369071900844574
                    ],
                    "area": 1.4838014841079712,
                    "normal": [
                        -1.1713916947542202e-08,
                        -2.1717509923746547e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5189949870109558,
                        -4.67384672164917,
                        5.21540641784668e-07
                    ],
                    "area": 1.1943175792694092,
                    "normal": [
                        -1.0,
                        -1.70853198255827e-07,
                        1.3928593034506775e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7416102886199951,
                        -4.67384672164917,
                        -0.7529500722885132
                    ],
                    "area": 1.0994794368743896,
                    "normal": [
                        -0.825031578540802,
                        -1.3552923405768524e-07,
                        -0.5650865435600281
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7416102886199951,
                        -4.67384672164917,
                        0.7529511451721191
                    ],
                    "area": 1.0994794368743896,
                    "normal": [
                        -0.8250316977500916,
                        -1.3552921984683053e-07,
                        0.5650863647460938
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.568467140197754,
                        -4.673846244812012,
                        0.7529510259628296
                    ],
                    "area": 1.0994793176651,
                    "normal": [
                        0.8250315189361572,
                        1.3552923405768524e-07,
                        0.5650865435600281
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.5684666633605957,
                        -4.673846244812012,
                        -0.7529501914978027
                    ],
                    "area": 1.099479079246521,
                    "normal": [
                        0.8250319361686707,
                        1.3552924826853996e-07,
                        -0.5650860667228699
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5189948081970215,
                        -3.369795083999634,
                        5.140900611877441e-07
                    ],
                    "area": 0.966480016708374,
                    "normal": [
                        -1.0,
                        -1.474579107707541e-07,
                        1.495720596267347e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.181386947631836,
                        -5.198251724243164,
                        4.917383193969727e-07
                    ],
                    "area": 0.8754780888557434,
                    "normal": [
                        4.180136556897196e-07,
                        -1.0,
                        -2.59713718630053e-13
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.322016954421997,
                        -0.2566090524196625,
                        -0.3626739978790283
                    ],
                    "area": 0.7943265438079834,
                    "normal": [
                        0.3383675813674927,
                        -0.006825048942118883,
                        -0.9409892559051514
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.3220171928405762,
                        -0.2566089332103729,
                        0.3626739978790283
                    ],
                    "area": 0.7943263053894043,
                    "normal": [
                        0.3383675813674927,
                        -0.006825032643973827,
                        0.9409892559051514
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.14796078205108643,
                        0.14239157736301422,
                        -0.55219566822052
                    ],
                    "area": 0.18877890706062317,
                    "normal": [
                        0.2550826668739319,
                        -0.16931937634944916,
                        -0.9519789218902588
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5521959066390991,
                        0.1423914134502411,
                        0.14796021580696106
                    ],
                    "area": 0.18877868354320526,
                    "normal": [
                        -0.9519791603088379,
                        -0.16931957006454468,
                        0.25508183240890503
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.404235303401947,
                        0.14239145815372467,
                        -0.4042355716228485
                    ],
                    "area": 0.18877866864204407,
                    "normal": [
                        -0.6968966722488403,
                        -0.16931946575641632,
                        -0.6968974471092224
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5521957874298096,
                        0.1423914134502411,
                        -0.14796067774295807
                    ],
                    "area": 0.18877862393856049,
                    "normal": [
                        -0.951978862285614,
                        -0.16931948065757751,
                        -0.2550823390483856
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5521957278251648,
                        0.1423916220664978,
                        0.1479608565568924
                    ],
                    "area": 0.1887786090373993,
                    "normal": [
                        0.951978862285614,
                        -0.1693193018436432,
                        0.2550828456878662
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5521959662437439,
                        0.14239159226417542,
                        -0.14795994758605957
                    ],
                    "area": 0.1887786090373993,
                    "normal": [
                        0.9519793391227722,
                        -0.1693192720413208,
                        -0.2550809979438782
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.14796024560928345,
                        0.14239151775836945,
                        -0.5521959066390991
                    ],
                    "area": 0.1887785941362381,
                    "normal": [
                        -0.2550815939903259,
                        -0.16931945085525513,
                        -0.9519791007041931
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4042355716228485,
                        0.1423914134502411,
                        0.404235303401947
                    ],
                    "area": 0.1887785941362381,
                    "normal": [
                        -0.6968973278999329,
                        -0.1693194955587387,
                        0.6968966126441956
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.1479601263999939,
                        0.14239148795604706,
                        0.5521959066390991
                    ],
                    "area": 0.1887785941362381,
                    "normal": [
                        0.25508150458335876,
                        -0.16931937634944916,
                        0.9519791603088379
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.14796069264411926,
                        0.14239144325256348,
                        0.5521957874298096
                    ],
                    "area": 0.1887785792350769,
                    "normal": [
                        -0.25508230924606323,
                        -0.16931946575641632,
                        0.9519789814949036
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.3467075824737549,
                        5.960464477539063e-08,
                        0.007102370262145996
                    ],
                    "area": 0.725013256072998,
                    "normal": [
                        -1.0,
                        4.8025693644149214e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6710240840911865,
                        -1.7881393432617188e-07,
                        0.007102370262145996
                    ],
                    "area": 0.725013256072998,
                    "normal": [
                        1.0,
                        0.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6710240840911865,
                        -1.7881393432617188e-07,
                        0.007102370262145996
                    ],
                    "area": 0.725013256072998,
                    "normal": [
                        1.0,
                        0.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3467075824737549,
                        5.960464477539063e-08,
                        0.007102370262145996
                    ],
                    "area": 0.725013256072998,
                    "normal": [
                        -1.0,
                        -4.8025693644149214e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.05244634672999382,
                        1.4304704666137695,
                        1.3886677026748657
                    ],
                    "area": 0.4532032012939453,
                    "normal": [
                        -0.2588191032409668,
                        -0.5231203436851501,
                        0.8120085597038269
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.14328590035438538,
                        1.458873987197876,
                        1.344578504562378
                    ],
                    "area": 0.4532029330730438,
                    "normal": [
                        -0.7071072459220886,
                        -0.38295039534568787,
                        0.5944311618804932
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.14328567683696747,
                        1.4588738679885864,
                        1.344578742980957
                    ],
                    "area": 0.4532028138637543,
                    "normal": [
                        0.7071068286895752,
                        -0.3829505741596222,
                        0.594431459903717
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.1957319676876068,
                        1.5648770332336426,
                        1.1800360679626465
                    ],
                    "area": 0.4532027542591095,
                    "normal": [
                        0.9659260511398315,
                        0.14016912877559662,
                        -0.21757622063159943
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.19573190808296204,
                        1.5648772716522217,
                        1.1800358295440674
                    ],
                    "area": 0.45320266485214233,
                    "normal": [
                        -0.9659258723258972,
                        0.1401696652173996,
                        -0.2175770252943039
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.052446335554122925,
                        1.642477035522461,
                        1.0595824718475342
                    ],
                    "area": 0.45320263504981995,
                    "normal": [
                        0.25881943106651306,
                        0.5231201648712158,
                        -0.8120084404945374
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.11942785233259201,
                        -0.48145899176597595,
                        0.4457090497016907
                    ],
                    "area": 0.16446954011917114,
                    "normal": [
                        -0.25881966948509216,
                        -5.096325494946541e-08,
                        -0.9659256339073181
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4457091987133026,
                        -0.4814590811729431,
                        -0.11942724883556366
                    ],
                    "area": 0.16446952521800995,
                    "normal": [
                        0.9659260511398315,
                        8.210747637349414e-08,
                        0.2588186264038086
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.32628169655799866,
                        -0.48145896196365356,
                        -0.32628199458122253
                    ],
                    "area": 0.16446948051452637,
                    "normal": [
                        -0.7071066498756409,
                        -1.415646408986504e-07,
                        0.7071070075035095
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11942720413208008,
                        -0.48145902156829834,
                        0.44570910930633545
                    ],
                    "area": 0.1644694209098816,
                    "normal": [
                        0.25881925225257874,
                        3.680682070239527e-08,
                        -0.9659258723258972
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.32628220319747925,
                        -0.48145896196365356,
                        0.32628142833709717
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        -0.7071077823638916,
                        -1.6421519433151843e-07,
                        -0.707105815410614
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4457092881202698,
                        -0.48145896196365356,
                        0.11942718923091888
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        -0.9659258723258972,
                        -1.3873352600057842e-07,
                        -0.2588188052177429
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.445709228515625,
                        -0.4814589321613312,
                        -0.11942759156227112
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        -0.9659257531166077,
                        -1.4156481142890698e-07,
                        0.2588191330432892
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3262818455696106,
                        -0.4814590811729431,
                        -0.32628175616264343
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        0.7071069478988647,
                        8.493888969951513e-08,
                        0.7071065902709961
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11942754685878754,
                        -0.4814590513706207,
                        -0.445709228515625
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        0.25881943106651306,
                        8.493888259408777e-09,
                        0.9659256935119629
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3262816071510315,
                        -0.48145902156829834,
                        0.32628169655799866
                    ],
                    "area": 0.16446927189826965,
                    "normal": [
                        0.7071067690849304,
                        9.62640740453935e-08,
                        -0.7071067690849304
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.6960964202880859,
                        0.23486147820949554,
                        0.5494580268859863
                    ],
                    "area": 1.0756338834762573,
                    "normal": [
                        0.9605093002319336,
                        -1.5238714468068792e-07,
                        0.2782476544380188
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6960964202880859,
                        0.2348616123199463,
                        0.5494580268859863
                    ],
                    "area": 1.0756338834762573,
                    "normal": [
                        -0.9605093002319336,
                        4.2252796106367896e-07,
                        0.2782476544380188
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6960964202880859,
                        0.23486143350601196,
                        -0.4311724603176117
                    ],
                    "area": 0.8185868263244629,
                    "normal": [
                        0.9307636618614197,
                        -1.4562814953933412e-07,
                        -0.36562132835388184
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6960964798927307,
                        0.23486144840717316,
                        -0.4311724603176117
                    ],
                    "area": 0.8185866475105286,
                    "normal": [
                        -0.9307637810707092,
                        -2.7305283367695665e-08,
                        -0.3656211793422699
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2989226281642914,
                        -1.23946213722229,
                        -0.48922160267829895
                    ],
                    "area": 0.5791491866111755,
                    "normal": [
                        0.8815426230430603,
                        -0.4093596339225769,
                        -0.23517495393753052
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.29892265796661377,
                        -1.2394620180130005,
                        0.4892217516899109
                    ],
                    "area": 0.5791491866111755,
                    "normal": [
                        0.8815425634384155,
                        -0.40935957431793213,
                        0.23517505824565887
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2989230751991272,
                        -1.2394614219665527,
                        0.4892217516899109
                    ],
                    "area": 0.5791488289833069,
                    "normal": [
                        -0.8815430998802185,
                        -0.40935882925987244,
                        0.23517479002475739
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.29892298579216003,
                        -1.2394617795944214,
                        -0.48922160267829895
                    ],
                    "area": 0.5791487097740173,
                    "normal": [
                        -0.8815430998802185,
                        -0.40935879945755005,
                        -0.23517479002475739
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        3.725290298461914e-08,
                        0.7049770951271057,
                        1.2646849155426025
                    ],
                    "area": 0.5228371024131775,
                    "normal": [
                        6.840139690211799e-07,
                        0.6677988171577454,
                        0.7443418502807617
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        3.725290298461914e-09,
                        -0.1493513286113739,
                        1.5293697118759155
                    ],
                    "area": 0.4899352788925171,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -5.364418029785156e-07,
                        -1.999718427658081,
                        0.0
                    ],
                    "area": 2.2776038646698,
                    "normal": [
                        -1.7954995712443633e-07,
                        -1.0,
                        -1.7375103311678686e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.9371509552001953e-07,
                        -1.6257188320159912,
                        0.9503799676895142
                    ],
                    "area": 1.733618974685669,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.341104507446289e-07,
                        -1.999718427658081,
                        -0.5673209428787231
                    ],
                    "area": 1.185730218887329,
                    "normal": [
                        -9.019105107199721e-08,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -7.152557373046875e-07,
                        -1.9997185468673706,
                        0.5673209428787231
                    ],
                    "area": 1.18572998046875,
                    "normal": [
                        -3.607642611314077e-07,
                        -1.0,
                        3.8351678603720796e-13
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.172325134277344e-07,
                        -0.3007984459400177,
                        1.0916571617126465
                    ],
                    "area": 0.9275025129318237,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.172325134277344e-07,
                        0.3692989647388458,
                        1.0916571617126465
                    ],
                    "area": 0.927502453327179,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.172325134277344e-07,
                        1.0393962860107422,
                        1.0916571617126465
                    ],
                    "area": 0.9275023937225342,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.459791660308838,
                        -1.7009539604187012,
                        -0.681369960308075
                    ],
                    "area": 0.844578206539154,
                    "normal": [
                        -0.5709564685821533,
                        1.4114652913121972e-07,
                        -0.8209803104400635
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.4676623344421387,
                        -1.7009539604187012,
                        0.677072286605835
                    ],
                    "area": 0.828357458114624,
                    "normal": [
                        -0.5726958513259888,
                        2.1586566845144262e-07,
                        0.8197678923606873
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.467661738395691,
                        -0.6205727458000183,
                        -0.677072286605835
                    ],
                    "area": 0.8283573985099792,
                    "normal": [
                        0.5726960301399231,
                        -3.5977617329763234e-08,
                        -0.8197678327560425
                    ]
                }
            ]
        },
        "Engines_BlockEnginesingle": {
            "collection": "Engines",
            "object_name": "BlockEnginesingle",
            "dimensions": {
                "width": 1.9536638259887695,
                "height": 2.519076108932495,
                "depth": 5.985849380493164
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.043081283569336e-07,
                        0.6099004745483398,
                        0.692042350769043
                    ],
                    "area": 1.3623063564300537,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.1175870895385742e-07,
                        0.49340343475341797,
                        -0.6714122295379639
                    ],
                    "area": 1.1703242063522339,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5034940838813782,
                        0.6320651769638062,
                        0.299911230802536
                    ],
                    "area": 1.0218870639801025,
                    "normal": [
                        0.9964835047721863,
                        -1.4035178708127205e-07,
                        0.08378873020410538
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5034942626953125,
                        0.6320657730102539,
                        0.299911230802536
                    ],
                    "area": 1.0218870639801025,
                    "normal": [
                        -0.9964835047721863,
                        1.576679125037117e-07,
                        0.08378854393959045
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5034942030906677,
                        0.5738171339035034,
                        -0.299911230802536
                    ],
                    "area": 0.9517629146575928,
                    "normal": [
                        -0.996483564376831,
                        7.534632828765098e-08,
                        -0.08378865569829941
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5034940838813782,
                        0.5738167762756348,
                        -0.299911230802536
                    ],
                    "area": 0.9517629146575928,
                    "normal": [
                        0.996483564376831,
                        -5.675438075058992e-08,
                        -0.08378872275352478
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        1.7092347145080566,
                        0.6714122295379639
                    ],
                    "area": 0.44934824109077454,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.45925474166870117,
                        -0.645553708076477,
                        0.19671574234962463
                    ],
                    "area": 0.3373987376689911,
                    "normal": [
                        1.0,
                        -1.589463494156007e-07,
                        2.2724903203652502e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4592551290988922,
                        -0.6455531716346741,
                        -0.19671574234962463
                    ],
                    "area": 0.3373987376689911,
                    "normal": [
                        -1.0,
                        -3.418435756685767e-09,
                        -3.0299884201667737e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.45925480127334595,
                        -0.645553469657898,
                        -0.19671574234962463
                    ],
                    "area": 0.3373986780643463,
                    "normal": [
                        0.9999999403953552,
                        -6.551399422960458e-09,
                        1.8937427626042336e-07
                    ]
                }
            ]
        },
        "Engines_5-Engine": {
            "collection": "Engines",
            "object_name": "5-Engine",
            "dimensions": {
                "width": 4.089623928070068,
                "height": 3.263840675354004,
                "depth": 5.4085845947265625
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8398540019989014,
                        -1.356618881225586,
                        -0.9093329906463623
                    ],
                    "area": 3.7300124168395996,
                    "normal": [
                        -0.21073156595230103,
                        -3.195948750089883e-08,
                        -0.9775439500808716
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8398540019989014,
                        -1.356618881225586,
                        -0.9093329906463623
                    ],
                    "area": 3.7300124168395996,
                    "normal": [
                        0.21073156595230103,
                        -3.195948750089883e-08,
                        -0.9775439500808716
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.1188840866088867,
                        -1.6396756172180176,
                        -0.07040160894393921
                    ],
                    "area": 2.538565158843994,
                    "normal": [
                        -0.8317070007324219,
                        0.0,
                        -0.5552147030830383
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.1188838481903076,
                        -1.6396756172180176,
                        -0.07040160894393921
                    ],
                    "area": 2.538565158843994,
                    "normal": [
                        0.8317070007324219,
                        0.0,
                        -0.5552147030830383
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8398540019989014,
                        -3.1054234504699707,
                        -0.9093331098556519
                    ],
                    "area": 2.2799088954925537,
                    "normal": [
                        -0.21073158085346222,
                        1.5686065069075994e-07,
                        -0.9775440692901611
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8398540019989014,
                        -3.1054234504699707,
                        -0.9093331098556519
                    ],
                    "area": 2.2799088954925537,
                    "normal": [
                        0.21073158085346222,
                        1.5686065069075994e-07,
                        -0.9775440692901611
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.7064886093139648,
                        -0.6500458121299744,
                        1.0014982223510742
                    ],
                    "area": 2.272602081298828,
                    "normal": [
                        0.6928002238273621,
                        0.6896779537200928,
                        0.2106470763683319
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.7064887285232544,
                        -0.6500458121299744,
                        1.0014983415603638
                    ],
                    "area": 2.272601842880249,
                    "normal": [
                        -0.6928002238273621,
                        0.6896779537200928,
                        0.2106470763683319
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.0542044639587402,
                        -3.1054229736328125,
                        1.2387168407440186
                    ],
                    "area": 2.185032367706299,
                    "normal": [
                        -0.7909161448478699,
                        1.0911443837358092e-07,
                        0.6119245886802673
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.0542044639587402,
                        -3.1054229736328125,
                        1.2387168407440186
                    ],
                    "area": 2.185032367706299,
                    "normal": [
                        0.7909161448478699,
                        1.0911443837358092e-07,
                        0.6119245886802673
                    ]
                }
            ]
        },
        "Engines_FishEngine": {
            "collection": "Engines",
            "object_name": "FishEngine",
            "dimensions": {
                "width": 1.054911494255066,
                "height": 3.039276123046875,
                "depth": 4.7016825675964355
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -5.960464477539063e-08,
                        1.0704436302185059,
                        2.4896492958068848
                    ],
                    "area": 4.245205402374268,
                    "normal": [
                        0.0,
                        0.0004237843968439847,
                        0.9999998807907104
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9999999403953552,
                        0.7579271197319031,
                        0.0
                    ],
                    "area": 4.199441432952881,
                    "normal": [
                        1.0,
                        -4.722341273577513e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0,
                        0.7579270601272583,
                        0.0
                    ],
                    "area": 4.199441432952881,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -5.960464477539063e-08,
                        0.20423316955566406,
                        -2.96295166015625
                    ],
                    "area": 3.402698516845703,
                    "normal": [
                        0.0,
                        0.00052871328080073,
                        -0.9999998807907104
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6850845813751221,
                        -1.2133045196533203,
                        0.0
                    ],
                    "area": 2.5708491802215576,
                    "normal": [
                        0.9234014749526978,
                        -0.3838355541229248,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6850845217704773,
                        -1.2133045196533203,
                        0.0
                    ],
                    "area": 2.5708491802215576,
                    "normal": [
                        -0.9234014749526978,
                        -0.38383546471595764,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -5.960464477539063e-08,
                        -2.7165040969848633,
                        2.3090028762817383
                    ],
                    "area": 2.403196096420288,
                    "normal": [
                        0.0,
                        -0.2043052464723587,
                        0.9789071679115295
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -5.960464477539063e-08,
                        -3.270197868347168,
                        -2.7823052406311035
                    ],
                    "area": 2.403196096420288,
                    "normal": [
                        0.0,
                        -0.2043052464723587,
                        -0.9789071679115295
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0,
                        -1.1740655899047852,
                        0.0
                    ],
                    "area": 2.2285351753234863,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9999998807907104,
                        -1.1740657091140747,
                        0.0
                    ],
                    "area": 2.2285351753234863,
                    "normal": [
                        1.0,
                        4.4493795314792806e-08,
                        0.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8994107246398926,
                        -0.5316840410232544,
                        0.23842372000217438
                    ],
                    "area": 0.16013307869434357,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5600275993347168,
                        -0.5316840410232544,
                        0.23842372000217438
                    ],
                    "area": 0.16013307869434357,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2418961524963379,
                        -0.5316840410232544,
                        0.23842372000217438
                    ],
                    "area": 0.16013307869434357,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9393105506896973,
                        -0.5316839814186096,
                        0.23842373490333557
                    ],
                    "area": 0.16013306379318237,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5999274253845215,
                        -0.5316839814186096,
                        0.23842373490333557
                    ],
                    "area": 0.16013306379318237,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2817959785461426,
                        -0.5316839814186096,
                        0.23842373490333557
                    ],
                    "area": 0.16013306379318237,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5860142707824707,
                        -0.4506254196166992,
                        0.18591873347759247
                    ],
                    "area": 0.14973989129066467,
                    "normal": [
                        0.3826618790626526,
                        0.0,
                        0.9238885045051575
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5860142707824707,
                        -0.4506254196166992,
                        0.2977895140647888
                    ],
                    "area": 0.14973987638950348,
                    "normal": [
                        0.3826618790626526,
                        0.0,
                        -0.9238885045051575
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6323555707931519,
                        -0.4506254196166992,
                        0.18591874837875366
                    ],
                    "area": 0.14973923563957214,
                    "normal": [
                        -0.3826635479927063,
                        0.0,
                        0.9238877296447754
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6323555707931519,
                        -0.4506254196166992,
                        0.2977895140647888
                    ],
                    "area": 0.14973922073841095,
                    "normal": [
                        -0.3826635479927063,
                        0.0,
                        -0.9238877296447754
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5645382404327393,
                        2.7105016708374023,
                        1.7368091344833374
                    ],
                    "area": 5.112821578979492,
                    "normal": [
                        5.676236582985439e-07,
                        1.0,
                        -1.1569644797759793e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5645383596420288,
                        2.710503101348877,
                        -1.7368091344833374
                    ],
                    "area": 5.112820148468018,
                    "normal": [
                        3.784159332553827e-07,
                        1.0,
                        7.713077287974102e-09
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.564538300037384,
                        2.710503101348877,
                        -1.7368090152740479
                    ],
                    "area": 5.112820148468018,
                    "normal": [
                        -3.784159332553827e-07,
                        -1.0,
                        -7.713077287974102e-09
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5852138996124268,
                        2.7105026245117188,
                        0.0
                    ],
                    "area": 4.484111309051514,
                    "normal": [
                        3.841140028271184e-07,
                        1.0,
                        8.250565315393033e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5677966475486755,
                        -2.615797758102417,
                        -1.4631309509277344
                    ],
                    "area": 3.6284642219543457,
                    "normal": [
                        0.0,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5677969455718994,
                        -2.615797758102417,
                        1.463131070137024
                    ],
                    "area": 3.6284639835357666,
                    "normal": [
                        0.0,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5852144360542297,
                        -2.615797758102417,
                        0.0
                    ],
                    "area": 3.182281732559204,
                    "normal": [
                        0.0,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.879237174987793,
                        0.6776727437973022,
                        1.5475122928619385
                    ],
                    "area": 2.8480148315429688,
                    "normal": [
                        -0.9565120935440063,
                        1.4649941704192315e-07,
                        0.29169249534606934
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.8792376518249512,
                        -0.6776732206344604,
                        1.5475122928619385
                    ],
                    "area": 2.8480148315429688,
                    "normal": [
                        -0.9565120935440063,
                        1.2557092077258858e-07,
                        0.2916925847530365
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.8792376518249512,
                        -2.0330190658569336,
                        1.5475122928619385
                    ],
                    "area": 2.8480136394500732,
                    "normal": [
                        -0.9565120339393616,
                        4.1856992538669147e-08,
                        0.2916925549507141
                    ]
                }
            ]
        },
        "Engines_CubeEngine": {
            "collection": "Engines",
            "object_name": "CubeEngine",
            "dimensions": {
                "width": 3.0264713764190674,
                "height": 3.6405458450317383,
                "depth": 9.330972671508789
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -1.2370713949203491,
                        -3.359546184539795,
                        0.9647587537765503
                    ],
                    "area": 1.4648138284683228,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.2370713949203491,
                        -3.359546184539795,
                        0.9647587537765503
                    ],
                    "area": 1.4648138284683228,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1878446340560913,
                        -3.359546422958374,
                        0.9401453137397766
                    ],
                    "area": 1.3663039207458496,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1878446340560913,
                        -3.359546422958374,
                        0.9401453733444214
                    ],
                    "area": 1.3663039207458496,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1013333797454834,
                        0.45662832260131836,
                        -0.38795971870422363
                    ],
                    "area": 1.3274860382080078,
                    "normal": [
                        -1.0,
                        1.0568670916200062e-07,
                        -1.0129077310239154e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1013333797454834,
                        0.45662832260131836,
                        -0.38795971870422363
                    ],
                    "area": 1.3274860382080078,
                    "normal": [
                        1.0,
                        1.0568670916200062e-07,
                        -1.0129077310239154e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1013331413269043,
                        1.7238585948944092,
                        -0.3660546541213989
                    ],
                    "area": 1.192199468612671,
                    "normal": [
                        1.0,
                        2.353593373527474e-07,
                        -1.8418818115151225e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1013331413269043,
                        1.7238585948944092,
                        -0.3660546541213989
                    ],
                    "area": 1.1921993494033813,
                    "normal": [
                        -1.0,
                        2.353593373527474e-07,
                        -1.8418818115151225e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.105811595916748,
                        -3.3625876903533936,
                        0.8441199064254761
                    ],
                    "area": 1.1841051578521729,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.105811595916748,
                        -3.3625879287719727,
                        0.8441199064254761
                    ],
                    "area": 1.1841051578521729,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
                }
            ]
        },
        "Engines_eng.bit.001": {
            "collection": "Engines",
            "object_name": "eng.bit.001",
            "dimensions": {
                "width": 1.3636237382888794,
                "height": 1.1809331178665161,
                "depth": 1.8985611200332642
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11942777782678604,
                        0.48145902156829834,
                        0.4457090497016907
                    ],
                    "area": 0.16446954011917114,
                    "normal": [
                        0.2588196396827698,
                        1.6987749873464963e-08,
                        -0.9659256339073181
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4457092583179474,
                        0.48145902156829834,
                        -0.11942724883556366
                    ],
                    "area": 0.16446952521800995,
                    "normal": [
                        -0.9659260511398315,
                        4.530067698738094e-08,
                        0.2588186264038086
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3262816369533539,
                        0.48145902156829834,
                        -0.32628199458122253
                    ],
                    "area": 0.16446948051452637,
                    "normal": [
                        0.7071066498756409,
                        4.5300684092808297e-08,
                        0.7071070075035095
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.11942727863788605,
                        0.48145902156829834,
                        0.44570910930633545
                    ],
                    "area": 0.16446943581104279,
                    "normal": [
                        -0.25881925225257874,
                        -2.831293866023543e-09,
                        -0.9659258723258972
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.32628190517425537,
                        0.48145902156829834,
                        -0.32628175616264343
                    ],
                    "area": 0.16446930170059204,
                    "normal": [
                        -0.7071069478988647,
                        5.662592617028395e-09,
                        0.7071066498756409
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11942717432975769,
                        0.48145902156829834,
                        -0.4457094073295593
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        0.25881823897361755,
                        6.228852100775839e-08,
                        0.9659260511398315
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4457091689109802,
                        0.48145902156829834,
                        -0.11942759156227112
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        0.9659257531166077,
                        1.132518523405679e-08,
                        0.2588191330432892
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.1194276213645935,
                        0.48145902156829834,
                        -0.445709228515625
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        -0.2588194012641907,
                        2.548166655458317e-08,
                        0.9659257531166077
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.32628166675567627,
                        0.48145899176597595,
                        0.32628169655799866
                    ],
                    "area": 0.16446927189826965,
                    "normal": [
                        -0.7071067690849304,
                        0.0,
                        -0.7071067690849304
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3262821435928345,
                        0.48145902156829834,
                        0.32628142833709717
                    ],
                    "area": 0.16446927189826965,
                    "normal": [
                        0.7071077823638916,
                        7.361371245906412e-08,
                        -0.707105815410614
                    ]
                }
            ]
        },
        "Engines_eng.bit.002": {
            "collection": "Engines",
            "object_name": "eng.bit.002",
            "dimensions": {
                "width": 1.3636237382888794,
                "height": 1.1809331178665161,
                "depth": 1.8985611200332642
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11942777037620544,
                        0.48145902156829834,
                        0.4457090497016907
                    ],
                    "area": 0.16446955502033234,
                    "normal": [
                        -0.2588196396827698,
                        -1.6987749873464963e-08,
                        0.9659256339073181
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4457092583179474,
                        0.48145902156829834,
                        -0.11942724883556366
                    ],
                    "area": 0.16446952521800995,
                    "normal": [
                        -0.9659260511398315,
                        4.530067698738094e-08,
                        0.2588186264038086
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3262816369533539,
                        0.48145902156829834,
                        -0.32628199458122253
                    ],
                    "area": 0.16446948051452637,
                    "normal": [
                        0.7071066498756409,
                        4.5300684092808297e-08,
                        0.7071070075035095
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.11942727863788605,
                        0.48145899176597595,
                        0.44570910930633545
                    ],
                    "area": 0.16446943581104279,
                    "normal": [
                        0.25881925225257874,
                        2.831293866023543e-09,
                        0.9659258723258972
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.32628190517425537,
                        0.48145902156829834,
                        -0.32628175616264343
                    ],
                    "area": 0.16446930170059204,
                    "normal": [
                        -0.7071069478988647,
                        5.662592617028395e-09,
                        0.7071066498756409
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11942717432975769,
                        0.48145902156829834,
                        -0.4457094073295593
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        0.25881823897361755,
                        6.228852100775839e-08,
                        0.9659260511398315
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4457091689109802,
                        0.48145902156829834,
                        -0.11942759156227112
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        0.9659257531166077,
                        1.132518523405679e-08,
                        0.2588191330432892
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.1194276213645935,
                        0.48145902156829834,
                        -0.445709228515625
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        -0.2588194012641907,
                        2.548166655458317e-08,
                        0.9659257531166077
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.32628166675567627,
                        0.48145902156829834,
                        0.32628166675567627
                    ],
                    "area": 0.16446927189826965,
                    "normal": [
                        0.7071067690849304,
                        0.0,
                        0.7071067690849304
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3262821137905121,
                        0.48145902156829834,
                        0.32628142833709717
                    ],
                    "area": 0.16446927189826965,
                    "normal": [
                        -0.7071077823638916,
                        -7.361371245906412e-08,
                        0.707105815410614
                    ]
                }
            ]
        },
        "Engines_eng.bit.003": {
            "collection": "Engines",
            "object_name": "eng.bit.003",
            "dimensions": {
                "width": 1.3636237382888794,
                "height": 1.1809331178665161,
                "depth": 1.8985611200332642
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11942777782678604,
                        0.48145902156829834,
                        0.4457090497016907
                    ],
                    "area": 0.16446954011917114,
                    "normal": [
                        0.2588196396827698,
                        1.6987749873464963e-08,
                        -0.9659256339073181
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4457092583179474,
                        0.48145902156829834,
                        -0.11942724883556366
                    ],
                    "area": 0.16446952521800995,
                    "normal": [
                        -0.9659260511398315,
                        4.530067698738094e-08,
                        0.2588186264038086
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3262816369533539,
                        0.48145902156829834,
                        -0.32628199458122253
                    ],
                    "area": 0.16446948051452637,
                    "normal": [
                        0.7071066498756409,
                        4.5300684092808297e-08,
                        0.7071070075035095
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.11942727863788605,
                        0.48145902156829834,
                        0.44570910930633545
                    ],
                    "area": 0.16446943581104279,
                    "normal": [
                        -0.25881925225257874,
                        -2.831293866023543e-09,
                        -0.9659258723258972
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.32628190517425537,
                        0.48145902156829834,
                        -0.32628175616264343
                    ],
                    "area": 0.16446930170059204,
                    "normal": [
                        -0.7071069478988647,
                        5.662592617028395e-09,
                        0.7071066498756409
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.445709228515625,
                        0.48145902156829834,
                        0.11942718923091888
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        0.9659258723258972,
                        1.132518523405679e-08,
                        -0.2588188052177429
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4457091689109802,
                        0.48145902156829834,
                        -0.11942759156227112
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        0.9659257531166077,
                        1.132518523405679e-08,
                        0.2588191330432892
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.1194276213645935,
                        0.48145902156829834,
                        -0.445709228515625
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        -0.2588194012641907,
                        2.548166655458317e-08,
                        0.9659257531166077
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.32628166675567627,
                        0.48145899176597595,
                        0.32628169655799866
                    ],
                    "area": 0.16446927189826965,
                    "normal": [
                        -0.7071067690849304,
                        0.0,
                        -0.7071067690849304
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3262821435928345,
                        0.48145902156829834,
                        0.32628142833709717
                    ],
                    "area": 0.16446927189826965,
                    "normal": [
                        0.7071077823638916,
                        7.361371245906412e-08,
                        -0.707105815410614
                    ]
                }
            ]
        },
        "Engines_eng.bit.004": {
            "collection": "Engines",
            "object_name": "eng.bit.004",
            "dimensions": {
                "width": 1.3636237382888794,
                "height": 1.1809331178665161,
                "depth": 1.8985611200332642
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11942777782678604,
                        0.48145902156829834,
                        0.4457090497016907
                    ],
                    "area": 0.16446954011917114,
                    "normal": [
                        0.2588196396827698,
                        1.6987749873464963e-08,
                        -0.9659256339073181
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4457092583179474,
                        0.48145902156829834,
                        -0.11942724883556366
                    ],
                    "area": 0.16446952521800995,
                    "normal": [
                        -0.9659260511398315,
                        4.530067698738094e-08,
                        0.2588186264038086
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3262816369533539,
                        0.48145902156829834,
                        -0.32628199458122253
                    ],
                    "area": 0.16446948051452637,
                    "normal": [
                        0.7071066498756409,
                        4.5300684092808297e-08,
                        0.7071070075035095
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.11942727863788605,
                        0.48145902156829834,
                        0.44570910930633545
                    ],
                    "area": 0.16446943581104279,
                    "normal": [
                        -0.25881925225257874,
                        -2.831293866023543e-09,
                        -0.9659258723258972
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.32628190517425537,
                        0.48145902156829834,
                        -0.32628175616264343
                    ],
                    "area": 0.16446930170059204,
                    "normal": [
                        -0.7071069478988647,
                        5.662592617028395e-09,
                        0.7071066498756409
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.445709228515625,
                        0.48145902156829834,
                        0.11942718923091888
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        0.9659258723258972,
                        1.132518523405679e-08,
                        -0.2588188052177429
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4457091689109802,
                        0.48145902156829834,
                        -0.11942759156227112
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        0.9659257531166077,
                        1.132518523405679e-08,
                        0.2588191330432892
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.1194276213645935,
                        0.48145902156829834,
                        -0.445709228515625
                    ],
                    "area": 0.16446928679943085,
                    "normal": [
                        -0.2588194012641907,
                        2.548166655458317e-08,
                        0.9659257531166077
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.32628166675567627,
                        0.48145899176597595,
                        0.32628169655799866
                    ],
                    "area": 0.16446927189826965,
                    "normal": [
                        -0.7071067690849304,
                        0.0,
                        -0.7071067690849304
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3262821435928345,
                        0.48145902156829834,
                        0.32628142833709717
                    ],
                    "area": 0.16446927189826965,
                    "normal": [
                        0.7071077823638916,
                        7.361371245906412e-08,
                        -0.707105815410614
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        4.76837158203125e-07,
                        2.487974166870117,
                        1.9371509552001953e-07
                    ],
                    "area": 0.6644389629364014,
                    "normal": [
                        0.0,
                        0.9999999403953552,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3972429037094116,
                        0.9716315865516663,
                        -0.7564758062362671
                    ],
                    "area": 0.6629590392112732,
                    "normal": [
                        1.0,
                        -3.2018141382650356e-07,
                        -1.2277671146421199e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.39724236726760864,
                        0.9716317653656006,
                        -0.7564758062362671
                    ],
                    "area": 0.6629589796066284,
                    "normal": [
                        -0.9999999403953552,
                        3.20181442248213e-07,
                        1.2277671146421199e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.39724308252334595,
                        0.9716312289237976,
                        0.7564759850502014
                    ],
                    "area": 0.6629588603973389,
                    "normal": [
                        1.0,
                        -3.6794892821490066e-07,
                        6.577709399380183e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.39724239706993103,
                        0.9716315269470215,
                        0.7564760446548462
                    ],
                    "area": 0.6629588603973389,
                    "normal": [
                        -1.0,
                        3.6794892821490066e-07,
                        -6.57771153100839e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.682209014892578e-07,
                        1.3784292936325073,
                        1.188159465789795
                    ],
                    "area": 0.648160994052887,
                    "normal": [
                        1.8391925493688177e-07,
                        0.3777005970478058,
                        0.9259277582168579
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.341104507446289e-07,
                        0.654639720916748,
                        -1.0221248865127563
                    ],
                    "area": 0.6367615461349487,
                    "normal": [
                        -1.8721182470926578e-07,
                        -0.7664476633071899,
                        -0.6423067450523376
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.4901161193847656e-07,
                        1.394264817237854,
                        -1.2269794940948486
                    ],
                    "area": 0.6314970850944519,
                    "normal": [
                        7.078968877749503e-08,
                        0.37770065665245056,
                        -0.9259276986122131
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.550271213054657,
                        2.05086612701416,
                        1.1920928955078125e-07
                    ],
                    "area": 0.5754361152648926,
                    "normal": [
                        -1.0,
                        -0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5502721667289734,
                        2.05086612701416,
                        2.384185791015625e-07
                    ],
                    "area": 0.5754360556602478,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        4.76837158203125e-07,
                        2.487974166870117,
                        1.9371509552001953e-07
                    ],
                    "area": 0.6644389629364014,
                    "normal": [
                        0.0,
                        0.9999999403953552,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3972429037094116,
                        0.9716315865516663,
                        -0.7564758062362671
                    ],
                    "area": 0.6629590392112732,
                    "normal": [
                        1.0,
                        -3.2018141382650356e-07,
                        -1.2277671146421199e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.39724236726760864,
                        0.9716317653656006,
                        -0.7564758062362671
                    ],
                    "area": 0.6629589796066284,
                    "normal": [
                        -0.9999999403953552,
                        3.20181442248213e-07,
                        1.2277671146421199e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.39724308252334595,
                        0.9716312289237976,
                        0.7564759850502014
                    ],
                    "area": 0.6629588603973389,
                    "normal": [
                        1.0,
                        -3.6794892821490066e-07,
                        6.577709399380183e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.39724239706993103,
                        0.9716315269470215,
                        0.7564760446548462
                    ],
                    "area": 0.6629588603973389,
                    "normal": [
                        -1.0,
                        3.6794892821490066e-07,
                        -6.57771153100839e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.682209014892578e-07,
                        1.3784292936325073,
                        1.188159465789795
                    ],
                    "area": 0.648160994052887,
                    "normal": [
                        1.8391925493688177e-07,
                        0.3777005970478058,
                        0.9259277582168579
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.341104507446289e-07,
                        0.654639720916748,
                        -1.0221248865127563
                    ],
                    "area": 0.6367615461349487,
                    "normal": [
                        -1.8721182470926578e-07,
                        -0.7664476633071899,
                        -0.6423067450523376
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.4901161193847656e-07,
                        1.394264817237854,
                        -1.2269794940948486
                    ],
                    "area": 0.6314970850944519,
                    "normal": [
                        7.078968877749503e-08,
                        0.37770065665245056,
                        -0.9259276986122131
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.550271213054657,
                        2.05086612701416,
                        1.1920928955078125e-07
                    ],
                    "area": 0.5754361152648926,
                    "normal": [
                        -1.0,
                        -0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5502721667289734,
                        2.05086612701416,
                        2.384185791015625e-07
                    ],
                    "area": 0.5754360556602478,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
                }
            ]
        },
        "Engines_eng.strut.cylinda.000": {
            "collection": "Engines",
            "object_name": "eng.strut.cylinda.000",
            "dimensions": {
                "width": 1.7861719131469727,
                "height": 3.684535026550293,
                "depth": 5.292727470397949
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.3467075824737549,
                        5.960464477539063e-08,
                        0.007102370262145996
                    ],
                    "area": 0.725013256072998,
                    "normal": [
                        -1.0,
                        4.8025693644149214e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6710240840911865,
                        -1.7881393432617188e-07,
                        0.007102370262145996
                    ],
                    "area": 0.725013256072998,
                    "normal": [
                        1.0,
                        0.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6710240840911865,
                        -1.7881393432617188e-07,
                        0.007102370262145996
                    ],
                    "area": 0.725013256072998,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3467075526714325,
                        5.960464477539063e-08,
                        0.007102370262145996
                    ],
                    "area": 0.725013256072998,
                    "normal": [
                        1.0,
                        4.8025693644149214e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.05244634672999382,
                        1.4304704666137695,
                        1.3886677026748657
                    ],
                    "area": 0.4532032012939453,
                    "normal": [
                        -0.2588191032409668,
                        -0.5231203436851501,
                        0.8120085597038269
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.14328590035438538,
                        1.458873987197876,
                        1.344578504562378
                    ],
                    "area": 0.4532029330730438,
                    "normal": [
                        -0.7071072459220886,
                        -0.38295039534568787,
                        0.5944311618804932
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.14328567683696747,
                        1.4588738679885864,
                        1.344578742980957
                    ],
                    "area": 0.4532028138637543,
                    "normal": [
                        0.7071068286895752,
                        -0.3829505741596222,
                        0.594431459903717
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.1957319676876068,
                        1.5648770332336426,
                        1.1800360679626465
                    ],
                    "area": 0.4532027542591095,
                    "normal": [
                        0.9659260511398315,
                        0.14016912877559662,
                        -0.21757622063159943
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.19573190808296204,
                        1.5648772716522217,
                        1.1800358295440674
                    ],
                    "area": 0.45320266485214233,
                    "normal": [
                        -0.9659258723258972,
                        0.1401696652173996,
                        -0.2175770252943039
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.052446335554122925,
                        1.642477035522461,
                        1.0595824718475342
                    ],
                    "area": 0.45320263504981995,
                    "normal": [
                        0.25881943106651306,
                        0.5231201648712158,
                        -0.8120084404945374
                    ]
                }
            ]
        },
        "Engines_eng.strut.cylinda.001": {
            "collection": "Engines",
            "object_name": "eng.strut.cylinda.001",
            "dimensions": {
                "width": 1.7861719131469727,
                "height": 3.684535026550293,
                "depth": 5.292727470397949
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.3467075824737549,
                        5.960464477539063e-08,
                        0.007102370262145996
                    ],
                    "area": 0.725013256072998,
                    "normal": [
                        -1.0,
                        4.8025693644149214e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6710240840911865,
                        -1.7881393432617188e-07,
                        0.007102370262145996
                    ],
                    "area": 0.725013256072998,
                    "normal": [
                        1.0,
                        0.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6710240840911865,
                        -1.7881393432617188e-07,
                        0.007102370262145996
                    ],
                    "area": 0.725013256072998,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3467075526714325,
                        5.960464477539063e-08,
                        0.007102370262145996
                    ],
                    "area": 0.725013256072998,
                    "normal": [
                        1.0,
                        4.8025693644149214e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.05244634672999382,
                        1.4304704666137695,
                        1.3886677026748657
                    ],
                    "area": 0.4532032012939453,
                    "normal": [
                        -0.2588191032409668,
                        -0.5231203436851501,
                        0.8120085597038269
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.14328590035438538,
                        1.458873987197876,
                        1.344578504562378
                    ],
                    "area": 0.4532029330730438,
                    "normal": [
                        -0.7071072459220886,
                        -0.38295039534568787,
                        0.5944311618804932
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.14328567683696747,
                        1.4588738679885864,
                        1.344578742980957
                    ],
                    "area": 0.4532028138637543,
                    "normal": [
                        0.7071068286895752,
                        -0.3829505741596222,
                        0.594431459903717
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.1957319676876068,
                        1.5648770332336426,
                        1.1800360679626465
                    ],
                    "area": 0.4532027542591095,
                    "normal": [
                        0.9659260511398315,
                        0.14016912877559662,
                        -0.21757622063159943
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.19573190808296204,
                        1.5648772716522217,
                        1.1800358295440674
                    ],
                    "area": 0.45320266485214233,
                    "normal": [
                        -0.9659258723258972,
                        0.1401696652173996,
                        -0.2175770252943039
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.052446335554122925,
                        1.642477035522461,
                        1.0595824718475342
                    ],
                    "area": 0.45320263504981995,
                    "normal": [
                        0.25881943106651306,
                        0.5231201648712158,
                        -0.8120084404945374
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3704264461994171,
                        -0.07368243485689163,
                        0.48937904834747314
                    ],
                    "area": 0.03795047476887703,
                    "normal": [
                        -0.9807852506637573,
                        -0.19509093463420868,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3704264760017395,
                        0.07368243485689163,
                        0.48937904834747314
                    ],
                    "area": 0.03795047104358673,
                    "normal": [
                        -0.9807852506637573,
                        0.19509074091911316,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.20982959866523743,
                        0.3140324652194977,
                        0.48937904834747314
                    ],
                    "area": 0.03795047104358673,
                    "normal": [
                        -0.555570125579834,
                        0.831469714641571,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.31403231620788574,
                        0.20982980728149414,
                        0.48937904834747314
                    ],
                    "area": 0.037950463593006134,
                    "normal": [
                        -0.8314694762229919,
                        0.5555706024169922,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07368240505456924,
                        0.3704264760017395,
                        0.48937904834747314
                    ],
                    "area": 0.037950459867715836,
                    "normal": [
                        0.19509099423885345,
                        0.9807851910591125,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3704264461994171,
                        0.07368239015340805,
                        0.48937904834747314
                    ],
                    "area": 0.037950459867715836,
                    "normal": [
                        0.9807851910591125,
                        0.19509099423885345,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2098296582698822,
                        -0.3140324652194977,
                        0.48937904834747314
                    ],
                    "area": 0.037950459867715836,
                    "normal": [
                        -0.5555703043937683,
                        -0.8314696550369263,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3704264760017395,
                        -0.07368241250514984,
                        0.48937904834747314
                    ],
                    "area": 0.03795045614242554,
                    "normal": [
                        0.980785071849823,
                        -0.19509099423885345,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.31403231620788574,
                        -0.20982980728149414,
                        0.48937904834747314
                    ],
                    "area": 0.03795045614242554,
                    "normal": [
                        -0.8314696550369263,
                        -0.5555703043937683,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07368243485689163,
                        -0.3704264461994171,
                        0.48937904834747314
                    ],
                    "area": 0.03795044869184494,
                    "normal": [
                        0.19509105384349823,
                        -0.980785071849823,
                        0.0
                    ]
                }
            ]
        },
        "Greebly_portalblock": {
            "collection": "Greebly",
            "object_name": "portalblock",
            "dimensions": {
                "width": 0.9270903468132019,
                "height": 0.9876039624214172,
                "depth": 2.0067198276519775
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        5.662441253662109e-07,
                        0.7873976826667786,
                        -0.030748486518859863
                    ],
                    "area": 4.07344913482666,
                    "normal": [
                        2.726106345107837e-07,
                        1.0,
                        2.0395548006035824e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.086162567138672e-07,
                        0.70068359375,
                        -0.030748605728149414
                    ],
                    "area": 4.073448181152344,
                    "normal": [
                        -2.726106345107837e-07,
                        -1.0,
                        -2.0395550848206767e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.2351741790771484e-07,
                        -0.9999999403953552,
                        0.0
                    ],
                    "area": 3.391643524169922,
                    "normal": [
                        -2.987574987400876e-07,
                        -1.0,
                        -7.450584149637507e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.2351741790771484e-07,
                        1.0,
                        0.0
                    ],
                    "area": 3.391643524169922,
                    "normal": [
                        2.6360956439930305e-07,
                        1.0,
                        1.9371509552001953e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.2814998626708984e-06,
                        0.9405778646469116,
                        -0.44035011529922485
                    ],
                    "area": 2.7219977378845215,
                    "normal": [
                        2.7051146389567293e-07,
                        0.9999999403953552,
                        1.7369576710279944e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        9.5367431640625e-07,
                        0.8538636565208435,
                        -0.440350204706192
                    ],
                    "area": 2.7219972610473633,
                    "normal": [
                        -2.4045462510002835e-07,
                        -0.9999999403953552,
                        -1.7369578131365415e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6123369932174683,
                        -0.6557079553604126,
                        0.22504067420959473
                    ],
                    "area": 1.7501050233840942,
                    "normal": [
                        -2.64173763753206e-07,
                        -1.0,
                        -1.229493875598564e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6123369932174683,
                        0.6557079553604126,
                        0.22504067420959473
                    ],
                    "area": 1.7501050233840942,
                    "normal": [
                        -2.64173763753206e-07,
                        1.0,
                        -1.229493875598564e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6123369932174683,
                        0.6557079553604126,
                        0.22504067420959473
                    ],
                    "area": 1.7501050233840942,
                    "normal": [
                        2.64173763753206e-07,
                        1.0,
                        -1.229493875598564e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6123369932174683,
                        -0.6557079553604126,
                        0.22504067420959473
                    ],
                    "area": 1.7501050233840942,
                    "normal": [
                        2.64173763753206e-07,
                        -1.0,
                        -1.229493875598564e-07
                    ]
                }
            ]
        },
        "Greebly_misc": {
            "collection": "Greebly",
            "object_name": "misc",
            "dimensions": {
                "width": 0.7940084934234619,
                "height": 2.3288376331329346,
                "depth": 4.65014123916626
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.39026516675949097,
                        -5.1859049797058105,
                        1.6244821548461914
                    ],
                    "area": 0.7189162969589233,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.3902653455734253,
                        -5.178342342376709,
                        1.5185356140136719
                    ],
                    "area": 0.718916118144989,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.26945921778678894,
                        4.470348358154297e-08,
                        0.0
                    ],
                    "area": 0.63013756275177,
                    "normal": [
                        -1.0,
                        9.695647662510964e-08,
                        -2.9074884722035677e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5462885499000549,
                        0.3073781728744507,
                        0.0
                    ],
                    "area": 0.46911752223968506,
                    "normal": [
                        0.9737241268157959,
                        0.2230105847120285,
                        -0.04612690210342407
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5462884902954102,
                        -0.3073786497116089,
                        0.0
                    ],
                    "area": 0.4691174626350403,
                    "normal": [
                        0.9737240076065063,
                        -0.2230108082294464,
                        -0.04612693190574646
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.26945918798446655,
                        -0.307378351688385,
                        0.0
                    ],
                    "area": 0.4567909836769104,
                    "normal": [
                        -1.0,
                        4.8478234759841143e-08,
                        -7.018979886197485e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.26945924758911133,
                        0.3073784410953522,
                        0.0
                    ],
                    "area": 0.4567909836769104,
                    "normal": [
                        -1.0,
                        4.8478234759841143e-08,
                        -1.0027110697308217e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6384485960006714,
                        -2.7567148208618164e-07,
                        0.3062654733657837
                    ],
                    "area": 0.44193604588508606,
                    "normal": [
                        0.9998252987861633,
                        0.0,
                        -0.018692340701818466
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.26945483684539795,
                        -2.5980513095855713,
                        1.7859978675842285
                    ],
                    "area": 0.4121558964252472,
                    "normal": [
                        -1.0,
                        1.9940428046538727e-06,
                        -5.652561299029912e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.2972978949546814,
                        -6.502781391143799,
                        2.05885910987854
                    ],
                    "area": 0.36356088519096375,
                    "normal": [
                        9.42694157402002e-07,
                        -0.022084439173340797,
                        0.9997561573982239
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        2.9802322387695312e-08,
                        3.5762786865234375e-07,
                        -1.0
                    ],
                    "area": 8.785726547241211,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.4901161193847656e-07,
                        -2.384185791015625e-07,
                        1.0
                    ],
                    "area": 8.785726547241211,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.749731719493866,
                        0.0,
                        2.682209014892578e-07
                    ],
                    "area": 7.421270370483398,
                    "normal": [
                        1.0,
                        -5.76589727074861e-08,
                        -2.324732406577823e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7497316598892212,
                        0.0,
                        -2.086162567138672e-07
                    ],
                    "area": 7.421270370483398,
                    "normal": [
                        -1.0,
                        1.4414712090626836e-08,
                        2.6568369548840565e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9087861776351929,
                        -4.76837158203125e-07,
                        0.0
                    ],
                    "area": 7.388299942016602,
                    "normal": [
                        1.0,
                        -1.3031173295985354e-07,
                        6.642083150154576e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9087862968444824,
                        5.960464477539062e-07,
                        0.0
                    ],
                    "area": 7.388299942016602,
                    "normal": [
                        -1.0,
                        1.2307218355545047e-07,
                        -1.494469756835315e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.470348358154297e-08,
                        3.5762786865234375e-07,
                        1.1851252317428589
                    ],
                    "area": 6.086465835571289,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        8.940696716308594e-08,
                        1.0
                    ],
                    "area": 6.086465835571289,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        8.940696716308594e-08,
                        -1.1851252317428589
                    ],
                    "area": 6.086465835571289,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.470348358154297e-08,
                        3.5762786865234375e-07,
                        -1.0
                    ],
                    "area": 6.086465835571289,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                }
            ]
        },
        "Greebly_AngledRib-block": {
            "collection": "Greebly",
            "object_name": "AngledRib-block",
            "dimensions": {
                "width": 0.28113213181495667,
                "height": 0.3804451525211334,
                "depth": 1.1540606021881104
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -1.7881393432617188e-07,
                        -5.262197017669678,
                        0.7485983371734619
                    ],
                    "area": 5.556642532348633,
                    "normal": [
                        -4.5016216176918533e-07,
                        -1.0,
                        6.817416675630739e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.9802322387695312e-08,
                        -4.302501678466797,
                        -1.0
                    ],
                    "area": 3.8387808799743652,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.9802322387695312e-08,
                        -0.4637221693992615,
                        -1.0
                    ],
                    "area": 3.838780164718628,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.4901161193847656e-07,
                        5.294447898864746,
                        -1.0
                    ],
                    "area": 3.8387796878814697,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.341104507446289e-07,
                        3.3750576972961426,
                        -1.0
                    ],
                    "area": 3.8387794494628906,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        7.450580596923828e-08,
                        1.4556679725646973,
                        -1.0
                    ],
                    "area": 3.8387794494628906,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.4901161193847656e-08,
                        -2.3831121921539307,
                        -1.0
                    ],
                    "area": 3.8387789726257324,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1301395893096924,
                        -4.272975444793701,
                        0.8310820460319519
                    ],
                    "area": 3.761253833770752,
                    "normal": [
                        0.9881699085235596,
                        0.026705514639616013,
                        0.15101966261863708
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1301395893096924,
                        -4.272974967956543,
                        0.8310820460319519
                    ],
                    "area": 3.7612533569335938,
                    "normal": [
                        -0.9881699681282043,
                        0.026705708354711533,
                        0.15101952850818634
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1285642385482788,
                        -2.353276014328003,
                        0.6509281396865845
                    ],
                    "area": 3.541398763656616,
                    "normal": [
                        -0.9852722883224487,
                        0.02844243496656418,
                        0.16861040890216827
                    ]
                }
            ]
        },
        "Greebly_SplitMast": {
            "collection": "Greebly",
            "object_name": "SplitMast",
            "dimensions": {
                "width": 0.49948328733444214,
                "height": 0.4251367449760437,
                "depth": 0.3319009840488434
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.862645149230957e-09,
                        0.028716683387756348,
                        -0.12120279669761658
                    ],
                    "area": 0.06208638474345207,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.12105511128902435,
                        0.03497254103422165,
                        -0.035302020609378815
                    ],
                    "area": 0.03977019712328911,
                    "normal": [
                        -1.0,
                        0.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.12105511128902435,
                        0.03497254103422165,
                        -0.035302020609378815
                    ],
                    "area": 0.03977019339799881,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.04036153852939606,
                        0.03497254103422165,
                        -0.035302020609378815
                    ],
                    "area": 0.03977019339799881,
                    "normal": [
                        -1.0,
                        -0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.04036153852939606,
                        0.03497254103422165,
                        -0.035302020609378815
                    ],
                    "area": 0.03977019339799881,
                    "normal": [
                        1.0,
                        0.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.13574248552322388,
                        0.030154995620250702,
                        -0.12120279669761658
                    ],
                    "area": 0.031356051564216614,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.1357424557209015,
                        0.027278436347842216,
                        -0.12120279669761658
                    ],
                    "area": 0.031356051564216614,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0807083249092102,
                        -0.03274101763963699,
                        -0.032269492745399475
                    ],
                    "area": 0.02416539192199707,
                    "normal": [
                        0.0,
                        -0.9996035695075989,
                        0.02815306931734085
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.0807083249092102,
                        -0.03274101763963699,
                        -0.032269492745399475
                    ],
                    "area": 0.02416539192199707,
                    "normal": [
                        0.0,
                        -0.9996035695075989,
                        0.02815306931734085
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0807083249092102,
                        0.1026860922574997,
                        -0.038334548473358154
                    ],
                    "area": 0.023186977952718735,
                    "normal": [
                        0.0,
                        0.9995695352554321,
                        -0.029341047629714012
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2067849040031433,
                        0.19037583470344543,
                        0.093846395611763
                    ],
                    "area": 0.030459975823760033,
                    "normal": [
                        0.8526409268379211,
                        0.5224972367286682,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2635064125061035,
                        0.11230538040399551,
                        0.093846395611763
                    ],
                    "area": 0.030459973961114883,
                    "normal": [
                        -0.23344449698925018,
                        -0.9723701477050781,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.006832599639892578,
                        0.25978437066078186,
                        0.093846395611763
                    ],
                    "area": 0.030459973961114883,
                    "normal": [
                        -0.9969172477722168,
                        -0.07846014201641083,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2635064125061035,
                        -0.11230535805225372,
                        0.093846395611763
                    ],
                    "area": 0.030459966510534286,
                    "normal": [
                        -0.2334435135126114,
                        0.9723703861236572,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.09860992431640625,
                        0.22996410727500916,
                        0.093846395611763
                    ],
                    "area": 0.030459964647889137,
                    "normal": [
                        0.7604057192802429,
                        -0.6494483947753906,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2067849040031433,
                        -0.19037580490112305,
                        0.093846395611763
                    ],
                    "area": 0.0304599367082119,
                    "normal": [
                        0.8526406288146973,
                        -0.5224978923797607,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.09860992431640625,
                        -0.22996407747268677,
                        0.093846395611763
                    ],
                    "area": 0.0304599329829216,
                    "normal": [
                        0.7604050040245056,
                        0.6494489908218384,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.006832599639892578,
                        -0.2597843408584595,
                        0.093846395611763
                    ],
                    "area": 0.030459893867373466,
                    "normal": [
                        -0.9969172477722168,
                        0.07846036553382874,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.23063278198242188,
                        0.04825019836425781,
                        0.093846395611763
                    ],
                    "area": 0.03045988827943802,
                    "normal": [
                        -0.38268396258354187,
                        0.9238793253898621,
                        -3.9174700816602126e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.27060461044311523,
                        0.048250216990709305,
                        0.093846395611763
                    ],
                    "area": 0.030459880828857422,
                    "normal": [
                        0.38268333673477173,
                        0.9238795638084412,
                        0.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.0593341588973999,
                        4.76837158203125e-07,
                        -0.11306285858154297
                    ],
                    "area": 0.3612979054450989,
                    "normal": [
                        -0.4539894461631775,
                        0.0,
                        0.891007125377655
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11306202411651611,
                        4.76837158203125e-07,
                        0.059333205223083496
                    ],
                    "area": 0.3612971007823944,
                    "normal": [
                        0.8910066485404968,
                        0.0,
                        -0.4539903998374939
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.021194934844970703,
                        4.76837158203125e-07,
                        0.1277409791946411
                    ],
                    "area": 0.36129602789878845,
                    "normal": [
                        -0.15643449127674103,
                        0.0,
                        -0.9876883029937744
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.12774181365966797,
                        4.76837158203125e-07,
                        0.021194875240325928
                    ],
                    "area": 0.36129483580589294,
                    "normal": [
                        -0.987687885761261,
                        0.0,
                        -0.15643741190433502
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.08949053287506104,
                        4.76837158203125e-07,
                        -0.08949154615402222
                    ],
                    "area": 0.36129429936408997,
                    "normal": [
                        0.7071049809455872,
                        0.0,
                        0.7071086168289185
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.10868412256240845,
                        0.0,
                        -0.05365115404129028
                    ],
                    "area": 0.19565679132938385,
                    "normal": [
                        -0.8910071849822998,
                        0.0,
                        0.4539892375469208
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11806565523147583,
                        0.0,
                        -0.0177384614944458
                    ],
                    "area": 0.19565413892269135,
                    "normal": [
                        0.9876877665519714,
                        0.0,
                        0.15643787384033203
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.053650617599487305,
                        0.0,
                        0.10868310928344727
                    ],
                    "area": 0.19565387070178986,
                    "normal": [
                        0.4539937674999237,
                        0.0,
                        -0.8910048604011536
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.08648806810379028,
                        0.0,
                        0.0864875316619873
                    ],
                    "area": 0.1956530511379242,
                    "normal": [
                        -0.707103431224823,
                        0.0,
                        -0.7071101069450378
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.017737507820129395,
                        0.0,
                        -0.11806643009185791
                    ],
                    "area": 0.1956523358821869,
                    "normal": [
                        0.15643709897994995,
                        0.0,
                        0.9876879453659058
                    ]
                }
            ]
        },
        "Greebly_DishPanel": {
            "collection": "Greebly",
            "object_name": "DishPanel",
            "dimensions": {
                "width": 0.25276005268096924,
                "height": 0.4754391014575958,
                "depth": 0.2654489576816559
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        6.23464584350586e-05,
                        -0.03473693132400513,
                        0.5446391105651855
                    ],
                    "area": 0.04438323900103569,
                    "normal": [
                        0.0,
                        -0.9042475819587708,
                        -0.42700865864753723
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        6.236881017684937e-05,
                        0.04111480712890625,
                        0.3840128183364868
                    ],
                    "area": 0.04438314214348793,
                    "normal": [
                        0.0,
                        -0.9042475819587708,
                        -0.42700856924057007
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        6.239116191864014e-05,
                        0.11696654558181763,
                        0.22338664531707764
                    ],
                    "area": 0.04438311606645584,
                    "normal": [
                        0.0,
                        -0.9042479395866394,
                        -0.427007794380188
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        6.230920553207397e-05,
                        -0.11058878898620605,
                        0.7052657604217529
                    ],
                    "area": 0.044383078813552856,
                    "normal": [
                        0.0,
                        -0.9042471647262573,
                        -0.42700934410095215
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09457430988550186,
                        -0.030351489782333374,
                        0.7431557178497314
                    ],
                    "area": 0.02871854603290558,
                    "normal": [
                        -2.756491142008599e-07,
                        0.9042478203773499,
                        0.42700812220573425
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.09469933062791824,
                        -0.030351489782333374,
                        0.7431557178497314
                    ],
                    "area": 0.02871854603290558,
                    "normal": [
                        2.756491142008599e-07,
                        0.9042478203773499,
                        0.42700812220573425
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09457433223724365,
                        0.04550039768218994,
                        0.5825291872024536
                    ],
                    "area": 0.028718499466776848,
                    "normal": [
                        5.350844958229573e-07,
                        0.9042476415634155,
                        0.42700842022895813
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.09469928592443466,
                        0.04550039768218994,
                        0.5825291872024536
                    ],
                    "area": 0.0287184938788414,
                    "normal": [
                        -5.350845526663761e-07,
                        0.9042476415634155,
                        0.42700842022895813
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09457435458898544,
                        0.1972038745880127,
                        0.26127660274505615
                    ],
                    "area": 0.02871849201619625,
                    "normal": [
                        0.0,
                        0.9042476415634155,
                        0.42700839042663574
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.09469921886920929,
                        0.1972038745880127,
                        0.26127660274505615
                    ],
                    "area": 0.028718486428260803,
                    "normal": [
                        0.0,
                        0.9042475819587708,
                        0.42700836062431335
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.12204813957214355,
                        0.1822029948234558,
                        -0.08696556091308594
                    ],
                    "area": 0.005978967994451523,
                    "normal": [
                        -0.5735747218132019,
                        0.8191531896591187,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0985875129699707,
                        0.13753283023834229,
                        -0.08696556091308594
                    ],
                    "area": 0.005978964734822512,
                    "normal": [
                        -0.601813793182373,
                        -0.7986364960670471,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.15553370118141174,
                        -0.04040491580963135,
                        -0.08696556091308594
                    ],
                    "area": 0.005978959146887064,
                    "normal": [
                        0.9563045501708984,
                        0.29237231612205505,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.202342689037323,
                        -0.06224328279495239,
                        -0.08696556091308594
                    ],
                    "area": 0.005978952161967754,
                    "normal": [
                        0.9455187916755676,
                        -0.32556766271591187,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.20377686619758606,
                        -0.055154383182525635,
                        -0.08696556091308594
                    ],
                    "area": 0.005978951696306467,
                    "normal": [
                        -0.9563044309616089,
                        -0.2923727333545685,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09311255812644958,
                        0.1408788561820984,
                        -0.08696556091308594
                    ],
                    "area": 0.005978950299322605,
                    "normal": [
                        0.5735763311386108,
                        -0.8191521167755127,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.1289476752281189,
                        0.17782187461853027,
                        -0.08696556091308594
                    ],
                    "area": 0.00597894424572587,
                    "normal": [
                        0.6018157601356506,
                        0.7986350059509277,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.15464359521865845,
                        -0.04581916332244873,
                        -0.08696556091308594
                    ],
                    "area": 0.005978943780064583,
                    "normal": [
                        -0.9455185532569885,
                        0.3255680799484253,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.0032923519611358643,
                        -0.20623046159744263,
                        -0.08696556091308594
                    ],
                    "area": 0.0059789433144032955,
                    "normal": [
                        -0.01745319552719593,
                        -0.9998476505279541,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.002411872148513794,
                        -0.1557905673980713,
                        -0.08696556091308594
                    ],
                    "area": 0.0059789433144032955,
                    "normal": [
                        0.01745181530714035,
                        0.9998476505279541,
                        0.0
                    ]
                }
            ]
        },
        "Greebly_ResBlock": {
            "collection": "Greebly",
            "object_name": "ResBlock",
            "dimensions": {
                "width": 0.8429183959960938,
                "height": 0.42243167757987976,
                "depth": 2.4232215881347656
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.42096465826034546,
                        0.0002626180648803711,
                        -0.022870182991027832
                    ],
                    "area": 4.030613422393799,
                    "normal": [
                        -1.0,
                        2.2380270081612252e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.42096465826034546,
                        0.0002626180648803711,
                        -0.022870182991027832
                    ],
                    "area": 4.030613422393799,
                    "normal": [
                        1.0,
                        2.2380270081612252e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        0.0002626180648803711,
                        0.9230105876922607
                    ],
                    "area": 1.7938262224197388,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        0.0002626180648803711,
                        -0.9687509536743164
                    ],
                    "area": 1.7938262224197388,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        -1.0257625579833984,
                        -0.022870182991027832
                    ],
                    "area": 1.1416010856628418,
                    "normal": [
                        0.0,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        1.0262877941131592,
                        -0.022870182991027832
                    ],
                    "area": 1.1415995359420776,
                    "normal": [
                        0.0,
                        1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.4901161193847656e-08,
                        0.09264179319143295,
                        1.0
                    ],
                    "area": 0.7826247215270996,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.4901161193847656e-08,
                        -0.4787867069244385,
                        1.0
                    ],
                    "area": 0.7826247215270996,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        0.6640702486038208,
                        1.0
                    ],
                    "area": 0.782624363899231,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        0.6598851680755615,
                        0.9035618305206299
                    ],
                    "area": 0.6470722556114197,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.21492505073547363,
                        -0.14518305659294128,
                        -0.08382147550582886
                    ],
                    "area": 0.01632891595363617,
                    "normal": [
                        0.0,
                        -0.8660256862640381,
                        -0.4999995827674866
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.21492505073547363,
                        -0.14518305659294128,
                        -0.08382147550582886
                    ],
                    "area": 0.01632891409099102,
                    "normal": [
                        0.0,
                        -0.8660256862640381,
                        -0.4999995827674866
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3524838089942932,
                        -0.14518305659294128,
                        -0.08382147550582886
                    ],
                    "area": 0.01632891409099102,
                    "normal": [
                        0.0,
                        -0.8660256862640381,
                        -0.49999964237213135
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.07736632972955704,
                        -0.14518305659294128,
                        -0.08382147550582886
                    ],
                    "area": 0.01632891222834587,
                    "normal": [
                        0.0,
                        -0.8660256862640381,
                        -0.49999964237213135
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07736632972955704,
                        -0.14518305659294128,
                        -0.08382147550582886
                    ],
                    "area": 0.01632891222834587,
                    "normal": [
                        0.0,
                        -0.8660256862640381,
                        -0.49999964237213135
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3524838089942932,
                        -0.14518305659294128,
                        -0.08382147550582886
                    ],
                    "area": 0.01632891222834587,
                    "normal": [
                        0.0,
                        -0.8660256862640381,
                        -0.49999964237213135
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.21492505073547363,
                        1.1920928955078125e-07,
                        -0.16764310002326965
                    ],
                    "area": 0.016328908503055573,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.21492505073547363,
                        1.1920928955078125e-07,
                        -0.16764310002326965
                    ],
                    "area": 0.016328908503055573,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.21492505073547363,
                        0.1451832503080368,
                        0.08382155001163483
                    ],
                    "area": 0.016328906640410423,
                    "normal": [
                        0.0,
                        0.8660257458686829,
                        0.4999993145465851
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.21492505073547363,
                        0.1451832503080368,
                        0.08382155001163483
                    ],
                    "area": 0.016328906640410423,
                    "normal": [
                        0.0,
                        0.8660257458686829,
                        0.4999993145465851
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.16561900079250336,
                        0.01969444751739502,
                        -1.2665987014770508e-07
                    ],
                    "area": 0.7456717491149902,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.16561882197856903,
                        0.01969444751739502,
                        -5.960464477539063e-08
                    ],
                    "area": 0.7456716895103455,
                    "normal": [
                        -1.0,
                        -0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.34586259722709656,
                        0.05256307125091553,
                        -8.940696716308594e-08
                    ],
                    "area": 0.6813685894012451,
                    "normal": [
                        1.0,
                        -0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.34586232900619507,
                        0.05256307125091553,
                        -1.4156103134155273e-07
                    ],
                    "area": 0.6813685297966003,
                    "normal": [
                        -1.0,
                        -4.171268297675605e-14,
                        -1.0860904922083137e-06
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.11898364126682281,
                        0.05256295204162598,
                        0.44870173931121826
                    ],
                    "area": 0.18627287447452545,
                    "normal": [
                        0.49999988079071045,
                        0.0,
                        0.866025447845459
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11898359656333923,
                        0.05256319046020508,
                        -0.4487018287181854
                    ],
                    "area": 0.18627268075942993,
                    "normal": [
                        -0.49999913573265076,
                        0.0,
                        -0.8660258650779724
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.4901161193847656e-07,
                        0.05256295204162598,
                        0.4805833101272583
                    ],
                    "area": 0.18627256155014038,
                    "normal": [
                        -9.347817240268341e-07,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1920928955078125e-07,
                        0.05256319046020508,
                        -0.4805833697319031
                    ],
                    "area": 0.186272531747818,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.11898376047611237,
                        0.05256319046020508,
                        -0.4487018585205078
                    ],
                    "area": 0.1862725019454956,
                    "normal": [
                        0.49999961256980896,
                        0.0,
                        -0.8660255670547485
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.11898374557495117,
                        0.05256295204162598,
                        0.4487016797065735
                    ],
                    "area": 0.1862722933292389,
                    "normal": [
                        -0.5000004768371582,
                        0.0,
                        0.8660251498222351
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        1.056178092956543,
                        -4.472515106201172,
                        1.3786684274673462
                    ],
                    "area": 7.033740997314453,
                    "normal": [
                        0.9960851669311523,
                        -0.08839969336986542,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.056178092956543,
                        -4.472515106201172,
                        1.3786684274673462
                    ],
                    "area": 7.033740997314453,
                    "normal": [
                        -0.9960851669311523,
                        -0.08839969336986542,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1980386972427368,
                        4.654153823852539,
                        0.9709427952766418
                    ],
                    "area": 5.699965476989746,
                    "normal": [
                        1.0,
                        -0.00018294743495061994,
                        0.0003129086398985237
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1980386972427368,
                        4.654153823852539,
                        0.9709427952766418
                    ],
                    "area": 5.699965476989746,
                    "normal": [
                        -1.0,
                        -0.00018294743495061994,
                        0.0003129086398985237
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9690026640892029,
                        -4.47251558303833,
                        -0.25062400102615356
                    ],
                    "area": 3.4485931396484375,
                    "normal": [
                        0.9823416471481323,
                        -0.09486540406942368,
                        -0.16126178205013275
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9690026640892029,
                        -4.472515106201172,
                        -0.25062400102615356
                    ],
                    "area": 3.4485931396484375,
                    "normal": [
                        -0.9823416471481323,
                        -0.09486540406942368,
                        -0.16126178205013275
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.3551371097564697,
                        0.28873467445373535,
                        2.2308669090270996
                    ],
                    "area": 3.15039324760437,
                    "normal": [
                        -0.9999995231628418,
                        -0.0006081227329559624,
                        0.0007881265482865274
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.3551371097564697,
                        0.28873467445373535,
                        2.2308669090270996
                    ],
                    "area": 3.150393009185791,
                    "normal": [
                        0.9999995231628418,
                        -0.0006081227329559624,
                        0.0007881265482865274
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.8900755643844604,
                        -1.1385291814804077,
                        -1.5386085510253906
                    ],
                    "area": 3.093756675720215,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.8900755643844604,
                        -1.1385290622711182,
                        -1.5386085510253906
                    ],
                    "area": 3.093756675720215,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -1.7172988653182983,
                        -1.7482166290283203
                    ],
                    "area": 4.226412773132324,
                    "normal": [
                        0.0,
                        -0.014944660477340221,
                        0.9998883008956909
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7460012435913086,
                        -1.6264938116073608,
                        -1.3581552505493164
                    ],
                    "area": 3.949622392654419,
                    "normal": [
                        -0.8421972990036011,
                        -0.012327738106250763,
                        0.5390287041664124
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7460012435913086,
                        -1.6264936923980713,
                        -1.358155369758606
                    ],
                    "area": 3.9496216773986816,
                    "normal": [
                        0.8421972393989563,
                        -0.01232774555683136,
                        0.5390287041664124
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3962181806564331,
                        0.6057372689247131,
                        1.857350468635559
                    ],
                    "area": 3.114178419113159,
                    "normal": [
                        0.9015136957168579,
                        0.03251921758055687,
                        -0.4315268397331238
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3962181806564331,
                        0.6057373285293579,
                        1.857350468635559
                    ],
                    "area": 3.11417818069458,
                    "normal": [
                        -0.9015136957168579,
                        0.03251921758055687,
                        -0.4315268397331238
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9876363277435303,
                        -1.7387309074401855,
                        0.038028962910175323
                    ],
                    "area": 2.942470073699951,
                    "normal": [
                        -0.9996930360794067,
                        0.00855171401053667,
                        -0.02325417846441269
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.987636387348175,
                        -1.7387309074401855,
                        0.038028962910175323
                    ],
                    "area": 2.942470073699951,
                    "normal": [
                        0.9996930360794067,
                        0.00855171401053667,
                        -0.02325417846441269
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.809978723526001,
                        -1.613885521888733,
                        0.7952026128768921
                    ],
                    "area": 2.647245407104492,
                    "normal": [
                        0.9508479833602905,
                        0.02066127583384514,
                        0.30896782875061035
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.809978723526001,
                        -1.6138854026794434,
                        0.7952026128768921
                    ],
                    "area": 2.647245168685913,
                    "normal": [
                        -0.9508479833602905,
                        0.02066127583384514,
                        0.30896782875061035
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4627097249031067,
                        2.7942323684692383,
                        -0.48850131034851074
                    ],
                    "area": 2.6371636390686035,
                    "normal": [
                        0.863017737865448,
                        -3.333765334900818e-07,
                        0.5051736235618591
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        7.450580596923828e-09,
                        -2.1449155807495117,
                        0.15304528176784515
                    ],
                    "area": 0.3512657880783081,
                    "normal": [
                        0.0,
                        1.0,
                        -5.170566623746709e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -0.08286075294017792,
                        0.8346891403198242
                    ],
                    "area": 0.2785229980945587,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.47227609157562256,
                        -1.4268485307693481,
                        0.022642720490694046
                    ],
                    "area": 0.23471692204475403,
                    "normal": [
                        1.0,
                        -5.654742199112661e-05,
                        9.609928383724764e-05
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.47225865721702576,
                        -1.4273064136505127,
                        0.022641386836767197
                    ],
                    "area": 0.2344180941581726,
                    "normal": [
                        -1.0,
                        -5.826740107295336e-06,
                        1.0471866517036688e-05
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.38879379630088806,
                        0.1615293025970459,
                        -0.6742123365402222
                    ],
                    "area": 0.23287610709667206,
                    "normal": [
                        -0.8946735262870789,
                        -0.009805446490645409,
                        -0.4466129541397095
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3889696002006531,
                        0.15622133016586304,
                        -0.6809319257736206
                    ],
                    "area": 0.23110009729862213,
                    "normal": [
                        0.8879538178443909,
                        0.0021783995907753706,
                        -0.4599275290966034
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4720611572265625,
                        -0.7676613330841064,
                        -0.004909012466669083
                    ],
                    "area": 0.2296759933233261,
                    "normal": [
                        0.9999994039535522,
                        0.0006746813305653632,
                        -0.0009721164824441075
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.47218018770217896,
                        -0.7628241181373596,
                        0.0017963461577892303
                    ],
                    "area": 0.22442111372947693,
                    "normal": [
                        -0.9999998807907104,
                        0.00023401154612656683,
                        -0.00039057427784428
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -3.725290298461914e-09,
                        -0.675048828125,
                        0.7559959888458252
                    ],
                    "area": 0.22236596047878265,
                    "normal": [
                        1.6752970566358272e-07,
                        -0.2934786081314087,
                        0.9559656381607056
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        -2.0431971549987793,
                        -0.17922687530517578
                    ],
                    "area": 0.21916867792606354,
                    "normal": [
                        8.498681758339899e-09,
                        0.7071071863174438,
                        0.7071064114570618
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        1.0862517356872559,
                        -1.1191517114639282,
                        -0.8623903393745422
                    ],
                    "area": 2.535686492919922,
                    "normal": [
                        -0.9999955296516418,
                        0.0017784929368644953,
                        0.0024166645016521215
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.086251974105835,
                        -1.11915123462677,
                        -0.8623903393745422
                    ],
                    "area": 2.5356862545013428,
                    "normal": [
                        0.9999955296516418,
                        0.0017779214540496469,
                        0.0024168211966753006
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.682209014892578e-07,
                        0.7586509585380554,
                        -1.6567246913909912
                    ],
                    "area": 1.5583148002624512,
                    "normal": [
                        4.781178120083496e-08,
                        0.1914980262517929,
                        -0.9814929962158203
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -5.513429641723633e-07,
                        -3.152989149093628,
                        -1.3357884883880615
                    ],
                    "area": 1.4398213624954224,
                    "normal": [
                        4.1397264283205004e-08,
                        0.43616750836372375,
                        0.8998655676841736
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -9.5367431640625e-07,
                        -4.092742919921875,
                        -0.3557456135749817
                    ],
                    "area": 1.1452375650405884,
                    "normal": [
                        6.806596388742037e-07,
                        0.99980628490448,
                        -0.019681433215737343
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        5.21540641784668e-07,
                        1.1095492839813232,
                        0.22470834851264954
                    ],
                    "area": 1.0468312501907349,
                    "normal": [
                        1.423453994675583e-07,
                        0.19509367644786835,
                        0.9807845950126648
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7261898517608643,
                        -3.1528944969177246,
                        -0.8452121019363403
                    ],
                    "area": 0.8740820288658142,
                    "normal": [
                        0.9802029132843018,
                        0.19000940024852753,
                        0.05566652491688728
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.726188600063324,
                        -3.152894973754883,
                        -0.8452119827270508
                    ],
                    "area": 0.8740820288658142,
                    "normal": [
                        -0.980202853679657,
                        0.1900097280740738,
                        0.055666226893663406
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.1175870895385742e-08,
                        -1.133264183998108,
                        0.3229272961616516
                    ],
                    "area": 0.8716166615486145,
                    "normal": [
                        -5.769901534335986e-08,
                        0.012733867391943932,
                        -0.9999189376831055
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.40672269463539124,
                        -1.201913833618164,
                        0.2549830675125122
                    ],
                    "area": 0.8496187925338745,
                    "normal": [
                        0.31658488512039185,
                        0.0064558107405900955,
                        -0.9485422372817993
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4327581524848938,
                        1.9741051197052002,
                        -1.4226912260055542
                    ],
                    "area": 2.5986952781677246,
                    "normal": [
                        -0.9256699681282043,
                        -0.0009376676171086729,
                        -0.3783307373523712
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4327581524848938,
                        1.9741051197052002,
                        -1.4226912260055542
                    ],
                    "area": 2.5986952781677246,
                    "normal": [
                        -0.9256699681282043,
                        0.0009376676171086729,
                        0.3783307373523712
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7196711897850037,
                        -4.474499702453613,
                        0.4440752863883972
                    ],
                    "area": 2.269608974456787,
                    "normal": [
                        -0.8694285750389099,
                        -0.49405866861343384,
                        3.93931181008611e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7196711897850037,
                        -4.474499702453613,
                        0.4440752863883972
                    ],
                    "area": 2.269608974456787,
                    "normal": [
                        -0.8694285750389099,
                        0.49405866861343384,
                        -3.93931181008611e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        2.0170364379882812,
                        -1.8453824520111084
                    ],
                    "area": 1.9561944007873535,
                    "normal": [
                        0.0,
                        0.0037513384595513344,
                        0.9999929666519165
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        -4.967815399169922,
                        0.4440751075744629
                    ],
                    "area": 1.7573649883270264,
                    "normal": [
                        0.0,
                        1.0,
                        -2.384185791015625e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9999991655349731,
                        3.7736597061157227,
                        -0.20801693201065063
                    ],
                    "area": 1.6612746715545654,
                    "normal": [
                        -0.9999999403953552,
                        6.896518698340515e-07,
                        -2.4791239638943807e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9999991655349731,
                        3.7736597061157227,
                        -0.20801693201065063
                    ],
                    "area": 1.6612746715545654,
                    "normal": [
                        -0.9999999403953552,
                        -6.896518698340515e-07,
                        2.4791239638943807e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -4.4745001792907715,
                        -0.5559247136116028
                    ],
                    "area": 1.420100212097168,
                    "normal": [
                        0.0,
                        -3.624736280016805e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -4.474499702453613,
                        1.4440752267837524
                    ],
                    "area": 1.4200999736785889,
                    "normal": [
                        0.0,
                        3.624736564233899e-07,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8274098634719849,
                        0.49571335315704346,
                        0.0
                    ],
                    "area": 4.502821922302246,
                    "normal": [
                        -1.0,
                        6.257258888808792e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8274098634719849,
                        0.49571335315704346,
                        0.0
                    ],
                    "area": 4.502821922302246,
                    "normal": [
                        1.0,
                        6.257258888808792e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8274099230766296,
                        -0.2930551767349243,
                        -2.1972029209136963
                    ],
                    "area": 3.9725823402404785,
                    "normal": [
                        -1.0,
                        1.0515839221625356e-07,
                        -1.0515836379454413e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8274099230766296,
                        -0.2930552065372467,
                        -2.1972029209136963
                    ],
                    "area": 3.9725823402404785,
                    "normal": [
                        1.0,
                        1.0515839221625356e-07,
                        -1.0515836379454413e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8274099230766296,
                        -1.5511783361434937,
                        5.933119297027588
                    ],
                    "area": 2.7275497913360596,
                    "normal": [
                        1.0,
                        1.8651113009582332e-07,
                        2.084047147907827e-14
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8274099230766296,
                        -1.5511783361434937,
                        -5.933119297027588
                    ],
                    "area": 2.7275497913360596,
                    "normal": [
                        -1.0,
                        1.8651113009582332e-07,
                        -2.084047147907827e-14
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8274099230766296,
                        -1.5511783361434937,
                        5.933119297027588
                    ],
                    "area": 2.7275495529174805,
                    "normal": [
                        -1.0,
                        1.8651113009582332e-07,
                        2.084047147907827e-14
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8274099230766296,
                        -1.5511783361434937,
                        -5.933119297027588
                    ],
                    "area": 2.7275495529174805,
                    "normal": [
                        1.0,
                        1.8651113009582332e-07,
                        -2.084047147907827e-14
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5763646960258484,
                        0.5771821737289429,
                        4.310397624969482
                    ],
                    "area": 2.2136664390563965,
                    "normal": [
                        -1.0,
                        -0.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5763646960258484,
                        0.5771821737289429,
                        4.310398101806641
                    ],
                    "area": 2.2136664390563965,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -1.3462953567504883,
                        -1.1531778573989868
                    ],
                    "area": 2.6413493156433105,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6027413606643677,
                        -1.7960877418518066,
                        0.669143557548523
                    ],
                    "area": 1.5763729810714722,
                    "normal": [
                        -0.928888201713562,
                        0.003427826566621661,
                        0.3703443109989166
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6027413606643677,
                        -1.7960877418518066,
                        0.669143557548523
                    ],
                    "area": 1.5763728618621826,
                    "normal": [
                        0.928888201713562,
                        0.003427826566621661,
                        0.3703443109989166
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.4901161193847656e-08,
                        1.3719961643218994,
                        -1.513121247291565
                    ],
                    "area": 1.5638114213943481,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        3.5142149925231934,
                        -0.3736615478992462
                    ],
                    "area": 1.5332261323928833,
                    "normal": [
                        0.0,
                        0.777887225151062,
                        -0.6284039616584778
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5989946126937866,
                        1.3318015336990356,
                        0.779373049736023
                    ],
                    "area": 1.4532155990600586,
                    "normal": [
                        -0.9576470851898193,
                        -0.042479537427425385,
                        0.2847936749458313
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5989946126937866,
                        1.3318015336990356,
                        0.779373049736023
                    ],
                    "area": 1.4532155990600586,
                    "normal": [
                        0.9576470851898193,
                        -0.042479537427425385,
                        0.2847936749458313
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6560966968536377,
                        2.6295387744903564,
                        0.9033621549606323
                    ],
                    "area": 1.3357168436050415,
                    "normal": [
                        -0.9721731543540955,
                        -5.5779644014819496e-08,
                        0.23426388204097748
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6560966372489929,
                        2.6295387744903564,
                        0.9033621549606323
                    ],
                    "area": 1.3357168436050415,
                    "normal": [
                        0.9721731543540955,
                        -5.5779644014819496e-08,
                        0.23426388204097748
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -0.09400975704193115,
                        1.0297064781188965
                    ],
                    "area": 1.2609426975250244,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        1.4901161193847656e-08,
                        2.777231216430664,
                        -0.4069642722606659
                    ],
                    "area": 3.086338520050049,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.6418405771255493,
                        2.1556241512298584,
                        -0.5549154877662659
                    ],
                    "area": 2.9730279445648193,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.6418405771255493,
                        2.1556241512298584,
                        -0.5549154877662659
                    ],
                    "area": 2.9730279445648193,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.641841173171997,
                        2.1556239128112793,
                        0.6337013840675354
                    ],
                    "area": 2.9730277061462402,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.641841173171997,
                        2.1556239128112793,
                        0.6337013840675354
                    ],
                    "area": 2.9730277061462402,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.4901161193847656e-08,
                        3.136108636856079,
                        0.5257793068885803
                    ],
                    "area": 2.8288838863372803,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6418414115905762,
                        -1.2663583755493164,
                        -0.8715246915817261
                    ],
                    "area": 2.262965679168701,
                    "normal": [
                        -2.6339170844380533e-08,
                        -0.23089823126792908,
                        -0.9729779362678528
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6418414115905762,
                        -1.2663583755493164,
                        -0.8715246915817261
                    ],
                    "area": 2.262965679168701,
                    "normal": [
                        2.6339170844380533e-08,
                        -0.23089823126792908,
                        -0.9729779362678528
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6418421268463135,
                        -1.2663583755493164,
                        0.9503093957901001
                    ],
                    "area": 2.262965440750122,
                    "normal": [
                        -2.633917617345105e-08,
                        -0.23089830577373505,
                        0.9729779362678528
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6418421268463135,
                        -1.2663583755493164,
                        0.9503093957901001
                    ],
                    "area": 2.262965440750122,
                    "normal": [
                        2.633917617345105e-08,
                        -0.23089830577373505,
                        0.9729779362678528
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1143004894256592,
                        -0.8103212714195251,
                        -0.626167893409729
                    ],
                    "area": 1.0999689102172852,
                    "normal": [
                        -0.28198152780532837,
                        8.805479723150711e-08,
                        -0.9594197869300842
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1143004894256592,
                        -0.8103212714195251,
                        -0.626167893409729
                    ],
                    "area": 1.0999689102172852,
                    "normal": [
                        0.28198152780532837,
                        8.805479723150711e-08,
                        -0.9594197869300842
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.146093726158142,
                        -0.7813123464584351,
                        0.32295548915863037
                    ],
                    "area": 1.0919212102890015,
                    "normal": [
                        -0.3039836287498474,
                        -0.019007939845323563,
                        0.9524876475334167
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1460936069488525,
                        -0.7813123464584351,
                        0.32295548915863037
                    ],
                    "area": 1.0919212102890015,
                    "normal": [
                        0.3039836287498474,
                        -0.019007939845323563,
                        0.9524876475334167
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6946138143539429,
                        1.8261702060699463,
                        0.4729907810688019
                    ],
                    "area": 0.6129747033119202,
                    "normal": [
                        -1.0,
                        4.344789488186507e-07,
                        -8.003865303862767e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6946138143539429,
                        1.8261702060699463,
                        0.4729907810688019
                    ],
                    "area": 0.6129746437072754,
                    "normal": [
                        1.0,
                        4.344789488186507e-07,
                        -8.003865303862767e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        -0.22382058203220367,
                        0.8046499490737915
                    ],
                    "area": 0.5642781257629395,
                    "normal": [
                        0.0,
                        -0.19353561103343964,
                        0.9810932874679565
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -0.12197545170783997,
                        -1.0899345874786377
                    ],
                    "area": 0.5621052384376526,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7973839640617371,
                        0.7897243499755859,
                        0.18048453330993652
                    ],
                    "area": 0.5142250061035156,
                    "normal": [
                        0.9634688496589661,
                        0.2678203880786896,
                        -7.244474886647367e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7973839640617371,
                        0.7897243499755859,
                        0.18048451840877533
                    ],
                    "area": 0.5142249464988708,
                    "normal": [
                        -0.9634688496589661,
                        0.2678203880786896,
                        -7.244474886647367e-08
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.31705063581466675,
                        0.5464284420013428,
                        0.37535396218299866
                    ],
                    "area": 0.3475326895713806,
                    "normal": [
                        0.497042179107666,
                        -2.4654272579027747e-07,
                        0.8677263259887695
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3170506954193115,
                        0.5464286804199219,
                        -0.36517760157585144
                    ],
                    "area": 0.3475326597690582,
                    "normal": [
                        0.4970422089099884,
                        -3.215776089859901e-08,
                        -0.8677263259887695
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3170504868030548,
                        0.5464286804199219,
                        -0.36517760157585144
                    ],
                    "area": 0.3475326597690582,
                    "normal": [
                        -0.49704214930534363,
                        1.554291628735882e-07,
                        -0.8677263855934143
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.31705060601234436,
                        0.5464286804199219,
                        0.37535393238067627
                    ],
                    "area": 0.34753260016441345,
                    "normal": [
                        -0.4970422387123108,
                        1.5542917708444293e-07,
                        0.8677263259887695
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1175870895385742e-07,
                        0.5464286804199219,
                        -0.4559824466705322
                    ],
                    "area": 0.30156323313713074,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.1175870895385742e-08,
                        0.7657884359359741,
                        0.6855186820030212
                    ],
                    "area": 0.30156323313713074,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.6566128730773926e-07,
                        -1.1977282762527466,
                        0.5528357028961182
                    ],
                    "area": 0.26005858182907104,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.384185791015625e-07,
                        -0.7970559000968933,
                        -0.438561350107193
                    ],
                    "area": 0.24602572619915009,
                    "normal": [
                        -2.3932136627990985e-07,
                        -1.0,
                        2.4135604803632305e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.24559901654720306,
                        -1.1977282762527466,
                        0.3387223780155182
                    ],
                    "area": 0.24058611690998077,
                    "normal": [
                        -0.9423633217811584,
                        -0.3345910608768463,
                        -3.2516874171051313e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.24559825658798218,
                        -1.1977282762527466,
                        0.3387223482131958
                    ],
                    "area": 0.24058611690998077,
                    "normal": [
                        0.942363440990448,
                        -0.3345910608768463,
                        4.180741370873875e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        7.450580596923828e-07,
                        2.3737077713012695,
                        1.1866775751113892
                    ],
                    "area": 0.8137372732162476,
                    "normal": [
                        -9.08111801901923e-13,
                        -6.226663913366792e-07,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.35454851388931274,
                        0.8719560503959656,
                        -0.7929558157920837
                    ],
                    "area": 0.7746385931968689,
                    "normal": [
                        -0.9053052663803101,
                        3.847255314326503e-08,
                        -0.4247616231441498
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3545484244823456,
                        0.8719552159309387,
                        -0.7929558157920837
                    ],
                    "area": 0.7746384143829346,
                    "normal": [
                        0.9053052067756653,
                        0.0,
                        -0.42476168274879456
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.35454854369163513,
                        -0.24852217733860016,
                        -0.6977487802505493
                    ],
                    "area": 0.7716631293296814,
                    "normal": [
                        -0.938936710357666,
                        -0.06494299322366714,
                        -0.33790552616119385
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3545484244823456,
                        -0.24852275848388672,
                        -0.6977487802505493
                    ],
                    "area": 0.7716628909111023,
                    "normal": [
                        0.9389366507530212,
                        -0.06494304537773132,
                        -0.3379056453704834
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.30299848318099976,
                        -1.3943240642547607,
                        -0.5173534750938416
                    ],
                    "area": 0.7502847909927368,
                    "normal": [
                        0.9671273827552795,
                        0.00010273926454829052,
                        -0.25429248809814453
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3029986023902893,
                        -1.3943238258361816,
                        -0.5173535346984863
                    ],
                    "area": 0.750284731388092,
                    "normal": [
                        -0.9671273827552795,
                        0.00010283857409376651,
                        -0.2542923092842102
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.0287930965423584e-05,
                        2.195708751678467,
                        0.06417100131511688
                    ],
                    "area": 0.6672075390815735,
                    "normal": [
                        0.0014739520847797394,
                        0.46732160449028015,
                        -0.8840861916542053
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -8.568167686462402e-08,
                        -0.3104287087917328,
                        0.7813841104507446
                    ],
                    "area": 0.6435515880584717,
                    "normal": [
                        -2.0839112835346896e-07,
                        -0.06623035669326782,
                        0.9978044033050537
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -9.685754776000977e-08,
                        -1.8008642196655273,
                        -0.5175172686576843
                    ],
                    "area": 0.593771755695343,
                    "normal": [
                        -5.521069965652714e-07,
                        -0.9103609919548035,
                        -0.41381484270095825
                    ]
                }
            ]
        },
        "Hulls_hull.angle": {
            "collection": "Hulls",
            "object_name": "hull.angle",
            "dimensions": {
                "width": 1.152917504310608,
                "height": 2.168290376663208,
                "depth": 5.113998889923096
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.34865543246269226,
                        5.141276836395264,
                        2.5579538345336914
                    ],
                    "area": 1.9504789113998413,
                    "normal": [
                        -0.9905816912651062,
                        0.13692282140254974,
                        -1.3911973837821279e-05
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.34865784645080566,
                        5.141275882720947,
                        2.5579538345336914
                    ],
                    "area": 1.9504785537719727,
                    "normal": [
                        0.9905818700790405,
                        0.13692188262939453,
                        -1.395781509927474e-05
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5001916885375977,
                        -2.863731861114502,
                        1.494210958480835
                    ],
                    "area": 1.6621266603469849,
                    "normal": [
                        -0.927413284778595,
                        0.0,
                        0.3740381896495819
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5001905560493469,
                        -2.86373233795166,
                        1.4942108392715454
                    ],
                    "area": 1.662125825881958,
                    "normal": [
                        0.9274133443832397,
                        0.0,
                        0.37403813004493713
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9171193838119507,
                        2.097952127456665,
                        0.1465350240468979
                    ],
                    "area": 1.4781765937805176,
                    "normal": [
                        0.8072751760482788,
                        0.3692045509815216,
                        -0.460428923368454
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9171187877655029,
                        2.0979528427124023,
                        0.1465350240468979
                    ],
                    "area": 1.4781763553619385,
                    "normal": [
                        -0.8072752952575684,
                        0.369204580783844,
                        -0.4604286849498749
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.76837158203125e-07,
                        -2.3710975646972656,
                        -0.8335392475128174
                    ],
                    "area": 1.4630022048950195,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -5.513429641723633e-07,
                        -3.9692234992980957,
                        1.494210958480835
                    ],
                    "area": 1.441279649734497,
                    "normal": [
                        0.0,
                        -0.48391568660736084,
                        0.8751146793365479
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.47558122873306274,
                        -2.621612787246704,
                        -0.5175644159317017
                    ],
                    "area": 1.4147063493728638,
                    "normal": [
                        -0.959327220916748,
                        0.0,
                        -0.28229647874832153
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.47558027505874634,
                        -2.6216132640838623,
                        -0.5175644159317017
                    ],
                    "area": 1.4147061109542847,
                    "normal": [
                        0.959327220916748,
                        0.0,
                        -0.28229647874832153
                    ]
                }
            ]
        },
        "Hulls_hull.lump": {
            "collection": "Hulls",
            "object_name": "hull.lump",
            "dimensions": {
                "width": 2.2574493885040283,
                "height": 2.827028512954712,
                "depth": 8.193129539489746
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.999998927116394,
                        4.4438700675964355,
                        -1.2860068082809448
                    ],
                    "area": 5.4582648277282715,
                    "normal": [
                        -1.0,
                        2.1280777673382545e-07,
                        4.597325542476938e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.000001311302185,
                        4.443869590759277,
                        1.2860077619552612
                    ],
                    "area": 5.458263874053955,
                    "normal": [
                        1.0,
                        -2.1826440388394985e-07,
                        7.77377593408346e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9999992251396179,
                        4.443870544433594,
                        1.2860077619552612
                    ],
                    "area": 5.458263397216797,
                    "normal": [
                        -1.0,
                        2.0189456506614079e-07,
                        -4.2086298890353646e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.0000008344650269,
                        4.443870544433594,
                        -1.2860068082809448
                    ],
                    "area": 5.458263397216797,
                    "normal": [
                        1.0,
                        -2.1826437546224042e-07,
                        -7.773766697027895e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.654833436012268,
                        4.576239109039307,
                        5.364418029785156e-07
                    ],
                    "area": 5.024701118469238,
                    "normal": [
                        -1.0,
                        4.010153418221307e-07,
                        -4.513660769589478e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6548352241516113,
                        4.576238632202148,
                        5.364418029785156e-07
                    ],
                    "area": 5.02470064163208,
                    "normal": [
                        0.9999999403953552,
                        -4.3861055587512965e-07,
                        -7.334702445405128e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7574278116226196,
                        4.621840000152588,
                        -2.2351973056793213
                    ],
                    "area": 4.268676280975342,
                    "normal": [
                        0.8800358176231384,
                        -1.2916018476971658e-07,
                        -0.4749073386192322
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7574257850646973,
                        4.62183952331543,
                        -2.2351973056793213
                    ],
                    "area": 4.268675327301025,
                    "normal": [
                        -0.8800356984138489,
                        2.443570963350794e-07,
                        -0.47490745782852173
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6983988285064697,
                        -1.4112650156021118,
                        -0.0011479854583740234
                    ],
                    "area": 4.191441059112549,
                    "normal": [
                        0.9567577838897705,
                        0.2908857762813568,
                        1.7064674295852456e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6984050273895264,
                        -1.411264181137085,
                        -0.0011479854583740234
                    ],
                    "area": 4.191440105438232,
                    "normal": [
                        -0.9567577242851257,
                        0.2908858358860016,
                        -5.688225712674466e-08
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.23893828690052032,
                        -1.000443696975708,
                        0.4778767228126526
                    ],
                    "area": 0.3705489933490753,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.1479501873254776,
                        0.2523092031478882,
                        0.8305805325508118
                    ],
                    "area": 0.3190826177597046,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.1780560165643692,
                        -1.7758516073226929,
                        -0.6661291122436523
                    ],
                    "area": 0.276131808757782,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.14795061945915222,
                        -2.8622584342956543,
                        0.8701552152633667
                    ],
                    "area": 0.26631149649620056,
                    "normal": [
                        -1.8185008343607478e-07,
                        0.049650292843580246,
                        -0.9987666606903076
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4778769016265869,
                        -2.288133144378662,
                        0.1245783269405365
                    ],
                    "area": 0.2381322681903839,
                    "normal": [
                        -1.0,
                        -1.3729898000747198e-06,
                        6.236472671616866e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.15361425280570984,
                        1.1783413887023926,
                        0.9532116651535034
                    ],
                    "area": 0.21852567791938782,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.38688838481903076,
                        0.24061980843544006,
                        0.7937875986099243
                    ],
                    "area": 0.21621128916740417,
                    "normal": [
                        -0.37496307492256165,
                        -0.0007418380118906498,
                        -0.9270394444465637
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.14795047044754028,
                        -2.0484883785247803,
                        0.897971510887146
                    ],
                    "area": 0.21563215553760529,
                    "normal": [
                        -1.7276130748200558e-08,
                        0.015022315084934235,
                        -0.9998871684074402
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7065863609313965,
                        -0.10923512279987335,
                        1.4901161193847656e-08
                    ],
                    "area": 0.19593146443367004,
                    "normal": [
                        -1.0,
                        0.0,
                        -9.078823381969414e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7065863609313965,
                        -0.8846425414085388,
                        1.4901161193847656e-08
                    ],
                    "area": 0.19593146443367004,
                    "normal": [
                        -1.0,
                        0.0,
                        -9.078822813535226e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.5103751420974731,
                        -1.361956238746643,
                        -0.6364854574203491
                    ],
                    "area": 2.1531810760498047,
                    "normal": [
                        1.0,
                        -1.5094832050976947e-08,
                        -1.9128871997509123e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9409021735191345,
                        -1.3619563579559326,
                        -0.6364854574203491
                    ],
                    "area": 2.1531808376312256,
                    "normal": [
                        -1.0,
                        4.5284512140142397e-08,
                        3.552505347670376e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8514910936355591,
                        2.655263900756836,
                        -0.06359747052192688
                    ],
                    "area": 1.552703619003296,
                    "normal": [
                        -1.0,
                        -2.4505760620741057e-07,
                        4.2016122847599036e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4209628105163574,
                        2.655263662338257,
                        -0.06359747052192688
                    ],
                    "area": 1.5527032613754272,
                    "normal": [
                        1.0,
                        2.1782908277145907e-07,
                        2.52096697295201e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3300282955169678,
                        -1.169539451599121,
                        0.5274903774261475
                    ],
                    "area": 1.2997217178344727,
                    "normal": [
                        1.0,
                        0.0,
                        5.618791192318895e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7605547904968262,
                        -1.1695395708084106,
                        0.5274904370307922
                    ],
                    "area": 1.299721360206604,
                    "normal": [
                        -1.0,
                        0.0,
                        -1.8729303974396316e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5086948871612549,
                        1.9953449964523315,
                        -0.7989676594734192
                    ],
                    "area": 1.2484157085418701,
                    "normal": [
                        -0.9897865653038025,
                        0.033630549907684326,
                        -0.13853314518928528
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07816681265830994,
                        1.9953453540802002,
                        -0.7989675998687744
                    ],
                    "area": 1.2484155893325806,
                    "normal": [
                        0.9897866249084473,
                        0.03363073244690895,
                        -0.1385328620672226
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8060232400894165,
                        2.655263900756836,
                        0.532519519329071
                    ],
                    "area": 1.075726866722107,
                    "normal": [
                        -0.982729434967041,
                        -2.1297725538715895e-07,
                        0.18504835665225983
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3754950165748596,
                        2.655263900756836,
                        0.5325195789337158
                    ],
                    "area": 1.0757266283035278,
                    "normal": [
                        0.982729434967041,
                        2.424131935185869e-07,
                        0.18504835665225983
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8182942867279053,
                        -0.3085152506828308,
                        -0.5455071330070496
                    ],
                    "area": 1.9094033241271973,
                    "normal": [
                        -1.0,
                        1.0153888752029161e-07,
                        -1.4659534031125077e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.542417585849762,
                        -0.4238557517528534,
                        0.5
                    ],
                    "area": 1.7952444553375244,
                    "normal": [
                        -0.9999999403953552,
                        1.0265637939710359e-07,
                        3.166332484833695e-14
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7419300675392151,
                        3.1164205074310303,
                        1.856364369392395
                    ],
                    "area": 1.4824838638305664,
                    "normal": [
                        -0.9999999403953552,
                        2.3386803604807938e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6501743197441101,
                        2.227524518966675,
                        1.047263264656067
                    ],
                    "area": 1.378465175628662,
                    "normal": [
                        -0.9999999403953552,
                        9.021309033130365e-09,
                        -1.1250050135913625e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7419305443763733,
                        0.49811726808547974,
                        1.8563642501831055
                    ],
                    "area": 1.0558538436889648,
                    "normal": [
                        -1.0,
                        1.0945500150683074e-07,
                        -5.6231058920275245e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.4792550206184387,
                        3.412461519241333,
                        0.41312968730926514
                    ],
                    "area": 0.9128523468971252,
                    "normal": [
                        -1.959507329729604e-07,
                        1.3392165953973745e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.32508695125579834,
                        1.476133108139038,
                        -1.5293036699295044
                    ],
                    "area": 0.8741227984428406,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.32508713006973267,
                        -1.0337615013122559,
                        -1.2646517753601074
                    ],
                    "area": 0.809025764465332,
                    "normal": [
                        -7.367459176066404e-08,
                        -0.42537564039230347,
                        -0.9050168395042419
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.35552796721458435,
                        0.2735040485858917,
                        -1.5901854038238525
                    ],
                    "area": 0.7542985677719116,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.13326047360897064,
                        3.744255542755127,
                        2.365030527114868
                    ],
                    "area": 0.6960398554801941,
                    "normal": [
                        -2.4500074278371864e-13,
                        -1.825859641257921e-07,
                        1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.7592430114746094,
                        5.290500640869141,
                        0.47897109389305115
                    ],
                    "area": 2.5025992393493652,
                    "normal": [
                        0.9995300769805908,
                        0.015012437477707863,
                        0.02672196552157402
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.2380005121231079,
                        8.608939170837402,
                        -0.9454739093780518
                    ],
                    "area": 2.001995801925659,
                    "normal": [
                        0.0,
                        0.019142000004649162,
                        -0.9998167157173157
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.5559837818145752,
                        5.708016872406006,
                        0.7522619962692261
                    ],
                    "area": 1.812499761581421,
                    "normal": [
                        0.0134330615401268,
                        0.07856579124927521,
                        0.9968184232711792
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.18356996774673462,
                        5.656142234802246,
                        0.7073631286621094
                    ],
                    "area": 1.63397216796875,
                    "normal": [
                        -0.005105914082378149,
                        0.07557985931634903,
                        0.9971266984939575
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.3442576229572296,
                        9.575315475463867,
                        0.4897696375846863
                    ],
                    "area": 1.5654797554016113,
                    "normal": [
                        0.0,
                        0.03463517501950264,
                        0.9994000792503357
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.021750569343567,
                        8.882925033569336,
                        -0.1298009306192398
                    ],
                    "area": 1.5624033212661743,
                    "normal": [
                        0.9992335438728333,
                        0.03914662450551987,
                        -1.1444799241644432e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8647603988647461,
                        8.761208534240723,
                        -0.37207961082458496
                    ],
                    "area": 1.4313000440597534,
                    "normal": [
                        0.3403119146823883,
                        0.00994987040758133,
                        -0.9402599930763245
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3989626169204712,
                        2.2644972801208496,
                        -1.148115873336792
                    ],
                    "area": 1.3672490119934082,
                    "normal": [
                        0.0,
                        0.18529026210308075,
                        -0.9826837778091431
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8647605180740356,
                        8.761208534240723,
                        0.08179132640361786
                    ],
                    "area": 1.365299105644226,
                    "normal": [
                        0.16835905611515045,
                        0.00492240022867918,
                        0.9857134819030762
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7082732915878296,
                        8.624215126037598,
                        -0.5853502154350281
                    ],
                    "area": 1.29447340965271,
                    "normal": [
                        0.9998156428337097,
                        0.019156495109200478,
                        0.0013541742227971554
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.7775936126708984,
                        2.5018868446350098,
                        -1.2926576137542725
                    ],
                    "area": 10.930150032043457,
                    "normal": [
                        0.0,
                        -0.08328108489513397,
                        -0.9965260624885559
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6224801540374756,
                        1.8666231632232666,
                        -0.09180635213851929
                    ],
                    "area": 9.466373443603516,
                    "normal": [
                        1.0,
                        -4.426714994565373e-08,
                        2.437909927266446e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.8633733987808228,
                        -3.2858691215515137,
                        -0.7152895927429199
                    ],
                    "area": 8.298829078674316,
                    "normal": [
                        0.9956941604614258,
                        0.01404566690325737,
                        -0.09162777662277222
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6439305543899536,
                        7.599869728088379,
                        -0.3390961289405823
                    ],
                    "area": 7.578249931335449,
                    "normal": [
                        1.0,
                        -5.7315716617267753e-08,
                        -1.352798761899976e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6903059482574463,
                        7.599869728088379,
                        1.1379187107086182
                    ],
                    "area": 7.530647277832031,
                    "normal": [
                        1.0,
                        -1.1676876709998396e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8771686553955078,
                        -3.2858691215515137,
                        -1.9001555442810059
                    ],
                    "area": 6.398287773132324,
                    "normal": [
                        0.0,
                        0.2931153476238251,
                        -0.9560770392417908
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6711320281028748,
                        -9.436843872070312,
                        -3.525149345397949
                    ],
                    "area": 5.840266227722168,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.5868434906005859,
                        -8.765674591064453,
                        2.0027105808258057
                    ],
                    "area": 5.494349479675293,
                    "normal": [
                        1.0848353326764482e-08,
                        0.047589994966983795,
                        0.9988669753074646
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.217118501663208,
                        -13.183042526245117,
                        0.534625232219696
                    ],
                    "area": 4.115047454833984,
                    "normal": [
                        0.6026327013969421,
                        0.0,
                        0.798018753528595
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.326578140258789,
                        -9.061410903930664,
                        1.400524377822876
                    ],
                    "area": 4.074862480163574,
                    "normal": [
                        1.0,
                        0.0,
                        0.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        1.1047725677490234,
                        -0.5378818511962891,
                        -0.7112318873405457
                    ],
                    "area": 1.1485615968704224,
                    "normal": [
                        9.081631446861138e-08,
                        -0.36715301871299744,
                        -0.9301605820655823
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1047725677490234,
                        3.2289352416992188,
                        -0.30176541209220886
                    ],
                    "area": 0.8695164322853088,
                    "normal": [
                        8.568648723894512e-08,
                        0.6675403714179993,
                        -0.7445735931396484
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.226095199584961,
                        -2.351069688796997,
                        -5.364418029785156e-07
                    ],
                    "area": 0.7537435293197632,
                    "normal": [
                        7.541479918847516e-14,
                        -0.9999999403953552,
                        -4.726236397800676e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.0297796726226807,
                        1.12669038772583,
                        0.3566972315311432
                    ],
                    "area": 0.7145593166351318,
                    "normal": [
                        0.029058489948511124,
                        0.01646103523671627,
                        0.9994421005249023
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.0297791957855225,
                        1.1266908645629883,
                        -0.35669684410095215
                    ],
                    "area": 0.7145591974258423,
                    "normal": [
                        0.029058435931801796,
                        0.01646164059638977,
                        -0.9994421005249023
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1047725677490234,
                        1.2787786722183228,
                        -0.8936389684677124
                    ],
                    "area": 0.6685625314712524,
                    "normal": [
                        9.6631772805722e-08,
                        7.213820367724111e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1047725677490234,
                        1.8519525527954102,
                        -0.8936386108398438
                    ],
                    "area": 0.6565282344818115,
                    "normal": [
                        1.031290182140765e-07,
                        6.296615993051091e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1047725677490234,
                        3.903008460998535,
                        0.353617787361145
                    ],
                    "area": 0.6543846130371094,
                    "normal": [
                        0.0,
                        1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1047730445861816,
                        1.353271245956421,
                        1.1132395267486572
                    ],
                    "area": 0.6513270139694214,
                    "normal": [
                        -1.0929674942872225e-07,
                        2.1818310030311157e-14,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1047725677490234,
                        0.7232508063316345,
                        -0.8936392068862915
                    ],
                    "area": 0.6157333254814148,
                    "normal": [
                        1.0312901110864914e-07,
                        0.0,
                        -1.0
                    ]
                }
            ]
        },
        "Hulls_hull.bullHead": {
            "collection": "Hulls",
            "object_name": "hull.bullHead",
            "dimensions": {
                "width": 2.464251756668091,
                "height": 2.8293333053588867,
                "depth": 9.753388404846191
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9476627111434937,
                        -15.544017791748047,
                        0.49677586555480957
                    ],
                    "area": 9.516080856323242,
                    "normal": [
                        0.0,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -3.5756869316101074,
                        -12.367813110351562,
                        0.19064253568649292
                    ],
                    "area": 8.433523178100586,
                    "normal": [
                        -0.9999704360961914,
                        0.0076740882359445095,
                        -2.213037646470184e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.8343323469161987,
                        1.8245327472686768,
                        0.6770793795585632
                    ],
                    "area": 7.3068037033081055,
                    "normal": [
                        -1.0,
                        2.9806077606053805e-08,
                        -1.4791295654958958e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.621304988861084,
                        5.281238555908203,
                        5.410074234008789
                    ],
                    "area": 6.70827579498291,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.8396216630935669,
                        -12.361749649047852,
                        -2.8352794647216797
                    ],
                    "area": 6.345851898193359,
                    "normal": [
                        0.0,
                        1.2618096434380277e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.4375197887420654,
                        -2.0448293685913086,
                        -1.5346277952194214
                    ],
                    "area": 6.106359004974365,
                    "normal": [
                        -0.7923688292503357,
                        -0.036670248955488205,
                        -0.6089391112327576
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.3380742073059082,
                        -0.6392080187797546,
                        3.2653610706329346
                    ],
                    "area": 5.7775163650512695,
                    "normal": [
                        -1.0,
                        0.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.8200309872627258,
                        4.984622955322266,
                        -1.2007968425750732
                    ],
                    "area": 5.765525817871094,
                    "normal": [
                        0.0,
                        0.1182674989104271,
                        -0.9929817318916321
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.902836799621582,
                        -12.755231857299805,
                        2.387451648712158
                    ],
                    "area": 5.539909362792969,
                    "normal": [
                        -0.9999014735221863,
                        0.003360990434885025,
                        0.013621589168906212
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.4375202655792236,
                        -4.387495040893555,
                        0.46649807691574097
                    ],
                    "area": 5.477321147918701,
                    "normal": [
                        -0.8422948718070984,
                        -0.5390169024467468,
                        -6.529247542630401e-08
                    ]
                }
            ]
        },
        "Hulls_hull.hangar": {
            "collection": "Hulls",
            "object_name": "hull.hangar",
            "dimensions": {
                "width": 1.9733844995498657,
                "height": 2.8331339359283447,
                "depth": 14.242925643920898
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        1.8593099117279053,
                        0.8428857326507568,
                        0.9827098250389099
                    ],
                    "area": 24.724620819091797,
                    "normal": [
                        0.9952436089515686,
                        -1.1475124665594194e-05,
                        0.09741723537445068
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.8593343496322632,
                        0.842745304107666,
                        0.9823187589645386
                    ],
                    "area": 24.71851348876953,
                    "normal": [
                        -0.9952417016029358,
                        4.1306188904854935e-06,
                        0.09743660688400269
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.5053871870040894,
                        6.07496452331543,
                        0.1410723328590393
                    ],
                    "area": 23.385683059692383,
                    "normal": [
                        -1.0,
                        2.0212673756958566e-09,
                        6.915614108038426e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.505385160446167,
                        6.074965953826904,
                        0.15800949931144714
                    ],
                    "area": 22.84713363647461,
                    "normal": [
                        1.0,
                        -2.395037723701421e-09,
                        -5.419544777396368e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.6737825870513916,
                        6.582269668579102,
                        -0.5548015832901001
                    ],
                    "area": 22.791748046875,
                    "normal": [
                        2.4940351501146103e-15,
                        3.5241389806373036e-09,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.6737825870513916,
                        5.547517776489258,
                        0.8752163052558899
                    ],
                    "area": 20.002952575683594,
                    "normal": [
                        -8.836946818746583e-08,
                        0.0001954691397259012,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.8134100437164307,
                        -7.771502494812012,
                        0.9581136703491211
                    ],
                    "area": 16.90584945678711,
                    "normal": [
                        -0.9952420592308044,
                        3.434013933656388e-06,
                        0.09743309766054153
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.813340425491333,
                        -7.771506309509277,
                        0.9581136107444763
                    ],
                    "area": 16.90584945678711,
                    "normal": [
                        0.9952420592308044,
                        -3.525681677274406e-06,
                        0.09743277728557587
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.40815865993499756,
                        6.582269668579102,
                        -0.5548015832901001
                    ],
                    "area": 13.806538581848145,
                    "normal": [
                        0.0,
                        3.5241389806373036e-09,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.40815865993499756,
                        5.547517776489258,
                        0.8752162456512451
                    ],
                    "area": 12.117172241210938,
                    "normal": [
                        -1.0960197016629536e-07,
                        0.0001954550971277058,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -3.3850531578063965,
                        -12.984273910522461,
                        1.3229894638061523
                    ],
                    "area": 17.33011245727539,
                    "normal": [
                        -1.0,
                        6.06237833267187e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.9939926862716675,
                        -4.870190143585205,
                        -2.2402634620666504
                    ],
                    "area": 15.192495346069336,
                    "normal": [
                        0.0,
                        3.119781766258711e-08,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.9939926862716675,
                        -4.870190143585205,
                        -2.6882596015930176
                    ],
                    "area": 15.19249439239502,
                    "normal": [
                        0.0,
                        -3.119781766258711e-08,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.9862743020057678,
                        -12.974149703979492,
                        -2.4624040126800537
                    ],
                    "area": 14.981342315673828,
                    "normal": [
                        0.0,
                        3.1391866883723196e-08,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -3.3081588745117188,
                        -1.2495355606079102,
                        1.3229894638061523
                    ],
                    "area": 14.248296737670898,
                    "normal": [
                        -1.0,
                        3.686815475134608e-08,
                        2.2852171710496805e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.9360917806625366,
                        -0.5666932463645935,
                        -2.4496541023254395
                    ],
                    "area": 12.899504661560059,
                    "normal": [
                        0.0,
                        3.460313990899522e-08,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -3.3850531578063965,
                        -12.984273910522461,
                        -0.5326358079910278
                    ],
                    "area": 11.860777854919434,
                    "normal": [
                        -1.0,
                        6.06237833267187e-08,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.0117886066436768,
                        -19.719287872314453,
                        -2.511474370956421
                    ],
                    "area": 11.341167449951172,
                    "normal": [
                        0.0,
                        4.254046004348311e-08,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.7113081216812134,
                        -12.984275817871094,
                        2.4246408939361572
                    ],
                    "area": 11.189603805541992,
                    "normal": [
                        8.379578986250635e-08,
                        -4.5467849929536897e-08,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.651559591293335,
                        11.174654006958008,
                        1.6467607021331787
                    ],
                    "area": 11.115483283996582,
                    "normal": [
                        -0.9931898713111877,
                        0.0002388640132267028,
                        0.11650660634040833
                    ]
                }
            ]
        },
        "Hulls_hull.slick": {
            "collection": "Hulls",
            "object_name": "hull.slick",
            "dimensions": {
                "width": 1.4165889024734497,
                "height": 2.5000627040863037,
                "depth": 8.840755462646484
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6834225654602051,
                        0.608025074005127,
                        -0.9839276671409607
                    ],
                    "area": 3.035602569580078,
                    "normal": [
                        -1.0,
                        6.872023305959374e-08,
                        4.049119084470476e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8050644397735596,
                        0.3502531051635742,
                        -0.2732231914997101
                    ],
                    "area": 2.28619122505188,
                    "normal": [
                        -0.9536576867103577,
                        7.821477510105979e-08,
                        0.30089327692985535
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.33092594146728516,
                        -0.10210755467414856,
                        0.9631093144416809
                    ],
                    "area": 2.046245574951172,
                    "normal": [
                        -0.9947577118873596,
                        0.044895585626363754,
                        0.09187763929367065
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.34171128273010254,
                        0.8657966256141663,
                        -1.4214088916778564
                    ],
                    "area": 2.0153846740722656,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6206839084625244,
                        0.35025298595428467,
                        0.31115660071372986
                    ],
                    "area": 1.9687832593917847,
                    "normal": [
                        -0.953657865524292,
                        5.676536574128477e-08,
                        0.30089330673217773
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8044244647026062,
                        -3.3022894859313965,
                        -0.36910659074783325
                    ],
                    "area": 1.4445959329605103,
                    "normal": [
                        -0.9720398187637329,
                        7.3495135666235e-07,
                        0.23481635749340057
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.30093929171562195,
                        -3.3022894859313965,
                        -1.200239658355713
                    ],
                    "area": 1.1754202842712402,
                    "normal": [
                        9.672017147691753e-14,
                        4.88330215375754e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7465746402740479,
                        -3.3022897243499756,
                        -0.9644293785095215
                    ],
                    "area": 1.08061683177948,
                    "normal": [
                        -0.8523294925689697,
                        8.756329634707072e-07,
                        -0.5230051279067993
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8050636053085327,
                        3.0995588302612305,
                        -0.45464250445365906
                    ],
                    "area": 0.9637185335159302,
                    "normal": [
                        -0.9664666056632996,
                        0.060044579207897186,
                        0.24967361986637115
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6200438737869263,
                        -3.3022894859313965,
                        0.312682181596756
                    ],
                    "area": 0.9572270512580872,
                    "normal": [
                        -0.9538450241088867,
                        6.966236014704918e-07,
                        0.30029934644699097
                    ]
                }
            ]
        },
        "Hulls_hull.fish": {
            "collection": "Hulls",
            "object_name": "hull.fish",
            "dimensions": {
                "width": 2.063112497329712,
                "height": 1.9594240188598633,
                "depth": 5.581357955932617
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -1.7259794473648071,
                        -3.0691425800323486,
                        0.000644981861114502
                    ],
                    "area": 11.464166641235352,
                    "normal": [
                        -1.0,
                        6.556733751494903e-07,
                        -1.7212680347711284e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.7259780168533325,
                        -0.10095395147800446,
                        0.26428478956222534
                    ],
                    "area": 5.929295063018799,
                    "normal": [
                        -1.0,
                        1.3259534625831293e-07,
                        -1.446034900709492e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.725977897644043,
                        1.6971375942230225,
                        0.23523223400115967
                    ],
                    "area": 5.322409629821777,
                    "normal": [
                        -1.0,
                        1.2738966859160428e-07,
                        -1.6109186162793776e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.000001072883606,
                        -3.637308120727539,
                        1.8273175954818726
                    ],
                    "area": 4.852746963500977,
                    "normal": [
                        -1.0,
                        2.6031642619273043e-07,
                        3.349721566792141e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.5000007748603821,
                        -3.0691428184509277,
                        -1.384489893913269
                    ],
                    "area": 4.138286113739014,
                    "normal": [
                        0.0,
                        5.76128869056447e-08,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.8449625968933105,
                        0.30690473318099976,
                        0.6471898555755615
                    ],
                    "area": 3.3309106826782227,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.8449623584747314,
                        0.306904673576355,
                        -0.6471898555755615
                    ],
                    "area": 3.3309099674224854,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.8393619060516357,
                        -1.6230766773223877,
                        0.6471898555755615
                    ],
                    "area": 3.3092923164367676,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.8393616676330566,
                        -1.6230766773223877,
                        -0.6471898555755615
                    ],
                    "area": 3.3092916011810303,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.853805422782898,
                        4.688982009887695,
                        0.2632617950439453
                    ],
                    "area": 3.1868510246276855,
                    "normal": [
                        -0.9816704392433167,
                        0.18349699676036835,
                        -0.05149715393781662
                    ]
                }
            ]
        },
        "Hulls_hull.rib": {
            "collection": "Hulls",
            "object_name": "hull.rib",
            "dimensions": {
                "width": 2.967479944229126,
                "height": 3.6963436603546143,
                "depth": 10.577418327331543
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.40723589062690735,
                        1.8771370649337769,
                        -0.022557228803634644
                    ],
                    "area": 1.3639909029006958,
                    "normal": [
                        2.9272788992784626e-07,
                        1.0,
                        2.1354824752961576e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8144726157188416,
                        1.5068647861480713,
                        -0.022557377815246582
                    ],
                    "area": 1.2401864528656006,
                    "normal": [
                        -1.0,
                        2.253650791317341e-06,
                        -1.4236499623621057e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.41886186599731445,
                        -3.489799737930298,
                        0.0022475123405456543
                    ],
                    "area": 0.9498124718666077,
                    "normal": [
                        -1.4230143108306947e-07,
                        -1.0,
                        -1.0514128234717646e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4072362780570984,
                        1.5068647861480713,
                        -1.2695659399032593
                    ],
                    "area": 0.785312294960022,
                    "normal": [
                        1.8974819226968975e-07,
                        0.6403982043266296,
                        -0.768043041229248
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.4098014831542969,
                        -3.3612754344940186,
                        -0.08479331433773041
                    ],
                    "area": 0.7708129286766052,
                    "normal": [
                        -1.0,
                        4.234380241996405e-07,
                        -4.898168413092208e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5000000596046448,
                        -1.152021050453186,
                        -2.024772882461548
                    ],
                    "area": 0.7521694302558899,
                    "normal": [
                        0.0010375370038673282,
                        0.9894495606422424,
                        -0.14487387239933014
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.848625898361206,
                        0.8439159393310547,
                        -1.043081283569336e-07
                    ],
                    "area": 0.7284801006317139,
                    "normal": [
                        -1.0,
                        2.3070944621395029e-07,
                        -8.45545216066057e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.39187633991241455,
                        0.841122031211853,
                        2.21148419380188
                    ],
                    "area": 0.7219080328941345,
                    "normal": [
                        -1.0,
                        5.7300485423184e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27804166078567505,
                        -3.537418842315674,
                        -2.4388911724090576
                    ],
                    "area": 0.7219011783599854,
                    "normal": [
                        0.0,
                        -0.9815076589584351,
                        -0.19142264127731323
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.429895281791687,
                        0.6198253035545349,
                        0.3271057605743408
                    ],
                    "area": 0.7007393836975098,
                    "normal": [
                        1.0,
                        0.0,
                        2.2844179170533607e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.47656166553497314,
                        -3.775383949279785,
                        -1.0
                    ],
                    "area": 9.103059768676758,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.33887168765068054,
                        -0.9178371429443359,
                        1.1426723003387451
                    ],
                    "area": 7.240904808044434,
                    "normal": [
                        1.0,
                        -7.612464436590471e-09,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9531233310699463,
                        -3.775383949279785,
                        -0.6666666269302368
                    ],
                    "area": 6.367178916931152,
                    "normal": [
                        1.0,
                        -1.8722465355835993e-08,
                        8.940696005765858e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9531232118606567,
                        -3.7753844261169434,
                        0.6666667461395264
                    ],
                    "area": 6.367177963256836,
                    "normal": [
                        1.0,
                        -1.0297355856891954e-07,
                        4.470339831641468e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.3872855603694916,
                        5.214984893798828,
                        -1.0877326726913452
                    ],
                    "area": 6.0242743492126465,
                    "normal": [
                        0.0,
                        -0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.16943584382534027,
                        -0.9178371429443359,
                        1.373867154121399
                    ],
                    "area": 5.30664587020874,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.16943584382534027,
                        -0.9178371429443359,
                        0.9114775657653809
                    ],
                    "area": 5.30664587020874,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.366385817527771,
                        0.6381678581237793,
                        -0.906373143196106
                    ],
                    "area": 5.134810447692871,
                    "normal": [
                        0.9999999403953552,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7838095426559448,
                        -3.9407427310943604,
                        2.9802322387695312e-08
                    ],
                    "area": 5.052082538604736,
                    "normal": [
                        1.0,
                        -3.932678538376422e-08,
                        -4.5005930135021827e-14
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.774571418762207,
                        5.738147735595703,
                        -1.4583927392959595
                    ],
                    "area": 4.989999771118164,
                    "normal": [
                        -1.0,
                        0.0,
                        -7.236304213620315e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -1.3462953567504883,
                        -1.1531778573989868
                    ],
                    "area": 2.6413493156433105,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8079220652580261,
                        5.544897556304932,
                        -0.7735416293144226
                    ],
                    "area": 2.53568172454834,
                    "normal": [
                        0.9999974966049194,
                        0.0013223666464909911,
                        0.0017975859809666872
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8079218864440918,
                        5.544897079467773,
                        -0.7735416293144226
                    ],
                    "area": 2.5356814861297607,
                    "normal": [
                        -0.9999974966049194,
                        0.0013227774761617184,
                        0.001797448261640966
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27576807141304016,
                        0.8620176911354065,
                        -0.9354178309440613
                    ],
                    "area": 1.6086504459381104,
                    "normal": [
                        -1.0,
                        2.1407254280347843e-07,
                        -1.0058712973659567e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2757638096809387,
                        0.8620175123214722,
                        -0.935417890548706
                    ],
                    "area": 1.6086504459381104,
                    "normal": [
                        1.0,
                        -2.1407254280347843e-07,
                        2.3470313692541822e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6027413606643677,
                        -1.7960877418518066,
                        0.669143557548523
                    ],
                    "area": 1.5763729810714722,
                    "normal": [
                        -0.928888201713562,
                        0.003427826566621661,
                        0.3703443109989166
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6027413606643677,
                        -1.7960877418518066,
                        0.669143557548523
                    ],
                    "area": 1.5763728618621826,
                    "normal": [
                        0.928888201713562,
                        0.003427826566621661,
                        0.3703443109989166
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.4901161193847656e-08,
                        1.3719961643218994,
                        -1.513121247291565
                    ],
                    "area": 1.5638114213943481,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        3.5142149925231934,
                        -0.3736615478992462
                    ],
                    "area": 1.5332261323928833,
                    "normal": [
                        0.0,
                        0.777887225151062,
                        -0.6284039616584778
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.061516284942627,
                        -4.329153060913086,
                        1.9581494331359863
                    ],
                    "area": 1.528106451034546,
                    "normal": [
                        0.3437419533729553,
                        -7.313542482734192e-08,
                        -0.9390641450881958
                    ]
                }
            ]
        },
        "Ships_hull.knuckle.001": {
            "collection": "Ships",
            "object_name": "hull.knuckle.001",
            "dimensions": {
                "width": 3.595008373260498,
                "height": 7.317727088928223,
                "depth": 16.29335594177246
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -1.3462953567504883,
                        -1.1531778573989868
                    ],
                    "area": 2.6413493156433105,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8079220652580261,
                        5.544897556304932,
                        -0.7735416293144226
                    ],
                    "area": 2.53568172454834,
                    "normal": [
                        0.9999974966049194,
                        0.0013223666464909911,
                        0.0017975859809666872
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8079218864440918,
                        5.544897079467773,
                        -0.7735416293144226
                    ],
                    "area": 2.5356814861297607,
                    "normal": [
                        -0.9999974966049194,
                        0.0013227774761617184,
                        0.001797448261640966
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.27576807141304016,
                        0.8620176911354065,
                        -0.9354178309440613
                    ],
                    "area": 1.6086504459381104,
                    "normal": [
                        -1.0,
                        2.1407254280347843e-07,
                        -1.0058712973659567e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2757638096809387,
                        0.8620175123214722,
                        -0.935417890548706
                    ],
                    "area": 1.6086504459381104,
                    "normal": [
                        1.0,
                        -2.1407254280347843e-07,
                        2.3470313692541822e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6027413606643677,
                        -1.7960877418518066,
                        0.669143557548523
                    ],
                    "area": 1.5763729810714722,
                    "normal": [
                        -0.928888201713562,
                        0.003427826566621661,
                        0.3703443109989166
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6027413606643677,
                        -1.7960877418518066,
                        0.669143557548523
                    ],
                    "area": 1.5763728618621826,
                    "normal": [
                        0.928888201713562,
                        0.003427826566621661,
                        0.3703443109989166
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.4901161193847656e-08,
                        1.3719961643218994,
                        -1.513121247291565
                    ],
                    "area": 1.5638114213943481,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        3.5142149925231934,
                        -0.3736615478992462
                    ],
                    "area": 1.5332261323928833,
                    "normal": [
                        0.0,
                        0.777887225151062,
                        -0.6284039616584778
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.061516284942627,
                        -4.329153060913086,
                        -2.03627872467041
                    ],
                    "area": 1.528106451034546,
                    "normal": [
                        -0.3437419533729553,
                        7.313542482734192e-08,
                        -0.9390641450881958
                    ]
                }
            ]
        },
        "Ships_CruiseShip.002": {
            "collection": "Ships",
            "object_name": "CruiseShip.002",
            "dimensions": {
                "width": 12.3479585647583,
                "height": 6.895923137664795,
                "depth": 23.15503692626953
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.7256385087966919,
                        -1.9773136377334595,
                        -0.3570116460323334
                    ],
                    "area": 2.1531810760498047,
                    "normal": [
                        1.0,
                        -1.5094832050976947e-08,
                        -1.9128871997509123e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7256388068199158,
                        -1.977313756942749,
                        -0.35701167583465576
                    ],
                    "area": 2.1531808376312256,
                    "normal": [
                        -1.0,
                        4.5284512140142397e-08,
                        3.552505347670376e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6362277269363403,
                        2.0399065017700195,
                        0.21587631106376648
                    ],
                    "area": 1.552703619003296,
                    "normal": [
                        -1.0,
                        -2.4505760620741057e-07,
                        4.2016122847599036e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6362261772155762,
                        2.0399062633514404,
                        0.21587631106376648
                    ],
                    "area": 1.5527032613754272,
                    "normal": [
                        1.0,
                        2.1782908277145907e-07,
                        2.52096697295201e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.33125853538513184,
                        -2.6843411922454834,
                        0.6858764886856079
                    ],
                    "area": 1.3006579875946045,
                    "normal": [
                        0.9796802401542664,
                        0.16448064148426056,
                        -0.1147727444767952
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.33125850558280945,
                        -2.6843409538269043,
                        0.6858764886856079
                    ],
                    "area": 1.3006577491760254,
                    "normal": [
                        -0.9796801209449768,
                        0.1644807904958725,
                        -0.11477290838956833
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5452916622161865,
                        -1.7848968505859375,
                        0.8069641590118408
                    ],
                    "area": 1.2997218370437622,
                    "normal": [
                        1.0,
                        0.0,
                        5.618791192318895e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5452914237976074,
                        -1.7848970890045166,
                        0.8069642186164856
                    ],
                    "area": 1.2997217178344727,
                    "normal": [
                        -1.0,
                        0.0,
                        -1.8729301132225373e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2934301495552063,
                        1.3799879550933838,
                        -0.519493818283081
                    ],
                    "area": 1.2484159469604492,
                    "normal": [
                        0.9897866249084473,
                        0.03363073244690895,
                        -0.1385328620672226
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.29343149065971375,
                        1.3799875974655151,
                        -0.5194938778877258
                    ],
                    "area": 1.2484157085418701,
                    "normal": [
                        -0.9897865653038025,
                        0.033630549907684326,
                        -0.13853314518928528
                    ]
                }
            ]
        },
        "Ships_DogEar.003": {
            "collection": "Ships",
            "object_name": "DogEar.003",
            "dimensions": {
                "width": 1.0093576908111572,
                "height": 0.8007861971855164,
                "depth": 2.3938095569610596
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -7.748603820800781e-07,
                        -2.859541893005371,
                        -1.0
                    ],
                    "area": 2.6686625480651855,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.3709068298339844e-06,
                        -4.301303863525391,
                        -1.0
                    ],
                    "area": 2.5915427207946777,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.125133991241455,
                        -3.2782554626464844e-07,
                        -0.3641393184661865
                    ],
                    "area": 2.543442726135254,
                    "normal": [
                        1.0,
                        -2.980232238769531e-07,
                        9.373841436399744e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.125133991241455,
                        2.086162567138672e-07,
                        -0.3641393184661865
                    ],
                    "area": 2.543442487716675,
                    "normal": [
                        -1.0,
                        2.980232238769531e-07,
                        -2.8121553441451397e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.470348358154297e-08,
                        1.043081283569336e-07,
                        -1.0
                    ],
                    "area": 2.4994874000549316,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.341104507446289e-06,
                        -2.334392786026001,
                        0.849083423614502
                    ],
                    "area": 2.1453635692596436,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.205371856689453e-06,
                        -5.265416145324707,
                        -0.2608163356781006
                    ],
                    "area": 2.0683038234710693,
                    "normal": [
                        -3.458175399373431e-07,
                        -0.7542256712913513,
                        0.6566153168678284
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8750030994415283,
                        1.7881393432617188e-07,
                        0.6358606815338135
                    ],
                    "area": 1.767090082168579,
                    "normal": [
                        -0.8242686986923218,
                        1.6021937199184322e-07,
                        0.5661988258361816
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8750028610229492,
                        -5.513429641723633e-07,
                        0.6358606815338135
                    ],
                    "area": 1.767090082168579,
                    "normal": [
                        0.8242688179016113,
                        -3.9633212622902647e-07,
                        0.5661985874176025
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0241620540618896,
                        -4.301303386688232,
                        -0.44001221656799316
                    ],
                    "area": 1.4169970750808716,
                    "normal": [
                        -1.0,
                        4.711071142082801e-07,
                        -3.193176780769136e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0000001192092896,
                        2.0265579223632812e-06,
                        0.0
                    ],
                    "area": 23.80307388305664,
                    "normal": [
                        -1.0,
                        4.757739446858977e-08,
                        -1.341104507446289e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.658964216709137,
                        1.7881393432617188e-06,
                        -1.7681450843811035
                    ],
                    "area": 15.246318817138672,
                    "normal": [
                        -0.9139713644981384,
                        3.909445212002538e-08,
                        -0.405778706073761
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6589641571044922,
                        -1.9669532775878906e-06,
                        1.7681450843811035
                    ],
                    "area": 15.246316909790039,
                    "normal": [
                        0.9139713644981384,
                        -7.427945547533454e-08,
                        0.405778706073761
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6589642763137817,
                        1.7881393432617188e-07,
                        -1.7681450843811035
                    ],
                    "area": 15.246315956115723,
                    "normal": [
                        0.9139713644981384,
                        0.0,
                        -0.4057787358760834
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6589644551277161,
                        1.2516975402832031e-06,
                        1.7681450843811035
                    ],
                    "area": 15.24631404876709,
                    "normal": [
                        -0.9139713048934937,
                        3.51850140134502e-08,
                        0.40577879548072815
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        3.7997961044311523e-06,
                        10.164379119873047,
                        0.8494720458984375
                    ],
                    "area": 14.326481819152832,
                    "normal": [
                        4.992542912418685e-08,
                        0.03570143133401871,
                        0.9993625283241272
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8494663238525391,
                        10.16438102722168,
                        2.0265579223632812e-06
                    ],
                    "area": 14.326478958129883,
                    "normal": [
                        -0.9993624687194824,
                        0.035702746361494064,
                        -1.1649269282543173e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        3.725290298461914e-06,
                        10.16438102722168,
                        -0.8494679927825928
                    ],
                    "area": 14.326475143432617,
                    "normal": [
                        6.656726725395856e-08,
                        0.03570239245891571,
                        -0.9993624091148376
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.887580871582031e-06,
                        -8.601031303405762,
                        -1.0000009536743164
                    ],
                    "area": 10.601056098937988,
                    "normal": [
                        2.573785368858994e-13,
                        3.823314500550623e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0000051259994507,
                        -8.601030349731445,
                        -1.0132789611816406e-06
                    ],
                    "area": 10.601054191589355,
                    "normal": [
                        -1.0,
                        1.7992066432270803e-06,
                        -1.1921019904548302e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0000001192092896,
                        2.0265579223632812e-06,
                        0.0
                    ],
                    "area": 23.80307388305664,
                    "normal": [
                        -1.0,
                        4.757739446858977e-08,
                        -1.341104507446289e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.658964216709137,
                        1.7881393432617188e-06,
                        -1.7681450843811035
                    ],
                    "area": 15.246318817138672,
                    "normal": [
                        -0.9139713644981384,
                        3.909445212002538e-08,
                        -0.405778706073761
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6589641571044922,
                        -1.9669532775878906e-06,
                        1.7681450843811035
                    ],
                    "area": 15.246316909790039,
                    "normal": [
                        0.9139713644981384,
                        -7.427945547533454e-08,
                        0.405778706073761
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6589642763137817,
                        1.7881393432617188e-07,
                        -1.7681450843811035
                    ],
                    "area": 15.246315956115723,
                    "normal": [
                        0.9139713644981384,
                        0.0,
                        -0.4057787358760834
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6589644551277161,
                        1.2516975402832031e-06,
                        1.7681450843811035
                    ],
                    "area": 15.24631404876709,
                    "normal": [
                        -0.9139713048934937,
                        3.51850140134502e-08,
                        0.40577879548072815
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        3.7997961044311523e-06,
                        10.164379119873047,
                        0.8494720458984375
                    ],
                    "area": 14.326481819152832,
                    "normal": [
                        4.992542912418685e-08,
                        0.03570143133401871,
                        0.9993625283241272
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8494663238525391,
                        10.16438102722168,
                        2.0265579223632812e-06
                    ],
                    "area": 14.326478958129883,
                    "normal": [
                        -0.9993624687194824,
                        0.035702746361494064,
                        -1.1649269282543173e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        3.725290298461914e-06,
                        10.16438102722168,
                        -0.8494679927825928
                    ],
                    "area": 14.326475143432617,
                    "normal": [
                        6.656726725395856e-08,
                        0.03570239245891571,
                        -0.9993624091148376
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.887580871582031e-06,
                        -8.601031303405762,
                        -1.0000009536743164
                    ],
                    "area": 10.601056098937988,
                    "normal": [
                        2.573785368858994e-13,
                        3.823314500550623e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0000051259994507,
                        -8.601030349731445,
                        -1.0132789611816406e-06
                    ],
                    "area": 10.601054191589355,
                    "normal": [
                        -1.0,
                        1.7992066432270803e-06,
                        -1.1921019904548302e-07
                    ]
                }
            ]
        },
        "Ships_WindowBlockhalf.028": {
            "collection": "Ships",
            "object_name": "WindowBlockhalf.028",
            "dimensions": {
                "width": 0.37856703996658325,
                "height": 0.23600386083126068,
                "depth": 0.9975016713142395
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.450942724943161,
                        -0.729091227054596,
                        1.1873552799224854
                    ],
                    "area": 0.763822078704834,
                    "normal": [
                        1.0,
                        -2.334244015855802e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07226915657520294,
                        -0.7290910482406616,
                        1.1873552799224854
                    ],
                    "area": 0.7638219594955444,
                    "normal": [
                        -1.0,
                        2.3342444421814434e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.450942724943161,
                        -0.457816481590271,
                        -0.7444218397140503
                    ],
                    "area": 0.6040402054786682,
                    "normal": [
                        1.0,
                        -2.3342441579643491e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07226915657520294,
                        -0.45781630277633667,
                        -0.7444217801094055
                    ],
                    "area": 0.6040400862693787,
                    "normal": [
                        -1.0,
                        2.3342445842899906e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6666666269302368,
                        -0.7460345029830933,
                        -1.0
                    ],
                    "area": 0.5502682328224182,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6666667461395264,
                        0.746034562587738,
                        -1.0
                    ],
                    "area": 0.5502681732177734,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6845752000808716,
                        0.2968701720237732,
                        -0.8695697784423828
                    ],
                    "area": 0.5300071835517883,
                    "normal": [
                        0.9836104512214661,
                        -0.18030652403831482,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6845752000808716,
                        0.02559543401002884,
                        1.1873552799224854
                    ],
                    "area": 0.5300071239471436,
                    "normal": [
                        0.9836104512214661,
                        -0.1803065538406372,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6166784167289734,
                        0.6900944709777832,
                        0.8271845579147339
                    ],
                    "area": 0.4708411395549774,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6166778206825256,
                        -0.6900953054428101,
                        0.8271845579147339
                    ],
                    "area": 0.4708409309387207,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                }
            ]
        },
        "Ships_WindowBlockhalf.027": {
            "collection": "Ships",
            "object_name": "WindowBlockhalf.027",
            "dimensions": {
                "width": 0.37856703996658325,
                "height": 0.23600386083126068,
                "depth": 0.9975016713142395
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.450942724943161,
                        -0.729091227054596,
                        1.1873552799224854
                    ],
                    "area": 0.763822078704834,
                    "normal": [
                        1.0,
                        -2.334244015855802e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07226915657520294,
                        -0.7290910482406616,
                        1.1873552799224854
                    ],
                    "area": 0.7638219594955444,
                    "normal": [
                        -1.0,
                        2.3342444421814434e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.450942724943161,
                        -0.457816481590271,
                        -0.7444218397140503
                    ],
                    "area": 0.6040402054786682,
                    "normal": [
                        1.0,
                        -2.3342441579643491e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07226915657520294,
                        -0.45781630277633667,
                        -0.7444217801094055
                    ],
                    "area": 0.6040400862693787,
                    "normal": [
                        -1.0,
                        2.3342445842899906e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6666666269302368,
                        -0.7460345029830933,
                        -1.0
                    ],
                    "area": 0.5502682328224182,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6666667461395264,
                        0.746034562587738,
                        -1.0
                    ],
                    "area": 0.5502681732177734,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6845752000808716,
                        0.2968701720237732,
                        -0.8695697784423828
                    ],
                    "area": 0.5300071835517883,
                    "normal": [
                        0.9836104512214661,
                        -0.18030652403831482,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6845752000808716,
                        0.02559543401002884,
                        1.1873552799224854
                    ],
                    "area": 0.5300071239471436,
                    "normal": [
                        0.9836104512214661,
                        -0.1803065538406372,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6166784167289734,
                        0.6900944709777832,
                        0.8271845579147339
                    ],
                    "area": 0.4708411395549774,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6166778206825256,
                        -0.6900953054428101,
                        0.8271845579147339
                    ],
                    "area": 0.4708409309387207,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                }
            ]
        },
        "Ships_WindowBlockhalf.002": {
            "collection": "Ships",
            "object_name": "WindowBlockhalf.002",
            "dimensions": {
                "width": 0.37856703996658325,
                "height": 0.23600387573242188,
                "depth": 0.9975016713142395
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.450942724943161,
                        -0.729091227054596,
                        1.1873552799224854
                    ],
                    "area": 0.763822078704834,
                    "normal": [
                        1.0,
                        -2.334244015855802e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07226915657520294,
                        -0.7290910482406616,
                        1.1873552799224854
                    ],
                    "area": 0.7638219594955444,
                    "normal": [
                        -1.0,
                        2.3342444421814434e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.450942724943161,
                        -0.457816481590271,
                        -0.7444218397140503
                    ],
                    "area": 0.6040402054786682,
                    "normal": [
                        1.0,
                        -2.3342441579643491e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07226915657520294,
                        -0.45781630277633667,
                        -0.7444217801094055
                    ],
                    "area": 0.6040400862693787,
                    "normal": [
                        -1.0,
                        2.3342445842899906e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6666666269302368,
                        -0.7460345029830933,
                        -1.0
                    ],
                    "area": 0.5502682328224182,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6666667461395264,
                        0.746034562587738,
                        -1.0
                    ],
                    "area": 0.5502681732177734,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6845752000808716,
                        0.2968701720237732,
                        -0.8695697784423828
                    ],
                    "area": 0.5300071835517883,
                    "normal": [
                        0.9836104512214661,
                        -0.18030652403831482,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6845752000808716,
                        0.02559543401002884,
                        1.1873552799224854
                    ],
                    "area": 0.5300071239471436,
                    "normal": [
                        0.9836104512214661,
                        -0.1803065538406372,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6166784167289734,
                        0.6900944709777832,
                        0.8271845579147339
                    ],
                    "area": 0.4708411395549774,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6166778206825256,
                        -0.6900953054428101,
                        0.8271845579147339
                    ],
                    "area": 0.4708409309387207,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                }
            ]
        },
        "Ships_WindowBlockhalf.000": {
            "collection": "Ships",
            "object_name": "WindowBlockhalf.000",
            "dimensions": {
                "width": 0.37856703996658325,
                "height": 0.23600387573242188,
                "depth": 0.9975016713142395
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.450942724943161,
                        -0.729091227054596,
                        1.1873552799224854
                    ],
                    "area": 0.763822078704834,
                    "normal": [
                        1.0,
                        -2.334244015855802e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07226915657520294,
                        -0.7290910482406616,
                        1.1873552799224854
                    ],
                    "area": 0.7638219594955444,
                    "normal": [
                        -1.0,
                        2.3342444421814434e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.450942724943161,
                        -0.457816481590271,
                        -0.7444218397140503
                    ],
                    "area": 0.6040402054786682,
                    "normal": [
                        1.0,
                        -2.3342441579643491e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07226915657520294,
                        -0.45781630277633667,
                        -0.7444217801094055
                    ],
                    "area": 0.6040400862693787,
                    "normal": [
                        -1.0,
                        2.3342445842899906e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6666666269302368,
                        -0.7460345029830933,
                        -1.0
                    ],
                    "area": 0.5502682328224182,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6666667461395264,
                        0.746034562587738,
                        -1.0
                    ],
                    "area": 0.5502681732177734,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6845752000808716,
                        0.2968701720237732,
                        -0.8695697784423828
                    ],
                    "area": 0.5300071835517883,
                    "normal": [
                        0.9836104512214661,
                        -0.18030652403831482,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6845752000808716,
                        0.02559543401002884,
                        1.1873552799224854
                    ],
                    "area": 0.5300071239471436,
                    "normal": [
                        0.9836104512214661,
                        -0.1803065538406372,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6166784167289734,
                        0.6900944709777832,
                        0.8271845579147339
                    ],
                    "area": 0.4708411395549774,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.6166778206825256,
                        -0.6900953054428101,
                        0.8271845579147339
                    ],
                    "area": 0.4708409309387207,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                }
            ]
        },
        "Ships_hull.lump.001": {
            "collection": "Ships",
            "object_name": "hull.lump.001",
            "dimensions": {
                "width": 2.2574493885040283,
                "height": 2.827028512954712,
                "depth": 8.193129539489746
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.999998927116394,
                        4.4438700675964355,
                        -1.2860068082809448
                    ],
                    "area": 5.4582648277282715,
                    "normal": [
                        -1.0,
                        2.1280777673382545e-07,
                        4.597325542476938e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.000001311302185,
                        4.443869590759277,
                        1.2860077619552612
                    ],
                    "area": 5.458263874053955,
                    "normal": [
                        1.0,
                        -2.1826440388394985e-07,
                        7.77377593408346e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.9999992251396179,
                        4.443870544433594,
                        1.2860077619552612
                    ],
                    "area": 5.458263397216797,
                    "normal": [
                        -1.0,
                        2.0189456506614079e-07,
                        -4.2086298890353646e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.0000008344650269,
                        4.443870544433594,
                        -1.2860068082809448
                    ],
                    "area": 5.458263397216797,
                    "normal": [
                        1.0,
                        -2.1826437546224042e-07,
                        -7.773766697027895e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.654833436012268,
                        4.576239109039307,
                        5.364418029785156e-07
                    ],
                    "area": 5.024701118469238,
                    "normal": [
                        -1.0,
                        4.010153418221307e-07,
                        -4.513660769589478e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6548352241516113,
                        4.576238632202148,
                        5.364418029785156e-07
                    ],
                    "area": 5.02470064163208,
                    "normal": [
                        0.9999999403953552,
                        -4.3861055587512965e-07,
                        -7.334702445405128e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7574278116226196,
                        4.621840000152588,
                        -2.2351973056793213
                    ],
                    "area": 4.268676280975342,
                    "normal": [
                        0.8800358176231384,
                        -1.2916018476971658e-07,
                        -0.4749073386192322
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7574257850646973,
                        4.62183952331543,
                        -2.2351973056793213
                    ],
                    "area": 4.268675327301025,
                    "normal": [
                        -0.8800356984138489,
                        2.443570963350794e-07,
                        -0.47490745782852173
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6983988285064697,
                        -1.4112650156021118,
                        -0.0011479854583740234
                    ],
                    "area": 4.191441059112549,
                    "normal": [
                        0.9567577838897705,
                        0.2908857762813568,
                        1.7064674295852456e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6984050273895264,
                        -1.411264181137085,
                        -0.0011479854583740234
                    ],
                    "area": 4.191440105438232,
                    "normal": [
                        -0.9567577242851257,
                        0.2908858358860016,
                        -5.688225712674466e-08
                    ]
                }
            ]
        },
        "Ships_HandleHull.001": {
            "collection": "Ships",
            "object_name": "HandleHull.001",
            "dimensions": {
                "width": 2.360805034637451,
                "height": 1.930761456489563,
                "depth": 8.028614044189453
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.38863152265548706,
                        -1.000443696975708,
                        0.32818347215652466
                    ],
                    "area": 0.37054896354675293,
                    "normal": [
                        -1.0,
                        -7.686882241841886e-08,
                        7.670163197073462e-14
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3886314928531647,
                        -1.000443696975708,
                        -0.1496930718421936
                    ],
                    "area": 0.37054896354675293,
                    "normal": [
                        -1.0,
                        -5.7651615037457304e-08,
                        -3.1182086246417384e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.741335391998291,
                        0.2523091733455658,
                        -0.058705076575279236
                    ],
                    "area": 0.319082647562027,
                    "normal": [
                        -1.0,
                        -5.527419943973655e-08,
                        -1.1134149835835896e-13
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.741335391998291,
                        0.2523091733455658,
                        0.23719529807567596
                    ],
                    "area": 0.3190825879573822,
                    "normal": [
                        -1.0,
                        -5.568136529632284e-08,
                        -2.0143471601841156e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7553744316101074,
                        -1.7758514881134033,
                        -0.08881070464849472
                    ],
                    "area": 0.27613189816474915,
                    "normal": [
                        1.0,
                        3.843441476192311e-08,
                        8.368807868919248e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7553744316101074,
                        -1.7758517265319824,
                        0.2673013210296631
                    ],
                    "area": 0.27613186836242676,
                    "normal": [
                        1.0,
                        3.843440765649575e-08,
                        8.368802895120098e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7809098958969116,
                        -2.8622584342956543,
                        0.2371959239244461
                    ],
                    "area": 0.26631155610084534,
                    "normal": [
                        -0.9987666606903076,
                        -0.049650389701128006,
                        2.8676356578216655e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7809098958969116,
                        -2.8622584342956543,
                        -0.05870531499385834
                    ],
                    "area": 0.26631152629852295,
                    "normal": [
                        -0.9987666606903076,
                        -0.04965035989880562,
                        -1.8185011185778421e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.03533297777175903,
                        -2.288133144378662,
                        -0.3886316120624542
                    ],
                    "area": 0.23813223838806152,
                    "normal": [
                        1.2472872867874685e-07,
                        1.3106257483741501e-06,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.035333022475242615,
                        -2.288133144378662,
                        0.567122220993042
                    ],
                    "area": 0.23813211917877197,
                    "normal": [
                        -3.1181347281972194e-08,
                        1.3469228861140436e-06,
                        1.0
                    ]
                }
            ]
        },
        "Ships_Ram.002": {
            "collection": "Ships",
            "object_name": "Ram.002",
            "dimensions": {
                "width": 3.133126974105835,
                "height": 2.8021700382232666,
                "depth": 4.930736541748047
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.16962675750255585,
                        0.2720210552215576,
                        -0.42749032378196716
                    ],
                    "area": 0.3489880859851837,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.16962675750255585,
                        0.2720211148262024,
                        -0.42749032378196716
                    ],
                    "area": 0.3489880859851837,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.857035219669342,
                        0.02776108682155609,
                        0.0
                    ],
                    "area": 0.3392602205276489,
                    "normal": [
                        1.0,
                        -3.4062756526509474e-07,
                        -1.1163360369437214e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.857035219669342,
                        0.02776108682155609,
                        0.0
                    ],
                    "area": 0.3392602205276489,
                    "normal": [
                        -1.0,
                        -3.4062756526509474e-07,
                        -1.1163360369437214e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.12895631790161133,
                        0.4237499237060547,
                        0.3470892608165741
                    ],
                    "area": 0.3324665129184723,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.12895631790161133,
                        0.4237499237060547,
                        0.3470892608165741
                    ],
                    "area": 0.3324665129184723,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3741254210472107,
                        0.3997263014316559,
                        0.4046768546104431
                    ],
                    "area": 0.32924214005470276,
                    "normal": [
                        -1.0,
                        1.6183513196210697e-07,
                        7.153225567435584e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3741254210472107,
                        0.3997263014316559,
                        0.4046768546104431
                    ],
                    "area": 0.32924214005470276,
                    "normal": [
                        1.0,
                        1.6183513196210697e-07,
                        7.153225567435584e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7700328826904297,
                        0.39972609281539917,
                        0.4046768546104431
                    ],
                    "area": 0.32924214005470276,
                    "normal": [
                        -0.9999999403953552,
                        -3.2367029234592337e-07,
                        9.030273417920398e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7700328826904297,
                        0.39972609281539917,
                        0.4046768546104431
                    ],
                    "area": 0.32924211025238037,
                    "normal": [
                        0.9999999403953552,
                        -3.2367029234592337e-07,
                        9.030273417920398e-08
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -5.960464477539063e-08,
                        -1.359464168548584,
                        0.4950758218765259
                    ],
                    "area": 1.1467573642730713,
                    "normal": [
                        0.0,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.6193599700927734e-07,
                        1.7617101669311523,
                        -0.42990535497665405
                    ],
                    "area": 0.9941323399543762,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8624958992004395,
                        -0.02660636603832245,
                        0.8283513784408569
                    ],
                    "area": 0.9209167957305908,
                    "normal": [
                        0.8174780607223511,
                        -4.2070058725585113e-07,
                        0.5759598016738892
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8624957203865051,
                        -0.026606202125549316,
                        0.8283513784408569
                    ],
                    "area": 0.920916736125946,
                    "normal": [
                        -0.8174778819084167,
                        1.5776271311551682e-07,
                        0.5759599804878235
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.0044410228729248,
                        -2.980232238769531e-07,
                        0.31868791580200195
                    ],
                    "area": 0.9126121401786804,
                    "normal": [
                        0.9999906420707703,
                        -5.60191892873263e-07,
                        -0.004321479704231024
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0044407844543457,
                        -5.960464477539063e-08,
                        0.31868791580200195
                    ],
                    "area": 0.9126117825508118,
                    "normal": [
                        -0.9999906420707703,
                        2.4007320575947233e-07,
                        -0.004321882966905832
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5067538022994995,
                        8.940696716308594e-08,
                        -0.6666415929794312
                    ],
                    "area": 0.827649712562561,
                    "normal": [
                        -0.9999836683273315,
                        4.039690111312666e-07,
                        -0.005720613058656454
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5067540407180786,
                        -5.960464477539063e-08,
                        -0.6666415929794312
                    ],
                    "area": 0.827649712562561,
                    "normal": [
                        0.9999836683273315,
                        0.0,
                        -0.005720698274672031
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.76837158203125e-07,
                        1.6963263750076294,
                        -1.8293752670288086
                    ],
                    "area": 0.7665156722068787,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        7.301568984985352e-07,
                        2.6267287731170654,
                        -1.8293752670288086
                    ],
                    "area": 0.7665156722068787,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        1.1920928955078125e-07,
                        -0.8496261239051819,
                        -0.07470178604125977
                    ],
                    "area": 0.5353239178657532,
                    "normal": [
                        -2.1572735420249955e-07,
                        -0.9975347518920898,
                        0.0701746717095375
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.341104507446289e-07,
                        -0.17904892563819885,
                        -0.07470178604125977
                    ],
                    "area": 0.5353237986564636,
                    "normal": [
                        3.23591024198322e-07,
                        0.9975347518920898,
                        0.07017466425895691
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1175870895385742e-07,
                        -0.7633118629455566,
                        0.17742276191711426
                    ],
                    "area": 0.35843682289123535,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.2665987014770508e-07,
                        -0.04803553223609924,
                        -0.17848777770996094
                    ],
                    "area": 0.35339224338531494,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.4901161193847656e-08,
                        -0.5143377184867859,
                        -0.17848777770996094
                    ],
                    "area": 0.35339224338531494,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        9.685754776000977e-08,
                        -0.9806396961212158,
                        -0.3965120315551758
                    ],
                    "area": 0.35339221358299255,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.2665987014770508e-07,
                        -0.5143375396728516,
                        -0.3965120315551758
                    ],
                    "area": 0.35339218378067017,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -8.195638656616211e-08,
                        -0.9806398749351501,
                        -0.17848777770996094
                    ],
                    "area": 0.3533921539783478,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.564621925354004e-07,
                        -0.04803534597158432,
                        -0.3965120315551758
                    ],
                    "area": 0.3533921241760254,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1175870895385742e-07,
                        -0.2621897757053375,
                        0.3954470157623291
                    ],
                    "area": 0.3118617832660675,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                }
            ]
        },
        "Ships_double-block": {
            "collection": "Ships",
            "object_name": "double-block",
            "dimensions": {
                "width": 3.2578125,
                "height": 3.529193878173828,
                "depth": 5.0434441566467285
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.43424201011657715,
                        0.9331008195877075,
                        0.12519413232803345
                    ],
                    "area": 2.235077142715454,
                    "normal": [
                        0.9796802997589111,
                        0.16448068618774414,
                        -0.11477277427911758
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.43424201011657715,
                        0.9331012964248657,
                        0.12519413232803345
                    ],
                    "area": 2.235077142715454,
                    "normal": [
                        -0.9796801805496216,
                        0.1644807755947113,
                        -0.11477290093898773
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5261488556861877,
                        -0.40188151597976685,
                        0.2684532403945923
                    ],
                    "area": 1.8339545726776123,
                    "normal": [
                        -1.0,
                        6.020329124112322e-08,
                        -6.500122395891594e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5261486768722534,
                        -0.4018818736076355,
                        0.2684532403945923
                    ],
                    "area": 1.833954095840454,
                    "normal": [
                        1.0,
                        -5.780433909308158e-08,
                        1.2676591154558992e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.30947524309158325,
                        -1.7952072620391846,
                        0.03648458421230316
                    ],
                    "area": 1.6195462942123413,
                    "normal": [
                        0.8999374508857727,
                        -0.24782244861125946,
                        -0.35874301195144653
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3094766139984131,
                        -1.7952072620391846,
                        0.03648458421230316
                    ],
                    "area": 1.6195461750030518,
                    "normal": [
                        -0.8999376893043518,
                        -0.24782150983810425,
                        -0.35874316096305847
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3094756603240967,
                        -0.47567713260650635,
                        -0.7832875847816467
                    ],
                    "area": 1.3806768655776978,
                    "normal": [
                        0.8853327035903931,
                        -0.22389793395996094,
                        -0.40749940276145935
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.30947625637054443,
                        -0.47567689418792725,
                        -0.7832875847816467
                    ],
                    "area": 1.3806761503219604,
                    "normal": [
                        -0.8853331804275513,
                        -0.22389741241931915,
                        -0.4074985682964325
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.9439250230789185,
                        0.683989405632019,
                        1.787552833557129
                    ],
                    "area": 1.2218989133834839,
                    "normal": [
                        0.35347315669059753,
                        0.0,
                        0.935444712638855
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.943924069404602,
                        0.6839901208877563,
                        1.787552833557129
                    ],
                    "area": 1.2218965291976929,
                    "normal": [
                        -0.35347387194633484,
                        1.2195108922696818e-08,
                        0.9354443550109863
                    ]
                }
            ]
        },
        "Ships_Ram.001": {
            "collection": "Ships",
            "object_name": "Ram.001",
            "dimensions": {
                "width": 3.133126974105835,
                "height": 2.8021700382232666,
                "depth": 4.930736541748047
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.16962675750255585,
                        0.2720210552215576,
                        -0.42749032378196716
                    ],
                    "area": 0.3489880859851837,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.16962675750255585,
                        0.2720211148262024,
                        -0.42749032378196716
                    ],
                    "area": 0.3489880859851837,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.857035219669342,
                        0.02776108682155609,
                        0.0
                    ],
                    "area": 0.3392602205276489,
                    "normal": [
                        1.0,
                        -3.4062756526509474e-07,
                        -1.1163360369437214e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.857035219669342,
                        0.02776108682155609,
                        0.0
                    ],
                    "area": 0.3392602205276489,
                    "normal": [
                        -1.0,
                        -3.4062756526509474e-07,
                        -1.1163360369437214e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.12895631790161133,
                        0.4237499237060547,
                        0.3470892608165741
                    ],
                    "area": 0.3324665129184723,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.12895631790161133,
                        0.4237499237060547,
                        0.3470892608165741
                    ],
                    "area": 0.3324665129184723,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3741254210472107,
                        0.3997263014316559,
                        0.4046768546104431
                    ],
                    "area": 0.32924214005470276,
                    "normal": [
                        -1.0,
                        1.6183513196210697e-07,
                        7.153225567435584e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3741254210472107,
                        0.3997263014316559,
                        0.4046768546104431
                    ],
                    "area": 0.32924214005470276,
                    "normal": [
                        1.0,
                        1.6183513196210697e-07,
                        7.153225567435584e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7700328826904297,
                        0.39972609281539917,
                        0.4046768546104431
                    ],
                    "area": 0.32924214005470276,
                    "normal": [
                        -0.9999999403953552,
                        -3.2367029234592337e-07,
                        9.030273417920398e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7700328826904297,
                        0.39972609281539917,
                        0.4046768546104431
                    ],
                    "area": 0.32924211025238037,
                    "normal": [
                        0.9999999403953552,
                        -3.2367029234592337e-07,
                        9.030273417920398e-08
                    ]
                }
            ]
        },
        "Ships_HandleHull.002": {
            "collection": "Ships",
            "object_name": "HandleHull.002",
            "dimensions": {
                "width": 2.360805034637451,
                "height": 1.930761456489563,
                "depth": 8.028614044189453
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.38863152265548706,
                        -1.000443696975708,
                        0.32818347215652466
                    ],
                    "area": 0.37054896354675293,
                    "normal": [
                        -1.0,
                        -7.686882241841886e-08,
                        7.670163197073462e-14
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3886314928531647,
                        -1.000443696975708,
                        -0.1496930718421936
                    ],
                    "area": 0.37054896354675293,
                    "normal": [
                        -1.0,
                        -5.7651615037457304e-08,
                        -3.1182086246417384e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.741335391998291,
                        0.2523091733455658,
                        -0.058705076575279236
                    ],
                    "area": 0.319082647562027,
                    "normal": [
                        -1.0,
                        -5.527419943973655e-08,
                        -1.1134149835835896e-13
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.741335391998291,
                        0.2523091733455658,
                        0.23719529807567596
                    ],
                    "area": 0.3190825879573822,
                    "normal": [
                        -1.0,
                        -5.568136529632284e-08,
                        -2.0143471601841156e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7553744316101074,
                        -1.7758514881134033,
                        -0.08881070464849472
                    ],
                    "area": 0.27613189816474915,
                    "normal": [
                        1.0,
                        3.843441476192311e-08,
                        8.368807868919248e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7553744316101074,
                        -1.7758517265319824,
                        0.2673013210296631
                    ],
                    "area": 0.27613186836242676,
                    "normal": [
                        1.0,
                        3.843440765649575e-08,
                        8.368802895120098e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7809098958969116,
                        -2.8622584342956543,
                        0.2371959239244461
                    ],
                    "area": 0.26631155610084534,
                    "normal": [
                        -0.9987666606903076,
                        -0.049650389701128006,
                        2.8676356578216655e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7809098958969116,
                        -2.8622584342956543,
                        -0.05870531499385834
                    ],
                    "area": 0.26631152629852295,
                    "normal": [
                        -0.9987666606903076,
                        -0.04965035989880562,
                        -1.8185011185778421e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.03533297777175903,
                        -2.288133144378662,
                        -0.3886316120624542
                    ],
                    "area": 0.23813223838806152,
                    "normal": [
                        1.2472872867874685e-07,
                        1.3106257483741501e-06,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.035333022475242615,
                        -2.288133144378662,
                        0.567122220993042
                    ],
                    "area": 0.23813211917877197,
                    "normal": [
                        -3.1181347281972194e-08,
                        1.3469228861140436e-06,
                        1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -9.685754776000977e-08,
                        -0.4920387268066406,
                        0.8564288020133972
                    ],
                    "area": 0.8971675038337708,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.31495440006256104,
                        -0.4920390844345093,
                        0.5815612077713013
                    ],
                    "area": 0.875983715057373,
                    "normal": [
                        0.7687963843345642,
                        -6.804310004326908e-08,
                        0.6394935250282288
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.31495460867881775,
                        -0.49203842878341675,
                        0.5815612077713013
                    ],
                    "area": 0.8759836554527283,
                    "normal": [
                        -0.7687963843345642,
                        2.9768855824841012e-08,
                        0.6394936442375183
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4360184967517853,
                        -0.4656308889389038,
                        0.22213920950889587
                    ],
                    "area": 0.8436957001686096,
                    "normal": [
                        1.0,
                        -6.799477603181003e-08,
                        3.7479438219634176e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.43601858615875244,
                        -0.4656303822994232,
                        0.22213920950889587
                    ],
                    "area": 0.8436957001686096,
                    "normal": [
                        -0.9999999403953552,
                        6.043979539072097e-08,
                        -2.7122089818476525e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.35830169916152954,
                        -0.43922239542007446,
                        -0.21387933194637299
                    ],
                    "area": 0.5906088352203369,
                    "normal": [
                        -0.9439006447792053,
                        8.199805279218708e-08,
                        -0.3302297592163086
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3583018183708191,
                        -0.43922263383865356,
                        -0.21387933194637299
                    ],
                    "area": 0.5906087160110474,
                    "normal": [
                        0.9439006447792053,
                        0.0,
                        -0.33022958040237427
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.7567148208618164e-07,
                        0.9122288227081299,
                        -0.9133102297782898
                    ],
                    "area": 0.5322743654251099,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6315845847129822,
                        1.6027603149414062,
                        -0.19007685780525208
                    ],
                    "area": 0.5061988830566406,
                    "normal": [
                        -0.8158777952194214,
                        3.6796706126551726e-07,
                        0.5782243609428406
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6315856575965881,
                        1.602759838104248,
                        -0.19007685780525208
                    ],
                    "area": 0.5061988830566406,
                    "normal": [
                        0.8158777952194214,
                        -7.359341225310345e-07,
                        0.5782243609428406
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.7256385087966919,
                        -1.9773136377334595,
                        -0.3570116460323334
                    ],
                    "area": 2.1531810760498047,
                    "normal": [
                        1.0,
                        -1.5094832050976947e-08,
                        -1.9128871997509123e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7256388068199158,
                        -1.977313756942749,
                        -0.35701167583465576
                    ],
                    "area": 2.1531808376312256,
                    "normal": [
                        -1.0,
                        4.5284512140142397e-08,
                        3.552505347670376e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6362277269363403,
                        2.0399065017700195,
                        0.21587631106376648
                    ],
                    "area": 1.552703619003296,
                    "normal": [
                        -1.0,
                        -2.4505760620741057e-07,
                        4.2016122847599036e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6362261772155762,
                        2.0399062633514404,
                        0.21587631106376648
                    ],
                    "area": 1.5527032613754272,
                    "normal": [
                        1.0,
                        2.1782908277145907e-07,
                        2.52096697295201e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5452916622161865,
                        -1.7848968505859375,
                        0.8069641590118408
                    ],
                    "area": 1.2997218370437622,
                    "normal": [
                        1.0,
                        0.0,
                        5.618791192318895e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5452914237976074,
                        -1.7848970890045166,
                        0.8069642186164856
                    ],
                    "area": 1.2997217178344727,
                    "normal": [
                        -1.0,
                        0.0,
                        -1.8729301132225373e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2934301495552063,
                        1.3799879550933838,
                        -0.519493818283081
                    ],
                    "area": 1.2484159469604492,
                    "normal": [
                        0.9897866249084473,
                        0.03363073244690895,
                        -0.1385328620672226
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.29343149065971375,
                        1.3799875974655151,
                        -0.5194938778877258
                    ],
                    "area": 1.2484157085418701,
                    "normal": [
                        -0.9897865653038025,
                        0.033630549907684326,
                        -0.13853314518928528
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5907598733901978,
                        2.0399065017700195,
                        0.8119933009147644
                    ],
                    "area": 1.075726866722107,
                    "normal": [
                        -0.982729434967041,
                        -2.181718201654803e-07,
                        0.18504835665225983
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5907584428787231,
                        2.0399065017700195,
                        0.8119933009147644
                    ],
                    "area": 1.0757265090942383,
                    "normal": [
                        0.982729434967041,
                        2.3721862874026556e-07,
                        0.18504835665225983
                    ]
                }
            ]
        },
        "Ships_BeardHull.002": {
            "collection": "Ships",
            "object_name": "BeardHull.002",
            "dimensions": {
                "width": 15.57632064819336,
                "height": 11.66393756866455,
                "depth": 37.463565826416016
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.7775936126708984,
                        2.5018868446350098,
                        -1.2926576137542725
                    ],
                    "area": 10.930150032043457,
                    "normal": [
                        0.0,
                        -0.08328108489513397,
                        -0.9965260624885559
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.7775936126708984,
                        2.5018868446350098,
                        -1.2926576137542725
                    ],
                    "area": 10.930150032043457,
                    "normal": [
                        0.0,
                        -0.08328108489513397,
                        -0.9965260624885559
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6224801540374756,
                        1.8666231632232666,
                        -0.09180635213851929
                    ],
                    "area": 9.466373443603516,
                    "normal": [
                        1.0,
                        -4.426714994565373e-08,
                        2.437909927266446e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6224801540374756,
                        1.8666231632232666,
                        -0.0918063372373581
                    ],
                    "area": 9.466373443603516,
                    "normal": [
                        -1.0,
                        -4.426714994565373e-08,
                        2.437909927266446e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.8633733987808228,
                        -3.2858691215515137,
                        -0.7152895927429199
                    ],
                    "area": 8.298829078674316,
                    "normal": [
                        0.9956941604614258,
                        0.01404566690325737,
                        -0.09162777662277222
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.8633733987808228,
                        -3.2858691215515137,
                        -0.7152895927429199
                    ],
                    "area": 8.298829078674316,
                    "normal": [
                        -0.9956941604614258,
                        0.01404566690325737,
                        -0.09162777662277222
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.71734881401062,
                        -9.020746231079102,
                        2.2807393074035645
                    ],
                    "area": 7.939254283905029,
                    "normal": [
                        -0.21605660021305084,
                        1.5015174881227722e-08,
                        -0.9763808250427246
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.71734881401062,
                        -9.020746231079102,
                        2.2807393074035645
                    ],
                    "area": 7.939253807067871,
                    "normal": [
                        -0.21605657041072845,
                        4.5045524643683166e-08,
                        0.9763808250427246
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6439305543899536,
                        7.599869728088379,
                        -0.3390961289405823
                    ],
                    "area": 7.578249931335449,
                    "normal": [
                        1.0,
                        -5.7315716617267753e-08,
                        -1.352798761899976e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6439305543899536,
                        7.599869728088379,
                        -0.3390961289405823
                    ],
                    "area": 7.578249454498291,
                    "normal": [
                        -1.0,
                        -5.7315716617267753e-08,
                        -1.352798761899976e-07
                    ]
                }
            ]
        },
        "Ships_BattleShip": {
            "collection": "Ships",
            "object_name": "BattleShip",
            "dimensions": {
                "width": 15.576321601867676,
                "height": 11.66393756866455,
                "depth": 37.46356201171875
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.7775936126708984,
                        2.5018868446350098,
                        -1.2926576137542725
                    ],
                    "area": 10.930150032043457,
                    "normal": [
                        0.0,
                        -0.08328108489513397,
                        -0.9965260624885559
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.7775936126708984,
                        2.5018868446350098,
                        -1.2926576137542725
                    ],
                    "area": 10.930150032043457,
                    "normal": [
                        0.0,
                        -0.08328108489513397,
                        -0.9965260624885559
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6224801540374756,
                        1.8666231632232666,
                        -0.09180635213851929
                    ],
                    "area": 9.466373443603516,
                    "normal": [
                        1.0,
                        -4.426714994565373e-08,
                        2.437909927266446e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6224801540374756,
                        1.8666231632232666,
                        -0.0918063372373581
                    ],
                    "area": 9.466373443603516,
                    "normal": [
                        -1.0,
                        -4.426714994565373e-08,
                        2.437909927266446e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.8633733987808228,
                        -3.2858691215515137,
                        -0.7152895927429199
                    ],
                    "area": 8.298829078674316,
                    "normal": [
                        0.9956941604614258,
                        0.01404566690325737,
                        -0.09162777662277222
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.8633733987808228,
                        -3.2858691215515137,
                        -0.7152895927429199
                    ],
                    "area": 8.298829078674316,
                    "normal": [
                        -0.9956941604614258,
                        0.01404566690325737,
                        -0.09162777662277222
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -2.717346668243408,
                        -9.020746231079102,
                        2.2807390689849854
                    ],
                    "area": 7.939246654510498,
                    "normal": [
                        -0.21605655550956726,
                        -3.003036042059648e-08,
                        0.9763808250427246
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.7173476219177246,
                        -9.020746231079102,
                        2.2807393074035645
                    ],
                    "area": 7.939246654510498,
                    "normal": [
                        -0.21605658531188965,
                        -1.501518021029824e-08,
                        -0.9763808250427246
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.6439305543899536,
                        7.599869728088379,
                        -0.3390961289405823
                    ],
                    "area": 7.578249931335449,
                    "normal": [
                        1.0,
                        -5.7315716617267753e-08,
                        -1.352798761899976e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6439305543899536,
                        7.599869728088379,
                        -0.3390961289405823
                    ],
                    "area": 7.578249454498291,
                    "normal": [
                        -1.0,
                        -5.7315716617267753e-08,
                        -1.352798761899976e-07
                    ]
                }
            ]
        },
        "Ships_ship": {
            "collection": "Ships",
            "object_name": "ship",
            "dimensions": {
                "width": 19.122570037841797,
                "height": 12.892131805419922,
                "depth": 39.099693298339844
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.1920928955078125e-07,
                        -3.668600082397461,
                        -1.234264612197876
                    ],
                    "area": 4.591720104217529,
                    "normal": [
                        4.882859343524615e-07,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.011993646621704,
                        -3.0988337993621826,
                        -0.40164873003959656
                    ],
                    "area": 4.187893867492676,
                    "normal": [
                        1.0,
                        -2.1647148074066536e-08,
                        -1.9594479283568944e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0119941234588623,
                        -3.0988340377807617,
                        -0.40164780616760254
                    ],
                    "area": 4.187892436981201,
                    "normal": [
                        -1.0,
                        4.329432101712882e-08,
                        2.351337826667077e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.1920928955078125e-07,
                        -3.668599843978882,
                        -1.4119317531585693
                    ],
                    "area": 3.340519428253174,
                    "normal": [
                        -4.467007386210753e-07,
                        7.61867795517901e-08,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8872992992401123,
                        2.5036826133728027,
                        0.39731618762016296
                    ],
                    "area": 3.01997709274292,
                    "normal": [
                        -0.9999999403953552,
                        -2.3428763995525514e-07,
                        4.820348067369196e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8872969150543213,
                        2.503682851791382,
                        0.3973153829574585
                    ],
                    "area": 3.0199756622314453,
                    "normal": [
                        1.0,
                        2.1476380140939e-07,
                        2.410174033684598e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.1920928955078125e-07,
                        -3.6685993671417236,
                        -3.007051944732666
                    ],
                    "area": 2.6961562633514404,
                    "normal": [
                        -4.1579053799978283e-07,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7604773640632629,
                        -2.83048415184021,
                        1.2216615676879883
                    ],
                    "area": 2.527932643890381,
                    "normal": [
                        1.0,
                        0.0,
                        6.043333655725291e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7604772448539734,
                        -2.8304851055145264,
                        1.2216622829437256
                    ],
                    "area": 2.5279316902160645,
                    "normal": [
                        -1.0,
                        4.1859184563008967e-08,
                        -1.6565452654049295e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4092250168323517,
                        1.5833438634872437,
                        -0.628250241279602
                    ],
                    "area": 2.4281435012817383,
                    "normal": [
                        0.9897866249084473,
                        0.03363073617219925,
                        -0.1385328471660614
                    ]
                }
            ]
        },
        "Ships_shipblue": {
            "collection": "Ships",
            "object_name": "shipblue",
            "dimensions": {
                "width": 19.122570037841797,
                "height": 12.892129898071289,
                "depth": 39.09968948364258
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -2.3858580589294434,
                        -0.9540295600891113
                    ],
                    "area": 2.360806465148926,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7256385087966919,
                        -1.9773136377334595,
                        -0.3570116460323334
                    ],
                    "area": 2.1531810760498047,
                    "normal": [
                        1.0,
                        -1.5094832050976947e-08,
                        -1.9128871997509123e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7256388068199158,
                        -1.977313756942749,
                        -0.35701167583465576
                    ],
                    "area": 2.1531808376312256,
                    "normal": [
                        -1.0,
                        4.5284512140142397e-08,
                        3.552505347670376e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -2.3858578205108643,
                        -1.0814237594604492
                    ],
                    "area": 1.7175085544586182,
                    "normal": [
                        0.0,
                        1.0625199564628929e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6362277269363403,
                        2.0399065017700195,
                        0.21587631106376648
                    ],
                    "area": 1.552703619003296,
                    "normal": [
                        -1.0,
                        -2.4505760620741057e-07,
                        4.2016122847599036e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6362261772155762,
                        2.0399062633514404,
                        0.21587631106376648
                    ],
                    "area": 1.5527032613754272,
                    "normal": [
                        1.0,
                        2.1782908277145907e-07,
                        2.52096697295201e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -2.385857582092285,
                        -2.225186347961426
                    ],
                    "area": 1.3862130641937256,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5452916622161865,
                        -1.7848968505859375,
                        0.8069641590118408
                    ],
                    "area": 1.2997218370437622,
                    "normal": [
                        1.0,
                        0.0,
                        5.618791192318895e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5452914237976074,
                        -1.7848970890045166,
                        0.8069642186164856
                    ],
                    "area": 1.2997217178344727,
                    "normal": [
                        -1.0,
                        0.0,
                        -1.8729301132225373e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.2934301495552063,
                        1.3799879550933838,
                        -0.519493818283081
                    ],
                    "area": 1.2484159469604492,
                    "normal": [
                        0.9897866249084473,
                        0.03363073244690895,
                        -0.1385328620672226
                    ]
                }
            ]
        },
        "Weapons_hardPoint.dev.gas": {
            "collection": "Weapons",
            "object_name": "hardPoint.dev.gas",
            "dimensions": {
                "width": 1.7260305881500244,
                "height": 0.9266287088394165,
                "depth": 2.153050184249878
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7973989248275757,
                        -0.32688456773757935,
                        0.5705496072769165
                    ],
                    "area": 0.227626770734787,
                    "normal": [
                        -1.0,
                        -1.1154470485053025e-06,
                        9.794573543331353e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.7973989248275757,
                        -0.32688456773757935,
                        0.5705496072769165
                    ],
                    "area": 0.2276267558336258,
                    "normal": [
                        1.0,
                        -1.1154470485053025e-06,
                        9.794573543331353e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6230098009109497,
                        -0.44230520725250244,
                        0.7578442096710205
                    ],
                    "area": 0.21195797622203827,
                    "normal": [
                        -0.19763009250164032,
                        -2.8120973638579017e-07,
                        0.9802765846252441
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6230100393295288,
                        -0.44230493903160095,
                        0.3832548260688782
                    ],
                    "area": 0.21195797622203827,
                    "normal": [
                        0.19763058423995972,
                        -1.6257438062439178e-07,
                        -0.9802765250205994
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6230100989341736,
                        -0.44230493903160095,
                        0.3832548260688782
                    ],
                    "area": 0.21195797622203827,
                    "normal": [
                        -0.19763058423995972,
                        -1.6257438062439178e-07,
                        -0.9802765250205994
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6230098605155945,
                        -0.44230520725250244,
                        0.7578442096710205
                    ],
                    "area": 0.21195794641971588,
                    "normal": [
                        0.19763009250164032,
                        -2.8120973638579017e-07,
                        0.9802765846252441
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -0.6045305728912354,
                        0.29887184500694275
                    ],
                    "area": 0.19124332070350647,
                    "normal": [
                        0.0,
                        1.1100156882548617e-07,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -0.6045304536819458,
                        0.8422271609306335
                    ],
                    "area": 0.1912432312965393,
                    "normal": [
                        0.0,
                        -1.1100159014176825e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.3765602707862854,
                        0.24217724800109863,
                        0.2988719344139099
                    ],
                    "area": 0.169479101896286,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.3765602707862854,
                        0.24217724800109863,
                        0.2988719344139099
                    ],
                    "area": 0.169479101896286,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.3795871138572693,
                        0.19502300024032593,
                        0.27829399704933167
                    ],
                    "area": 0.35635003447532654,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.3795871138572693,
                        0.19502297043800354,
                        0.27829399704933167
                    ],
                    "area": 0.35635003447532654,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3795871138572693,
                        -0.31414803862571716,
                        0.44098764657974243
                    ],
                    "area": 0.3071257472038269,
                    "normal": [
                        4.851811752359936e-08,
                        -0.6211490035057068,
                        -0.7836925983428955
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3795871138572693,
                        -0.31414803862571716,
                        0.44098764657974243
                    ],
                    "area": 0.3071257472038269,
                    "normal": [
                        -4.851811752359936e-08,
                        -0.6211490035057068,
                        -0.7836925983428955
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.3795868754386902,
                        -0.7541128396987915,
                        0.603681206703186
                    ],
                    "area": 0.27520036697387695,
                    "normal": [
                        -7.745731410869344e-14,
                        5.079283482700703e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.3795868754386902,
                        -0.7541128396987915,
                        0.603681206703186
                    ],
                    "area": 0.27520036697387695,
                    "normal": [
                        7.745731410869344e-14,
                        5.079283482700703e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8204374313354492,
                        0.2094975709915161,
                        0.5724288821220398
                    ],
                    "area": 0.19217170774936676,
                    "normal": [
                        1.0,
                        -5.790360546598095e-07,
                        -8.78006574112078e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8204374313354492,
                        0.2094975709915161,
                        0.5724288821220398
                    ],
                    "area": 0.19217170774936676,
                    "normal": [
                        -1.0,
                        -5.790360546598095e-07,
                        -8.78006574112078e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3795865476131439,
                        -1.0436296463012695,
                        0.7732331156730652
                    ],
                    "area": 0.13885441422462463,
                    "normal": [
                        0.0,
                        -1.0,
                        -1.0066803497466026e-06
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3795865476131439,
                        -1.0436296463012695,
                        0.7732331156730652
                    ],
                    "area": 0.13885441422462463,
                    "normal": [
                        0.0,
                        -1.0,
                        -1.0066803497466026e-06
                    ]
                }
            ]
        },
        "Weapons_hardPoint.dev.dual": {
            "collection": "Weapons",
            "object_name": "hardPoint.dev.dual",
            "dimensions": {
                "width": 1.225330114364624,
                "height": 0.8360453844070435,
                "depth": 1.7603719234466553
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.5988312363624573,
                        0.061942026019096375,
                        0.49581679701805115
                    ],
                    "area": 0.3191368579864502,
                    "normal": [
                        0.9998744130134583,
                        -0.013792338781058788,
                        0.007812095806002617
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5988312363624573,
                        0.061942026019096375,
                        0.49581679701805115
                    ],
                    "area": 0.3191368579864502,
                    "normal": [
                        -0.9998744130134583,
                        -0.013792338781058788,
                        0.007812095806002617
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.31631380319595337,
                        0.09741412103176117,
                        0.19140654802322388
                    ],
                    "area": 0.24296662211418152,
                    "normal": [
                        -0.0009776657680049539,
                        0.00027063279412686825,
                        -0.9999995231628418
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.31631380319595337,
                        0.09741412103176117,
                        0.19140654802322388
                    ],
                    "area": 0.24296660721302032,
                    "normal": [
                        0.0009776657680049539,
                        0.00027063279412686825,
                        -0.9999995231628418
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.0,
                        0.20409232378005981,
                        0.7504981160163879
                    ],
                    "area": 0.20963741838932037,
                    "normal": [
                        0.0,
                        0.18323282897472382,
                        0.9830695390701294
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        0.1596110761165619,
                        0.19124168157577515
                    ],
                    "area": 0.20301665365695953,
                    "normal": [
                        0.0,
                        -0.0003157549072057009,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5946590304374695,
                        -0.38272058963775635,
                        0.5275322794914246
                    ],
                    "area": 0.19349578022956848,
                    "normal": [
                        1.0,
                        -5.528635256268899e-07,
                        5.953241952738608e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5946590304374695,
                        -0.38272058963775635,
                        0.5275322794914246
                    ],
                    "area": 0.1934957653284073,
                    "normal": [
                        -1.0,
                        -5.528635256268899e-07,
                        5.953241952738608e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.36376920342445374,
                        -0.3775329291820526,
                        0.8327138423919678
                    ],
                    "area": 0.14632445573806763,
                    "normal": [
                        1.209307782801261e-07,
                        0.021027568727731705,
                        0.9997789263725281
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.36376917362213135,
                        -0.3775329291820526,
                        0.8327138423919678
                    ],
                    "area": 0.14632444083690643,
                    "normal": [
                        -1.209307782801261e-07,
                        0.021027568727731705,
                        0.9997789263725281
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.0568486750125885,
                        0.5753225088119507,
                        0.0009883120656013489
                    ],
                    "area": 0.10573247820138931,
                    "normal": [
                        -1.0,
                        7.996420237077473e-08,
                        -6.278379771629261e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.05684874579310417,
                        0.5753224492073059,
                        0.0009883120656013489
                    ],
                    "area": 0.10573247075080872,
                    "normal": [
                        1.0,
                        -7.526043077632494e-08,
                        1.3951946264967319e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        8.568167686462402e-08,
                        -0.04926152527332306,
                        0.09781220555305481
                    ],
                    "area": 0.059908427298069,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.0803341865539551e-07,
                        -0.052351538091897964,
                        -0.1618661880493164
                    ],
                    "area": 0.0599084198474884,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.862645149230957e-07,
                        0.3270465135574341,
                        -0.17042545974254608
                    ],
                    "area": 0.054660771042108536,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.601874828338623e-07,
                        0.5359261631965637,
                        0.1509832739830017
                    ],
                    "area": 0.04642048478126526,
                    "normal": [
                        -3.8266658179859914e-14,
                        -4.617216831093174e-08,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.601874828338623e-07,
                        0.5328360199928284,
                        -0.1428261548280716
                    ],
                    "area": 0.04553151875734329,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.421438694000244e-07,
                        0.5517458319664001,
                        0.09259273111820221
                    ],
                    "area": 0.04107945039868355,
                    "normal": [
                        0.0,
                        -0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.421438694000244e-07,
                        0.5517457723617554,
                        -0.087399922311306
                    ],
                    "area": 0.04107945039868355,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.4586915969848633e-07,
                        0.5517458915710449,
                        0.07573603093624115
                    ],
                    "area": 0.041079431772232056,
                    "normal": [
                        0.0,
                        0.0,
                        -0.9999999403953552
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.07890032231807709,
                        -0.3338732123374939,
                        -2.9802322387695312e-08
                    ],
                    "area": 0.08540450036525726,
                    "normal": [
                        0.9999999403953552,
                        -4.0092439235195343e-07,
                        1.864379157723306e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.07890048623085022,
                        -0.3338731527328491,
                        -2.9802322387695312e-08
                    ],
                    "area": 0.08540450036525726,
                    "normal": [
                        -0.9999999403953552,
                        4.7065040575944295e-07,
                        0.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.0803341865539551e-07,
                        0.4375118911266327,
                        0.09990686178207397
                    ],
                    "area": 0.04017017036676407,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        9.12696123123169e-08,
                        0.43751198053359985,
                        -0.09990686178207397
                    ],
                    "area": 0.04017016664147377,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.04640921950340271,
                        0.08462727069854736,
                        0.0
                    ],
                    "area": 0.039864979684352875,
                    "normal": [
                        -1.0,
                        7.468851492831163e-08,
                        1.3924789666057598e-14
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.04640930891036987,
                        0.08462721109390259,
                        0.0
                    ],
                    "area": 0.039864979684352875,
                    "normal": [
                        1.0,
                        -7.468852203373899e-08,
                        -1.8643847354837817e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.057964351028203964,
                        -0.3338731527328491,
                        0.13322937488555908
                    ],
                    "area": 0.030523262917995453,
                    "normal": [
                        -0.9332384467124939,
                        3.5660772823575826e-07,
                        0.3592577576637268
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.05796419084072113,
                        -0.33387327194213867,
                        0.13322937488555908
                    ],
                    "area": 0.030523261055350304,
                    "normal": [
                        0.9332385659217834,
                        -4.1953856566578906e-07,
                        0.35925719141960144
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -6.05359673500061e-08,
                        -0.24913550913333893,
                        -0.1502084583044052
                    ],
                    "area": 0.02894783951342106,
                    "normal": [
                        0.0,
                        1.5529937513747427e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.07890035957098007,
                        -0.06764546781778336,
                        0.0
                    ],
                    "area": 0.020987384021282196,
                    "normal": [
                        -0.9999999403953552,
                        5.674754675055738e-07,
                        4.2319632905440593e-14
                    ]
                }
            ]
        },
        "Weapons_hardpoitn.gun.dual": {
            "collection": "Weapons",
            "object_name": "hardpoitn.gun.dual",
            "dimensions": {
                "width": 0.28554150462150574,
                "height": 0.3860030174255371,
                "depth": 1.9096744060516357
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.4901161193847656e-08,
                        0.2961527705192566,
                        0.3634122610092163
                    ],
                    "area": 0.21476078033447266,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.133714959025383,
                        0.29788199067115784,
                        0.061867035925388336
                    ],
                    "area": 0.19578801095485687,
                    "normal": [
                        0.9902111887931824,
                        -0.008763521909713745,
                        -0.13930192589759827
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.13371498882770538,
                        0.29788199067115784,
                        0.061867035925388336
                    ],
                    "area": 0.19578799605369568,
                    "normal": [
                        -0.9902111887931824,
                        -0.008763521909713745,
                        -0.13930192589759827
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.4901161193847656e-08,
                        -0.31277090311050415,
                        0.10797098278999329
                    ],
                    "area": 0.14119933545589447,
                    "normal": [
                        0.0,
                        -1.0,
                        2.982891658120934e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.12543094158172607,
                        2.0775885581970215,
                        0.17738428711891174
                    ],
                    "area": 0.1327058970928192,
                    "normal": [
                        -1.0,
                        1.1421700492064701e-06,
                        1.2471325590013294e-06
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.1254308819770813,
                        2.0775885581970215,
                        0.17738431692123413
                    ],
                    "area": 0.13270586729049683,
                    "normal": [
                        1.0,
                        8.785925160736952e-07,
                        5.506153115675261e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -1.4901161193847656e-08,
                        0.29961109161376953,
                        -0.10290887951850891
                    ],
                    "area": 0.13124117255210876,
                    "normal": [
                        0.0,
                        -0.12478037178516388,
                        -0.9921844601631165
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09701918810606003,
                        2.0775885581970215,
                        0.17063072323799133
                    ],
                    "area": 0.1258331537246704,
                    "normal": [
                        1.0,
                        0.0,
                        -3.01265004054585e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.09701918810606003,
                        2.0775885581970215,
                        0.17063072323799133
                    ],
                    "area": 0.1258331537246704,
                    "normal": [
                        -1.0,
                        0.0,
                        -3.01265004054585e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.17665666341781616,
                        -0.18129655718803406,
                        0.10797098278999329
                    ],
                    "area": 0.10508570075035095,
                    "normal": [
                        1.0,
                        0.0,
                        -7.457229145302335e-08
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.0779261663556099,
                        -8.940696716308594e-08,
                        0.0
                    ],
                    "area": 0.05010922998189926,
                    "normal": [
                        -1.0,
                        1.830601945584931e-07,
                        -4.992548952031939e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.07792571932077408,
                        -1.4156103134155273e-07,
                        0.0
                    ],
                    "area": 0.05010922998189926,
                    "normal": [
                        1.0,
                        -1.9970204334640584e-07,
                        3.328361231069721e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.327165126800537e-07,
                        0.7095150947570801,
                        0.19323280453681946
                    ],
                    "area": 0.04690385237336159,
                    "normal": [
                        -1.5148919987363618e-13,
                        -4.584774728755292e-07,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.252659320831299e-07,
                        0.7095151543617249,
                        -0.025800198316574097
                    ],
                    "area": 0.046903837472200394,
                    "normal": [
                        6.059570705450879e-13,
                        4.5847752971894806e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.08955440670251846,
                        0.5965973138809204,
                        0.08371618390083313
                    ],
                    "area": 0.0417541041970253,
                    "normal": [
                        0.9968897700309753,
                        -0.07880841940641403,
                        -2.955403886062413e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.08955436199903488,
                        0.5965973138809204,
                        0.08371618390083313
                    ],
                    "area": 0.041754100471735,
                    "normal": [
                        -0.9968897104263306,
                        -0.078809455037117,
                        -6.133857510803864e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.774199962615967e-08,
                        0.08824864774942398,
                        -0.1932326704263687
                    ],
                    "area": 0.034857556223869324,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.06905526667833328,
                        1.0811351537704468,
                        0.09241048246622086
                    ],
                    "area": 0.025691507384181023,
                    "normal": [
                        -0.9999999403953552,
                        1.414549501532747e-06,
                        -6.759003667866637e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.06905701756477356,
                        1.0811351537704468,
                        0.09241048246622086
                    ],
                    "area": 0.025691498070955276,
                    "normal": [
                        1.0,
                        -1.366599008179037e-06,
                        -2.027715169106159e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.045097846537828445,
                        0.0441242940723896,
                        -0.15257905423641205
                    ],
                    "area": 0.02481156587600708,
                    "normal": [
                        -1.0,
                        7.324641160266765e-08,
                        7.949977032239985e-08
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09248970448970795,
                        1.102843999862671,
                        0.12059590220451355
                    ],
                    "area": 0.09112656861543655,
                    "normal": [
                        -0.9977218508720398,
                        0.06746348738670349,
                        -1.584115381092488e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.09248967468738556,
                        1.102843999862671,
                        0.12059590220451355
                    ],
                    "area": 0.09112656861543655,
                    "normal": [
                        0.9977218508720398,
                        0.06746348738670349,
                        -1.584115381092488e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.09970831871032715,
                        0.4201677441596985,
                        0.053078070282936096
                    ],
                    "area": 0.054586488753557205,
                    "normal": [
                        -1.0,
                        -0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.09970828890800476,
                        0.4201677441596985,
                        0.05307804048061371
                    ],
                    "area": 0.05458648502826691,
                    "normal": [
                        1.0,
                        -2.3139326899013213e-08,
                        -3.519196525303414e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -7.450580596923828e-09,
                        0.3930075168609619,
                        0.1395489126443863
                    ],
                    "area": 0.04814421012997627,
                    "normal": [
                        2.3313089059229242e-07,
                        -7.913275368309769e-08,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -5.960464477539063e-08,
                        -0.05224907398223877,
                        -0.13714289665222168
                    ],
                    "area": 0.04359003156423569,
                    "normal": [
                        0.0,
                        -0.24529531598091125,
                        -0.9694483876228333
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -5.21540641784668e-08,
                        0.23784488439559937,
                        -0.25439226627349854
                    ],
                    "area": 0.03998926281929016,
                    "normal": [
                        3.553667505661745e-13,
                        3.236933991956903e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.06823910772800446,
                        1.1095643043518066,
                        0.25682389736175537
                    ],
                    "area": 0.03542923927307129,
                    "normal": [
                        0.9285121560096741,
                        0.07090910524129868,
                        0.36446836590766907
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.06823911517858505,
                        1.1095643043518066,
                        -0.01563209295272827
                    ],
                    "area": 0.03542923554778099,
                    "normal": [
                        -0.9285122156143188,
                        0.07090914249420166,
                        -0.36446821689605713
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.06823907792568207,
                        1.1095643043518066,
                        -0.01563209295272827
                    ],
                    "area": 0.03542923182249069,
                    "normal": [
                        0.9285122156143188,
                        0.07090910524129868,
                        -0.3644680678844452
                    ]
                }
            ]
        },
        "Weapons_hardpoint.dev.flush": {
            "collection": "Weapons",
            "object_name": "hardpoint.dev.flush",
            "dimensions": {
                "width": 1.3702685832977295,
                "height": 0.7551456689834595,
                "depth": 1.9211724996566772
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -3.2782554626464844e-07,
                        -1.2945210933685303,
                        -0.14254266023635864
                    ],
                    "area": 0.8380283117294312,
                    "normal": [
                        0.0,
                        -0.46730953454971313,
                        -0.8840938210487366
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1622905731201172e-06,
                        -1.2757468223571777,
                        0.32032281160354614
                    ],
                    "area": 0.6590781211853027,
                    "normal": [
                        -3.1087509455574036e-08,
                        -0.14421804249286652,
                        0.9895458817481995
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.7943223714828491,
                        0.1669994741678238,
                        0.3088648319244385
                    ],
                    "area": 0.4594007134437561,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.7943223714828491,
                        0.16699965298175812,
                        0.3088648319244385
                    ],
                    "area": 0.4594004154205322,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.3889915645122528,
                        0.46265220642089844,
                        0.334244966506958
                    ],
                    "area": 0.44740939140319824,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.3889915347099304,
                        0.4626522660255432,
                        0.334244966506958
                    ],
                    "area": 0.4474092423915863,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0790873765945435,
                        -0.004747539758682251,
                        0.0
                    ],
                    "area": 0.38792741298675537,
                    "normal": [
                        -1.0,
                        5.569331733568106e-07,
                        -5.75538877001236e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.0790873765945435,
                        -0.004747763276100159,
                        0.0
                    ],
                    "area": 0.38792720437049866,
                    "normal": [
                        0.9999999403953552,
                        -4.773714863404166e-07,
                        -4.604313232903223e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -7.450580596923828e-07,
                        -0.6920280456542969,
                        0.3472154140472412
                    ],
                    "area": 0.3490438163280487,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7943226099014282,
                        -1.1673989295959473,
                        -0.14254266023635864
                    ],
                    "area": 0.30478358268737793,
                    "normal": [
                        -0.27748551964759827,
                        -0.44895806908607483,
                        -0.8493753671646118
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        -0.45291364192962646,
                        0.2787845730781555
                    ],
                    "area": 0.33027100563049316,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        -0.4529135227203369,
                        -0.2787845730781555
                    ],
                    "area": 0.3302708864212036,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        0.25270408391952515,
                        -0.2787845730781555
                    ],
                    "area": 0.30344143509864807,
                    "normal": [
                        -0.0,
                        0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.371939092874527,
                        0.25270405411720276,
                        0.2787845730781555
                    ],
                    "area": 0.19922980666160583,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.3719390034675598,
                        0.2527041435241699,
                        -0.2787845730781555
                    ],
                    "area": 0.19922971725463867,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.363953173160553,
                        0.2527039349079132,
                        0.2787845730781555
                    ],
                    "area": 0.18843670189380646,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.3639531135559082,
                        0.25270405411720276,
                        -0.2787845730781555
                    ],
                    "area": 0.18843668699264526,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6735720038414001,
                        0.3357003629207611,
                        -0.20517155528068542
                    ],
                    "area": 0.18676120042800903,
                    "normal": [
                        -0.6635509133338928,
                        1.6456120022212417e-07,
                        -0.7481310963630676
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.673572301864624,
                        0.33570027351379395,
                        0.20517155528068542
                    ],
                    "area": 0.18676115572452545,
                    "normal": [
                        -0.663550853729248,
                        1.3962771561182308e-07,
                        0.7481311559677124
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6735721826553345,
                        0.33570021390914917,
                        -0.20517155528068542
                    ],
                    "area": 0.1867610365152359,
                    "normal": [
                        0.6635511517524719,
                        2.4933532571935757e-08,
                        -0.7481309175491333
                    ]
                }
            ]
        },
        "Weapons_hardpoint.dev.cruise": {
            "collection": "Weapons",
            "object_name": "hardpoint.dev.cruise",
            "dimensions": {
                "width": 1.302577257156372,
                "height": 1.0790880918502808,
                "depth": 1.7505098581314087
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.2992793917655945,
                        -0.023755323141813278,
                        -0.12310007959604263
                    ],
                    "area": 0.15152114629745483,
                    "normal": [
                        0.08378106355667114,
                        -6.146485986846528e-09,
                        -0.9964842200279236
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.2992793917655945,
                        -0.023755330592393875,
                        -0.12310008704662323
                    ],
                    "area": 0.15152114629745483,
                    "normal": [
                        -0.08378106355667114,
                        -6.146485986846528e-09,
                        -0.9964842200279236
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.08794785290956497,
                        -0.03193384408950806,
                        -0.13347376883029938
                    ],
                    "area": 0.13745516538619995,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.08794785290956497,
                        -0.031933851540088654,
                        -0.13347376883029938
                    ],
                    "area": 0.13745516538619995,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.29927951097488403,
                        0.5257585048675537,
                        -1.862645149230957e-09
                    ],
                    "area": 0.07917125523090363,
                    "normal": [
                        0.6411969065666199,
                        0.7673764824867249,
                        -9.410714341129278e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.29927951097488403,
                        0.5257585644721985,
                        0.0
                    ],
                    "area": 0.07917125523090363,
                    "normal": [
                        -0.6411969065666199,
                        0.7673764824867249,
                        -9.410714341129278e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.13778090476989746,
                        0.2930046021938324,
                        0.32498353719711304
                    ],
                    "area": 0.061666250228881836,
                    "normal": [
                        1.0,
                        -5.405573801908758e-07,
                        1.3916680927650305e-06
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.13778090476989746,
                        0.2930046021938324,
                        0.32498353719711304
                    ],
                    "area": 0.061666250228881836,
                    "normal": [
                        -1.0,
                        -5.405573801908758e-07,
                        1.3916680927650305e-06
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.29927942156791687,
                        0.40396803617477417,
                        -0.12310008704662323
                    ],
                    "area": 0.0603199303150177,
                    "normal": [
                        0.08378107845783234,
                        0.0,
                        -0.9964841604232788
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.29927942156791687,
                        0.40396803617477417,
                        -0.12310008704662323
                    ],
                    "area": 0.0603199303150177,
                    "normal": [
                        -0.08378107845783234,
                        0.0,
                        -0.9964841604232788
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        0.6651709079742432,
                        0.5931797027587891,
                        0.4458393156528473
                    ],
                    "area": 0.7521792054176331,
                    "normal": [
                        0.9448016285896301,
                        0.009454544633626938,
                        0.3275064527988434
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6651707887649536,
                        0.593180239200592,
                        0.4458392858505249
                    ],
                    "area": 0.7521792054176331,
                    "normal": [
                        -0.9448015689849854,
                        0.009454891085624695,
                        0.3275064527988434
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.7386779189109802,
                        0.469736248254776,
                        -0.2057388424873352
                    ],
                    "area": 0.6416550278663635,
                    "normal": [
                        -0.983518660068512,
                        0.005807023961097002,
                        -0.18071302771568298
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.738677978515625,
                        0.4697358012199402,
                        -0.20573881268501282
                    ],
                    "area": 0.6416549682617188,
                    "normal": [
                        0.9835187196731567,
                        0.005806773900985718,
                        -0.18071292340755463
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5263255834579468,
                        1.32794189453125,
                        0.4287659227848053
                    ],
                    "area": 0.4601212441921234,
                    "normal": [
                        -0.8547176718711853,
                        0.47651585936546326,
                        0.2058890461921692
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5263260006904602,
                        1.3279414176940918,
                        0.4287658929824829
                    ],
                    "area": 0.46012112498283386,
                    "normal": [
                        0.8547178506851196,
                        0.47651562094688416,
                        0.20588892698287964
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5502959489822388,
                        1.379422903060913,
                        -0.2163114994764328
                    ],
                    "area": 0.4588913321495056,
                    "normal": [
                        -0.8907926082611084,
                        0.4408951699733734,
                        -0.11000017821788788
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5502962470054626,
                        1.3794224262237549,
                        -0.2163114994764328
                    ],
                    "area": 0.45889124274253845,
                    "normal": [
                        0.8907926678657532,
                        0.4408949315547943,
                        -0.11000027507543564
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.2848338484764099,
                        0.15164980292320251,
                        -0.48967766761779785
                    ],
                    "area": 0.32958289980888367,
                    "normal": [
                        0.005028076004236937,
                        0.018177319318056107,
                        -0.9998221397399902
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.2839820981025696,
                        0.1513003706932068,
                        -0.48914769291877747
                    ],
                    "area": 0.3294389247894287,
                    "normal": [
                        -0.003504568710923195,
                        0.020398268476128578,
                        -0.9997857809066772
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8885351419448853,
                        -0.49705255031585693,
                        1.6360265016555786
                    ],
                    "area": 0.17939132452011108,
                    "normal": [
                        -0.31458601355552673,
                        -0.8994059562683105,
                        0.3034874200820923
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8737350702285767,
                        -0.5565087199211121,
                        1.6500927209854126
                    ],
                    "area": 0.1793912947177887,
                    "normal": [
                        -0.3145860731601715,
                        0.8994060754776001,
                        -0.3034871518611908
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8737349510192871,
                        -0.5345336198806763,
                        -0.1268419474363327
                    ],
                    "area": 0.17939125001430511,
                    "normal": [
                        0.3145862817764282,
                        0.8916255831718445,
                        0.3256366550922394
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8737349510192871,
                        -0.47526049613952637,
                        -0.12610894441604614
                    ],
                    "area": 0.17939125001430511,
                    "normal": [
                        -0.3145861029624939,
                        -0.8916256427764893,
                        -0.32563677430152893
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8885353803634644,
                        -0.5347166657447815,
                        -0.11204282194375992
                    ],
                    "area": 0.17939120531082153,
                    "normal": [
                        -0.31458619236946106,
                        0.8916254639625549,
                        0.32563692331314087
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.2063612937927246,
                        -0.4901112914085388,
                        1.0747435092926025
                    ],
                    "area": 0.17939120531082153,
                    "normal": [
                        -0.42973271012306213,
                        -0.8969394564628601,
                        0.10406328737735748
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8885353803634644,
                        -0.4754435420036316,
                        -0.11130982637405396
                    ],
                    "area": 0.17939120531082153,
                    "normal": [
                        0.31458619236946106,
                        -0.891625702381134,
                        -0.32563671469688416
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.2063617706298828,
                        -0.4823848009109497,
                        0.4499731659889221
                    ],
                    "area": 0.17939120531082153,
                    "normal": [
                        0.4297325611114502,
                        -0.8940920233726501,
                        -0.1262122243642807
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8737350702285767,
                        -0.49723556637763977,
                        1.6508256196975708
                    ],
                    "area": 0.17939120531082153,
                    "normal": [
                        0.31458616256713867,
                        -0.8994059562683105,
                        0.30348727107048035
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.2063616514205933,
                        -0.5416579842567444,
                        0.44924014806747437
                    ],
                    "area": 0.17939119040966034,
                    "normal": [
                        -0.4297325611114502,
                        0.8940919637680054,
                        0.12621228396892548
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        1.0306720733642578,
                        -5.21540641784668e-07,
                        0.0
                    ],
                    "area": 0.5222710371017456,
                    "normal": [
                        0.8612166047096252,
                        -5.7062948144448455e-08,
                        0.5082380175590515
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0306720733642578,
                        6.631016731262207e-07,
                        0.0
                    ],
                    "area": 0.522270917892456,
                    "normal": [
                        -0.86121666431427,
                        0.0,
                        0.5082380175590515
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.8265857100486755,
                        8.195638656616211e-07,
                        -0.39147472381591797
                    ],
                    "area": 0.499924898147583,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.8265857696533203,
                        -2.9802322387695312e-08,
                        -0.39147472381591797
                    ],
                    "area": 0.49992480874061584,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.0,
                        -2.384185791015625e-07,
                        0.4865807890892029
                    ],
                    "area": 0.41980990767478943,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8499332070350647,
                        0.42390942573547363,
                        0.0
                    ],
                    "area": 0.3740316927433014,
                    "normal": [
                        0.572175145149231,
                        0.7566707134246826,
                        0.3163304924964905
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8499332070350647,
                        -0.4239093065261841,
                        0.0
                    ],
                    "area": 0.3740316331386566,
                    "normal": [
                        -0.5721755027770996,
                        -0.7566707730293274,
                        0.3163297772407532
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8499331474304199,
                        0.42391034960746765,
                        0.0
                    ],
                    "area": 0.3740314543247223,
                    "normal": [
                        -0.572174608707428,
                        0.7566714286804199,
                        0.3163297474384308
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.8499331474304199,
                        -0.42391034960746765,
                        0.0
                    ],
                    "area": 0.3740313947200775,
                    "normal": [
                        0.5721750855445862,
                        -0.7566714882850647,
                        0.31632885336875916
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        3.725290298461914e-08,
                        6.407499313354492e-07,
                        -0.39147472381591797
                    ],
                    "area": 0.3700172007083893,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.00014994293451309204,
                        1.4901161193847656e-08,
                        -0.6649297475814819
                    ],
                    "area": 0.581855058670044,
                    "normal": [
                        4.00077406084165e-05,
                        -6.252379690374621e-12,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5419737100601196,
                        -1.1920928955078125e-07,
                        -0.44751378893852234
                    ],
                    "area": 0.3044942021369934,
                    "normal": [
                        0.5944918394088745,
                        -1.3457791681048548e-07,
                        0.8041017055511475
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        8.674710988998413e-05,
                        0.5418397188186646,
                        -0.4475354552268982
                    ],
                    "area": 0.3044036030769348,
                    "normal": [
                        -0.00021675939206033945,
                        0.5945125222206116,
                        0.8040862083435059
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        8.655339479446411e-05,
                        -0.5418396592140198,
                        -0.4475354552268982
                    ],
                    "area": 0.30440354347229004,
                    "normal": [
                        -0.00021707764244638383,
                        -0.5945126414299011,
                        0.8040862083435059
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5417007207870483,
                        1.4156103134155273e-07,
                        -0.44755715131759644
                    ],
                    "area": 0.3043166697025299,
                    "normal": [
                        -0.5945335030555725,
                        8.569045206741066e-08,
                        0.8040708303451538
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.5419871807098389,
                        -1.1920928955078125e-07,
                        -0.6649080514907837
                    ],
                    "area": 0.24484430253505707,
                    "normal": [
                        3.993670907220803e-05,
                        -6.500521475272247e-12,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.00010018795728683472,
                        0.5418397188186646,
                        -0.6649297475814819
                    ],
                    "area": 0.24476677179336548,
                    "normal": [
                        4.0007733332458884e-05,
                        1.2421788042615844e-08,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        9.99942421913147e-05,
                        -0.5418396592140198,
                        -0.6649297475814819
                    ],
                    "area": 0.2447667121887207,
                    "normal": [
                        4.00077406084165e-05,
                        -1.2444085761842416e-08,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.5416872501373291,
                        1.4156103134155273e-07,
                        -0.6649514436721802
                    ],
                    "area": 0.2446921467781067,
                    "normal": [
                        3.993671271018684e-05,
                        -4.646116824602586e-12,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.0978193283081055e-08,
                        -1.1920928955078125e-07,
                        0.44323214888572693
                    ],
                    "area": 0.1936349868774414,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        7.450580596923828e-08,
                        -0.39749062061309814,
                        -0.08656874299049377
                    ],
                    "area": 1.2730727195739746,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.980232238769531e-07,
                        -0.634759247303009,
                        0.623268723487854
                    ],
                    "area": 0.5004857182502747,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -7.003545761108398e-07,
                        -1.4184430837631226,
                        0.623268723487854
                    ],
                    "area": 0.33055204153060913,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.682209014892578e-07,
                        -0.24445316195487976,
                        0.623268723487854
                    ],
                    "area": 0.30677738785743713,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -8.344650268554688e-07,
                        -1.025065302848816,
                        0.623268723487854
                    ],
                    "area": 0.30677729845046997,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.6320978403091431,
                        -0.43523579835891724,
                        0.14657820761203766
                    ],
                    "area": 0.2949468791484833,
                    "normal": [
                        0.6710994839668274,
                        -5.620517526949698e-07,
                        0.7413672804832458
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.6320980787277222,
                        -0.43523526191711426,
                        0.14657820761203766
                    ],
                    "area": 0.29494649171829224,
                    "normal": [
                        -0.6711001396179199,
                        2.462926715907088e-07,
                        0.7413666248321533
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        2.5331974029541016e-07,
                        0.4771146774291992,
                        0.08163142204284668
                    ],
                    "area": 0.2448316216468811,
                    "normal": [
                        3.2758876500338374e-07,
                        1.0,
                        1.0631021041263011e-06
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.44096630811691284,
                        -0.30808907747268677,
                        -0.08656874299049377
                    ],
                    "area": 0.2420540601015091,
                    "normal": [
                        0.0,
                        -0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.44096624851226807,
                        -0.3080895245075226,
                        0.24983158707618713
                    ],
                    "area": 0.2420538067817688,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                }
            ]
        },
        "Weapons_hardpoint.base.cap": {
            "collection": "Weapons",
            "object_name": "hardpoint.base.cap",
            "dimensions": {
                "width": 1.3121875524520874,
                "height": 0.6827427744865417,
                "depth": 1.9591068029403687
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        7.152557373046875e-07,
                        0.10017669200897217,
                        -0.0023010335862636566
                    ],
                    "area": 2.9738574028015137,
                    "normal": [
                        -1.5291497994056324e-13,
                        -1.4952859146433184e-06,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.470348358154297e-07,
                        0.1001768708229065,
                        -0.13497889041900635
                    ],
                    "area": 2.973855972290039,
                    "normal": [
                        7.645751707533593e-14,
                        1.5005324485173333e-06,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        6.705522537231445e-07,
                        0.07835236936807632,
                        0.2977294921875
                    ],
                    "area": 2.0706093311309814,
                    "normal": [
                        -1.6471504336260795e-13,
                        -1.9050761466132826e-06,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        3.8743019104003906e-07,
                        0.07835250347852707,
                        0.16505160927772522
                    ],
                    "area": 2.070608139038086,
                    "normal": [
                        1.0981009667104108e-13,
                        1.9184926713933237e-06,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.76837158203125e-07,
                        -1.1373929977416992,
                        -0.00230243057012558
                    ],
                    "area": 1.7322907447814941,
                    "normal": [
                        -9.844206070967754e-14,
                        -6.355547839120845e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.5331974029541016e-07,
                        -1.1373927593231201,
                        -0.13498029112815857
                    ],
                    "area": 1.7322900295257568,
                    "normal": [
                        1.6407016329854536e-14,
                        6.355547839120845e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        6.854534149169922e-07,
                        1.167475938796997,
                        -0.0022996366024017334
                    ],
                    "area": 1.2073801755905151,
                    "normal": [
                        -1.1769991719538103e-13,
                        -9.384585837324266e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.76837158203125e-07,
                        1.1674761772155762,
                        -0.13497748970985413
                    ],
                    "area": 1.207379937171936,
                    "normal": [
                        7.061998961955737e-14,
                        9.384585837324266e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.470348358154297e-07,
                        -0.8896020650863647,
                        0.2977280616760254
                    ],
                    "area": 1.2061429023742676,
                    "normal": [
                        -9.425652532785156e-14,
                        -8.306403174174193e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.086162567138672e-07,
                        -0.88960200548172,
                        0.1650501936674118
                    ],
                    "area": 1.2061426639556885,
                    "normal": [
                        0.0,
                        8.125829822347441e-07,
                        -1.0
                    ]
                }
            ]
        },
        "Weapons_BigGun": {
            "collection": "Weapons",
            "object_name": "BigGun",
            "dimensions": {
                "width": 4.072839260101318,
                "height": 2.622154951095581,
                "depth": 5.350697040557861
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.384185791015625e-06,
                        -1.0480924844741821,
                        0.6770304441452026
                    ],
                    "area": 0.29828527569770813,
                    "normal": [
                        0.0,
                        9.654401367242826e-08,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -2.5704503059387207e-06,
                        -1.0480924844741821,
                        0.9149352312088013
                    ],
                    "area": 0.29828524589538574,
                    "normal": [
                        0.0,
                        -9.654401367242826e-08,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.24694614112377167,
                        1.4113550186157227,
                        -0.071895070374012
                    ],
                    "area": 0.2644093632698059,
                    "normal": [
                        1.0,
                        -2.0521234489478957e-07,
                        2.8645601446442015e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.24694614112377167,
                        -0.8473482131958008,
                        -0.071895070374012
                    ],
                    "area": 0.2644093632698059,
                    "normal": [
                        -1.0,
                        -2.0521231647308014e-07,
                        -2.8645597893728336e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2469460666179657,
                        1.4113550186157227,
                        -0.07189507782459259
                    ],
                    "area": 0.2644093334674835,
                    "normal": [
                        -1.0,
                        2.3452835762327595e-07,
                        -8.593680433932605e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.2469460666179657,
                        -0.8473482131958008,
                        -0.07189507782459259
                    ],
                    "area": 0.2644093334674835,
                    "normal": [
                        1.0,
                        2.3452835762327595e-07,
                        8.593682565560812e-08
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1175870895385742e-08,
                        1.1572082042694092,
                        -0.071895070374012
                    ],
                    "area": 0.25691789388656616,
                    "normal": [
                        -1.206835094080816e-07,
                        -1.0,
                        1.1458238446948599e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1175870895385742e-08,
                        -0.5932013988494873,
                        -0.071895070374012
                    ],
                    "area": 0.25691789388656616,
                    "normal": [
                        1.206835094080816e-07,
                        -1.0,
                        -1.1458238446948599e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        -0.8473482131958008,
                        -0.33199015259742737
                    ],
                    "area": 0.25104230642318726,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        1.4113550186157227,
                        -0.33199015259742737
                    ],
                    "area": 0.2510422468185425,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -6.705522537231445e-08,
                        1.0436811447143555,
                        -0.2740643620491028
                    ],
                    "area": 0.9573239684104919,
                    "normal": [
                        0.0,
                        0.0,
                        0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -4.470348358154297e-08,
                        -0.9617917537689209,
                        -0.2740643620491028
                    ],
                    "area": 0.7932751178741455,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -6.705522537231445e-08,
                        -1.9338068962097168,
                        -0.15511739253997803
                    ],
                    "area": 0.6862274408340454,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -6.705522537231445e-08,
                        2.097585678100586,
                        -0.15511739253997803
                    ],
                    "area": 0.6862273812294006,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5008231401443481,
                        1.043681025505066,
                        -0.4690558910369873
                    ],
                    "area": 0.37615689635276794,
                    "normal": [
                        -0.99088054895401,
                        0.13474324345588684,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5008230209350586,
                        1.0436811447143555,
                        -0.4690558910369873
                    ],
                    "area": 0.37615683674812317,
                    "normal": [
                        0.9908806085586548,
                        0.13474294543266296,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.1920928955078125e-07,
                        2.6844310760498047,
                        -0.4690558910369873
                    ],
                    "area": 0.3399405777454376,
                    "normal": [
                        0.0,
                        1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.4901161193847656e-08,
                        -2.5206522941589355,
                        -0.4690558910369873
                    ],
                    "area": 0.33994048833847046,
                    "normal": [
                        0.0,
                        -1.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.5008230209350586,
                        -0.9617916345596313,
                        -0.4690558910369873
                    ],
                    "area": 0.3129866123199463,
                    "normal": [
                        0.9868009090423584,
                        -0.16193819046020508,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.5008230805397034,
                        -0.9617917537689209,
                        -0.4690558910369873
                    ],
                    "area": 0.3129866123199463,
                    "normal": [
                        -0.9868009686470032,
                        -0.16193777322769165,
                        0.0
                    ]
                }
            ]
        },
        "Weapons_MedGun": {
            "collection": "Weapons",
            "object_name": "MedGun",
            "dimensions": {
                "width": 1.3863385915756226,
                "height": 0.7887216210365295,
                "depth": 2.095243215560913
            },
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.21061068773269653,
                        -0.13522888720035553,
                        -0.1942571997642517
                    ],
                    "area": 0.1723332703113556,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.19717592000961304,
                        -0.13522888720035553,
                        -0.1942571997642517
                    ],
                    "area": 0.17233319580554962,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.21061065793037415,
                        0.23767895996570587,
                        -0.1942571997642517
                    ],
                    "area": 0.13180044293403625,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.19717592000961304,
                        0.23767895996570587,
                        -0.1942571997642517
                    ],
                    "area": 0.13180036842823029,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.16925543546676636,
                        -0.4975404739379883,
                        -0.17398452758789062
                    ],
                    "area": 0.10724703222513199,
                    "normal": [
                        -4.341950798902872e-09,
                        -0.13305503129959106,
                        -0.9911087155342102
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.18269023299217224,
                        -0.4975404143333435,
                        -0.17398452758789062
                    ],
                    "area": 0.10724703222513199,
                    "normal": [
                        4.341949910724452e-09,
                        -0.13305504620075226,
                        -0.9911087155342102
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.2001522183418274,
                        -0.1937239170074463,
                        0.21692541241645813
                    ],
                    "area": 0.09151861071586609,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.1867174506187439,
                        -0.1937239170074463,
                        0.21692541241645813
                    ],
                    "area": 0.09151856601238251,
                    "normal": [
                        -0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4010692238807678,
                        -0.13522884249687195,
                        -0.09146154671907425
                    ],
                    "area": 0.08688418567180634,
                    "normal": [
                        -0.9999999403953552,
                        2.4682103116902e-07,
                        -3.6239771361579187e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.4145040512084961,
                        -0.13522884249687195,
                        -0.09146153926849365
                    ],
                    "area": 0.08688418567180634,
                    "normal": [
                        0.9999999403953552,
                        2.4682103116902e-07,
                        -3.6239771361579187e-07
                    ]
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
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4188600182533264,
                        -0.4057363271713257,
                        0.22023163735866547
                    ],
                    "area": 0.4768664836883545,
                    "normal": [
                        -8.81428775301174e-07,
                        -1.0,
                        -8.114236607070779e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.4188597798347473,
                        0.40573644638061523,
                        0.22023163735866547
                    ],
                    "area": 0.4768664538860321,
                    "normal": [
                        5.876192403775349e-07,
                        1.0,
                        -4.057116598232824e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.0382394790649414,
                        -0.2545884847640991,
                        -0.32582929730415344
                    ],
                    "area": 0.321183443069458,
                    "normal": [
                        0.3163125813007355,
                        0.1826232224702835,
                        -0.9309109449386597
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.038239598274231,
                        0.2545888423919678,
                        -0.32582929730415344
                    ],
                    "area": 0.32118329405784607,
                    "normal": [
                        0.3163125514984131,
                        -0.18262316286563873,
                        -0.9309110045433044
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.3036748170852661,
                        0.5091773271560669,
                        -0.49633240699768066
                    ],
                    "area": 0.31780490279197693,
                    "normal": [
                        -4.055099225297454e-07,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.30367469787597656,
                        -0.5091773271560669,
                        -0.49633240699768066
                    ],
                    "area": 0.3178047835826874,
                    "normal": [
                        4.0551006463829253e-07,
                        1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.3160102367401123,
                        5.364418029785156e-07,
                        0.15259574353694916
                    ],
                    "area": 0.2825952470302582,
                    "normal": [
                        -1.0,
                        3.816647620169533e-07,
                        -1.0057391388890863e-13
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8912525177001953,
                        -0.5091772079467773,
                        -0.5462140440940857
                    ],
                    "area": 0.2588234841823578,
                    "normal": [
                        0.0,
                        1.0,
                        -0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.8912527561187744,
                        0.5091774463653564,
                        -0.5462140440940857
                    ],
                    "area": 0.2588234543800354,
                    "normal": [
                        0.0,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.3703467845916748,
                        0.2545884847640991,
                        -0.29910168051719666
                    ],
                    "area": 0.25239935517311096,
                    "normal": [
                        -0.2946765124797821,
                        -0.17013153433799744,
                        -0.9403303265571594
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        1.939035415649414,
                        -1.4901161193847656e-07,
                        -1.823335886001587
                    ],
                    "area": 1.8468029499053955,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1238596439361572,
                        1.5533061027526855,
                        -1.2501072883605957
                    ],
                    "area": 1.0668879747390747,
                    "normal": [
                        0.00269062677398324,
                        0.20175738632678986,
                        -0.9794318079948425
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.1238596439361572,
                        1.5533061027526855,
                        -0.4274497628211975
                    ],
                    "area": 1.0449440479278564,
                    "normal": [
                        -9.43294580224574e-08,
                        -2.1544907724546647e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        1.939035415649414,
                        0.06225411593914032,
                        -0.3335420489311218
                    ],
                    "area": 0.6981375217437744,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.8695330023765564,
                        -7.450580596923828e-08,
                        -1.3640851974487305
                    ],
                    "area": 0.6939177513122559,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.21260502934455872,
                        -4.172325134277344e-07,
                        0.12194317579269409
                    ],
                    "area": 0.5952432751655579,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.19305367767810822,
                        1.7600202560424805,
                        -1.6242460012435913
                    ],
                    "area": 0.5868988037109375,
                    "normal": [
                        0.0,
                        -0.0,
                        -0.9999999403953552
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.19305360317230225,
                        1.7600202560424805,
                        -1.0168578624725342
                    ],
                    "area": 0.5868985652923584,
                    "normal": [
                        -3.0874662115820684e-07,
                        -7.842506022370799e-08,
                        1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.1603760719299316,
                        -1.4901161193847656e-07,
                        -1.5937104225158691
                    ],
                    "area": 0.544619083404541,
                    "normal": [
                        -1.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.0873429775238037,
                        -2.8312206268310547e-07,
                        -0.1997072696685791
                    ],
                    "area": 0.5401537418365479,
                    "normal": [
                        1.0,
                        -4.523551524471259e-07,
                        1.3085944772228686e-07
                    ]
                }
            ]
        },
        "Weapons_Squirtgun": {
            "collection": "Weapons",
            "object_name": "Squirtgun",
            "dimensions": {
                "width": 0.7071393728256226,
                "height": 0.7315396666526794,
                "depth": 0.9716439247131348
            },
            "face_positions": [
                {
                    "orientation": "vertical",
                    "position": [
                        -1.6391277313232422e-07,
                        0.06165207922458649,
                        0.8110846281051636
                    ],
                    "area": 0.39016005396842957,
                    "normal": [
                        -1.9096216163916324e-08,
                        0.29635488986968994,
                        -0.9550779461860657
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.29428550601005554,
                        -0.10228107869625092,
                        1.2869582176208496
                    ],
                    "area": 0.3775315284729004,
                    "normal": [
                        1.0,
                        1.4269932080424041e-06,
                        -2.966734200526844e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.29428577423095703,
                        -0.1022811084985733,
                        1.2869582176208496
                    ],
                    "area": 0.3775314688682556,
                    "normal": [
                        -1.0,
                        -1.5109341120478348e-06,
                        3.141248896554316e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        3.8743019104003906e-07,
                        -0.609890878200531,
                        1.4808589220046997
                    ],
                    "area": 0.3036279082298279,
                    "normal": [
                        0.0,
                        -1.0,
                        0.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        0.29428550601005554,
                        -0.1843324601650238,
                        1.690114974975586
                    ],
                    "area": 0.23459261655807495,
                    "normal": [
                        1.0,
                        1.1862503015436232e-06,
                        1.18624996048311e-06
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -0.29428577423095703,
                        -0.1843324899673462,
                        1.690114974975586
                    ],
                    "area": 0.2345924973487854,
                    "normal": [
                        -1.0,
                        -1.2560298046082607e-06,
                        -1.2560298046082607e-06
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -6.705522537231445e-07,
                        0.48968052864074707,
                        1.3884201049804688
                    ],
                    "area": 0.23256118595600128,
                    "normal": [
                        -4.8055611046038393e-08,
                        0.8320109248161316,
                        0.55475914478302
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        3.8743019104003906e-07,
                        -0.6114256978034973,
                        0.9969643950462341
                    ],
                    "area": 0.2285996377468109,
                    "normal": [
                        0.0,
                        -0.7071068286895752,
                        -0.7071068286895752
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -6.556510925292969e-07,
                        0.3436456024646759,
                        1.7909998893737793
                    ],
                    "area": 0.22859957814216614,
                    "normal": [
                        -8.148069241542544e-08,
                        0.7071067094802856,
                        0.70710688829422
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -6.854534149169922e-07,
                        0.4887453019618988,
                        1.0666775703430176
                    ],
                    "area": 0.22637447714805603,
                    "normal": [
                        -3.291263439564318e-08,
                        0.8183053731918335,
                        -0.5747837424278259
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        0.24191121757030487,
                        9.5367431640625e-07,
                        1.4856150150299072
                    ],
                    "area": 15.823328018188477,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        0.24191121757030487,
                        9.5367431640625e-07,
                        -1.4856150150299072
                    ],
                    "area": 15.823328018188477,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.3992643654346466,
                        -9.5367431640625e-07,
                        3.286534547805786
                    ],
                    "area": 5.381142616271973,
                    "normal": [
                        0.0,
                        -0.0,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.3992643654346466,
                        -9.5367431640625e-07,
                        -3.286534547805786
                    ],
                    "area": 5.381142616271973,
                    "normal": [
                        -0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.2419111728668213,
                        -5.960464477539062e-07,
                        2.1381328105926514
                    ],
                    "area": 4.95109748840332,
                    "normal": [
                        0.7825940251350403,
                        -6.92223736109554e-08,
                        0.6225324273109436
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.2419111728668213,
                        -5.960464477539062e-07,
                        -2.1381328105926514
                    ],
                    "area": 4.95109748840332,
                    "normal": [
                        0.7825940251350403,
                        -6.92223736109554e-08,
                        -0.6225324273109436
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.13169743120670319,
                        -4.401779651641846,
                        1.4856147766113281
                    ],
                    "area": 4.225172996520996,
                    "normal": [
                        -1.3728993053518934e-07,
                        1.4015745364304166e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.13169744610786438,
                        -4.4017791748046875,
                        -1.4856147766113281
                    ],
                    "area": 4.225172519683838,
                    "normal": [
                        -1.3728993053518934e-07,
                        1.4015745364304166e-07,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.13169710338115692,
                        4.401782035827637,
                        1.4856150150299072
                    ],
                    "area": 4.2251715660095215,
                    "normal": [
                        -1.3729018633057422e-07,
                        -1.401574820647511e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -0.13169710338115692,
                        4.401782035827637,
                        -1.4856150150299072
                    ],
                    "area": 4.2251715660095215,
                    "normal": [
                        -1.3729018633057422e-07,
                        -1.401574820647511e-07,
                        1.0
                    ]
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
            "face_positions": [
                {
                    "orientation": "horizontal",
                    "position": [
                        -5.960464477539063e-08,
                        -1.8226903676986694,
                        -1.598863124847412
                    ],
                    "area": 7.061295032501221,
                    "normal": [
                        0.0,
                        -1.0302083808255702e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -3.2782554626464844e-07,
                        -2.979865312576294,
                        -0.8360024690628052
                    ],
                    "area": 4.655264854431152,
                    "normal": [
                        -1.1720737091991396e-07,
                        -1.0,
                        -4.898944462183863e-05
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        5.960464477539062e-07,
                        2.364830732345581,
                        -0.8360655307769775
                    ],
                    "area": 4.654879570007324,
                    "normal": [
                        2.734884105848323e-07,
                        1.0,
                        7.813950730906072e-08
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.086162567138672e-07,
                        0.823155403137207,
                        -1.598863124847412
                    ],
                    "area": 4.286553859710693,
                    "normal": [
                        1.9891299910912257e-14,
                        1.697075049378327e-07,
                        -1.0
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        1.5255951881408691,
                        -1.8227092027664185,
                        -0.8360339999198914
                    ],
                    "area": 3.530850410461426,
                    "normal": [
                        0.9999999403953552,
                        -2.3178779429144925e-07,
                        1.9533503348156955e-07
                    ]
                },
                {
                    "orientation": "vertical",
                    "position": [
                        -1.5255953073501587,
                        -1.822709083557129,
                        -0.8360340595245361
                    ],
                    "area": 3.5308496952056885,
                    "normal": [
                        -0.9999999403953552,
                        -2.5757987742736077e-08,
                        -1.1720507586687745e-07
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        4.172325134277344e-07,
                        1.945212960243225,
                        -1.5988630056381226
                    ],
                    "area": 2.5606675148010254,
                    "normal": [
                        0.0,
                        -0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        5.960464477539063e-08,
                        -0.2724185287952423,
                        -1.5988632440567017
                    ],
                    "area": 2.399055242538452,
                    "normal": [
                        0.0,
                        0.0,
                        -1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        2.980232238769531e-07,
                        0.9158080220222473,
                        -0.18225741386413574
                    ],
                    "area": 2.352534294128418,
                    "normal": [
                        -1.0571150752718486e-14,
                        -2.443664826046188e-08,
                        1.0
                    ]
                },
                {
                    "orientation": "horizontal",
                    "position": [
                        -3.2782554626464844e-07,
                        -1.3331177234649658,
                        -0.18225744366645813
                    ],
                    "area": 2.3068759441375732,
                    "normal": [
                        0.0,
                        0.0,
                        1.0
                    ]
                }
            ]
        }
    }
}
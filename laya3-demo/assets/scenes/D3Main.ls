{
  "_$ver": 1,
  "_$id": "jpr5c7n6",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "41ed26b5-2273-4bb9-aa52-9b34b141c8c5",
      "scriptPath": "../src/scence/d3Demo/D3Main.ts",
      "scene3D": {
        "_$ref": "b26bbuz3"
      },
      "spTrail": {
        "_$ref": "y11xxqn3"
      },
      "camera": {
        "_$ref": "ompcxnag"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "b26bbuz3",
      "_$type": "Scene3D",
      "name": "Scene3D",
      "skyRenderer": {
        "meshType": "dome"
      },
      "ambientMode": 0,
      "ambientColor": {
        "_$type": "Color",
        "r": 0.212,
        "g": 0.227,
        "b": 0.259
      },
      "fogStart": 300,
      "fogEnd": 1000,
      "fogDensity": 0.01,
      "fogColor": {
        "_$type": "Color",
        "r": 0.7,
        "g": 0.7,
        "b": 0.7
      },
      "lightmaps": [],
      "_$child": [
        {
          "_$id": "ompcxnag",
          "_$type": "Camera",
          "name": "Camera",
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": -5.5,
              "y": 4.740220730798409,
              "z": 8.761499133479143
            },
            "localRotation": {
              "_$type": "Quaternion",
              "x": -0.1644142342857246,
              "y": -0.021335625083677315,
              "z": -0.03992481163311957,
              "w": 0.9853520995474602
            }
          },
          "orthographic": true,
          "orthographicVerticalSize": 5.956,
          "fieldOfView": 57,
          "nearPlane": 1.05,
          "farPlane": 1000,
          "clearFlag": 0,
          "clearColor": {
            "_$type": "Color",
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0
          },
          "fxaa": true,
          "cullingMask": 2147483647,
          "normalizedViewport": {
            "_$type": "Viewport",
            "width": 1,
            "height": 1
          },
          "depthTextureFormat": 35,
          "renderTarget": {
            "_$uuid": "80194bc5-b160-42b9-b13e-8b72a6752353",
            "_$type": "RenderTexture"
          }
        },
        {
          "_$id": "dw8cl08z",
          "_$type": "Sprite3D",
          "name": "DirectionLight",
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": -4.789853259057055,
              "y": 6.537855033359038,
              "z": 10.795269741124761
            },
            "localRotation": {
              "_$type": "Quaternion",
              "x": -0.10880521616207971,
              "y": -0.199562594903086,
              "z": -0.06411230203431158,
              "w": 0.9717128219691923
            },
            "localScale": {
              "_$type": "Vector3",
              "x": 1.0387117761873785,
              "y": 1,
              "z": 1
            }
          },
          "_$comp": [
            {
              "_$type": "DirectionLightCom",
              "intensity": 0.57,
              "lightmapBakedType": 0,
              "shadowMode": 0,
              "shadowStrength": 1,
              "shadowDistance": 50,
              "shadowDepthBias": 1,
              "shadowNormalBias": 1,
              "shadowNearPlane": 0.1,
              "shadowCascadesMode": 0,
              "strength": 1,
              "angle": 0.526,
              "maxBounces": 1024
            }
          ]
        },
        {
          "_$id": "pqmficul",
          "_$prefab": "b05cb7ff-bf7a-48b9-b3da-606ea264761d",
          "name": "LayaMonkey",
          "active": true,
          "layer": 0,
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": -5.5,
              "y": 2,
              "z": 5.5
            },
            "localRotation": {
              "_$type": "Quaternion",
              "x": 0,
              "y": 0,
              "z": 0,
              "w": 1
            }
          },
          "_$child": [
            {
              "_$override": [
                "9t3df7ui",
                "#71"
              ],
              "transform": {
                "localPosition": {
                  "_$type": "Vector3"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "_$id": "moeq0nrm",
      "_$type": "Sprite",
      "name": "bg",
      "width": 640,
      "height": 1136,
      "texture": {
        "_$uuid": "b601858a-a7a6-4b55-ad8f-bbf8f698ba15",
        "_$type": "Texture"
      }
    },
    {
      "_$id": "i8lfu4wp",
      "_$type": "Button",
      "name": "Button",
      "x": 1292,
      "y": 10,
      "width": 32,
      "height": 32,
      "mouseEnabled": true,
      "right": 10,
      "top": 10,
      "skin": "res://310f8fa1-165e-45f6-ad06-ffebf0732f5e",
      "label": "",
      "labelSize": 20,
      "_$comp": [
        {
          "_$type": "0d00ae76-294e-46f3-af30-cee14c7f22ef",
          "scriptPath": "../src/prefab/CloseBtn.ts"
        }
      ]
    },
    {
      "_$id": "aqzcv3v7",
      "_$type": "Sprite",
      "name": "spMonkey",
      "x": 188,
      "y": 222,
      "width": 128,
      "height": 128,
      "texture": {
        "_$uuid": "80194bc5-b160-42b9-b13e-8b72a6752353",
        "_$type": "Texture"
      }
    },
    {
      "_$id": "y11xxqn3",
      "_$type": "Sprite",
      "name": "spTrail",
      "width": 128,
      "height": 128
    }
  ]
}
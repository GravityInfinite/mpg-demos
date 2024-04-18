{
  "_$ver": 1,
  "_$id": "u306jhba",
  "_$runtime": "res://63952401-a6e2-4e05-8565-09c12f512913",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "e622606d-f0a2-4a7e-9173-cba901f1ed8c",
      "scriptPath": "../src/scence/physicsDemo/PhysicsGameMain.ts",
      "dropBox": {
        "_$uuid": "cc110ce9-f31a-4317-b750-56be096c091c",
        "_$type": "Prefab"
      },
      "bullet": {
        "_$uuid": "d5b5aa07-79aa-4b3d-a8d5-db2a5128ce78",
        "_$type": "Prefab"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "t6we1g01",
      "_$type": "Image",
      "name": "ground",
      "y": 724,
      "width": 1334,
      "height": 26,
      "left": 0,
      "right": 0,
      "bottom": 0,
      "skin": "res://4bc2d759-baa8-4638-8f89-3052baf448cd",
      "color": "#ffffff",
      "_$comp": [
        {
          "_$type": "RigidBody",
          "type": "static"
        },
        {
          "_$type": "BoxCollider",
          "label": "ground",
          "width": 750,
          "height": 20
        }
      ]
    },
    {
      "_$id": "0za62z4h",
      "_$type": "Sprite",
      "name": "gameBox",
      "width": 0,
      "height": 0
    },
    {
      "_$id": "r1jgmx6b",
      "_$type": "Box",
      "name": "Box",
      "width": 1334,
      "height": 750,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0
    },
    {
      "_$id": "8eejf915",
      "_$var": true,
      "_$type": "Label",
      "name": "tipLbll",
      "y": 2,
      "width": 1334,
      "height": 743,
      "left": 0,
      "right": 0,
      "top": 2,
      "bottom": 5,
      "text": "别让箱子掉下来\n\n点击屏幕开始游戏",
      "fontSize": 40,
      "color": "#c6302e",
      "align": "center",
      "valign": "middle",
      "leading": 0,
      "padding": "0,0,0,0"
    },
    {
      "_$id": "a7632dbw",
      "_$var": true,
      "_$type": "Label",
      "name": "scoreLbl",
      "x": 497.00000000000006,
      "y": 5,
      "width": 326,
      "height": 82,
      "text": "",
      "fontSize": 40,
      "color": "#0dcc47",
      "align": "center",
      "valign": "middle",
      "leading": 0,
      "padding": "0,0,0,0"
    },
    {
      "_$id": "qa0lwj4i",
      "_$type": "Button",
      "name": "Button",
      "x": 1278,
      "y": 21.999999999999982,
      "width": 32,
      "height": 32,
      "mouseEnabled": true,
      "skin": "res://310f8fa1-165e-45f6-ad06-ffebf0732f5e",
      "label": "",
      "labelSize": 20,
      "_$comp": [
        {
          "_$type": "0d00ae76-294e-46f3-af30-cee14c7f22ef",
          "scriptPath": "../src/prefab/CloseBtn.ts"
        }
      ]
    }
  ]
}
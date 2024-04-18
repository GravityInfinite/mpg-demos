import { LoadingRTBase } from "./LoadingRT.generated";

const { regClass } = Laya;
@regClass()
export default class LoadingRT extends LoadingRTBase {
    onAwake(): void {
        Laya.loader.load(
            //先加载本场景要用的
            ["resources/UI/image.png", "resources/UI/progress.png", "resources/UI/progress$bar.png"]
        ).then(() => {
            let resArr: Array<any> = [
                "resources/UI/images/bg/background.jpg",
                "resources/UI/images/bg/bg14.png",
                "resources/UI/images/bg/img_bg4.png",
                "resources/UI/images/bg/bg.png",
                "resources/UI/images/demo/fcs.jpg",
                "resources/UI/images/demo/whs.jpg",

                { url: "resources/UI/images/bag.atlas", type: Laya.Loader.ATLAS },
                { url: "resources/UI/images/bg.atlas", type: Laya.Loader.ATLAS },
                { url: "resources/UI/images/cd.atlas", type: Laya.Loader.ATLAS },
                { url: "resources/UI/images/comp.atlas", type: Laya.Loader.ATLAS },
                { url: "resources/UI/images/test.atlas", type: Laya.Loader.ATLAS },


                { url: "resources/UI/role/atlasAni/139x.atlas", type: Laya.Loader.ATLAS },
                { url: "resources/UI/role/frameAni/role.atlas", type: Laya.Loader.ATLAS },

                { url: "resources/UI/role/spineAni/dragon.sk", type: Laya.Loader.BUFFER },
                { url: "resources/UI/role/spineAni/goblins.sk", type: Laya.Loader.BUFFER },

                { url: "scenes/Index.ls", type: Laya.Loader.HIERARCHY },
                { url: "scenes/UiMain.ls", type: Laya.Loader.HIERARCHY },
                { url: "scenes/PhysicsGameMain.ls", type: Laya.Loader.HIERARCHY },
                { url: "scenes/D3Main.ls", type: Laya.Loader.HIERARCHY },

                { url: "scenes/uiDemo/Msg.ls", type: Laya.Loader.HIERARCHY },
                { url: "scenes/uiDemo/page/OpenMainScene.ls", type: Laya.Loader.HIERARCHY },

                { url: "prefab/uiDemo/useUI/ChangeTexture.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/useUI/MouseThrough.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/useUI/PhysicalCollision.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/useUI/Progress.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/useUI/TextShow.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/page/Dialog.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/page/Win.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/page/IframeElement.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/page/UsePanel.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/list/BagList.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/list/ComboBox.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/list/LoopList.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/list/MailList.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/list/Refresh.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/list/TreeBox.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/list/TreeList.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/animation/AtlasAni.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/animation/FrameAni.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/animation/SkeletonAni.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/animation/TimelineAni.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/animation/TweenAni.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/interactive/Astar.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/interactive/Joystick.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/interactive/ShapeDetection.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/uiDemo/interactive/tiledMap.lh", type: Laya.Loader.HIERARCHY },

                { url: "prefab/Bullet.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/closeBtn.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/ComboList.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/defaultButton.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/defaultLabel.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/DropBox.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/LoopImg.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/role.lh", type: Laya.Loader.HIERARCHY },

                { url: "prefab/ani/cd.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/ani/refresh.lh", type: Laya.Loader.HIERARCHY },

                { url: "resources/3d/girl/girl.lh", type: Laya.Loader.HIERARCHY },
                { url: "resources/3d/LayaMonkey/LayaMonkey.lh", type: Laya.Loader.HIERARCHY },
                { url: "resources/3d/trail/Cube.lh", type: Laya.Loader.HIERARCHY },

                { url: "prefab/ani/refresh.lh", type: Laya.Loader.HIERARCHY },
                { url: "prefab/ani/cd.lh", type: Laya.Loader.HIERARCHY },

                { url: "resources/sound/destroy.wav", type: Laya.Loader.BUFFER },
                { url: "resources/sound/hit.wav", type: Laya.Loader.BUFFER },
                { url: "resources/files/layaAir.mp4", type: Laya.Loader.BUFFER }

            ];


            //3.0的load，同时可以加载2D,3D资源
            Laya.loader.load(resArr, null, Laya.Handler.create(this, this.onLoading, null, false)).then(() => {
                // 加载完成后，处理逻辑
                this.progress.value = 0.98;
                console.log("加载结束", this.progress.value);
                //预加载的东西太少，为了本地看效果延迟一秒，真实项目不需要延迟
                Laya.timer.once(1000, this, () => {
                    //跳转到入口场景
                    Laya.Scene.open("scenes/Index.ls"); //不要使用Laya.Scene.open("./Scenes/Index.ls");
                });

            });

            // 侦听加载失败
            Laya.loader.on(Laya.Event.ERROR, this, this.onError);
        });
    }

    /**
   * 当报错时打印错误
   * @param err 报错信息
   */
    onError(err: string): void {
        console.log("加载失败: " + err);
    }

    /**
     * 加载时侦听
     */
    onLoading(progress: number): void {
        //接近完成加载时，让显示进度比实际进度慢一点，这是为打开场景时的自动加载预留，尤其是要打开的场景资源多，并没有完全放到预加载中，还需要再自动加载一部分时。
        if (progress > 0.92) this.progress.value = 0.95;
        else this.progress.value = progress;
        // console.log("加载进度: " + progress, this.progress.value);
    }
}
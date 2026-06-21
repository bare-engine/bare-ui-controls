import { LevelData, Scene, Vec2 } from "bare-engine";
import settingsDataUIJson from '../public/data/settingsDataUI.json';
import { Game } from "./game";

export class UI extends Scene
{
    cameraMove:Vec2 = new Vec2(0, 0);
    zoomChange: number = 0;

    constructor()
    {
        super(settingsDataUIJson);
    }

    async OnAwake()
    {
        await this.LoadLevel('ui');
    }

    OnPostLoadLevel(): void
    {
        var objs = bare.object.GetAll();
        for (let obj of objs)
        {
            let name = obj.name;

            if (name == 'text')
                continue;

            bare.hitbox.OnPointerEnter(obj, () => {
                if (name == 'arrow')
                {
                    var rotation = obj.rotation;
                    var move = 4;
                    switch (rotation)
                    {
                        case 0:
                            this.cameraMove.x = move
                            break;
                        case 90:
                            this.cameraMove.y = move
                            break;
                        case 180:
                            this.cameraMove.x = -move
                            break;
                        case -90:
                            this.cameraMove.y = -move
                            break;
                    }
                }
                if (name == "minus")
                {
                    this.zoomChange = -.03;
                }
                if (name == "plus")
                {
                    this.zoomChange = .03;
                }
            });

            bare.hitbox.OnPointerLeave(obj, () => {
                this.cameraMove.clear();
                this.zoomChange = 0;
            })
        }
    }

    OnUpdate(deltaTime: number): void
    {
        var gameCamera = bare.scene.Get(Game).camera;

        gameCamera.AddPosition(this.cameraMove.x, this.cameraMove.y);
        gameCamera.SetZoom(gameCamera.GetZoom() + this.zoomChange);
    }
}
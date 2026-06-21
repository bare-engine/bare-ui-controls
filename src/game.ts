import { CanvasPosition, CanvasScale, Scene, StartBare, TextObject, TextureFilterMode } from 'bare-engine';
//import { ArcadeObject, ArcadePhysicsController } from 'bare-engine/arcade';
import settingsDataJson from '../public/data/settingsData.json';
import { UI } from './ui';

export class Game extends Scene
{
    constructor()
    {
        super(settingsDataJson);
    }

    async OnAwake()
    {
        bare.AddClass(TextObject)
        await bare.scene.Add(UI);
    }

    async OnStart()
    {
        var waldoObj = this.AddGameObject("waldo");
        bare.camera.SetBounds(waldoObj.GetBounds());
        bare.camera.SetZoom(.01);
    }
}

StartBare(Game, {antiAlias: false, textureFilter: TextureFilterMode.NEAREST, 
    resolution: {
        width: 1080, 
        height: 720, 
        scale: CanvasScale.Fit, 
        position: CanvasPosition.Center
    }, showEditorButton: false
});
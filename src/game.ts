import { CanvasPosition, CanvasScale, Scene, StartBare, TextComponent, TextObject, TextureFilterMode } from 'bare-engine';
//import { ArcadeObject, ArcadePhysicsController } from 'bare-engine/arcade';
import settingsDataJson from '../public/data/settingsData.json';
import { UI } from './ui';

export class Game extends Scene
{
    constructor()
    {
        super(settingsDataJson);
    }

    override async OnAwake()
    {
        bare.AddClass(TextObject);
        
        await bare.scene.Add(UI);
    }

    override async OnStart()
    {
        var waldoObj = this.AddGameObject("waldo");
        bare.camera.SetBounds(waldoObj.GetBounds());
        bare.camera.SetZoom(.01);
    }
}

StartBare(Game, {
    antiAlias: true,
    textureFilter: TextureFilterMode.LINEAR, 
    resolution: {
        width: 1088, 
        height: 704, 
        scale: CanvasScale.Fit, 
        position: CanvasPosition.Center
    },
    showEditorButton: false
});
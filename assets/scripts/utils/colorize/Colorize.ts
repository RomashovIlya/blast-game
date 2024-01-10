import { Color, Label, ParticleSystem2D, Sprite, _decorator } from 'cc'
const { ccclass } = _decorator

export enum ColorE {
  white = '#ffffff',
  black = '#000000',
  grey = '#cccccc',
  orange = '#f99871',
  yellow = '#f8f9c5',
  blue = '#a0ddf0',
  purple = '#b3a1b1',
  green = '#96ce8a',
  pink = '#f37b92',
}


@ccclass('Colorize')
export abstract class Colorize {
  // INTERFACE
  public static setSpriteColor(spr: Sprite, color: ColorE) {
    spr.color = new Color(ColorE[color] + '')
  }

  public static setParticleColor(particleSystem: ParticleSystem2D, color: ColorE) {
    particleSystem.startColor = new Color(ColorE[color] + '')
    particleSystem.endColor = new Color(ColorE[color] + '')
  }

  public static setLabelColor(lbl: Label, color: ColorE) {
    lbl.color = new Color(ColorE[color] + '')
  }
}

import { Material, _decorator, resources } from 'cc'
const { ccclass } = _decorator


@ccclass('ResourceMaterial')
export abstract class ResourceMaterial {
  // INTERFACE
  public static loadDir(path: string) {
    const promise = new Promise<Material>((resolve, rejected) => {
      resources.load(path, Material, (err, asset) => {
        resolve(asset)
      })
    })

    return promise
  }
}

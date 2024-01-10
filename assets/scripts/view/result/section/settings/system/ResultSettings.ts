import { _decorator, Node, Vec3 } from 'cc'
import { BoxModelData } from '../../../../../model/box/data/BoxModelData'
import { ResultModelData } from '../../../../../model/result/data/ResultModelData'
import { ResultOptionE } from '../../../../../model/result/entity/ResultModelE'
import { Localization } from '../../../../../service/localization/Localization'
import { ResourcePrefabE } from '../../../../../service/resource/entity/ResourceE'
import { Resource } from '../../../../../service/resource/Resource'
import { ResultOptionComponent } from '../component/ResultOptionComponent'
import { ResultSettingsState } from '../state/ResultSettingsState'
const { ccclass } = _decorator

const OPTION_PREFAB_NAME = 'ResultOption'


@ccclass('ResultSettings')
export abstract class ResultSettings { 
  // RUNTIME - RESULT
  public static createView() {
    if (!ResultModelData._AWAIT_OPTIONS_CREATE) return

    console.log('- ResultSettings - createView')

    ResultSettingsState.tilesComponent.tilesLB.string = Localization.getText('common', 'result_tiles')
    ResultSettingsState.fieldComponent.fieldLB.string = Localization.getText('common', 'result_field')

    // TILES
    for (const item of ResultModelData.tilesOptions) {
      const node = this.createOption(item, ResultOptionE.tiles, BoxModelData.tiles?.length === item)
      
      node.setParent(ResultSettingsState.tilesComponent.options)
      node.position = Vec3.ZERO
    }

    // FIELD
    for (const item of ResultModelData.columnsOptions) {
      const node = this.createOption(item, ResultOptionE.columns, BoxModelData.columns === item)
      
      node.setParent(ResultSettingsState.fieldComponent.columns)
      node.position = Vec3.ZERO
    }
    
    for (const item of ResultModelData.rowsOptions) {
      const node = this.createOption(item, ResultOptionE.rows, BoxModelData.rows === item)
      
      node.setParent(ResultSettingsState.fieldComponent.rows)
      node.position = Vec3.ZERO
    }

    delete (ResultModelData._AWAIT_OPTIONS_CREATE)
  }

  public static updateView() {
    if (!ResultModelData._OPTIONS_UPDATE) return

    console.log('- ResultSettings - updateView')

    // TILES
    if (ResultModelData._OPTIONS_UPDATE.isTiles) {
      for (const node of ResultSettingsState.tilesComponent.options.children) {
        const component = node.getComponent(ResultOptionComponent)
        component.check.active = +node.name === BoxModelData.tilesLimit
      }
    }

    // FIELD
    if (ResultModelData._OPTIONS_UPDATE.isColumns) {
      for (const node of ResultSettingsState.fieldComponent.columns.children) {
        const component = node.getComponent(ResultOptionComponent)
        component.check.active = +node.name === BoxModelData.columns
      }
    }
    
    if (ResultModelData._OPTIONS_UPDATE.isRows) {
      for (const node of ResultSettingsState.fieldComponent.rows.children) {
        const component = node.getComponent(ResultOptionComponent)
        component.check.active = +node.name === BoxModelData.rows
      }
    }

    delete (ResultModelData._OPTIONS_UPDATE)
  }

  
  // PRIVATE
  private static createOption(value: number, type: ResultOptionE, isActive: boolean): Node {
    const node = Resource.elemInstant(ResourcePrefabE.result, OPTION_PREFAB_NAME)
    node.name = value + ''

    let component = node.getComponent(ResultOptionComponent)

    component.optionLB.string = node.name
    component.type = type
    component.check.active = isActive

    return node
  }
}

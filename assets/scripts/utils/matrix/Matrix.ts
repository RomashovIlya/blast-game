import { _decorator } from 'cc'
const { ccclass } = _decorator

type MatrixT = {
  column: number
  row: number
}

type MatrixParamT = {
  centerColumn: number,
  centerRow: number,
  columnsTotal: number
  rowsTotal: number,
  radius: number,
}


@ccclass('Matrix')
export abstract class Matrix {
  // INTERFACE
  public static getRadial(params: MatrixParamT): MatrixT[] {
    let matrix = [] as MatrixT[]

    const { centerColumn, centerRow, radius, columnsTotal, rowsTotal } = params

    matrix.push({
      column: centerColumn,
      row: centerRow,
    })
    
    for (let c = 0; c <= radius; c++) {
      for (let r = radius; r > 0; r--) {
        matrix.push({
          column: centerColumn + c,
          row: centerRow + r - c,
        })

        matrix.push({
          column: centerColumn - c,
          row: centerRow - r + c,
        })

        matrix.push({
          column: centerColumn + c,
          row: centerRow - r + c,
        })

        matrix.push({
          column: centerColumn - c,
          row: centerRow + r - c,
        })
      }
    }

    matrix = matrix.filter(i => i.column >= 0 && i.column < columnsTotal && i.row >= 0 && i.row < rowsTotal)

    return matrix
  }
}

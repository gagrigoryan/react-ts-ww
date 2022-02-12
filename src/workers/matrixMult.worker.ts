import { TMatrix } from "../types/Matrix";
import { getMatrixColumn, scalarProduct } from "../utils/matrixMultiplication";

export type MatrixWorkerData = {
  matrix1: TMatrix;
  matrix2: TMatrix;
  rowIndex: number;
  columnIndex: number;
};

declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };

self.addEventListener("message", (event: MessageEvent<MatrixWorkerData>) => {
  const { matrix1, matrix2, rowIndex, columnIndex } = event.data;
  const currentRow = matrix1[rowIndex];
  const currentColumn = getMatrixColumn(matrix2, columnIndex);

  self.postMessage({
    result: scalarProduct(currentRow, currentColumn),
    rowIndex,
    columnIndex,
  });
});

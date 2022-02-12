import { TMatrix } from "../types/Matrix";
import { TVector } from "../types/Vector";

export const matrixMultiplication = (
  matrix1: TMatrix,
  matrix2: TMatrix
): TMatrix => {
  return matrix1.map((row: TVector) => {
    return matrix2.map((_, columnIndex) => {
      const column = getMatrixColumn(matrix2, columnIndex);
      return scalarProduct(row, column);
    });
  });
};

export const getMatrixColumn = (
  matrix: TMatrix,
  columnIndex: number
): TVector => {
  return matrix.map((row: TVector) => row[columnIndex]);
};

export const scalarProduct = (vector1: TVector, vector2: TVector): number => {
  return vector1.reduce(
    (previous, current, index) => previous + current * vector2[index],
    0
  );
};

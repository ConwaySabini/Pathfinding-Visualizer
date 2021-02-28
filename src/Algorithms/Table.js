export default class Table {
    constructor(Row, Col) {
        this.row = Row; // Row serves as f cost priority queue
        this.col = Col; // Col stores another Table with position
    }

    setRow(row) {
        this.row = row;
    }

    setCol(col) {
        this.col = col;
    }
}
import pqueue from './pqueue';

const ROW = 30;
const COL = 60;

export default class Star {
    constructor() {
        this.gridData = [];
        this.row = -1;
        this.col = -1;
        // set of pair of pair
        this.openList = new pqueue();
        this.found = false;
        this.g = -1;
        this.f = -1;
        this.h = -1;
        this.source = -1;
        this.dest = -1;
    }

    setvalues() {
        for (let i = 0; i < ROW; i++) {
            this.gridData[i] = []
            for (let j = 0; j < COL; j++) {
                this.gridData[i][j] = new Cell();
                this.gridData[i][j].setValues
                    (Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
            }
        }
    }

    setNodes(source, dest) {
        this.source = source;
        this.dest = dest;
    }
}

class Cell {
    constructor() {
        this.f = -1; // sum
        this.g = -1; // cost
        this.h = -1; // guess
    }

    setValues(f, g, h) {
        this.f = f;
        this.g = g;
        this.h = h;
    }
    // f = g + h 
}
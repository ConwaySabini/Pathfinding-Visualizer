
import Table from './Table';
import Star from './Star';

const ROW = 30;
const COL = 60;

function isValid(row, col) {
    return ((row >= 0) && (row < ROW) &&
        (col >= 0) && (col < COL));
}

function isDestination(row, col, dest) {
    if (row === dest.row && col === dest.col)
        return true;
    else
        return false;
}

function euclidean(row, col, dest) {
    // Euclidean distance formula
    return (Math.sqrt((row - dest.row) * (row - dest.row)
        + (col - dest.col) * (col - dest.col)));
}

/*function manhattan(row, col, dest) {
    // Manhattan distance formula
    return (Math.abs(row - dest.row) + Math.abs(col - dest.col));
}

function diagonal(row, col, dest) {
    // diagonal distance formula
    return (Math.max(Math.abs(row - dest.row), Math.abs(col - dest.col)));
}*/

export function getGreedPath(finishNode) {
    const path = [];
    let current = finishNode;
    while (current !== null) {
        path.unshift(current);
        current = current.previous;
    }
    return path;
}

function search(grid, row, col, data, visited, direction) {
    if (isValid(row, col) && !grid[row][col].isVisited) {
        let i = row, j = col;
        switch (direction) {
            case 0:
                i = row + 1;
                break;
            case 1:
                i = row - 1;
                break;
            case 2:
                j = col - 1;
                break;
            case 3:
                j = col + 1;
                break;
            case 4:
                i = row + 1;
                j = col - 1;
                break;
            case 5:
                i = row + 1;
                j = col + 1;
                break;
            case 6:
                i = row - 1;
                j = col - 1;
                break;
            case 7:
                i = row - 1;
                j = col + 1;
                break;
            default:
                console.log("direction error");
                break;
        }
        if (isDestination(row, col, data.dest)) {
            grid[row][col].previous = grid[i][j];
            grid[row][col].isVisited = true;
            visited.push(grid[row][col]);
            data.path = getGreedPath(data.dest);
            data.found = true;
            return visited;
        }
        else if (!grid[row][col].isVisited &&
            !grid[row][col].isWall) {

            if (grid[row][col].isWeight) {
                data.g = data.gridData[i][j].g + 10.0;
            }
            else {
                data.g = data.gridData[i][j].g + 1.0;
            }
            data.h = euclidean(row, col, data.dest);
            data.f = data.h;
            if (data.gridData[row][col].f === Number.MAX_SAFE_INTEGER ||
                data.gridData[row][col].f > data.f) {
                data.openList.insert(new Table(data.f,
                    new Table(row, col)));

                data.gridData[row][col].f = data.f;
                data.gridData[row][col].g = data.g;
                data.gridData[row][col].h = data.h;
                grid[row][col].previous = grid[i][j];
            }
        }
    }
}



// Greedy A* algorithm
export function greedyBFS(grid, source, dest) {
    if (!isValid(source.row, source.col) || !isValid(dest.row, dest.col)) {
        console.log("Source Node must be on grid");
        return;
    }
    if (grid[source.row][source.col].isWall || grid[dest.row][dest.col].isWall) {
        console.log("There must be a path from the source to the destination");
        return;
    }

    if (isDestination(source.row, source.col, dest)) {
        console.log("Destination is the source");
        return;
    }

    const visited = [];
    const data = new Star();
    data.setvalues();
    data.setNodes(source, dest);

    data.row = source.row;
    data.col = source.col;
    data.gridData[data.row][data.col].setValues(0.0, 0.0, 0.0);

    data.openList.insert(new Table(0.0, new Table(data.row, data.col))); // adds start cell with f of 0

    while (data.openList.size) {
        const first = data.openList.extractMin();
        if (isDestination(first.row, first.col, dest)) {
            return visited;
        }

        data.row = first.col.row;
        data.col = first.col.col;
        grid[data.row][data.col].isVisited = true;
        visited.push(grid[data.row][data.col]);

        search(grid, data.row - 1, data.col, data, visited, 0); // North
        if (!data.found) {
            search(grid, data.row + 1, data.col, data, visited, 1); // South
        }
        if (!data.found) {
            search(grid, data.row, data.col + 1, data, visited, 2); // East
        }
        if (!data.found) {
            search(grid, data.row, data.col - 1, data, visited, 3); // West
        }
        if (!data.found) {
            search(grid, data.row - 1, data.col + 1, data, visited, 4); // NE
        }
        if (!data.found) {
            search(grid, data.row - 1, data.col - 1, data, visited, 5); // NW
        }
        if (!data.found) {
            search(grid, data.row + 1, data.col + 1, data, visited, 6); // SE
        }
        if (!data.found) {
            search(grid, data.row + 1, data.col - 1, data, visited, 7); // SW
        }
        if (data.found) {
            return visited;
        }
    }
    // No path found
    if (data.found === false)
        console.log("Failed to find path");
    return visited;
}

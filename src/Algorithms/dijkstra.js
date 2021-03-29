
export function dijkstra(grid, start, finish) {
    const visited = [];
    start.distance = 0;
    const unvisited = getAllNodes(grid);
    while (unvisited.length) {
        sortNodes(unvisited);
        const node = unvisited.shift();
        // skip walls
        if (node.isWall) continue;
        if (node.distance === Infinity) return visited;
        node.isVisited = true;
        visited.push(node);
        if (node === finish) return visited;
        update(node, grid);
    }
}

function sortNodes(unvisited) {
    unvisited.sort((a, b) => a.distance - b.distance);
}

// gets neighbors and updates the previous node in the path and distance
function update(node, grid) {
    const unvisited = getUnvisited(node, grid);
    for (const next of unvisited) {
        if (!next.isWeight) {
            next.distance = node.distance + 1;
        }
        else {
            next.distance = node.distance + 10;
        }
        next.previous = node;
    }
}

function getUnvisited(node, grid) {
    const Nodes = [];
    const { col, row } = node;
    if (row > 0) Nodes.push(grid[row - 1][col]);
    if (row < grid.length - 1) Nodes.push(grid[row + 1][col]);
    if (col > 0) Nodes.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) Nodes.push(grid[row][col + 1]);
    return Nodes.filter(next => !next.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getPath(finishNode) {
    const path = [];
    let current = finishNode;
    while (current !== null) {
        path.unshift(current);
        current = current.previous;
    }
    return path;
}
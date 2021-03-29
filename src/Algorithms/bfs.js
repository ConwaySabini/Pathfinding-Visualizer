export function bfs(grid, start, finish) {
    const queue = [];
    queue.push(start);
    const visited = [];
    start.isVisited = true;

    while (queue.length) {
        const current = queue.shift();
        if (current.isWall) continue;
        visited.push(current);
        if (current.row === finish.row && current.col === finish.col) {
            return visited;
        }
        const list = updatePath(current, grid);
        for (const node of list) {
            queue.push(node);
            node.isVisited = true;
        }
    }
    console.log("failed to find path");
    return visited;
}

function getNodes(node, grid) {
    const { row, col } = node;
    let next = [];
    if (row > 0) {
        if (!grid[row - 1][col].isVisited) next.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1) {
        if (!grid[row + 1][col].isVisited) next.push(grid[row + 1][col]);
    }
    if (col > 0) {
        if (!grid[row][col - 1].isVisited) next.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1) {
        if (!grid[row][col + 1].isVisited) next.push(grid[row][col + 1]);
    }
    return next;
}

function updatePath(current, grid) {
    const unvisited = getNodes(current, grid);
    for (const next of unvisited) {
        next.previous = current;
    }
    return unvisited;
}

export function getBFS(finishNode) {
    const path = [];
    let current = finishNode;
    while (current !== null) {
        path.unshift(current);
        current = current.previous;
    }
    return path;
}
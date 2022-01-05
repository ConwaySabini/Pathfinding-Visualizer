
// returns the visited nodes in the dfs
export function dfs(grid, start, finish) {
    const stack = [];
    stack.push(start);
    const visited = [];

    while (stack.length) {
        const current = stack.pop();
        if (current.isWall) continue;
        visited.push(current);
        if (current.row === finish.row && current.col === finish.col) {
            return visited;
        }
        let unvisited = [];

        if (!current.isVisited) {
            current.isVisited = true;
        }
        unvisited = updatePath(current, grid, visited, finish);
        for (const node of unvisited) {
            stack.push(node);
            node.isVisited = true;
            if (node.row === finish.row && node.col === finish.col) {
                return visited;
            }
        }
    }
    console.log("failed to find path");
    return visited;
}

// returns the list of unvisited next nodes to add to the stack
function getNodes(node, grid, direction, visited, finish) {
    let { row, col } = node;
    let next = [];
    switch (direction) {
        case "up":
            while (row > 0 && !grid[row - 1][col].isWall) {
                next.push(grid[row - 1][col]);
                if (row !== 1) visited.push(grid[row - 1][col]);
                if (grid[row - 1][col].previous === null) grid[row - 1][col].previous = grid[row][col];
                if (row === finish.row && col === finish.col) return next;
                row--;
            }
            break;
        case "right":
            while (col < grid[0].length - 1 && !grid[row][col + 1].isWall) {
                next.push(grid[row][col + 1]);
                if (col !== grid[0].length - 1) visited.push(grid[row][col + 1]);
                if (grid[row][col + 1].previous === null) grid[row][col + 1].previous = grid[row][col];
                if (row === finish.row && col === finish.col) return next;
                col++;
            }
            break;
        case "down":
            while (row < grid.length - 1 && !grid[row + 1][col].isWall) {
                next.push(grid[row + 1][col]);
                if (row !== grid.length - 1) visited.push(grid[row + 1][col]);
                if (grid[row + 1][col].previous === null) grid[row + 1][col].previous = grid[row][col];
                if (row === finish.row && col === finish.col) return next;
                row++;
            }
            break;
        case "left":
            if (col > 0 && !grid[row][col - 1].isWall) {
                next.push(grid[row][col - 1]);
                visited.push(grid[row][col]);
                if (grid[row][col - 1].previous === null) grid[row][col - 1].previous = grid[row][col];
                if (row === finish.row && col === finish.col) return next;
            }
            break;
        default:
            break;
    }
    return next;
}

// determines the direction to move and returns the unvisited nodes in that depth
function updatePath(node, grid, visited, finish) {
    const { row, col } = node;
    let direction = "";
    let unvisited = [];
    if (node.row > 0 && !grid[row - 1][col].isVisited && !grid[row - 1][col].isWall) direction = "up";
    else if (node.col < grid[0].length - 1 && !grid[row][col + 1].isVisited && !grid[row][col + 1].isWall) direction = "right";
    else if (node.row < grid.length - 1 && !grid[row + 1][col].isVisited && !grid[row + 1][col].isWall) direction = "down";
    else if (node.col > 0 && !grid[row][col - 1].isVisited && !grid[row][col - 1].isWall) direction = "left";
    unvisited = getNodes(node, grid, direction, visited, finish);
    return unvisited;
}

// returns the dfs path
export function getDFS(finishNode) {
    const path = [];
    let current = finishNode;
    while (current !== null) {
        path.unshift(current);
        current = current.previous;
    }
    console.log(current);
    return path;
}

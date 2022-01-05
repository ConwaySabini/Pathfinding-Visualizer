
//TODO, Add Mazes with generation
//TODO, Error handling
//TODO, Add Bidirectional Searching support
import React, { Component } from 'react';
import Node from './Node/Node';
import { aStar, getStarPath } from '../Algorithms/a-star';
import { greedyBFS, getGreedPath } from '../Algorithms/greedy-bfs';
import { dijkstra, getPath } from '../Algorithms/dijkstra';
import { bfs, getBFS } from '../Algorithms/bfs';
import { dfs, getDFS } from '../Algorithms/dfs';

import './PathFinder.css';

const START_ROW = 5;
const START_COL = 10;
const FINISH_ROW = 10;
const FINSIH_COL = 50;

export default class PathFinder extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            isMouseClick: false,
            algorithm: "dijkstra",
            finding: false,
            isWeight: false,
            isRemove: false,
            loading: false,
        };
    }

    componentDidMount() {
        const grid = getGrid();
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        const { finding, isWeight, isRemove } = this.state;
        console.log(isWeight);
        if (!finding) {
            const newGrid = getWallGrid(this.state.grid, row, col, isWeight, isRemove);
            this.setState({ grid: newGrid, isMouseClick: true });
        }
    }

    handleMouseEnter(row, col) {
        const { finding, isWeight, isRemove } = this.state;
        if (!finding) {
            if (!this.state.isMouseClick) return;
            const newGrid = getWallGrid(this.state.grid, row, col, isWeight, isRemove);
            this.setState({ grid: newGrid });
        }
    }

    handleMouseUp() {
        this.setState({ isMouseClick: false });
    }

    animate(visited, path) {
        for (let i = 0; i <= visited.length; i++) {
            if (i === visited.length) {
                setTimeout(() => {
                    this.animatePath(path);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visited[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }

    animatePath(path) {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const node = path[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }

    visualize() {
        const { grid } = this.state;
        const source = grid[START_ROW][START_COL];
        const dest = grid[FINISH_ROW][FINSIH_COL];
        const { algorithm } = this.state;
        let finding = true;
        this.setState({ finding });
        let visited, path;
        switch (algorithm) {
            case "dijkstra":
                visited = dijkstra(grid, source, dest);
                path = getPath(dest);
                this.animate(visited, path);
                break;
            case "A*":
                visited = aStar(grid, source, dest);
                path = getStarPath(dest);
                this.animate(visited, path);
                break;
            case "BFS":
                visited = bfs(grid, source, dest);
                path = getBFS(dest);
                this.animate(visited, path);
                break;
            case "DFS":
                visited = dfs(grid, source, dest);
                path = getDFS(dest);
                this.animate(visited, path);
                break;
            case "BestFS":
                visited = greedyBFS(grid, source, dest);
                path = getGreedPath(dest);
                this.animate(visited, path);
                break;
            default:
                break;
        }
        finding = false;
        this.setState({ finding });
    }

    clearWalls() {
        const { finding, grid } = this.state;
        if (!finding) {
            for (let i = 0; i < grid.length; i++) {
                const row = grid[i];
                for (let j = 0; j < row.length; j++) {
                    const node = row[j];
                    if (node.isFinish) {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
                    }
                    else if (node.isStart) {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
                    }
                    else if (node.isWall) {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
                    }
                }
            }
        }
    }

    clearGrid() {
        const { finding } = this.state;
        if (!finding) {
            const grid = getGrid();
            this.setState({ grid });
            for (let i = 0; i < grid.length; i++) {
                const row = grid[i];
                for (let j = 0; j < row.length; j++) {
                    const node = row[j];
                    if (node.isFinish) {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
                    }
                    else if (node.isStart) {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
                    }
                    else {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
                    }
                }
            }
        }
    }

    clearPath() { // TODO FIX bug where path nodes are
        const { finding, grid } = this.state;
        if (!finding) {
            for (let i = 0; i < grid.length; i++) {
                const row = grid[i]
                for (let j = 0; j < row.length; j++) {
                    const node = row[j];
                    if (node.isFinish) {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
                    }
                    else if (node.isStart) {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
                    }
                    else if (node.isVisited) {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
                    }
                }
            }
        }
    }

    render() {
        const { grid, isMouseClick } = this.state;

        return (
            <>
                <script src="priority-queue.js"></script>
                <div className="nav">
                    <div className="dropdown">
                        <button className="dropbtn">Algorithms</button>
                        <div className="dropdown-content">
                            <button className="algorithm" onClick={() => {
                                const { finding } = this.state;
                                if (!finding) {
                                    const algorithm = "dijkstra";
                                    this.setState({ algorithm });
                                }
                            }}>Dijkstra's</button>
                            <button className="algorithm" onClick={() => {
                                const { finding } = this.state;
                                if (!finding) {
                                    const algorithm = "A*";
                                    this.setState({ algorithm });
                                }
                            }}>A*</button>
                            <button className="algorithm" onClick={() => {
                                const { finding } = this.state;
                                if (!finding) {
                                    const algorithm = "BFS";
                                    this.setState({ algorithm });
                                }
                            }}>Breadth-First-Search</button>
                            <button className="algorithm" onClick={() => {
                                const { finding } = this.state;
                                if (!finding) {
                                    const algorithm = "DFS";
                                    this.setState({ algorithm });
                                }
                            }}>Depth-First-Search</button>
                            <button className="algorithm" onClick={() => {
                                const { finding } = this.state;
                                if (!finding) {
                                    const algorithm = "BestFS";
                                    this.setState({ algorithm });
                                }
                            }}>Best-First-Search</button>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Edit Nodes</button>
                        <div className="dropdown-content">
                            <button className="weight" onClick={() => {
                                this.setState({ isRemove: false });
                                const { finding } = this.state;
                                if (!finding) {
                                    const isWeight = false;
                                    this.setState({ isWeight });
                                }
                            }}>Place Wall</button>
                            <button className="weight" onClick={() => {
                                const { finding } = this.state;
                                this.setState({ isRemove: false });
                                if (!finding) {
                                    const isWeight = true;
                                    this.setState({ isWeight });
                                }
                            }}>Place Weight Node</button>
                            <button className="weight" onClick={() => {
                                const { finding } = this.state;
                                if (!finding) {
                                    const isRemove = true;
                                    this.setState({ isRemove });
                                }
                            }}>Remove Node</button>
                        </div>
                    </div>
                    <button onClick={() => {
                        const { finding } = this.state;
                        if (!finding) {
                            this.visualize();
                        }
                    }}>Visualize</button>
                    <button onClick={() => {
                        const { finding } = this.state;
                        if (!finding) {
                            this.clearGrid();
                        }
                    }}>Clear Board</button>
                    <button onClick={() => {
                        const { finding } = this.state;
                        if (!finding) {
                            this.clearWalls();
                        }
                    }}>Clear Walls</button>
                    <button onClick={() => {
                        const { finding } = this.state;
                        if (!finding) {
                            this.clearPath();
                        }
                    }}>Clear Path</button>
                </div>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, isWall, isWeight } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            isWeight={isWeight}
                                            isMouseClick={isMouseClick}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp()}
                                            row={row}>
                                        </Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

const getGrid = () => {
    const grid = [];
    for (let row = 0; row < 30; row++) {
        const currentRow = [];
        for (let col = 0; col < 60; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_ROW && col === START_COL,
        isFinish: row === FINISH_ROW && col === FINSIH_COL,
        distance: Infinity,
        isVisited: false,
        isWeight: false,
        isWall: false,
        previous: null,
    };
};

const getWallGrid = (grid, row, col, weight, remove) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
    };
    if (weight && !remove) {
        newNode.isWeight = true;
        newNode.isWall = false;
    }
    else if (!remove && !node.isWall) {
        newNode.isWall = true;
    }
    else {
        newNode.isWall = false;
        newNode.isWeight = false;
    }
    newGrid[row][col] = newNode;
    return newGrid;
};

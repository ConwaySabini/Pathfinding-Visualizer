import Table from './Table';

export default class pqueue {

    constructor() {
        this.heap = [];
        this.heap[0] = new Table(Number.MIN_SAFE_INTEGER, new Table(0, 0));
        this.size = 0;
    }

    size() {
        return this.heap.length;
    }

    swap(idx, idx2) {
        const tmp = this.heap[idx];
        this.heap[idx] = this.heap[idx2];
        this.heap[idx2] = tmp;
    }

    peek() {
        return this.heap[1];
    }

    insert(item) {
        if (item === null) return;
        this.heap[0] = item; // 0 index is used as dummy node
        this.size = this.size + 1;
        let index = this.size;

        while (item.row < this.heap[Math.floor(index / 2)].row) {
            this.heap[index] = this.heap[Math.floor(index / 2)];
            index = Math.floor(index / 2);
        }
        this.heap[index] = item;
    }

    extractMin() {
        if (this.size === 0) return false;
        const root = this.heap[1];
        this.heap[1] = this.heap[this.size];
        this.size--;
        this.percolateDown(1);
        this.heap.splice(this.size + 1, 1);
        return root;
    }

    percolateDown(index) {
        let child = Math.floor(index * 2); // smallest child
        if (child > this.size) return;
        if (child !== this.size && this.heap[child + 1] !== undefined &&
            this.heap[child].row > this.heap[child + 1].row) child = child + 1; // confirm smallest
        if (this.heap[child].row < this.heap[index].row) { // if nodes are out of order swap and percolate
            this.swap(child, index);
            this.percolateDown(child);
        }
    }

    heapify() {
        for (let i = this.size / 2; i > 0; i--) {
            this.percolateDown(i);
        }
    }
}
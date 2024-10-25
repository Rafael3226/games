export class PongPlayer {
    private coordinates: number[] = []
    private height: number = 0
    constructor(public size: number) { }

    public setIntialState(height: number) {
        this.height = height;
        const halfHeight = Math.floor(height / 2)
        const realSize = 2 * this.size + 1
        for (let i = 0; i < realSize; i++) {
            this.coordinates.push(halfHeight - this.size + i)
        }
    }

    public getYCoordinates() {
        return this.coordinates
    }

    public moveUp() {
        const firstY = this.coordinates[0]
        if (0 < firstY) {
            this.coordinates.unshift(firstY - 1)
            this.coordinates.pop()
        }
    }

    public moveDown() {
        const lastY = this.coordinates[this.coordinates.length - 1]
        if (lastY < this.height - 1) {
            this.coordinates.push(lastY + 1)
            this.coordinates.shift()
        }
    }
}
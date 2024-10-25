export class PongPlayer {
    private coordinates: number[] = []
    private height: number = 0
    constructor() { }

    public setIntialState(height: number) {
        const halfHeight = Math.floor(height / 2)
        this.coordinates = [halfHeight - 1, halfHeight, halfHeight + 1]
    }

    public getYCoordinates() {
        return this.coordinates
    }

    public moveUp() {
        const firstY = this.coordinates[0]
        if (firstY !== 0) {
            this.coordinates.unshift(firstY - 1)
            this.coordinates.pop()
        }
    }

    public moveDown() {
        const lastY = this.coordinates[this.coordinates.length - 1]
        if (lastY !== this.height - 1) {
            this.coordinates.push(lastY + 1)
            this.coordinates.shift()
        }
    }
}
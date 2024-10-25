import { PongEntities } from "./PongEntities"

export class PongBoard {
    private board: PongEntities[][] = []
    constructor(
        public width: number,
        public height: number
    ) {
        for (let i = 0; i < this.width; i++) {
            this.board.push(new Array(this.height).fill(PongEntities.EMPTY))
        }
    }

    public clean() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.board[i][j] = PongEntities.EMPTY
            }
        }
    }

    public isXInBoard(x: number) {
        return 0 <= x && x <= this.width - 1
    }

    public isYInBoard(y: number) {
        return 0 <= y && y <= this.height - 1
    }

    public isPositionInBoard(x: number, y: number) {
        return this.board && this.isXInBoard(x) && this.isYInBoard(y)
    }

    public isPositionEmpty(x: number, y: number) {
        return this.isPositionInBoard(x, y) && this.board![x][y] === PongEntities.EMPTY
    }

    public setEntitie(x: number, y: number, entitie: PongEntities) {
        this.board[x][y] = entitie
    }

    public getBoard() {
        return this.board
    }
}
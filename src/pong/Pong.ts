
export enum PongEntities {
    EMPTY,
    BALL,
    PLAYER_1,
    PLAYER_2
}

export type PongBoard = PongEntities[][]

enum PongBallDirections { LB, L, LT, RB, R, RT, }

export class Pong {
    private board: PongBoard | undefined
    private ball: PongBall = new PongBall()
    public direction: PongBallDirections = PongBallDirections.R
    constructor(
        public playerA: PongPlayer,
        public playerB: PongPlayer,
        private width: number,
        private height: number
    ) {
        this.createBoard()
        const halfWidth = Math.floor(this.width / 2)
        const halfHeight = Math.floor(this.height / 2)
        this.ball.setCoordinates(halfWidth, halfHeight)
        this.updateEntitiesPosition();
    }

    private cleanBoard() {
        if (!this.board) return
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.board[i][j] = PongEntities.EMPTY
            }
        }
    }

    private createBoard() {
        this.board = []
        for (let i = 0; i < this.width; i++) {
            this.board.push(new Array(this.height).fill(PongEntities.EMPTY))
        }
    }

    private isXInBoard(x: number) {
        return !(x < 0 || this.width - 1 < x)
    }

    private isYInBoard(y: number) {
        return !(y < 0 || this.height - 1 < y)
    }

    private isPositionInBoard(x: number, y: number) {
        return this.board && this.isXInBoard(x) && this.isYInBoard(y)
    }

    private isPositionEmpty(x: number, y: number) {
        return this.isPositionInBoard(x, y) && this.board![x][y] === PongEntities.EMPTY
    }

    public updateBallPosition() {
        let newX, newY
        switch (this.direction) {
            case PongBallDirections.L:
                newX = this.ball.x - 1;
                newY = this.ball.y;
                if (this.isPositionEmpty(newX, newY)) {
                    this.ball.x = newX
                } else {
                    this.changeBallXDirection()
                    this.updateBallPosition()
                }
                break;
            case PongBallDirections.LT:
                newX = this.ball.x - 1;
                newY = this.ball.y - 1;
                if (this.isPositionEmpty(newX, newY)) {
                    this.ball.x = newX
                    this.ball.y = newY
                } else if (this.isYInBoard(newY)) {
                    this.changeBallXDirection()
                    this.updateBallPosition()
                } else {
                    this.changeBallYDirection()
                    this.updateBallPosition()
                }
                break;
            case PongBallDirections.LB:
                newX = this.ball.x - 1;
                newY = this.ball.y + 1;
                if (this.isPositionEmpty(newX, newY)) {
                    this.ball.x = newX
                    this.ball.y = newY
                } else if (this.isYInBoard(newY)) {
                    this.changeBallXDirection()
                    this.updateBallPosition()
                } else {
                    this.changeBallYDirection()
                    this.updateBallPosition()
                }
                break;
            case PongBallDirections.R:
                newX = this.ball.x + 1;
                newY = this.ball.y;
                if (this.isPositionEmpty(newX, newY)) {
                    this.ball.x = newX
                } else {
                    this.changeBallXDirection()
                    this.updateBallPosition()
                }
                break;
            case PongBallDirections.RT:
                newX = this.ball.x + 1;
                newY = this.ball.y - 1;
                if (this.isPositionEmpty(newX, newY)) {
                    this.ball.x = newX
                    this.ball.y = newY
                } else if (this.isYInBoard(newY)) {
                    this.changeBallXDirection()
                    this.updateBallPosition()
                } else {
                    this.changeBallYDirection()
                    this.updateBallPosition()
                }
                break;
            case PongBallDirections.RB:
                newX = this.ball.x + 1;
                newY = this.ball.y + 1;
                if (this.isPositionEmpty(newX, newY)) {
                    this.ball.x = newX
                    this.ball.y = newY
                } else if (this.isYInBoard(newY)) {
                    this.changeBallXDirection()
                    this.updateBallPosition()
                } else {
                    this.changeBallYDirection()
                    this.updateBallPosition()
                }
                break;
        }
    }

    public updateEntitiesPosition() {
        this.cleanBoard()
        this.board![this.ball.x][this.ball.y] = PongEntities.BALL
        this.playerA.getYCoordinates().forEach(y => {
            this.board![0][y] = PongEntities.PLAYER_1
        });
        this.playerB.getYCoordinates().forEach(y => {
            this.board![this.width - 1][y] = PongEntities.PLAYER_2
        });
    }

    private changeBallXDirection() {
        const random = Math.ceil(Math.random() * 3) ?? 1
        const leftDirections = [
            PongBallDirections.LB,
            PongBallDirections.L,
            PongBallDirections.LT
        ]

        const rigthDirections = [
            PongBallDirections.RB,
            PongBallDirections.R,
            PongBallDirections.RT
        ]
        if (leftDirections.includes(this.direction)) {
            switch (random) {
                case 1:
                    this.direction = PongBallDirections.RB
                    break;
                case 2:
                    this.direction = PongBallDirections.R
                    break;
                case 3:
                    this.direction = PongBallDirections.RT
                    break;
            }
        } else if (rigthDirections.includes(this.direction)) {
            switch (random) {
                case 1:
                    this.direction = PongBallDirections.LB
                    break;
                case 2:
                    this.direction = PongBallDirections.L
                    break;
                case 3:
                    this.direction = PongBallDirections.LT
                    break;
            }
        }
    }

    private changeBallYDirection() {
        switch (this.direction) {
            case PongBallDirections.RB:
                this.direction = PongBallDirections.RT
                break;
            case PongBallDirections.RT:
                this.direction = PongBallDirections.RB
                break;
            case PongBallDirections.LB:
                this.direction = PongBallDirections.LT
                break;
            case PongBallDirections.LT:
                this.direction = PongBallDirections.LB
                break;
        }
    }

    public getBoard() {
        return this.board ?? [];
    }
}

export class PongPlayer {
    private coordinates: number[] = [];

    constructor(private height: number) {
        const halfHeight = Math.floor(this.height / 2)
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

export class PongBall {
    public x: number = 0
    public y: number = 0

    constructor() { }

    public setCoordinates(x: number, y: number) {
        this.x = x;
        this.y = y
    }
}

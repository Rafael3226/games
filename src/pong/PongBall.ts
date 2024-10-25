export enum PongBallDirections { LB, L, LT, RB, R, RT, }

export class PongBall {
    public x: number = 0
    public y: number = 0
    public direction: PongBallDirections = PongBallDirections.R

    constructor() { }

    public setCoordinates(x: number, y: number) {
        this.x = x;
        this.y = y
    }

    public getNextPosition() {
        let [newX, newY] = [this.x, this.y]
        switch (this.direction) {
            case PongBallDirections.L:
                newX = this.x - 1;
                break;
            case PongBallDirections.LT:
                newX = this.x - 1;
                newY = this.y - 1;
                break;
            case PongBallDirections.LB:
                newX = this.x - 1;
                newY = this.y + 1;
                break;
            case PongBallDirections.R:
                newX = this.x + 1;
                break;
            case PongBallDirections.RT:
                newX = this.x + 1;
                newY = this.y - 1;
                break;
            case PongBallDirections.RB:
                newX = this.x + 1;
                newY = this.y + 1;
                break;
        }
        return { x: newX, y: newY }
    }

    public changeBallXDirection() {
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

    public changeBallYDirection() {
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
}

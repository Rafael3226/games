import { PongBall } from "./PongBall";
import { PongBoard } from "./PongBoard";
import { PongEntities } from "./PongEntities";
import { PongPlayer } from "./PongPlayer";



export class Pong {
    constructor(
        public playerA: PongPlayer,
        public playerB: PongPlayer,
        private ball: PongBall,
        private board: PongBoard,
    ) {
        this.playerA.setIntialState(this.board.height)
        this.playerB.setIntialState(this.board.height)
        this.ball.setCoordinates(Math.floor(this.board.width / 2), Math.floor(this.board.height / 2))
        this.setEntitiesOnBoard();
    }

    public updateBallPosition() {
        const { x, y } = this.ball.getNextPosition();
        if (this.board.isPositionEmpty(x, y)) {
            this.ball.x = x
            this.ball.y = y
        } else if (this.board.isYInBoard(y)) {
            this.ball.changeBallXDirection()
            this.updateBallPosition()
        } else {
            this.ball.changeBallYDirection()
            this.updateBallPosition()
        }
    }

    public setEntitiesOnBoard() {
        this.board.clean()
        this.board.setEntitie(this.ball.x, this.ball.y, PongEntities.BALL)
        this.playerA.getYCoordinates().forEach(y => {
            this.board.setEntitie(0, y, PongEntities.PLAYER_1)
        });
        this.playerB.getYCoordinates().forEach(y => {
            this.board.setEntitie(this.board.width - 1, y, PongEntities.PLAYER_2)
        });
    }

    public getBoard() {
        return this.board.getBoard()
    }
}



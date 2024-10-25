import { PongEntities } from "./PongEntities";

const entityColorMap = {
    [PongEntities.EMPTY]: 'white',
    [PongEntities.BALL]: 'black',
    [PongEntities.PLAYER_1]: 'red',
    [PongEntities.PLAYER_2]: 'blue',
}

export class PongCanvas {
    constructor(private ctx: CanvasRenderingContext2D, private pixelDensity: number) { }

    public draw(board: PongEntities[][]) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                this.drawPixel(i, j, entityColorMap[board[i][j]])
            }
        }
    }

    private drawPixel(x: number, y: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.pixelDensity, y * this.pixelDensity, this.pixelDensity, this.pixelDensity);
    }
}
import { Pong } from './pong/Pong';
import { PongBall } from './pong/PongBall';
import { PongBoard } from './pong/PongBoard';
import { PongCanvas } from './pong/PongCanvas';
import { PongPlayer } from './pong/PongPlayer';
import './style.css'

export const PONG_BOARD_HEIGHT = 11
export const PONG_BOARD_WIDTH = 21
export const PIXEL_DENSITY = 30

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas" width="${PONG_BOARD_WIDTH * PIXEL_DENSITY}" height="${PONG_BOARD_HEIGHT * PIXEL_DENSITY}"></canvas>
`


const P1 = new PongPlayer()
const P2 = new PongPlayer()
const ball = new PongBall();
const board = new PongBoard(PONG_BOARD_WIDTH, PONG_BOARD_HEIGHT)
const pong = new Pong(P1, P2, ball, board,);


const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
if (canvas) {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const pongCanvas = new PongCanvas(ctx, PIXEL_DENSITY);
    pongCanvas.draw(pong.getBoard())
    document.addEventListener('keydown', function (event) {
      // Detect which key was pressed using event.code
      switch (event.code) {
        case 'KeyW':
          P1.moveUp()
          break;
        case 'KeyS':
          P1.moveDown()
          break;
        case 'ArrowUp':
          P2.moveUp()
          break;
        case 'ArrowDown':
          P2.moveDown()
          break;
        default:
          // Optional: Handle other keys if necessary
          console.log('Other Key Pressed:', event.code);
          break;
      }
      pong.setEntitiesOnBoard();
      pongCanvas.draw(pong.getBoard());
    });
    setInterval(() => {
      pong.updateBallPosition();
      pong.setEntitiesOnBoard();
      pongCanvas.draw(pong.getBoard());
    }, 50);
  }
}


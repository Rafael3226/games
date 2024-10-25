
export class GameLoop {
    private running: boolean = false;
    constructor() { }

    public start() {
        this.running = true;
    }

    public stop() {
        this.running = false;
    }
}
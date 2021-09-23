export class TicTacToe {
    constructor() {
        this.reset()
    }

    reset() {
        this.turn = "cross"
        this.states = [
            "", "", "",
            "", "", "",
            "", "", ""
        ]
    }

    changeState(cell_id) {
        this.states[cell_id] = this.turn
        return
    }

    changeTurn() {
        if (this.turn === "cross") {
            this.turn = "nought"
        } else {
            this.turn = "cross"
        }
        return
    }

    get isCrossTurn() {
        if (this.turn === "cross") {
            return true
        } else {
            return false
        }
    }

    get availableMoves() {
        return this.states.reduce((results, state, index) => {
            if (!state) {
                // console.log(state)
                results.push(index)
            }
            return results
        }, [])
    }

    get winner() {
        const board_lines = [
            // horizontally
            [this.states[0], this.states[1], this.states[2]],
            [this.states[3], this.states[4], this.states[5]],
            [this.states[6], this.states[7], this.states[8]],
            
            // vertically
            [this.states[0], this.states[3], this.states[6]],
            [this.states[1], this.states[4], this.states[7]],
            [this.states[2], this.states[5], this.states[8]],
            
            //diagonally
            [this.states[0], this.states[4], this.states[8]],
            [this.states[2], this.states[4], this.states[6]]
        ]

        // console.log(board_lines)

        for (let i = 0; i < board_lines.length; i++) {
            if (board_lines[i].every(state => state === "cross")) {
                return "cross"
            } else if (board_lines[i].every(state => state === "nought")) {
                return "nought"
            }
        }

        return
    }
}

export class CPU {
    constructor() {}
    score(game) {
        if (game.winner === "cross") {
            return 10
        } else if (game.winner === "nought") {
            return -10
        } else {
            return 0
        }
    }

    minimax(game) {
        if (game.winner === "cross" || game.winner === "nought") {
            return this.score(game)
        }

        scores = [];
        moves = [];
    }
}

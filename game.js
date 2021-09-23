export class TicTacToe {
    constructor() {
        this.reset()
    }

    reset() {
        this.states = [
            "", "", "",
            "", "", "",
            "", "", ""
        ]
        this.over = false
        this.winner = ""
    }
    
    changeState(cell_id) {
        this.states[cell_id] = this.active_turn

        // do not judge on turn 1-4
        if (this.available_moves.length > 4) {
            return
        }

        // judge
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
                this.over = true
                this.winner = "cross"
            } else if (board_lines[i].every(state => state === "nought")) {
                this.over = true
                this.winner = "nought"
            }
        }
    
        if (this.over === false && this.available_moves.toString() === [].toString()) {
            console.log("draw")
            this.over = true
        }
        return
    }

    get active_turn() {
        const crosses_count = this.states.filter(state => state === "cross").length
        const noughts_count = this.states.filter(state => state === "nought").length
        if (crosses_count === noughts_count) {
            return "cross"
        } else {
            return "nought"
        }
    }

    get available_moves() {
        return this.states.reduce((results, state, index) => {
            // console.log(state)
            if (!state) {
                results.push(index)
            }
            return results
        }, [])
    }
}

export class CPU {
    constructor() {
        let choice = 0
    }

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
        if (game.over) {
            return this.score(game)
        }

        const scores = [];
        const moves = [];

        for (const move of game.available_moves) {
            const possible_game = new TicTacToe
            possible_game.changeState(move)
            scores.push(this.minimax(possible_game))
            moves.push(move)
        }

        if (game.active_turn === "cross") {
            // max calculation
            const max_score = Math.max(...scores)
            const max_score_index = scores.findIndex(score => score === max_score)
            choice = moves[max_score_index];
            return max_score
        } else {
            // min calculation
            const min_score = Math.min(...scores)
            const min_score_index = scores.findIndex(score => score === min_score)
            choice = moves[min_score_index];
            return min_score
        }
    }
}

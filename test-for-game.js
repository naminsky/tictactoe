import { TicTacToe, Player } from "./game.js" // MJS
import process from 'process'         // CJS
import path from 'path'

const filepath = process.argv[1];
const cmdopt = process.argv.slice(2)
let verbose = false

if (cmdopt.includes("-h") || cmdopt.includes("--help")) {
    console.log(`Usage: node ${path.basename(filepath)} [ -h | --help ] [ -v | --verbose ]`)
    process.exit()
} else if (cmdopt.includes("-v") || cmdopt.includes("--verbose")) {
    verbose = true
}


const printTest = (title, output, expected) => {
    let result = false
    if (Array.isArray(expected)) {
        result = (output.toString() === expected.toString())
    } else {
        result = (output === expected)
    }

    if (verbose) {
        console.log(`[${title}]`)
        console.log(`test result   : ${result}`)
        console.log(`real value    : ${output}`)
        console.log(`expected value: ${expected}`)
    }

    return result
}

const gameTest = (game,
                  ex_over,
                  ex_active_turn,
                  ex_states,
                  ex_available_moves,
                  ex_winner
) => {
    const results = [];

    if (verbose) { console.log("----- gameTest -----") }

    results.push(printTest("game.over", game.over, ex_over))
    results.push(printTest("game.active_turn", game.active_turn, ex_active_turn))
    results.push(printTest("game.states", game.states, ex_states))
    results.push(printTest("game.available_moves", game.available_moves, ex_available_moves))
    results.push(printTest("game.winner", game.winner, ex_winner))

    console.log(`results: ${results.filter(bool => bool).length} / ${results.length} (pass / total)`)
    console.log("")

    return results
}

const playerTest = (game,
                    player,
                    ex_score,
                    ex_minimax,
                    ex_choice
) => {
    const results = [];

    if (verbose) { console.log("---- playerTest ----") }

    results.push(printTest("player.score", player.score(game), ex_score))
    results.push(printTest("player.minimax", player.minimax(game), ex_minimax))
    results.push(printTest("player.choice", player.choice, ex_choice))

    console.log(`results: ${results.filter(bool => bool).length} / ${results.length} (pass / total)`)
    console.log("")

    return results
}

const doMoves = (game, ...moves) => {
    for (const move of moves) {
        game.changeState(move)
    }
    return
}

let results = [];

console.log("### case 1: initial status of game_1 ###")
const game_1 = new TicTacToe
const player_1 = new Player
results.push(gameTest(game_1,
                      false,
                      "cross",
                      ["", "", "", "", "", "", "", "", ""],
                      [0, 1, 2, 3, 4, 5, 6, 7, 8],
                      ""
))
results.push(playerTest(game_1, player_1, 0, 0, 0))


console.log("### case 2: move cross on game_1 ###")
doMoves(game_1, 0)
results.push(gameTest(game_1,
                      false,
                      "nought",
                      ["cross", "", "", "", "", "", "", "", ""],
                      [1, 2, 3, 4, 5, 6, 7, 8],
                      ""
))
results.push(playerTest(game_1, player_1, 0, 0, 4))


console.log("### case 3: move nought on game_1 ###")
doMoves(game_1, 4)
results.push(gameTest(game_1,
                      false,
                      "cross",
                      ["cross", "", "", "", "nought", "", "", "", ""],
                      [1, 2, 3, 5, 6, 7, 8],
                      ""
))
results.push(playerTest(game_1, player_1, 0, 0, 1))


console.log("### case 4: cross player wins in game_1 ###")
doMoves(game_1, 2, 3, 1)
results.push(gameTest(game_1,
                      true,
                      "nought",
                      ["cross", "cross", "cross", "nought", "nought", "", "", "", ""],
                      [5, 6, 7, 8],
                      "cross"
))
results.push(playerTest(game_1, player_1, 10, 10, 1))


console.log("### case 5: nought player wins in game_2 ###")
const game_2 = new TicTacToe
const player_2 = new Player
doMoves(game_2, 0, 1, 2, 4, 6, 7)
results.push(gameTest(game_2,
                      true,
                      "cross",
                      ["cross", "nought", "cross", "", "nought", "", "cross", "nought", ""],
                      [3, 5, 8],
                      "nought"
))
results.push(playerTest(game_2, player_2, -10, -10, 0))


console.log("### case 6: draw in game_3 ###")
const game_3 = new TicTacToe
const player_3 = new Player
doMoves(game_3, 0, 1, 2, 4, 3, 5, 7, 6, 8)
results.push(gameTest(game_3,
                      true,
                      "nought",
                      ["cross", "nought", "cross", "cross", "nought", "nought", "nought", "cross", "cross"],
                      [],
                      ""
))
results.push(playerTest(game_3, player_3, 0, 0, 0))


console.log("### case 7: computer player choice in game_4 ###")
const game_4 = new TicTacToe
const player_4 = new Player
doMoves(game_4, 2, 0, 3, 7, 6, 8)
results.push(gameTest(game_4,
                      false,
                      "cross",
                      ["nought", "", "cross", "cross", "", "", "cross", "nought", "nought"],
                      [1, 4, 5],
                      ""
))
results.push(playerTest(game_4, player_4, 0, 10, 4))


console.log("### case 8: computer player choice in game_5 ###")
const game_5 = new TicTacToe
const player_5 = new Player
doMoves(game_5, 1, 7, 8, 6, 5)
results.push(gameTest(game_5,
                      false,
                      "nought",
                      ["", "cross", "", "", "", "cross", "nought", "nought", "cross"],
                      [0, 2, 3, 4],
                      ""
))
results.push(playerTest(game_5, player_5, 0, 10, 0))


const tmp = results.flat()
const pass = tmp.filter(bool => bool === true)

console.log(`all results: ${pass.length} / ${tmp.length} (pass / total)`)

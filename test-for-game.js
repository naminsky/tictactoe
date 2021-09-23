import { TicTacToe } from "./game.js"

const printTest = (output, expected) => {
    let result = false
    if (Array.isArray(expected)) {
        result = (output.toString() === expected.toString())
    } else {
        result = (output === expected)
    }

    console.log(`test result   : ${result}`)
    console.log(`real value    : ${output}`)
    console.log(`expected value: ${expected}`)

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

        console.log("--------------------")

        console.log("[.over]")
        results.push(printTest(game.over, ex_over))
        
        console.log("[.active_turn()]")
        results.push(printTest(game.active_turn, ex_active_turn))

        console.log("[.states]")
        results.push(printTest(game.states, ex_states))

        console.log("[.available_moves()]")
        results.push(printTest(game.available_moves, ex_available_moves))

        console.log("[.winner]")
        results.push(printTest(game.winner, ex_winner))

        console.log("--------------------")
        
        return results
    }

let results = [];

console.log("###game_1: initial status###")
const game_1 = new TicTacToe
results.push(gameTest(game_1,
                      false,
                      "cross",
                      ["", "", "", "", "", "", "", "", ""],
                      [0, 1, 2, 3, 4, 5, 6, 7, 8],
                      ""
    ))
console.log("")

console.log("###game_1: turn 1###")
game_1.changeState(0)
results.push(gameTest(game_1,
                      false,
                      "nought",
                      ["cross", "", "", "", "", "", "", "", ""],
                      [1, 2, 3, 4, 5, 6, 7, 8],
                      ""
    ))
console.log("")

console.log("###game_1: turn 2###")
game_1.changeState(4)
results.push(gameTest(game_1,
                      false,
                      "cross",
                      ["cross", "", "", "", "nought", "", "", "", ""],
                      [1, 2, 3, 5, 6, 7, 8],
                      ""
    ))
console.log("")

console.log("###game_1: cross player win###")
game_1.changeState(2)
game_1.changeState(3)
game_1.changeState(1)
results.push(gameTest(game_1,
                      true,
                      "nought",
                      ["cross", "cross", "cross", "nought", "nought", "", "", "", ""],
                      [5, 6, 7, 8],
                      "cross"
    ))
console.log("")

console.log("###game_2: initial status###")
const game_2 = new TicTacToe
results.push(gameTest(game_2,
                      false,
                      "cross",
                      ["", "", "", "", "", "", "", "", ""],
                      [0, 1, 2, 3, 4, 5, 6, 7, 8],
                      ""
    ))
console.log("")

console.log("###game_2: nought player win###")
game_2.changeState(0)
game_2.changeState(1)
game_2.changeState(2)
game_2.changeState(4)
game_2.changeState(6)
game_2.changeState(7)
results.push(gameTest(game_2,
    true,
    "cross",
    ["cross", "nought", "cross", "", "nought", "", "cross", "nought", ""],
    [3, 5, 8],
    "nought"
))
console.log("")

console.log("###game_3: initial status###")
const game_3 = new TicTacToe
results.push(gameTest(game_3,
                      false,
                      "cross",
                      ["", "", "", "", "", "", "", "", ""],
                      [0, 1, 2, 3, 4, 5, 6, 7, 8],
                      ""
    ))
console.log("")

console.log("###game_3: nought player win###")
game_3.changeState(0)
game_3.changeState(1)
game_3.changeState(2)
game_3.changeState(4)
game_3.changeState(6)
game_3.changeState(7)
results.push(gameTest(game_3,
    true,
    "cross",
    ["cross", "nought", "cross", "", "nought", "", "cross", "nought", ""],
    [3, 5, 8],
    "nought"
))
console.log("")

console.log("###game_4: initial status###")
const game_4 = new TicTacToe
results.push(gameTest(game_4,
                      false,
                      "cross",
                      ["", "", "", "", "", "", "", "", ""],
                      [0, 1, 2, 3, 4, 5, 6, 7, 8],
                      ""
    ))
console.log("")

console.log("###game_4: nought player win###")
game_4.changeState(0)
game_4.changeState(1)
game_4.changeState(2)
game_4.changeState(4)
game_4.changeState(3)
game_4.changeState(5)
game_4.changeState(7)
game_4.changeState(6)
game_4.changeState(8)
results.push(gameTest(game_4,
    true,
    "nought",
    ["cross", "nought", "cross", "cross", "nought", "nought", "nought", "cross", "cross"],
    [],
    ""
))
console.log("")

const tmp = results.flat()
const pass = tmp.filter(bool => bool === true)

console.log(`results: ${pass.length} / ${tmp.length} (pass / total)`)

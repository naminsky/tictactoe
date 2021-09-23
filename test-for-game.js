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
                  ex_turn,
                  ex_states,
                  ex_isCrossTurn,
                  ex_availableMoves,
                  ex_winner
    ) => {
        console.log("--------------------")

        console.log("[.turn]")
        printTest(game.turn, ex_turn)

        console.log("[.states]")
        printTest(game.states, ex_states)
        
        console.log("[.isCrossTurn()]")
        printTest(game.isCrossTurn, ex_isCrossTurn)

        console.log("[.availableMoves()]")
        printTest(game.availableMoves, ex_availableMoves)

        console.log("[.winner()]")
        printTest(game.winner, ex_winner)

        console.log("--------------------")
        
        return
    }

const game = new TicTacToe

console.log("###initial status###")
gameTest(game,
         "cross",
         ["", "", "", "", "", "", "", "", ""],
         true,
         [0, 1, 2, 3, 4, 5, 6, 7, 8],
         undefined
        )
console.log("")

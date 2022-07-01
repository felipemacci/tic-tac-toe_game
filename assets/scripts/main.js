const overlay = document.querySelector('.overlay')
const playButton = document.querySelector('.overlay button')
const boardCell = document.querySelectorAll('.board__cell')
let currentPlayer

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const setMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

const verifyWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return boardCell[index].classList.contains(currentPlayer)
        })
    })
}

const verifyDraw = () => {
    return [...boardCell].every((cell) => {
        return cell.classList.contains('x') || cell.classList.contains('o')
    })
}

const changeTurn = () => {
    currentPlayer = currentPlayer == 'x' ? 'o' : 'x'
}

const handleClick = (e) => {
    const cell = e.target

    const classToAdd = currentPlayer == 'x' ? 'x' : 'o'

    // Setar símbolo
    setMark(cell, classToAdd)

    // Verificar empate
    let draw = verifyDraw()

    if(draw) endGame(currentPlayer, 'draw')

    // Verificar vitória
    let win = verifyWin(currentPlayer)

    if(win) endGame(currentPlayer, 'win')

    // Mudar vez
    changeTurn()
}

const startGame = () => {
    currentPlayer = 'x'

    for(const cell of boardCell) {
        cell.classList.remove('x')

        cell.classList.remove('o')

        cell.removeEventListener('click', handleClick)

        cell.addEventListener('click', handleClick, { once: true })
    }

    // Remover tela inicial
    overlay.style.display = 'none'
}

const endGame = (currentPlayer, endType) => {
    const subtitle = document.querySelector('.overlay h2')

    endType == 'win' ? endType = { subtitle: `${currentPlayer.toUpperCase()} Won!` } : endType = { subtitle: 'Draw!' }

    subtitle.textContent = endType.subtitle
    playButton.textContent = 'Play Again'
    playButton.style.background = 'rgb(86, 83, 250)'

    // Adicionar tela inicial
    overlay.style.display = 'block'
}
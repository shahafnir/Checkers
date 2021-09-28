var isGameInProgress = false
var isWhiteMove
function startNewGame() {
    makeBlankBoard()
    createCellsIdList()
    setNewBoard()
    isWhiteMove = false
    insertRequestDraw()
    isGameInProgress = true
    isMoveComplete = true
    setBoardToCurrentPlayer()
}

function makeBlankBoard() {
    if (isGameInProgress) {
        var cellAttributes = [
            'class',
            'href',
            'onclick',
            'ondrop',
            'ondragover',
            'draggable',
            'ondragstart',
        ]
        for (
            var cellsIdListIndex = 0;
            cellsIdListIndex < cellsIdList.length;
            cellsIdListIndex++
        ) {
            for (
                var attributesIndex = 0;
                attributesIndex < cellAttributes.length;
                attributesIndex++
            ) {
                if (
                    document
                        .getElementById(cellsIdList[cellsIdListIndex])
                        .hasAttribute(cellAttributes[attributesIndex])
                ) {
                    document
                        .getElementById(cellsIdList[cellsIdListIndex])
                        .removeAttribute(cellAttributes[attributesIndex])
                }
            }
        }
    }
}

var cellId
function CheckersCell(cellId) {
    this.id = cellId
    this.classAttribute = document.getElementById(cellId).getAttribute('class')
    this.onclickAttribute = document
        .getElementById(cellId)
        .getAttribute('onclick')
    this.rowNumber = Number(cellId.slice(4, 5))
    this.columnNumber = Number(cellId.slice(5, cellId.length))
}

CheckersCell.prototype = {
    constructor: CheckersCell,

    isVacant: function () {
        if (this.classAttribute.includes('vacant')) {
            return true
        }
        return false
    },

    vacateCell: function () {
        this.setClass('vacant')
    },

    putWhitePiece: function () {
        this.setClass('piece white-piece')
    },

    putBlackPiece: function () {
        this.setClass('piece black-piece')
    },

    putDynamicRing: function () {
        if (!this.classAttribute.includes('dynamic')) {
            this.addClass('dynamic')
        }
    },

    removeDynamicRing: function () {
        this.removeClassName('dynamic')
    },

    setClass: function (className) {
        document.getElementById(this.id).setAttribute('class', className.trim())
    },

    addClass: function (newClassAttribute) {
        var currentClassAttribute = this.classAttribute
        this.setClass(currentClassAttribute.trim() + ' ' + newClassAttribute)
    },

    removeClassName: function (classToRemove) {
        var currentClassAttribute = this.classAttribute.trim()
        var newClassAttribute = currentClassAttribute.replace(classToRemove, '')
        this.setClass(newClassAttribute)
    },

    setHref: function () {
        document
            .getElementById(this.id)
            .setAttribute('href', 'JavaScript:void(0)')
    },

    removeHref: function () {
        document.getElementById(this.id).removeAttribute('href')
    },

    setOnclick: function (functionName) {
        document.getElementById(this.id).setAttribute('onclick', functionName)
    },

    removeOnclick: function (functionName) {
        document.getElementById(this.id).removeAttribute('onclick')
    },

    getOneRowUp: function () {
        return this.rowNumber - 1
    },

    getOneRowDown: function () {
        return this.rowNumber + 1
    },

    getOneColumnLeft: function () {
        return this.columnNumber - 1
    },

    getOneColumnRight: function () {
        return this.columnNumber + 1
    },

    isHiLightedCell: function () {
        if (targetCell.classAttribute.includes('gold-ring')) {
            return true
        } else {
            return false
        }
    },

    makeDraggable: function () {
        document.getElementById(this.id).setAttribute('draggable', 'true')
        document
            .getElementById(this.id)
            .setAttribute('ondragstart', 'drag(event, id)')
    },

    makeNonDraggable: function () {
        if (document.getElementById(this.id).hasAttribute('draggable')) {
            document.getElementById(this.id).removeAttribute('draggable')
        }
        if (document.getElementById(this.id).hasAttribute('ondragstart')) {
            document.getElementById(this.id).removeAttribute('ondragstart')
        }
    },

    setOnDragOver: function () {
        document
            .getElementById(this.id)
            .setAttribute('ondrop', 'drop(event, id)')
        document
            .getElementById(this.id)
            .setAttribute('ondragover', 'allowDrop(event)')
    },

    removeOnDragOver: function () {
        if (document.getElementById(this.id).hasAttribute('ondrop')) {
            document.getElementById(this.id).removeAttribute('ondrop')
        }
        if (document.getElementById(this.id).hasAttribute('ondragover')) {
            document.getElementById(this.id).removeAttribute('ondragover')
        }
    },
}

function CheckersPiece(rowNumber, columnNumber) {
    this.rowNumber = rowNumber
    this.columnNumber = columnNumber
}

CheckersPiece.prototype = {
    constructor: CheckersPiece,
    isWhite: function () {
        if (
            new CheckersCell(
                'cell' + this.rowNumber + '' + this.columnNumber
            ).classAttribute.includes('white')
        ) {
            return true
        }
        return false
    },

    isBlack: function () {
        if (
            new CheckersCell(
                'cell' + this.rowNumber + '' + this.columnNumber
            ).classAttribute.includes('black')
        ) {
            return true
        }
        return false
    },

    isKing: function () {
        if (
            new CheckersCell(
                'cell' + this.rowNumber + '' + this.columnNumber
            ).classAttribute.includes('king')
        ) {
            return true
        }
        return false
    },
}

var targetCell
function setTargetCell(cellId) {
    targetCell = new CheckersCell(cellId)
}

var selectedCell
function setSelectedCell(cellId) {
    selectedCell = new CheckersCell(cellId)
}

var cellsIdList = []
function createCellsIdList() {
    for (var rowNumber = 1; rowNumber <= 8; rowNumber++) {
        for (var columnNumber = 1; columnNumber <= 8; columnNumber++) {
            if (
                (rowNumber % 2 !== 0 && columnNumber % 2 === 0) ||
                (rowNumber % 2 === 0 && columnNumber % 2 !== 0)
            ) {
                cellId = 'cell' + rowNumber + '' + columnNumber
                cellsIdList.push(cellId)
            }
        }
    }
}

function setNewBoard() {
    for (
        var cellsIdListIndex = 0;
        cellsIdListIndex < cellsIdList.length;
        cellsIdListIndex++
    ) {
        setTargetCell(cellsIdList[cellsIdListIndex])
        targetCell.vacateCell()
        if (targetCell.rowNumber <= 3) {
            targetCell.putBlackPiece()
        } else if (targetCell.rowNumber >= 6) {
            targetCell.putWhitePiece()
        }
    }
}

function putMessage(message) {
    removeMessage('message-box')
    var newMessage = document.createTextNode(message)
    parentTag.appendChild(newMessage)
}

var parentTag
function removeMessage(elementId) {
    parentTag = document.getElementById(elementId)
    var messageToRemove = parentTag.childNodes[0]
    parentTag.removeChild(messageToRemove)
}

function restrictMovesToCurrentPlayer() {
    setIsPossibleCapturerFound()
    for (
        var cellsIdListIndex = 0;
        cellsIdListIndex < cellsIdList.length;
        cellsIdListIndex++
    ) {
        setTargetCell(cellsIdList[cellsIdListIndex])
        if (!targetCell.isVacant()) {
            if (
                (isWhiteMove &&
                    new CheckersPiece(
                        targetCell.rowNumber,
                        targetCell.columnNumber
                    ).isWhite()) ||
                (!isWhiteMove &&
                    new CheckersPiece(
                        targetCell.rowNumber,
                        targetCell.columnNumber
                    ).isBlack())
            ) {
                if (
                    (isPossibleCapturerFound &&
                        targetCell.classAttribute.includes(
                            'possible_capturer'
                        )) ||
                    (!isPossibleCapturerFound &&
                        getIsInVerifiedMovesList(targetCell.id))
                ) {
                    enableLegalMoves(targetCell)
                }
            } else {
                disableLegalMoves(targetCell)
            }
        }
    }
}

function getIsInVerifiedMovesList(cellId) {
    for (
        var cellIdsIndex = 0;
        cellIdsIndex < VerifiedMovesCellIds.length;
        cellIdsIndex++
    ) {
        if (VerifiedMovesCellIds[cellIdsIndex] === cellId) {
            return true
        }
    }
    return false
}

var isPossibleCapturerFound
function setIsPossibleCapturerFound() {
    isPossibleCapturerFound = false
    for (
        var cellsIdListIndex = 0;
        cellsIdListIndex < cellsIdList.length;
        cellsIdListIndex++
    ) {
        cellToCheck = new CheckersCell(cellsIdList[cellsIdListIndex])
        if (cellToCheck.classAttribute.includes('possible_capturer')) {
            isPossibleCapturerFound = true
        }
    }
}

function enableLegalMoves(checkersCell) {
    checkersCell.setOnclick('showLegalMoves(id);')
    checkersCell.putDynamicRing()
    checkersCell.setHref()
    checkersCell.makeDraggable()
}

function disableLegalMoves(checkersCell) {
    checkersCell.removeOnclick()
    checkersCell.removeDynamicRing()
    checkersCell.removeHref()
    checkersCell.makeNonDraggable()
}

function disableLegalMovesAllBoard() {
    for (
        var cellsIdListIndex = 0;
        cellsIdListIndex < cellsIdList.length;
        cellsIdListIndex++
    ) {
        disableLegalMoves(new CheckersCell(cellsIdList[cellsIdListIndex]))
    }
}

function showLegalMoves(cellId) {
    removeCellsHiLight()
    targetCellsIdList = []
    VerifiedMovesCellIds = []
    locateTargets(cellId)
    hiLightTargetCells()
}

function removeCellsHiLight() {
    for (
        var cellsIdListIndex = 0;
        cellsIdListIndex < cellsIdList.length;
        cellsIdListIndex++
    ) {
        setTargetCell(cellsIdList[cellsIdListIndex])
        if (targetCell.isHiLightedCell()) {
            targetCell.removeClassName('gold-ring')
            if (targetCell.isVacant()) {
                targetCell.removeOnclick()
            }
        }
        targetCell.removeOnDragOver()
    }
}

function setTarget(isForCapture, rowNumber, columnNumber) {
    if (isForCapture) {
        setPieceCaptureIfAvailable(rowNumber, columnNumber)
        if (isPieceCaptureAvailable && targetCell.isVacant()) {
            addToTargetsList(targetCell.id)
            setPossibleCapturer(selectedCell.id)
        }
    } else {
        setTargetCellIfLocationValid(rowNumber, columnNumber)
        if (isTargetCellLocationValid && targetCell.isVacant()) {
            addToTargetsList(targetCell.id)
            addToVerifiedMovesCellIds(selectedCell.id)
        }
    }
}

function locateTargets(cellId) {
    setSelectedCell(cellId)
    isTargetSet = false
    setLocationsToCheck(selectedCell)
    if (
        !new CheckersPiece(
            selectedCell.rowNumber,
            selectedCell.columnNumber
        ).isKing()
    ) {
        for (
            columnNumbersIndex = 0;
            columnNumbersIndex < 2;
            columnNumbersIndex++
        ) {
            setLocationsToCheck(selectedCell)
            setTarget(
                true,
                rowNumberToCheck,
                columnNumbersToCheck[columnNumbersIndex]
            )
        }
        if (!isTargetSet) {
            for (
                columnNumbersIndex = 0;
                columnNumbersIndex < 2;
                columnNumbersIndex++
            ) {
                setLocationsToCheck(selectedCell)
                setTarget(
                    false,
                    rowNumberToCheck,
                    columnNumbersToCheck[columnNumbersIndex]
                )
            }
        }
    } else {
        for (
            rowNumbersIndex = 0, columnNumbersIndex = 0;
            rowNumbersIndex < 4 && columnNumbersIndex < 4;
            rowNumbersIndex++, columnNumbersIndex++
        ) {
            setLocationsToCheck(selectedCell)
            setTarget(
                true,
                rowNumbersToCheck[rowNumbersIndex],
                columnNumbersToCheck[columnNumbersIndex]
            )
        }
        if (!isTargetSet) {
            for (
                rowNumbersIndex = 0, columnNumbersIndex = 0;
                rowNumbersIndex < 4 && columnNumbersIndex < 4;
                rowNumbersIndex++, columnNumbersIndex++
            ) {
                setTarget(
                    false,
                    rowNumbersToCheck[rowNumbersIndex],
                    columnNumbersToCheck[columnNumbersIndex]
                )
            }
        }
    }
}

var columnNumbersToCheck = [],
    columnNumbersIndex,
    rowNumberToCheck,
    rowNumbersToCheck = [],
    rowNumbersIndex
function setLocationsToCheck(checkersCell) {
    if (
        !new CheckersPiece(
            checkersCell.rowNumber,
            checkersCell.columnNumber
        ).isKing()
    ) {
        rowNumberToCheck = isWhiteMove
            ? checkersCell.getOneRowUp()
            : checkersCell.getOneRowDown()
        columnNumbersToCheck = [
            checkersCell.getOneColumnLeft(),
            checkersCell.getOneColumnRight(),
        ]
    } else {
        rowNumbersToCheck = [
            checkersCell.getOneRowUp(),
            checkersCell.getOneRowUp(),
            checkersCell.getOneRowDown(),
            checkersCell.getOneRowDown(),
        ]
        columnNumbersToCheck = [
            checkersCell.getOneColumnLeft(),
            checkersCell.getOneColumnRight(),
            checkersCell.getOneColumnRight(),
            checkersCell.getOneColumnLeft(),
        ]
    }
}

var isPieceCaptureAvailable
function setPieceCaptureIfAvailable(rowNumber, columnNumber) {
    isPieceCaptureAvailable = false
    setTargetCellIfLocationValid(rowNumber, columnNumber)
    if (isTargetCellLocationValid) {
        possibleCapture = new CheckersPiece(
            targetCell.rowNumber,
            targetCell.columnNumber
        )
        if (
            (isWhiteMove && possibleCapture.isBlack()) ||
            (!isWhiteMove && possibleCapture.isWhite())
        ) {
            possibleCaptureCellId = targetCell.id
            setTargetCellIfLocationValid(
                targetCell.rowNumber +
                    (targetCell.rowNumber - selectedCell.rowNumber),
                targetCell.columnNumber +
                    (targetCell.columnNumber - selectedCell.columnNumber)
            )
            if (isTargetCellLocationValid && targetCell.isVacant()) {
                isPieceCaptureAvailable = true
                addToPossibleCapturesCellIds(possibleCaptureCellId)
            }
        }
    }
}

function addToPossibleCapturesCellIds(cellId) {
    possibleCaptureContains = new CheckersCell(cellId)
    possibleCapture = new CheckersPiece(
        possibleCaptureContains.rowNumber,
        possibleCaptureContains.columnNumber
    )
    if (isWhiteMove ? possibleCapture.isBlack() : possibleCapture.isWhite()) {
        if (
            (selectedPiece.isWhite() && possibleCapture.isBlack()) ||
            (selectedPiece.isBlack() && possibleCapture.isWhite())
        ) {
            possibleCapturesCellIds.push(cellId)
        }
    }
}

var possibleCapturerContains
function setPossibleCapturer(cellId) {
    possibleCapturerContains = new CheckersCell(cellId)
    if (
        !possibleCapturerContains.classAttribute.includes('possible_capturer')
    ) {
        possibleCapturerContains.addClass('possible_capturer')
    }
}

function setTargetCellIfLocationValid(rowNumber, columnNumber) {
    if (getIsTargetCellLocationValid(rowNumber, columnNumber)) {
        setTargetLocationCellId(rowNumber, columnNumber)
        setTargetCell(targetLocationCellId)
    }
}

var isTargetCellLocationValid
function getIsTargetCellLocationValid(rowNumber, columnNumber) {
    if (
        rowNumber > 8 ||
        rowNumber < 1 ||
        columnNumber > 8 ||
        columnNumber < 1
    ) {
        isTargetCellLocationValid = false
    } else {
        isTargetCellLocationValid = true
    }
    return isTargetCellLocationValid
}

var targetLocationCellId
function setTargetLocationCellId(rowNumber, columnNumber) {
    targetLocationCellId = 'cell' + rowNumber + '' + columnNumber
}

var targetCellsIdList = []
var isTargetSet
function addToTargetsList(cellId) {
    targetCellsIdList.push(cellId)
    isTargetSet = true
}

var VerifiedMovesCellIds = []
function addToVerifiedMovesCellIds(cellId) {
    VerifiedMovesCellIds.push(cellId)
}

function hiLightTargetCells() {
    selectedCell.addClass('gold-ring')
    for (
        var targetCellsIdListIndex = 0;
        targetCellsIdListIndex < targetCellsIdList.length;
        targetCellsIdListIndex++
    ) {
        setTargetCell(targetCellsIdList[targetCellsIdListIndex])
        targetCell.addClass('gold-ring')
        targetCell.setOnclick('movePiece(id);')
        targetCell.setHref()
        targetCell.setOnDragOver()
    }
}

function movePiece(cellId) {
    setTargetCell(cellId)
    removeCapturedPiece()
    switchPiecesPositions()
    promotePiece()
    verifyMoveCompletion()
    initializeBoard()
}

var isPieceRemoved
function removeCapturedPiece() {
    isPieceRemoved = false
    if (getIsJumpMove()) {
        setPieceToRemove()
        setCellToEmpty()
        cellToEmpty.vacateCell()
        isPieceRemoved = true
    }
}

function getIsJumpMove() {
    if (
        targetCell.rowNumber === selectedCell.rowNumber + 2 ||
        targetCell.rowNumber === selectedCell.rowNumber - 2
    ) {
        return true
    }
    return false
}

var pieceToRemove
function setPieceToRemove() {
    rowNumber =
        targetCell.rowNumber > selectedCell.rowNumber
            ? selectedCell.rowNumber + 1
            : selectedCell.rowNumber - 1
    columnNumber =
        targetCell.columnNumber > selectedCell.columnNumber
            ? selectedCell.columnNumber + 1
            : selectedCell.columnNumber - 1
    pieceToRemove = new CheckersPiece(rowNumber, columnNumber)
}

var cellToEmpty
function setCellToEmpty() {
    setTargetLocationCellId(pieceToRemove.rowNumber, pieceToRemove.columnNumber)
    cellToEmpty = new CheckersCell(targetLocationCellId)
}

function switchPiecesPositions() {
    var targetCellClass = targetCell.classAttribute
    var selectedCellClass = selectedCell.classAttribute
    targetCell.setClass(selectedCellClass)
    selectedCell.setClass(targetCellClass)
    var targetCellOnclick = targetCell.onclickAttribute
    var selectedCellOnclick = selectedCell.onclickAttribute
    targetCell.setOnclick(selectedCellOnclick)
    selectedCell.setOnclick(targetCellOnclick)
}

var isPromotionMade
var promotedPieceContains
function promotePiece() {
    isPromotionMade = false
    if (
        (isWhiteMove && targetCell.rowNumber === 1) ||
        (!isWhiteMove && targetCell.rowNumber === 8)
    ) {
        makeKing(targetCell.id)
        isPromotionMade = true
        promotedPieceContains = new CheckersCell(targetCell.id)
    }
}

function makeKing(cellId) {
    cellToCheck = new CheckersCell(cellId)
    if (!cellToCheck.classAttribute.includes('king')) {
        cellToCheck.addClass('king')
    }
}

var capturerContainsCellId
var isMoveComplete
function verifyMoveCompletion() {
    isMoveComplete = true
    if (!isPromotionMade) {
        capturerContainsCellId = targetCell.id
        removePossibleCapturers()
        showPossibleCaptures()
        setSelectedCell(capturerContainsCellId)
        if (
            selectedCell.classAttribute.includes('possible_capturer') &&
            isPieceRemoved
        ) {
            isMoveComplete = false
        }
    }
}

function initializeBoard() {
    VerifiedMovesCellIds = []
    removeCellsHiLight()
    removePossibleCapturesShown()
    removePossibleCapturers()
    changeTurn()
    setBoardToCurrentPlayer()
}

function changeTurn() {
    if (isMoveComplete) {
        isWhiteMove = isWhiteMove ? false : true
    }
}

function setBoardToCurrentPlayer() {
    showPossibleCaptures()
    restrictMovesToCurrentPlayer()
    replaceCapturers()
    putMessage((isWhiteMove ? "WhitePlayer's" : "BlackPlayer's") + ' move')
    setGameStatus()
}

var possibleCapturesCellIds = []
function showPossibleCaptures() {
    for (
        var cellsIdListIndex = 0;
        cellsIdListIndex < cellsIdList.length;
        cellsIdListIndex++
    ) {
        setSelectedCell(cellsIdList[cellsIdListIndex])
        if (!selectedCell.isVacant()) {
            setSelectedPiece(selectedCell)
            if (
                isWhiteMove ? selectedPiece.isWhite() : selectedPiece.isBlack()
            ) {
                possibleCapturesCellIds = []
                locateTargets(selectedCell.id)
                for (
                    var possibleCapturesIndex = 0;
                    possibleCapturesIndex < possibleCapturesCellIds.length;
                    possibleCapturesIndex++
                ) {
                    possibleCaptureContains = new CheckersCell(
                        possibleCapturesCellIds[possibleCapturesIndex]
                    )
                    if (
                        !possibleCaptureContains.classAttribute.includes(
                            'possible-capture'
                        )
                    ) {
                        possibleCaptureContains.addClass('possible-capture')
                    }
                }
            }
        }
    }
}

function replaceCapturers() {
    if (!isMoveComplete) {
        removePossibleCapturers()
        setPossibleCapturer(capturerContainsCellId)
        disableLegalMovesAllBoard()
        showLegalMoves(capturerContainsCellId)
        enableLegalMoves(possibleCapturerContains)
    }
}

var selectedPiece
function setSelectedPiece(checkersCell) {
    if (!checkersCell.isVacant()) {
        selectedPiece = new CheckersPiece(
            checkersCell.rowNumber,
            checkersCell.columnNumber
        )
    }
}

function removePossibleCapturesShown() {
    for (
        var cellsIdListIndex = 0;
        cellsIdListIndex < cellsIdList.length;
        cellsIdListIndex++
    ) {
        cellToCheck = new CheckersCell(cellsIdList[cellsIdListIndex])
        if (cellToCheck.classAttribute.includes('possible-capture')) {
            cellToCheck.removeClassName('possible-capture')
        }
    }
}

function removePossibleCapturers() {
    for (
        var cellsIdListIndex = 0;
        cellsIdListIndex < cellsIdList.length;
        cellsIdListIndex++
    ) {
        cellToCheck = new CheckersCell(cellsIdList[cellsIdListIndex])
        if (cellToCheck.classAttribute.includes('possible_capturer')) {
            cellToCheck.removeClassName('possible_capturer')
        }
    }
}

function setGameStatus() {
    verifyRemainingPieces()
    verifyIfValidMovesLeft()
    if (getIsGameOver()) {
        endGame()
    }
}

function getIsGameOver() {
    if (isNoRemainingPieces || (!isValidMoveFound && !isNoRemainingPieces)) {
        return true
    }
    return false
}

var message
function addToFinalMessage(messageToAdd) {
    message = 'Game Over. '
    message += messageToAdd
}

var winnersName
var isNoRemainingPieces
function verifyRemainingPieces() {
    isNoRemainingPieces = false
    countRemainingPieces()
    if (whitePieces === 0 || blackPieces === 0) {
        isNoRemainingPieces = true
        winnersName = whitePieces === 0 ? 'BlackPlayer' : 'WhitePlayer'
        addToFinalMessage('The winner is: ' + winnersName)
    }
}

var whitePieces, blackPieces
function countRemainingPieces() {
    whitePieces = 0
    blackPieces = 0
    for (
        var cellsIdListIndex = 0;
        cellsIdListIndex < cellsIdList.length;
        cellsIdListIndex++
    ) {
        cellToCheck = new CheckersCell(cellsIdList[cellsIdListIndex])
        if (!cellToCheck.isVacant()) {
            new CheckersPiece(
                cellToCheck.rowNumber,
                cellToCheck.columnNumber
            ).isWhite()
                ? whitePieces++
                : blackPieces++
        }
    }
}

var isValidMoveFound
function verifyIfValidMovesLeft() {
    isValidMoveFound = false
    for (
        var cellsIdListIndex = 0;
        cellsIdListIndex < cellsIdList.length;
        cellsIdListIndex++
    ) {
        if (
            document
                .getElementById(cellsIdList[cellsIdListIndex])
                .hasAttribute('onclick')
        ) {
            if (
                document
                    .getElementById(cellsIdList[cellsIdListIndex])
                    .getAttribute('onclick')
                    .includes('showLegalMoves')
            ) {
                isValidMoveFound = true
                break
            }
        }
    }
    if (!isValidMoveFound && !isNoRemainingPieces) {
        addToFinalMessage('No valid moves left, the game ends with a draw.')
    }
}

function insertRequestDraw() {
    if (!document.getElementById('requestDraw').hasAttribute('class')) {
        var requestDraw = document.createTextNode('Request Draw')
        document
            .getElementById('requestDraw')
            .setAttribute('class', 'new-game request-draw')
        document
            .getElementById('requestDraw')
            .setAttribute('href', 'JavaScript:void(0)')
        document
            .getElementById('requestDraw')
            .setAttribute('onclick', 'requestDraw();')
        document.getElementById('requestDraw').appendChild(requestDraw)
    }
}

function requestDraw() {
    var question =
        (isWhiteMove ? 'WhitePlayer' : 'BlackPlayer') +
        ', Would you like to request a draw? type Yes or No.'
    var isDrawRequested = getAnswer(question) === 'yes' ? true : false
    if (isDrawRequested) {
        question =
            (isWhiteMove ? 'BlackPlayer' : 'WhitePlayer') +
            ', do you approve ' +
            (isWhiteMove ? 'WhitePlayer' : 'BlackPlayer') +
            "'s request?"
        var isDrawApproved = getAnswer(question) === 'yes' ? true : false
        if (isDrawApproved) {
            setDraw()
        }
    }
}

function getAnswer(question) {
    do {
        var answerToCheck = prompt(question, 'No')
    } while (answerToCheck === null)
    answerToCheck = answerToCheck.trim().toLowerCase()
    return answerToCheck
}

function setDraw() {
    addToFinalMessage('The game has ended by declaring draw.')
    removeCellsHiLight()
    endGame()
}

function endGame() {
    disableLegalMovesAllBoard()
    removeRequestDraw()
    putMessage(message)
}

function removeRequestDraw() {
    removeMessage('requestDraw')
    document.getElementById('requestDraw').removeAttribute('class')
    document.getElementById('requestDraw').removeAttribute('href')
    document.getElementById('requestDraw').removeAttribute('onclick')
}

function allowDrop(event) {
    event.preventDefault()
}

function drag(event, cellId) {
    //event.dataTransfer.setData("text/css", event.target.id);
    event.dataTransfer.setData('text', event.target.id)
    setSelectedCell(cellId)
    showLegalMoves(selectedCell.id)
}

function drop(event, cellId) {
    event.preventDefault()
    movePiece(cellId)
}

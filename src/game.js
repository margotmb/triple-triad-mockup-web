import React from "react";
import { useState } from 'react';
import player_data from "../src/resources/player_hand.json"

var count = 0;
var endPoint = 4;
//Componente Square -> Forma o tabuleiro, renderiza uma carta ou um espaço vazio
function Square({value, onSquareClick, cardColor}) {
  return (
      <button className="square" onClick={onSquareClick}><Card carta={value} cardColor={cardColor}/></button>
  );
}

//Componente Card -> Cartas na mão dos players
function Card({carta, onCardClick, cardColor = "tt-card", enemyCard = false}){

  if (carta!=null){
    if (enemyCard){
      return(
        <div className={cardColor}>
          <img src="https://i.imgur.com/7Scmweb.png"></img>  
        </div>
      )
    }else{
      return(
        <div className={cardColor} onClick={onCardClick}>
          <img src={carta.file_link}></img>
          <div className="up_value">{carta.values[0]}</div>
          <div className="right-value">{carta.values[1]}</div>
          <div className="bottom-value">{carta.values[2]}</div>
          <div className="left-value">{carta.values[3]}</div>
        </div>
      )
    }
    
  }
}

export default function Board() {
  //Define que o componente pai (board) vai guardar os valores dos squares em um array, inicializando com NULL
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [playerHand, setPlayerHand] = useState([player_data[0], player_data[1], player_data[2], player_data[3], player_data[4]]);
  
  const [enemyHand, setEnemyHand] = useState([player_data[0], player_data[1], player_data[2], player_data[3], player_data[4]]);
  const [cardColor, setCardColor] = useState(Array(9).fill("tt-card"));
  
  let carta_selecionada = null;
  let indice_carta_selecionada = 0;
  

  //Seta o valor dos quadrados
  function handleClick(i, j, new_value) {
    if (new_value != null){
      // Cria cópia do array squares
      const nextSquares = squares.slice();
      const nextPlayerHand = playerHand.slice();
      const nextCardColor = cardColor.slice()
      // Seta o novo valor na posição passada nos props
      if (nextSquares[i] == null){
        nextSquares[i] = new_value;
        nextPlayerHand[j] = null;
        nextCardColor[i] = "card-red"
        // Função avisa o Board que houve mudança e re-renderiza o tabuleiro
        setSquares(nextSquares);
        setPlayerHand(nextPlayerHand);
        setCardColor(nextCardColor);
        verify_board(i, nextSquares, nextCardColor, "card-red");
        setTimeout(botPlays, 500, nextSquares, nextCardColor);
      }

    }
  }

  function botPlays(next_squares, next_color){
    console.log(count);
    if (count < 4 ){
      let randNum = Math.floor(Math.random() * (8 - 0 + 0)) + 0;
      const nextSquares = next_squares;
      const nextCardColor = next_color;
      const nextEnemyHand = enemyHand.slice();
      while (nextSquares[randNum] != null){
        randNum = Math.floor(Math.random() * (8 - 0 + 0)) + 0;
      }

      nextSquares[randNum] = nextEnemyHand[count];
      nextEnemyHand[count] = null;
      nextCardColor[randNum] = "card-blue"
      count++;
      setSquares(nextSquares);
      setEnemyHand(nextEnemyHand);
      setCardColor(nextCardColor);
      verify_board(randNum, nextSquares, nextCardColor, "card-blue");
    }
  }
  function verify_board(indice_ultima_jogada, current_squares, current_colors, cardColor){

      switch (indice_ultima_jogada){
        case 0:
          //Grid:
          // X * -
          // * - -
          // - - -
          //Direita
          check_sides(current_squares, current_colors, cardColor, 0, 1, 1, 3);
          //Abaixo
          check_sides(current_squares, current_colors, cardColor, 0, 2, 3, 0);
          break;
        case 1:
          // GRID:
          // * X *
          // - * -
          // - - -
          // Esquerda
          check_sides(current_squares, current_colors, cardColor, 1, 3, 0, 1);
          // Abaixo
          check_sides(current_squares, current_colors, cardColor, 1, 2, 4, 0);
          // Direita
          check_sides(current_squares, current_colors, cardColor, 1, 1, 2, 3);
          break;
        case 2:
          // - * X
          // - - *
          // - - -
          // Esquerda
          check_sides(current_squares, current_colors, cardColor, 2, 3, 1, 1);
          // Abaixo
          check_sides(current_squares, current_colors, cardColor, 2, 2, 5, 0);
          break;
        case 3:
          // * - -
          // X * -
          // * - -
          // Acima
          check_sides(current_squares, current_colors, cardColor, 3, 0, 0, 2);
          // Direita
          check_sides(current_squares, current_colors, cardColor, 3, 1, 4, 3);
          // Abaixo
          check_sides(current_squares, current_colors, cardColor, 3, 2, 6, 0);
          break;
        case 4:
          // - * -
          // * X *
          // - * -
          // Acima
          check_sides(current_squares, current_colors, cardColor, 4, 0, 1, 2);
          // Direita
          check_sides(current_squares, current_colors, cardColor, 4, 1, 5, 3);
          // Abaixo
          check_sides(current_squares, current_colors, cardColor, 4, 2, 7, 0);
          // Esquerda
          check_sides(current_squares, current_colors, cardColor, 4, 3, 3, 1);
          break;
        case 5:
          // - - *
          // - * X
          // - - *
          // Acima
          check_sides(current_squares, current_colors, cardColor, 5, 0, 2, 2);
          // Abaixo
          check_sides(current_squares, current_colors, cardColor, 5, 2, 8, 0);
          // Esquerda
          check_sides(current_squares, current_colors, cardColor, 5, 3, 4, 1);
          break;
        case 6:
          // - - -
          // * - -
          // X * -
          // Acima
          check_sides(current_squares, current_colors, cardColor, 6, 0, 3, 2);
          // Direita
          check_sides(current_squares, current_colors, cardColor, 6, 1, 7, 3);
          break;
        case 7:
          // - - -
          // - * -
          // * X *
          // Acima
          check_sides(current_squares, current_colors, cardColor, 7, 0, 4, 2);
          // Direita
          check_sides(current_squares, current_colors, cardColor, 7, 1, 8, 3);
          // Esquerda
          check_sides(current_squares, current_colors, cardColor, 7, 3, 6, 1);
          break;
        case 8:
          // - - -
          // - - *
          // - * X
          // Acima
          check_sides(current_squares, current_colors, cardColor, 8, 0, 5, 2);
          // Esquerda
          check_sides(current_squares, current_colors, cardColor, 8, 3, 7, 1);
          break;
      }
  }
  //generalizar, target, atual, target, atual
  function check_sides(arraySquares, arrayColor, cardColor, pos1, val1 , pos2, val2){
    // Verifica se a posição a ser checada não está vazia
    // Em seguida, compara os números que estão encostando
    // Se a carta da posição jogada tiver numero maior, roda o código de trocar a cor
    if (arraySquares[pos2] != null && arraySquares[pos1].values[val1] > arraySquares[pos2].values[val2]){
      arrayColor[pos2] = cardColor;
      setCardColor(arrayColor);
    }

  }
  function handleCardClick(j, card){
    carta_selecionada = card;
    //posição é determinada 
    indice_carta_selecionada = j;
    console.log(carta_selecionada)
  }

  return (
    <React.Fragment>
      <div className="game">
        <div className="player-hand">
          <Card carta={playerHand[0]}  onCardClick={() => handleCardClick(0, playerHand[0])}/>
          <Card carta={playerHand[1]}  onCardClick={() => handleCardClick(1, playerHand[1])}/>
          <Card carta={playerHand[2]}  onCardClick={() => handleCardClick(2, playerHand[2])}/>
          <Card carta={playerHand[3]}  onCardClick={() => handleCardClick(3, playerHand[3])}/>
          <Card carta={playerHand[4]}  onCardClick={() => handleCardClick(4, playerHand[4])}/>
        </div>

        <div className="board">
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[0]}/>
            <Square value={squares[1]} onSquareClick={() => handleClick(1, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[1]}/>
            <Square value={squares[2]} onSquareClick={() => handleClick(2, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[2]}/>
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[3]}/>
            <Square value={squares[4]} onSquareClick={() => handleClick(4, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[4]}/>
            <Square value={squares[5]} onSquareClick={() => handleClick(5, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[5]}/>
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[6]}/>
            <Square value={squares[7]} onSquareClick={() => handleClick(7, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[7]}/>
            <Square value={squares[8]} onSquareClick={() => handleClick(8, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[8]}/>
          </div>
        </div>
        <div className="enemy-hand">
          <Card carta={enemyHand[0]} enemyCard={true}/>
          <Card carta={enemyHand[1]} enemyCard={true}/>
          <Card carta={enemyHand[2]} enemyCard={true}/>
          <Card carta={enemyHand[3]} enemyCard={true}/>
          <Card carta={enemyHand[4]} enemyCard={true}/>
        </div>
      </div>
    </React.Fragment>
  );
}

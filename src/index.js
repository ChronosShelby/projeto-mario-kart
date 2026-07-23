import {
  Mario,
  Luigi,
  Peach,
  Bowser,
  Yoshi,
  DonkeyKong,
} from "./characters.js";

const player1 = Mario;
const player2 = Luigi;

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`,
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    0;
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.Velocidade;
      totalTestSkill2 = diceResult2 + character2.Velocidade;

      await logRollResult(
        character1.Nome,
        "Velocidade",
        diceResult1,
        character1.Velocidade,
      );

      await logRollResult(
        character2.Nome,
        "Velocidade",
        diceResult2,
        character2.Velocidade,
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.Manobrabilidade;
      totalTestSkill2 = diceResult2 + character2.Manobrabilidade;

      await logRollResult(
        character1.Nome,
        "Manobrabilidade",
        diceResult1,
        character1.Manobrabilidade,
      );

      await logRollResult(
        character2.Nome,
        "Manobrabilidade",
        diceResult2,
        character2.Manobrabilidade,
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.Poder;
      let powerResult2 = diceResult2 + character2.Poder;

      console.log(`${character1.Nome} confrontou com ${character2.Nome}! 🥊`);

      await logRollResult(
        character1.Nome,
        "Poder",
        diceResult1,
        character1.Poder,
      );

      await logRollResult(
        character2.Nome,
        "Poder",
        diceResult2,
        character2.Poder,
      );

      // Sorteia o item
      const item =
        Math.random() < 0.5
          ? { nome: "🐢 Casco", dano: 1 }
          : { nome: "💣 Bomba", dano: 2 };

      if (powerResult1 > powerResult2) {
        console.log(
          `${character1.Nome} venceu o confronto usando ${item.nome}!`,
        );

        // Perdedor perde pontos
        character2.Pontos = Math.max(0, character2.Pontos - item.dano);
        console.log(`${character2.Nome} perdeu ${item.dano} ponto(s)! 💫`);

        // Vencedor ganha turbo
        character1.Pontos++;
        console.log(`${character1.Nome} pegou um 🚀 Turbo e ganhou +1 ponto!`);
      } else if (powerResult2 > powerResult1) {
        console.log(
          `${character2.Nome} venceu o confronto usando ${item.nome}!`,
        );

        // Perdedor perde pontos
        character1.Pontos = Math.max(0, character1.Pontos - item.dano);
        console.log(`${character1.Nome} perdeu ${item.dano} ponto(s)! 💫`);

        // Vencedor ganha turbo
        character2.Pontos++;
        console.log(`${character2.Nome} pegou um 🚀 Turbo e ganhou +1 ponto!`);
      }

      // Caso de empate no confronto
      else {
        console.log("Confronto empatado! Nenhum ponto foi perdido ou ganho.");
      }
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.Nome} marcou um ponto!`);
      character1.Pontos++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.Nome} marcou um ponto!`);
      character2.Pontos++;
    }

    console.log("-----------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.Nome}: ${character1.Pontos} ponto(s)`);
  console.log(`${character2.Nome}: ${character2.Pontos} ponto(s)`);

  if (character1.Pontos > character2.Pontos)
    console.log(`\n${character1.Nome} venceu a corrida! Parabéns! 🏆`);
  else if (character2.Pontos > character1.Pontos)
    console.log(`\n${character2.Nome} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate");
}

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.Nome} e ${player2.Nome} começando...\n`,
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();

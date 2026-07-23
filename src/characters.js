class Character {
  constructor(nome, velocidade, manobrabilidade, poder, pontos = 0) {
    this.Nome = nome;
    this.Velocidade = velocidade;
    this.Manobrabilidade = manobrabilidade;
    this.Poder = poder;
    this.Pontos = pontos;
  }
}

const Mario = new Character("Mario", 4, 3, 3);
const Luigi = new Character("Luigi", 3, 4, 4);
const Peach = new Character("Peach", 3, 4, 2);
const Bowser = new Character("Bowser", 5, 2, 5);
const Yoshi = new Character("Yoshi", 2, 4, 3);
const DonkeyKong = new Character("Donkey Kong", 2, 2, 5);

export { Mario, Luigi, Peach, Bowser, Yoshi, DonkeyKong };

<template>
  <div id="rules">
    <div class="contener">
      <Button
        text="Fermer"
        @click="this.$store.state.rulesVisible = false"
        id="close"
      />
      <h2 class="h2">Règles du jeu</h2>
      <div class="rules">
        <div>
          <h3 class="h3">Point unique</h3>
          <p class="rule">
            <img class="dice-img" src="../assets/dices/1.png" alt="Dé face un" />100
            points<br />
            <img class="dice-img" src="../assets/dices/5.png" alt="Dé face cinq" /> 50
            points<br />
          </p>
        </div>

        <div>
          <h3 class="h3">Brelans</h3>
          <p class="rule">
            <img class="dice-img" src="../assets/dices/1.png" alt="Dé face un" />300
            points<br />
            <img class="dice-img" src="../assets/dices/2.png" alt="Dé face deux" />200
            points<br />
            <img class="dice-img" src="../assets/dices/3.png" alt="Dé face  trois" />300
            points<br />
            <img class="dice-img" src="../assets/dices/4.png" alt="Dé face quatre" />400
            points<br />
            <img class="dice-img" src="../assets/dices/5.png" alt="Dé face cinq" />500
            points<br />
            <img class="dice-img" src="../assets/dices/6.png" alt="Dé face six" />600
            points<br />
          </p>
        </div>
        <div>
          <h3 class="h3">Carrés</h3>
          <p class="rule">
            <img class="dice-img" src="../assets/dices/1.png" alt="Dé face un" />1000
            points<br />
            <img class="dice-img" src="../assets/dices/2.png" alt="Dé face deux" />2000
            points<br />
            <img class="dice-img" src="../assets/dices/3.png" alt="Dé face trois" />3000
            points<br />
            <img class="dice-img" src="../assets/dices/4.png" alt="Dé face quatre" />4000
            points<br />
            <img class="dice-img" src="../assets/dices/5.png" alt="Dé face cinq" />5000
            points<br />
            <img class="dice-img" src="../assets/dices/6.png" alt="Dé face six" />6000
            points<br />
          </p>
        </div>
        <div class="rules__data">
          <h3 class="h3">Règles 5K ou 10K ?</h3>
          <table>
            <tr>
              <th></th>
              <th>Dés</th>
              <th>Ouverture</th>
              <th>Score Max</th>
            </tr>
            <tr>
              <th class="_5k">5K</th>
              <td>5</td>
              <td>300 points</td>
              <td>5000</td>
            </tr>
            <tr>
              <th class="_10k">10K</th>
              <td>8</td>
              <td>500 points</td>
              <td>10000</td>
            </tr>
          </table>
        </div>
        <div class="rules__list">
          <h3 class="h3">Liste des règles</h3>
          <ol>
            <li>
              Au lancement de la partie, un joueur est sélectionné au hasard
              pour démarrer.
            </li>
            <li>
              Les joueurs ont 15 secondes pour lancer les dés, passez ce délai,
              la main passe au joueur suivant.
            </li>
            <li>
              Tant que le joueur obtient des points sur un lancé, il peut
              relancer les autres dés sans valeur.
            </li>
            <li>
              Si tous les dés affichent des points, le joueur peut continuer et
              relancer tous les dés.
            </li>
            <li>
              Sur un lancé, s'il n'y a aucun résultat, le joueur perd tous les
              points accumulés pendant ce tour et passe la main au joueur
              suivant.
            </li>
            <li>
              Pour commencer à mettre de côté ses points, le joueur dois faire
              au moins le score minimum d'ouverture une première fois.
            </li>
            <li>
              Un joueur ne peut ouvrir avec un score égale au score maximum à
              atteindre.
            </li>
            <li>
              Un joueur peut ensuite arrêter à tout moment et enregistrer son
              score si le total actuel est arrondi à la centaine.
            </li>
            <li>
              Le premier joueur à atteindre le score maximum, ni plus ni moins,
              gagne la partie.
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "Rules",
  components: {
    Button,
  },
};
</script>

<style scoped lang="scss">
@import "../scss/main";
#rules {
  top: 0;
  text-align: center;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100vh;
  background-color: #000000e3;
  overflow-y: scroll;
  .contener {
    margin: 20px auto 50px auto;
    width: 100%;
    max-width: 900px;
    display: flex;
    align-items: center;
    flex-direction: column;
    #close {
      margin-right: 10px;
      z-index: 10;
      position: fixed;
      align-self: flex-end;
      font-size: 1rem;
      border-color: red;
      background-color: red;
      color: black;
      box-shadow: black 3px 3px 20px, black -3px -3px 20px;
    }
    .h2 {
      @include mobile-only {
        margin-top: 50px;
      }
      width: 100%;
      text-transform: uppercase;
      font-size: 1.5rem;
      &::after {
        margin-right: -10%;
        content: "";
        bottom: 0;
        left: 10%;
        position: absolute;
        width: 80%;
        border-bottom: #ffffff 2px solid;
      }
    }
    .h3 {
      color: orange;
      text-align: center;
      font-weight: normal;
      font-size: 1rem;
    }
    .rules {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      font-size: 0.8rem;
      .rule {
        margin: 20px;
        text-align: center;
        color: white;
        .dice-img {
          margin: 4px;
          vertical-align: middle;
          height: 20px;
          width: auto;
        }
      }
      &__data {
        color: white;
        text-align: center;
        margin: 20px auto;
        padding: 20px 5px;
        @include desktop-tablet-only {
          padding: 20px 15%;
        }
        width: 100%;
        border-top: white 1px solid;
        table {
          margin: auto;
          tr > * {
            border: #ffffff8c 1px solid;
            padding: 5px;
          }
          th {
            width: 100px;
            color: #e0a2ff;
            &._5k {
              color: orangered;
            }
            &._10k {
              color: orange;
            }
          }
        }
      }
      &__list {
        padding: 30px 0;
        border-top: white 1px solid;
        ol {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          text-align: center;
          list-style: none;
          color: #e9e9e9;
          width: auto;
          padding: 0;
          margin: 0;
          li {
            text-align: center;

            padding: 0 10px;
            font-size: 0.9rem;
            width: 75%;
            padding: 25px;
            @include desktop-tablet-only {
              width: 25%;
              padding: 25px;
            }
          }
        }
      }
    }
  }
}
</style>
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
            <img class="dice-img" src="../assets/dices/1.png" alt="" />100
            points<br />
            <img class="dice-img" src="../assets/dices/5.png" alt="" /> 50
            points<br />
          </p>
        </div>

        <div>
          <h3 class="h3">Brelans</h3>
          <p class="rule">
            <img class="dice-img" src="../assets/dices/1.png" alt="" />300
            points<br />
            <img class="dice-img" src="../assets/dices/2.png" alt="" />200
            points<br />
            <img class="dice-img" src="../assets/dices/3.png" alt="" />300
            points<br />
            <img class="dice-img" src="../assets/dices/4.png" alt="" />400
            points<br />
            <img class="dice-img" src="../assets/dices/5.png" alt="" />500
            points<br />
            <img class="dice-img" src="../assets/dices/6.png" alt="" />600
            points<br />
          </p>
        </div>
        <div>
          <h3 class="h3">Carrés</h3>
          <p class="rule">
            <img class="dice-img" src="../assets/dices/1.png" alt="" />1000
            points<br />
            <img class="dice-img" src="../assets/dices/2.png" alt="" />2000
            points<br />
            <img class="dice-img" src="../assets/dices/3.png" alt="" />3000
            points<br />
            <img class="dice-img" src="../assets/dices/4.png" alt="" />4000
            points<br />
            <img class="dice-img" src="../assets/dices/5.png" alt="" />5000
            points<br />
            <img class="dice-img" src="../assets/dices/6.png" alt="" />6000
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
              <td>300 Points</td>
              <td>5000</td>
            </tr>
            <tr>
              <th class="_10k">10K</th>
              <td>8</td>
              <td>500 Points</td>
              <td>10000</td>
            </tr>
          </table>
        </div>
        <div class="rules__list">
          <h3 class="h3">Liste des règles</h3>
          <ol>
            <li>
              Un joueur est sélectionné au hasard pour démarrer au lancement de
              la partie.
            </li>
            <li>
              Les joueurs ont 15 secondes pour lancer les dés, passez ce délai,
              la main passe au joueur suivant.
            </li>
            <li>
              Tant que le joueur obtient des points sur un lancé, il peut
              relancer les autres dés sans valeur et si tous les dés affichent
              des points, le joueur peut continuer et relancer tous les dés.
            </li>
            <li>
              Sur un lancé, si il n'y a aucun résultat, le joueur perd tous les
              points accumulés pendant ce tour et passe la main au joueur
              suivant.
            </li>
            <li>
              Pour commencer à totaliser, il faut la première fois faire au
              moins le score minimum d'ouverture.
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
  background-color: #000000d7;
  overflow-y: scroll;
  .contener {
    margin: auto;
    margin-top: 20px;
    width: 95%;
    max-width: 900px;
    display: flex;
    align-items: center;
    flex-direction: column;
    #close {
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
        padding: 20px 0;
        border-top: white 1px solid;
        ol {
          text-align: center;
          list-style: none;
          padding: 15px;
          color: #e9e9e9;
          width: auto;
          margin: 0;
          li {
            padding: 0 10px;
            margin: 20px 0;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}
</style>
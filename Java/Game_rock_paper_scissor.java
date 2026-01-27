/* Program Specifications Write a program to play an automated game of Rock, Paper, Scissors.
Two players make one of three hand signals at the same time.
Hand signals represent a rock, a piece of paper, or a pair of scissors.
Each combination results in a win for one of the players.
Rock crushes scissors, paper covers rock, and scissors cut paper.
A tie occurs if both players make the same signal.
Use a random number generator of 0, 1, or 2 to represent the three signals.
*/

import java.util.Scanner;
import java.util.Random;

public class LabProgram {
    static String rpsString(int rps) {
        String str = "";
        if (rps == 0) {
            str = "rock";
        } else if (rps == 1) {
            str = "paper";
        } else if (rps == 2) {
            str = "scissors";
        }

        return str;
    }

    public static void main(String[] args) {
        Scanner scnr = new Scanner(System.in);
        final int ROCK = 0;
        final int PAPER = 1;
        final int SCISSORS = 2;
        Random rand = new Random();
        int seed = scnr.nextInt();
        rand.setSeed(seed);

        String playerA = scnr.next();
        String playerB = scnr.next();
        int rounds = scnr.nextInt();

        while (rounds < 1) {
            System.out.println("Rounds must be > 0");
            rounds = scnr.nextInt();
        }

        System.out.println(playerA + " vs " + playerB + " for " + rounds + " rounds");

        int currentRound = 1;

        int playerA_RPS;
        int playerB_RPS;

        int playerA_wins = 0;
        int playerB_wins = 0;

        while (currentRound <= rounds) {
            playerA_RPS = rand.nextInt(3);
            playerB_RPS = rand.nextInt(3);

            while (playerA_RPS == playerB_RPS) {
                System.out.println("Tie");
                playerA_RPS = rand.nextInt(3);
                playerB_RPS = rand.nextInt(3);
            }

            if ((playerA_RPS - playerB_RPS == 1) || (playerA_RPS - playerB_RPS == -2)) {
                System.out.println(playerA + " wins with " + rpsString(playerA_RPS));
                playerA_wins++;
            } else {
                System.out.println(playerB + " wins with " + rpsString(playerB_RPS));
                playerB_wins++;
            }

            currentRound++;
        }

        System.out.println(playerA + " wins " + playerA_wins + " and " + playerB + " wins " + playerB_wins);
    }
}

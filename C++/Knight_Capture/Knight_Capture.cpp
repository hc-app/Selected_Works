/*

Fastest Way For a Knight to Capture Another Knight On a Chessboard

The program places two knights on a chessboard and finds the minimum number of turns it would take for a knight to capture the other knight. A turn consist of both knight’s move or only the capturing knight’s move if it captures. Another way to view it is a turn starts whenever the first knight makes a move. e.g. knightA starts, knightB moves is one turn. Then if knightA captures it is considered is another turn. The standard chessboard size is 8x8. The algorithm have set up the problem to use coordinates ranging from 1 to 8. That means the boundary of the x and y coordinates are 1 and 8. The knights can move two square vertically and then one square horizontally or two square horizontally and one square vertically.

The program’s input is an input file with the starting coordinates of the knights. The program’s output is the minimum number of moves and the series of moves each knights takes to make the capture in the minimum number of moves.

The program perform an exhaustive search on the possibles moves each turn by each knight and see if it can make a capture. The first time it can capture also happens to be the optimal for the minimum number of turns it will take to make a capture.

The algorithm’s Big O efficiency class was analyzed using step counts. 
•	The algorithm uses a “while” loop that runs for each turn until a captured has been made. It alternate between making move by each knight. The time complexity of the “while” loop can be represented by O(n).
•	A nested “for” loop runs through the possible moves from the previous turn. Another nested “for” loop runs through the possible moves that each of the previous moves could make. Each knight can make 8 possible moves from any position. The double nested “for” loop has a time complexity of O(n^2).
•	Each knight have to check the other knight’s latest set of possible positions. A separate unordered set data structure was used to track the possible moves so it could be checked in O(1) time. Storing each possible move by each knight happens in O(1) time. The total time to store all possible moves depends on the number of possible moves. There are 8 moves each turn by each knight each turn which has a time complexity of O(16^n).
•	The array index of each knight is used to backtrack the moves made. The capturing knight’s move can be stored in O(1) time. The captured knight’s array index position can be found by iterating through the array in O(n) time. 
•	Backtracking the moves of each knight was completed by dividing by 8 to find the previous turn’s index position. Backtracking was completed in O(t). 
•	A stack was used to track the moves and to display the moves. The number of elements are 2n. Tracking and displaying the message from the stack can be completed in O(n).

The algorithm’s main part runs at O(16^n) due to the number of potential moves from all the moves from the previous turn. The number of moves on a 8x8 board is minimal. If we treat the number of turn as minimal the O(16^n) becomes a constant. The number of moves the knight can make is also known so O(n^2) can also become a constant. The board size is fixed so each run of the algorithm is confined to a upper limit. The time it takes to run a scenario each time is the same due to the same number of inputs each run, the fixed board size, and fixed number of moves each knight can make. The algorithm’s Big O efficiency class is O(1).

*/


#include <iostream>
#include <fstream>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <array>
#include <stack>


using namespace std;

int main(int argc, char *argv[]) {

    // Variable to store string of knight's position
    string strKnightPosition = "";

    // Variable to store knight's position
    int knightA[2];
    int knightB[2];

    // Open file with knights starting positions
    ifstream file(argv[1]);

    // Check if input file opened
    if (!file.is_open()) {

        cout << "file error" << endl;

        return 1;
    }

    // Get Knight A's starting position from the file
    file >> knightA[0];
    file >> knightA[1];

    // Get Knight B's starting position from the file
    file >> knightB[0];
    file >> knightB[1];

    // Close file
    file.close();

    // Check if knight positions are valid
    if (
        knightA[0] < 1 || knightA[0] > 8 || 
        knightA[1] < 1 || knightA[1] > 8 || 
        knightB[0] < 1 || knightB[0] > 8 ||
        knightB[1] < 1 || knightB[1] > 8 
    ) 
    {

        cout << "List of knights starting position" << endl;
        cout << "Knight A's starting position: " << knightA[0] << ", " << knightA[1] << endl;
        cout << "Knight B's starting position: " << knightB[0] << ", " << knightB[1] << endl;
        cout << "Knights starting position are invalid" << endl;

        return 1;
    }

    // Display knights starting positions
    cout << "List of knights starting position" << endl;
    cout << "Knight A's starting position: " << knightA[0] << ", " << knightA[1] << endl;
    cout << "Knight B's starting position: " << knightB[0] << ", " << knightB[1] << endl;

    cout << endl;
    
    // Variable to track number of turns
    int currentTurn = 0;

    // Knight's movement
    int knightMove[8][2] = {{-2, 1}, {-1, 2}, {1, 2}, {2, 1}, {2, -1}, {1, -2}, {-1, -2}, {-2, -1}};


    // Store possible moves by each knight each turn
    /*

        {
        turn_0: {
                    knightA: {[1,1]}
                    knightB: {[8,8]}
                 },
        turn_1: {
                    knightA: {[3,2], [2,3] ...}
                    knightB: {[6,7], [7,6] ...}
                 },
        turn_2: {
                    knightA: {[2,4], [1,3] ...}
                    knightB: {[4,6], [5,5] ...}
                 },
        }
        .
        .
        .
    */    

    // Variable used to store all possible moves by each knight each turn    
    // Can also be used to backtrack the list of moves for each knight's moves each turn
    // vector's element access using index is O(1), for each turn O(turns)
    unordered_map<int, unordered_map<string, vector< array<int,2>>>> allMoves;
    allMoves[currentTurn]["knightA"].push_back({knightA[0], knightA[1]});
    allMoves[currentTurn]["knightB"].push_back({knightB[0], knightB[1]});


    // Variable used to store all valid possible moves by each knights each turn
    // Used to determine if capturing is possible by comparing current turn with previous turn
    // unordered_set's find is O(1)*turns compared to searching through each element in vector O(n)*turns
    // tree traversal would have had to traverse and compare every node at the previous turn's level
    unordered_map<int, unordered_map<string, unordered_set<string>>> validMoves;

    string str = to_string(knightA[0]) + ", " + to_string(knightA[1]);    
    validMoves[currentTurn]["knightA"].insert(str);
    str = to_string(knightB[0]) + ", " + to_string(knightB[1]);
    validMoves[currentTurn]["knightB"].insert(str);

    // Variable used to track if the knight could be captured
    bool captured = false;
    
    // Variables used to track which knight captured and which got captured
    string capturingKnight;
    string capturedKnight;

    // Variables used to track the move index of each knight when they can capture
    int capturingMoveIndex = NULL;
    int capturedMoveIndex = NULL;

    // Increment current turn
    currentTurn++;

    // Exhaustive optimization algorithm used to find the minimum number of moves to capture a knight
    // Iterate through and store each knight's possible moves for the turn 
    // Compare if the move landed on any of the other knight's moves from the previous turn
    // If it did then the knight has captured the other knight and the current turn is the least number of turns.
    // Knight A moves then Knight B moves

    class knightCapture {
        public:
        bool knightMoves(
            string currKnight, 
            string prevKnight, 
            int &currentTurn,
            int knightMove[8][2],
            unordered_map<int, unordered_map<string, vector<array<int,2>>>> &allMoves,
            unordered_map<int, unordered_map<string, unordered_set<string>>> &validMoves,
            bool &captured,
            string &capturingKnight,
            int &capturingMoveIndex,
            string &capturedKnight,
            int &capturedMoveIndex
        ) {
            // Iterate through list of starting position for the current turn
            for (const auto & startPosition : allMoves[currentTurn - 1][currKnight]) {
                // Find the next moves for valid positions
                // Check if it is a valid square to make a move from
                if (startPosition[0] == NULL && startPosition[1] == NULL) {
                    // Create NULL elements for invalid positions
                    for (int i = 0; i < 8; i++) {
                        allMoves[currentTurn][currKnight].push_back({NULL, NULL});
                    }
                }
                else {
                    // All moves possible from a valid square
                    // Iterate through all possible next moves for next turn from current position
                    for (int i = 0; i < 8; i++) {
                    
                        int newPositionX = startPosition[0] + knightMove[i][0];
                        int newPositionY = startPosition[1] + knightMove[i][1];
                    
                    
                        // Insert the knight's possible moves next turn
                        if (newPositionX <= 8 && newPositionX >= 1 && newPositionY <= 8 && newPositionY >= 1) {
                        
                            allMoves[currentTurn][currKnight].push_back({newPositionX, newPositionY});
                        
                            // Determine if a knight can be captured
                            // Compare valid Knight A move on current turn with valid Knight B moves from previous turn
                            // Compare valid Knight B move on current turn with valid Knight A moves from current turn
                            // Insert the next turn's valid move positions
                            string str = to_string(newPositionX) + ", " + to_string(newPositionY);
                            validMoves[currentTurn][currKnight].insert(str);
                        
                            // Determine if capture is possible this turn by Knight A
                            // Exit loop if found
                            bool currentMoveCaptures = false;
                            if (currKnight == "knightA") {
                                // Compare knight A move with knightB moves from previous turn
                                currentMoveCaptures = (validMoves[currentTurn - 1][prevKnight].find(to_string(newPositionX) + ", " + to_string(newPositionY)) != validMoves[currentTurn - 1][prevKnight].end());
                            }
                            else if (currKnight == "knightB") {
                                // Compare knight B move with knightA moves from current turn
                                currentMoveCaptures = (validMoves[currentTurn][prevKnight].find(to_string(newPositionX) + ", " + to_string(newPositionY)) != validMoves[currentTurn][prevKnight].end());
                            }
             
                            // If capture is possible set captured to true and store the current turn, the capturing knight, and the array index of the knight's move 
                            if (currentMoveCaptures) {

                                // Set captured to true
                                captured = true;

                                // Store the capturing knight and the captured knight
                                capturingKnight = currKnight;
                                capturedKnight = prevKnight;                                
                            
                                // Store the index of the capturing knight's array element that represent the capturing move
                                capturingMoveIndex = allMoves[currentTurn][currKnight].size() - 1;    
                            
                                // Store the index of the captured knight's array element that represent the move prior to being captured
                                if (currKnight == "knightA") {
                                    for (int i = 0; i < allMoves[currentTurn - 1][prevKnight].size(); i++) {
                                        if (allMoves[currentTurn - 1][prevKnight][i][0] == newPositionX && allMoves[currentTurn - 1][prevKnight][i][1] == newPositionY) {
                                            
                                            capturedMoveIndex = i;

                                            break;
                                        }
                                    }                                    
                                }
                                else if (currKnight == "knightB") {
                                    for (int i = 0; i < allMoves[currentTurn][prevKnight].size(); i++) {
                                        if (allMoves[currentTurn][prevKnight][i][0] == newPositionX && allMoves[currentTurn][prevKnight][i][1] == newPositionY) {
                                            
                                            capturedMoveIndex = i;

                                            break;
                                        }
                                    }
                                }
                            
                                // Exit loop
                                return captured;
                            }
                        }
                        else {
                            // Insert {NULL, NULL} for invalid positions
                            allMoves[currentTurn][currKnight].push_back({NULL, NULL});
                        }
                    }
                }
            }
            
            return captured;
        };


    };

    
    knightCapture knightCaptureMove;

    // Determine when capturing happens
    // Knight A and Knight B each makes a move until captured

    while (!captured) {

        // Knight A's turn
        knightCaptureMove.knightMoves(
                "knightA", 
                "knightB", 
                currentTurn,
                knightMove,
                allMoves,
                validMoves,
                captured,
                capturingKnight,
                capturingMoveIndex,
                capturedKnight,
                capturedMoveIndex

        );

        if (!captured) {
            // Knight B's turn
            knightCaptureMove.knightMoves(
                    "knightB", 
                    "knightA", 
                    currentTurn,
                    knightMove,
                    allMoves,
                    validMoves,
                    captured,
                    capturingKnight,
                    capturingMoveIndex,
                    capturedKnight,
                    capturedMoveIndex
            );         
        }

        // Start next turn if not captured
        if (!captured) {
            currentTurn++;
        }
    }

    // Display turn and position that capturing was possible
    cout << capturingKnight << " can capture " << capturedKnight << " at turn " << currentTurn << 
    " at position (" << allMoves[currentTurn][capturingKnight][capturingMoveIndex][0] << ", " << allMoves[currentTurn][capturingKnight][capturingMoveIndex][1] << ")" << endl;

    // Get the captured index from allMoves of each knight
    int backtrackA = capturingMoveIndex;
    int backtrackB = capturedMoveIndex;

    // Iterate the allMoves for each turn from the last turn
    // Each turn's vector size is 8x the previous turn's. Integer division by 8 of the element's index will give previous move's element position.
    // O(1) access for each turn

    // Store the moves in a stack for displaying
    stack<string> moves;

    str = "";
    string moveType = " moves to ";

    if (capturingKnight == "knightA") {

        if (currentTurn == 0) {
            moveType = " starts at ";
        }

        str = "On turn " + to_string(currentTurn) + ": " + capturingKnight + " captures " + capturedKnight + " at " + to_string(allMoves[currentTurn][capturingKnight][backtrackA][0]) + ", " + to_string(allMoves[currentTurn][capturingKnight][backtrackA][1]);
        moves.push(str);

        str = to_string(currentTurn) + ": " + capturingKnight + moveType + to_string(allMoves[currentTurn][capturingKnight][backtrackA][0]) + ", " + to_string(allMoves[currentTurn][capturingKnight][backtrackA][1]); 
        moves.push(str);

        backtrackA /= 8;

        currentTurn--;
    }
    else if (capturingKnight == "knightB") {
        str = "On turn " + to_string(currentTurn) + ": " + capturingKnight + " captures " + capturedKnight + " at " + to_string(allMoves[currentTurn][capturingKnight][backtrackA][0]) + ", " + to_string(allMoves[currentTurn][capturingKnight][backtrackA][1]);    
        moves.push(str);
    }

    // Iterate through the turns and store te string for what moves were made by each knight
    for (int i = currentTurn; i >= 0; i--) {

        if (i == 0) {
            moveType = " starts at ";
        }

        // Create the string and store on to the stack each knight's move
        str = to_string(i) + ": " + capturedKnight + moveType + to_string(allMoves[i][capturedKnight][backtrackB][0]) + ", " + to_string(allMoves[i][capturedKnight][backtrackB][1]);
        moves.push(str);

        str = to_string(i) + ": " + capturingKnight + moveType + to_string(allMoves[i][capturingKnight][backtrackA][0]) + ", " + to_string(allMoves[i][capturingKnight][backtrackA][1]);
        moves.push(str);

        int x = allMoves[i]["knightA"][backtrackA][0];
        int y = allMoves[i]["knightA"][backtrackA][1];

        x = allMoves[i]["knightB"][backtrackB][0];
        y = allMoves[i]["knightB"][backtrackB][1];

        // Divide by 8 to get the previous turn's move index from the allMoves list of moves for each turn
        backtrackA /= 8;
        backtrackB /= 8;
    }

    // Display the strings from the stack
    while (!moves.empty()) {
        cout << moves.top() << endl;
        moves.pop();
    }

    return 0;
}

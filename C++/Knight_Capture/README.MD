# Fastest Way For a Knight to Capture Another Knight On a Chessboard

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## Windows:

Compile using g++
`g++ -w Knight_Capture.cpp  -o Knight_Capture.exe`

Execute the program with the input file
Open a command prompt or PowerShell
```
cd <file directory with the program executable>
Knight_Capture.exe <input.txt>
```

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## Linux:

Compile using g++
`g++ -w Knight_Capture.cpp  -o Knight_Capture`

Execute the program with the input file
Open a terminal
```
cd <file directory with the compiled program>
./Knight_Capture <input.txt>
``` 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## Input

The input file (input.txt) will contain the coordinates of a chessboard (1-8 x 1-8) where each knight will be placed. Each knight’s coordinates are separated by whitespace.
e.g. 
knight A ‘s coordinates are (1, 1) and knight B’s coordinates are (8, 8)
The file will be:
```
1 1
8 8
```

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
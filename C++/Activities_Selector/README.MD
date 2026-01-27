# Activities Selector

The activities selector program finds the maximum number of activities that can be performed. It starts with a list of activities with start time and finish time. The times for the activities cannot overlap.
The program uses a greedy approach to select the maximum number of activities. That means it does not guarantee the global optimal. A greedy approach takes the local optimal at each step and combine them to create an optimal solution. The program tries to get the most activities by taking the next valid activity with the smallest duration activity. It takes the list of activities with start and finish time as input. It outputs the activities that will maximize the number of activities that the person can perform.
The idea behind how to get the list of maximum activities are:
•	Chooses an activity with the earliest start time to the previous activity’s finish time. 
•	For activities that start at the same time, it will choose the one with the smallest duration to maximize the number of activities. 
•	The activities are sorted by finish time and then sorted again by start time. This makes activities with the same start time sorted by duration. Smallest duration activities are sorted to the beginning of the list. 
The algorithm’s Big O efficiency class was analyzed using step counts. The algorithm iterates through all the activities is O(n). The activities are sorted by finish time and then sorted again by start time  is O(n*log(n)). Selecting the next activity using a greedy approach iterates through all the activities is O(n). The algorithm Big O efficiency class is O(n*log(n)).

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## Windows:

Compile using g++
`g++ -w Activities_Selector.cpp  -o Activities_Selector.exe`

Execute the program with the input file
Open a command prompt or PowerShell
```
cd <file directory with the program executable>
Activities_Selector.exe
```

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## Linux:

Compile using g++
`g++ -w Activities_Selector.cpp  -o Activities_Selector`

Execute the program
Open a terminal
```
cd <file directory with the compiled program>
./Activities_Selector
```

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## Input

The input list for the activities is going to be stored as a vector of arrays in the main program since an input data type of list can not be passed directly through the console.
The array input can be changed by changing the:
•	“activitiesTimes” variable with the activities start time at array index 0 and the finish times at array index 1

Input: List of activities with start and finish time
`vector<array<int, 2>> activitiesTimes = {{5, 9}, {2, 5}, {1, 3}, {4, 6}, {6, 7}, {8, 9}};`

//////////////////////////////////////////////////////////////////////////////////////////

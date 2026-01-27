/*
Activities Selector

The activities selector program finds the maximum number of activities that can be performed. It starts with a list of activities with start time and finish time. The times for the activities cannot overlap.
The program uses a greedy approach to select the maximum number of activities. That means it does not guarantee the global optimal. A greedy approach takes the local optimal at each step and combine them to create an optimal solution. The program tries to get the most activities by taking the next valid activity with the smallest duration activity. It takes the list of activities with start and finish time as input. It outputs the activities that will maximize the number of activities that the person can perform.
The idea behind how to get the list of maximum activities are:
•	Chooses an activity with the earliest start time to the previous activity’s finish time. 
•	For activities that start at the same time, it will choose the one with the smallest duration to maximize the number of activities. 
•	The activities are sorted by finish time and then sorted again by start time. This makes activities with the same start time sorted by duration. Smallest duration activities are sorted to the beginning of the list. 
The algorithm’s Big O efficiency class was analyzed using step counts. The algorithm iterates through all the activities is O(n). The activities are sorted by finish time and then sorted again by start time  is O(n*log(n)). Selecting the next activity using a greedy approach iterates through all the activities is O(n). The algorithm Big O efficiency class is O(n*log(n)).

Input:
[(1, 3), (2, 5), (4, 6), (6, 7), (5, 9), (8, 9)]
Output:
[(1, 3), (4, 6), (6, 7), (8, 9)]

*/

#include <iostream>
#include <vector>
#include <array>

#include <algorithm>

using namespace std;

int main(int argc, char *argv[]) {

    // Input: List of activities with start and finish time
    vector<array<int, 2>> activitiesTimes = {{5, 9}, {2, 5}, {1, 3}, {4, 6}, {6, 7}, {8, 9}};

    // List of activities had 0 activity
    if (activitiesTimes.size() == 0) {
        cout << "List of activites was empty" << endl;

        return 0;
    }

    // List of activities had 1 activity
    if (activitiesTimes.size() == 1) {
        cout << "[(" << activitiesTimes[0][0] << ", " << activitiesTimes[0][1] << ")]" << endl;

        return 0;
    }

    ///////////////////////////////////////////////////////////////

    // List of activites had > 1 activities

    // Sort the list by finish time then by start time. 
    // This sorts the activities with same start time by duration from smallest duration to largest duration.

    // Activity time comparators
    // https://www.geeksforgeeks.org/cpp/comparator-in-cpp/

    // Comparator for the activity start time
    struct compareStartTime {
        bool operator()(array<int,2> leftOperand, array<int,2> rightOperand) const {
            return (leftOperand[0] < rightOperand[0]);
        }
    };

    // Comparator for the activity finish time
    struct compareFinishTime {
        bool operator()(array<int,2> leftOperand, array<int,2> rightOperand) const {
            return (leftOperand[1] < rightOperand[1]);
        }
    };

    // Sort activities by finish time using the comparator
    sort(activitiesTimes.begin(), activitiesTimes.end(), compareFinishTime());

    // Sort activities by start time using the comparator
    sort(activitiesTimes.begin(), activitiesTimes.end(), compareStartTime());

    ///////////////////////////////////////////////////////////////
    // Display sorted activities
    for (const auto & element: activitiesTimes) {
        cout << "Activity Start: " << element[0] << "\t Activity Finish: " << element[1] << endl;
    }

    cout << endl;
    ///////////////////////////////////////////////////////////////

    // Greedy approach (does not guarantee a global maximum)

    // Display the next activity that has the earliest start time that is greater than the finish time of the previous activity.
    // That activity will have the earliest finish time of the remaining activities with the same start time.

    // Variable to store the previous selected activity
    int prevActivityTime[2] = {activitiesTimes[0][0], activitiesTimes[0][1]};

    // Display activity 1
    cout << "[" ;
    cout << "(" << activitiesTimes[0][0] << ", " << activitiesTimes[0][1] << ")";

    // Iterate through the activities list
    for (int i = 1; i < activitiesTimes.size(); i++) {
        
        // Display the activity if the activity has a start time greater than the previous activity's finish time
        if (prevActivityTime[1] <= activitiesTimes[i][0]) {
            cout << ", (" << activitiesTimes[i][0] << ", " << activitiesTimes[i][1] << ")";

            // Store the current activity as the new previous activity
            prevActivityTime[0] = activitiesTimes[i][0];
            prevActivityTime[1] =  activitiesTimes[i][1];
        }              
    }

    cout << "]" << endl;

    return 0;
}
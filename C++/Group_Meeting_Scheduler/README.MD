# Group Meeting Scheduling Program

The group meeting scheduling program starts with the inputs of group members' active times, scheduled times, and the meeting duration. The objective is to find the time windows where the meeting can take place. Group members can only meet during their active times. They cannot meet during their scheduled times. The time window has to be equal to or greater than the meeting duration.
The program stores the group members' active time and scheduled time in an unordered map. It uses a string to identify the person and arrays to store the start and end times. The meeting duration is stored as an integer.
The idea behind how to find the meeting time window are:
•	The group's active time can be found by iterating through each group member's active times to find the latest starting active time and the earliest end time.
•	The group's scheduled times can be found by iterating through each group member's scheduled times and merging them together.
•	The group's meetable times can be found by overlaying the group's active time with the group's scheduled time. The active time sets the boundaries of the meetable times. The scheduled times are the times that groups cannot meet. The group's meetable times are the times that are within the active times, but not the scheduled times.
•	The meeting time windows are the group's meetable times that are greater than or equal to the meeting's duration.

The algorithm’s Big O efficiency class was analyzed using step counts. The algorithm iterates through all group member’s active time is O(n). Iterating through the group member’s scheduled time is O(n^2). The scheduled times are sorted by start time and iterate through to merge overlapping times which are O(n log(n)) and O(n) respectively. The meetable times are found by iterating through the group’s scheduled times and the active times which is O(n). The meeting time window is found by iterating through the meetable times and comparing it with the meeting duration which is O(n). The algorithm Big O efficiency class is O(n^2).

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## Windows:
Compile using g++:
`g++ Group_Meeting_Scheduler.cpp  -o Group_Meeting_Scheduler.exe`

Execute the program:
Open a command prompt or PowerShell
```
cd <file directory with the program executable>
Group_Meeting_Scheduler.exe
```

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## Linux:

Compile using g++:
`g++ Group_Meeting_Scheduler.cpp  -o Group_Meeting_Scheduler`

Execute the program:
Open a terminal
```
cd <file directory with the compiled program>
./Group_Meeting_Scheduler
```

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
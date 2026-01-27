/*

Group Meeting Scheduling Program

The group meeting scheduling program starts with the inputs of group members' active times, scheduled times, and the meeting duration. The objective is to find the time windows where the meeting can take place. Group members can only meet during their active times. They cannot meet during their scheduled times. The time window has to be equal to or greater than the meeting duration.
The program stores the group members' active time and scheduled time in an unordered map. It uses a string to identify the person and arrays to store the start and end times. The meeting duration is stored as an integer.
The idea behind how to find the meeting time window are:
•	The group's active time can be found by iterating through each group member's active times to find the latest starting active time and the earliest end time.
•	The group's scheduled times can be found by iterating through each group member's scheduled times and merging them together.
•	The group's meetable times can be found by overlaying the group's active time with the group's scheduled time. The active time sets the boundaries of the meetable times. The scheduled times are the times that groups cannot meet. The group's meetable times are the times that are within the active times, but not the scheduled times.
•	The meeting time windows are the group's meetable times that are greater than or equal to the meeting's duration.

The algorithm’s Big O efficiency class was analyzed using step counts. The algorithm iterates through all group member’s active time is O(n). Iterating through the group member’s scheduled time is O(n^2). The scheduled times are sorted by start time and iterate through to merge overlapping times which are O(n log(n)) and O(n) respectively. The meetable times are found by iterating through the group’s scheduled times and the active times which is O(n). The meeting time window is found by iterating through the meetable times and comparing it with the meeting duration which is O(n). The algorithm Big O efficiency class is O(n^2).

*/

#include <iostream>
#include <string>
#include <map>
#include <unordered_map>
#include <vector>
#include <algorithm>
#include <utility>

using namespace std;

int main() {

// Inputs:
// Arrays with a person's schedule using military time (HH:MM, e.g. 24:00). Arrays are stored in a hashmap.
unordered_map<string, vector<array<string,2>>> schedule;

schedule["person_1"] = {{ "7:00", "8:30"}, {"12:00", "13:00"}, {"16:00", "18:00"}};
schedule["person_2"] = {{ "9:00", "10:30"}, {"12:20", "14:00"}, {"14:30", "15:00"}, {"16:00", "17:00"}};

// HashMap with the daily active period of all members using military time (HH:MM, e.g. 24:00).
unordered_map<string, array<string, 2>> dailyAct;

dailyAct["person_1"] = {"9:00", "19:00"};
dailyAct["person_2"] = {"9:00", "18:30"};


// Duration of meeting
int meetingDuration = 30;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Outputs:
// Arrays with meet times. Arrays are stored in a hashmap.
map<int, array<double,2>> meetTimes;

meetTimes[0] = {0.00, 24.00};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Class to convert between military time and a decimal representation using hours
// The decimal representation is of the form (hr + (minutes/60.0)) 
// where the whole part is the hours and the decimal part is the realtive % of the minutes to a hour
class convertMilitaryTime {
public:
    // Convert a double data type decimal representation of hours to string military time   
    static double stringToHours(string str) {
        // Variable to store the converted decimal representation of hours
        double result;

        // Find the position of ":" from the string.
        // The left side of ":" is hours and right side of ":" is minutes.
        size_t symbol_pos= str.find(":");

        if (symbol_pos != string::npos) {

            int substr_start = 0;

            // Check if left substring starts with 0, if it does move it to the next position
            if (str.at(0) == 0) {
                substr_start = 1;
            }

            // Convert substring to digit
            double left = stod(str.substr(substr_start,symbol_pos));

            // Check if right substring starts with 0, if it does move it to the next position
            if (str.at(symbol_pos + 1) == 0) {
                substr_start = symbol_pos + 2;
            }
            else{
                substr_start = symbol_pos + 1;
            }

            // Convert substring to digit
            double right = stod(str.substr(substr_start))/60.0;

            // Return the decimal representation of hours
            result = left+right;
        }

        return result;
    };

    // Convert a string military time to a double data type decimal representation of hours 
    static string hoursToString(double value) {
        // Get hours from decimal representation of time
        int hours = static_cast<int>(value);

        value -= hours;

        // Convert minutes from decimal representation of time to minutes
        int minutes = value*60;

        // If hours or minutes is less than 10, string starts with 0.
        string left = "";
        string right = "";
        if (hours < 10) {
            left = "0" + to_string(hours);
        }
        else {
            left = to_string(hours);
        }

        if (minutes < 10) {
            right = "0" + to_string(minutes);
        }
        else {
            right = to_string(minutes);
        }

        // Combine hours and minutes to get military time string
        string str = left + ":" + right;

        return str;
    };

    // Connvert minutes to decimal representation of hours
    static double minutesToHours(int minutes) {
        // 1 hour = 60 minutes
        return minutes/60.0;
    };
};

// Merge all members' active time to set boundaries of available meet times
// data type: unordered_map<string, array<string, 2>> dailyAct;
for (auto const& member : dailyAct) {
    // Update meet time based on member's active time

    // The latest active start time is the earliest meet time 
    double memberStartTime = convertMilitaryTime::stringToHours(member.second[0]);
    if (memberStartTime > meetTimes[0][0]) {
        meetTimes[0][0] = memberStartTime;
    }

    // The earliest active end time is the latest meet time
    double memberEndTime = convertMilitaryTime::stringToHours(member.second[1]); 
    if (memberEndTime < meetTimes[0][1]) {
        meetTimes[0][1] = memberEndTime;
    }
}

///////////////////
// Display Members' active times
cout << "Members' active time" << endl;
cout << "start: " << convertMilitaryTime::hoursToString(meetTimes[0][0]) << "\tend: " << convertMilitaryTime::hoursToString(meetTimes[0][1]) << endl;

cout << endl;
///////////////////

// Merge all members schedule to scheduledTimes to show times unavailable for meeting

// scheduledTimes variable used to store the members merged scheduled times
vector<array<double,2>> scheduledTimes;

// Iterate through the members' schedules
for (auto const& member : schedule) {

    // Iterate through each member's scheduled times
    for (auto const& scheduledTime : member.second) {

        // Convert the member's scheduled time to decimal representation of hours
        double scheduledStartTime = convertMilitaryTime::stringToHours(scheduledTime[0]);
        double scheduledEndTime = convertMilitaryTime::stringToHours(scheduledTime[1]);
        
        // Check if the member's scheduled time start is stored in scheduledTimes
        if (scheduledTime.size() == 0) {
            scheduledTimes.push_back({scheduledStartTime, scheduledEndTime});
        }
        else {

            // Check if member's scheduled time overlaps with any of the members' scheduled times
            // Overlapping times can be merged
            bool merged = false;
            for (auto& scheduledTime : scheduledTimes) {
                if (scheduledStartTime < scheduledTime[0] && scheduledEndTime >= scheduledTime[1]) {
                    scheduledTime[0] = scheduledStartTime;
                    merged = true;
                }

                if (scheduledEndTime > scheduledTime[1] && scheduledStartTime <= scheduledTime[0]) {
                    scheduledTime[1] = scheduledEndTime;
                    merged = true;
                }

                if (merged == true) {
                    break;
                }
            }
            
            // Insert the member's scheduled time to scheduledTimes if there wasn't any overlaps of members' scheduled times
            if (merged == false) {
                scheduledTimes.push_back({scheduledStartTime, scheduledEndTime});
            }
        }
    }
}

// Sort scheduledTimes by start time
// https://www.geeksforgeeks.org/cpp/sorting-vector-of-arrays-in-c/
std::sort(scheduledTimes.begin(), scheduledTimes.end());

// Iterate through scheduled times to merge overlapping times if there are greater than 1 scheduled times
if (scheduledTimes.size() >= 2) {
    int i = 1;
    while (i < scheduledTimes.size()) {
        bool merged = false;

        double *currentScheduledStartTime = &scheduledTimes[i][0];
        double *currentScheduledEndTime = &scheduledTimes[i][1];

        double *previousScheduledStartTime = &scheduledTimes[i - 1][0];
        double *previousScheduledEndTime = &scheduledTimes[i - 1][1];

        // Update the schedule time if it could be merged with the previous schedule time 
        if (*currentScheduledStartTime >= *previousScheduledStartTime && *currentScheduledStartTime <= *previousScheduledEndTime) {
            *previousScheduledEndTime = *currentScheduledEndTime; 
            merged = true;
        }

        // Remove element that got merged
        if (merged == true) {
            scheduledTimes.erase(scheduledTimes.begin() + i);
            continue;
        }

        i++;
    }
}

///////////////////
// Display members' merged scheduled times
cout << "Members' scheduled times (merged): " << endl;
for (auto const& scheduledTime : scheduledTimes) {
    cout << "start: " << convertMilitaryTime::hoursToString(scheduledTime[0])<< "\tend: " << convertMilitaryTime::hoursToString(scheduledTime[1]) << endl;
}

cout << endl;
///////////////////

// The meetable times by the members are:
// meetable times = Members' active hours - Members' scheduled times
int count = 1;
for (int i = 0; i < scheduledTimes.size(); i++) {

    // All meetable times are found when a scheduled times overlaps the end of active time
    if (scheduledTimes[i][1] >= meetTimes[0][1]) {

        if (i > 0) {
            meetTimes[count] = {scheduledTimes[i-1][1], scheduledTimes[i][0]};
        }

        break;
    }

    // Skip scheduled times that overlaps members' active start and end times
    // Members' scheduled time overlaps with members' active start time
    if (meetTimes[0][0] >= scheduledTimes[i][0] || meetTimes[0][0] > scheduledTimes[i][1]) {
        continue;
    }

    // The start of meetable time is the active start time if there 
    // wasn't any overlap of members' start time and the members' starting scheduled time
    if (count == 1 && scheduledTimes[i][0] > meetTimes[0][0]) {

        if (i == 0) {
            meetTimes[1][0] = meetTimes[0][0];
        }
        else {
            meetTimes[1][0] = scheduledTimes[i-1][1];
        }

        meetTimes[1][1] = scheduledTimes[i][0];
        count++;

        continue;
    }

    // Meetable time is the time between previous members' scheduled time end and current scheduled time start
    if (count > 1) {
        meetTimes[count] = {scheduledTimes[i - 1][1], scheduledTimes[i][0]};
        count++;
    }

    // The last scheduled time ends before member's end active time, 
    // the last meetable time is the end of the last scheduled time to the members' end active time
    if (i == scheduledTimes.size() - 1) {

        meetTimes[count] = {scheduledTimes[i][1], meetTimes[0][1]};
        count++;

        break;
    }
}

// Remove placeholder for members' active times
meetTimes.erase(0);

///////////////////
// Display members' possible meetable times
cout << "Members' possible meetable times: " << endl;
for (auto & meetTime : meetTimes) {
    cout << "start: " << convertMilitaryTime::hoursToString(meetTime.second[0]) << "\tend: " << convertMilitaryTime::hoursToString(meetTime.second[1]) << endl;
}

cout << endl;
///////////////////

// The possible meeting times for the duration are the members' meetable times that are >= meeting duration
// Iterate through meetTimes remove meeting times that are less than meeting duration
for (int i = 0; i < meetTimes.size(); i++) {
    // Remove meeting times that are less than the meeting duration
    if ((meetTimes[i][1] - meetTimes[i][0]) < convertMilitaryTime::minutesToHours(meetingDuration)) {       
        meetTimes.erase(i);
    }
}

///////////////////
// Display members' meeting windows
cout << "Meeting windows: " << endl;
for (auto & meetTime : meetTimes) {
    cout << "start: " << convertMilitaryTime::hoursToString(meetTime.second[0]) << "\tend: " << convertMilitaryTime::hoursToString(meetTime.second[1]) << endl;
}

cout << endl;
///////////////////

return 0; 
}
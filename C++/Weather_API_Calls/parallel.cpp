#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <array>
using namespace std;




int main(int argc, char* argv[]){

    // Start the program with the input file as argument
    if (argc < 2) {
        cout << "Start program with input filename" << endl;

        return 1;
    }

    // Open input file to input file stream
    ifstream inputFileStream(argv[1]);

    // Exit if error opening input file
    if (!inputFileStream.is_open()) {
        cout << "Error opening input file: " << argv[1] << endl;

        return 2;
    }
    
    // Variable to store the API call
    // [longitude, latitude, apiURL, fileName, curlParameter]
    vector<array<string, 5>> weatherAPICalls;

    // API call variables
    // Variable to store the longitude and latitude
    string longitude = "";
    string latitude = "";

    // Variable to store the API call string
    string weatherAPIurl = "";

    // Variable to store the file name used to save the data
    string filename = "";

    // Variable to store the curl parameters
    string curlParameters = "";

    // Variable to track location number that will be used for file name
    int locationNumber = 1;


    // Process variables
    // Variable to store the process id/fork() return value
    pid_t pid;

    // Variable to store the execlp() return value
    int execlpReturnValue;

    // Variable to store the wait() return value
    int waitReturnValue;

    // Child termination/exit status
    int childExitStatus;


    // Iterate through the coordinates from the input file and save the curl API call string for each location
    while(!inputFileStream.eof()) {

        // Get longitude and latitude from file
        inputFileStream >> longitude;
        inputFileStream >> latitude;

        // API call string: https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=True
        weatherAPIurl = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current_weather=True";

        // File name to save the data
        filename = "file"+ to_string(locationNumber) + ".json";
        
        // Store the location's parameter values to weatherAPICalls
        weatherAPICalls.push_back({longitude, latitude, weatherAPIurl, filename, curlParameters});

        // Increment the location number that will be used for the file name
        locationNumber++;
    }

    // Close file stream
    inputFileStream.close();
    

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    for(const auto call : weatherAPICalls)
    {
        // Create a child
        pid = fork();

        // Display the error message if the fork() return value is an error and exit process
        if (pid < 0) {
            perror("fork() error");
            exit(pid);
        }

        // Child process
        // fork() returns the pid 0
        if (pid == 0) {

            // Child process created
            cout << "Child process created to fetch weather data for the location: " << call[0] << ", " << call[1] << endl;

            // Child process print its process ID
            cout << "Child Process PID: " << getpid() << endl;

            // Child process print its user ID
            cout << "Child Process UID: " << getuid() << endl;

            // Child process print its group ID
            cout << "Child Process GID: " << getgid() << endl;

            // Replace child fork with the curl program to get the data from the API
            // curl will save the data call to the API to a file
            // curl cmd with parameters e.g. curl -o file1.json "https://api.open-meteo.com/v1/forecast?latitude=52.520000&longitude=13.410000&current_weather=True"
            execlpReturnValue = execlp("/usr/bin/curl", "curl", "-o", call[3].c_str(), call[2].c_str(), NULL);
            

            // Display the error message if the execlp() return value was an error and exit process
            if (execlpReturnValue < 0) {
                perror("execlp() error");
                exit(execlpReturnValue);
            }
        }
    }

        // Parent process
        // fork() returns the child process id
        if (pid > 0) {

            // Parent process print its process ID
            cout << "Parent Process PID: " << getpid() << endl;

            // Parent process print its user ID
            cout << "Parent Process UID: " << getuid() << endl;

            // Parent process print its group ID
            cout << "Parent Process GID: " << getgid() << endl;


            for(const auto call : weatherAPICalls) {

                // Wait until the child process finish
                // Store the child process pid as the wait return value and the child process exit status to the variable childExitStatus
                waitReturnValue = wait(&childExitStatus);

                // Display the error message if the wait() return value was an error and exit process
                if (waitReturnValue < 0) {
                    perror("wait() error");
                    exit(waitReturnValue);
                }

                // Display the child process exit status from childExitStatus variable
                if(WIFEXITED(childExitStatus)) {
                    fprintf(stderr, "The curl api call (pid %d) terminated with exit code %d.\n\n", waitReturnValue, WEXITSTATUS(childExitStatus));
                }

            }
        }

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    
    return 0;
}
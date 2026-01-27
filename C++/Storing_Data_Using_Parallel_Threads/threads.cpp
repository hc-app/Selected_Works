#include <iostream>
#include <string>

#include <memory>
#include <pthread.h>

using namespace std;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Global Variables:
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create the mutual exclusion object
pthread_mutex_t mutex1 = PTHREAD_MUTEX_INITIALIZER;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Prototypes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Binary search tree:
// BST node of struct data type with the key value and pointers to the left and right child node
struct Node {
    int key;
    shared_ptr<struct Node> left;
    shared_ptr<struct Node> right;

    // Default Constructor
    Node() {
        key = NULL;
        left = nullptr;
        right = nullptr;
    }

    // Constructor with key initialized
    Node(int key) {
        this->key = key;
        left = nullptr;
        right = nullptr;
    }

    // Destructor
    ~Node() {
        // Shared pointer deallocates the left and right node;
    }
};

// BST root node
shared_ptr<struct Node> bstRootNodePtr;

// BST insert node
void insertNodeToBST(shared_ptr<struct Node> currentNodePtr, int key, shared_ptr<struct Node> & newNodePtr);

// Search BST for key
bool searchBST(int key);

// BST (in order) traversal 
void inOrderBSTTraversal(shared_ptr<struct Node> currentNodePtr);

/////////////////////////////////////////////////////////

// Thread:
// Thread function that will generate 100 random numbers in the range of 0-100000 and insert them into a binary search tree
void* randomNumbers(void * param);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Main
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

int main(int argc, char* argv[]){

    // Check if program received input for the number of threads 
    if (argc < 2) {

        // Display the program didn't have an input for the number of threads
        cout << "Run the program with input for the number of threads" << endl;

        return 1;
    }

    // Variable to store the number of threads to create
    int numberOfThreads = stoi(argv[1]);

    // Create thread id variable
    pthread_t tid[numberOfThreads];


    // Set the seed value for rand()
    srand(time(NULL));

    // Iterate and create threads equal to the argv[1] input
    for (int i = 0; i < numberOfThreads; i++) {

        // Create thread id
        tid[i] = i + 1;

        // Create variable to store number of random numbers each thread will generate
        int numberOfRandomNumbers = 100;

        // Create pointer to the number of random numbers to generate per thread
        int* numberOfRandomNumbersPtr = &numberOfRandomNumbers;

        // Create a thread with pthread_create() using the thread id, default thread attributes, the function the thread will run, and the input for the thread function
        // The input for the thread function is the number of random numbers to generate (e.g. 100).
        if (pthread_create(&tid[i], NULL, randomNumbers, (void *) numberOfRandomNumbersPtr) != 0) {
            
            // Display thread creation failed and exit program if thread creation return value isn't 0
            cout << "Thread (tid: " << tid << ") creation failed." << endl;

            exit(1);
        }

    }

    // Iterate and wait on the threads to complete    
    for (int i = 0; i < numberOfThreads; i++) {

        // Main process wait for the thread's exit status
        if (pthread_join(tid[i], NULL) != 0) {
            // Display thread join failed and exit program if thread creation return value isn't 0
            cout << "Thread (tid: " << tid << ") join failed." << endl;
        }
    }

    // Display the random numbers created by the threads in order
    cout << "Display the random numbers in order from the BST:" << endl;
    inOrderBSTTraversal(bstRootNodePtr);

    
    return 0;

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Binary search tree:
// Search BST for key
bool searchBST(int key) {

    // Variable to track if the node is found
    bool found = false;

    // The Binary Search Tree is empty, return false
    if (bstRootNodePtr == nullptr) {
        found = false;
    }
    else {

        // The Binary Search Tree is not empty. Check if the random number is in the BST.
        shared_ptr<struct Node> currentNodePtr = bstRootNodePtr;

        // Set found to true if the root node contain the key
        if (key == currentNodePtr->key) {
            found = true;
        }
        else {

            // Set found to true if the key is found in the BST
            // Traverse left if the new node's key is less than the current node's key
            // Traverse right if the new node's key is greater than the current node's key
            while (key != currentNodePtr->key) {
 
                if (key < currentNodePtr->key && currentNodePtr->left != nullptr) {
                    currentNodePtr = currentNodePtr->left;
                }        
                else if (key > currentNodePtr->key && currentNodePtr->right != nullptr) {
                    currentNodePtr = currentNodePtr->right;
                }
                else if (key < currentNodePtr->key && currentNodePtr->left == nullptr) {
                    found = false;
                    break;
                }        
                else if (key > currentNodePtr->key && currentNodePtr->right == nullptr) {
                    found = false;
                    break;
                }

                if (key == currentNodePtr->key) {
                    found = true;
                }                 
            
            } 

        }

    }

    return found;
    
};

// BST insert node
void insertNodeToBST(shared_ptr<struct Node> currentNodePtr, int key, shared_ptr<struct Node> & newNodePtr) {

    bool inserted = false;

    // If node is NULL then the tree is empty, return the key as the root node of the BST
    if (currentNodePtr == nullptr) {

        // Insert the new node as the BST's root node
        bstRootNodePtr = newNodePtr;

        // Set inserted to be true
        inserted = true;

    }

    // If BST is not empty, traverse the tree and insert the new node
    if (inserted == false) {

        // Insert the new node to the BST by traversing to the left child if its value is less than the node's key or traverse right if its value is greater than the node's key. 
        // When a node without a left or right child is reached, the new node is inserted as the left child if it is less than the current node's key or right child if it is greater than the current node's key.
        while (inserted == false) {

            // Insert the new node to the BST as the left child if it is less than the key
            if (key < currentNodePtr->key && currentNodePtr->left == nullptr) {

                // Insert the new node to the left node
                currentNodePtr->left = newNodePtr;

                // Set inserted to be true
                inserted = true;
            }

            // Insert the new node to the BST as the right child if it is greater than the key
            if (key > currentNodePtr->key && currentNodePtr->right == nullptr)
             {
                 // Insert the new node to the right node
                currentNodePtr->right = newNodePtr;

                // Set inserted to be true
                inserted = true;
            }

            
            // Traverse the BST            
            if (key < currentNodePtr->key && currentNodePtr->left != nullptr) {

                // Traverse left if the new node's key is less than the current node's key
                currentNodePtr = currentNodePtr->left;

            }        
            else if (key > currentNodePtr->key && currentNodePtr->right != nullptr) {

                // Traverse right if the new node's key is greater than the current node's key
                currentNodePtr = currentNodePtr->right;

            }

        }

    }

    return;

};

// BST (in order) traversal 
void inOrderBSTTraversal(shared_ptr<struct Node> currentNodePtr){

    if (currentNodePtr != nullptr) {
        
        // Recursively traverse left child
        inOrderBSTTraversal(currentNodePtr->left);

        // Display key
        cout << currentNodePtr->key << endl;        

        // Recursively traverse right child
        inOrderBSTTraversal(currentNodePtr->right);

    }

    return;

};

/////////////////////////////////////////////////////////

// Thread:
// Thread function that will generate 100 random numbers in the range of 0-100000 and insert them into a binary search tree
void* randomNumbers(void* param){
    
    // Variable to convert the void ptr back to a int ptr
    int* numbersToGeneratePtr = (int*) param;

    // Variable to store how many random numbers to generate
    int numbersToGenerate = *numbersToGeneratePtr;

    // Variable to store a random number between 0 - 100000
    int randomNumber = 0;

    // Generate and insert the random numbers to the binary search tree
    for (int i = 0; i < numbersToGenerate; i++) {

        // Generate a random number between 0 - 100000
        randomNumber = rand() % 100000;

        // Mutual exclusive lock to prevent race conditions when searching and inserting to the shared resource: BST
        pthread_mutex_lock(&mutex1);

        // Check if the random number is in the BST
        // If the random value exist in the BST, it will be skipped.
        bool found = false;
        found = searchBST(randomNumber);

        // Insert the new node to the BST        
        if (found == false) {

            // Create the new node
            //shared_ptr<struct Node> newNodePtr = shared_ptr<struct Node>(new struct Node(randomNumber));
            shared_ptr<struct Node> newNodePtr = make_shared<struct Node>();
            newNodePtr->key = randomNumber;
            
            // Insert the new node to the BST
            insertNodeToBST(bstRootNodePtr, randomNumber, newNodePtr);

        }
        else {
            cout << "tid: " << pthread_self() << " skipped the ith random number (i = " << i << ") because it was already in BST" << endl;
        }

        // Mutual exclusive lock to prevent race conditions
        pthread_mutex_unlock(&mutex1);

    }
    
    // Thread exit status 0 if the thread function was a success
    pthread_exit(0);

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

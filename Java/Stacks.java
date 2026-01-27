// 12.10.2: Write a method that returns the largest number from the stack.
// Write a method that, given a non-empty stack of integers, returns the largest value. The stack should have the same contents as before the call.

import java.util.Stack;

public class Stacks {
    /**
     * Returns the largest number from the stack.
     * The stack has the same contents after the call.
     */
    public static Integer getLargest(Stack<Integer> s) {
        int result;
        Stack<Integer> tempStack = new Stack<>();

        result = s.pop();
        tempStack.push(result);

        while (s.size() > 0) {
            if (s.peek() > result) {
                result = s.peek();
            }
            tempStack.push(s.pop());
        }

        while (tempStack.size() > 0) {
            s.push(tempStack.pop());
        }

        return result;
    }
}

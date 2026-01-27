// 12.10.1: Write a method that returns the largest number from the queue.
// Write a method that, given a non-empty queue of integers, returns the largest value. The queue should have the same contents as before the call. Of course, you can remove elements to inspect them, but you need to add them back into the queue.

import java.util.Queue;

public class Queues {
    /**
     * Returns the largest number from the queue.
     * The queue has the same contents after the call.
     */
    public static Integer getLargest(Queue<Integer> q) {
        int result;

        int qSize = q.size();
        int i = 0;

        result = q.remove();
        i++;
        q.add(result);

        while (i < qSize) {
            if (q.peek() > result) {
                result = q.remove();
                q.add(result);
            } else {
                int temp = q.remove();
                q.add(temp);

                // q.add(q.remove());
            }

            i++;
        }

        return result;

    }
}


import java.util.Iterator;
import java.util.LinkedList;

public class Lists {

    public static String removeFirst(LinkedList<String> strings) {
        // 12.2.1: Remove and return the first element of a linked list.
        // Complete this method for removing and returning the first element of a linked
        // list. If the list is empty, return null
        Iterator<String> iter = strings.iterator();
        String result = null;

        if (iter.hasNext()) {
            result = iter.next();
            iter.remove();
        } else {
            result = null;
        }

        return result;
    }

    public static String removeSecond(LinkedList<String> strings) {
        // 12.2.2: Remove and return the second element of a linked list.
        // Complete this method for removing and returning the second element of a
        // linked list. If the list has length < 2, return null.
        Iterator<String> iter = strings.iterator();
        String result = null;

        int i = 0;
        while (iter.hasNext()) {
            i++;
            result = iter.next();
            if (i == 2) {
                iter.remove();
                break;
            }
        }

        if (i < 2) {
            result = null;
        }

        return result;
    }

    public static String removeLast(LinkedList<String> strings) {

        // 12.2.3: Remove and return the last element of a linked list.
        // Complete this method for removing and returning the last element of a linked
        // list. If the list is empty, return null.
        Iterator<String> iter = strings.iterator();
        String result = null;

        if (!iter.hasNext()) {
            result = null;
        } else {
            result = strings.removeLast();
        }

        return result;
    }

    public static void removeShort(LinkedList<String> words) {
        // 12.2.4: Use a loop to remove all strings with length less than four.
        // Complete the following method that uses a loop to remove all strings with
        // length less than four from its parameter words.
        Iterator<String> iter = words.iterator();

        while (iter.hasNext()) {
            if (iter.next().length() < 4) {
                iter.remove();
            }
        }
    }

    public static void printSkipper(LinkedList<String> words) {
        // 12.2.5: Use a loop to print every other element of a linked list.
        // Complete the method printSkipper below. Use a loop to print every other
        // element of a linked list parameter words. Print a space after every word and
        // a newline after all elements have been printed.
        // For example, if the list contains the strings "A", "B", and "C", print
        // A C
        Iterator<String> iter = words.iterator();

        int i = 0;

        while (iter.hasNext()) {
            if (i % 2 == 0) {
                System.out.print(iter.next() + " ");
            } else {
                iter.next();
            }
            i++;
        }

        System.out.println();
    }

}

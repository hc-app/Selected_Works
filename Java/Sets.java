// 12.4.1: Print all elements that are in both Set<String> s and Set<String> t.
// Complete the method below that prints all elements that are in both Set<String> s and Set<String> t. Each matching element should be followed by a space.

import java.util.Set;
import java.util.Iterator;

public class Sets {
    public static void printMatches(Set<String> s, Set<String> t) {
        System.out.print("{ ");

        for (String element : s) {
            if (t.contains(element)) {
                System.out.print(element + " ");
            }
        }

        System.out.println("}");
    }
}

// 12.5.1: Complete the method that takes a String and returns a TreeMap<String, Integer>
// Maps make finding character frequencies easy. Complete the method below that takes a String and returns a TreeMap<String, Integer> giving the number of times each letter occurs. The keys will be Strings of length 1.

import java.util.Map;
import java.util.TreeMap;
import java.util.Scanner;

public class Frequency {
    public static Map<String, Integer> letterFrequency(String str) {
        Map<String, Integer> m = new TreeMap<>();

        for (int i = 0; i < str.length(); i++) {
            String s = str.substring(i, i + 1);
            if (m.get(s) == null) {
                m.put(s, 1);
            } else {
                m.put(s, m.get(s) + 1);
            }
        }

        return m;
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String input = in.nextLine();

        System.out.println(Frequency.letterFrequency(input));
    }
}

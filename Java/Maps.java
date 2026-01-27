// 12.5.2: Complete the method that looks up a color name and returns the color code.
// You are given a map with color names and codes, such as:
//    { "red" -> "#FF0000", "tomato" -> "#FF6347", ... }
// Complete the method below that, given any string and such a map, looks up the color code, or returns the original string if it is not a key of the map.

import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.TreeMap;

public class Maps {
    /**
     * Looks up a color name and returns the color code.
     *
     * @param color the name of the color, like "red"
     * @param codes a Map where the color name is the key
     * @return the HTML color code if it is in the table, or
     *         the color name if it is not
     */
    public static String getColorCode(String color, Map<String, String> codes) {
        String result = codes.get(color);

        if (result == null) {
            return color;
        } else {
            return result;
        }
    }

    public static Map<String, Integer> getCommon(Map<String, Integer> map1,
            Map<String, Integer> map2) {
        // 12.5.3: Write a method that returns a new map with common key-value pairs.
        // Write a method that, given two maps, yields a map with all key/value
        // associations that are common to both maps. That is, the same key must map to
        // the same value in both maps.
        Map<String, Integer> common = new TreeMap<>();

        for (String key : map1.keySet()) {
            if (map1.get(key).equals(map2.get(key))) {
                common.put(key, map2.get(key));
            }
        }

        return common;
    }

    /**
     * Returns a new map with merged key-value pairs.
     *
     * @param map1 the first map to compare
     * @param map2 the second map to compare
     * @return a map containing a set of entries in each map
     */
    public static Map<String, Set<Integer>> merge(Map<String, Integer> map1,
            Map<String, Integer> map2) {
        // 12.5.4: Write a method that returns a new map with merged key-value pairs.
        // Write a method that, given two maps, yields a map with all key/value
        // associations that occur in either map. In the resulting map, a key is
        // associated with the set (of size 1 or 2) containing the values to which the
        // key is mapped in the given maps. Use a TreeMap so that the values will appear
        // in order.

        Map<String, Set<Integer>> merged = new TreeMap<>();

        for (String key : map1.keySet()) {
            Set<Integer> newSet = new TreeSet<>();
            if (merged.get(key) == null) {
                merged.put(key, newSet);
            }

            newSet = merged.get(key);
            newSet.add(map1.get(key));
            merged.put(key, newSet);

        }

        for (String key : map2.keySet()) {
            Set<Integer> newSet = new TreeSet<>();
            if (merged.get(key) == null) {
                merged.put(key, newSet);
            }
            newSet = merged.get(key);
            newSet.add(map2.get(key));
            merged.put(key, newSet);
        }

        return merged;
    }
}

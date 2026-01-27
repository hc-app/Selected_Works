
import java.util.Scanner;

public class ShoppingCartPrinter {
    public static void main(String[] args) {
        Scanner scnr = new Scanner(System.in);

        ItemToPurchase item1 = new ItemToPurchase();
        ItemToPurchase item2 = new ItemToPurchase();

        userInput(1, scnr, item1);
        scnr.nextLine();
        userInput(2, scnr, item2);

        int item1TotalPrice = item1.getQuantity() * item1.getPrice();
        int item2TotalPrice = item2.getQuantity() * item2.getPrice();
        int totalPrice = item1TotalPrice + item2TotalPrice;

        System.out.println("TOTAL COST");
        System.out.println(item1.getName() + " " + item1.getQuantity() + " @ $" + item1.getPrice() + " = $"
                + item1TotalPrice);
        System.out.println(item2.getName() + " " + item2.getQuantity() + " @ $" + item2.getPrice() + " = $"
                + item2TotalPrice);
        System.out.println();

        System.out.println("Total: $" + totalPrice);
    }

    public static void userInput(int itemNumber, Scanner scnr, ItemToPurchase item) {
        System.out.println("Item " + itemNumber);

        System.out.println("Enter the item name:");
        item.setName(scnr.nextLine());

        System.out.println("Enter the item price:");
        item.setPrice(scnr.nextInt());

        System.out.println("Enter the item quantity:");
        item.setQuantity(scnr.nextInt());
        System.out.println();
    }
}

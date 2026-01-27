import java.util.Scanner;

public class ShoppingCartManager {

    public static void main(String[] args) {
        // In main(), prompt the user for a customer's name and today's date. Output the
        // name and date. Create an object of type ShoppingCart. (1 pt)

        // Enter customer's name:
        // John Doe
        // Enter today's date:
        // February 1, 2016

        // Customer name: John Doe
        // Today's date: February 1, 2016

        Scanner scnr = new Scanner(System.in);
        String customerName;
        String date;

        System.out.println("Enter customer's name:");
        customerName = scnr.nextLine();

        System.out.println("Enter today's date:");
        date = scnr.nextLine();

        System.out.println();

        ShoppingCart cart = new ShoppingCart(customerName, date);
        System.out.println("Customer name: " + cart.getCustomerName());
        System.out.println("Today's date: " + cart.getDate());

        System.out.println();
        printMenu();
        System.out.println();

        // Prompt for the user's choice of menu options. If an invalid character is
        // entered, continue to prompt for a valid choice.
        // When a valid option is entered, execute the option by calling executeMenu().
        // Then, print the menu and prompt for a new option. Continue until the user
        // enters 'q'. (1 pt)

        char input;
        boolean quitMenu = false;
        while (quitMenu != true) {
            System.out.println("Choose an option:");

            input = scnr.next().charAt(0);
            input = Character.toLowerCase(input);

            switch (input) {
                case 'q':
                    quitMenu = true;
                    break;
                case 'a':
                    executeMenu(input, cart, scnr);
                    System.out.println();
                    printMenu();
                    System.out.println();
                    break;
                case 'd':
                    executeMenu(input, cart, scnr);
                    System.out.println();
                    printMenu();
                    System.out.println();
                    break;
                case 'c':
                    executeMenu(input, cart, scnr);
                    System.out.println();
                    printMenu();
                    System.out.println();
                    break;
                case 'i':
                    executeMenu(input, cart, scnr);
                    System.out.println();
                    printMenu();
                    System.out.println();
                    break;
                case 'o':
                    executeMenu(input, cart, scnr);
                    System.out.println();
                    printMenu();
                    System.out.println();
                    break;
                default:
                    break;
            }

        }
    }

    public static void printMenu() {

        // Prints the following menu of options to manipulate the shopping cart. (1 pt)

        // MENU
        // a - Add item to cart
        // d - Remove item from cart
        // c - Change item quantity
        // i - Output items' descriptions
        // o - Output shopping cart
        // q - Quit

        System.out.println("MENU");
        System.out.println("a - Add item to cart");
        System.out.println("d - Remove item from cart");
        System.out.println("c - Change item quantity");
        System.out.println("i - Output items' descriptions");
        System.out.println("o - Output shopping cart");
        System.out.println("q - Quit");
    }

    public static void executeMenu(char menuChoice, ShoppingCart cart, Scanner scnr) {
        // Takes 3 parameters: a character representing the user's choice, a shopping
        // cart, and a Scanner object. Performs the menu options described below in step
        // 5, according to the user's choice. (1 pt)

        switch (menuChoice) {
            case 'a':
                addItemToCart(cart, scnr);
                break;
            case 'd':
                removeItemFromCart(cart, scnr);
                break;
            case 'c':
                changeItemQuantity(cart, scnr);
                break;
            case 'i':
                outputItemsDescription(cart, scnr);
                break;
            case 'o':
                outputShoppingCart(cart, scnr);
                break;
            default:
                break;
        }

    }

    public static void outputShoppingCart(ShoppingCart cart, Scanner scnr) {

        // OUTPUT SHOPPING CART
        // John Doe's Shopping Cart - February 1, 2016
        // Number of Items: 8

        // Nike Romaleos 2 @ $189 = $378
        // Chocolate Chips 5 @ $3 = $15
        // Powerbeats 2 Headphones 1 @ $128 = $128

        // Total: $521

        System.out.println("OUTPUT SHOPPING CART");

        cart.printTotal();

    }

    public static void outputItemsDescription(ShoppingCart cart, Scanner scnr) {
        // OUTPUT ITEMS' DESCRIPTIONS
        // John Doe's Shopping Cart - February 1, 2016

        // Item Descriptions
        // Nike Romaleos: Volt color, Weightlifting shoes
        // Chocolate Chips: Semi-sweet
        // Powerbeats 2 Headphones: Bluetooth headphones

        System.out.println("OUTPUT ITEMS' DESCRIPTIONS");

        cart.printDescriptions();
    }

    public static void addItemToCart(ShoppingCart cart, Scanner scnr) {
        // ADD ITEM TO CART
        // Enter the item name:
        // Nike Romaleos
        // Enter the item description:
        // Volt color, Weightlifting shoes
        // Enter the item price:
        // 189
        // Enter the item quantity:
        // 2

        ItemToPurchase newItem = new ItemToPurchase();
        String newItemName;
        String newItemDescription;
        int newItemPrice;
        int newItemQuantity;

        System.out.println("ADD ITEM TO CART");

        System.out.println("Enter the item name:");
        scnr.nextLine();
        newItemName = scnr.nextLine();

        System.out.println("Enter the item description:");
        newItemDescription = scnr.nextLine();

        System.out.println("Enter the item price:");
        newItemPrice = scnr.nextInt();

        System.out.println("Enter the item quantity:");
        newItemQuantity = scnr.nextInt();

        newItem.setName(newItemName);
        newItem.setDescription(newItemDescription);
        newItem.setPrice(newItemPrice);
        newItem.setQuantity(newItemQuantity);

        cart.addItem(newItem);

    }

    public static void removeItemFromCart(ShoppingCart cart, Scanner scnr) {
        // REMOVE ITEM FROM CART
        // Enter name of item to remove:
        // Chocolate Chips

        System.out.println("REMOVE ITEM FROM CART");
        System.out.println("Enter name of item to remove:");

        scnr.nextLine();
        String name = scnr.nextLine();

        cart.removeItem(name);

    }

    public static void changeItemQuantity(ShoppingCart cart, Scanner scnr) {
        // CHANGE ITEM QUANTITY
        // Enter the item name:
        // Nike Romaleos
        // Enter the new quantity:
        // 3

        ItemToPurchase item = new ItemToPurchase();
        String itemName;
        int itemQuantity;

        System.out.println("CHANGE ITEM QUANTITY");

        System.out.println("Enter the item name:");
        scnr.nextLine();
        itemName = scnr.nextLine();

        System.out.println("Enter the new quantity:");
        itemQuantity = scnr.nextInt();

        item.setName(itemName);
        item.setQuantity(itemQuantity);

        cart.modifyItem(item);
    }
}

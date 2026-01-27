import java.util.ArrayList;

public class ShoppingCart {
    private String customerName;
    private String currentDate;
    private ArrayList<ItemToPurchase> cartItems = new ArrayList<>();

    ShoppingCart() {
        customerName = "none";
        currentDate = "January 1, 2016";
    }

    ShoppingCart(String name, String date) {
        customerName = name;
        currentDate = date;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getDate() {
        return currentDate;
    }

    public void addItem(ItemToPurchase item) {
        cartItems.add(item);
    }

    public void removeItem(String name) {
        boolean itemRemoved = false;

        for (int i = 0; i < cartItems.size(); i++) {
            if (cartItems.get(i).getName().equals(name)) {
                cartItems.remove(i);
                itemRemoved = true;
            }
        }

        if (!itemRemoved) {
            System.out.println("Item not found in cart. Nothing removed.");
        }

    }

    public void modifyItem(ItemToPurchase item) {
        boolean itemFound = false;
        for (int i = 0; i < cartItems.size(); i++) {
            if (cartItems.get(i).getName().equals(item.getName())) {
                itemFound = true;

                // Check if parameters has default values, if not modify the item in cart
                if (item.getDescription() != "none") {
                    cartItems.get(i).setDescription(item.getDescription());
                }
                if (item.getPrice() != 0) {
                    cartItems.get(i).setPrice(item.getPrice());
                }
                if (item.getQuantity() != 0) {
                    cartItems.get(i).setQuantity(item.getQuantity());
                }
            }
        }

        if (itemFound == false) {
            System.out.println("Item not found in cart. Nothing modified.");
        }

    }

    public int getNumItemsInCart() {
        int total = 0;

        for (int i = 0; i < cartItems.size(); i++) {
            total += cartItems.get(i).getQuantity();
        }

        return total;
    }

    public int getCostOfCart() {
        int total = 0;

        for (int i = 0; i < cartItems.size(); i++) {
            total += cartItems.get(i).getPrice() * cartItems.get(i).getQuantity();
        }

        return total;
    }

    public void printTotal() {
        System.out.println(customerName + "'s Shopping Cart - " + currentDate);
        System.out.print("Number of Items: ");
        System.out.println(getNumItemsInCart());
        System.out.println();

        if (cartItems.size() == 0) {
            System.out.println("SHOPPING CART IS EMPTY");
            System.out.println();
            System.out.println("Total: $" + getCostOfCart());

        } else {
            for (int i = 0; i < cartItems.size(); i++) {
                cartItems.get(i).printItemCost();
            }

            System.out.println();

            System.out.println("Total: $" + getCostOfCart());
        }
    }

    public void printDescriptions() {
        System.out.println(customerName + "'s Shopping Cart - " + currentDate);
        System.out.println();

        if (cartItems.size() == 0) {
            System.out.println("SHOPPING CART IS EMPTY");
        } else {
            System.out.println("Item Descriptions");
            for (int i = 0; i < cartItems.size(); i++) {
                cartItems.get(i).printItemDescription();
            }
        }
    }
}

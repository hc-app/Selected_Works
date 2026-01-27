public class ItemToPurchase {
    private String itemName;
    private String itemDescription;
    private int itemPrice;
    private int itemQuantity;

    ItemToPurchase() {
        itemName = "none";
        itemDescription = "none";
        itemPrice = 0;
        itemQuantity = 0;
    }

    ItemToPurchase(String name, String description, int price, int quantity) {
        itemName = name;
        itemDescription = description;
        itemPrice = price;
        itemQuantity = quantity;
    }

    public void setName(String name) {
        itemName = name;
    }

    public String getName() {
        return itemName;
    }

    public void setDescription(String description) {
        itemDescription = description;
    }

    public String getDescription() {
        return itemDescription;
    }

    public void setPrice(int price) {
        itemPrice = price;
    }

    public int getPrice() {
        return itemPrice;
    }

    public void setQuantity(int quantity) {
        itemQuantity = quantity;
    }

    public int getQuantity() {
        return itemQuantity;
    }

    public void printItemCost() {
        int itemTotalPrice = itemQuantity * itemPrice;
        System.out.println(itemName + " " + itemQuantity + " @ $" + itemPrice + " = $" + itemTotalPrice);
    }

    public void printItemDescription() {
        System.out.println(itemName + ": " + itemDescription);
    }
}

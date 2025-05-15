
import React from "react";
import Layout from "../components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, Minus, ShoppingCart, X } from "lucide-react";

const POS = () => {
  // Sample product categories
  const categories = [
    "All", "Drinks", "Food", "Cards", "Snacks"
  ];

  // Sample products
  const products = [
    { id: 1, name: "Coffee", category: "Drinks", price: 3.50, image: "☕" },
    { id: 2, name: "Tea", category: "Drinks", price: 2.50, image: "🍵" },
    { id: 3, name: "Cake", category: "Food", price: 4.00, image: "🍰" },
    { id: 4, name: "Sandwich", category: "Food", price: 5.00, image: "🥪" },
    { id: 5, name: "2-Hour Card", category: "Cards", price: 5.00, image: "🎫" },
    { id: 6, name: "4-Hour Card", category: "Cards", price: 8.00, image: "🎫" },
    { id: 7, name: "Chips", category: "Snacks", price: 1.50, image: "🍟" },
    { id: 8, name: "Cookies", category: "Snacks", price: 2.00, image: "🍪" }
  ];

  // Sample cart items
  const cartItems = [
    { id: 1, product: "Coffee", quantity: 2, unitPrice: 3.50 },
    { id: 5, product: "2-Hour Card", quantity: 1, unitPrice: 5.00 }
  ];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Selection Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold">Point of Sale</h1>
            <div className="w-full md:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                  placeholder="Search products..."
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  category === "All"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl mb-2">{product.image}</div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Area */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-medium">Current Order</h2>
              <div className="flex items-center gap-1 text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                <ShoppingCart size={14} />
                <span>{cartItems.reduce((total, item) => total + item.quantity, 0)} items</span>
              </div>
            </div>

            {/* Cart Items */}
            <div className="py-4 space-y-3 max-h-[400px] overflow-auto">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product}</h4>
                      <p className="text-sm text-gray-500">${item.unitPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <Plus size={16} />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100 text-red-500">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">Cart is empty</p>
              )}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button className="w-full" size="lg">
                Checkout
              </Button>
              <Button variant="outline" className="w-full">
                Save Order
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default POS;
